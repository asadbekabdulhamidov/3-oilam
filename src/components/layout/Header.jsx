import React from 'react';
import { Volume2, VolumeX, Sparkles, Image as ImageIcon } from 'lucide-react';

export function Header({
  isAudioPlaying = false,
  onToggleAudio,
  onOpenCurator,
  hasEntered = false,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-12 md:py-7 flex items-center justify-between pointer-events-none transition-opacity duration-700">
      {/* Brand & Wordmark */}
      <div className="flex flex-col items-start pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D3B47B] animate-pulse" />
          <h1 className="font-display text-sm md:text-base tracking-[0.28em] uppercase text-[#FCFCFA] font-bold">
            OUR LITTLE WORLD
          </h1>
        </div>
        <div className="flex items-center gap-3 mt-0.5 ml-4">
          <span className="font-editorial italic text-xs md:text-sm text-[#CBD8E2] tracking-wider">
            Memory Museum
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D3B47B]/80 px-1.5 py-0.5 rounded border border-[#D3B47B]/25">
            Edition 001
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Curate Photos / Custom Family Album Button */}
        <button
          onClick={onOpenCurator}
          className="luxury-glass px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-xs font-medium tracking-wider text-[#CBD8E2] hover:text-[#FCFCFA] hover:border-[#D3B47B]/40 hover:bg-[#162537]/80 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#D3B47B] outline-none"
          title="Curate Family Photographs"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#D3B47B]" />
          <span className="hidden sm:inline">Memory Curator</span>
        </button>

        {/* Ambient Soundtrack Toggle */}
        <button
          onClick={onToggleAudio}
          className={`luxury-glass p-2.5 md:px-3.5 md:py-2 rounded-full flex items-center gap-2 text-xs font-medium tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#D3B47B] ${
            isAudioPlaying
              ? 'border-[#D3B47B]/50 text-[#FCFCFA] shadow-[0_0_15px_rgba(211,180,123,0.2)]'
              : 'text-[#CBD8E2]/70 hover:text-[#FCFCFA]'
          }`}
          aria-label={isAudioPlaying ? 'Mute ambient soundtrack' : 'Play subtle ambient soundtrack'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D3B47B] animate-pulse" />
              <span className="hidden md:inline text-[11px] uppercase tracking-widest text-[#D3B47B]">
                Sound On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] uppercase tracking-widest">
                Sound Off
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
