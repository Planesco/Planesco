"use client";

import React from "react";
import { useTranslations } from "next-intl";

const jakartaBold = {
  fontFamily: "Plus Jakarta Sans",
  fontWeight: 800,
  fontSize: "18px",
  lineHeight: "130%",
  letterSpacing: 0,
};

const jakartaMedium = {
  fontFamily: "Plus Jakarta Sans",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "150%",
  letterSpacing: 0,
};

export default function TestimonialCarousel() {
  const t = useTranslations("ourApproach");
  const testimonials = [
    {
      quote: t("testimonial1Quote"),
      name: t("testimonial1Name"),
      role: t("testimonial1Role"),
    },
    {
      quote: t("testimonial2Quote"),
      name: t("testimonial2Name"),
      role: t("testimonial2Role"),
    },
    {
      quote: t("testimonial3Quote"),
      name: t("testimonial3Name"),
      role: t("testimonial3Role"),
    },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);

  const goTo = (index: number) => {
    if (index < 0) {
      setActiveIndex(testimonials.length - 1);
    } else if (index >= testimonials.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[24px] bg-[#FCFCFC] shadow-[0px_160px_64px_rgba(145,158,161,0.01),0px_90px_54px_rgba(145,158,161,0.05),0px_40px_40px_rgba(145,158,161,0.09),0px_10px_22px_rgba(145,158,161,0.1)]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="w-full flex-shrink-0 px-6 pt-6 pb-6 flex flex-col justify-between min-h-[320px]"
              style={jakartaMedium}
            >
              <p className="whitespace-pre-line text-[16px] leading-[160%] text-[#3A4A52]">
                “{item.quote}”
              </p>
              <div className="mt-6 border-t border-[#E3EAEC] pt-3">
                <p
                  className="text-black"
                  style={{ ...jakartaBold, fontSize: "18px" }}
                >
                  {item.name}
                </p>
                <p className="mt-0.5 text-[16px] leading-[150%] text-[#6B7B82]">
                  {item.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          className="h-8 w-8 rounded-full bg-[#B9E629] text-sm text-[#1C1E1F] shadow-sm transition hover:bg-[#9BC41F]"
          aria-label="Previous testimonial"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-6 bg-[#1F2A30]"
                    : "w-2.5 bg-[#C3D0D6] hover:bg-[#9BAAB2]"
                }`}
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={isActive}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          className="h-8 w-8 rounded-full bg-[#B9E629] text-sm text-[#1C1E1F] shadow-sm transition hover:bg-[#9BC41F]"
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
    </div>
  );
}

