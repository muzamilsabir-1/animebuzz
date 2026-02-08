
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ANIME_DATA } from '../mockData';
import { Anime } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (view: string) => void;
  activeView: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onNavigate, activeView, isDarkMode, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const suggestions = useMemo(() => {
    if (!searchValue) return [];
    return ANIME_DATA.filter(a => 
      a.title.toLowerCase().includes(searchValue.toLowerCase())
    ).slice(0, 5);
  }, [searchValue]);

  const navLinks = ['Home', 'Latest', 'Movies', 'Series', 'Favorites'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('Home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl italic">A</span>
          </div>
          <span className="text-2xl font-black tracking-tight hidden sm:block">
            Anime<span className="text-purple-600 dark:text-purple-500">Site</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-6 ml-8">
          {navLinks.map((link) => (
            <button 
              key={link} 
              onClick={() => onNavigate(link)}
              className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                activeView === link 
                  ? 'text-purple-600 dark:text-purple-400 font-bold' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              {link}
              {activeView === link && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 flex-grow max-w-md ml-4 sm:ml-8" ref={searchRef}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => searchValue && setShowSuggestions(true)}
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-slate-900 dark:text-white"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in-down">
                {suggestions.map(anime => (
                  <div 
                    key={anime.id}
                    onClick={() => {
                      setSearchValue(anime.title);
                      onSearch(anime.title);
                      setShowSuggestions(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                  >
                    <img src={anime.image} className="w-10 h-14 object-cover rounded-md shadow-sm" alt={anime.title} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{anime.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{anime.year} • {anime.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onToggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 9h1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
