import Countdown from "react-countdown";
import { motion } from "framer-motion";

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
      style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#242A1D] via-[#141710] to-[#1A1F14]" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(107, 117, 86, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(107, 117, 86, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(107, 117, 86, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Content overlay wrapper - centers content and isolates the scrollbar to the viewport edge */}
      <div 
        className="relative z-10 min-h-full w-full flex flex-col items-center justify-center p-4 md:p-8"
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