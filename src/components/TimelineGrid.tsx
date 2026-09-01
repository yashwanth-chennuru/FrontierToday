import React from 'react';
import { Company, LaunchUpdate, GridOrientation } from '../types';
import { DayInfo } from '../utils/dates';
import { CompanyHeaderCell } from './CompanyHeaderCell';
import { CompanyLogo } from './CompanyLogos';
import { LaunchCard } from './LaunchCard';
import { Plus } from 'lucide-react';

interface TimelineGridProps {
  companies: Company[];
  days: DayInfo[];
  launches: LaunchUpdate[];
  orientation?: GridOrientation;
  selectedCompanyId: string | null;
  onCompanyClick: (companyId: string) => void;
  onLaunchClick: (launch: LaunchUpdate) => void;
  onCellAddLaunch: (companyId: string, dateIso: string) => void;
  onAddCompanyClick: () => void;
  isAdmin?: boolean;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  companies,
  days,
  launches,
  orientation = 'dates-vertical',
  selectedCompanyId,
  onCompanyClick,
  onLaunchClick,
  onCellAddLaunch,
  onAddCompanyClick,
  isAdmin = false,
}) => {
  // Filter companies if one is selected
  const displayedCompanies = selectedCompanyId
    ? companies.filter((c) => c.id === selectedCompanyId)
    : companies;

  // Split into Frontier Labs and Thinking Machines
  const frontierCompanies = displayedCompanies.filter(
    (c) => c.section !== 'thinking-machines'
  );
  const thinkingCompanies = displayedCompanies.filter(
    (c) => c.section === 'thinking-machines'
  );

  // Build a lookup map for instant access: [companyId_date] -> LaunchUpdate[]
  const launchesMap = React.useMemo(() => {
    const map = new Map<string, LaunchUpdate[]>();
    launches.forEach((l) => {
      const key = `${l.companyId}_${l.date}`;
      const existing = map.get(key) || [];
      map.set(key, [...existing, l]);
    });
    return map;
  }, [launches]);

  // Launch count per company
  const companyCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    launches.forEach((l) => {
      counts[l.companyId] = (counts[l.companyId] || 0) + 1;
    });
    return counts;
  }, [launches]);

  // Helper to render a company row for inverted view (dates-horizontal)
  const renderCompanyRow = (company: Company) => {
    const isSelected = selectedCompanyId === company.id;

    return (
      <tr
        key={company.id}
        className="group/row transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
      >
        {/* Sticky Company Column */}
        <td
          onClick={() => onCompanyClick(company.id)}
          className={`sticky left-0 z-10 p-3 border-r border-black/10 dark:border-zinc-800 align-top transition-colors cursor-pointer select-none ${
            isSelected
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
              : 'bg-white dark:bg-[#18181B] group-hover/row:bg-zinc-50/90 dark:group-hover/row:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
              <CompanyLogo
                logoKey={company.logoKey}
                className="text-zinc-900 dark:text-zinc-100"
                size={22}
              />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold tracking-tight truncate">
                {company.name}
              </span>
            </div>
          </div>
        </td>

        {/* Date Intersection Cells */}
        {days.map((day) => {
          const key = `${company.id}_${day.iso}`;
          const items = launchesMap.get(key) || [];
          const hasLaunches = items.length > 0;

          return (
            <td
              key={key}
              className={`p-2.5 border-r border-black/[0.06] dark:border-zinc-800/80 last:border-r-0 align-top relative group/cell min-w-[140px] md:min-w-[155px] transition-colors ${
                hasLaunches ? 'bg-white dark:bg-[#18181B]' : 'hover:bg-zinc-50/70 dark:hover:bg-zinc-800/20'
              }`}
            >
              {hasLaunches ? (
                <div className="flex flex-col gap-2">
                  {items.map((launch) => (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      onClick={onLaunchClick}
                    />
                  ))}
                </div>
              ) : isAdmin ? (
                <div
                  onClick={() => onCellAddLaunch(company.id, day.iso)}
                  className="w-full h-full min-h-[52px] rounded-lg flex items-center justify-center cursor-pointer border border-transparent hover:border-dashed hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white/80 dark:hover:bg-zinc-800/50 transition-all text-zinc-300 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300"
                  title={`Log launch for ${company.shortName} on ${day.fullDateLabel}`}
                >
                  <span className="opacity-0 group-hover/cell:opacity-100 flex items-center gap-1 text-[11px] font-medium">
                    <Plus className="w-3 h-3" />
                    <span>Log</span>
                  </span>
                </div>
              ) : (
                <div className="w-full h-full min-h-[52px]" />
              )}
            </td>
          );
        })}
      </tr>
    );
  };

  // -------------------------------------------------------------
  // VIEW 1: Inverted Grid (Companies Vertical ↓, Dates Horizontal →)
  // -------------------------------------------------------------
  if (orientation === 'dates-horizontal') {
    return (
      <div className="w-full bg-white dark:bg-[#18181B] rounded-2xl border border-black/10 dark:border-zinc-800 shadow-nordic overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          <table className="w-full border-collapse text-left">
            {/* Sticky Table Header: Dates across columns */}
            <thead className="sticky top-0 z-20 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-b border-black/10 dark:border-zinc-800 shadow-sm">
              <tr>
                {/* Top-Left Corner: Labs Label */}
                <th className="sticky left-0 z-30 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md p-3.5 min-w-[150px] md:min-w-[170px] border-r border-black/10 dark:border-zinc-800 text-left">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                      FRONTIER LABS
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      Company / Lab
                    </span>
                  </div>
                </th>

                {/* Date Columns */}
                {days.map((day) => {
                  const isToday = day.iso === '2026-09-01' || day.isToday;
                  return (
                    <th
                      key={day.iso}
                      className={`p-3 min-w-[140px] md:min-w-[155px] border-r border-black/[0.08] dark:border-zinc-800 last:border-r-0 font-normal align-top ${
                        isToday ? 'bg-amber-50/70 dark:bg-amber-950/30' : 'bg-white/90 dark:bg-[#18181B]/90'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {day.monthName} {day.dayNumber}
                          </span>
                          {isToday && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black">
                              SEP 1
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                          {day.dayOfWeek}, {day.year}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Rows: Companies Vertical */}
            <tbody className="divide-y divide-black/[0.06] dark:divide-zinc-800/60">
              {/* Primary Frontier Labs */}
              {frontierCompanies.map((company) => renderCompanyRow(company))}

              {/* Space & Section Divider for Thinking Machines */}
              {thinkingCompanies.length > 0 && (
                <>
                  <tr className="bg-zinc-100/60 dark:bg-zinc-900/60 border-t-2 border-b border-black/[0.08] dark:border-zinc-800 h-3">
                    <td
                      colSpan={days.length + 1}
                      className="py-1.5 px-4 sticky left-0 z-10"
                    />
                  </tr>

                  {/* Thinking Machines Lab Rows */}
                  {thinkingCompanies.map((company) => renderCompanyRow(company))}
                </>
              )}

              {/* Add Custom Lab Row (Admin Only) */}
              {isAdmin && !selectedCompanyId && (
                <tr>
                  <td
                    colSpan={days.length + 1}
                    className="p-3 text-center bg-zinc-50/40 dark:bg-zinc-900/40 border-t border-black/[0.06] dark:border-zinc-800"
                  >
                    <button
                      onClick={onAddCompanyClick}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-black/40 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-nordic-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom AI Lab or Model</span>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: Standard Grid (Companies Horizontal →, Dates Vertical ↓)
  // -------------------------------------------------------------
  return (
    <div className="w-full bg-white dark:bg-[#18181B] rounded-2xl border border-black/10 dark:border-zinc-800 shadow-nordic overflow-hidden">
      {/* Scrollable Matrix Container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
        <table className="w-full border-collapse text-left">
          {/* Sticky Table Header: Companies / Labs */}
          <thead className="sticky top-0 z-20 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md border-b border-black/10 dark:border-zinc-800 shadow-sm">
            <tr>
              {/* Top-Left Corner: Dates Label */}
              <th className="sticky left-0 z-30 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md p-4 min-w-[110px] md:min-w-[130px] border-r border-black/10 dark:border-zinc-800 text-left">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                    TIMELINE
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Day / Date
                  </span>
                </div>
              </th>

              {/* Company Logo Header Cells */}
              {displayedCompanies.map((company) => (
                <th
                  key={company.id}
                  className="p-0 border-r border-black/[0.08] dark:border-zinc-800 last:border-r-0 font-normal align-top bg-white/90 dark:bg-[#18181B]/90"
                >
                  <CompanyHeaderCell
                    company={company}
                    launchCount={companyCounts[company.id] || 0}
                    onFilterClick={onCompanyClick}
                    isSelected={selectedCompanyId === company.id}
                  />
                </th>
              ))}

              {/* Add Custom Lab Column Header (Admin Only) */}
              {isAdmin && !selectedCompanyId && (
                <th className="p-3 align-middle text-center min-w-[100px] border-r-0 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <button
                    onClick={onAddCompanyClick}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-black/40 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white group w-full"
                    title="Add custom AI Lab or Model"
                  >
                    <Plus className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium">+ Add Lab</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>

          {/* Matrix Rows: Dates */}
          <tbody className="divide-y divide-black/[0.06] dark:divide-zinc-800/60">
            {days.map((day) => {
              const isToday = day.iso === '2026-09-01' || day.isToday;

              return (
                <tr
                  key={day.iso}
                  className={`group/row transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 ${
                    isToday ? 'bg-amber-50/20 dark:bg-amber-950/20' : ''
                  }`}
                >
                  {/* Sticky Date Column (Sep 1, Sep 2, Sep 3...) */}
                  <td
                    className={`sticky left-0 z-10 p-3.5 border-r border-black/10 dark:border-zinc-800 align-top transition-colors ${
                      isToday
                        ? 'bg-amber-50/90 dark:bg-amber-950/90 text-amber-950 dark:text-amber-200 font-semibold border-r-amber-300 dark:border-r-amber-800'
                        : 'bg-white dark:bg-[#18181B] group-hover/row:bg-zinc-50/90 dark:group-hover/row:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold tracking-tight">
                          {day.monthName} {day.dayNumber}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black">
                            SEP 1
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                        {day.dayOfWeek}, {day.year}
                      </span>
                    </div>
                  </td>

                  {/* Company Intersection Cells */}
                  {displayedCompanies.map((company) => {
                    const key = `${company.id}_${day.iso}`;
                    const items = launchesMap.get(key) || [];
                    const hasLaunches = items.length > 0;

                    return (
                      <td
                        key={key}
                        className={`p-2.5 border-r border-black/[0.06] dark:border-zinc-800/80 last:border-r-0 align-top relative group/cell min-w-[130px] md:min-w-[145px] transition-colors ${
                          hasLaunches ? 'bg-white dark:bg-[#18181B]' : 'hover:bg-zinc-50/70 dark:hover:bg-zinc-800/20'
                        }`}
                      >
                        {hasLaunches ? (
                          <div className="flex flex-col gap-2">
                            {items.map((launch) => (
                              <LaunchCard
                                key={launch.id}
                                launch={launch}
                                onClick={onLaunchClick}
                              />
                            ))}
                          </div>
                        ) : isAdmin ? (
                          <div
                            onClick={() => onCellAddLaunch(company.id, day.iso)}
                            className="w-full h-full min-h-[52px] rounded-lg flex items-center justify-center cursor-pointer border border-transparent hover:border-dashed hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white/80 dark:hover:bg-zinc-800/50 transition-all text-zinc-300 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300"
                            title={`Log launch for ${company.shortName} on ${day.fullDateLabel}`}
                          >
                            <span className="opacity-0 group-hover/cell:opacity-100 flex items-center gap-1 text-[11px] font-medium">
                              <Plus className="w-3 h-3" />
                              <span>Log</span>
                            </span>
                          </div>
                        ) : (
                          <div className="w-full h-full min-h-[52px]" />
                        )}
                      </td>
                    );
                  })}

                  {/* Empty cell spacer for Add Lab column (Admin Only) */}
                  {isAdmin && !selectedCompanyId && (
                    <td className="p-2 border-r-0 bg-zinc-50/20 dark:bg-zinc-900/20" />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
