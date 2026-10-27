import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { INITIAL_ARTWORKS } from '../data/artworks';
import { useSoundscape } from '../hooks/useSoundscape';
import { useReducedMotion } from '../hooks/useReducedMotion';

import { MuseumScene } from '../components/scene/MuseumScene';
import { Header } from '../components/layout/Header';
import { IntroScreen } from '../components/layout/IntroScreen';
import { GalleryHUD } from '../components/layout/GalleryHUD';
import { ArtworkPanel } from '../components/layout/ArtworkPanel';
import { ClosingScreen } from '../components/layout/ClosingScreen';
import { CuratorModal } from '../components/layout/CuratorModal';
import { LoadingScreen } from '../components/layout/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState(INITIAL_ARTWORKS);
  const [hasEntered, setHasEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);

  const scrollTrackRef = useRef(null);
  const isReducedMotion = useReducedMotion();
  const { isPlaying: isAudioPlaying, toggleSound } = useSoundscape();

  // Closing scene threshold
  const isClosing = progress >= 0.94 && hasEntered;

  // Sync scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (isLoading) return;

    const track = scrollTrackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: isReducedMotion ? 0.2 : 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // Auto enter if visitor scrolls past threshold
        if (p > 0.03 && !hasEntered) {
          setHasEntered(true);
        }

        // Active artwork index calculation across gallery sequence (0.05 -> 0.92)
        if (p >= 0.04 && p < 0.94) {
          const galleryP = (p - 0.04) / 0.88;
          const idx = Math.min(
            artworks.length - 1,
            Math.max(0, Math.floor(galleryP * artworks.length))
          );
          setActiveIndex(idx);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isLoading, hasEntered, isReducedMotion, artworks.length]);

  // Enter the Museum action
  const handleEnterMuseum = useCallback(() => {
    setHasEntered(true);
    const track = scrollTrackRef.current;
    if (!track) return;

    const maxScroll = track.offsetHeight - window.innerHeight;
    const targetScroll = maxScroll * 0.07; // Smoothly glide into first artwork

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Jump to specific artwork index
  const handleJumpToIndex = useCallback((index) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const maxScroll = track.offsetHeight - window.innerHeight;
    const targetP = 0.05 + (index / artworks.length) * 0.87;
    const targetScroll = maxScroll * targetP;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  }, [artworks.length]);

  // Replay experience: full reset to top
  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setProgress(0);
      setActiveIndex(0);
      setSelectedArtwork(null);
      setHasEntered(false);
      ScrollTrigger.refresh();
    }, 600);
  }, []);

  // Artwork Inspection
  const handleSelectArtwork = useCallback((art) => {
    setSelectedArtwork(art);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const handleNextArtwork = useCallback(() => {
    if (!selectedArtwork) return;
    const nextIdx = (selectedArtwork.index) % artworks.length;
    setSelectedArtwork(artworks[nextIdx]);
    setActiveIndex(nextIdx);
  }, [selectedArtwork, artworks]);

  const handlePrevArtwork = useCallback(() => {
    if (!selectedArtwork) return;
    const prevIdx = (selectedArtwork.index - 2 + artworks.length) % artworks.length;
    setSelectedArtwork(artworks[prevIdx]);
    setActiveIndex(prevIdx);
  }, [selectedArtwork, artworks]);

  // Custom Family Photos Updater
  const handleUpdateArtworkImage = useCallback((index, newImage) => {
    setArtworks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], image: newImage };
      return copy;
    });
  }, []);

  const handleResetArtworks = useCallback(() => {
    setArtworks(INITIAL_ARTWORKS);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#101719] text-[#F5F1E9] overflow-x-hidden select-none">
      {/* Initial Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Fixed 3D Viewport Layer */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <MuseumScene
          artworks={artworks}
          progress={progress}
          activeIndex={activeIndex}
          hasEntered={hasEntered}
          selectedArtwork={selectedArtwork}
          onSelectArtwork={handleSelectArtwork}
        />
      </div>

      {/* Persistent Brand Header & Sound Controls */}
      <Header
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleSound}
        onOpenCurator={() => setIsCuratorOpen(true)}
        hasEntered={hasEntered}
      />

      {/* Hero Introduction Screen */}
      <IntroScreen
        hasEntered={hasEntered}
        onEnter={handleEnterMuseum}
      />

      {/* Gallery HUD (Active Artwork, Timeline, Chapter info) */}
      <GalleryHUD
        activeArtwork={artworks[activeIndex]}
        activeIndex={activeIndex}
        totalArtworks={artworks.length}
        onSelectArtwork={handleSelectArtwork}
        onJumpToIndex={handleJumpToIndex}
        progress={progress}
        hasEntered={hasEntered}
        isClosing={isClosing}
      />

      {/* Artwork Inspection Modal / Panel */}
      <ArtworkPanel
        artwork={selectedArtwork}
        onClose={handleClosePanel}
        onNext={handleNextArtwork}
        onPrev={handlePrevArtwork}
        hasNext={true}
        hasPrev={true}
      />

      {/* Closing Cinematic Screen */}
      <ClosingScreen
        isClosing={isClosing}
        onReplay={handleReplay}
        onOpenCurator={() => setIsCuratorOpen(true)}
      />

      {/* Personal Memory Curator Modal */}
      <CuratorModal
        isOpen={isCuratorOpen}
        onClose={() => setIsCuratorOpen(false)}
        artworks={artworks}
        onUpdateArtworkImage={handleUpdateArtworkImage}
        onResetArtworks={handleResetArtworks}
      />

      {/* Tall Scroll Track orchestrating GSAP progression */}
      <div
        ref={scrollTrackRef}
        className="relative z-10 w-full pointer-events-none"
        style={{ height: '700vh' }}
      >
        {/* Invisible anchors along the scroll track */}
        {artworks.map((art, idx) => (
          <div
            key={art.id}
            id={`anchor-${idx}`}
            className="w-full h-screen pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
}
