import { motion } from "framer-motion";
import config from "../config";
import { FiHeart } from "react-icons/fi";

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

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Ornament top */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="text-gold/80 font-display text-4xl font-light tracking-widest">
            ✦
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-light text-deeprose mb-4 leading-tight"
        >
          Happy
          <br />
          <span className="text-gradient-gold">Birthday</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-cursive text-gold mb-8"
        >
          My Dearest Love
        </motion.p>

        {/* Separator */}
        <motion.div variants={itemVariants} className="w-32 separator-elegant mx-auto mb-10" />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg font-body text-mauve font-light leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Every moment with you is a masterpiece. Today, we celebrate you—the love of my life, the reason my heart beats, and my greatest blessing.
        </motion.p>

        {/* Image */}
        <motion.div variants={itemVariants} className="my-10">
          <div className="relative inline-block max-w-[210px] mx-auto">
            {/* Decorative frame */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 md:-inset-10 bg-gradient-to-br from-gold/20 via-transparent to-champagne/20 rounded-full blur-xl"
            />

            <motion.img
              src={config.heroPhoto}
              alt="Us"
              className="relative w-full aspect-square object-cover rounded-full border-5 border-gold/40 shadow-cinematic ring-3 ring-cream/50"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
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