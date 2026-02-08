
import React, { useState, useEffect } from 'react';
import { Anime } from '../types';

interface VideoPlayerOverlayProps {
  anime: Anime;
  onClose: () => void;
}

const VideoPlayerOverlay: React.FC<VideoPlayerOverlayProps> = ({ anime, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.1, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-white">{anime.title}</h2>
            <p className="text-sm text-slate-400">Episode 01 - Resurgence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-purple-400 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Center Mock Player */}
      <div className="relative w-full aspect-video max-w-6xl group">
        <img 
          src={anime.banner} 
          className="w-full h-full object-cover opacity-60 rounded-xl"
          alt="Player background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24 h-24 bg-purple-600/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-purple-500/40"
          >
            {isPlaying ? (
              <svg className="w-12 h-12 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-12 h-12 fill-current ml-2" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Progress Bar */}
          <div className="relative h-1.5 w-full bg-slate-800 rounded-full cursor-pointer group">
            <div 
              className="absolute h-full bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute h-4 w-4 bg-white rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              style={{ left: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-purple-400 transition-colors">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span className="text-sm">75%</span>
              </div>
              <span className="text-sm text-slate-400">
                {Math.floor(progress * 0.24)}:{(Math.floor(progress * 60) % 60).toString().padStart(2, '0')} / 24:00
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-sm hover:text-purple-400 transition-colors">Subtitles (EN)</button>
              <button className="hover:text-purple-400 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerOverlay;
