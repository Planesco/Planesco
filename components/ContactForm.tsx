"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const formCardStyle = {
  background:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #F6FAF9",
  boxShadow:
    "0px 160px 64px rgba(145, 158, 161, 0.01), 0px 90px 54px rgba(145, 158, 161, 0.05), 0px 40px 40px rgba(145, 158, 161, 0.09), 0px 10px 22px rgba(145, 158, 161, 0.1)",
  backdropFilter: "blur(45px)",
};

const inputStyle =
  "box-border w-full rounded-lg border px-[14px] py-[13px] text-[16px] leading-5 font-normal font-[family-name:var(--font-hero)] placeholder:text-[#759993] focus:outline-none focus:ring-1 focus:ring-[rgba(117,153,147,0.5)] focus:border-[rgba(117,153,147,0.5)]";

type ContactFormProps = { transparentBg?: boolean };

export default function ContactForm({ transparentBg }: ContactFormProps = {}) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage(t("errorRequired"));
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: (formData.get("phone") as string)?.trim() || "",
          subject: (formData.get("subject") as string)?.trim() || "",
          message,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: { error?: string; code?: string } = {};
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text) as { error?: string; code?: string };
        } catch {
          data = { error: t("errorGeneric") };
        }
      }

      if (!res.ok) {
        setStatus("error");
        const msg = data.error || t("errorGeneric");
        if (data.code === "INVALID_EMAIL") {
          setErrorMessage(t("errorInvalidEmail"));
        } else if (data.code === "VALIDATION_ERROR" || res.status === 400) {
          setErrorMessage(msg);
        } else if (res.status >= 500) {
          setErrorMessage(t("errorServer"));
        } else {
          setErrorMessage(msg);
        }
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      clearTimeout(timeoutId);
      setStatus("error");
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setErrorMessage(t("errorTimeout"));
          return;
        }
      }
      setErrorMessage(t("errorNetwork"));
    }
  }

  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{
        background: transparentBg ? "transparent" : "var(--color-page-bg)",
        fontFamily: "var(--font-hero)",
      }}
    >
      <div
        className="mx-auto flex max-w-[887px] flex-row flex-wrap items-center justify-between gap-10 lg:flex-nowrap"
        style={{ gap: "40px" }}
      >
        {/* Frame 65 – Contact form card */}
        <div
          className="flex w-full flex-none flex-col rounded-[18px] px-6 py-[30px] lg:w-[483px]"
          style={formCardStyle}
        >
          <div className="flex flex-col gap-4 self-stretch">
            <h2
              className="text-[18px] leading-[23px] font-normal text-[#1D1D23]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {t("headline")}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 self-stretch"
            >
              <div className="flex flex-col gap-3 self-stretch">
                <div className="flex flex-row gap-2.5 self-stretch">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    required
                    className={`${inputStyle} flex-1 bg-[rgba(237,244,243,0.7)] border-[rgba(117,153,147,0.5)]`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("email")}
                    required
                    className={`${inputStyle} flex-1 bg-[rgba(237,244,243,0.7)] border-[rgba(117,153,147,0.5)]`}
                  />
                </div>
                <div className="flex flex-row gap-2.5 self-stretch">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className={`${inputStyle} flex-1 bg-[rgba(237,244,243,0.7)] border-[rgba(117,153,147,0.5)]`}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("subject")}
                    className={`${inputStyle} flex-1 bg-[rgba(237,244,243,0.7)] border-[rgba(117,153,147,0.5)]`}
                  />
                </div>
                <div className="self-stretch">
                  <textarea
                    name="message"
                    placeholder={t("message")}
                    required
                    rows={5}
                    className={`${inputStyle} min-h-[149px] resize-y bg-[rgba(237,244,243,0.7)] border border-[rgba(117,153,147,0.5)] pt-[18px]`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 self-stretch">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex h-[47px] w-full flex-row items-center justify-center rounded-lg bg-[#B9E629] px-8 py-[15px] text-center text-[14px] font-bold leading-[17px] tracking-[-0.02em] text-[#1D1D23] capitalize transition-opacity disabled:opacity-70"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {status === "loading"
                    ? "Sending…"
                    : "Contact us"}
                </button>
                <p
                  className="text-[12px] leading-[15px] font-normal"
                  style={{ color: "rgba(117, 153, 147, 0.9)" }}
                >
                  {t("disclaimer")}
                </p>
                {status === "success" && (
                  <p className="text-sm font-medium text-[var(--color-lime)]">
                    {t("success")}
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="text-sm font-medium text-red-600">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>

            <div className="flex flex-col gap-2 pt-2">
              <p
                className="text-[14px] leading-[18px] font-normal text-[#1D1D23]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {t("orEmail")}
              </p>
              <a
                href="mailto:info@planesco.com"
                className="flex flex-row items-center justify-center gap-2.5 rounded-lg border border-[#7C989F] px-4 py-[13px] pr-8 text-center text-[16px] leading-5 font-normal text-[#7C989F] transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  className="shrink-0 text-[#7C989F]"
                  aria-hidden
                >
                  <path
                    d="M1 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="#F6FAF9"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 6l7.5 5 7.5-5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>info@planesco.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Frame 69 – Headline + tagline */}
        <div className="mx-auto flex flex-shrink-0 flex-col items-start gap-6 lg:mx-0 lg:w-[336px]">
          <h2
            className="flex flex-col gap-1.5 text-[32px] font-semibold leading-[100%] tracking-[-0.02em] text-[#1D1D23] md:text-[52px]"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            <span>{t("sectionTitle1")}</span>
            <span className="inline-block bg-[#1D1D23] px-1 py-0.5 text-[#B9E629]">{t("sectionTitle2")}</span>
            <span className="inline-block bg-[#1D1D23] px-1 py-0.5 text-[#B9E629]">{t("sectionTitle3")}</span>
            <span className="inline-block bg-[#1D1D23] px-1 py-0.5 text-[#B9E629]">{t("sectionTitle4")}</span>
          </h2>
          <p
            className="max-w-[325px] text-[16px] font-normal leading-5 text-[#596A73]"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {t("sectionDesc")}
          </p>
        </div>
      </div>
    </section>
  );
}
