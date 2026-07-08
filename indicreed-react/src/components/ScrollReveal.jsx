import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function ScrollReveal({
  children,
  width = "100%",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  return (
    <div ref={ref} style={{ width }}>
      <motion.div
        initial={{
          opacity: 0,
          y: directions[direction].y,
          x: directions[direction].x,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                x: 0,
              }
            : {}
        }
        transition={{
          duration: 0.7,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollReveal;
