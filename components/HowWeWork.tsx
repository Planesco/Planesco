import { getTranslations } from "next-intl/server";
import StepIcon from "./StepIcon";
import HowWeWorkCarousel from "./HowWeWorkCarousel";

const STEP_ICONS = [
  "/icons/assessment.png",   // 1. Assessment
  "/icons/plan.png",         // 2. Plan
  "/icons/execution.png",    // 3. Execution
  "/icons/monitoring.png",   // 4. Monitoring
] as const;

export default async function HowWeWork() {
  const t = await getTranslations("howWeWork");
  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
    { title: t("step4Title"), description: t("step4Desc") },
  ];

  return (
    <section id="how-we-work" className="relative z-20 px-6 pt-24 pb-16 md:pt-32 md:pb-20">
      <div
        className="mx-auto max-w-[1199px] overflow-hidden rounded-[62px] px-6 py-[50px] md:px-14 md:py-16"
        style={{
          background: "url('/hero-bg.png'), rgba(32, 32, 39, 0.92)",
          backgroundSize: "120%",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backdropFilter: "blur(45px)",
          fontFamily: "var(--font-hero)",
        }}
      >
        <div className="mx-auto flex max-w-[1087px] flex-col items-center gap-10">
          <div className="flex flex-col gap-3 text-center">
            <h2
              className="text-[40px] font-semibold leading-[110%] tracking-[-0.03em] text-[#B9E629]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {t("title")}
            </h2>
            <p className="text-[24px] font-medium leading-[110%] text-[#D7E6EA]">
              {t("subtitle")}
            </p>
          </div>

          <HowWeWorkCarousel steps={steps} icons={STEP_ICONS} />

          <div className="hidden w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col gap-3.5"
              >
                <div className="flex items-center gap-5">
                  <div
                    className="relative flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[#B9E629] text-[18px] font-bold text-[#1C1E1F]"
                    aria-hidden
                  >
                    <StepIcon src={STEP_ICONS[i]} stepNumber={i + 1} />
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="hidden flex-1 border-t border-[#D7E6EA]/40 lg:block"
                      aria-hidden
                    />
                  )}
                </div>
                <h3 className="text-[20px] font-semibold leading-[25px] text-[#D7E6EA]">
                  {step.title}
                </h3>
                <p className="text-[14px] font-normal leading-[18px] text-[#C7CCD6]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
