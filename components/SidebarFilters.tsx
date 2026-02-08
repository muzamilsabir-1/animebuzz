
import React from 'react';

interface SidebarFiltersProps {
  filters: {
    type: string;
    status: string;
    year: string;
    language: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ filters, onFilterChange }) => {
  const FILTER_GROUPS = [
    {
      label: 'Format',
      key: 'type',
      options: ['All', 'Series', 'Movie']
    },
    {
      label: 'Status',
      key: 'status',
      options: ['All', 'Ongoing', 'Completed']
    },
    {
      label: 'Year',
      key: 'year',
      options: ['All', '2024', '2023', '2022', '2021']
    },
    {
      label: 'Language',
      key: 'language',
      options: ['All', 'Sub', 'Dub']
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Filters</h3>
      </div>

      <div className="space-y-8">
        {FILTER_GROUPS.map((group) => (
          <div key={group.key}>
            <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              {group.label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => (
                <button
                  key={option}
                  onClick={() => onFilterChange(group.key, option)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    (filters as any)[group.key] === option
                      ? 'bg-purple-600/10 border-purple-600 text-purple-600 dark:bg-purple-500/10 dark:border-purple-500 dark:text-purple-400'
                      : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          onFilterChange('type', 'All');
          onFilterChange('status', 'All');
          onFilterChange('year', 'All');
          onFilterChange('language', 'All');
        }}
        className="w-full mt-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-purple-600 dark:hover:text-slate-100 transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default SidebarFilters;
