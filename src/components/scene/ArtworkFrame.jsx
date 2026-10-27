import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createFallbackCanvasTexture } from '../../utils/textureGenerator';

function createPlaqueCanvas(index, title) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Dark obsidian plate
  ctx.fillStyle = '#0a1017';
  ctx.fillRect(0, 0, 512, 96);

  // Outer gold rim
  ctx.strokeStyle = '#D3B47B';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, 500, 84);

  // Inner subtle frosted rim
  ctx.strokeStyle = 'rgba(143, 186, 216, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, 488, 72);

  // Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Chapter index
  ctx.fillStyle = '#D3B47B';
  ctx.font = '600 16px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '4px';
  ctx.fillText(`MOMENT ${String(index).padStart(2, '0')}`, 256, 32);

  // Title
  ctx.fillStyle = '#FCFCFA';
  ctx.font = '500 20px "Cormorant Garamond", Georgia, serif';
  ctx.letterSpacing = '1px';
  ctx.fillText((title || '').toUpperCase(), 256, 62);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

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
  const [aspect, setAspect] = useState(artwork.aspectRatio || 1.33);

  // Safe Texture Loader with natural aspect ratio preservation
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

        // Auto-detect natural image aspect ratio to avoid distortion
        if (loadedTex.image && loadedTex.image.width && loadedTex.image.height) {
          const naturalAspect = loadedTex.image.width / loadedTex.image.height;
          if (naturalAspect > 0.4 && naturalAspect < 2.8) {
            setAspect(naturalAspect);
          }
        }
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

  // Dimension calculations based on aspect ratio
  // Landscape: fixed width 2.4, variable height
  // Portrait: fixed height 2.2, variable width
  const { frameWidth, frameHeight } = useMemo(() => {
    if (aspect >= 1) {
      const w = 2.4;
      return { frameWidth: w, frameHeight: Math.max(1.4, Math.min(2.4, w / aspect)) };
    } else {
      const h = 2.2;
      return { frameWidth: Math.max(1.4, Math.min(2.4, h * aspect)), frameHeight: h };
    }
  }, [aspect]);

  const borderThickness = 0.085;
  const frameDepth = 0.08;

  // Plaque texture
  const plaqueTexture = useMemo(() => {
    return createPlaqueCanvas(artwork.index, artwork.title);
  }, [artwork.index, artwork.title]);

  // Frame animation on hover / active state
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth hover / active position lift
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      position[1] + (isActive ? 0.18 : hovered ? 0.07 : 0),
      5,
      delta
    );

    // Active spotlight intensity
    if (spotlightRef.current) {
      const targetIntensity = isActive ? 3.8 : hovered ? 2.2 : 0.8;
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
            color={isActive ? '#EBD09C' : hovered ? '#D3B47B' : '#C4A66E'}
            metalness={0.88}
            roughness={0.22}
          />
        </mesh>

        {/* Inner Midnight Velvet Matting */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[frameWidth + 0.04, frameHeight + 0.04, frameDepth * 0.8]} />
          <meshStandardMaterial
            color="#080F16"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>

        {/* Fine Inner Inset Golden Rim */}
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[frameWidth + 0.015, frameHeight + 0.015, 0.02]} />
          <meshStandardMaterial
            color="#D3B47B"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Photographic Artwork Canvas */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          {texture ? (
            <meshBasicMaterial
              map={texture}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          ) : (
            <meshStandardMaterial
              color="#101E30"
              roughness={0.6}
            />
          )}
        </mesh>

        {/* Front Protective Glass Sheen (Subtle Specular Shine) */}
        <mesh position={[0, 0, 0.046]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inscribed Museum Title Plaque Mounted Beneath Frame */}
        <group position={[0, -(frameHeight / 2 + 0.22), 0.02]}>
          {/* Plaque Base */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.26, 0.025]} />
            <meshStandardMaterial
              color="#0A1017"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Plaque Gold Border Trim */}
          <mesh position={[0, 0, 0.014]}>
            <boxGeometry args={[1.52, 0.28, 0.005]} />
            <meshStandardMaterial
              color="#D3B47B"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Plaque Canvas with Text */}
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[1.44, 0.22]} />
            <meshBasicMaterial
              map={plaqueTexture}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Frame Spotlight Illumination */}
        <pointLight
          ref={spotlightRef}
          position={[0, 0.9, 1.3]}
          color={isActive ? '#FFF6E5' : '#CBD8E2'}
          intensity={isActive ? 3.8 : 0.8}
          distance={4.8}
        />

        {/* Halo Glow behind Frame when Active */}
        {isActive && (
          <mesh position={[0, 0, -0.06]}>
            <planeGeometry args={[frameWidth * 1.3, frameHeight * 1.3]} />
            <meshBasicMaterial
              color="#D3B47B"
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
