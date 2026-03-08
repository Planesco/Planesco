"use client";

import { useRef, useState } from "react";
import StepIcon from "./StepIcon";

type Step = { title: string; description: string };

export default function HowWeWorkCarousel({
  steps,
  icons,
}: {
  steps: Step[];
  icons: readonly string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector(`[data-how-step="${index}"]`) as HTMLElement;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, steps.length - 1));
  };

  return (
    <div className="md:hidden w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {steps.map((step, i) => (
          <div
            key={step.title}
            data-how-step={i}
            className="flex shrink-0 w-full min-w-full snap-center snap-always justify-center px-4"
          >
            <div className="flex w-[200px] aspect-square shrink-0 flex-col gap-2 rounded-xl bg-[#25262a]/80 backdrop-blur px-4 py-4 border border-[#D7E6EA]/20 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#B9E629] text-[18px] font-bold text-[#1C1E1F]"
                  aria-hidden
                >
                  <StepIcon src={icons[i]} stepNumber={i + 1} />
                </div>
              </div>
              <h3 className="text-[16px] font-semibold leading-tight text-[#D7E6EA] shrink-0">
                {step.title}
              </h3>
              <p className="text-[12px] font-normal leading-[16px] text-[#C7CCD6] line-clamp-5 overflow-hidden">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-[#B9E629]" : "w-2 bg-[#D7E6EA]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
