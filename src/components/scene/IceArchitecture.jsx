import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';

export function IceArchitecture() {
  // 12 Crystalline Ice Pillars along the outer perimeter (radius = 11.5)
  const pillars = useMemo(() => {
    const list = [];
    const count = 12;
    const radius = 11.5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const height = 8.5 + (i % 3) * 1.0;
      list.push({ id: `pillar-${i}`, x, z, angle, height });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Semi-Reflective Ice Gallery Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <circleGeometry args={[22, 64]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.7}
          mixBlur={0.8}
          mixStrength={3.0}
          roughness={0.15}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#162A3E"
          metalness={0.4}
        />
      </mesh>

      {/* Radiant Inset Concentric Gold & Ice Rings on Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[5.15, 5.25, 64]} />
        <meshStandardMaterial
          color="#D3B47B"
          metalness={0.9}
          roughness={0.2}
          emissive="#D3B47B"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <ringGeometry args={[7.8, 7.92, 64]} />
        <meshStandardMaterial
          color="#8FBAD8"
          metalness={0.8}
          roughness={0.25}
          emissive="#8FBAD8"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Crystalline Ice Pillars around perimeter */}
      {pillars.map((p) => (
        <group key={p.id} position={[p.x, 0, p.z]} rotation={[0, p.angle, 0]}>
          {/* Main Pillar Column */}
          <mesh position={[0, p.height / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.35, 0.5, p.height, 6]} />
            <meshPhysicalMaterial
              color="#CBD8E2"
              roughness={0.1}
              metalness={0.15}
              transmission={0.65}
              thickness={2.0}
              ior={1.31}
              transparent
              opacity={0.9}
              clearcoat={1}
            />
          </mesh>

          {/* Golden Capital Trim */}
          <mesh position={[0, p.height - 0.2, 0]}>
            <cylinderGeometry args={[0.48, 0.4, 0.2, 8]} />
            <meshStandardMaterial
              color="#D3B47B"
              metalness={0.9}
              roughness={0.2}
              emissive="#D3B47B"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Glowing Crystal Tip Finial */}
          <mesh position={[0, p.height + 0.6, 0]}>
            <coneGeometry args={[0.3, 1.1, 6]} />
            <meshStandardMaterial
              color="#A5D4F5"
              emissive="#7CBFE8"
              emissiveIntensity={0.6}
              roughness={0.1}
            />
          </mesh>

          {/* Pillar Glow */}
          <pointLight
            position={[0, p.height - 0.4, 0]}
            color="#A5D4F5"
            intensity={0.8}
            distance={6}
          />
        </group>
      ))}

      {/* Crystalline Vaulted Dome Arch Ribs */}
      <group position={[0, 0, 0]}>
        {[0, 1, 2, 3].map((idx) => {
          const rotationY = (idx * Math.PI) / 4;
          return (
            <group key={`arch-${idx}`} rotation={[0, rotationY, 0]}>
              <mesh position={[0, 8.5, 0]}>
                <torusGeometry args={[11.5, 0.1, 12, 32, Math.PI]} />
                <meshStandardMaterial
                  color="#D3B47B"
                  metalness={0.85}
                  roughness={0.25}
                  emissive="#D3B47B"
                  emissiveIntensity={0.25}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
