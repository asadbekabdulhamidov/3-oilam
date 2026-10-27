import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Quote } from 'lucide-react';

export function ArtworkPanel({
  artwork,
  onClose,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = true,
}) {
  if (!artwork) return null;

  // Keyboard accessibility: ESC to close, Arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Museum Exhibition Note Card */}
      <div
        className="relative max-w-2xl w-full luxury-glass-gold rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D3B47B]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3B47B]/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Top Header / Metadata Row */}
        <div className="flex items-start justify-between gap-4 border-b border-[#CBD8E2]/15 pb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D3B47B] font-semibold">
                EXHIBIT {String(artwork.index).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#CBD8E2]/40">•</span>
              <span className="font-ui text-xs uppercase tracking-wider text-[#8FBAD8]">
                {artwork.chapter || 'MEMORY ARCHIVE'}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mt-1.5 text-xs text-[#CBD8E2]/70 font-ui">
              {artwork.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D3B47B]" />
                  {artwork.date}
                </span>
              )}
              {artwork.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8FBAD8]" />
                  {artwork.location}
                </span>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#CBD8E2]/20 hover:border-[#D3B47B] hover:bg-[#D3B47B]/10 text-[#CBD8E2] hover:text-[#FCFCFA] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#D3B47B]"
            aria-label="Return to museum gallery"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Title & Poetic Narrative */}
        <div className="flex flex-col gap-4">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#FCFCFA] leading-tight">
            {artwork.title}
          </h2>

          {/* Poetic Inscription / Quote */}
          {artwork.quote && (
            <div className="relative pl-6 py-2 border-l-2 border-[#D3B47B]">
              <p className="font-editorial italic text-lg sm:text-xl text-[#CBD8E2] leading-relaxed">
                {artwork.quote}
              </p>
            </div>
          )}

          {/* Full Emotional Narrative */}
          <p className="font-editorial text-base sm:text-lg text-[#F5F1E9]/90 leading-relaxed font-light">
            {artwork.description}
          </p>
        </div>

        {/* Navigation & Return Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#CBD8E2]/15 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-2 rounded-full border border-[#CBD8E2]/20 flex items-center justify-center transition-all ${
                hasPrev
                  ? 'hover:border-[#D3B47B] hover:text-[#D3B47B] text-[#CBD8E2]'
                  : 'opacity-30 cursor-not-allowed text-[#CBD8E2]'
              }`}
              title="Previous Moment"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`p-2 rounded-full border border-[#CBD8E2]/20 flex items-center justify-center transition-all ${
                hasNext
                  ? 'hover:border-[#D3B47B] hover:text-[#D3B47B] text-[#CBD8E2]'
                  : 'opacity-30 cursor-not-allowed text-[#CBD8E2]'
              }`}
              title="Next Moment"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="font-ui text-xs tracking-[0.2em] uppercase text-[#D3B47B] hover:text-[#FCFCFA] transition-colors"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
