import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SceneLighting({ activeIndex = 0 }) {
  const spotLightRef = useRef();
  const penguinLightRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (penguinLightRef.current) {
      // Gentle breathing glow on penguin
      penguinLightRef.current.intensity = 4.2 + Math.sin(time * 2.0) * 0.4;
    }
  });

  return (
    <group>
      {/* Radiant Cool Arctic Ambient Light */}
      <ambientLight color="#99C8EA" intensity={1.5} />

      {/* Main Celestial Sun / Skylight */}
      <directionalLight
        position={[8, 18, 10]}
        intensity={2.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />

      {/* Secondary Soft Fill Light from opposite direction */}
      <directionalLight
        position={[-10, 12, -8]}
        intensity={1.2}
        color="#8FBAD8"
      />

      {/* Strong Warm Champagne Gold Spotlight focused directly on the Penguin */}
      <spotLight
        ref={penguinLightRef}
        position={[0, 8, 2.5]}
        target-position={[0, 1.0, 0]}
        color="#FFE2A8"
        intensity={4.5}
        angle={0.65}
        penumbra={0.6}
        distance={16}
        castShadow
      />

      {/* Soft Rim Light behind Penguin for sharp character silhouette */}
      <pointLight
        position={[0, 2.8, -2.5]}
        color="#FCFCFA"
        intensity={2.5}
        distance={8}
      />

      {/* Radiant Pedestal Underglow */}
      <pointLight
        position={[0, 0.2, 0]}
        color="#70B5E8"
        intensity={3.0}
        distance={7}
      />

      {/* Center Warm Hearth Light */}
      <pointLight
        position={[0, 2.2, 1.2]}
        color="#F0D7A7"
        intensity={1.8}
        distance={6}
      />
    </group>
  );
}
