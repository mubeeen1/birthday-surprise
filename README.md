# 💖 Luxury Cinematic Birthday Surprise Web App

An ultra-premium, modern, and cinematic React + Vite web application built as a bespoke digital birthday gift. Incorporating modern web design best practices (e.g., editorial typography, glassmorphism, dynamic animations, and frame-rate independent scroll physics), this app delivers a stunning, intimate, and highly personalized experience.

---

## ✨ Key Features

### 1. Cinematic Countdown Overlay
* **Ticking Timer:** Displays a luxury countdown card system (Days, Hours, Minutes, Seconds) with soft background glassmorphism.
* **Glow & Sheen Effects:** Micro-interactions like mouse-hover sheen sweeps and radial glowing backdrops.
* **Interactive Lock:** Prevents access to the main surprise until the target date is reached.

### 2. Love Declaration Interaction
* **Interactive Gatekeeper:** Once the countdown completes, a romantic full-screen modal prompts the recipient to declare their love (e.g., *"Do you promise to love me forever?"*).
* **Autoplay Music & Confetti:** Triggering the declaration automatically starts the romantic background music and throws a colorful confetti blast.

### 3. Luxury Editorial Hero Section
* **Bespoke Signature Logo:** A floating header displaying `"For Alishba 🤍"` mixing a clean tracking-spaced serif with a cursive signature script.
* **High-Fashion Typography:** Main title mixing delicate italic serifs and massive, elegant Cormorant Garamond poster typography (Vogue/Chanel style).
* **Double-Concentric Ring Portrait:** The main photo sits inside a double gold-rim frame with a slowly rotating background color aura.

### 4. 3D Infinite Gradient Carousel
* **3D Card Stack:** A custom three-dimensional carousel displaying 28 optimized photo slides.
* **Linear-Interpolation (Lerp) Physics:** Smooth glide and snap-to-card physics using exponential decay, ensuring predictable scrolling on trackpads and mouse wheels.
* **Dynamic Pastel Backgrounds:** Programmatic HSL background engine that smoothly transitions the screen between soft blush roses, warm golds, sage greens, and pale lavenders matching each slide.

### 5. High-Contrast wishes Flip Cards
* **Double-Sided Flipping:** Hover/touch interactive cards displaying a themed nickname and logo badge on the front, flipping to reveal emotional wishes on the back.
* **Lucide Icon Badges:** Replaced duplicate photo logos with clean vector outlines (`Infinity`, `Crown`, `Sun`, `Moon`, `Heart`, etc.) matching each wish.
* **WCAG Readability Compliance:** Upgraded color palette (e.g., dark burgundy on blush pink, deep thyme on champagne) and styled with medium-weight, non-italic serif font to ensure clear contrast and legibility.

---

## ⚡ Performance & Asset Optimizations

* **Pristine WebP Compression:** Converted 190 MB of raw image assets into optimized WebPs at **95% quality**, preserving 100% of the original high dimensions. Shrunk the total payload down to **~24 MB** with zero visible quality loss.
* **Progressive Load Orchestration:**
  * **Eager Load (First 5):** The first 5 carousel images load instantly with high fetch priority to dismiss the main page loader under **1 second** (previously blocked for 3 minutes!).
  * **Eager Deferred Fetching:** The remaining 23 images are initialized with blank SVG placeholders and dynamically fetch in the background on mount. Setting `img.loading = "eager"` during fetch bypasses viewport lazy-load blocking.
* **Cross-Browser Color Engine:** Replaced heavy canvas-based color extraction (prone to CORS security errors and sluggish load times) with a custom mathematical HSL color generator for instantaneous, smooth, and secure background color shifts.

---

## 🛠️ Tech Stack

* **Core Framework:** React 19 + Vite (Fast HMR)
* **Styling & Theme:** Tailwind CSS v4.0 (Utilizing `@theme inline` compiling in CSS)
* **Animations:** Framer Motion (for spring card bounces, count overlays, and modal transitions)
* **Icons:** Lucide React (vector-based line icons)
* **Fonts:** Great Vibes (cursive script signature), Playfair Display (editorial serif), Cormorant Garamond (luxury poster serif), Lato (sans-serif).

---

## ⚙️ Customization & Configuration

All variables, wishes, and letters are central and easy to configure in [`src/config.js`](file:///c:/Users/mubee/Documents/PROJECTS/birthday-surprise/src/config.js):

```javascript
const config = {
  // 1. Target Countdown Date
  targetDate: "2026-06-25T00:00:00", 

  // 2. Main Hero Photo Path
  heroPhoto: "/images/20260627_093348.webp", 

  // 3. Carousel Images List (Randomized on load)
  galleryPhotos: [
    "/images/20260627_093620.webp",
    "/images/20260627_102107.webp",
    // ...
  ],

  // 4. Wishing Flip-Cards Configuration
  wishes: [
    {
      name: "My Eternity 🕊️",
      text: "If I could give you one gift, it would be the ability to see yourself through my eyes...",
      logoUrl: "Infinity", // Lucide Icon Key Name
    },
    // ...
  ],

  // 5. Love Letter Modal Content
  loveLetter: {
    title: "A Letter for You, My Love 💌",
    content: `My Dearest, ...`
  },

  // 6. Audio Soundtrack Config
  music: {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Our Theme Song 🎵"
  }
};
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation
1. Clone or download the repository workspace.
2. Install the package dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the local hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build Production Bundle
To build the optimized static asset bundle for deployment:
```bash
npm run build
```
The compiled build output will be placed in the `/dist` directory, ready to be hosted on Vercel, Netlify, or GitHub Pages.
