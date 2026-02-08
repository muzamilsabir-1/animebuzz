
import React from 'react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, onToggleFavorite, isFavorite }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      {/* Poster Image Container */}
      <div className="aspect-[2/3] rounded-2xl overflow-hidden relative shadow-lg shadow-black/10 dark:shadow-black/40 bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 group-hover:border-purple-600 dark:group-hover:border-purple-500 transition-colors duration-300">
        <div className="absolute inset-0 bg-slate-800 animate-pulse group-hover:hidden" />
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors z-20" />
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-30">
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/20">
            <svg className="w-3 h-3 text-yellow-500 dark:text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] font-bold text-slate-900 dark:text-white">{anime.rating}</span>
          </div>
          <div className="bg-purple-600 dark:bg-purple-600/90 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm border border-white/10">
            <span className="text-[10px] font-black text-white uppercase">{anime.language}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all z-30 ${
            isFavorite 
              ? 'bg-pink-500 text-white scale-110 shadow-lg border border-white/20' 
              : 'bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-purple-600 dark:hover:bg-slate-900/80 border border-transparent'
          }`}
        >
          <svg className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Bottom Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <p className="text-[10px] text-slate-200 mb-2 line-clamp-3 leading-relaxed">{anime.description}</p>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">{anime.episodes} episodes</span>
            <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">{anime.type}</span>
          </div>
        </div>
      </div>

      {/* Text Info */}
      <div className="mt-3 px-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
          {anime.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[11px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wide">{anime.genres[0]}</span>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
          <span className="text-[11px] text-slate-500 dark:text-slate-500 font-bold">{anime.year}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
