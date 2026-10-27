import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createFallbackCanvasTexture } from '../../utils/textureGenerator';

export function ArtworkFrame({
  artwork,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isActive = false,
  onSelect,
}) {
  const meshRef = useRef();
  const spotlightRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);

  // Aspect ratio calculation
  const aspect = artwork.aspectRatio || 1.33;
  const baseWidth = 2.4;
  const frameWidth = baseWidth;
  const frameHeight = baseWidth / aspect;
  const borderThickness = 0.09;
  const frameDepth = 0.08;

  // Safe Texture Loader with graceful fallback
  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      artwork.image,
      (loadedTex) => {
        if (!isMounted) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        setTexture(loadedTex);
      },
      undefined,
      (err) => {
        console.warn(`Could not load image at ${artwork.image}, rendering luxury fallback plaque`, err);
        if (isMounted) {
          const fallback = createFallbackCanvasTexture(artwork);
          setTexture(fallback);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [artwork.image, artwork]);

  // Frame animation on hover / active state
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth hover / active position lift
    const targetZ = isActive ? 0.35 : hovered ? 0.15 : 0;
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      position[1] + (isActive ? 0.15 : hovered ? 0.06 : 0),
      5,
      delta
    );

    // Active spotlight intensity
    if (spotlightRef.current) {
      const targetIntensity = isActive ? 3.5 : hovered ? 2.0 : 0.6;
      spotlightRef.current.intensity = THREE.MathUtils.damp(
        spotlightRef.current.intensity,
        targetIntensity,
        6,
        delta
      );
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(artwork);
      }}
    >
      <group ref={meshRef}>
        {/* Outer Champagne Gold / Frosted Silver Beveled Frame Molding */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[frameWidth + borderThickness * 2, frameHeight + borderThickness * 2, frameDepth]} />
          <meshStandardMaterial
            color={isActive ? '#E5C58D' : hovered ? '#D3B47B' : '#C4A66E'}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Inner Midnight Velvet Matting */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[frameWidth + 0.04, frameHeight + 0.04, frameDepth * 0.8]} />
          <meshStandardMaterial
            color="#0A1118"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Fine Inner Inset Golden Rim */}
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[frameWidth + 0.015, frameHeight + 0.015, 0.02]} />
          <meshStandardMaterial
            color="#D3B47B"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Photographic Artwork Canvas */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          {texture ? (
            <meshBasicMaterial
              map={texture}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          ) : (
            <meshStandardMaterial
              color="#101E30"
              roughness={0.6}
            />
          )}
        </mesh>

        {/* Front Protective Glass Sheen */}
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          <meshPhysicalMaterial
            color="#CBD8E2"
            transmission={0.92}
            roughness={0.05}
            reflectivity={0.6}
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Refined Museum Title Plaque Mounted Beneath Frame */}
        <group position={[0, -(frameHeight / 2 + 0.22), 0.02]}>
          {/* Plaque Plate */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.22, 0.025]} />
            <meshStandardMaterial
              color="#0E1620"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* Plaque Gold Border Trim */}
          <mesh position={[0, 0, 0.014]}>
            <boxGeometry args={[1.52, 0.24, 0.005]} />
            <meshStandardMaterial
              color="#D3B47B"
              metalness={0.85}
              roughness={0.2}
              wireframe={false}
            />
          </mesh>
          {/* Mini Inscribed Plate Accent */}
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[1.4, 0.16]} />
            <meshStandardMaterial
              color="#101924"
              metalness={0.4}
              roughness={0.4}
            />
          </mesh>
        </group>

        {/* Frame Spotlight Illumination */}
        <pointLight
          ref={spotlightRef}
          position={[0, 0.8, 1.2]}
          color={isActive ? '#FFF4DC' : '#CBD8E2'}
          intensity={isActive ? 3.5 : 0.8}
          distance={4.5}
        />

        {/* Halo Glow behind Frame when Active */}
        {isActive && (
          <mesh position={[0, 0, -0.06]}>
            <planeGeometry args={[frameWidth * 1.3, frameHeight * 1.3]} />
            <meshBasicMaterial
              color="#D3B47B"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
