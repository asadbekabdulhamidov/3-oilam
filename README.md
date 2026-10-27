# OUR LITTLE WORLD — MEMORY MUSEUM
> **Luxury 3D Memory Museum | React + Three.js + GSAP**

An enchanting, cinematic interactive 3D digital art installation dedicated to a family's treasured memories. At the center of a crystalline ice cathedral stands an adorable 3D cartoon penguin wearing a blue scarf, surrounded by ten framed photographic moments arranged in a mathematical circular gallery.

---

## ✨ Features

- **3D Ice Cathedral & Architecture**:
  - Sculptural crystalline hexagonal columns with gold capitals and glowing finials.
  - Vaulted gothic crystal dome rib arches.
  - Semi-reflective frozen floor (`MeshReflectorMaterial`).
  - Subtle floating snowflake particles with wind turbulence.
- **Central Character**:
  - Procedural 3D cartoon penguin with rich charcoal body and soft ivory belly.
  - Large expressive eyes with dual specular reflections and natural blinking.
  - Signature glacier-blue cozy scarf with animated tail fluttering in the breeze.
  - Idle breathing, subtle sway, and flipper gestures.
- **10 Circular Photographic Artworks**:
  - Arranged mathematically at $R = 6.8\text{m}$ facing the center.
  - Beveled champagne-gold borders, midnight velvet matting, and inscribed museum plaques.
  - Dynamic fallback system: never shows broken or blank rectangles.
- **Cinematic GSAP Scroll Experience**:
  - Scroll-controlled smooth camera orbital track.
  - Interactive **Gallery HUD** with real-time moment numbering (`01 / 10`), chapter titles, and chapter jump timeline.
  - Inspect mode with detailed archival narrative note card (`Esc` / keyboard navigation).
- **In-Browser Memory Curator**:
  - Easily swap and preview family photos directly in the browser via file uploader.
- **Self-Contained Ambient Soundscape**:
  - Generative Web Audio API ambient soundtrack playing warm pentatonic crystal chimes. Off by default with toggle.
- **Responsive & Mobile Ready**:
  - Optimized camera FOV and touch handling for QR-code mobile entries.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **Three.js**
- **@react-three/fiber & @react-three/drei**
- **GSAP & ScrollTrigger**
- **Tailwind CSS v4**
- **Lucide React**

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3333/](http://localhost:3333/) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📸 Adding Your Family Photos

1. **Option A (Workspace folder)**: Place 10 images named `photo-1.jpg` through `photo-10.jpg` into `public/images/family/`.
2. **Option B (In-App Curator)**: Click **"Memory Curator"** in the top navigation bar to select and preview photos directly from your device.

---

## 📜 License
MIT
