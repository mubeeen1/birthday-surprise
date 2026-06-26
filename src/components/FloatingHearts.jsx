import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const random = (min, max) => Math.random() * (max - min) + min;

export default function FloatingHearts({ zIndex = 3 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      setHearts((prev) => [
        ...prev.slice(-40),
        {
          id,
          left: random(5, 95),
          size: random(14, 32),
          delay: 0,
          duration: random(7, 12),
          opacity: random(0.15, 0.35),
          xOffset: random(-80, 80),
        },
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }} // Contextual z-index based on screen nesting
    >
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              y: "120vh",
              opacity: h.opacity,
              rotate: random(-30, 30),
              x: 0,
              scale: random(0.8, 1.2),
            }}
            animate={{
              y: "-15vh",
              opacity: 0,
              rotate: random(-360, 360),
              x: h.xOffset,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: h.duration,
              ease: "easeIn",
              x: { duration: h.duration * 0.6, ease: "easeInOut" },
            }}
            className="absolute text-gold drop-shadow-xl"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              filter: "drop-shadow(0 6px 12px rgba(200, 125, 135, 0.25))",
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}