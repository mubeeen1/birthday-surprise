import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle({ isPlaying, toggle }) {
  return (
    <motion.button
      id="music-toggle-btn"
      onClick={toggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.88 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
      style={{
        position: "fixed",
        top: "20px",
        right: "24px",
        zIndex: 9999,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: "#C87D87", // Antique Rose color to suit the light background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex" }}
          >
            <MdMusicNote size={26} />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex" }}
          >
            <MdMusicOff size={26} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}