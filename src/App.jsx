import { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";
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
import { AnimatePresence, motion } from "framer-motion";

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

  const fadeOut = (audio) => {
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
      fadeOut(audioRef.current);
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
  }, []);

  // ─── Switch audio source when countdown ends ──────────────────────────────

  useEffect(() => {
    if (!config.music.enabled || !audioRef.current) return;
    const wasPlaying = !audioRef.current.paused;
    audioRef.current.load();
    if (wasPlaying) {
      fadeIn(audioRef.current);
    }
  }, [countdownFinished]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts />

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
            className="relative z-10 w-full"
          >
            <ConfettiCelebration />
            <HeroSection onOpenLetter={() => setLetterOpen(true)} />
            <GradientCarousel photos={config.galleryPhotos} />
            <WishesSection wishes={config.wishes} />
            <LoveLetterModal
              isOpen={letterOpen}
              onClose={() => setLetterOpen(false)}
              letter={config.loveLetter}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
