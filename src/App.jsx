import { useState, useRef, useEffect, useMemo } from "react";
import config from "./config";
import CountdownOverlay from "./components/CountdownOverlay";
import HeroSection from "./components/HeroSection";
import GradientCarousel from "./components/GradientCarousel";
import WishesSection from "./components/WishesSection";
import LoveLetterModal from "./components/LoveLetterModal";
import LoveDeclarationModal from "./components/LoveDeclarationModal";
import MusicToggle from "./components/MusicToggle";
import FloatingHearts from "./components/FloatingHearts";
import ConfettiCelebration from "./components/ConfettiCelebration";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

// High-performance Framer Motion luxury background particles and shifting sunset gradients
function MainScreenBackground({ zIndex = 1 }) {
  const { scrollYProgress } = useScroll();

  // Sunset transitions: top (Champagne/Blush) -> middle (Rose/Gold) -> bottom (Sage/Thyme)
  const opacityTop = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const opacityMid = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 1, 0]);
  const opacityBottom = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);

  /* eslint-disable react-hooks/purity */
  const particles = useMemo(() => {
    const list = [];
    const types = ["star", "heart", "sparkle"];
    const colors = {
      rose: "#BA5F6B",      // Deeper Antique Rose
      thyme: "#555D43",     // Deeper Organic Sage/Thyme Green
      gold: "#C9947A",      // Rich Bisque Gold
      pearl: "#FFFFFF"      // Pearl White
    };
    const colorKeys = Object.keys(colors);

    for (let i = 0; i < 65; i++) {
      const isForeground = Math.random() > 0.8;
      const isMidground = Math.random() > 0.45;
      
      let size = Math.random() * 10 + 10; // Deep particles (10px - 20px)
      let baseOpacity = Math.random() * 0.25 + 0.35; // Opacity 0.35 - 0.60
      let duration = Math.random() * 15 + 20; // 20s - 35s
      
      if (isForeground) {
        size = Math.random() * 15 + 25; // Foreground particles (25px - 40px)
        baseOpacity = Math.random() * 0.3 + 0.65; // Opacity 0.65 - 0.95
        duration = Math.random() * 10 + 12; // 12s - 22s
      } else if (isMidground) {
        size = Math.random() * 12 + 16; // Midground particles (16px - 28px)
        baseOpacity = Math.random() * 0.25 + 0.45; // Opacity 0.45 - 0.70
        duration = Math.random() * 12 + 16; // 16s - 28s
      }

      list.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]],
        size,
        baseOpacity,
        left: Math.random() * 100, // Left position percentage (0% - 100%)
        duration,
        delay: Math.random() * -40, // Negative delay so particles start distributed across the screen height instantly
        sway: Math.random() * 120 - 60, // Horizontal sway offset (px)
        rotate: Math.random() * 360 - 180, // Rotation offset (deg)
        twinkleDuration: Math.random() * 3 + 2.5 // Twinkle rate (2.5s - 5.5s)
      });
    }
    return list;
  }, []);
  /* eslint-enable react-hooks/purity */

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex }} // Contextual z-index based on screen nesting
    >
      {/* Scroll-Linked Layered Sunset Gradients */}
      <motion.div
        style={{ opacity: opacityTop, zIndex: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#FBEAD6] via-[#F5D6D9] to-[#E5BCA9]"
      />
      <motion.div
        style={{ opacity: opacityMid, zIndex: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#FBEAD6] via-[#E5BCA9] to-[#C87D87]"
      />
      <motion.div
        style={{ opacity: opacityBottom, zIndex: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#E5BCA9] to-[#6B7556]"
      />

      {/* Floating and Shimmering Framer Motion Particles (Guaranteed to render in all browsers) */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: `${p.left}%`,
              filter: `drop-shadow(0 4px 12px ${p.color}55)` // Elegant glowing aura matching the color
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-15vh",
              x: [0, p.sway, 0],
              rotate: [0, p.rotate]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Shimmer / Twinkle animation on the shape itself */}
            <motion.div
              animate={{
                opacity: [p.baseOpacity * 0.4, p.baseOpacity, p.baseOpacity * 0.4],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: p.twinkleDuration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ display: "flex", alignItems: "center", justifyItems: "center" }}
            >
              {p.type === "star" ? (
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: p.size, height: p.size, color: p.color }}>
                  <path d="M12,2 C12,12 12,12 22,12 C12,12 12,12 12,22 C12,12 12,12 2,12 C12,12 12,12 12,2" />
                </svg>
              ) : p.type === "heart" ? (
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: p.size * 0.9, height: p.size * 0.9, color: p.color }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: p.size * 0.7, height: p.size * 0.7, color: p.color }}>
                  <circle cx="12" cy="12" r="8" />
                </svg>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Luxurious ambient glowing orbs */}
      <div className="absolute top-[18%] left-[-250px] w-[500px] h-[500px] bg-[#C87D87]/6 rounded-full blur-3xl" />
      <div className="absolute top-[62%] right-[-250px] w-[500px] h-[500px] bg-[#6B7556]/6 rounded-full blur-3xl" />
    </div>
  );
}

export default function App() {
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [loveDeclared, setLoveDeclared] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const countdownDate = new Date(config.targetDate);

  // ─── Fade helpers ─────────────────────────────────────────────────────────

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = (audio) => {
    clearFade();
    audio.volume = 0;
    audio.play().catch(() => {});
    const target = 0.55;
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      if (audioRef.current.volume < target) {
        audioRef.current.volume = Math.min(target, audioRef.current.volume + 0.05);
      } else {
        clearFade();
      }
    }, 100);
  };

  const fadeOut = () => {
    clearFade();
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      if (audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        audioRef.current.pause();
        audioRef.current.volume = 0;
        clearFade();
      }
    }, 50);
  };

  // ─── Toggle (only triggered by the Navbar button) ─────────────────────────

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (!audioRef.current.paused) {
      fadeOut();
    } else {
      fadeIn(audioRef.current);
    }
  };

  // ─── Autoplay on mount ────────────────────────────────────────────────────

  useEffect(() => {
    if (!config.music.enabled || !audioRef.current) return;

    const startAudio = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          // Success playing! Fade in
          fadeIn(audioRef.current);
          cleanListeners();
        })
        .catch(() => {});
    };

    const cleanListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    // Try to autoplay immediately — browser may allow or block it
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        // Autoplay allowed — fade volume in
        const target = 0.55;
        fadeIntervalRef.current = setInterval(() => {
          if (!audioRef.current) { clearFade(); return; }
          if (audioRef.current.volume < target) {
            audioRef.current.volume = Math.min(target, audioRef.current.volume + 0.05);
          } else {
            clearFade();
          }
        }, 100);
      })
      .catch(() => {
        // Autoplay blocked by browser — set up a one-time global interaction fallback
        console.log("Autoplay blocked by browser policy. Setting up interaction fallback...");
        window.addEventListener("click", startAudio);
        window.addEventListener("touchstart", startAudio);
        window.addEventListener("keydown", startAudio);
      });

    return () => {
      clearFade();
      cleanListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Switch audio source when countdown ends ──────────────────────────────

  useEffect(() => {
    if (!config.music.enabled || !audioRef.current) return;
    const wasPlaying = !audioRef.current.paused;
    audioRef.current.load();
    if (wasPlaying) {
      fadeIn(audioRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownFinished]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen">
      {/* Global floating hearts rendered only on countdown and declaration screens */}
      {!(countdownFinished && loveDeclared) && <FloatingHearts zIndex={3} />}

      {/* Single audio element — src switches based on current screen */}
      {config.music.enabled && (
        <audio
          ref={audioRef}
          src={countdownFinished ? "/main-audio.mp3" : "/countdown-ticking.mp3"}
          loop
          preload="auto"
          onPlay={() => setMusicPlaying(true)}
          onPause={() => setMusicPlaying(false)}
        />
      )}

      {/* Music toggle icon — fixed top-right, no background */}
      {config.music.enabled && (
        <MusicToggle isPlaying={musicPlaying} toggle={toggleMusic} />
      )}

      <AnimatePresence mode="wait">
        {!countdownFinished ? (
          <CountdownOverlay
            key="countdown"
            date={countdownDate}
            onComplete={() => setCountdownFinished(true)}
          />
        ) : !loveDeclared ? (
          <LoveDeclarationModal
            key="love-declaration"
            onAccept={() => setLoveDeclared(true)}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full"
          >
            {/* Shifting gradients and starfield nested with positive z-index 1 */}
            <MainScreenBackground zIndex={1} />
            
            {/* Floating hearts layer nested with positive z-index 2 */}
            <FloatingHearts zIndex={2} />

            {/* Content wrapped in relative z-10 to stack on top of the background and hearts */}
            <div className="relative z-10 w-full">
              {/* Luxury Navigation Header */}
              <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-poster font-medium text-gradient-gold text-sm sm:text-base tracking-[0.25em] uppercase select-none flex items-center"
                >
                  For Alishba 🤍
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center gap-4 text-deeprose/80 font-display font-light text-sm tracking-[0.15em] uppercase select-none"
                >
                  <span>03 . 07 . 2026</span>
                  <span className="text-gold/60">✦</span>
                  <span className="animate-pulse">Forever yours ♾️</span>
                </motion.div>
              </header>

              <ConfettiCelebration />
              <HeroSection onOpenLetter={() => setLetterOpen(true)} />
              <GradientCarousel photos={config.galleryPhotos} />
              <WishesSection wishes={config.wishes} />
              <LoveLetterModal
                isOpen={letterOpen}
                onClose={() => setLetterOpen(false)}
                letter={config.loveLetter}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
