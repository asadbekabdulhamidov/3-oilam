import React, { useRef } from 'react';
import { X, Upload, Info, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';

export function CuratorModal({
  isOpen,
  onClose,
  artworks = [],
  onUpdateArtworkImage,
  onResetArtworks,
}) {
  const fileInputRefs = useRef({});

  if (!isOpen) return null;

  const handleFileChange = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (dataUrl) {
        onUpdateArtworkImage(index, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-lg overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full luxury-glass-gold rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D3B47B]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col gap-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#CBD8E2]/15 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D3B47B]" />
              <h2 className="font-display text-xl sm:text-2xl uppercase tracking-[0.2em] text-[#FCFCFA] font-bold">
                Memory Curator
              </h2>
            </div>
            <p className="font-editorial italic text-sm text-[#CBD8E2] mt-1">
              Personalize the 10 memory frames with your own family photographs
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#CBD8E2]/20 hover:border-[#D3B47B] text-[#CBD8E2] hover:text-[#FCFCFA] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guidance Alert Banner */}
        <div className="p-4 rounded-2xl bg-[#101E30]/70 border border-[#8FBAD8]/25 flex items-start gap-3 text-xs text-[#CBD8E2] leading-relaxed">
          <Info className="w-4 h-4 text-[#8FBAD8] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#FCFCFA] mb-1">
              Two ways to supply family photographs:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[#CBD8E2]/90">
              <li>
                <span className="text-[#D3B47B] font-mono">Workspace Folder:</span> Place files named <code className="bg-black/30 px-1 py-0.5 rounded text-[#D3B47B]">photo-1.jpg</code> through <code className="bg-black/30 px-1 py-0.5 rounded text-[#D3B47B]">photo-10.jpg</code> into <code className="bg-black/30 px-1 py-0.5 rounded text-[#CBD8E2]">public/images/family/</code>.
              </li>
              <li>
                <span className="text-[#8FBAD8] font-mono">Instant Browser Upload:</span> Click "Select Photo" on any of the 10 moments below to instantly preview your family memories in the 3D museum!
              </li>
            </ul>
          </div>
        </div>

        {/* 10 Artworks Grid */}
        <div className="overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {artworks.map((art, idx) => (
            <div
              key={art.id || idx}
              className="p-3.5 rounded-2xl bg-[#101719]/60 border border-[#CBD8E2]/15 flex items-center justify-between gap-3 hover:border-[#D3B47B]/40 transition-colors"
            >
              {/* Thumbnail Preview */}
              <div className="w-16 h-14 rounded-lg overflow-hidden bg-black/40 border border-[#CBD8E2]/20 shrink-0 relative flex items-center justify-center">
                {art.image ? (
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#CBD8E2]/40" />
                )}
                <span className="absolute bottom-1 right-1 font-mono text-[9px] bg-black/70 px-1 rounded text-[#D3B47B]">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <h4 className="font-editorial text-base text-[#FCFCFA] font-medium truncate">
                  {art.title}
                </h4>
                <p className="font-ui text-[11px] text-[#8FBAD8] truncate">
                  {art.date}
                </p>
              </div>

              {/* Upload trigger */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => (fileInputRefs.current[idx] = el)}
                  onChange={(e) => handleFileChange(idx, e)}
                />
                <button
                  onClick={() => fileInputRefs.current[idx]?.click()}
                  className="p-2 rounded-xl border border-[#CBD8E2]/25 hover:border-[#D3B47B] hover:bg-[#D3B47B]/10 text-[#CBD8E2] hover:text-[#D3B47B] transition-all text-xs flex items-center gap-1.5"
                  title="Upload local photo for this frame"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Select</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#CBD8E2]/15 text-xs">
          <button
            onClick={onResetArtworks}
            className="flex items-center gap-2 text-[#CBD8E2]/70 hover:text-[#FCFCFA] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original Artwork Series</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#D3B47B] text-[#101719] font-medium font-ui uppercase tracking-wider text-xs hover:bg-[#FCFCFA] transition-colors"
          >
            Done Curating
          </button>
        </div>
      </div>
    </div>
  );
}
