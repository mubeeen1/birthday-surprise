import { useEffect, useState, useCallback } from "react";
import Confetti from "react-confetti";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return size;
}

export default function ConfettiCelebration() {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      recycle={false}
      gravity={0.32}
      colors={[
        "#b8956a",
        "#d4af37",
        "#c9b89e",
        "#faf8f5",
        "#e8d5cc",
        "#d4a8a0",
        "#c5989a",
      ]}
      tweenDuration={900}
      confetti="true"
    />
  );
}