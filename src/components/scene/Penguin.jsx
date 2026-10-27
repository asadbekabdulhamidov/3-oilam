import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Penguin({ position = [0, 0.5, 0], scale = 1.35 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const scarfTailRef = useRef();
  const eyesRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Gentle rhythmic breathing
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(time * 1.8) * 0.028;
      bodyRef.current.scale.x = 1 - Math.sin(time * 1.8) * 0.014;
      bodyRef.current.scale.z = 1 - Math.sin(time * 1.8) * 0.014;
      // Gentle subtle body sway
      bodyRef.current.rotation.z = Math.sin(time * 0.9) * 0.04;
    }

    // 2. Slow inquisitive head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.6) * 0.18;
      headRef.current.rotation.x = Math.sin(time * 1.2) * 0.05;
      headRef.current.rotation.z = Math.sin(time * 0.9 + 0.5) * 0.03;
    }

    // 3. Delicate flipper idle movement
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = 0.28 + Math.sin(time * 1.8) * 0.09;
      leftWingRef.current.rotation.x = Math.sin(time * 1.4) * 0.06;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = -0.28 - Math.sin(time * 1.8) * 0.09;
      rightWingRef.current.rotation.x = Math.sin(time * 1.4) * 0.06;
    }

    // 4. Scarf tail flutter in soft breeze
    if (scarfTailRef.current) {
      scarfTailRef.current.rotation.z = Math.sin(time * 2.2) * 0.12 - 0.1;
      scarfTailRef.current.rotation.x = Math.cos(time * 2.8) * 0.09;
    }

    // 5. Natural occasional blink (every ~4.2 seconds)
    const blinkCycle = time % 4.2;
    if (blinkCycle > 4.05 && blinkCycle < 4.18) {
      if (eyesRef.current) eyesRef.current.scale.y = 0.1;
    } else {
      if (eyesRef.current) eyesRef.current.scale.y = 1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central Character Body Group */}
      <group ref={bodyRef} position={[0, 0, 0]}>
        
        {/* Main Body (Soft Charcoal Black Pear-like shape) */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#222831"
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>

        {/* Lower Body Softness / Roundness */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.65, 0.74, 0.6, 32]} />
          <meshStandardMaterial
            color="#222831"
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>

        {/* Soft Ivory White Belly with Warm Glow */}
        <mesh position={[0, 0.68, 0.28]} scale={[0.82, 1.05, 0.65]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#FFFDF7"
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Left Flipper / Wing */}
        <group ref={leftWingRef} position={[-0.68, 0.85, 0]}>
          <mesh position={[-0.1, -0.32, 0]} rotation={[0, 0, 0.2]} castShadow>
            <capsuleGeometry args={[0.13, 0.55, 16, 16]} />
            <meshStandardMaterial
              color="#1B2028"
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
        </group>

        {/* Right Flipper / Wing */}
        <group ref={rightWingRef} position={[0.68, 0.85, 0]}>
          <mesh position={[0.1, -0.32, 0]} rotation={[0, 0, -0.2]} castShadow>
            <capsuleGeometry args={[0.13, 0.55, 16, 16]} />
            <meshStandardMaterial
              color="#1B2028"
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
        </group>

        {/* Head Group */}
        <group ref={headRef} position={[0, 1.35, 0]}>
          {/* Main Head Sphere */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.56, 32, 32]} />
            <meshStandardMaterial
              color="#222831"
              roughness={0.35}
              metalness={0.15}
            />
          </mesh>

          {/* Chubby White Facial Patches */}
          <mesh position={[-0.2, 0.05, 0.35]} scale={[0.9, 1.1, 0.6]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#FFFDF7" roughness={0.4} />
          </mesh>
          <mesh position={[0.2, 0.05, 0.35]} scale={[0.9, 1.1, 0.6]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#FFFDF7" roughness={0.4} />
          </mesh>

          {/* Expressive Glossy Eyes Group */}
          <group ref={eyesRef} position={[0, 0.08, 0.44]}>
            {/* Left Eye */}
            <group position={[-0.18, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.088, 24, 24]} />
                <meshStandardMaterial color="#0A0E13" roughness={0.08} />
              </mesh>
              {/* Primary Catchlight Reflection */}
              <mesh position={[0.028, 0.028, 0.068]}>
                <sphereGeometry args={[0.028, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Secondary Subtle Sparkle */}
              <mesh position={[-0.02, -0.025, 0.068]}>
                <sphereGeometry args={[0.014, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>

            {/* Right Eye */}
            <group position={[0.18, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.088, 24, 24]} />
                <meshStandardMaterial color="#0A0E13" roughness={0.08} />
              </mesh>
              {/* Primary Catchlight Reflection */}
              <mesh position={[0.028, 0.028, 0.068]}>
                <sphereGeometry args={[0.028, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Secondary Subtle Sparkle */}
              <mesh position={[-0.02, -0.025, 0.068]}>
                <sphereGeometry args={[0.014, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>
          </group>

          {/* Cute Warm Orange Beak */}
          <group position={[0, -0.02, 0.52]} rotation={[0.15, 0, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.12, 0.24, 16]} />
              <meshStandardMaterial
                color="#FF8C1A"
                roughness={0.25}
                metalness={0.1}
                emissive="#FF7700"
                emissiveIntensity={0.15}
              />
            </mesh>
          </group>
        </group>

        {/* Signature Cozy Blue Scarf wrapped naturally around neck */}
        <group position={[0, 1.12, 0]}>
          {/* Main Neck Wrap Torus */}
          <mesh castShadow rotation={[0.1, 0, 0]}>
            <torusGeometry args={[0.55, 0.13, 16, 36]} />
            <meshStandardMaterial
              color="#549CD4"
              roughness={0.5}
              metalness={0.1}
              emissive="#3882BE"
              emissiveIntensity={0.15}
            />
          </mesh>

          {/* Scarf Secondary Wrap for Plump Cozy Feel */}
          <mesh position={[0, -0.04, 0.04]} rotation={[0.05, 0.1, 0.05]}>
            <torusGeometry args={[0.53, 0.11, 16, 36]} />
            <meshStandardMaterial
              color="#4286BC"
              roughness={0.55}
              metalness={0.1}
            />
          </mesh>

          {/* Scarf Knot */}
          <mesh position={[0.22, -0.08, 0.49]} scale={[1, 0.8, 1]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#549CD4" roughness={0.5} />
          </mesh>

          {/* Dangling Scarf Tail with Natural Breeze Animation */}
          <group ref={scarfTailRef} position={[0.22, -0.15, 0.49]}>
            <mesh position={[0, -0.22, 0]} rotation={[0, 0, -0.1]} castShadow>
              <boxGeometry args={[0.19, 0.44, 0.05]} />
              <meshStandardMaterial
                color="#549CD4"
                roughness={0.55}
                metalness={0.1}
              />
            </mesh>
            {/* Scarf Champagne-gold Fringe stripe */}
            <mesh position={[0, -0.42, 0.005]}>
              <boxGeometry args={[0.195, 0.045, 0.055]} />
              <meshStandardMaterial
                color="#F0D7A7"
                metalness={0.85}
                roughness={0.25}
                emissive="#D3B47B"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </group>

        {/* Cute Warm Orange Webbed Feet */}
        <group position={[0, 0.02, 0.12]}>
          {/* Left Foot */}
          <mesh position={[-0.26, 0, 0.05]} rotation={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.27, 0.07, 0.4]} />
            <meshStandardMaterial
              color="#FF8C1A"
              roughness={0.35}
              metalness={0.08}
            />
          </mesh>
          {/* Right Foot */}
          <mesh position={[0.26, 0, 0.05]} rotation={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.27, 0.07, 0.4]} />
            <meshStandardMaterial
              color="#FF8C1A"
              roughness={0.35}
              metalness={0.08}
            />
          </mesh>
        </group>

      </group>
    </group>
  );
}
