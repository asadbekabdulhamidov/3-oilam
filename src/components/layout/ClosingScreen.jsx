import React from 'react';
import { RotateCcw, Heart, Sparkles, BookOpen } from 'lucide-react';

export function ClosingScreen({ isClosing = false, onReplay, onOpenCurator }) {
  if (!isClosing) return null;

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-center items-center text-center px-6 py-12 pointer-events-none transition-all duration-1000 ease-out bg-gradient-to-t from-[#101719]/90 via-[#101E30]/40 to-transparent">
      <div className="max-w-2xl mx-auto flex flex-col items-center pointer-events-auto">
        {/* Heart & Sparkle Emblem */}
        <div className="w-14 h-14 rounded-full border border-[#D3B47B]/40 bg-[#101E30]/80 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(211,180,123,0.3)]">
          <Heart className="w-6 h-6 text-[#D3B47B] animate-pulse" />
        </div>

        {/* Closing Headline */}
        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#FCFCFA] leading-tight mb-4">
          Every Little World <br />
          <span className="italic font-light gold-gradient-text">
            Holds a Lifetime of Love.
          </span>
        </h2>

        {/* Supporting Gratitude Inscription */}
        <p className="font-editorial italic text-xl sm:text-2xl text-[#CBD8E2] max-w-lg mx-auto font-light leading-relaxed mb-8">
          Thank you for visiting our little world. Ten moments that will forever illuminate our path.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Replay Experience */}
          <button
            onClick={onReplay}
            className="group px-8 py-3.5 rounded-full luxury-glass-gold flex items-center gap-3 text-xs md:text-sm font-display tracking-[0.2em] uppercase text-[#FCFCFA] hover:text-[#D3B47B] hover:border-[#D3B47B] hover:shadow-[0_0_25px_rgba(211,180,123,0.3)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#D3B47B]"
          >
            <RotateCcw className="w-4 h-4 text-[#D3B47B] group-hover:-rotate-90 transition-transform duration-500" />
            <span>Replay Experience</span>
          </button>

          {/* Curate / Personalize Memories */}
          <button
            onClick={onOpenCurator}
            className="px-6 py-3.5 rounded-full luxury-glass flex items-center gap-2.5 text-xs font-ui tracking-wider text-[#CBD8E2] hover:text-[#FCFCFA] hover:border-[#8FBAD8]/50 transition-all duration-300 outline-none"
          >
            <BookOpen className="w-4 h-4 text-[#8FBAD8]" />
            <span>Personalize Family Photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
