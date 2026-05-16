"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    // Keep route switches feeling intentional with smooth reset.
    lenisRef.current?.scrollTo(0, { duration: 0.85 });
  }, [pathname, shouldReduceMotion]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.48, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={transition}
          className="mx-auto flex w-full max-w-[1280px] flex-1 px-6 py-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
