import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section
      className="relative flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-start overflow-hidden pt-12 pb-0 md:justify-center md:py-24 lg:py-[128px] px-6 md:px-12 lg:px-[120px]"
      style={{
        isolation: "isolate",
        ["--hero-bg-position-x" as string]: "center",
        ["--hero-bg-position-y" as string]: "60%",
        ["--hero-bg-height" as string]: "85%",
      }}
    >
      {/* Hero background: 1445×653, left -2px per design spec */}
      <div
        className="absolute top-0 bg-cover bg-no-repeat"
        style={{
          left: -2,
          width: "calc(100% + 2px)",
          minHeight: 653,
          height: "100%",
          backgroundImage: `
            radial-gradient(61.07% 58.58% at 52.11% 50.08%, rgba(30, 30, 34, 0) 0%, rgba(30, 30, 34, 0.6) 100%),
            linear-gradient(0deg, rgba(30, 30, 34, 0.6), rgba(30, 30, 34, 0.6)),
            radial-gradient(50% 50% at 50% 50%, rgba(30, 30, 34, 0) 0%, rgba(30, 30, 34, 0.6) 100%),
            url('/hero-bg.png')
          `,
          backgroundPosition: "var(--hero-bg-position-x, center) var(--hero-bg-position-y, bottom)",
          backgroundColor: "#656475",
          backgroundBlendMode: "normal, multiply, normal, normal",
        }}
      />
      {/* Faded green glow at the right edge of the screen */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 z-[1] h-[326px] w-[381px] -translate-y-1/2 rounded-full opacity-60 blur-[155px] md:blur-[155px]"
        style={{
          background: "rgba(221, 255, 72, 0.3)",
          right: 0,
          transform: "translate(50%, -50%)",
        }}
        aria-hidden
      />

      {/* Worker figure: on mobile bottom-half only so it doesn't overlap headline/CTA; desktop unchanged */}
      <div className="hero-figure-column absolute inset-0 z-[1] flex items-end justify-end pr-0 md:items-center md:pr-6 lg:pr-8 xl:pr-10">
        <div
          className="hero-figure-inner relative h-full w-full max-w-[min(100%,360px)] md:max-w-[min(100%,500px)] lg:max-w-[var(--hero-image-max-width)] hero-figure-mobile"
          style={{
            marginTop: "var(--hero-image-margin-top)",
            marginRight: "var(--hero-image-margin-right)",
            marginBottom: "var(--hero-image-margin-bottom)",
            marginLeft: "var(--hero-image-margin-left)",
            transform: "translate(var(--hero-image-offset-x, 0), var(--hero-image-offset-y, 0)) scale(var(--hero-image-scale, 1))",
          }}
        >
          <Image
            src="/hero-figure.png"
            alt=""
            width={1100}
            height={752}
            className="hero-figure-img h-full w-full object-contain object-right object-bottom md:object-center"
            priority
            style={{ opacity: "var(--hero-image-opacity, 1)" }}
            sizes="(max-width: 767px) 620px, (max-width: 1023px) 800px, 1280px"
          />
          {/* Orbit icons: 5 circles + dotted lime connectors, mobile only */}
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            aria-hidden
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 360 400"
              fill="none"
              preserveAspectRatio="xMaxYMax meet"
            >
              {/* Dotted connectors between adjacent circles (arc order: left-mid → top-right → right → bottom-right → bottom-left → back to left-mid) */}
              <line x1="95" y1="175" x2="195" y2="95" stroke="#B9E629" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="195" y1="95" x2="275" y2="155" stroke="#B9E629" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="275" y1="155" x2="255" y2="255" stroke="#B9E629" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="255" y1="255" x2="145" y2="285" stroke="#B9E629" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="145" y1="285" x2="95" y2="175" stroke="#B9E629" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Circle 1: wind turbine (left-middle) */}
              <g transform="translate(95, 175)">
                <circle r="22" stroke="white" strokeWidth="1.5" fill="transparent" />
                <circle cx="0" cy="-8" r="4" fill="white" opacity="0.9" />
                <line x1="0" y1="-4" x2="0" y2="-12" stroke="white" strokeWidth="1" />
                <line x1="-6" y1="-10" x2="6" y2="-6" stroke="white" strokeWidth="1" />
                <line x1="-4" y1="-6" x2="4" y2="-10" stroke="white" strokeWidth="1" />
              </g>
              {/* Circle 2: factory (top-right) */}
              <g transform="translate(195, 95)">
                <circle r="22" stroke="white" strokeWidth="1.5" fill="transparent" />
                <rect x="-6" y="-2" width="12" height="10" stroke="white" strokeWidth="1" fill="none" />
                <line x1="0" y1="-2" x2="0" y2="-8" stroke="white" strokeWidth="1" />
                <rect x="-2" y="-8" width="4" height="6" stroke="white" strokeWidth="0.8" fill="none" />
              </g>
              {/* Circle 3: bridge (middle-right) */}
              <g transform="translate(275, 155)">
                <circle r="22" stroke="white" strokeWidth="1.5" fill="transparent" />
                <path d="M -8 6 Q 0 -6 8 6" stroke="white" strokeWidth="1" fill="none" />
                <line x1="-6" y1="4" x2="6" y2="4" stroke="white" strokeWidth="1" />
              </g>
              {/* Circle 4: building (bottom-right) */}
              <g transform="translate(255, 255)">
                <circle r="22" stroke="white" strokeWidth="1.5" fill="transparent" />
                <rect x="-7" y="2" width="14" height="12" stroke="white" strokeWidth="1" fill="none" />
                <rect x="-5" y="4" width="2" height="2" fill="white" opacity="0.9" />
                <rect x="1" y="4" width="2" height="2" fill="white" opacity="0.9" />
                <rect x="-5" y="8" width="2" height="2" fill="white" opacity="0.9" />
                <rect x="1" y="8" width="2" height="2" fill="white" opacity="0.9" />
              </g>
              {/* Circle 5: industrial (bottom-left) */}
              <g transform="translate(145, 285)">
                <circle r="22" stroke="white" strokeWidth="1.5" fill="transparent" />
                <rect x="-6" y="0" width="12" height="10" stroke="white" strokeWidth="1" fill="none" />
                <line x1="2" y1="0" x2="2" y2="-6" stroke="white" strokeWidth="1" />
                <circle cx="2" cy="-8" r="2" stroke="white" strokeWidth="0.8" fill="none" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Text overlay: on mobile at top above figure; desktop centered */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-start justify-start pt-0 md:justify-center md:pt-0 pl-4 pr-4 md:pl-12 lg:pl-16 xl:pl-20"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        <div className="flex max-w-[960px] flex-col gap-4 w-full">
          {(() => {
            const highlight = t("predictability");
            const renderWithHighlight = (line: string) => {
              const i = line.indexOf(highlight);
              if (i === -1) return line;
              const after = line.slice(i + highlight.length);
              const hasComma = after.startsWith(",");
              const highlightText = hasComma ? highlight + "," : highlight;
              const restStart = i + highlightText.length;
              return (
                <>
                  {line.slice(0, i)}
                  <span
                    className="text-[#1C1E1F]"
                    style={{ background: "#B9E629" }}
                  >
                    {highlightText}
                  </span>
                  {line.slice(restStart)}
                </>
              );
            };
            const renderHeadline = (head: string) => (
              <>
                {head.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {idx > 0 && "\n"}
                    {renderWithHighlight(line)}
                  </span>
                ))}
              </>
            );
            return (
              <>
                <h1
                  className="whitespace-pre-line font-semibold leading-[1.12] tracking-[-0.02em] text-white text-[28px] sm:text-[32px] md:hidden"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {renderHeadline(t("headlineMobile"))}
                </h1>
                <h1
                  className="whitespace-pre-line font-semibold leading-[1.12] tracking-[-0.02em] text-white hidden md:block text-[48px] lg:text-[56px] xl:text-[64px]"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {renderHeadline(t("headline"))}
                </h1>
              </>
            );
          })()}
          <div className="pt-4 w-full flex justify-center md:justify-start">
            <Link
              href="#our-approach"
              className="inline-flex items-center justify-center rounded-full px-[52px] py-[18px] font-bold text-[#1C1E1F] transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#B9E629",
                borderRadius: "58px",
                fontFamily: "var(--font-hero)",
                fontSize: "18px",
                lineHeight: "20px",
                letterSpacing: "-0.02em",
                textTransform: "capitalize",
              }}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pointer-events-none"
        style={{
          height: "var(--hero-bottom-overlay-height, 80px)",
          opacity: "var(--hero-bottom-overlay-opacity, 1)",
        }}
        aria-hidden
      />
    </section>
  );
}
