import { motion } from "framer-motion";

// FlipCard restored from the animate-ui community component.
import { FlipCard } from "./animate-ui/components/community/flip-card";

export default function WishesSection({ wishes }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-4">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-champagne/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="text-center mb-24"
        >
          <motion.div className="text-gold/60 font-display text-4xl md:text-5xl font-light mb-4">
            ✦
          </motion.div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display text-deeprose font-light mb-4 leading-tight">
            Wishes from My
            <br />
            <span className="text-gradient-gold">Heart</span>
          </h2>
          <div className="w-32 md:w-40 separator-elegant mx-auto mt-8" />
          <p className="text-base sm:text-lg md:text-2xl font-cursive text-gold mt-8">
            My deepest desires for you
          </p>
        </motion.div>

        {/* Wishes grid: 4 columns on desktop, 1 on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="wishes-grid"
        >
          {wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="w-full flex justify-center"
            >
              <FlipCard
                data={{
                  name: wish.name,
                  username: "",
                  image: wish.logoUrl,
                  bio: wish.text,
                  stats: { following: 0, followers: 0, posts: 0 },
                  socialLinks: {},
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center pt-16 border-t border-gold/20"
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
