"use client";

import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { routing } from "@/i18n/routing";

const mobileLocaleLabels: Record<string, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-[#9095A2] text-white"
        style={{
          background:
            "linear-gradient(0deg, rgba(18, 20, 21, 0.95), rgba(18, 20, 21, 0.95)), linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(60, 60, 60, 0) 159.88%)",
          backdropFilter: "blur(17px)",
        }}
      >
        <div className="flex w-full items-center justify-between py-4 pl-3 pr-6 md:pl-5 md:pr-10 lg:pt-9 lg:pb-4">
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
            <div className="relative h-10 w-[7.5rem] md:h-12 md:w-[9rem] shrink-0">
              <Image
                src="/logo.png"
                alt="PLANESCO"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 120px, 144px"
                priority
              />
            </div>
          </Link>
          {/* Hamburger - mobile only */}
          <button
            ref={menuToggleRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col justify-center gap-1.5 p-2 text-[#B9E629] md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="block h-0.5 w-6 bg-current rounded" aria-hidden />
            <span className="block h-0.5 w-6 bg-current rounded" aria-hidden />
            <span className="block h-0.5 w-6 bg-current rounded" aria-hidden />
          </button>
          <nav
            className="header-nav hidden items-center md:flex"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: 0,
            }}
          >
            <div className="flex items-center gap-12">
              <Link
                href="#services"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
              >
                {t("services")}
              </Link>
              <Link
                href="#how-we-work"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
              >
                {t("howWeWork")}
              </Link>
              <Link
                href="#our-approach"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
              >
                {t("ourApproach")}
              </Link>
            </div>
            <Link
              href="#contact"
              className="ml-16 flex items-center justify-center rounded-[38px] bg-[#B9E629] px-5 py-3.5 font-medium text-[#1C1E1F] capitalize hover:opacity-90 transition-opacity"
            >
              {t("contactUs")}
            </Link>
            <div className="ml-8">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[100] md:hidden flex flex-col bg-[#1a1a1a] transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
        id="mobile-menu-overlay"
      >
        {/* Close button - top right, neon green X */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute top-6 right-6 p-2 text-[#B9E629] hover:opacity-90 transition-opacity"
          onClick={() => {
            menuToggleRef.current?.focus();
            setMenuOpen(false);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Centered content */}
        <div
          className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {/* Logo */}
          <div className="relative mx-auto mb-12 h-12 w-[min(9rem,100%)] shrink-0">
            <Image
              src="/logo.png"
              alt="PLANESCO"
              fill
              className="object-contain"
              sizes="144px"
            />
          </div>

          {/* Nav links - stacked, generous spacing, white, medium-large */}
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="#services"
              className="text-white text-[18px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("services")}
            </Link>
            <Link
              href="#how-we-work"
              className="text-white text-[18px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("howWeWork")}
            </Link>
            <Link
              href="#our-approach"
              className="text-white text-[18px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("ourApproach")}
            </Link>
          </nav>

          {/* CTA - pill shape, neon green bg, white text */}
          <Link
            href="#contact"
            className="mt-10 flex w-full max-w-[280px] items-center justify-center rounded-[999px] bg-[#B9E629] px-6 py-4 text-base font-medium text-white capitalize hover:opacity-90 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            {t("contactUs")}
          </Link>

          {/* Language options - bottom, horizontal, smaller */}
          <div className="mt-auto flex items-center justify-center gap-8 pt-10">
            {routing.locales.map((locale) => (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                scroll={false}
                onClick={() => setMenuOpen(false)}
                className={`text-[14px] font-medium transition-colors ${
                  currentLocale === locale ? "text-[#B9E629]" : "text-white hover:text-[#B9E629]"
                }`}
              >
                {mobileLocaleLabels[locale]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
