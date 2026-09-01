import React from 'react';
import { Company, LaunchUpdate } from '../types';
import { Sparkles, Activity, Layers, Compass } from 'lucide-react';

interface StatsSummaryProps {
  companies: Company[];
  launches: LaunchUpdate[];
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ companies, launches }) => {
  const totalLaunches = launches.length;
  const milestonesCount = launches.filter((l) => l.isHighlight).length;

  // Find top lab
  const labCounts: Record<string, number> = {};
  launches.forEach((l) => {
    labCounts[l.companyId] = (labCounts[l.companyId] || 0) + 1;
  });

  let topLabName = 'Anthropic';
  let maxCount = 0;
  Object.entries(labCounts).forEach(([labId, count]) => {
    if (count > maxCount) {
      maxCount = count;
      const found = companies.find((c) => c.id === labId);
      if (found) topLabName = found.shortName;
    }
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-nordic-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 leading-tight">
            {totalLaunches}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">Releases Logged</div>
        </div>
      </div>

      <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-nordic-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 fill-amber-300" />
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 leading-tight">
            {milestonesCount}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">Major Milestones</div>
        </div>
      </div>

      <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-nordic-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 leading-tight">
            {companies.length}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">Frontier Labs</div>
        </div>
      </div>

      <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-nordic-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-bold text-zinc-900 leading-tight truncate max-w-[120px]">
            {topLabName} ({maxCount})
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">Top Velocity Lab</div>
        </div>
      </div>
    </div>
  );
};
