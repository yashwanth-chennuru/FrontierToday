import React, { useState } from 'react';
import { Company } from '../types';
import { CompanyLogo } from './CompanyLogos';
import { ExternalLink } from 'lucide-react';

interface CompanyHeaderCellProps {
  company: Company;
  launchCount: number;
  onFilterClick?: (companyId: string) => void;
  isSelected?: boolean;
}

export const CompanyHeaderCell: React.FC<CompanyHeaderCellProps> = ({
  company,
  launchCount,
  onFilterClick,
  isSelected,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center py-4 px-3 min-w-[130px] md:min-w-[145px] select-none group cursor-pointer transition-all"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => onFilterClick && onFilterClick(company.id)}
    >
      {/* Brand Icon Button */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-nordic'
            : 'bg-white dark:bg-[#202024] text-zinc-900 dark:text-zinc-100 border border-black/10 dark:border-zinc-700/70 hover:border-black/25 dark:hover:border-zinc-500 hover:bg-black/[0.03] dark:hover:bg-zinc-800 shadow-nordic-sm'
        }`}
      >
        <div className="w-7 h-7 flex items-center justify-center">
          <CompanyLogo
            logoKey={company.logoKey}
            className={isSelected ? 'brightness-200' : 'text-zinc-900 dark:text-zinc-100'}
            size={24}
          />
        </div>
      </div>

      {/* Label in Scandinavian style */}
      <div className="mt-2 text-center flex flex-col items-center">
        <span className="text-[13px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
          {company.shortName}
        </span>
      </div>

      {/* Floating Tooltip with company details */}
      {showTooltip && (
        <div
          className="absolute top-[85px] z-50 w-56 p-3 bg-white dark:bg-[#1E1E22] rounded-xl shadow-nordic-lg border border-black/10 dark:border-zinc-700 text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{ transform: 'translateX(-50%)', left: '50%' }}
        >
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-black/[0.06] dark:border-zinc-700/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <CompanyLogo logoKey={company.logoKey} className="text-zinc-800 dark:text-zinc-200" size={16} />
              </div>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{company.name}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
              {company.country}
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300 mt-2 mb-2">
            {company.tagline}
          </p>

          <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            <span>{launchCount} {launchCount === 1 ? 'launch' : 'launches'} logged</span>
            <span className="flex items-center gap-0.5 text-zinc-700 dark:text-zinc-300">
              Visit <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
