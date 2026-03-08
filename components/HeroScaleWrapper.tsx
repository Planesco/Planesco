"use client";

import { useEffect, useState } from "react";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

type Props = {
  children: React.ReactNode;
  /** When set, scale is computed from this container so the hero always fills it (cover). */
  containerWidth?: number;
  containerHeight?: number;
};

export default function HeroScaleWrapper({
  children,
  containerWidth,
  containerHeight,
}: Props) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const w = containerWidth ?? (typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH);
    const h = containerHeight ?? (typeof window !== "undefined" ? window.innerHeight : DESIGN_HEIGHT);
    if (w > 0 && h > 0) {
      const s = Math.max(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);
      setScale(s);
    }
  }, [containerWidth, containerHeight]);

  return (
    <div
      className="hero-scaled-canvas absolute left-1/2 top-1/2 shrink-0 origin-center"
      style={{
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}
