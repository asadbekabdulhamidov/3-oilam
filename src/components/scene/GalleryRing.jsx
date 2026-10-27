import React, { useMemo } from 'react';
import { ArtworkFrame } from './ArtworkFrame';

export function GalleryRing({
  artworks = [],
  activeIndex = 0,
  onSelectArtwork,
  radius = 5.0,
  frameHeight = 1.85,
}) {
  const frames = useMemo(() => {
    const total = artworks.length || 10;
    return artworks.map((artwork, index) => {
      const angle = (index / total) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      // Frame front face (+Z) points outward towards the camera orbit:
      const rotY = angle;

      return {
        artwork,
        index,
        position: [x, frameHeight, z],
        rotation: [0, rotY, 0],
        angle,
      };
    });
  }, [artworks, radius, frameHeight]);

  return (
    <group>
      {frames.map(({ artwork, index, position, rotation }) => (
        <ArtworkFrame
          key={artwork.id || index}
          artwork={artwork}
          position={position}
          rotation={rotation}
          isActive={activeIndex === index}
          onSelect={onSelectArtwork}
        />
      ))}
    </group>
  );
}
