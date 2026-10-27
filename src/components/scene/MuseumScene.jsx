import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneLighting } from './SceneLighting';
import { Penguin } from './Penguin';
import { IcePlatform } from './IcePlatform';
import { IceArchitecture } from './IceArchitecture';
import { GalleryRing } from './GalleryRing';
import { SnowParticles } from './SnowParticles';

function CameraRig({
  progress = 0,
  hasEntered = false,
  selectedArtwork = null,
  totalArtworks = 10,
  galleryRadius = 5.0,
}) {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.3, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 5.2, 11.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.3, 0));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Determine camera target position & lookAt target based on state
    if (selectedArtwork) {
      // Zoom in directly to the inspected artwork
      const idx = selectedArtwork.index - 1;
      const angle = (idx / totalArtworks) * Math.PI * 2;
      const frameX = Math.sin(angle) * galleryRadius;
      const frameZ = Math.cos(angle) * galleryRadius;

      // Position camera 2.6 units away directly in front of the frame
      const camRadius = galleryRadius + 2.6;
      targetCamPos.current.set(
        Math.sin(angle) * camRadius + pointer.x * 0.12,
        1.85 + pointer.y * 0.12,
        Math.cos(angle) * camRadius
      );
      targetLookAt.current.set(frameX, 1.85, frameZ);
    } else if (!hasEntered) {
      // Hero Entrance Overview - elevated majestic view looking into the whole gallery
      targetCamPos.current.set(
        pointer.x * 0.8 + Math.sin(time * 0.35) * 0.25,
        5.2 + pointer.y * 0.4 + Math.cos(time * 0.45) * 0.15,
        11.5
      );
      targetLookAt.current.set(0, 1.3, 0);
    } else if (progress >= 0.94) {
      // Closing Cinematic Scene - panoramic view of the gallery & penguin
      targetCamPos.current.set(
        pointer.x * 0.5,
        4.8 + pointer.y * 0.3,
        10.5
      );
      targetLookAt.current.set(0, 1.4, 0);
    } else {
      // Guided Exhibition Orbit Progression (0.04 to ~0.94)
      const scrollIndex = (progress / 0.94) * totalArtworks;
      const angle = (scrollIndex / totalArtworks) * Math.PI * 2;

      // Offset camera angle slightly (+0.32 rad, ~18 deg) so the frame is framed on the left/center
      // and the cute penguin in the center is in full view on the right/center!
      const camAngle = angle + 0.32;
      const camRadius = 8.4;
      const camX = Math.sin(camAngle) * camRadius + pointer.x * 0.35;
      const camZ = Math.cos(camAngle) * camRadius;
      const camY = 2.2 + pointer.y * 0.25;

      // Frame position
      const frameX = Math.sin(angle) * galleryRadius;
      const frameZ = Math.cos(angle) * galleryRadius;

      // LookAt target is balanced between the active frame and the central penguin:
      // Both the active photograph and the penguin character are visible together!
      const lookX = frameX * 0.45;
      const lookZ = frameZ * 0.45;
      const lookY = 1.6;

      targetCamPos.current.set(camX, camY, camZ);
      targetLookAt.current.set(lookX, lookY, lookZ);
    }

    // Smoothly interpolate camera position and lookAt (damping)
    camera.position.lerp(targetCamPos.current, Math.min(delta * 3.8, 0.14));
    currentLookAt.current.lerp(targetLookAt.current, Math.min(delta * 4.2, 0.16));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function MuseumScene({
  artworks = [],
  progress = 0,
  activeIndex = 0,
  hasEntered = false,
  selectedArtwork = null,
  onSelectArtwork,
}) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 5.2, 11.5], fov: 52, near: 0.1, far: 80 }}
        shadows
        dpr={[1, 1.75]} // adaptive performance
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Soft Arctic Fog for Deep Atmosphere */}
        <fog attach="fog" args={['#101E30', 10, 42]} />

        {/* Scene Lighting: Ambient, Skylight, Spotlights */}
        <SceneLighting activeIndex={activeIndex} />

        {/* Floating Snow & Sparkling Ice Crystals */}
        <SnowParticles count={380} />

        {/* Central Crystalline Ice Pedestal */}
        <IcePlatform />

        {/* Adorable Cartoon Penguin with Blue Scarf (Focal Point) */}
        <Penguin position={[0, 0.5, 0]} scale={1.35} />

        {/* 10 Framed Family Artworks in Mathematical Circle */}
        <GalleryRing
          artworks={artworks}
          activeIndex={activeIndex}
          onSelectArtwork={onSelectArtwork}
        />

        {/* Cathedral Ice Architecture, Pillars, Floor & Vaults */}
        <IceArchitecture />

        {/* Cinematic Camera Rig connecting Scroll, Artworks & Penguin */}
        <CameraRig
          progress={progress}
          hasEntered={hasEntered}
          selectedArtwork={selectedArtwork}
          totalArtworks={artworks.length || 10}
        />
      </Canvas>
    </div>
  );
}
