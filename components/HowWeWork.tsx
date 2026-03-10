import { getTranslations } from "next-intl/server";
import StepIcon from "./StepIcon";

const STEP_ICONS = [
  "/icons/assessment.png",   // 1. Assessment
  "/icons/plan.png",         // 2. Plan
  "/icons/execution.png",    // 3. Execution
  "/icons/monitoring.png",   // 4. Monitoring
] as const;

// Order for mobile 2x2 grid: Assessment, Execution, Plan, Monitoring
const MOBILE_GRID_ORDER = [0, 2, 1, 3] as const;

export default async function HowWeWork() {
  const t = await getTranslations("howWeWork");
  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
    { title: t("step4Title"), description: t("step4Desc") },
  ];

  return (
    <section id="how-we-work" className="relative z-20 px-6 pt-6 pb-16 md:pt-8 md:pb-20">
      <div
        className="mx-auto max-w-[1199px] overflow-hidden rounded-[62px] px-6 py-[50px] md:px-14 md:py-16"
        style={{
          background: "url('/hero-bg.png'), rgba(32, 32, 39, 0.92)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          backdropFilter: "blur(45px)",
          fontFamily: "var(--font-hero)",
        }}
      >
        <div className="mx-auto flex max-w-[1087px] flex-col items-center gap-10">
          <div className="flex flex-col gap-2 text-center">
            <h2
              className="text-[26px] font-semibold leading-[110%] tracking-[-0.03em] text-[#B9E629] md:text-[32px]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {t("title")}
            </h2>
            <p className="text-[14px] font-medium leading-[110%] text-[#D7E6EA] md:text-[18px]">
              {t("subtitle")}
            </p>
          </div>

          {/* Mobile: 2x2 flat on image (no cards) */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-6 md:hidden">
            {MOBILE_GRID_ORDER.map((idx) => {
              const step = steps[idx];
              return (
                <div key={step.title} className="flex flex-col gap-1.5">
                  <div
                    className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#B9E629] text-[18px] font-bold text-[#1C1E1F]"
                    aria-hidden
                  >
                    <StepIcon src={STEP_ICONS[idx]} stepNumber={idx + 1} />
                  </div>
                  <h3 className="text-[16px] font-semibold leading-tight text-[#D7E6EA]">
                    {step.title}
                  </h3>
                  <p className="text-[12px] font-normal leading-[15px] text-[#C7CCD6]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop: flat on image (no cards) */}
          <div className="hidden w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col gap-3.5"
              >
                <div className="flex items-center gap-5">
                  <div
                    className="relative flex h-[45px] w-[45px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#B9E629] text-[18px] font-bold text-[#1C1E1F]"
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
