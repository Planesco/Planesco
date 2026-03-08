"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

function getScrollIndex(el: HTMLDivElement, count: number): number {
  const scrollLeft = el.scrollLeft;
  const step = el.offsetWidth;
  const index = Math.round(scrollLeft / step);
  return Math.max(0, Math.min(index, count - 1));
}

export default function Services() {
  const t = useTranslations("services");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: t("projectManagement"),
      icon: "/icons/project-management.png",
      description: null as string | null,
    },
    {
      title: t("planningControls"),
      icon: "/icons/planning-project-controls.png",
      description: t("planningControlsDesc"),
    },
    {
      title: t("safetyByDesign"),
      icon: "/icons/safety-by-design.png",
      description: null,
    },
    {
      title: t("aiTools"),
      icon: "/icons/ai-tools.png",
      description: null,
    },
  ];

  const cardShadow =
    "0px 193px 54px rgba(177, 192, 196, 0.01), 0px 123px 49px rgba(177, 192, 196, 0.08), 0px 69px 42px rgba(177, 192, 196, 0.26), 0px 31px 31px rgba(177, 192, 196, 0.45), 0px 8px 17px rgba(177, 192, 196, 0.52)";

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveIndex((prev) => {
      const next = getScrollIndex(el, services.length);
      return next !== prev ? next : prev;
    });
  }, [services.length]);

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
    const index = getScrollIndex(el, services.length);
    setActiveIndex(index);
  };

  const cardSize = {
    height: "244px",
    borderRadius: "24px",
    padding: 0,
    boxShadow: cardShadow,
    background: "#B9E629",
    overflow: "hidden" as const,
  };

  function ServiceCard({
    s,
    className,
  }: {
    s: (typeof services)[number];
    className?: string;
  }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => setIsFlipped((prev) => !prev);
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFlip();
      }
    };

    const backContent = s.description ?? t("descriptionPlaceholder");

    return (
      <div
        className={className ?? ""}
        style={{ width: "100%", height: cardSize.height }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={t("clickToFlip")}
          onClick={handleFlip}
          onKeyDown={handleKeyDown}
          className="relative w-full h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#779516] focus-visible:ring-offset-2 rounded-[24px]"
          style={{
            ...cardSize,
            perspective: "1000px",
          }}
        >
          <div
            className="relative w-full h-full rounded-[24px]"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.5s ease",
              transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
            }}
          >
            {/* Front face: lime, centered icon + title */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center gap-4 rounded-[24px] text-center p-5"
              style={{
                background: "#B9E629",
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              {s.icon && (
                <div
                  className="flex shrink-0 h-[63px] items-center justify-center"
                  style={{ color: "#779516" }}
                  aria-hidden
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={63}
                    height={63}
                    className="h-[62.79px] w-[62.79px] object-contain"
                  />
                </div>
              )}
              <h3
                className="font-extrabold uppercase leading-[25px] text-[#1C1E1F]"
                style={{ fontSize: "20px" }}
              >
                {s.title.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < s.title.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h3>
            </div>
            {/* Back face: white, title + description */}
            <div
              className="absolute inset-0 flex flex-col rounded-[24px] text-center p-5 overflow-auto"
              style={{
                background: "#ffffff",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3
                className="font-extrabold uppercase leading-[25px] text-[#1C1E1F] shrink-0"
                style={{ fontSize: "20px" }}
              >
                {s.title.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < s.title.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="mt-3 text-[14px] font-medium leading-[18px] text-[#596A73] min-h-[3rem]">
                {backContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="services"
      className="px-6 py-16 md:py-20"
      style={{ fontFamily: "var(--font-hero)" }}
    >
      <div className="mx-auto max-w-[1202px]">
        <h2
          className="mb-12 text-center text-[40px] font-bold leading-[110%] tracking-[-0.01em] text-[#1C1E1F]"
          style={{ fontFamily: "Inter", fontWeight: 700 }}
        >
          {t("title")}
        </h2>
        {/* Mobile carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                data-slide={i}
                className="flex shrink-0 w-full min-w-full snap-center snap-always"
              >
                <ServiceCard s={s} className="w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {services.map((_, i) => (
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
        {/* Desktop grid */}
        <div
          className="hidden md:flex flex-nowrap justify-between items-stretch"
          style={{ gap: "20px" }}
        >
          {services.map((s) => (
            <div
              key={s.title}
              className="flex w-full md:w-[280px] md:shrink-0 items-stretch"
            >
              <ServiceCard s={s} className="w-full min-h-0" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-[#596A73]">
          {t("clickToRevealDescription")}
        </p>
      </div>
    </section>
  );
}
