import { getTranslations } from "next-intl/server";
import MetricsCarousel from "./MetricsCarousel";

const gradientStyle = {
  background:
    "linear-gradient(136.62deg, #59A3B2 37.98%, #B9E629 57.55%, #B9E629 78.12%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export default async function MetricsCard() {
  const t = await getTranslations("metrics");
  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section className="relative z-10 -mt-12 px-6 md:-mt-14 lg:-mt-16">
      <MetricsCarousel stats={stats} />
      <div
        className="mx-auto hidden w-full max-w-[1200px] items-stretch rounded-[18px] bg-white md:flex"
        style={{
          width: "min(100%, 1200px)",
          minHeight: 180,
          paddingTop: 32,
          paddingRight: 88,
          paddingBottom: 40,
          paddingLeft: 88,
          gap: 64,
          boxShadow:
            "0px 53px 21px rgba(152, 225, 191, 0.01), 0px 30px 18px rgba(152, 225, 191, 0.05), 0px 13px 13px rgba(152, 225, 191, 0.09), 0px 3px 7px rgba(152, 225, 191, 0.1)",
          fontFamily: "var(--font-hero)",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-1 flex-col items-center justify-center text-center border-r border-[#E0E0E0] last:border-r-0"
          >
            <span
              className="text-4xl font-extrabold leading-[110%] tracking-[-0.04em] md:text-[64px]"
              style={gradientStyle}
            >
              {stat.value}
            </span>
            <p className="mt-2 text-lg font-normal leading-7 text-[#4A6372]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
