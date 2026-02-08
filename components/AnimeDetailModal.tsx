
import React from 'react';
import { Anime } from '../types';

interface AnimeDetailModalProps {
  anime: Anime;
  onClose: () => void;
  onWatch: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ 
  anime, onClose, onWatch, isFavorite, onToggleFavorite 
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-[#020617]/90 backdrop-blur-md dark:backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Poster */}
          <div className="md:w-1/3 aspect-[2/3] md:aspect-auto">
            <img src={anime.image} alt={anime.title} className="w-full h-full object-cover" />
          </div>

          {/* Right Side: Details */}
          <div className="flex-grow p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 text-xs font-black rounded-lg uppercase tracking-wider border border-purple-200 dark:border-purple-600/30">
                {anime.type}
              </span>
              <span className="text-slate-500 dark:text-slate-500 text-sm font-bold">{anime.year}</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
              <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold flex items-center gap-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {anime.rating} / 10
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {anime.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map(genre => (
                <span key={genre} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700">
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
              {anime.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={onWatch}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-purple-600/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Now
              </button>
              
              <button 
                onClick={onToggleFavorite}
                className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 ${
                  isFavorite 
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? 'In Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailModal;
