import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const jakartaBold = {
  fontFamily: "Plus Jakarta Sans",
  fontWeight: 800,
  fontSize: "17px",
  lineHeight: "130%",
  letterSpacing: 0,
};

const jakartaMedium = {
  fontFamily: "Plus Jakarta Sans",
  fontWeight: 500,
  fontSize: "17px",
  lineHeight: "130%",
  letterSpacing: 0,
};

const testimonialShadow =
  "0px 160px 64px rgba(145, 158, 161, 0.01), 0px 90px 54px rgba(145, 158, 161, 0.05), 0px 40px 40px rgba(145, 158, 161, 0.09), 0px 10px 22px rgba(145, 158, 161, 0.1)";

export default async function OurApproach() {
  const t = await getTranslations("ourApproach");

  return (
    <section
      id="our-approach"
      className="relative overflow-hidden pt-16 pb-0 md:pt-[89px]"
      style={{
        marginTop: "-110px",
        paddingTop: "calc(80px + 2.5rem)",
        background: "var(--color-page-bg)",
        fontFamily: "var(--font-hero)",
      }}
    >
      {/* Blue box: under How We Work and under contact form; taller on mobile so Our Approach stays inside it */}
      <div
        className="absolute left-1/2 z-0 -translate-x-1/2 w-full max-w-[1920px] bg-[#D7E6EA] min-h-[880px] md:min-h-0 md:h-[760px]"
        style={{
          top: "-90px",
        }}
        aria-hidden
      />

      {/* Content on top of the blue box */}
      <div className="relative z-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-20 px-6 pb-10 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-24 lg:px-12">
          <div className="flex max-w-[565px] flex-col gap-6 lg:flex-1">
            <h2
              className="text-[#333333]"
              style={{
                ...jakartaBold,
                fontSize: "28px",
              }}
            >
              {t("title")}
            </h2>
            <div className="flex flex-col gap-4" style={jakartaMedium}>
              <p className="text-[#555555]">
                <strong style={jakartaBold}>PLANESCO</strong>{" "}
                {t("paragraph1").replace(/^PLANESCO\s+/, "")}
              </p>
              <p className="text-[#555555]">{t("paragraph2")}</p>
              <p className="text-[#555555]">{t("paragraph3")}</p>
              <p className="text-[#555555]">
                {t("paragraph4")
                  .split("PLANESCO")
                  .map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <strong style={jakartaBold}>PLANESCO</strong>
                      )}
                    </span>
                  ))}
              </p>
              <p className="text-[#555555]">{t("paragraph5")}</p>
            </div>
          </div>

          {/* Client perspective – testimonial carousel */}
          <div className="flex max-w-[480px] flex-shrink-0 flex-col gap-6 lg:ml-auto">
            <h3
              className="text-[#333333]"
              style={{ ...jakartaBold, fontSize: "22px" }}
            >
              {t("whatClientsSay")}
            </h3>
            <TestimonialCarousel />
          </div>
        </div>

        <ContactForm transparentBg />
      </div>
    </section>
  );
}
