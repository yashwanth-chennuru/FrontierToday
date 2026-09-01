import React from 'react';
import { Company, LaunchUpdate } from '../types';
import { getDayInfo } from '../utils/dates';
import { CompanyLogo } from './CompanyLogos';

interface FeedViewProps {
  launches: LaunchUpdate[];
  companies: Company[];
  onLaunchClick: (launch: LaunchUpdate) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  launches,
  companies,
  onLaunchClick,
}) => {
  // Sort descending by date
  const sortedLaunches = [...launches].sort((a, b) => b.date.localeCompare(a.date));

  const companyMap = React.useMemo(() => {
    const map = new Map<string, Company>();
    companies.forEach((c) => map.set(c.id, c));
    return map;
  }, [companies]);

  // Group by date
  const grouped = React.useMemo(() => {
    const groups: { date: string; items: LaunchUpdate[] }[] = [];
    sortedLaunches.forEach((l) => {
      let g = groups.find((grp) => grp.date === l.date);
      if (!g) {
        g = { date: l.date, items: [] };
        groups.push(g);
      }
      g.items.push(l);
    });
    return groups;
  }, [sortedLaunches]);

  if (grouped.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#18181B] rounded-2xl border border-black/10 dark:border-zinc-800 shadow-nordic-sm">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No launch updates found matching your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {grouped.map((group) => {
        const dayInfo = getDayInfo(group.date);

        return (
          <div key={group.date} className="bg-white dark:bg-[#18181B] rounded-2xl border border-black/10 dark:border-zinc-800 p-5 shadow-nordic-sm">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-black/[0.06] dark:border-zinc-800">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {dayInfo.fullMonthName} {dayInfo.dayNumber}, {dayInfo.year}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                ({dayInfo.dayOfWeek})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((launch) => {
                const comp = companyMap.get(launch.companyId);
                return (
                  <div
                    key={launch.id}
                    onClick={() => onLaunchClick(launch)}
                    className="p-4 rounded-xl border border-black/10 dark:border-zinc-700/80 hover:border-black/30 dark:hover:border-zinc-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer shadow-nordic-sm group flex flex-col justify-between bg-white dark:bg-[#1E1E22]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                            {comp ? <CompanyLogo logoKey={comp.logoKey} className="text-zinc-800 dark:text-zinc-200" size={16} /> : null}
                          </div>
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                            {comp?.name || launch.companyId}
                          </span>
                        </div>

                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {launch.category}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
                        {launch.title}
                      </h3>

                      {launch.summary && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {launch.summary}
                        </p>
                      )}
                    </div>

                    {launch.tags && launch.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-black/[0.04] dark:border-zinc-800">
                        {launch.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
