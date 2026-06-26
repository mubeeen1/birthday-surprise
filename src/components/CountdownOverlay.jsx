import { useEffect, useRef } from "react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

// High-performance canvas background rendering shifting light leaks and slowly drifting candlelit embers
function CountdownCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const width = window.innerWidth || 1200;
      const height = window.innerHeight || 800;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Luxuriously dense candlelit embers drifting slowly upward
    const particles = [];
    const particleCount = 75; // Increased from 25 for dramatic luxury presence
    
    const colors = [
      "rgba(200, 125, 135, ", // Antique Rose
      "rgba(229, 188, 169, ", // Bisque Gold
      "rgba(251, 234, 214, ", // Champagne Warmth
      "rgba(255, 253, 249, "  // Shimmering White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        size: Math.random() * 3.5 + 1.8, // Increased size from (0.8-2.8) to (1.8-5.3) for bold presence
        speedY: -(Math.random() * 0.55 + 0.25), // Increased speed slightly for visible movement
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.7 + 0.2, // Higher starting opacity
        fadeSpeed: Math.random() * 0.006 + 0.003,
        growing: Math.random() > 0.5,
        colorIndex: Math.floor(Math.random() * colors.length),
        swayAmplitude: Math.random() * 0.25 + 0.1,
        swayFrequency: Math.random() * 0.005 + 0.002
      });
    }

    let time = 0;

    const render = () => {
      const canvasWidth = canvas.width || window.innerWidth || 1200;
      const canvasHeight = canvas.height || window.innerHeight || 800;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      time += 0.0025; // Speed up the auroral shift slightly for elegant, noticeable flow

      // 1. Shifting auroral light leaks matching the romantic palette (Highly prominent opacities)
      const leaks = [
        {
          x: canvasWidth * 0.25 + Math.cos(time * 1.2) * canvasWidth * 0.15,
          y: canvasHeight * 0.35 + Math.sin(time * 0.9) * canvasHeight * 0.15,
          radius: Math.max(canvasWidth, canvasHeight) * 0.6,
          colorStart: "rgba(251, 234, 214, 0.45)", // Shifting Champagne
          colorEnd: "rgba(251, 234, 214, 0)"
        },
        {
          x: canvasWidth * 0.75 + Math.sin(time * 0.8) * canvasWidth * 0.15,
          y: canvasHeight * 0.65 + Math.cos(time * 1.3) * canvasHeight * 0.15,
          radius: Math.max(canvasWidth, canvasHeight) * 0.65,
          colorStart: "rgba(240, 196, 203, 0.48)", // Shifting Blush
          colorEnd: "rgba(240, 196, 203, 0)"
        },
        {
          x: canvasWidth * 0.5 + Math.cos(time * 0.6) * canvasWidth * 0.1,
          y: canvasHeight * 0.25 + Math.sin(time * 0.7) * canvasHeight * 0.1,
          radius: Math.max(canvasWidth, canvasHeight) * 0.5,
          colorStart: "rgba(107, 117, 86, 0.22)", // Ambient Sage/Thyme
          colorEnd: "rgba(107, 117, 86, 0)"
        }
      ];

      leaks.forEach(leak => {
        const grad = ctx.createRadialGradient(leak.x, leak.y, 0, leak.x, leak.y, leak.radius);
        grad.addColorStop(0, leak.colorStart);
        grad.addColorStop(1, leak.colorEnd);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      });

      // 2. Slow-drifting glowing candlelit embers
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * p.swayFrequency) * p.swayAmplitude;

        if (p.growing) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.9) p.growing = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.1) p.growing = true;
        }

        if (p.y < -20) {
          p.y = canvasHeight + 20;
          p.x = Math.random() * canvasWidth;
          p.opacity = 0.1;
          p.growing = true;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Use matching glowing fill color with shadow blur
        const baseColor = colors[p.colorIndex];
        ctx.fillStyle = `${baseColor}${p.opacity})`;
        ctx.shadowColor = `${baseColor}0.8)`;
        ctx.shadowBlur = p.size * 2.2; // Generates a gorgeous soft bloom surrounding the particle
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2, // Set to 2 to draw directly on top of the root container's style background
        pointerEvents: "none"
      }}
    />
  );
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) return null;

  const safe = (n) => Math.max(0, Number.isFinite(n) ? n : 0);
  const d = safe(days);
  const h = safe(hours);
  const m = safe(minutes);
  const s = safe(seconds);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.75, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 22 },
    },
  };

  return (
    <>
      {/* Screen-reader friendly updates */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {d} days, {h} hours, {m} minutes, {s} seconds remaining
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="countdown-cards-container"
      >



        {[
          { value: d, label: "Days" },
          { value: h, label: "Hours" },
          { value: m, label: "Minutes" },
          { value: s, label: "Seconds" },
         ].map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ scale: 1.06, y: -4 }}
            className="relative group"
          >
            <div className="countdown-card-glow" />
            <div className="countdown-card">
              <div className="countdown-card-sheen" />

              <div className="countdown-card-inner">
                <div className="countdown-number" aria-hidden="true">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="countdown-label">{item.label}</div>
              </div>

              {item.label === "Seconds" && (
                <motion.div
                  className="countdown-tick"
                  // quick, lightweight pulse (no re-mounting of whole overlay)
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};


export default function CountdownOverlay({ date, onComplete }) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      className="fixed inset-0 w-screen h-screen w-full h-full left-0 top-0 z-50 overflow-y-auto"
      style={{
        width: '100vw',
        height: '100vh',
        left: 0,
        top: 0,
        background: "linear-gradient(135deg, #FBEAD6 0%, #F5D6D9 50%, #E5BCA9 100%)" // Applied directly to root motion.div!
      }}
    >
      {/* High-performance canvas light leak & ember particle generator */}
      <CountdownCanvasBackground />

      {/* Content overlay wrapper - centers content and isolates the scrollbar to the viewport edge */}
      <div 
        className="relative z-10 min-h-full w-full flex flex-col items-center justify-center pt-16 pb-16 px-8 sm:px-20 md:px-32 lg:px-40"
        style={{ width: '100%' }}
      >
        <div 
          className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-6"
          style={{ width: '100%', maxWidth: '1024px' }}
        >
          {/* Decorative top element */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-6"
          >
          <div className="text-gold/60 font-display text-4xl font-light">✦</div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-light text-deeprose mb-2 leading-tight">
            Something
            <br />
            <span className="text-gradient-gold">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl font-cursive text-gold mt-3">
            is Awaiting
          </p>
        </motion.div>

        {/* Countdown display */}
        <div className="w-full flex flex-wrap justify-center gap-4 px-2">
          <Countdown date={date} renderer={renderer} onComplete={onComplete} />
        </div>

        {/* Separator */}
        <div className="w-20 md:w-24 separator-elegant mt-10 mb-6" />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xs sm:text-sm md:text-base text-mauve font-body font-light tracking-wide max-w-xs sm:max-w-md"
        >
          A celebration crafted with love and anticipation
        </motion.p>

        {/* Decorative bottom element */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-12 text-gold/45 font-display font-light"
          >
            <div className="text-3xl leading-none">✶</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}