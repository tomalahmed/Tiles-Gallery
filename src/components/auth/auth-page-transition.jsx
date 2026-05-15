"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthPageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 46, scale: 1.018, filter: "blur(18px)" }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -46, scale: 0.992, filter: "blur(14px)" }}
        transition={{ duration: 0.78, ease: [0.19, 1, 0.22, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
