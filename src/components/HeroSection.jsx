import { motion } from "framer-motion";
import config from "../config";

export default function HeroSection({ onOpenLetter }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 25 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-8 sm:px-20 md:px-32 lg:px-40"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Ornament top */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-gold/80 font-display text-3xl font-light tracking-widest">
            ✦ ✦ ✦
          </div>
        </motion.div>

        {/* Main title - Luxury Editorial Styling */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 leading-tight flex flex-col items-center select-none"
        >
          <span className="font-display font-light italic text-2xl sm:text-3xl md:text-4xl text-deeprose/90 tracking-wide mb-1 pr-4">
            Celebrating the Birthday of&nbsp;
          </span>
          <span className="font-poster font-light text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] tracking-[0.18em] text-gradient-gold uppercase leading-none mt-4">
            Alishba
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-light italic text-gold mb-10 tracking-wider select-none"
        >
          My Dearest Love
        </motion.p>

        {/* Separator */}
        <motion.div variants={itemVariants} className="w-40 separator-elegant mx-auto mb-10" />

        {/* Subtitle / Poetic Quote */}
        <motion.p
          variants={itemVariants}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-xl sm:text-2xl md:text-3xl text-deeprose/90 font-light italic leading-relaxed mb-12 max-w-3xl mx-auto select-none"
        >
          "In a world where everything is temporary, your love is my absolute forever. You are my safe haven, the owner of my heart, and my greatest blessing."
        </motion.p>

        {/* Image - Luxury Floating Ring Card */}
        <motion.div variants={itemVariants} className="my-12">
          <div className="relative inline-block max-w-[240px] mx-auto group">
            {/* Soft ambient glowing background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 bg-gradient-to-br from-gold/30 via-transparent to-deeprose/30 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition-opacity"
            />
            {/* Elegant double gold rings */}
            <div className="absolute -inset-4 border border-gold/35 rounded-full scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -inset-2 border border-deeprose/20 rounded-full scale-100 group-hover:scale-95 transition-transform duration-700 pointer-events-none" />

            <motion.img
              src={config.heroPhoto}
              alt="Us"
              className="relative w-full aspect-square object-cover rounded-full border-4 border-gold/45 shadow-cinematic ring-2 ring-cream/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-14">
          <motion.button
            onClick={onOpenLetter}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium group"
          >
            <span className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-display text-gold/90"
              >
                ✦
              </motion.span>
              <span>Read My Love Letter</span>

            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}