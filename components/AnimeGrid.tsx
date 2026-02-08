
import React from 'react';
import AnimeCard from './AnimeCard';
import { Anime } from '../types';

interface AnimeGridProps {
  animeList: Anime[];
  onCardClick: (anime: Anime) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ 
  animeList, 
  onCardClick, 
  onToggleFavorite, 
  favorites,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        {animeList.map((anime) => (
          <AnimeCard 
            key={anime.id} 
            anime={anime} 
            onClick={() => onCardClick(anime)}
            onToggleFavorite={() => onToggleFavorite(anime.id)}
            isFavorite={favorites.includes(anime.id)}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <nav className="inline-flex rounded-xl bg-slate-800/50 p-1 border border-slate-700">
            <button 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-bold transition-colors ${
                currentPage === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
              }`}
            >
              Previous
            </button>
            <div className="flex items-center gap-1 px-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => onPageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                    currentPage === i + 1 
                      ? 'bg-purple-600 text-white scale-110 shadow-lg shadow-purple-600/20' 
                      : 'hover:bg-slate-700 text-slate-400 font-bold'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-bold transition-colors ${
                currentPage === totalPages ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AnimeGrid;
