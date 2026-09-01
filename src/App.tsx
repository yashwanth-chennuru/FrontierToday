import React, { useState, useMemo, useEffect } from 'react';
import { Company, LaunchUpdate, ViewMode, GridOrientation } from './types';
import {
  getStoredCompanies,
  saveStoredCompanies,
  getStoredLaunches,
  saveStoredLaunches,
  resetToDefaults,
  exportDataAsJson,
  importDataFromJson,
} from './utils/storage';
import { generate6MonthsDates, DayInfo } from './utils/dates';
import { Header } from './components/Header';
import { DateControls } from './components/DateControls';
import { TimelineGrid } from './components/TimelineGrid';
import { FeedView } from './components/FeedView';
import { LaunchModal } from './components/LaunchModal';
import { LaunchDetailDrawer } from './components/LaunchDetailDrawer';
import { AddCompanyModal } from './components/AddCompanyModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { LayoutGrid, List, X, Info } from 'lucide-react';
import { auth } from './config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  subscribeToLaunches,
  subscribeToCompanies,
  saveLaunchToFirestore,
  deleteLaunchFromFirestore,
  saveCompanyToFirestore,
  seedInitialFirestoreData,
} from './services/firestoreService';

export const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(getStoredCompanies);
  const [launches, setLaunches] = useState<LaunchUpdate[]>(getStoredLaunches);

  // Auth state for Admin mode
  const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const isOwnerAdmin = !!(ADMIN_EMAIL && currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Cloud Firestore Subscriptions
  useEffect(() => {
    const unsubLaunches = subscribeToLaunches((firestoreLaunches) => {
      if (firestoreLaunches && firestoreLaunches.length > 0) {
        setLaunches(firestoreLaunches);
        saveStoredLaunches(firestoreLaunches);
      }
    });

    const unsubCompanies = subscribeToCompanies((firestoreCompanies) => {
      if (firestoreCompanies && firestoreCompanies.length > 0) {
        setCompanies(firestoreCompanies);
        saveStoredCompanies(firestoreCompanies);
      }
    });

    return () => {
      unsubLaunches();
      unsubCompanies();
    };
  }, []);

  // Theme state (Dark Mode / Light Mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('frontier_today_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('frontier_today_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Filters and views
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [gridOrientation, setGridOrientation] = useState<GridOrientation>(() => {
    try {
      const saved = localStorage.getItem('frontier_today_grid_orientation');
      return (saved as GridOrientation) || 'dates-horizontal'; // Inverted by default as requested
    } catch {
      return 'dates-horizontal';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('frontier_today_grid_orientation', gridOrientation);
    } catch (e) {
      console.error(e);
    }
  }, [gridOrientation]);

  // 6-Month Timeline Date navigation
  const all6MonthDays: DayInfo[] = useMemo(() => generate6MonthsDates('2026-09-01', 6), []);
  const [dateStartIndex, setDateStartIndex] = useState(0);
  const [daysPerPage, setDaysPerPage] = useState(14); // 7, 14, or 31

  // Modals state
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [modalCompanyId, setModalCompanyId] = useState<string | undefined>();
  const [modalDate, setModalDate] = useState<string | undefined>();
  const [editingLaunch, setEditingLaunch] = useState<LaunchUpdate | null>(null);

  const [selectedDetailLaunch, setSelectedDetailLaunch] = useState<LaunchUpdate | null>(null);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  // Active days window
  const visibleDays = useMemo(() => {
    return all6MonthDays.slice(dateStartIndex, dateStartIndex + daysPerPage);
  }, [all6MonthDays, dateStartIndex, daysPerPage]);

  const currentMonthKey = visibleDays[0]?.iso.slice(0, 7) || '2026-09';
  const rangeLabel = useMemo(() => {
    if (visibleDays.length === 0) return '';
    const first = visibleDays[0];
    const last = visibleDays[visibleDays.length - 1];
    return `${first.monthName} ${first.dayNumber} – ${last.monthName} ${last.dayNumber}, ${last.year}`;
  }, [visibleDays]);

  // Filtered Launches for search & category
  const filteredLaunches = useMemo(() => {
    return launches.filter((l) => {
      // Category filter
      if (selectedCategory !== 'All' && l.category !== selectedCategory) {
        return false;
      }
      // Company filter
      if (selectedCompanyId && l.companyId !== selectedCompanyId) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const comp = companies.find((c) => c.id === l.companyId);
        const compName = comp ? comp.name.toLowerCase() : '';
        const tagsStr = (l.tags || []).join(' ').toLowerCase();
        const matches =
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          compName.includes(q) ||
          tagsStr.includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [launches, selectedCategory, selectedCompanyId, searchQuery, companies]);

  // Handlers for launch actions
  const handleSaveLaunch = async (
    launchData: Omit<LaunchUpdate, 'id' | 'createdAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      const updatedItem = {
        ...launchData,
        id: existingId,
        createdAt: editingLaunch?.createdAt || new Date().toISOString(),
      } as LaunchUpdate;

      setLaunches((prev) =>
        prev.map((item) => (item.id === existingId ? updatedItem : item))
      );
      try {
        await saveLaunchToFirestore(updatedItem);
      } catch (err) {
        console.warn('Firestore write warning:', err);
      }
    } else {
      const newLaunch: LaunchUpdate = {
        id: `launch-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        createdAt: new Date().toISOString(),
        ...launchData,
      };
      setLaunches((prev) => [newLaunch, ...prev]);
      try {
        await saveLaunchToFirestore(newLaunch);
      } catch (err) {
        console.warn('Firestore write warning:', err);
      }
    }
  };

  const handleDeleteLaunch = async (launchId: string) => {
    setLaunches((prev) => prev.filter((l) => l.id !== launchId));
    if (selectedDetailLaunch?.id === launchId) {
      setSelectedDetailLaunch(null);
    }
    try {
      await deleteLaunchFromFirestore(launchId);
    } catch (err) {
      console.warn('Firestore delete warning:', err);
    }
  };

  const handleAddCompany = async (newComp: Company) => {
    setCompanies((prev) => [...prev, newComp]);
    try {
      await saveCompanyToFirestore(newComp);
    } catch (err) {
      console.warn('Firestore save company warning:', err);
    }
  };

  const handleCellAddLaunch = (companyId: string, dateIso: string) => {
    if (!isOwnerAdmin) {
      setIsAdminAuthModalOpen(true);
      return;
    }
    setEditingLaunch(null);
    setModalCompanyId(companyId);
    setModalDate(dateIso);
    setIsLaunchModalOpen(true);
  };

  const handleOpenEditLaunch = (launch: LaunchUpdate) => {
    if (!isOwnerAdmin) {
      setIsAdminAuthModalOpen(true);
      return;
    }
    setEditingLaunch(launch);
    setIsLaunchModalOpen(true);
  };

  // Date Navigation handlers
  const handlePreviousDays = () => {
    setDateStartIndex((prev) => Math.max(0, prev - daysPerPage));
  };

  const handleNextDays = () => {
    setDateStartIndex((prev) =>
      Math.min(all6MonthDays.length - daysPerPage, prev + daysPerPage)
    );
  };

  const handleSelectMonth = (firstDateIso: string) => {
    const idx = all6MonthDays.findIndex((d) => d.iso === firstDateIso);
    if (idx !== -1) {
      setDateStartIndex(idx);
    }
  };

  const handleResetToToday = () => {
    setDateStartIndex(0); // Sep 1, 2026
  };

  // Data management
  const handleExport = () => {
    const json = exportDataAsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frontier-today-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const res = importDataFromJson(text);
      setCompanies(res.companies);
      setLaunches(res.launches);
      alert('Data imported successfully!');
    } catch (e: any) {
      alert(`Import failed: ${e.message}`);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all launches to default September 1 seed data?')) {
      const defaults = resetToDefaults();
      setCompanies(defaults.companies);
      setLaunches(defaults.launches);
      setSelectedCompanyId(null);
      setSelectedCategory('All');
      setSearchQuery('');
      try {
        await seedInitialFirestoreData();
      } catch (err) {
        console.warn('Firestore reset seeding warning:', err);
      }
    }
  };

  const selectedDetailCompany = useMemo(() => {
    if (!selectedDetailLaunch) return null;
    return companies.find((c) => c.id === selectedDetailLaunch.companyId) || null;
  }, [selectedDetailLaunch, companies]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F0F11] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-200">
      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Scandinavian Minimal Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onLogLaunchClick={() => {
            if (!isOwnerAdmin) {
              setIsAdminAuthModalOpen(true);
              return;
            }
            setEditingLaunch(null);
            setModalCompanyId(undefined);
            setModalDate('2026-09-01');
            setIsLaunchModalOpen(true);
          }}
          onExport={handleExport}
          onImport={handleImport}
          onReset={handleReset}
          isAdmin={isOwnerAdmin}
          onAdminClick={() => setIsAdminAuthModalOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* View Mode Switcher and Active Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-white dark:bg-[#18181B] rounded-xl border border-black/10 dark:border-zinc-800 p-1 shadow-nordic-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Matrix Grid</span>
              </button>
              <button
                onClick={() => setViewMode('feed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'feed'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Feed Stream</span>
              </button>
            </div>

            {/* Grid Layout Inversion Toggle (Active in Grid mode) */}
            {viewMode === 'grid' && (
              <div className="flex items-center bg-white dark:bg-[#18181B] rounded-xl border border-black/10 dark:border-zinc-800 p-1 shadow-nordic-sm">
                <button
                  onClick={() => setGridOrientation('dates-horizontal')}
                  title="Dates Horizontal (Companies Vertical)"
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    gridOrientation === 'dates-horizontal'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>Companies Vertical (Inverted)</span>
                </button>
                <button
                  onClick={() => setGridOrientation('dates-vertical')}
                  title="Dates Vertical (Companies Horizontal)"
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    gridOrientation === 'dates-vertical'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>Dates Vertical</span>
                </button>
              </div>
            )}

            {/* Company Filter Tag if selected */}
            {selectedCompanyId && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-medium">
                <span>Filtering: {companies.find((c) => c.id === selectedCompanyId)?.name}</span>
                <button
                  onClick={() => setSelectedCompanyId(null)}
                  className="p-0.5 hover:bg-zinc-700 dark:hover:bg-zinc-200 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>Hover logos for details • Click any cell to log an update</span>
          </div>
        </div>

        {/* 6-Month Timeline Date Controls (For Matrix View) */}
        {viewMode === 'grid' && (
          <DateControls
            currentStartDate={visibleDays[0]?.iso || '2026-09-01'}
            daysPerPage={daysPerPage}
            totalDays={all6MonthDays.length}
            currentStartIndex={dateStartIndex}
            onPrevious={handlePreviousDays}
            onNext={handleNextDays}
            onSelectMonth={handleSelectMonth}
            onResetToToday={handleResetToToday}
            onDaysPerPageChange={setDaysPerPage}
            activeMonthKey={currentMonthKey}
            formattedRangeLabel={rangeLabel}
          />
        )}

        {/* Main Content: Matrix Grid vs Feed */}
        {viewMode === 'grid' ? (
          <TimelineGrid
            companies={companies}
            days={visibleDays}
            launches={filteredLaunches}
            orientation={gridOrientation}
            selectedCompanyId={selectedCompanyId}
            onCompanyClick={(id) =>
              setSelectedCompanyId((prev) => (prev === id ? null : id))
            }
            onLaunchClick={(launch) => setSelectedDetailLaunch(launch)}
            onCellAddLaunch={handleCellAddLaunch}
            onAddCompanyClick={() => {
              if (!isOwnerAdmin) {
                setIsAdminAuthModalOpen(true);
                return;
              }
              setIsAddCompanyModalOpen(true);
            }}
            isAdmin={isOwnerAdmin}
          />
        ) : (
          <FeedView
            launches={filteredLaunches}
            companies={companies}
            onLaunchClick={(launch) => setSelectedDetailLaunch(launch)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-black/[0.08] dark:border-zinc-800 py-8 text-center text-xs text-zinc-500 dark:text-zinc-400 flex flex-col items-center justify-center gap-2">
        <p>Frontier Today • 2026</p>
        <button
          onClick={() => setIsAdminAuthModalOpen(true)}
          className="text-[11px] text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
        >
          {currentUser ? 'Admin Mode (Active)' : 'Admin Login'}
        </button>
      </footer>

      {/* Modals & Drawers */}
      <LaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        onSave={handleSaveLaunch}
        companies={companies}
        initialCompanyId={modalCompanyId}
        initialDate={modalDate}
        editingLaunch={editingLaunch}
      />

      <LaunchDetailDrawer
        isOpen={!!selectedDetailLaunch}
        launch={selectedDetailLaunch}
        company={selectedDetailCompany}
        onClose={() => setSelectedDetailLaunch(null)}
        onEdit={handleOpenEditLaunch}
        onDelete={handleDeleteLaunch}
        isAdmin={isOwnerAdmin}
      />

      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        onAddCompany={handleAddCompany}
      />

      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default App;
