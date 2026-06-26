import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";
import { FiX } from "react-icons/fi";

// anime.js is used only for the open/close popup motion.
// The actual popup is rendered via a native <dialog> to avoid z-index/stacking/clipping issues.
export default function LoveLetterModal({ isOpen, onClose, letter }) {
  const safeLetter = useMemo(
    () => (letter && typeof letter === "object" ? letter : { title: "", content: "" }),
    [letter]
  );

  const dialogRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typing effect (kept from original component)
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    const content = safeLetter.content || "";

    const typingInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedText(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 12);

    return () => clearInterval(typingInterval);
  }, [isOpen, safeLetter.content]);

  // Ensure dialog styles/behavior.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    // Close when user clicks outside or presses Esc.
    const handleCancel = (e) => {
      e.preventDefault();
      onClose?.();
    };

    dlg.addEventListener("cancel", handleCancel);
    
    // Backdrop click handler for native dialog
    const handleBackdropClick = (e) => {
      if (e.target === dlg) {
        onClose?.();
      }
    };

    dlg.addEventListener("click", handleBackdropClick);

    return () => {
      dlg.removeEventListener("cancel", handleCancel);
      dlg.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    // Opening animation
    if (isOpen) {
      if (!dlg.open) {
        dlg.showModal();
      }

      const card = dlg.querySelector("[data-love-card]");
      if (!card) return;

      animate(card, {
        opacity: [0, 1],
        scale: [0.86, 1],
        translateY: [36, 0],
        rotateX: [10, 0],
        duration: 450,
        ease: "outExpo",
      });

      return;
    }

    // Closing animation
    const card = dlg.querySelector("[data-love-card]");
    if (!card) {
      if (dlg.open) {
        try {
          dlg.close();
        } catch {
          // ignore
        }
      }
      return;
    }

    animate(card, {
      opacity: 0,
      scale: 0.96,
      translateY: 18,
      duration: 220,
      ease: "inExpo",
      onComplete: () => {
        try {
          if (dlg.open) dlg.close();
        } catch {
          // ignore
        }
      },
    });
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[60] m-auto w-[92%] sm:w-[85%] max-w-3xl h-fit max-h-[85vh] p-0 bg-transparent border-0 outline-none overflow-visible flex items-center justify-center backdrop:bg-[#6B7556]/20 backdrop:backdrop-blur-[8px]"
      aria-labelledby="love-letter-title"
    >
      <div
        data-love-card
        className="w-full max-h-[85vh] overflow-y-auto rounded-3xl animate-fade-in"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(107,117,86,0.12)] border-2 border-[#C87D87]/40 bg-gradient-to-br from-[#FBEAD6] via-[#F5D6D9] to-[#E5BCA9]">
          <div className="sr-only" id="love-letter-title">
            {safeLetter.title}
          </div>
 
          {/* Subtly glowing romantic backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,125,135,0.1),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(107,117,86,0.04)_45%,transparent_60%)] pointer-events-none" />
 
          {/* Luxury top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C87D87]/50 to-transparent" />
 
          <div className="relative z-10 p-6 sm:p-10 md:p-14 backdrop-blur-[6px] bg-white/20 rounded-3xl">
            {/* Elegant corner stars */}
            <div className="absolute top-6 left-8 text-[#C87D87]/40 font-display text-2xl select-none hidden sm:block">✦</div>
            <div className="absolute top-6 right-8 text-[#C87D87]/40 font-display text-2xl select-none hidden sm:block">✦</div>
            <div className="absolute bottom-6 left-8 text-[#C87D87]/40 font-display text-2xl select-none hidden sm:block">✦</div>
            <div className="absolute bottom-6 right-8 text-[#C87D87]/40 font-display text-2xl select-none hidden sm:block">✦</div>
 
            {/* Custom Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-[#FBEAD6]/90 hover:bg-[#C87D87] text-[#C87D87] hover:text-white transition-all duration-350 shadow-[0_4px_15px_rgba(200,125,135,0.12)] z-20 hover:scale-110 active:scale-90 border border-[#C87D87]/30 flex items-center justify-center cursor-pointer group"
              aria-label="Close love letter"
            >
              <FiX className="text-[25px] transition-transform duration-300 group-hover:rotate-90" />
            </button>
 
            <div className="relative z-10 text-center">
              {/* Pulsing heart icon */}
              <div className="flex justify-center mb-6">
                <div className="text-[#C87D87] text-6xl drop-shadow-[0_2px_12px_rgba(200,125,135,0.35)] font-display animate-pulse select-none">♥</div>
              </div>
 
              <div
                className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-32 mx-auto mb-8"
              />
 
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#3D4430] text-center mb-4 font-light tracking-wide leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                {safeLetter.title}
              </h3>
 
              <div
                className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-32 mx-auto mb-10"
              />
 
              {/* Hand-written styled parchment text */}
              <div className="text-base sm:text-lg md:text-xl font-serif text-[#3D4430] leading-relaxed whitespace-pre-wrap text-left max-w-2xl mx-auto mb-10 font-light tracking-wide italic px-2 sm:px-6 selection:bg-[#C87D87] selection:text-white">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-1.5 h-5 sm:h-6 ml-1 bg-[#C87D87]/80 animate-pulse" />
                )}
              </div>
 
              <div
                className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-32 mx-auto my-6"
              />
 
              <p className="text-xs sm:text-sm text-[#C87D87]/80 font-light tracking-[0.25em] uppercase">
                Forever yours
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
