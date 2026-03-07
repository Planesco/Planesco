import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

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

const testimonialTextStyle = {
  fontFamily: "Plus Jakarta Sans",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "130%",
  letterSpacing: 0,
  color: "#333333",
};

export default async function OurApproach() {
  const t = await getTranslations("ourApproach");
  const testimonialShadow =
    "0px 160px 64px rgba(145, 158, 161, 0.01), 0px 90px 54px rgba(145, 158, 161, 0.05), 0px 40px 40px rgba(145, 158, 161, 0.09), 0px 10px 22px rgba(145, 158, 161, 0.1)";

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
        className="absolute left-1/2 z-0 -translate-x-1/2 w-full max-w-[1920px] bg-[#D7E6EA] min-h-[1000px] md:min-h-0 md:h-[820px]"
        style={{
          top: "-90px",
        }}
        aria-hidden
      />

      {/* Content on top of the blue box */}
      <div className="relative z-10">
        {/* Two columns: Our approach left, Client Perspective right, equal side spacing */}
        <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-6 pb-16 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-12">
          {/* Left: Our approach heading + 5 paragraphs */}
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

          {/* Right: Client Perspective card */}
          <div className="flex max-w-[400px] flex-shrink-0 flex-col gap-6 lg:ml-auto">
            <h3
              className="text-[#333333]"
              style={{ ...jakartaBold, fontSize: "22px" }}
            >
              {t("whatClientsSay")}
            </h3>
            <div
              className="relative flex flex-col rounded-[24px] bg-[#fcfcfc] px-6 pt-[31px] pb-9"
              style={{ boxShadow: testimonialShadow }}
            >
              <blockquote className="flex flex-col gap-4" style={testimonialTextStyle}>
                {t("testimonial")
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i} className="text-[#555555]">
                      {paragraph.trim()}
                    </p>
                  ))}
              </blockquote>
              <div
                className="mt-8 border-t border-[rgba(104,108,105,0.2)] pt-[18px]"
                aria-hidden
              />
              <div className="flex items-center gap-5">
                <Image
                  src="/michael-turner.png"
                  alt=""
                  width={58}
                  height={58}
                  className="h-[58px] w-[58px] shrink-0 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span
                    className="text-[#2D302F]"
                    style={{ ...jakartaBold, fontSize: "17px" }}
                  >
                    {t("testimonialAuthor")}
                  </span>
                  <span
                    className="text-[rgba(39,45,41,0.7)]"
                    style={{ ...jakartaMedium, fontSize: "16px" }}
                  >
                    {t("testimonialRole")}
                  </span>
                </div>
              </div>
              <div
                className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5"
                aria-hidden
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[rgba(144,164,140,0.6)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#90A48C]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[rgba(144,164,140,0.6)]" />
              </div>
            </div>
          </div>
        </div>

        <ContactForm transparentBg />
      </div>
    </section>
  );
}
