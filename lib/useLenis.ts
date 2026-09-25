"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (instance) {
      setLenis(instance);
    }
  }, []);

  const scrollTo = (target: string | HTMLElement | number, options?: Parameters<Lenis["scrollTo"]>[1]) => {
    if (typeof window !== "undefined") {
      const instance = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (instance) {
        instance.scrollTo(target, options);
      } else if (typeof target === "string" && target.startsWith("#")) {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { lenis, scrollTo };
}
