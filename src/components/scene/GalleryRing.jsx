import React, { useMemo } from 'react';
import { ArtworkFrame } from './ArtworkFrame';

export function GalleryRing({
  artworks = [],
  activeIndex = 0,
  onSelectArtwork,
  radius = 6.8,
  frameHeight = 2.2,
}) {
  const frames = useMemo(() => {
    const total = artworks.length || 10;
    return artworks.map((artwork, index) => {
      const angle = (index / total) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotY = angle + Math.PI; // Face toward origin (0, 0, 0)

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
