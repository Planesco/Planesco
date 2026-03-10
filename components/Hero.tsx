import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import HeroViewport from "./HeroViewport";

export default async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section
      className="hero-section relative w-full overflow-hidden"
      style={{
        height: "var(--hero-viewport-height, 88vh)",
        minHeight: "var(--hero-viewport-height, 88vh)",
        backgroundColor: "var(--color-page-bg, #EBF2F1)",
      }}
    >
      <HeroViewport>
        <div
          className="hero-bg-vars relative h-full w-full flex flex-col items-center justify-start pt-12 pb-0 md:justify-center md:pt-6 md:pb-16 lg:pt-4 lg:pb-12 px-6 md:px-12 lg:px-[120px]"
          style={{ isolation: "isolate" }}
        >
      {/* Hero background: height from --hero-bg-height so figure can sit on its bottom */}
      <div
        className="absolute top-0 left-0 bg-cover bg-no-repeat hero-bg"
        style={{
          left: -2,
          width: "calc(100% + 2px)",
          minHeight: 653,
          height: "var(--hero-bg-height, 100%)",
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
      {/* Top-left decorative glow (mobile + desktop). Tune in globals.css via --hero-top-left-* */}
      <div
        className="hero-top-left-accent pointer-events-none absolute left-0 top-0 z-[1] md:block"
        style={{
          left: "var(--hero-top-left-left)",
          top: "var(--hero-top-left-top)",
          width: "var(--hero-top-left-width)",
          transform: "translate(var(--hero-top-left-offset-x), var(--hero-top-left-offset-y)) scale(var(--hero-top-left-scale))",
          opacity: "var(--hero-top-left-opacity)",
        }}
        aria-hidden
      >
        <Image
          src="/hero-top-left.png"
          alt=""
          width={400}
          height={300}
          className="h-auto w-full object-contain object-left-top"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

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

      {/* Bottom-right accent: mobile only (tune in globals.css via --hero-accent-mobile-*) */}
      <div
        className="hero-accent-mobile pointer-events-none absolute right-0 bottom-0 z-[1] block md:hidden"
        style={{
          width: "var(--hero-accent-mobile-width)",
          height: "var(--hero-accent-mobile-height)",
          right: "var(--hero-accent-mobile-right)",
          bottom: "var(--hero-accent-mobile-bottom)",
          top: "var(--hero-accent-mobile-top)",
          transform: "translate(var(--hero-accent-mobile-offset-x), var(--hero-accent-mobile-offset-y)) scale(var(--hero-accent-mobile-scale)) rotate(var(--hero-accent-mobile-rotate))",
          opacity: "var(--hero-accent-mobile-opacity)",
        }}
        aria-hidden
      >
        <Image
          src="/hero-accent.png"
          alt=""
          width={400}
          height={300}
          className="h-full w-full object-contain"
          style={{ width: "100%", height: "auto", objectPosition: "right bottom" }}
        />
      </div>

      {/* Bottom-right accent: desktop only (tune in globals.css via --hero-accent-*) */}
      <div
        className="hero-accent pointer-events-none absolute right-0 bottom-0 z-[1] hidden md:block"
        style={{
          width: "var(--hero-accent-width, 280px)",
          height: "var(--hero-accent-height, auto)",
          right: "var(--hero-accent-right, 0px)",
          bottom: "var(--hero-accent-bottom, 10%)",
          top: "var(--hero-accent-top, auto)",
          transform: "translate(var(--hero-accent-offset-x, 0), var(--hero-accent-offset-y, 0)) scale(var(--hero-accent-scale, 1)) rotate(var(--hero-accent-rotate, 0deg))",
          opacity: "var(--hero-accent-opacity, 0.9)",
        }}
        aria-hidden
      >
        <Image
          src="/hero-accent.png"
          alt=""
          width={400}
          height={300}
          className="h-full w-full object-contain"
          style={{ width: "100%", height: "auto", objectPosition: "right bottom" }}
        />
      </div>

      {/* Worker figure: full-height column so figure sits flush with bottom of hero (white box) */}
      <div className="hero-figure-column absolute inset-0 z-[1] flex items-end justify-end pr-0 md:pr-6 lg:pr-8 xl:pr-10">
        <div
          className="hero-figure-inner relative h-full w-full max-w-[min(100%,var(--hero-figure-mobile-max-width,360px))] md:max-w-[min(100%,500px)] lg:max-w-[var(--hero-image-max-width)] hero-figure-mobile"
          style={{
            marginTop: "var(--hero-image-margin-top)",
            marginRight: "var(--hero-image-margin-right)",
            marginBottom: "var(--hero-image-margin-bottom)",
            marginLeft: "var(--hero-image-margin-left)",
            transform: "translate(var(--hero-image-offset-x, 0), var(--hero-image-offset-y, 0)) scale(var(--hero-image-scale, 1))",
          }}
        >
          {/* Mobile: first image (dark bg, neon elements) */}
          <Image
            src="/hero-figure-mobile.png"
            alt=""
            width={1100}
            height={752}
            className="hero-figure-img h-full w-full object-contain object-right object-bottom md:object-center md:hidden"
            priority
            quality={92}
            style={{ opacity: "var(--hero-image-opacity, 1)" }}
            sizes="(max-width: 767px) 620px, 620px"
          />
          {/* Desktop: second image (industrial background, overlaid icons). For sharper result at large sizes, use a 2x source (e.g. 1964×1306) and set width/height to match. */}
          <Image
            src="/hero-figure.png"
            alt=""
            width={982}
            height={653}
            className="hero-figure-img h-full w-full object-contain object-right object-bottom hidden md:block"
            priority
            quality={92}
            style={{ opacity: "var(--hero-image-opacity, 1)" }}
            sizes="(max-width: 1023px) 800px, min(100vw, 1280px)"
          />
        </div>
      </div>

      {/* Text overlay: centered on mobile; left-aligned on desktop */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center justify-start pt-0 md:justify-center md:pt-0 px-4 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 xl:pl-20 xl:pr-20 md:items-start"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        <div className="hero-headline-wrap flex max-w-[960px] md:max-w-[min(960px,52%)] flex-col gap-4 w-full items-center text-center md:items-start md:text-left">
          <h1
            className="hero-headline font-semibold leading-[1.12] tracking-[-0.02em] text-white text-center md:text-left"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {(() => {
              const head = t("headline");
              const highlight = t("predictability");
              const lines = head.split("\n");
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
              return (
                <>
                  {lines.map((line, idx) => (
                    <span key={idx} className="hero-headline-line block whitespace-nowrap">
                      {renderWithHighlight(line)}
                    </span>
                  ))}
                </>
              );
            })()}
          </h1>
          <div className="pt-4">
            <Link
              href="#our-approach"
              className="inline-flex items-center justify-center rounded-full p-[20px] text-base leading-5 md:text-[20px] md:leading-6 font-bold text-[#1C1E1F] transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#B9E629",
                borderRadius: "58px",
                fontFamily: "var(--font-hero)",
                letterSpacing: "-0.02em",
                textTransform: "capitalize",
              }}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Hard cutoff: solid bar so hero background ends sharply ~halfway through the metrics (15+ Years) section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "var(--hero-bottom-overlay-height, 120px)",
          backgroundColor: "var(--color-page-bg, #EBF2F1)",
        }}
        aria-hidden
      />
        </div>
      </HeroViewport>
    </section>
  );
}
