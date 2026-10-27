import React from 'react';
import * as THREE from 'three';

export function IcePlatform() {
  return (
    <group position={[0, 0, 0]}>
      {/* Upper Crystal Pedestal Tier (where penguin stands) */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.0, 2.2, 0.5, 48]} />
        <meshPhysicalMaterial
          color="#CBD8E2"
          roughness={0.15}
          metalness={0.1}
          transmission={0.65}
          ior={1.31} // Ice IOR
          thickness={1.5}
          transparent
          opacity={0.92}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Champagne Gold Filigree Ring on Upper Edge */}
      <mesh position={[0, 0.505, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.88, 1.96, 64]} />
        <meshStandardMaterial
          color="#D3B47B"
          metalness={0.88}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Inscribed Snowflake / Memory Crest */}
      <mesh position={[0, 0.506, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1.02, 48]} />
        <meshStandardMaterial
          color="#D3B47B"
          metalness={0.8}
          roughness={0.3}
          side={THREE.DoubleSide}
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Lower Secondary Base Tier */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.3, 48]} />
        <meshPhysicalMaterial
          color="#213E58"
          roughness={0.2}
          metalness={0.15}
          transmission={0.4}
          thickness={2.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Subtle Ice Skirt */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.6, 0.15, 48]} />
        <meshStandardMaterial
          color="#16293A"
          roughness={0.35}
          metalness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Frosted Gold Accent Outer Trim */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.45, 2.52, 64]} />
        <meshStandardMaterial
          color="#D3B47B"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
