import { motion } from "framer-motion";
import { FlipCard } from "./animate-ui/components/community/flip-card";

export default function WishesSection({ wishes }) {
  return (
    <section className="relative py-32 px-8 sm:px-20 md:px-32 lg:px-40">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-champagne/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">

        {/* ── Section header ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="text-center mb-20"
        >
          <div className="text-gold/60 font-display text-4xl md:text-5xl font-light mb-4">✦</div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display text-deeprose font-light mb-4 leading-tight">
            Wishes from My
            <br />
            <span className="text-gradient-gold">Heart</span>
          </h2>
          <div className="w-32 md:w-40 separator-elegant mx-auto mt-8" />
        </motion.div>

        {/* ── 4-column grid ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="wishes-flip-grid"
        >
          {(() => {
            const paletteColors = [
              { bg: "#F0C4CB", text: "#3B1E22", handle: "rgba(59, 30, 34, 0.75)", border: "#C87D87", logoBg: "#3B1E22", logoText: "#FBEAD6" },
              { bg: "#C87D87", text: "#FFFDF9", handle: "rgba(255, 253, 249, 0.75)", border: "#FFFDF9", logoBg: "#FFFDF9", logoText: "#C87D87" },
              { bg: "#FBEAD6", text: "#2E3B1E", handle: "rgba(46, 59, 30, 0.75)", border: "#E5BCA9", logoBg: "#2E3B1E", logoText: "#FBEAD6" },
              { bg: "#6B7556", text: "#FFFDF9", handle: "rgba(255, 253, 249, 0.75)", border: "#E5BCA9", logoBg: "#FFFDF9", logoText: "#6B7556" },
              { bg: "#E5BCA9", text: "#3B261D", handle: "rgba(59, 38, 29, 0.75)", border: "#C87D87", logoBg: "#3B261D", logoText: "#FBEAD6" }
            ];

            return wishes.map((wish, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 60, damping: 20 },
                  },
                }}
              >
                <FlipCard
                  data={{
                    name: wish.name,
                    iconName: wish.logoUrl,
                    bio: wish.text,
                  }}
                  colorConfig={paletteColors[idx % paletteColors.length]}
                />
              </motion.div>
            ));
          })()}
        </motion.div>

        {/* ── Closing statement ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center pt-20 border-t border-gold/20 mt-20"
        >
          <p className="text-base sm:text-lg md:text-2xl font-display text-deeprose/80 font-light italic mb-6">
            With every beat of my heart,
            <br />
            I wish for your endless joy, success, and happiness
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-gold/40 font-display text-3xl mt-8"
          >
            ✶
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
