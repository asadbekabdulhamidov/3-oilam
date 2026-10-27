import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';

export function IntroScreen({ onEnter, hasEntered = false }) {
  if (hasEntered) return null;

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between items-center text-center px-6 py-16 md:py-24 pointer-events-none transition-all duration-1000 ease-out">
      {/* Top spacing */}
      <div />

      {/* Main Hero Exhibition Typography */}
      <div className="max-w-3xl mx-auto flex flex-col items-center pointer-events-auto">
        {/* Exhibition Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D3B47B]/30 bg-[#101E30]/60 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D3B47B]" />
          <span className="font-ui text-[11px] uppercase tracking-[0.25em] text-[#CBD8E2] font-semibold">
            Ten Moments · One Beautiful Story
          </span>
        </div>

        {/* Refined Luxury Headline */}
        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-[#FCFCFA] mb-6">
          A Little World <br />
          <span className="italic font-normal gold-gradient-text">Of Our Own.</span>
        </h2>

        {/* Poetic Supporting Narrative */}
        <p className="font-editorial italic text-lg sm:text-2xl text-[#CBD8E2]/90 max-w-xl mx-auto font-light leading-relaxed mb-10">
          Ten moments, countless feelings, and a lifetime of memories gathered within an enchanting frozen sanctuary.
        </p>

        {/* Enter The Museum CTA */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-3.5 md:px-10 md:py-4 rounded-full overflow-hidden transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#D3B47B] outline-none"
        >
          {/* Subtle Golden Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D3B47B]/20 via-[#FCFCFA]/15 to-[#8FBAD8]/20 backdrop-blur-md border border-[#D3B47B]/60 rounded-full transition-all duration-500 group-hover:border-[#D3B47B] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(211,180,123,0.35)]" />
          
          <div className="relative flex items-center gap-3.5">
            <span className="font-display text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#FCFCFA] group-hover:text-[#D3B47B] transition-colors duration-300">
              Enter the Museum
            </span>
            <Compass className="w-4 h-4 text-[#D3B47B] group-hover:rotate-45 transition-transform duration-500" />
          </div>
        </button>
      </div>

      {/* Discreet Scroll Guidance Indicator */}
      <div className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer opacity-75 hover:opacity-100 transition-opacity" onClick={onEnter}>
        <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#CBD8E2]/70">
          Scroll or click to begin journey
        </span>
        <div className="w-5 h-8 rounded-full border border-[#CBD8E2]/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D3B47B] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
