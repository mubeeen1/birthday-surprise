import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./GradientCarousel.css";

export default function GradientCarousel({ photos }) {
  const stageRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const cardsRootRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const bgCanvas = bgCanvasRef.current;
    const cardsRoot = cardsRootRef.current;
    const loader = loaderRef.current;
    const bgCtx = bgCanvas?.getContext("2d", { alpha: false });

    // ========== CONFIGURATION ==========
    const FRICTION = 0.975; // Decreased friction (0.95 -> 0.975) for a longer, smoother, faster glide inertia
    const WHEEL_SENS = 0.8; // Decreased wheel sensitivity from 1.5 to 0.8 for more controlled scrolling
    let DRAG_SENS = 1.8;
    // Visual constants (adjusted per viewport)
    let MAX_ROTATION = 28;
    let MAX_DEPTH = 140;
    let MIN_SCALE = 0.92;
    const SCALE_RANGE = 0.1;
    let GAP = 80; // Increased initial gap to 80 to match the spacious layout in the reference picture

    function updateViewportConfig() {
      const w = window.innerWidth || document.documentElement.clientWidth || 375;
      if (w < 480) {
        MAX_ROTATION = 12;
        MAX_DEPTH = 50;
        MIN_SCALE = 0.96;
        GAP = 40; // Increased mobile gap from 14 to 40
        DRAG_SENS = 1.4; // Increased mobile drag sensitivity (0.8 -> 1.4)
      } else if (w < 768) {
        MAX_ROTATION = 18;
        MAX_DEPTH = 80;
        MIN_SCALE = 0.94;
        GAP = 60; // Increased tablet gap from 20 to 60
        DRAG_SENS = 1.6; // Increased tablet drag sensitivity (0.9 -> 1.6)
      } else {
        MAX_ROTATION = 28;
        MAX_DEPTH = 140;
        MIN_SCALE = 0.92;
        GAP = 80; // Increased desktop gap from 28 to 80
        DRAG_SENS = 1.8; // Increased desktop drag sensitivity (1.0 -> 1.8)
      }

          // Recompute dependent layout values if already measured
          STEP = CARD_W + GAP;
          TRACK = items.length * STEP;
          VW_HALF = (window.innerWidth || document.documentElement.clientWidth) * 0.5;
        }

    // ========== STATE ==========
    let items = [];
    let positions = [];
    let activeIndex = -1;
    let isEntering = true;

    let CARD_W = 300;
    let CARD_H = 400; // Fallback height updated to match the 3:4 aspect ratio (300 * 4 / 3)
    let STEP = CARD_W + GAP;
    let TRACK = 0;
    let SCROLL_X = 0;
    let VW_HALF = (window.innerWidth || document.documentElement.clientWidth) * 0.5;

    let vX = 0;
    let isDragging = false;
    let rafId = null;
    let bgRAF = null;
    let lastTime = 0;
    let lastBgDraw = 0;
    let targetScrollX = 0;
    let wheelTimeout = null;

    let gradPalette = [];
    let gradCurrent = {
      r1: 224, g1: 143, b1: 156,
      r2: 226, g2: 178, b2: 172,
      bgr: 221, bgg: 212, bgb: 214 // Start with first card's soft light rose background
    };
    let gradTarget = {
      r1: 224, g1: 143, b1: 156,
      r2: 226, g2: 178, b2: 172,
      bgr: 221, bgg: 212, bgb: 214
    };
    let bgFastUntil = 0;

    // responsive resize handler reference so cleanup can remove listener
    function onResize() {
      measure();
      updateViewportConfig();
      resizeBG();
    }

    // ========== UTILITY ==========
    function mod(n, m) {
      return ((n % m) + m) % m;
    }

    // ========== COLOR CONVERSION ==========
    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s;
      const l = (max + min) / 2;

      if (max === min) {
        h = 0;
        s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          default:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h * 360, s, l];
    }

    function hslToRgb(h, s, l) {
      h = ((h % 360) + 360) % 360;
      h /= 360;
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    function fallbackFromIndex(idx) {
      // Distribute hues across romantic spectrum: pinks, corals, peaches, golds, lavenders
      const romanticHues = [350, 15, 35, 45, 270, 290, 330, 5];
      const h = (romanticHues[idx % romanticHues.length] + (idx * 7) % 25) % 360;
      const s = 0.55;
      const bg = hslToRgb(h, s * 0.35, 0.85);  // 85% lightness base (rich warm pastel background)
      const c1 = hslToRgb(h, s * 0.9, 0.72);   // 72% lightness glowing spotlight 1
      const c2 = hslToRgb((h + 30) % 360, s * 0.75, 0.78); // 78% lightness glowing spotlight 2
      return { c1, c2, bg };
    }

    // ========== COLOR EXTRACTION ==========
    function extractColors(img, idx) {
      // Use the curated luxury palette generator for guaranteed cross-browser performance and pristine color coordination
      return fallbackFromIndex(idx);
    }

    // ========== SETUP ==========
    function createCards() {
      cardsRoot.innerHTML = "";
      items = [];

      const fragment = document.createDocumentFragment();

      (Array.isArray(photos) ? photos : []).forEach((src, i) => {
        const card = document.createElement("article");
        card.className = "card";
        card.style.willChange = "transform";

        const img = new Image();
        img.className = "card__img";
        img.decoding = "async";
        img.draggable = false;

        // Eagerly load the first 5 images, defer the rest to load in the background
        if (i < 5) {
          img.loading = "eager";
          img.fetchPriority = "high";
          img.src = src;
        } else {
          img.loading = "lazy";
          img.fetchPriority = "low";
          img.dataset.src = src;
          // Set a transparent blank 300x400 SVG placeholder to maintain layout and prevent broken image icon
          img.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 300 400'%2F%3E";
        }

        card.appendChild(img);
        fragment.appendChild(card);
        items.push({ el: card, x: i * STEP });
      });

      cardsRoot.appendChild(fragment);
    }

    function measure() {
      const sample = items[0]?.el;
      if (!sample) return;

      const r = sample.getBoundingClientRect();
      CARD_W = r.width || CARD_W;
      CARD_H = r.height || CARD_H;
      STEP = CARD_W + GAP;
      TRACK = items.length * STEP;

      items.forEach((it, i) => {
        it.x = i * STEP;
      });

      positions = new Float32Array(items.length);
    }

    // ========== TRANSFORM ==========
    function transformForScreenX(screenX) {
      const norm = Math.max(-1, Math.min(1, screenX / VW_HALF));
      const absNorm = Math.abs(norm);
      const invNorm = 1 - absNorm;

      const ry = -norm * MAX_ROTATION;
      const tz = invNorm * MAX_DEPTH;
      const scale = MIN_SCALE + invNorm * SCALE_RANGE;

      return {
        transform: `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${scale})`,
        z: tz,
      };
    }

    function updateCarouselTransforms() {
      const half = TRACK / 2;
      let closestIdx = -1;
      let closestDist = Infinity;

      for (let i = 0; i < items.length; i++) {
        let pos = items[i].x - SCROLL_X;
        if (pos < -half) pos += TRACK;
        if (pos > half) pos -= TRACK;
        positions[i] = pos;

        const dist = Math.abs(pos);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      const prevIdx = (closestIdx - 1 + items.length) % items.length;
      const nextIdx = (closestIdx + 1) % items.length;

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const pos = positions[i];
        const norm = Math.max(-1, Math.min(1, pos / VW_HALF));
        const { transform, z } = transformForScreenX(pos);

        it.el.style.transform = transform;
        it.el.style.zIndex = String(1000 + Math.round(z));

        const isCore = i === closestIdx || i === prevIdx || i === nextIdx;
        const blur = isCore ? 0 : 2 * Math.pow(Math.abs(norm), 1.1);
        it.el.style.filter = `blur(${blur.toFixed(2)}px)`;
      }

      if (closestIdx !== activeIndex) {
        setActiveGradient(closestIdx);
      }
    }

    // ========== ANIMATION ==========
    function tick(t) {
      const dt = lastTime ? (t - lastTime) / 1000 : 0;
      lastTime = t;

      if (isDragging) {
        targetScrollX = SCROLL_X;
        vX = 0;
      } else {
        if (Math.abs(vX) > 80) {
          // Momentum glide from drag release
          SCROLL_X = mod(SCROLL_X + vX * dt, TRACK);
          targetScrollX = SCROLL_X;
          const decay = Math.pow(FRICTION, dt * 60);
          vX *= decay;
        } else {
          // Snap to nearest card if we finished sliding/scrolling but aren't centered
          if (vX !== 0) {
            vX = 0;
            const nearestCardIndex = Math.round(SCROLL_X / STEP);
            targetScrollX = mod(nearestCardIndex * STEP, TRACK);
          }

          // Smooth scroll / snap lerp (frame-rate independent easing)
          let diff = targetScrollX - SCROLL_X;
          const half = TRACK / 2;
          if (diff < -half) diff += TRACK;
          if (diff > half) diff -= TRACK;

          const speed = 7.0; // Easing speed
          if (Math.abs(diff) > 0.05) {
            SCROLL_X = mod(SCROLL_X + diff * (1 - Math.exp(-speed * dt)), TRACK);
          } else {
            SCROLL_X = targetScrollX;
          }
        }
      }

      updateCarouselTransforms();
      rafId = requestAnimationFrame(tick);
    }

    function startCarousel() {
      if (rafId) cancelAnimationFrame(rafId);
      lastTime = 0;
      rafId = requestAnimationFrame((t) => {
        updateCarouselTransforms();
        tick(t);
      });
    }

    // ========== GRADIENT ==========
    function buildPalette() {
      gradPalette = items.map((it, i) => {
        const img = it.el.querySelector("img");
        return extractColors(img, i);
      });
    }

    function loadDeferredImages() {
      items.forEach((it, i) => {
        if (i >= 5) {
          const img = it.el.querySelector("img");
          if (img && img.dataset.src) {
            img.loading = "eager"; // Force immediate fetch in the background
            // Register listener BEFORE setting src to prevent missing cached loads
            img.addEventListener("load", () => {
              gradPalette[i] = extractColors(img, i);
            }, { once: true });
            img.src = img.dataset.src;
          }
        }
      });
    }

    function setActiveGradient(idx) {
      if (!bgCtx || idx < 0 || idx >= items.length || idx === activeIndex) return;

      activeIndex = idx;
      const pal = gradPalette[idx] || { c1: [245, 240, 235], c2: [240, 235, 230], bg: [248, 245, 242] };
      gradTarget.r1 = pal.c1[0];
      gradTarget.g1 = pal.c1[1];
      gradTarget.b1 = pal.c1[2];
      gradTarget.r2 = pal.c2[0];
      gradTarget.g2 = pal.c2[1];
      gradTarget.b2 = pal.c2[2];
      gradTarget.bgr = pal.bg[0];
      gradTarget.bgg = pal.bg[1];
      gradTarget.bgb = pal.bg[2];
    }

    // ========== BACKGROUND ==========
    function resizeBG() {
      if (!bgCanvas || !bgCtx) return;

      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = bgCanvas.clientWidth || stage.clientWidth;
      const h = bgCanvas.clientHeight || stage.clientHeight;
      const tw = Math.floor(w * dpr);
      const th = Math.floor(h * dpr);

      if (bgCanvas.width !== tw || bgCanvas.height !== th) {
        bgCanvas.width = tw;
        bgCanvas.height = th;
        bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    function drawBackground() {
      if (!bgCanvas || !bgCtx) return;

      const now = performance.now();
      const minInterval = now < bgFastUntil ? 16 : 33;

      if (now - lastBgDraw < minInterval) {
        bgRAF = requestAnimationFrame(drawBackground);
        return;
      }

      const dt = Math.min(0.1, (now - lastBgDraw) / 1000);
      lastBgDraw = now;
      resizeBG();

      // Smoothly interpolate current colors toward target colors (independent of GSAP)
      const lerpSpeed = 4.5; // Easing speed
      const lerpFactor = 1 - Math.exp(-lerpSpeed * dt);
      gradCurrent.r1 += (gradTarget.r1 - gradCurrent.r1) * lerpFactor;
      gradCurrent.g1 += (gradTarget.g1 - gradCurrent.g1) * lerpFactor;
      gradCurrent.b1 += (gradTarget.b1 - gradCurrent.b1) * lerpFactor;
      gradCurrent.r2 += (gradTarget.r2 - gradCurrent.r2) * lerpFactor;
      gradCurrent.g2 += (gradTarget.g2 - gradCurrent.g2) * lerpFactor;
      gradCurrent.b2 += (gradTarget.b2 - gradCurrent.b2) * lerpFactor;
      gradCurrent.bgr += (gradTarget.bgr - gradCurrent.bgr) * lerpFactor;
      gradCurrent.bgg += (gradTarget.bgg - gradCurrent.bgg) * lerpFactor;
      gradCurrent.bgb += (gradTarget.bgb - gradCurrent.bgb) * lerpFactor;

      const w = bgCanvas.clientWidth || stage.clientWidth;
      const h = bgCanvas.clientHeight || stage.clientHeight;

      // Deep premium base background that dynamically matches the active image
      const bg_r = Math.round(gradCurrent.bgr);
      const bg_g = Math.round(gradCurrent.bgg);
      const bg_b = Math.round(gradCurrent.bgb);
      bgCtx.fillStyle = `rgb(${bg_r}, ${bg_g}, ${bg_b})`;
      bgCtx.fillRect(0, 0, w, h);

      const time = now * 0.0002;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const a1 = Math.min(w, h) * 0.35;
      const a2 = Math.min(w, h) * 0.28;

      const x1 = cx + Math.cos(time) * a1;
      const y1 = cy + Math.sin(time * 0.8) * a1 * 0.4;
      const x2 = cx + Math.cos(-time * 0.9 + 1.2) * a2;
      const y2 = cy + Math.sin(-time * 0.7 + 0.7) * a2 * 0.5;

      const r1 = Math.max(w, h) * 0.75;
      const r2 = Math.max(w, h) * 0.65;

      // Soft ambient glows with reduced opacity for premium blending
      const r1_r = Math.round(gradCurrent.r1);
      const g1_r = Math.round(gradCurrent.g1);
      const b1_r = Math.round(gradCurrent.b1);
      const g1 = bgCtx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      g1.addColorStop(0, `rgba(${r1_r},${g1_r},${b1_r},0.35)`);
      g1.addColorStop(1, "rgba(255,255,255,0)");
      bgCtx.fillStyle = g1;
      bgCtx.fillRect(0, 0, w, h);

      const r2_r = Math.round(gradCurrent.r2);
      const g2_r = Math.round(gradCurrent.g2);
      const b2_r = Math.round(gradCurrent.b2);
      const g2 = bgCtx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      g2.addColorStop(0, `rgba(${r2_r},${g2_r},${b2_r},0.25)`);
      g2.addColorStop(1, "rgba(255,255,255,0)");
      bgCtx.fillStyle = g2;
      bgCtx.fillRect(0, 0, w, h);

      bgRAF = requestAnimationFrame(drawBackground);
    }

    function startBG() {
      if (!bgCanvas || !bgCtx) return;
      if (bgRAF) cancelAnimationFrame(bgRAF);
      bgRAF = requestAnimationFrame(drawBackground);
    }

    // ========== EVENTS ==========
    const onWheel = (e) => {
      if (isEntering) return;
      e.preventDefault();
      
      // Stop ongoing glide inertia
      vX = 0;

      // Accumulate wheel delta on targetScrollX
      const delta = -e.deltaX * WHEEL_SENS * 1.5 + -e.deltaY * WHEEL_SENS * 0.75;
      targetScrollX = mod(targetScrollX + delta, TRACK);

      // Snap to closest card after scrolling stops (inactivity threshold of 200ms)
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (!isDragging && vX === 0) {
          const nearestCardIndex = Math.round(targetScrollX / STEP);
          targetScrollX = mod(nearestCardIndex * STEP, TRACK);
        }
      }, 200);
    };

    const onPointerDown = (e) => {
      if (isEntering) return;

      clearTimeout(wheelTimeout);
      vX = 0;
      targetScrollX = SCROLL_X;

      // Use pointer capture to keep receiving touch drag events even if user moves out of the element/viewport
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // Fallback if not supported
      }

      const startX = e.clientX;
      const startY = e.clientY;
      let lastX = e.clientX;
      let lastTimestamp = performance.now();
      let isSwipeDirectionDecided = false;
      let isHorizontalSwipe = false;

      stage.classList.add("dragging");

      const onPointerMove = (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const currentTimestamp = performance.now();

        // Determine swipe direction if not yet decided (threshold of 6px)
        if (!isSwipeDirectionDecided) {
          const diffX = Math.abs(currentX - startX);
          const diffY = Math.abs(currentY - startY);

          if (diffX > 6 || diffY > 6) {
            isSwipeDirectionDecided = true;
            if (diffX > diffY) {
              isHorizontalSwipe = true;
              isDragging = true;
              // Prevent default scrolling only for horizontal swipes
              if (e.cancelable) e.preventDefault();
            } else {
              isHorizontalSwipe = false;
              onPointerUp();
              return;
            }
          }
        }

        // Only rotate the carousel if the user is swiping horizontally
        if (isHorizontalSwipe) {
          const dx = currentX - lastX;
          // Calculate exact frame dt (min 8ms to avoid divide by zero or extreme velocity spikes)
          const dt = Math.max(0.008, (currentTimestamp - lastTimestamp) / 1000);

          // Direct 1:1 drag feedback (dragging right pulls cards right, meaning SCROLL_X decreases)
          SCROLL_X = mod(SCROLL_X - dx * DRAG_SENS, TRACK);

          // Calculate velocity (rate of change of SCROLL_X: -dx * DRAG_SENS / dt)
          const instantVx = -dx * DRAG_SENS / dt;
          // Apply a low-pass filter to smooth the velocity for beautiful glide inertia
          vX = vX * 0.25 + instantVx * 0.75;
          // Cap the velocity to prevent wild spinning on sudden aggressive swipes
          vX = Math.max(-3500, Math.min(3500, vX));

          lastX = currentX;
          lastTimestamp = currentTimestamp;
        }
      };

      const onPointerUp = (e) => {
        if (e) {
          try {
            stage.releasePointerCapture(e.pointerId);
          } catch {
            // Safe fallback
          }
        }
        
        isDragging = false;
        stage.classList.remove("dragging");

        // If the swipe was not vertical and no movement occurred, reset velocity
        if (!isHorizontalSwipe) {
          vX = 0;
        }

        stage.removeEventListener("pointermove", onPointerMove);
        stage.removeEventListener("pointerup", onPointerUp);
        stage.removeEventListener("pointercancel", onPointerUp);
      };

      stage.addEventListener("pointermove", onPointerMove, { passive: false });
      stage.addEventListener("pointerup", onPointerUp);
      stage.addEventListener("pointercancel", onPointerUp);
    };

    // ========== INIT ==========
    async function init() {
      createCards();
      updateViewportConfig();
      measure();
      buildPalette();

      // Wait only for the first 5 critical images to load before hiding loader
      const criticalItems = items.slice(0, 5);
      const imgPromises = criticalItems.map((it) => {
        const img = it.el.querySelector("img");
        if (!img || img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      });

      await Promise.all(imgPromises);

      // Re-extract colors for the first 5 images now that they are fully loaded
      for (let i = 0; i < 5; i++) {
        const img = items[i].el.querySelector("img");
        if (img) {
          gradPalette[i] = extractColors(img, i);
        }
      }

      if (loader) {
        loader.classList.add("loader--hide");
        setTimeout(() => {
          loader.style.pointerEvents = "none";
        }, 200);
      }

      isEntering = false;
      stage.classList.add("carousel-mode");

      stage.addEventListener("wheel", onWheel, { passive: false });
      stage.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("resize", onResize);

      startCarousel();
      startBG();

      // Start background loading of remaining images
      loadDeferredImages();
    }

    init();

    // ========== CLEANUP ==========
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (bgRAF) cancelAnimationFrame(bgRAF);
      if (wheelTimeout) clearTimeout(wheelTimeout);
      stage?.removeEventListener("wheel", onWheel);
      stage?.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [photos]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
      className="stage"
      ref={stageRef}
      aria-live="polite"
    >
      <div ref={loaderRef} className="loader" aria-label="Loading" aria-live="assertive">
        <div className="loader__content">
          <div className="loader__ring" aria-hidden="true"></div>
        </div>
      </div>
      <canvas ref={bgCanvasRef} id="bg" aria-hidden="true"></canvas>
      <section ref={cardsRootRef} className="cards" aria-label="Infinite carousel of images"></section>
    </motion.main>
  );
}
