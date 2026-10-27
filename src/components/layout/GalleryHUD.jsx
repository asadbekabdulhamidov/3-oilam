import React from 'react';
import { Eye, ChevronRight, ChevronLeft } from 'lucide-react';

export function GalleryHUD({
  activeArtwork,
  activeIndex = 0,
  totalArtworks = 10,
  onSelectArtwork,
  onJumpToIndex,
  progress = 0,
  hasEntered = false,
  isClosing = false,
}) {
  if (!hasEntered || isClosing || !activeArtwork) return null;

  const handlePrev = () => {
    const prev = (activeIndex - 1 + totalArtworks) % totalArtworks;
    onJumpToIndex(prev);
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % totalArtworks;
    onJumpToIndex(next);
  };

  return (
    <div className="fixed inset-x-0 bottom-6 md:bottom-8 z-30 px-6 md:px-12 flex flex-col items-center pointer-events-none transition-all duration-500">
      {/* Active Artwork Presentation Card */}
      <div className="luxury-glass max-w-xl w-full p-4 md:p-5 rounded-2xl border border-[#CBD8E2]/15 shadow-2xl pointer-events-auto flex flex-col gap-3">
        {/* Top Info Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#D3B47B] font-semibold tracking-wider">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalArtworks).padStart(2, '0')}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#CBD8E2]/40" />
            <span className="font-ui uppercase tracking-widest text-[11px] text-[#8FBAD8]">
              {activeArtwork.chapter || 'MEMORY ARCHIVE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-editorial italic text-xs text-[#CBD8E2]/80">
              {activeArtwork.date}
            </span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={handlePrev}
                className="p-1 rounded-md border border-[#CBD8E2]/20 hover:border-[#D3B47B] text-[#CBD8E2] hover:text-[#D3B47B] transition-colors"
                title="Previous Moment"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-md border border-[#CBD8E2]/20 hover:border-[#D3B47B] text-[#CBD8E2] hover:text-[#D3B47B] transition-colors"
                title="Next Moment"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Artwork Title & Inspect Action */}
        <div className="flex items-center justify-between gap-4">
          <div className="truncate">
            <h3 className="font-editorial text-2xl md:text-3xl font-medium tracking-wide text-[#FCFCFA] truncate">
              {activeArtwork.title}
            </h3>
            <p className="font-editorial italic text-sm text-[#CBD8E2]/90 line-clamp-1 mt-0.5">
              {activeArtwork.quote || activeArtwork.description}
            </p>
          </div>

          {/* Inspect Button */}
          <button
            onClick={() => onSelectArtwork(activeArtwork)}
            className="shrink-0 luxury-glass-gold px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium text-[#D3B47B] hover:text-[#FCFCFA] hover:border-[#D3B47B] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#D3B47B]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline tracking-wider">Read Story</span>
          </button>
        </div>

        {/* 10 Moments Interactive Chapter Timeline Bar */}
        <div className="pt-2 flex items-center gap-1.5 md:gap-2">
          {Array.from({ length: totalArtworks }).map((_, idx) => {
            const isCurrent = idx === activeIndex;
            const isPassed = idx < activeIndex;
            return (
              <button
                key={idx}
                onClick={() => onJumpToIndex(idx)}
                className={`group relative h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'flex-1 bg-[#D3B47B] shadow-[0_0_10px_rgba(211,180,123,0.5)]'
                    : isPassed
                    ? 'w-4 md:w-6 bg-[#CBD8E2]/60 hover:bg-[#CBD8E2]'
                    : 'w-3 md:w-5 bg-[#CBD8E2]/20 hover:bg-[#CBD8E2]/40'
                }`}
                title={`Jump to Moment ${idx + 1}`}
              >
                <span className="sr-only">Moment {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="mt-2.5 text-center">
        <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-[#CBD8E2]/60">
          Scroll to orbit · Click any frame to inspect full memory
        </span>
      </div>
    </div>
  );
}
