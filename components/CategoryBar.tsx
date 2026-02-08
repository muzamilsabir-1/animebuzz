
import React from 'react';
import { Genre } from '../types';

interface CategoryBarProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

const GENRES: Genre[] = [
  'Action', 'Romance', 'Comedy', 'Fantasy', 'Horror', 'Sci-Fi', 'Slice of Life', 'Slice of Life1111', 'Adventure'
];

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedGenre, onSelectGenre }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600 dark:text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Quick Genres
        </h3>
        <button 
          onClick={() => onSelectGenre(null)}
          className={`text-sm font-medium transition-colors ${!selectedGenre ? 'text-purple-600 dark:text-purple-500' : 'text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400'}`}
        >
          All Genres
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(selectedGenre === genre ? null : genre)}
            className={`relative group overflow-hidden rounded-xl py-4 px-2 text-center transition-all ${
              selectedGenre === genre 
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-600/20' 
                : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none'
            }`}
          >
            <span className={`text-sm font-bold relative z-10 transition-colors ${
              selectedGenre === genre ? 'text-white' : 'text-slate-700 dark:text-slate-300'
            }`}>
              {genre}
            </span>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/20 transform transition-transform duration-300 ${
              selectedGenre === genre ? 'translate-y-0' : 'translate-y-full'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
