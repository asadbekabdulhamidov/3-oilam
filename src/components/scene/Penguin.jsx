import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Penguin({ position = [0, 0.5, 0], scale = 1 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const scarfTailRef = useRef();
  const eyesRef = useRef();

  const [blinkState, setBlinkState] = useState(1); // 1 = open, 0.1 = closed

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Gentle rhythmic breathing
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(time * 1.8) * 0.025;
      bodyRef.current.scale.x = 1 - Math.sin(time * 1.8) * 0.012;
      bodyRef.current.scale.z = 1 - Math.sin(time * 1.8) * 0.012;
      // Gentle subtle body sway
      bodyRef.current.rotation.z = Math.sin(time * 0.9) * 0.035;
    }

    // 2. Slow inquisitive head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.6) * 0.15;
      headRef.current.rotation.x = Math.sin(time * 1.2) * 0.04;
      headRef.current.rotation.z = Math.sin(time * 0.9 + 0.5) * 0.025;
    }

    // 3. Delicate flipper idle movement
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = 0.25 + Math.sin(time * 1.8) * 0.08;
      leftWingRef.current.rotation.x = Math.sin(time * 1.4) * 0.05;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = -0.25 - Math.sin(time * 1.8) * 0.08;
      rightWingRef.current.rotation.x = Math.sin(time * 1.4) * 0.05;
    }

    // 4. Scarf tail flutter in soft breeze
    if (scarfTailRef.current) {
      scarfTailRef.current.rotation.z = Math.sin(time * 2.2) * 0.09 - 0.1;
      scarfTailRef.current.rotation.x = Math.cos(time * 2.8) * 0.08;
    }

    // 5. Natural occasional blink (every ~4.5 seconds)
    const blinkCycle = time % 4.5;
    if (blinkCycle > 4.35 && blinkCycle < 4.48) {
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
            color="#1b2028"
            roughness={0.4}
            metalness={0.12}
          />
        </mesh>

        {/* Lower Body Softness / Roundness */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.65, 0.72, 0.6, 32]} />
          <meshStandardMaterial
            color="#1b2028"
            roughness={0.4}
            metalness={0.12}
          />
        </mesh>

        {/* Soft Ivory White Belly */}
        <mesh position={[0, 0.68, 0.28]} scale={[0.82, 1.05, 0.65]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#FAF7F2"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>

        {/* Left Flipper / Wing */}
        <group ref={leftWingRef} position={[-0.68, 0.85, 0]}>
          <mesh position={[-0.1, -0.32, 0]} rotation={[0, 0, 0.2]} castShadow>
            <capsuleGeometry args={[0.13, 0.55, 16, 16]} />
            <meshStandardMaterial
              color="#171c22"
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        </group>

        {/* Right Flipper / Wing */}
        <group ref={rightWingRef} position={[0.68, 0.85, 0]}>
          <mesh position={[0.1, -0.32, 0]} rotation={[0, 0, -0.2]} castShadow>
            <capsuleGeometry args={[0.13, 0.55, 16, 16]} />
            <meshStandardMaterial
              color="#171c22"
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        </group>

        {/* Head Group */}
        <group ref={headRef} position={[0, 1.35, 0]}>
          {/* Main Head Sphere */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.56, 32, 32]} />
            <meshStandardMaterial
              color="#1a1f26"
              roughness={0.4}
              metalness={0.12}
            />
          </mesh>

          {/* Chubby White Facial Patches */}
          <mesh position={[-0.2, 0.05, 0.35]} scale={[0.9, 1.1, 0.6]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
          </mesh>
          <mesh position={[0.2, 0.05, 0.35]} scale={[0.9, 1.1, 0.6]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
          </mesh>

          {/* Expressive Glossy Eyes Group */}
          <group ref={eyesRef} position={[0, 0.08, 0.44]}>
            {/* Left Eye */}
            <group position={[-0.18, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.085, 24, 24]} />
                <meshStandardMaterial color="#0A0E13" roughness={0.1} />
              </mesh>
              {/* Primary Catchlight Reflection */}
              <mesh position={[0.028, 0.028, 0.065]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Secondary Subtle Sparkle */}
              <mesh position={[-0.02, -0.025, 0.065]}>
                <sphereGeometry args={[0.012, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>

            {/* Right Eye */}
            <group position={[0.18, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.085, 24, 24]} />
                <meshStandardMaterial color="#0A0E13" roughness={0.1} />
              </mesh>
              {/* Primary Catchlight Reflection */}
              <mesh position={[0.028, 0.028, 0.065]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Secondary Subtle Sparkle */}
              <mesh position={[-0.02, -0.025, 0.065]}>
                <sphereGeometry args={[0.012, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>
          </group>

          {/* Cute Warm Orange Beak */}
          <group position={[0, -0.02, 0.52]} rotation={[0.15, 0, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.11, 0.22, 16]} />
              <meshStandardMaterial
                color="#E67E22"
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          </group>
        </group>

        {/* Signature Cozy Blue Scarf wrapped around neck */}
        <group position={[0, 1.12, 0]}>
          {/* Main Neck Wrap Torus */}
          <mesh castShadow rotation={[0.1, 0, 0]}>
            <torusGeometry args={[0.54, 0.12, 16, 36]} />
            <meshStandardMaterial
              color="#689EC4"
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Scarf Secondary Wrap for Plump Cozy Feel */}
          <mesh position={[0, -0.04, 0.04]} rotation={[0.05, 0.1, 0.05]}>
            <torusGeometry args={[0.52, 0.1, 16, 36]} />
            <meshStandardMaterial
              color="#548BB3"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Scarf Knot */}
          <mesh position={[0.22, -0.08, 0.48]} scale={[1, 0.8, 1]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#689EC4" roughness={0.6} />
          </mesh>

          {/* Dangling Scarf Tail with Natural Breeze Animation */}
          <group ref={scarfTailRef} position={[0.22, -0.15, 0.48]}>
            <mesh position={[0, -0.22, 0]} rotation={[0, 0, -0.1]} castShadow>
              <boxGeometry args={[0.18, 0.42, 0.05]} />
              <meshStandardMaterial
                color="#689EC4"
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
            {/* Scarf Champagne-gold Fringe stripe */}
            <mesh position={[0, -0.4, 0.005]}>
              <boxGeometry args={[0.185, 0.04, 0.055]} />
              <meshStandardMaterial
                color="#D3B47B"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>

        {/* Cute Warm Orange Webbed Feet */}
        <group position={[0, 0.02, 0.12]}>
          {/* Left Foot */}
          <mesh position={[-0.26, 0, 0.05]} rotation={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.26, 0.07, 0.38]} />
            <meshStandardMaterial
              color="#E67E22"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>
          {/* Right Foot */}
          <mesh position={[0.26, 0, 0.05]} rotation={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.26, 0.07, 0.38]} />
            <meshStandardMaterial
              color="#E67E22"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>
        </group>

      </group>
    </group>
  );
}
