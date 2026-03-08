"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HeroScaleWrapper from "./HeroScaleWrapper";

const MOBILE_BREAKPOINT = 768;

export default function HeroViewport({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(true);

  const updateSize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    setIsMobile(w < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateSize]);

  const scaleW = size.w > 0 ? size.w : typeof window !== "undefined" ? window.innerWidth : 1920;
  const scaleH = size.h > 0 ? size.h : typeof window !== "undefined" ? window.innerHeight : 1080;

  return (
    <>
      <div ref={ref} className="absolute inset-0" aria-hidden />
      {isMobile ? (
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      ) : (
        <HeroScaleWrapper containerWidth={scaleW} containerHeight={scaleH}>
          {children}
        </HeroScaleWrapper>
      )}
    </>
  );
}
