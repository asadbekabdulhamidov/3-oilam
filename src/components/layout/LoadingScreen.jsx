import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onLoaded) onLoaded();
            }, 600);
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 20) + 10;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#101719] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
        {/* Golden Ice Crest */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#D3B47B]/30 animate-spin [animation-duration:8s]" />
          <div className="absolute inset-2 rounded-full border border-[#8FBAD8]/20 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
          <Sparkles className="w-8 h-8 text-[#D3B47B] animate-pulse" />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-display text-sm tracking-[0.3em] uppercase text-[#FCFCFA] font-bold">
            OUR LITTLE WORLD
          </h2>
          <span className="font-editorial italic text-xs text-[#CBD8E2] tracking-wider">
            Memory Museum
          </span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1 rounded-full bg-[#101E30] overflow-hidden border border-[#CBD8E2]/15">
          <div
            className="h-full bg-gradient-to-r from-[#D3B47B] to-[#8FBAD8] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CBD8E2]/60">
          Crafting 3D Gallery · {progress}%
        </span>
      </div>
    </div>
  );
}
