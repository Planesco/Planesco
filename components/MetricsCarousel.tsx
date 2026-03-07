"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const gradientStyle = {
  background:
    "linear-gradient(136.62deg, #59A3B2 37.98%, #B9E629 57.55%, #B9E629 78.12%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const cardShadow =
  "0px 53px 21px rgba(152, 225, 191, 0.01), 0px 30px 18px rgba(152, 225, 191, 0.05), 0px 13px 13px rgba(152, 225, 191, 0.09), 0px 3px 7px rgba(152, 225, 191, 0.1)";

type Stat = { value: string; label: string };

function getScrollIndex(el: HTMLDivElement, count: number): number {
  const scrollLeft = el.scrollLeft;
  const step = el.offsetWidth; // one card = full width, no gap
  const index = Math.round(scrollLeft / step);
  return Math.max(0, Math.min(index, count - 1));
}

export default function MetricsCarousel({ stats }: { stats: Stat[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveIndex((prev) => {
      const next = getScrollIndex(el, stats.length);
      return next !== prev ? next : prev;
    });
  }, [stats.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollEndTimer: ReturnType<typeof setTimeout>;
    const onScrollEnd = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(updateIndex, 100);
    };
    el.addEventListener("scrollend", updateIndex);
    el.addEventListener("scroll", onScrollEnd);
    return () => {
      el.removeEventListener("scrollend", updateIndex);
      el.removeEventListener("scroll", onScrollEnd);
      clearTimeout(scrollEndTimer);
    };
  }, [updateIndex]);

  const goToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = getScrollIndex(el, stats.length);
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            data-metric-slide={i}
            className="flex shrink-0 w-full min-w-full snap-center snap-always flex-col items-center justify-center rounded-[14px] bg-white py-8 px-6 text-center"
            style={{
              boxShadow: cardShadow,
              fontFamily: "var(--font-hero)",
            }}
          >
            <span
              className="text-[40px] font-extrabold leading-[110%] tracking-[-0.04em]"
              style={gradientStyle}
            >
              {stat.value}
            </span>
            <p className="mt-2 text-base font-normal leading-7 text-[#4A6372]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {stats.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-[#B9E629]" : "w-2 bg-[#9095A2]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
