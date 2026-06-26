import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle({ isPlaying, toggle }) {
  return (
    <motion.button
      id="music-toggle-btn"
      onClick={toggle}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "#C87D87",
        color: "#FBEAD6",
        borderColor: "#C87D87",
        boxShadow: "0 6px 20px rgba(200, 125, 135, 0.25)"
      }}
      whileTap={{ scale: 0.92 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
      style={{
        position: "fixed",
        top: "20px",
        right: "24px",
        zIndex: 9999,
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "#C87D87",
        border: "1px solid rgba(200, 125, 135, 0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 4px 15px rgba(200, 125, 135, 0.12)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex" }}
          >
            <MdMusicNote size={22} />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex" }}
          >
            <MdMusicOff size={22} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}