import React from 'react';
import { LaunchUpdate, CategoryType } from '../types';

interface LaunchCardProps {
  launch: LaunchUpdate;
  onClick: (launch: LaunchUpdate) => void;
}

const getCategoryColor = (category: CategoryType) => {
  switch (category) {
    case 'Foundation Model':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-800 dark:text-amber-300',
        border: 'border-amber-200/60 dark:border-amber-800/40',
        dot: 'bg-amber-500'
      };
    case 'Agentic AI':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-800 dark:text-emerald-300',
        border: 'border-emerald-200/60 dark:border-emerald-800/40',
        dot: 'bg-emerald-500'
      };
    case 'Vision & Video':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        text: 'text-indigo-800 dark:text-indigo-300',
        border: 'border-indigo-200/60 dark:border-indigo-800/40',
        dot: 'bg-indigo-500'
      };
    case 'Code & Reasoning':
      return {
        bg: 'bg-cyan-50 dark:bg-cyan-950/40',
        text: 'text-cyan-800 dark:text-cyan-300',
        border: 'border-cyan-200/60 dark:border-cyan-800/40',
        dot: 'bg-cyan-500'
      };
    case 'Voice & Audio':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-800 dark:text-rose-300',
        border: 'border-rose-200/60 dark:border-rose-800/40',
        dot: 'bg-rose-500'
      };
    case 'Research & Benchmark':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/40',
        text: 'text-purple-800 dark:text-purple-300',
        border: 'border-purple-200/60 dark:border-purple-800/40',
        dot: 'bg-purple-500'
      };
    default:
      return {
        bg: 'bg-zinc-100 dark:bg-zinc-800',
        text: 'text-zinc-700 dark:text-zinc-300',
        border: 'border-zinc-200 dark:border-zinc-700',
        dot: 'bg-zinc-400'
      };
  }
};

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch, onClick }) => {
  const catStyle = getCategoryColor(launch.category);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(launch);
      }}
      className="group relative p-2.5 rounded-xl border bg-white dark:bg-[#1E1E22] shadow-nordic-sm transition-all duration-150 hover:shadow-nordic hover:-translate-y-0.5 cursor-pointer border-black/10 dark:border-zinc-700/60 hover:border-black/30 dark:hover:border-zinc-500 w-full text-left"
    >
      {/* Category tag */}
      <div className="flex items-center gap-1 mb-1.5">
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
          <span className="truncate max-w-[95px]">{launch.category.replace(' & Reasoning', '').replace('AI', '')}</span>
        </span>
      </div>

      {/* Main Title (clean, bold, short info) */}
      <h4 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-black dark:group-hover:text-white line-clamp-2">
        {launch.title}
      </h4>
    </div>
  );
};
