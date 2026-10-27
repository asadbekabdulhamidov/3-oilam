import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';

export function IceArchitecture() {
  // Pillars positioned in a wide majestic circle outside the artwork ring
  const pillars = useMemo(() => {
    const list = [];
    const count = 12;
    const radius = 13.5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const height = 9 + (i % 3) * 1.5;
      list.push({ id: `pillar-${i}`, x, z, angle, height });
    }
    return list;
  }, []);

  // Distant crystalline spires / mountain peaks
  const mountainSpires = useMemo(() => {
    const list = [];
    const count = 18;
    const radius = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const height = 14 + (i % 4) * 3;
      const scale = 2.5 + (i % 3) * 1.2;
      list.push({ id: `spire-${i}`, x, z, height, scale });
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
        <circleGeometry args={[28, 64]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.65}
          mixBlur={1}
          mixStrength={2.5}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101E30"
          metalness={0.45}
        />
      </mesh>

      {/* Outer Concentric Ice Floor Ring with Frosted Inlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[7.2, 7.35, 64]} />
        <meshStandardMaterial
          color="#D3B47B"
          metalness={0.8}
          roughness={0.3}
          opacity={0.6}
          transparent
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <ringGeometry args={[11.8, 11.95, 64]} />
        <meshStandardMaterial
          color="#8FBAD8"
          metalness={0.7}
          roughness={0.4}
          opacity={0.4}
          transparent
        />
      </mesh>

      {/* Crystalline Ice Pillars around perimeter */}
      {pillars.map((p) => (
        <group key={p.id} position={[p.x, 0, p.z]} rotation={[0, p.angle, 0]}>
          {/* Main Pillar Shaft (Faceted Hexagonal Column) */}
          <mesh position={[0, p.height / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.65, p.height, 6]} />
            <meshPhysicalMaterial
              color="#CBD8E2"
              roughness={0.12}
              metalness={0.1}
              transmission={0.7}
              thickness={2.5}
              ior={1.31}
              transparent
              opacity={0.88}
              clearcoat={1}
            />
          </mesh>

          {/* Golden Capital Ring */}
          <mesh position={[0, p.height - 0.2, 0]}>
            <cylinderGeometry args={[0.5, 0.45, 0.2, 8]} />
            <meshStandardMaterial
              color="#D3B47B"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>

          {/* Crystal Tip / Finial */}
          <mesh position={[0, p.height + 0.6, 0]}>
            <coneGeometry args={[0.35, 1.2, 6]} />
            <meshPhysicalMaterial
              color="#8FBAD8"
              emissive="#8FBAD8"
              emissiveIntensity={0.25}
              roughness={0.1}
              transmission={0.8}
              transparent
            />
          </mesh>

          {/* Gentle Pillar Light Source */}
          <pointLight
            position={[0, p.height - 0.5, 0]}
            color="#8FBAD8"
            intensity={0.4}
            distance={5}
          />
        </group>
      ))}

      {/* Distant Glacial Mountain Spires */}
      {mountainSpires.map((m) => (
        <mesh
          key={m.id}
          position={[m.x, m.height / 2 - 2, m.z]}
          scale={[m.scale, 1, m.scale]}
        >
          <coneGeometry args={[1.5, m.height, 5]} />
          <meshStandardMaterial
            color="#142638"
            roughness={0.8}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}

      {/* Crystalline Vaulted Dome Arch Ribs */}
      <group position={[0, 0, 0]}>
        {[0, 1, 2, 3].map((idx) => {
          const rotationY = (idx * Math.PI) / 4;
          return (
            <group key={`arch-${idx}`} rotation={[0, rotationY, 0]}>
              <mesh position={[0, 9.5, 0]}>
                <torusGeometry args={[12.5, 0.12, 12, 32, Math.PI]} />
                <meshStandardMaterial
                  color="#D3B47B"
                  metalness={0.8}
                  roughness={0.3}
                  opacity={0.5}
                  transparent
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
