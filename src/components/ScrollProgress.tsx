"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-sky-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgb(56_189_248/0.6)] z-100 pointer-events-none"
    />
  );
}
