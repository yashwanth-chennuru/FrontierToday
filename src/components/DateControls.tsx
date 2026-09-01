import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';
import { get6MonthsList, MonthOption } from '../utils/dates';

interface DateControlsProps {
  currentStartDate: string; // ISO
  daysPerPage: number;
  totalDays: number;
  currentStartIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectMonth: (firstDateIso: string) => void;
  onResetToToday: () => void;
  onDaysPerPageChange: (days: number) => void;
  activeMonthKey: string;
  formattedRangeLabel: string;
}

export const DateControls: React.FC<DateControlsProps> = ({
  currentStartIndex,
  totalDays,
  daysPerPage,
  onPrevious,
  onNext,
  onSelectMonth,
  onResetToToday,
  onDaysPerPageChange,
  activeMonthKey,
  formattedRangeLabel,
}) => {
  const months: MonthOption[] = get6MonthsList('2026-09-01');

  const canGoPrev = currentStartIndex > 0;
  const canGoNext = currentStartIndex + daysPerPage < totalDays;

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-black/10 dark:border-zinc-800 shadow-nordic-sm p-3 md:p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* 6-Month Fast Jump Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
          6-Month Tracker:
        </span>
        {months.map((m) => {
          const isActive = activeMonthKey === m.key;
          return (
            <button
              key={m.key}
              onClick={() => onSelectMonth(m.firstDateIso)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-nordic-sm font-semibold'
                  : 'bg-zinc-100/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white'
              }`}
            >
              {m.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Date Navigation & Stepper */}
      <div className="flex items-center justify-between w-full md:w-auto gap-3">
        {/* Days count toggle */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-black/5 dark:border-zinc-700 text-xs">
          <button
            onClick={() => onDaysPerPageChange(7)}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              daysPerPage === 7
                ? 'bg-white dark:bg-[#18181B] text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => onDaysPerPageChange(14)}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              daysPerPage === 14
                ? 'bg-white dark:bg-[#18181B] text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            14 Days
          </button>
          <button
            onClick={() => onDaysPerPageChange(31)}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              daysPerPage === 31
                ? 'bg-white dark:bg-[#18181B] text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            Month
          </button>
        </div>

        {/* Current Date Range Display */}
        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 tracking-tight">
          {formattedRangeLabel}
        </span>

        {/* Pagination Arrows (< and >) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevious}
            disabled={!canGoPrev}
            aria-label="Previous Days"
            className={`p-2 rounded-lg border transition-all ${
              canGoPrev
                ? 'bg-white dark:bg-[#18181B] text-zinc-800 dark:text-zinc-200 border-black/10 dark:border-zinc-700 hover:border-black/30 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-nordic-sm'
                : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-300 dark:text-zinc-700 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onResetToToday}
            title="Snap to Sep 1 / Today"
            className="px-2.5 py-1.5 rounded-lg border border-black/10 dark:border-zinc-700 bg-white dark:bg-[#18181B] hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium shadow-nordic-sm flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            Today
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next Days"
            className={`p-2 rounded-lg border transition-all ${
              canGoNext
                ? 'bg-white dark:bg-[#18181B] text-zinc-800 dark:text-zinc-200 border-black/10 dark:border-zinc-700 hover:border-black/30 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-nordic-sm'
                : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-300 dark:text-zinc-700 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
