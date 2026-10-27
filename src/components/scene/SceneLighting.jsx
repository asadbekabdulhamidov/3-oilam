import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SceneLighting({ activeIndex = 0 }) {
  const spotLightRef = useRef();
  const penguinLightRef = useRef();

  useFrame((state) => {
    // Subtle breathing intensity for lights
    const time = state.clock.getElapsedTime();
    if (penguinLightRef.current) {
      penguinLightRef.current.intensity = 2.4 + Math.sin(time * 1.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Soft Ambient Cool Arctic Glow */}
      <ambientLight color="#213E58" intensity={0.9} />

      {/* Directional Skylight from Upper Dome */}
      <directionalLight
        position={[10, 20, 15]}
        intensity={1.2}
        color="#CBD8E2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />

      {/* Opposite Fill Light for Balanced Contrast */}
      <directionalLight
        position={[-12, 10, -10]}
        intensity={0.6}
        color="#8FBAD8"
      />

      {/* Warm Champagne Spotlight on the Central Penguin */}
      <spotLight
        ref={penguinLightRef}
        position={[0, 8, 2]}
        target-position={[0, 0.8, 0]}
        color="#D3B47B"
        intensity={2.6}
        angle={0.55}
        penumbra={0.8}
        distance={15}
        castShadow
      />

      {/* Under-glow for Pedestal & Ice Reflections */}
      <pointLight
        position={[0, -0.5, 0]}
        color="#8FBAD8"
        intensity={1.8}
        distance={8}
      />

      {/* Rim light from behind to carve character silhouette */}
      <pointLight
        position={[0, 3, -4]}
        color="#FCFCFA"
        intensity={1.5}
        distance={10}
      />
    </group>
  );
}
