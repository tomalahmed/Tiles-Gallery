"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthPageTransition({ children }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const initialState = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.995 };
  const animateState = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const exitState = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.995 };
  const transition = shouldReduceMotion
    ? { duration: 0.16 }
    : { duration: 0.34, ease: [0.22, 1, 0.36, 1] };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={initialState}
        animate={animateState}
        exit={exitState}
        transition={transition}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
