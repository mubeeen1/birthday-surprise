import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  "Do you love me?? 🥺💖",
  "Wait, really?? 😢💔",
  "Please think again... 😭🙏",
  "But I love you so much! 🥺❤️",
  "You're breaking my heart... 😭💔",
  "Are you absolutely sure?? 🥺😭",
  "Pretty please?? 🥺✨",
  "Okay, you have no choice now! 😂💕"
];

const YES_TEXTS = [
  "Yes! 💖",
  "Yes! 😍",
  "YES! 🥰",
  "YES, ABSOLUTELY! 💑",
  "I LOVE YOU TOO! 💍✨",
  "OF COURSE! 💖👰🤵",
  "YES, FOREVER! 🥺💕",
  "YES! FOREVER & EVER! 💖✨"
];

const NO_TEXTS = [
  "No 😢",
  "Are you sure? 😭",
  "Really? 🥺",
  "Think again! 💔",
  "Last chance! 😭",
  "Are you serious? 😢",
  "Don't do this! 😭",
  "Bye bye... 👋"
];

export default function LoveDeclarationModal({ onAccept }) {
  const [noCount, setNoCount] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  const handleNoClick = () => {
    setNoCount((prev) => Math.min(prev + 1, 7));
    setShakeKey((prev) => prev + 1); // Incrementing triggers a key-based spring shake animation on the card
  };

  const currentQuestion = QUESTIONS[Math.min(noCount, QUESTIONS.length - 1)];
  const currentYesText = YES_TEXTS[Math.min(noCount, YES_TEXTS.length - 1)];
  const currentNoText = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)];

  // Size calculations (Yes scales up by 30% per click; No shrinks by 1/7th per click to hit exactly 0 at 7 clicks)
  const yesScale = 1 + noCount * 0.3;
  const noScale = Math.max(0, 1 - noCount / 7);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FBEAD6 0%, #F5D6D9 50%, #E5BCA9 100%)",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0
      }}
    >
      {/* Cinematic background light leaks and textures */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,125,135,0.2),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(107,117,86,0.03)_45%,transparent_60%)] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <motion.div
        key={shakeKey} // Shakes bouncily whenever the shakeKey increments
        initial={shakeKey === 0 ? { opacity: 0, scale: 0.9, y: 30 } : false}
        animate={
          shakeKey > 0
            ? {
                x: [0, -8, 8, -6, 6, -3, 3, 0],
                y: [0, -2, 2, -1, 1, 0],
                scale: 1,
                rotate: [0, -1, 1, -0.5, 0.5, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="relative w-[340px] sm:w-[400px] overflow-visible rounded-3xl border border-[#C87D87]/40 bg-white/25 backdrop-blur-md p-6 sm:p-8 shadow-[0_30px_70px_rgba(200,125,135,0.18)] text-center z-10"
      >
        {/* Luxury Concentric Frame */}
        <div className="absolute inset-3 border border-[#C87D87]/25 rounded-2xl pointer-events-none opacity-60" />

        {/* Elegant Corner Star Ornaments inside the frame */}
        <div className="absolute top-5 left-5 text-[#C87D87]/45 text-xs select-none pointer-events-none">✦</div>
        <div className="absolute top-5 right-5 text-[#C87D87]/45 text-xs select-none pointer-events-none">✦</div>
        <div className="absolute bottom-5 left-5 text-[#C87D87]/45 text-xs select-none pointer-events-none">✦</div>
        <div className="absolute bottom-5 right-5 text-[#C87D87]/45 text-xs select-none pointer-events-none">✦</div>

        {/* Breathtaking Pulsing Heart with Orbit Ring */}
        <div className="flex justify-center mb-8 mt-2">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[#C87D87]/30 bg-white/45 shadow-inner">
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#C87D87] text-3xl select-none filter drop-shadow-[0_2px_8px_rgba(200,125,135,0.35)]"
            >
              ♥
            </motion.span>
            
            {/* Dashed spinning luxury orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] border border-dashed border-[#C87D87]/30 rounded-full"
            />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-28 mx-auto mb-6" />

        {/* Playful Italic Serif Question Text */}
        <div className="min-h-[96px] flex items-center justify-center mb-6 px-2">
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentQuestion}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-2xl sm:text-3xl font-serif italic font-light text-[#3D4430] tracking-wide leading-relaxed"
            >
              "{currentQuestion}"
            </motion.h3>
          </AnimatePresence>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-28 mx-auto mb-10" />

        {/* Buttons Area with spring-driven layout scaling - kept side-by-side on all screens */}
        <div className="flex flex-row items-center justify-center gap-6 min-h-[130px] overflow-visible py-2">
          
          {/* YES BUTTON - Satin Gradient with Sparkle Ornament (Increased initial size) */}
          <motion.button
            onClick={onAccept}
            layout
            animate={{ scale: yesScale }}
            whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(200, 125, 135, 0.38)" }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="relative flex items-center justify-center gap-2 px-10 py-4 rounded-full font-display text-base font-semibold tracking-wider uppercase cursor-pointer text-[#FBEAD6] bg-gradient-to-r from-[#C87D87] to-[#E5BCA9] shadow-[0_6px_20px_rgba(200,125,135,0.28)] border border-[#C87D87]/50 z-20 outline-none select-none"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-[10px] opacity-90"
            >
              ✦
            </motion.span>
            <span>{currentYesText}</span>
          </motion.button>

          {/* NO BUTTON - Soft Translucent Glassmorphic Button (Increased initial size) */}
          {noScale > 0 && (
            <motion.button
              onClick={handleNoClick}
              layout
              animate={{ scale: noScale, opacity: noScale }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
              whileTap={{ scale: noScale * 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative flex items-center justify-center px-8 py-3.5 rounded-full font-display text-base font-light tracking-wide cursor-pointer text-[#6B7556] bg-white/30 backdrop-blur-sm border border-[#C87D87]/20 hover:border-[#C87D87]/40 z-20 outline-none select-none"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {currentNoText}
            </motion.button>
          )}
        </div>

        {/* Elegant small footer caption */}
        <p className="text-[9px] text-[#6B7556]/60 font-light tracking-[0.25em] uppercase mt-8 select-none">
          A gentle prompt of love
        </p>
      </motion.div>
    </motion.div>
  );
}
