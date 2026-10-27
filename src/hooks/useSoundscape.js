import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Web Audio API Generative Ambient Soundtrack
 * Elegant, subtle, warm pad + crystal snow chimes.
 * Off by default, respects user preferences.
 */
export function useSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const chimeTimerRef = useRef(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }, []);

  const playChime = useCallback(() => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;
    
    // Pentatonic scale frequencies in warm celestial register (Eb major / C minor)
    const notes = [311.13, 369.99, 415.30, 466.16, 554.37, 622.25, 739.99, 830.61];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 3.6);
  }, [isPlaying]);

  const toggleSound = useCallback(() => {
    initAudio();
    if (!audioCtxRef.current || !masterGainRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      // Fade out
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      setTimeout(() => setIsPlaying(false), 1200);
      if (chimeTimerRef.current) clearInterval(chimeTimerRef.current);
    } else {
      // Fade in
      setIsPlaying(true);
      masterGainRef.current.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5);
      
      // Start ambient chime loop
      playChime();
      chimeTimerRef.current = setInterval(() => {
        if (Math.random() > 0.3) {
          playChime();
        }
      }, 3500);
    }
  }, [initAudio, isPlaying, playChime]);

  useEffect(() => {
    return () => {
      if (chimeTimerRef.current) clearInterval(chimeTimerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleSound };
}
