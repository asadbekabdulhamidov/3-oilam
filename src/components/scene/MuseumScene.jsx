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
  galleryRadius = 6.8,
}) {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 4.8, 11));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Determine camera target position & lookAt target based on state
    if (selectedArtwork) {
      // Zoom into selected artwork
      const idx = selectedArtwork.index - 1;
      const angle = (idx / totalArtworks) * Math.PI * 2;
      const frameX = Math.sin(angle) * galleryRadius;
      const frameZ = Math.cos(angle) * galleryRadius;
      
      // Position camera 3.0 units away from frame facing it
      const camRadius = galleryRadius - 3.2;
      targetCamPos.current.set(
        Math.sin(angle) * camRadius + pointer.x * 0.15,
        2.2 + pointer.y * 0.15,
        Math.cos(angle) * camRadius
      );
      targetLookAt.current.set(frameX, 2.2, frameZ);
    } else if (!hasEntered) {
      // Hero Entrance Overview - gentle breathing float
      targetCamPos.current.set(
        pointer.x * 0.8 + Math.sin(time * 0.4) * 0.3,
        4.8 + pointer.y * 0.4 + Math.cos(time * 0.5) * 0.15,
        11.5
      );
      targetLookAt.current.set(0, 1.2, 0);
    } else if (progress >= 0.95) {
      // Closing Cinematic Scene - wide majestic view of the entire gallery
      targetCamPos.current.set(
        pointer.x * 0.5,
        4.6 + pointer.y * 0.3,
        9.5
      );
      targetLookAt.current.set(0, 1.4, 0);
    } else {
      // Guided Scroll Progression (0 to ~0.95)
      // Normalize progress across the 10 artworks
      const scrollIndex = (progress / 0.95) * totalArtworks;
      const angle = (scrollIndex / totalArtworks) * Math.PI * 2;
      
      // Camera orbits inside the frame circle at radius 3.5
      const camRadius = 3.5;
      const camX = Math.sin(angle) * camRadius + pointer.x * 0.35;
      const camZ = Math.cos(angle) * camRadius;
      const camY = 2.1 + pointer.y * 0.25;

      // Target frame point (ahead on the circle)
      const lookAngle = angle;
      const lookX = Math.sin(lookAngle) * galleryRadius;
      const lookZ = Math.cos(lookAngle) * galleryRadius;

      targetCamPos.current.set(camX, camY, camZ);
      targetLookAt.current.set(lookX, 2.2, lookZ);
    }

    // Smoothly interpolate camera position and lookAt (damping)
    camera.position.lerp(targetCamPos.current, Math.min(delta * 3.5, 0.12));
    currentLookAt.current.lerp(targetLookAt.current, Math.min(delta * 4.0, 0.15));
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
        camera={{ position: [0, 4.8, 11], fov: 48, near: 0.1, far: 80 }}
        shadows
        dpr={[1, 1.75]} // adaptive performance
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* Deep Arctic Fog for Natural Depth */}
        <fog attach="fog" args={['#101E30', 9, 36]} />

        {/* Scene Lighting */}
        <SceneLighting activeIndex={activeIndex} />

        {/* Floating Snow & Ice Crystals */}
        <SnowParticles count={380} />

        {/* Central Ice Pedestal */}
        <IcePlatform />

        {/* Adorable Cartoon Penguin with Blue Scarf */}
        <Penguin position={[0, 0.5, 0]} scale={1.05} />

        {/* 10 Framed Family Artworks in Mathematical Circle */}
        <GalleryRing
          artworks={artworks}
          activeIndex={activeIndex}
          onSelectArtwork={onSelectArtwork}
        />

        {/* Cathedral Ice Architecture, Pillars, Floor & Vaults */}
        <IceArchitecture />

        {/* Cinematic Camera Rig connected to Scroll & Interactions */}
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
