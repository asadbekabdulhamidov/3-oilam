import * as THREE from 'three';

/**
 * Creates an exquisite fallback canvas texture for an artwork if image loading fails
 * or while an image is being swapped.
 */
export function createFallbackCanvasTexture(artwork) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.Texture();

  // 1. Deep Midnight Arctic Gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 768);
  grad.addColorStop(0, '#0c1722');
  grad.addColorStop(0.5, '#162b3d');
  grad.addColorStop(1, '#23445d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 768);

  // 2. Subtle frost vignette
  const vignette = ctx.createRadialGradient(512, 384, 100, 512, 384, 500);
  vignette.addColorStop(0, 'rgba(211, 180, 123, 0.08)');
  vignette.addColorStop(0.7, 'rgba(143, 186, 216, 0.05)');
  vignette.addColorStop(1, 'rgba(10, 20, 30, 0.85)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 1024, 768);

  // 3. Elegant Double Border with Champagne Gold
  ctx.strokeStyle = '#D3B47B';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, 944, 688);

  ctx.strokeStyle = '#8FBAD8';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(55, 55, 914, 658);
  ctx.setLineDash([]);

  // Corner Accents
  const drawCorner = (x, y, dx, dy) => {
    ctx.beginPath();
    ctx.strokeStyle = '#D3B47B';
    ctx.lineWidth = 3;
    ctx.moveTo(x, y + dy * 25);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 25, y);
    ctx.stroke();
  };
  drawCorner(40, 40, 1, 1);
  drawCorner(984, 40, -1, 1);
  drawCorner(40, 728, 1, -1);
  drawCorner(984, 728, -1, -1);

  // 4. Center Gold Monogram / Crest
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Subtle Emblem
  ctx.strokeStyle = 'rgba(211, 180, 123, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(512, 300, 70, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(512, 300, 60, 0, Math.PI * 2);
  ctx.stroke();

  // Monogram
  ctx.font = 'italic 54px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#D3B47B';
  ctx.fillText('OLW', 512, 298);

  // Chapter Subtitle
  ctx.font = '600 16px "Cinzel", Georgia, serif';
  ctx.fillStyle = '#8FBAD8';
  ctx.letterSpacing = '5px';
  ctx.fillText((artwork?.chapter || 'EXHIBITION EDITION').toUpperCase(), 512, 420);

  // Main Artwork Title
  ctx.font = '600 36px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#FCFCFA';
  ctx.fillText(artwork?.title || 'Family Moment', 512, 470);

  // Quote or Date
  ctx.font = 'italic 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#CBD8E2';
  ctx.fillText(artwork?.date || 'Cherished Memory', 512, 520);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
