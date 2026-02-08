
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import SidebarFilters from './components/SidebarFilters';
import AnimeGrid from './components/AnimeGrid';
import Footer from './components/Footer';
import AnimeDetailModal from './components/AnimeDetailModal';
import VideoPlayerOverlay from './components/VideoPlayerOverlay';
import SupportPages from './components/SupportPages';
import { ANIME_DATA } from './mockData';
import { Anime } from './types';

const ITEMS_PER_PAGE = 5;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [viewFavoritesOnly, setViewFavoritesOnly] = useState(false);
  const [activeSupportPage, setActiveSupportPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const [activeFilters, setActiveFilters] = useState({
    type: 'All',
    status: 'All',
    year: 'All',
    language: 'All'
  });

  // Sync theme with document class and local storage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('anime-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('anime-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleNavigate = (view: string) => {
    // Reset standard views
    setViewFavoritesOnly(false);
    setSearchQuery('');
    setSelectedGenre(null);
    setCurrentPage(1);
    setActiveSupportPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (view) {
      case 'Home':
        setActiveFilters({ type: 'All', status: 'All', year: 'All', language: 'All' });
        break;
      case 'Latest':
        setActiveFilters({ type: 'All', status: 'All', year: '2024', language: 'All' });
        break;
      case 'Movies':
        setActiveFilters({ type: 'Movie', status: 'All', year: 'All', language: 'All' });
        break;
      case 'Series':
        setActiveFilters({ type: 'Series', status: 'All', year: 'All', language: 'All' });
        break;
      case 'Favorites':
        setViewFavoritesOnly(true);
        break;
      case 'About Us':
      case 'Contact':
      case 'Terms of Service':
      case 'Privacy Policy':
        setActiveSupportPage(view);
        break;
      default:
        break;
    }
  };

  const activeView = useMemo(() => {
    if (activeSupportPage) return activeSupportPage;
    if (viewFavoritesOnly) return 'Favorites';
    if (activeFilters.year === '2024' && activeFilters.type === 'All' && !searchQuery && !selectedGenre) return 'Latest';
    if (activeFilters.type === 'Movie' && !searchQuery && !selectedGenre) return 'Movies';
    if (activeFilters.type === 'Series' && !searchQuery && !selectedGenre) return 'Series';
    if (!searchQuery && !selectedGenre && activeFilters.type === 'All' && activeFilters.year === 'All') return 'Home';
    return '';
  }, [viewFavoritesOnly, activeFilters, searchQuery, selectedGenre, activeSupportPage]);

  const filteredAnime = useMemo(() => {
    return ANIME_DATA.filter(anime => {
      const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || anime.genres.includes(selectedGenre);
      const matchesType = activeFilters.type === 'All' || anime.type === activeFilters.type;
      const matchesStatus = activeFilters.status === 'All' || anime.status === activeFilters.status;
      const matchesLanguage = activeFilters.language === 'All' || 
                             (activeFilters.language === 'Sub' && (anime.language === 'Sub' || anime.language === 'Both')) ||
                             (activeFilters.language === 'Dub' && (anime.language === 'Dub' || anime.language === 'Both'));
      const matchesYear = activeFilters.year === 'All' || anime.year.toString() === activeFilters.year;
      const matchesFavorites = !viewFavoritesOnly || favorites.includes(anime.id);

      return matchesSearch && matchesGenre && matchesType && matchesStatus && matchesLanguage && matchesYear && matchesFavorites;
    });
  }, [searchQuery, selectedGenre, activeFilters, viewFavoritesOnly, favorites]);

  const paginatedAnime = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAnime.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAnime, currentPage]);

  const totalPages = Math.ceil(filteredAnime.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, activeFilters, viewFavoritesOnly]);

  const handleWatch = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsPlayerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-purple-500/30">
      <Navbar 
        onSearch={setSearchQuery} 
        onNavigate={handleNavigate}
        activeView={activeView}
        isDarkMode={theme === 'dark'}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />
      
      <main className="flex-grow pt-16">
        {activeSupportPage ? (
          <SupportPages 
            activePage={activeSupportPage} 
            onBack={() => handleNavigate('Home')} 
          />
        ) : (
          <>
            <Hero 
              onWatch={handleWatch}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <CategoryBar 
                selectedGenre={selectedGenre} 
                onSelectGenre={setSelectedGenre} 
              />

              <div className="flex flex-col lg:flex-row gap-8 mt-12">
                <aside className="lg:w-64 flex-shrink-0">
                  <SidebarFilters 
                    filters={activeFilters} 
                    onFilterChange={(key, val) => setActiveFilters(prev => ({ ...prev, [key]: val }))} 
                  />
                </aside>

                <section className="flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {viewFavoritesOnly ? 'My Favorites' : selectedGenre ? `${selectedGenre} Anime` : 'Explore Anime'}
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Showing {filteredAnime.length} results</span>
                  </div>
                  
                  <AnimeGrid 
                    animeList={paginatedAnime} 
                    onCardClick={setSelectedAnime}
                    onToggleFavorite={toggleFavorite}
                    favorites={favorites}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                  
                  {filteredAnime.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-500">
                      <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xl font-medium">
                        {viewFavoritesOnly ? "You haven't added any favorites yet!" : "No results found for your filters"}
                      </p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedGenre(null);
                          setViewFavoritesOnly(false);
                          setActiveFilters({ type: 'All', status: 'All', year: 'All', language: 'All' });
                        }}
                        className="mt-4 text-purple-600 dark:text-purple-400 hover:underline underline-offset-4"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
        )}
      </main>

      {selectedAnime && !isPlayerOpen && (
        <AnimeDetailModal 
          anime={selectedAnime} 
          onClose={() => setSelectedAnime(null)}
          onWatch={() => setIsPlayerOpen(true)}
          isFavorite={favorites.includes(selectedAnime.id)}
          onToggleFavorite={() => toggleFavorite(selectedAnime.id)}
        />
      )}

      {isPlayerOpen && selectedAnime && (
        <VideoPlayerOverlay 
          anime={selectedAnime} 
          onClose={() => setIsPlayerOpen(false)} 
        />
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
