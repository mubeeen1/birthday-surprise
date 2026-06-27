import { easeOut, motion } from "framer-motion";
import * as React from "react";

export function FlipCard({ data, colorConfig }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.55, ease: easeOut } },
    back:  { rotateY: 180, transition: { duration: 0.55, ease: easeOut } },
  };

  // Default fallback if colorConfig is not provided
  const config = colorConfig || {
    bg: "#ffffff",
    text: "#1e293b",
    handle: "#64748b",
    border: "#e2e8f0",
    logoBg: "#6B7556",
    logoText: "#FBEAD6"
  };

  // Compute a soft luxury satin gradient background based on the solid bg color
  const getLuxuryGradient = (bgColor) => {
    switch (bgColor.toUpperCase()) {
      case "#F0C4CB": // Blush
        return "linear-gradient(135deg, #F0C4CB 0%, #F8E5E7 100%)";
      case "#C87D87": // Antique Rose
        return "linear-gradient(135deg, #C87D87 0%, #D89AA4 100%)";
      case "#FBEAD6": // Champagne
        return "linear-gradient(135deg, #FBEAD6 0%, #FFF9F2 100%)";
      case "#6B7556": // Dried Thyme
        return "linear-gradient(135deg, #6B7556 0%, #7C8768 100%)";
      case "#E5BCA9": // Bisque
        return "linear-gradient(135deg, #E5BCA9 0%, #EED0C2 100%)";
      default:
        return `linear-gradient(135deg, ${bgColor} 0%, #ffffff 100%)`;
    }
  };

  const gradientBg = getLuxuryGradient(config.bg);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        width: "240px",
        height: "340px",
        cursor: "pointer",
        margin: "0 auto", // Center within grid item
      }}
    >
      {/* Card wrapper — both faces live here */}
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>

        {/* ── FRONT ─────────────────────────────────────── */}
        <motion.div
          animate={isFlipped ? "back" : "front"}
          variants={cardVariants}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: gradientBg,
            color: config.text,
            borderColor: config.border,
            borderWidth: "1px", // Thinner outer border (1px)
            borderStyle: "solid",
            borderRadius: "16px", // Increased rounded corners (16px)
          }}
          className="flex flex-col items-center justify-center p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] relative"
        >
          {/* Luxury Inset Border Frame */}
          <div 
            style={{ 
              borderColor: config.border, 
              opacity: 0.35,
              borderWidth: "1px", // Thinner inner border (1px)
              borderStyle: "solid",
              borderRadius: "8px", // Increased inner rounding (8px)
            }} 
            className="absolute inset-3 pointer-events-none" 
          />

          {/* Circular Logo / Avatar */}
          <div 
            style={{ 
              width: "64px", 
              height: "64px", 
              minWidth: "64px",
              minHeight: "64px",
              backgroundColor: config.logoBg, 
              borderColor: config.border,
              borderRadius: "50%",
              borderWidth: "1px", // Thinner logo border (1px)
              borderStyle: "solid",
            }}
            className="overflow-hidden flex items-center justify-center shadow-inner mb-6 relative z-10"
          >
            {data.image && (data.image.startsWith("http") || data.image.startsWith("/")) ? (
              <img
                src={data.image}
                alt={data.name}
                style={{ width: "100%", height: "100%" }}
                className="object-cover"
              />
            ) : data.image ? (
              <span className="text-3xl select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] leading-none flex items-center justify-center">
                {data.image}
              </span>
            ) : (
              <span style={{ color: config.logoText }} className="text-xl font-display font-bold">
                {data.name?.[0] ?? "✦"}
              </span>
            )}
          </div>

          {/* Elegant Luxury Star Ornament */}
          <span style={{ color: config.text, opacity: 0.45 }} className="text-[11px] mb-4 select-none tracking-widest font-light z-10">✦ ✦ ✦</span>

          {/* Name - Styled with Uppercase and Tracking for Aesthetic Luxury */}
          <h3 
            style={{ color: config.text }}
            className="text-base font-extrabold text-center font-display tracking-[0.18em] uppercase leading-relaxed z-10 max-w-[85%] mb-2"
          >
            {data.name}
          </h3>
        </motion.div>

        {/* ── BACK ──────────────────────────────────────── */}
        <motion.div
          initial={{ rotateY: 180 }}
          animate={isFlipped ? "front" : "back"}
          variants={cardVariants}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            rotateY: 180,
            background: gradientBg,
            color: config.text,
            borderColor: config.border,
            borderWidth: "1px", // Thinner outer border (1px)
            borderStyle: "solid",
            borderRadius: "16px", // Increased rounded corners (16px)
          }}
          className="flex flex-col items-center justify-center p-8 shadow-[0_12px_35px_rgba(0,0,0,0.06)] relative"
        >
          {/* Luxury Inset Border Frame */}
          <div 
            style={{ 
              borderColor: config.border, 
              opacity: 0.35,
              borderWidth: "1px", // Thinner inner border (1px)
              borderStyle: "solid",
              borderRadius: "8px", // Increased inner rounding (8px)
            }} 
            className="absolute inset-3 pointer-events-none" 
          />

          {/* Wish Text - Styled like the Love Letter popup font */}
          <p 
            style={{ color: config.text }}
            className="text-[14px] sm:text-base text-center leading-relaxed font-serif font-medium not-italic px-1 relative z-10"
          >
            {data.bio}
          </p>

          {/* Elegant Luxury Star Ornament Bottom */}
          <span style={{ color: config.text, opacity: 0.35 }} className="absolute bottom-5 text-[10px] select-none font-light">✶</span>
        </motion.div>

      </div>
    </div>
  );
}
