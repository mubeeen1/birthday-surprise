import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// High-performance canvas background rendering rising romantic elements and interactive sparkle bursts
function DeclarationCanvasBackground({ triggerKey }) {
  const canvasRef = useRef(null);
  const triggerRef = useRef(triggerKey);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Continuous rising romantic particles (hearts & stars)
    const risingParticles = [];
    const maxRising = 45; // Increased from 16 for a rich romantic canopy

    // Burst particles that erupt on clicks
    let burstParticles = [];
    let time = 0;

    const spawnRising = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 9 + 8, // Increased from (5-11) to (8-17) for high visibility
        type: Math.random() > 0.45 ? "heart" : "star",
        speedY: -(Math.random() * 0.45 + 0.2), // Slightly faster drift
        swaySpeed: Math.random() * 0.012 + 0.004,
        swayAmplitude: Math.random() * 1.5 + 0.6,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0,
        targetOpacity: Math.random() * 0.45 + 0.25, // Substantially increased opacity from (0.08-0.33) to (0.25-0.7)
        fadeSpeed: 0.008,
        rotation: Math.random() * Math.PI,
        rotateSpeed: (Math.random() - 0.5) * 0.006
      };
    };

    // Seed initial rising canopy particles
    for (let i = 0; i < maxRising; i++) {
      const p = spawnRising();
      p.y = Math.random() * canvas.height;
      p.opacity = Math.random() * p.targetOpacity;
      risingParticles.push(p);
    }

    // Spawn a massive, prominent stardust burst erupting from both the center and borders of the card
    const triggerBurst = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const burstCount = 150; // Increased to 150 for a dense, spectacular firework bloom

      const colors = [
        "#C87D87", // Antique Rose
        "#E5BCA9", // Bisque Gold
        "#FBEAD6", // Champagne
        "#FFFDF9"  // Sparkle White
      ];

      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        
        // Split particles: 40% blast from the center, 60% erupt directly from the borders of the card (width ~440px, height ~450px)
        // This ensures the burst is immediately visible outside the card's boundaries!
        const isBorderSpawn = Math.random() > 0.4;
        
        let startX = centerX;
        let startY = centerY;
        let speed = Math.random() * 13.0 + 5.0; // High speed for center blast

        if (isBorderSpawn) {
          const radiusX = Math.random() * 40 + 190;
          const radiusY = Math.random() * 40 + 210;
          startX = centerX + Math.cos(angle) * radiusX;
          startY = centerY + Math.sin(angle) * radiusY;
          speed = Math.random() * 7.5 + 3.0; // Slower speed since they start already visible
        }

        burstParticles.push({
          x: startX,
          y: startY,
          size: Math.random() * 6.8 + 3.2, // Large, highly visible stardust particles (3.2px to 10px)
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          gravity: Math.random() * 0.05 + 0.02, // Soft gravity fall
          wind: (Math.random() - 0.5) * 0.04,
          opacity: 1.0,
          decay: Math.random() * 0.009 + 0.004, // Very slow decay (lasts 2 to 4 seconds) for a long lingering trail
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.22 + 0.08, // Rapid shimmering speed
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.5; // Increment time for glittering effects

      // Trigger sparkle burst on click (when triggerKey increments)
      if (triggerRef.current !== triggerKey) {
        triggerRef.current = triggerKey;
        if (triggerKey > 0) {
          triggerBurst();
        }
      }

      // 1. Draw Rising Canopy
      risingParticles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * p.swaySpeed + p.swayOffset) * p.swayAmplitude * 0.4;
        p.rotation += p.rotateSpeed;

        if (p.opacity < p.targetOpacity) {
          p.opacity = Math.min(p.targetOpacity, p.opacity + p.fadeSpeed);
        }

        if (p.y < -30) {
          risingParticles[idx] = spawnRising();
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Apply a glowing shadow for a luxury aura
        ctx.shadowBlur = p.size * 0.8;
        
        if (p.type === "heart") {
          ctx.fillStyle = "#C87D87";
          ctx.shadowColor = "rgba(200, 125, 135, 0.4)";
          ctx.beginPath();
          const size = p.size;
          ctx.moveTo(0, size / 4);
          ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, size / 4);
          ctx.bezierCurveTo(-size, size, 0, size * 1.25, 0, size * 1.5);
          ctx.bezierCurveTo(0, size * 1.25, size, size, size, size / 4);
          ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, size / 4);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = "#E5BCA9";
          ctx.shadowColor = "rgba(229, 188, 169, 0.5)";
          ctx.beginPath();
          const size = p.size;
          ctx.moveTo(0, -size);
          ctx.quadraticCurveTo(0, 0, size, 0);
          ctx.quadraticCurveTo(0, 0, 0, size);
          ctx.quadraticCurveTo(0, 0, -size, 0);
          ctx.quadraticCurveTo(0, 0, 0, -size);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // 2. Draw Active Sparkle Bursts with Glittering Shimmer
      burstParticles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Apply friction, gravity, and wind
        p.speedX *= 0.96;
        p.speedY *= 0.96;
        p.speedY += p.gravity;
        p.x += p.wind;
        
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          burstParticles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        
        // Glittering shimmer effect as particles fall
        const shimmer = 0.6 + Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.4;
        ctx.globalAlpha = Math.max(0.1, p.opacity * shimmer);
        
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2.5; // Bright, glowing bloom

        ctx.beginPath();
        const size = p.size;
        
        // Render diamond/star shape
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}

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

const SUBTITLES = [
  "(choose wisely... 🤭)",
  "(hey! that's the wrong button! 😜)",
  "(are your fingers slipping? 🤔)",
  "(system error: 'No' is disabled! 🤖)",
  "(cough cough, look at the big pink button... 👀)",
  "(resistance is futile! 😂)",
  "(just say yes already! 🥰)",
  "(only one option remains! 💖)"
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
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resizing to make button dimensions fully responsive on narrow viewports
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => Math.min(prev + 1, 7));
    setShakeKey((prev) => prev + 1); // Shakes the card bouncily
  };

  const currentQuestion = QUESTIONS[Math.min(noCount, QUESTIONS.length - 1)];
  const currentSubtitle = SUBTITLES[Math.min(noCount, SUBTITLES.length - 1)];
  const currentYesText = YES_TEXTS[Math.min(noCount, YES_TEXTS.length - 1)];
  const currentNoText = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)];

  // Gentle, highly responsive scaling:
  // Yes button grows by 8% per click, reaching 1.56x scale (fits beautifully on mobile without overflowing)
  const yesScale = 1 + noCount * 0.08;
  // No button shrinks gradually by 7% per click so it remains fully clickable, and vanishes completely on the 7th click
  const noScale = noCount === 7 ? 0 : 1 - noCount * 0.07;
  const noRotation = -noCount * 12;

  // Responsive Button Layout Dimensions
  const yesStyle = {
    originX: 0.5,
    originY: 0.5,
    padding: isMobile ? "14px 28px" : "18px 44px",
    fontSize: isMobile ? "15px" : "18px",
    height: isMobile ? "48px" : "60px",
    minWidth: isMobile ? "130px" : "170px",
    borderRadius: isMobile ? "24px" : "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const noStyle = {
    originX: 0.5,
    originY: 0.5,
    padding: isMobile ? "12px 20px" : "14px 32px",
    fontSize: isMobile ? "13px" : "15px",
    height: isMobile ? "44px" : "50px",
    minWidth: isMobile ? "90px" : "120px",
    borderRadius: isMobile ? "22px" : "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, #FBEAD6 0%, #F5D6D9 50%, #E5BCA9 100%)",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0
      }}
    >
      {/* Soft romantic light leaks */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,125,135,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(107,117,86,0.04)_45%,transparent_60%)] pointer-events-none" />

      {/* Decorative slow-drifting glowing halo behind the card */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-[#C87D87] rounded-full blur-3xl pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* High-performance canvas rising hearts & click-triggered sparkle burst */}
      <DeclarationCanvasBackground triggerKey={shakeKey} />

      {/* Timeless Luxury Parchment Invitation Card */}
      <motion.div
        key={shakeKey}
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
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          width: "440px",
          maxWidth: "92vw",
          backgroundColor: "#FFFDF9", // Premium solid warm ivory-parchment base
        }}
        className="relative overflow-visible rounded-3xl border border-[#C87D87]/40 p-5 sm:p-10 md:p-12 shadow-[0_35px_80px_rgba(200,125,135,0.22)] text-center z-10"
      >
        {/* Luxury Double Concentric Frame */}
        <div className="absolute inset-3 border border-[#C87D87]/30 rounded-2xl pointer-events-none opacity-80" />
        <div className="absolute inset-[18px] border border-dashed border-[#C87D87]/20 rounded-xl pointer-events-none opacity-60" />

        {/* Elegant Corner Star Clusters inside the frame */}
        <div className="absolute top-6 left-6 text-[#C87D87]/60 text-[10px] select-none pointer-events-none tracking-widest font-light">✦ ✶</div>
        <div className="absolute top-6 right-6 text-[#C87D87]/60 text-[10px] select-none pointer-events-none tracking-widest font-light">✶ ✦</div>
        <div className="absolute bottom-6 left-6 text-[#C87D87]/60 text-[10px] select-none pointer-events-none tracking-widest font-light">✦ ✶</div>
        <div className="absolute bottom-6 right-6 text-[#C87D87]/60 text-[10px] select-none pointer-events-none tracking-widest font-light">✶ ✦</div>

        {/* Royal Melted Wax Seal with Inset Gold Pulse Heart */}
        <div className="flex justify-center mb-8 mt-2">
          <div className="relative flex items-center justify-center w-20 h-20 overflow-visible">
            {/* Dashed spinning outer luxury ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] border border-dashed border-[#C87D87]/25 rounded-full"
            />
            
            {/* The Wax Seal - Organic irregular hand-pressed border-radius */}
            <div 
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "53% 47% 49% 51% / 47% 53% 48% 52%",
                background: "radial-gradient(circle at 35% 35%, #D89AA4 0%, #C87D87 60%, #B26B75 100%)",
                boxShadow: "0 6px 15px rgba(169, 93, 103, 0.35), inset 0 -2px 4px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.25)"
              }}
              className="flex items-center justify-center relative z-10 border border-[#B26B75]/45"
            >
              {/* Inset Gold Heart Emblem with double-pulse heartbeat */}
              <motion.span
                animate={{ scale: [1, 1.15, 1.05, 1.22, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#FFF5E6] text-3xl font-display select-none filter drop-shadow-[0_1.5px_2.5px_rgba(255,245,230,0.65)]"
              >
                ♥
              </motion.span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-28 mx-auto mb-6" />

        {/* Timeless Italic Serif Typography */}
        <div className="min-h-[120px] flex flex-col items-center justify-center mb-6 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-2xl sm:text-3xl font-serif italic font-light text-[#3D4430] tracking-wide leading-relaxed px-4">
                "{currentQuestion}"
              </h3>
              
              {/* Decorative separator ornament cluster */}
              <div className="text-[10px] text-[#C87D87]/40 tracking-[0.3em] select-none font-light my-1">✦ ✶ ✦</div>

              {/* Playful, changing subtitle retort */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.1 }}
                className="text-xs sm:text-sm font-sans font-light text-[#6B7556] italic tracking-wide"
              >
                {currentSubtitle}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C87D87]/30 to-transparent w-28 mx-auto mb-10" />

        {/* Buttons Area - Side-by-Side Row Layout (Responsive spacing) */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 min-h-[140px] overflow-visible py-4">
          
          {/* YES BUTTON - Elegant Velvet Ribbon (Responsive dimensions) */}
          <motion.button
            onClick={onAccept}
            layout
            animate={{ 
              scale: yesScale,
              y: [0, -1, 0, -1, 0]
            }}
            whileHover={{ 
              scale: yesScale * 1.05,
              y: -3, 
              boxShadow: "0 14px 35px rgba(200, 125, 135, 0.45)" 
            }}
            whileTap={{ scale: yesScale * 0.96 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="relative font-display font-bold tracking-[0.15em] uppercase cursor-pointer text-[#FBEAD6] bg-gradient-to-br from-[#C87D87] to-[#B26B75] shadow-[0_8px_25px_rgba(200,125,135,0.32)] border border-[#C87D87]/40 z-20 outline-none select-none"
            style={yesStyle}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-xs opacity-90"
            >
              ✦
            </motion.span>
            <span>{currentYesText}</span>
          </motion.button>

          {/* NO BUTTON - Soft Translucent Champagne Ribbon (Responsive dimensions) */}
          {noScale > 0 && (
            <motion.button
              onClick={handleNoClick}
              layout
              animate={{ 
                scale: noScale, 
                opacity: noScale,
                rotate: noRotation 
              }}
              whileHover={{ 
                backgroundColor: "rgba(251, 234, 214, 0.5)",
                borderColor: "rgba(200, 125, 135, 0.5)",
                color: "#B26B75"
              }}
              whileTap={{ scale: noScale * 0.94 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
              className="relative font-display font-semibold tracking-wider cursor-pointer text-[#C87D87] bg-[#FBEAD6]/30 backdrop-blur-sm border border-[#C87D87]/25 z-20 outline-none select-none transition-all"
              style={noStyle}
            >
              {currentNoText}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
