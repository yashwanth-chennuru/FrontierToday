import React from 'react';
import { Company, LaunchUpdate } from '../types';
import { CompanyLogo } from './CompanyLogos';
import { X, ExternalLink, Calendar, Edit2, Trash2, Tag } from 'lucide-react';
import { getDayInfo } from '../utils/dates';

interface LaunchDetailDrawerProps {
  launch: LaunchUpdate | null;
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (launch: LaunchUpdate) => void;
  onDelete: (launchId: string) => void;
  isAdmin?: boolean;
}

export const LaunchDetailDrawer: React.FC<LaunchDetailDrawerProps> = ({
  launch,
  company,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  if (!isOpen || !launch || !company) return null;

  const dayInfo = getDayInfo(launch.date);

  const handleDelete = () => {
    if (window.confirm(`Delete launch "${launch.title}"?`)) {
      onDelete(launch.id);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E1E22] rounded-2xl shadow-nordic-lg border border-black/10 dark:border-zinc-700/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-black/[0.08] dark:border-zinc-800 flex items-start justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#28282C] border border-black/10 dark:border-zinc-700 shadow-nordic-sm flex items-center justify-center text-zinc-900 dark:text-zinc-100">
              <CompanyLogo logoKey={company.logoKey} className="text-zinc-900 dark:text-zinc-100" size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{company.name}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  {company.country}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{company.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Date & Category Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>{dayInfo.fullMonthName} {dayInfo.dayNumber}, {dayInfo.year} ({dayInfo.dayOfWeek})</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black/5 dark:border-zinc-700">
                {launch.category}
              </span>
            </div>
          </div>

          {/* Launch Title */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {launch.title}
            </h2>
          </div>

          {/* Summary */}
          {launch.summary && (
            <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-zinc-800">
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {launch.summary}
              </p>
            </div>
          )}

          {/* External Links */}
          {launch.links && launch.links.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Official Sources & Links
              </h4>
              <div className="space-y-1.5">
                {launch.links.map((lnk, idx) => (
                  <a
                    key={idx}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-black/10 dark:border-zinc-700/80 hover:border-black/30 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all text-xs font-medium text-zinc-800 dark:text-zinc-200 group"
                  >
                    <span>{lnk.label || lnk.url}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {launch.tags && launch.tags.length > 0 && (
            <div>
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <Tag className="w-3 h-3 text-zinc-400 dark:text-zinc-500 mr-1" />
                {launch.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono border border-black/5 dark:border-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className={`p-4 border-t border-black/[0.08] dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center ${
          isAdmin ? 'justify-between' : 'justify-end'
        }`}>
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => {
                  onEdit(launch);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-black/10 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-nordic-sm transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-nordic-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
