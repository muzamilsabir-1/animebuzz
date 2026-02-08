
import React, { useState, useEffect } from 'react';
import { ANIME_DATA } from '../mockData';
import { Anime } from '../types';

interface HeroProps {
  onWatch: (anime: Anime) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

const Hero: React.FC<HeroProps> = ({ onWatch, onToggleFavorite, favorites }) => {
  const featured = ANIME_DATA.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {featured.map((anime, idx) => (
        <div
          key={anime.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
          
          <img
            src={anime.banner}
            alt={anime.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl animate-fade-in-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-purple-600 text-xs font-bold rounded uppercase tracking-wider">Featured</span>
                  <span className="text-cyan-400 text-sm font-semibold flex items-center gap-1">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {anime.rating} Rating
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
                  {anime.title}
                </h1>
                <p className="text-slate-300 text-lg mb-8 line-clamp-3">
                  {anime.description}
                </p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onWatch(anime)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-purple-600/20 transform hover:-translate-y-1 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    Watch Now
                  </button>
                  <button 
                    onClick={() => onToggleFavorite(anime.id)}
                    className={`px-8 py-3 rounded-full font-bold backdrop-blur-md transform hover:-translate-y-1 transition-all flex items-center gap-2 ${
                      favorites.includes(anime.id) 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700'
                    }`}
                  >
                    <svg className={`w-5 h-5 ${favorites.includes(anime.id) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {favorites.includes(anime.id) ? 'In List' : 'Add to List'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === activeIndex ? 'bg-purple-500 w-8' : 'bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
