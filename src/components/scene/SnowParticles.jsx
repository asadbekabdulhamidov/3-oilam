import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SnowParticles({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, scales, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical spread around museum radius
      const r = 2 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.random() * 14 - 1; // y: -1 to 13
      pos[i * 3 + 2] = Math.sin(theta) * r;

      sc[i] = 0.05 + Math.random() * 0.09;
      sp[i] = 0.3 + Math.random() * 0.5;
      ph[i] = Math.random() * Math.PI * 2;
    }

    return [pos, sc, sp, ph];
  }, [count]);

  // Create smooth soft circular snowflake texture
  const snowflakeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(252, 252, 250, 1)');
    grad.addColorStop(0.3, 'rgba(203, 216, 226, 0.8)');
    grad.addColorStop(0.7, 'rgba(143, 186, 216, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Drift down
      pos[idx + 1] -= speeds[i] * delta;

      // Soft wind swirl
      pos[idx] += Math.sin(time * 0.5 + phases[i]) * 0.015;
      pos[idx + 2] += Math.cos(time * 0.4 + phases[i]) * 0.012;

      // Reset when below floor
      if (pos[idx + 1] < -0.5) {
        pos[idx + 1] = 12 + Math.random() * 2;
        const r = 2 + Math.random() * 16;
        const theta = Math.random() * Math.PI * 2;
        pos[idx] = Math.cos(theta) * r;
        pos[idx + 2] = Math.sin(theta) * r;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={snowflakeTexture}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#F5F1E9"
      />
    </points>
  );
}
