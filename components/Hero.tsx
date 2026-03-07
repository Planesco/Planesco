import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section
      className="relative flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-center overflow-hidden py-20 md:py-24 lg:py-[128px] px-6 md:px-12 lg:px-[120px]"
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

      {/* Worker figure: full-width layer so text can sit on top */}
      <div className="hero-figure-column absolute inset-0 z-[1] flex items-center justify-end pr-4 md:pr-6 lg:pr-8 xl:pr-10">
        <div
          className="hero-figure-inner relative h-full w-full max-w-[min(100%,360px)] md:max-w-[min(100%,500px)] lg:max-w-[var(--hero-image-max-width)]"
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
            className="hero-figure-img h-full w-full object-contain object-right"
            priority
            style={{ opacity: "var(--hero-image-opacity, 1)" }}
            sizes="(max-width: 767px) 620px, (max-width: 1023px) 800px, 1280px"
          />
        </div>
      </div>

      {/* Text overlay: always 3 lines, on top of background and figure */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-start justify-center pl-8 md:pl-12 lg:pl-16 xl:pl-20"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        <div className="flex max-w-[960px] flex-col gap-4">
          <h1
            className="whitespace-pre-line font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[48px] lg:text-[56px] xl:text-[64px]"
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
                    <span key={idx}>
                      {idx > 0 && "\n"}
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
