import fs from 'fs';
import path from 'path';

const artworks = [
  {
    file: 'photo-1.svg',
    title: 'A Beautiful Beginning',
    chapter: '01 / CHAPTER I',
    date: 'Spring 2018',
    bg: 'linear-gradient(135deg, #0d1624 0%, #172c42 60%, #2b4f73 100%)',
    content: `
      <!-- Deep winter garden with golden lantern & couple silhouette -->
      <radialGradient id="lantern" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#fff8db" stop-opacity="0.9" />
        <stop offset="35%" stop-color="#e0b870" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#101e30" stop-opacity="0" />
      </radialGradient>
      <circle cx="400" cy="320" r="280" fill="url(#lantern)" />
      <!-- Starry sky -->
      <g fill="#f5f1e9" opacity="0.6">
        <circle cx="120" cy="100" r="1.5" /><circle cx="280" cy="80" r="2" />
        <circle cx="560" cy="140" r="1.5" /><circle cx="680" cy="90" r="2.5" />
        <circle cx="720" cy="220" r="1.5" /><circle cx="200" cy="240" r="1.5" />
      </g>
      <!-- Mountain & Trees Silhouettes -->
      <path d="M0 450 L180 340 L360 470 L540 330 L720 440 L800 370 L800 600 L0 600 Z" fill="#080e14" opacity="0.85" />
      <!-- Couple silhouette -->
      <path d="M370 420 Q370 360 385 360 Q400 360 400 420 L405 490 L365 490 Z" fill="#0a1017" />
      <circle cx="385" cy="345" r="16" fill="#0a1017" />
      <path d="M410 425 Q410 370 425 370 Q440 370 440 425 L445 490 L405 490 Z" fill="#0a1017" />
      <circle cx="425" cy="355" r="14" fill="#0a1017" />
      <!-- Subtle blue scarf accent -->
      <path d="M380 365 Q395 370 415 368 Q425 385 410 395" stroke="#8FBAD8" stroke-width="4" stroke-linecap="round" fill="none" />
      <!-- Golden snow dust -->
      <g fill="#D3B47B" opacity="0.5">
        <circle cx="350" cy="380" r="3" /><circle cx="440" cy="340" r="2" />
        <circle cx="390" cy="310" r="2.5" /><circle cx="420" cy="400" r="3" />
      </g>
    `
  },
  {
    file: 'photo-2.svg',
    title: 'A Familiar Smile',
    chapter: '02 / CHAPTER II',
    date: 'Autumn 2018',
    bg: 'linear-gradient(135deg, #121c24 0%, #1b3345 50%, #2f566e 100%)',
    content: `
      <!-- Warm golden bokeh portrait ambiance -->
      <circle cx="400" cy="280" r="200" fill="#D3B47B" opacity="0.15" filter="blur(40px)" />
      <circle cx="280" cy="350" r="140" fill="#8FBAD8" opacity="0.2" filter="blur(30px)" />
      <!-- Elegant portrait silhouette with scarf -->
      <path d="M350 490 C340 400 360 350 370 330 C350 310 350 270 370 240 C390 210 430 210 450 240 C470 270 470 310 450 330 C460 350 480 400 470 490 Z" fill="#090f14" />
      <!-- Warm scarf in glacier blue -->
      <path d="M375 325 Q410 345 445 325 Q455 370 435 390 Q400 380 385 350 Z" fill="#8FBAD8" opacity="0.9" />
      <!-- Golden rim light on profile -->
      <path d="M430 230 Q450 250 445 290 Q435 320 420 330" stroke="#D3B47B" stroke-width="3" fill="none" opacity="0.8" />
    `
  },
  {
    file: 'photo-3.svg',
    title: 'Little Moments',
    chapter: '03 / CHAPTER III',
    date: 'Summer 2019',
    bg: 'linear-gradient(135deg, #101924 0%, #1f364a 50%, #3a5c75 100%)',
    content: `
      <!-- Frosty window frame with morning golden glow -->
      <rect x="150" y="80" width="500" height="420" rx="8" fill="none" stroke="#D3B47B" stroke-width="2" opacity="0.4" />
      <line x1="400" y1="80" x2="400" y2="500" stroke="#D3B47B" stroke-width="2" opacity="0.4" />
      <line x1="150" y1="280" x2="650" y2="280" stroke="#D3B47B" stroke-width="2" opacity="0.4" />
      <!-- Warm steaming morning cups & shared table -->
      <path d="M100 520 L700 520 L660 580 L140 580 Z" fill="#0c141c" />
      <!-- Two cups -->
      <rect x="330" y="460" width="45" height="50" rx="6" fill="#F5F1E9" opacity="0.85" />
      <rect x="425" y="460" width="45" height="50" rx="6" fill="#8FBAD8" opacity="0.85" />
      <!-- Warm steam curls -->
      <path d="M352 450 Q345 420 355 400 T350 370" stroke="#D3B47B" stroke-width="2.5" fill="none" opacity="0.7" />
      <path d="M447 450 Q455 420 445 400 T450 370" stroke="#D3B47B" stroke-width="2.5" fill="none" opacity="0.7" />
    `
  },
  {
    file: 'photo-4.svg',
    title: 'Together',
    chapter: '04 / CHAPTER IV',
    date: 'Winter 2019',
    bg: 'linear-gradient(135deg, #0e1720 0%, #152738 50%, #203f5b 100%)',
    content: `
      <!-- Glacial canyon under starry skies -->
      <polygon points="0,550 200,320 320,400 450,280 620,420 800,290 800,600 0,600" fill="#070c12" />
      <polygon points="120,450 300,370 420,440 580,350 720,450 780,600 80,600" fill="#132435" opacity="0.8" />
      <!-- Two figures holding hands on summit -->
      <circle cx="385" cy="345" r="10" fill="#F5F1E9" />
      <path d="M375 358 L395 358 L395 400 L375 400 Z" fill="#F5F1E9" />
      <circle cx="415" cy="345" r="10" fill="#8FBAD8" />
      <path d="M405 358 L425 358 L425 400 L405 400 Z" fill="#8FBAD8" />
      <!-- Joined hands -->
      <line x1="392" y1="375" x2="408" y2="375" stroke="#D3B47B" stroke-width="3" stroke-linecap="round" />
      <!-- Auroral shimmer in sky -->
      <path d="M0 150 Q250 80 500 130 T800 100" stroke="#8FBAD8" stroke-width="35" opacity="0.15" fill="none" filter="blur(20px)" />
      <path d="M0 120 Q300 60 600 110 T800 70" stroke="#D3B47B" stroke-width="25" opacity="0.12" fill="none" filter="blur(18px)" />
    `
  },
  {
    file: 'photo-5.svg',
    title: 'Our Little Star',
    chapter: '05 / CHAPTER V',
    date: 'Spring 2020',
    bg: 'linear-gradient(135deg, #111a26 0%, #243c53 50%, #446582 100%)',
    content: `
      <!-- Celestial nursery glow -->
      <circle cx="400" cy="300" r="180" fill="#FCFCFA" opacity="0.1" filter="blur(30px)" />
      <!-- Radiant golden starburst -->
      <path d="M400 200 L408 270 L480 278 L415 315 L435 385 L380 340 L325 385 L345 315 L280 278 L352 270 Z" fill="#D3B47B" opacity="0.85" />
      <circle cx="400" cy="285" r="30" fill="#FFF9E6" />
      <!-- Small baby hands motif / constellation -->
      <g stroke="#CBD8E2" stroke-width="1.5" opacity="0.6" fill="none">
        <line x1="200" y1="180" x2="280" y2="240" />
        <line x1="280" y1="240" x2="350" y2="210" />
        <line x1="450" y1="210" x2="520" y2="240" />
        <line x1="520" y1="240" x2="600" y2="180" />
      </g>
      <circle cx="200" cy="180" r="4" fill="#D3B47B" />
      <circle cx="280" cy="240" r="3" fill="#8FBAD8" />
      <circle cx="350" cy="210" r="4" fill="#FCFCFA" />
      <circle cx="450" cy="210" r="4" fill="#FCFCFA" />
      <circle cx="520" cy="240" r="3" fill="#8FBAD8" />
      <circle cx="600" cy="180" r="4" fill="#D3B47B" />
    `
  },
  {
    file: 'photo-6.svg',
    title: 'Growing With Love',
    chapter: '06 / CHAPTER VI',
    date: 'Summer 2021',
    bg: 'linear-gradient(135deg, #101c27 0%, #1d394d 50%, #305872 100%)',
    content: `
      <!-- Footsteps in pure snow landscape -->
      <path d="M0 380 Q400 320 800 380 L800 600 L0 600 Z" fill="#CBD8E2" opacity="0.15" />
      <!-- Parent big footsteps -->
      <ellipse cx="320" cy="460" rx="14" ry="24" fill="#0c1722" transform="rotate(-15 320 460)" />
      <ellipse cx="440" cy="420" rx="14" ry="24" fill="#0c1722" transform="rotate(15 440 420)" />
      <!-- Child tiny footsteps in between -->
      <ellipse cx="360" cy="485" rx="7" ry="12" fill="#D3B47B" transform="rotate(-5 360 485)" />
      <ellipse cx="400" cy="455" rx="7" ry="12" fill="#D3B47B" transform="rotate(8 400 455)" />
      <ellipse cx="380" cy="415" rx="7" ry="12" fill="#D3B47B" transform="rotate(-2 380 415)" />
      <!-- Gentle horizon sunshine -->
      <circle cx="400" cy="300" r="80" fill="#D3B47B" opacity="0.25" filter="blur(25px)" />
    `
  },
  {
    file: 'photo-7.svg',
    title: 'Family Time',
    chapter: '07 / CHAPTER VII',
    date: 'Autumn 2022',
    bg: 'linear-gradient(135deg, #13171f 0%, #202937 50%, #353846 100%)',
    content: `
      <!-- Cozy Hearth Fireplace -->
      <rect x="250" y="240" width="300" height="260" rx="12" fill="#090c10" stroke="#D3B47B" stroke-width="2" opacity="0.6" />
      <!-- Amber fire flames -->
      <radialGradient id="fire" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stop-color="#fff2b3" />
        <stop offset="40%" stop-color="#f59e0b" />
        <stop offset="80%" stop-color="#b45309" />
        <stop offset="100%" stop-color="#090c10" stop-opacity="0" />
      </radialGradient>
      <circle cx="400" cy="400" r="90" fill="url(#fire)" />
      <!-- Three cups on the mantelpiece -->
      <rect x="330" y="225" width="22" height="18" rx="3" fill="#D3B47B" />
      <rect x="390" y="222" width="24" height="22" rx="3" fill="#8FBAD8" />
      <rect x="450" y="228" width="16" height="14" rx="2" fill="#FCFCFA" />
      <!-- Heart motif in the warm embers -->
      <path d="M400 370 C390 350 360 355 360 380 C360 405 400 425 400 425 C400 425 440 405 440 380 C440 355 410 350 400 370 Z" fill="#FCFCFA" opacity="0.4" />
    `
  },
  {
    file: 'photo-8.svg',
    title: 'A Day to Remember',
    chapter: '08 / CHAPTER VIII',
    date: 'Summer 2023',
    bg: 'linear-gradient(135deg, #0e1e2d 0%, #1a3c56 50%, #2a6187 100%)',
    content: `
      <!-- Coastal seaside under golden sky -->
      <ellipse cx="400" cy="200" rx="120" ry="120" fill="#D3B47B" opacity="0.3" filter="blur(20px)" />
      <!-- Rolling sea waves in arctic & navy blues -->
      <path d="M0 380 Q200 350 400 390 T800 370 L800 600 L0 600 Z" fill="#112739" />
      <path d="M0 430 Q200 410 400 440 T800 420 L800 600 L0 600 Z" fill="#1b3d58" opacity="0.9" />
      <path d="M0 480 Q200 460 400 490 T800 470 L800 600 L0 600 Z" fill="#245070" opacity="0.8" />
      <!-- Flying seagulls in golden air -->
      <path d="M220 220 Q235 210 250 220 Q265 210 280 220" stroke="#FCFCFA" stroke-width="2.5" fill="none" opacity="0.8" />
      <path d="M520 180 Q532 172 545 180 Q558 172 570 180" stroke="#FCFCFA" stroke-width="2" fill="none" opacity="0.7" />
    `
  },
  {
    file: 'photo-9.svg',
    title: 'The Warmest Memories',
    chapter: '09 / CHAPTER IX',
    date: 'Winter 2024',
    bg: 'linear-gradient(135deg, #0c151e 0%, #152636 50%, #224058 100%)',
    content: `
      <!-- Winter Cabin in Snow with Glowing Warm Windows -->
      <!-- Pine trees -->
      <polygon points="180,480 140,430 160,430 130,380 150,380 120,330 180,330 180,480" fill="#080e14" />
      <polygon points="620,480 580,430 600,430 570,380 590,380 560,330 620,330 620,480" fill="#080e14" />
      <!-- Wooden Cabin -->
      <polygon points="400,280 280,370 520,370" fill="#101820" stroke="#8FBAD8" stroke-width="1.5" />
      <rect x="300" y="370" width="200" height="110" fill="#0c1218" />
      <!-- Glowing golden window -->
      <rect x="340" y="390" width="45" height="45" rx="4" fill="#FFDC73" filter="drop-shadow(0 0 15px #FFDC73)" />
      <rect x="415" y="390" width="45" height="45" rx="4" fill="#FFDC73" filter="drop-shadow(0 0 15px #FFDC73)" />
      <line x1="362.5" y1="390" x2="362.5" y2="435" stroke="#101820" stroke-width="2" />
      <line x1="340" y1="412.5" x2="385" y2="412.5" stroke="#101820" stroke-width="2" />
      <line x1="437.5" y1="390" x2="437.5" y2="435" stroke="#101820" stroke-width="2" />
      <line x1="415" y1="412.5" x2="460" y2="412.5" stroke="#101820" stroke-width="2" />
      <!-- Chimney smoke curling into stars -->
      <path d="M480 290 Q470 250 490 220 T480 170" stroke="#CBD8E2" stroke-width="3" fill="none" opacity="0.6" />
    `
  },
  {
    file: 'photo-10.svg',
    title: 'Forever Our Little World',
    chapter: '10 / CHAPTER X',
    date: 'Present & Beyond',
    bg: 'linear-gradient(135deg, #091118 0%, #112638 50%, #1f4769 100%)',
    content: `
      <!-- Ice Dome Observatory & Aurora Borealis Constellation -->
      <!-- Radiant Aurora Ribbon -->
      <path d="M0 160 Q200 80 400 130 T800 90" stroke="#8FBAD8" stroke-width="40" opacity="0.25" fill="none" filter="blur(25px)" />
      <path d="M0 140 Q250 60 500 110 T800 70" stroke="#D3B47B" stroke-width="30" opacity="0.2" fill="none" filter="blur(20px)" />
      <!-- Star constellation forming an infinity heart -->
      <path d="M400 240 C370 200 320 210 320 250 C320 290 400 340 400 340 C400 340 480 290 480 250 C480 210 430 200 400 240 Z" stroke="#FCFCFA" stroke-width="2" stroke-dasharray="4 6" fill="none" opacity="0.7" />
      <circle cx="400" cy="240" r="4" fill="#D3B47B" />
      <circle cx="320" cy="250" r="3" fill="#8FBAD8" />
      <circle cx="480" cy="250" r="3" fill="#8FBAD8" />
      <circle cx="400" cy="340" r="4" fill="#FCFCFA" />
      <!-- Ice pedestal motif -->
      <ellipse cx="400" cy="480" rx="220" ry="40" fill="#132435" stroke="#CBD8E2" stroke-width="1.5" />
      <ellipse cx="400" cy="480" rx="140" ry="25" fill="#1b364e" stroke="#D3B47B" stroke-width="1" />
      <!-- Golden central star -->
      <circle cx="400" cy="480" r="6" fill="#D3B47B" />
    `
  }
];

const targetDir = path.resolve('public/images/family');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

artworks.forEach((art, index) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <!-- Background with luxurious gradient -->
  <rect width="800" height="600" fill="${art.bg.includes('linear-gradient') ? '#101e30' : '#101e30'}" />
  <rect width="800" height="600" fill="url(#bgGrad${index})" />
  <defs>
    <linearGradient id="bgGrad${index}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1722"/>
      <stop offset="60%" stop-color="#182e44"/>
      <stop offset="100%" stop-color="#2a4c6c"/>
    </linearGradient>
  </defs>

  <!-- Artwork Scene Content -->
  ${art.content}

  <!-- Luxury Gallery Matting & Fine Golden Inset Border -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#CBD8E2" stroke-width="1" opacity="0.3" />
  <rect x="35" y="35" width="730" height="530" fill="none" stroke="#D3B47B" stroke-width="0.75" opacity="0.5" />
  
  <!-- Subtle Corner Embellishments -->
  <path d="M30 45 L45 45 L45 30" stroke="#D3B47B" stroke-width="1.5" fill="none" />
  <path d="M770 45 L755 45 L755 30" stroke="#D3B47B" stroke-width="1.5" fill="none" />
  <path d="M30 555 L45 555 L45 570" stroke="#D3B47B" stroke-width="1.5" fill="none" />
  <path d="M770 555 L755 555 L755 570" stroke="#D3B47B" stroke-width="1.5" fill="none" />

  <!-- Exhibition Title Plaque at Bottom -->
  <g transform="translate(400, 530)" text-anchor="middle">
    <rect x="-160" y="-20" width="320" height="36" rx="4" fill="#0b1219" fill-opacity="0.85" stroke="#D3B47B" stroke-width="1" />
    <text y="-2" fill="#D3B47B" font-family="'Cinzel', Georgia, serif" font-size="11" letter-spacing="3" font-weight="600">${art.chapter}</text>
    <text y="11" fill="#F5F1E9" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" letter-spacing="1" font-weight="500">${art.title.toUpperCase()}</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(targetDir, art.file), svg);
  // Also create .jpg fallback name referencing same SVG or copy
  fs.writeFileSync(path.join(targetDir, `photo-${index + 1}.jpg`), svg);
});

console.log('Successfully generated 10 luxury photographic memory artworks!');
