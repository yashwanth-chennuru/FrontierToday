import React, { useRef } from 'react';
import { Plus, Search, Download, Upload, RotateCcw, Filter, Lock, Unlock, Sun, Moon } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/seedData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onLogLaunchClick: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  isAdmin: boolean;
  onAdminClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onLogLaunchClick,
  onExport,
  onImport,
  onReset,
  isAdmin,
  onAdminClick,
  theme,
  onToggleTheme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
    }
  };

  return (
    <header className="mb-6">
      {/* Top Banner / Brand Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-zinc-800">
        {/* Brand Title (Scandinavian Minimal & Handcrafted feeling) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-tight shadow-nordic-sm">
            FT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
                Frontier Today
              </h1>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Admin Edit Mode
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl border border-black/10 dark:border-zinc-700 bg-white dark:bg-[#1E1E22] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-nordic-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-600" />
            )}
          </button>

          {/* Admin Lock / Unlock */}
          <button
            onClick={onAdminClick}
            title={isAdmin ? "Admin authenticated (Click to manage)" : "Unlock Admin Edit Mode"}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all shadow-nordic-sm ${
              isAdmin
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                : 'bg-white dark:bg-[#1E1E22] text-zinc-600 dark:text-zinc-300 border-black/10 dark:border-zinc-700 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {isAdmin ? <Unlock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-zinc-400" />}
            <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Admin'}</span>
          </button>

          {/* Data Persistence Tools */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#1E1E22] border border-black/10 dark:border-zinc-700 rounded-xl p-1 shadow-nordic-sm">
            <button
              onClick={onExport}
              title="Export data as JSON"
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON backup"
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>

            {isAdmin && (
              <button
                onClick={onReset}
                title="Reset to sample releases"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onLogLaunchClick}
            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-nordic-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Log Launch</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search model, feature, tag, lab..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#1E1E22] border border-black/10 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/30 dark:focus:border-zinc-500 shadow-nordic-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                    : 'bg-white dark:bg-[#1E1E22] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white border border-black/5 dark:border-zinc-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
