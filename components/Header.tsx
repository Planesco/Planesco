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

  const HEADER_OFFSET_PX = 100;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  };

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
          <Link href="/" className="ml-6 md:ml-10 flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
            <div className="relative h-[4rem] w-[12.5rem] md:h-[4.5rem] md:w-[15rem] shrink-0">
              <Image
                src="/logo.png"
                alt="PLANESCO"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 200px, 240px"
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
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: 0,
            }}
          >
            <div className="flex items-center gap-2">
              <Link
                href="#services"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
                onClick={(e) => handleAnchorClick(e, "#services")}
              >
                {t("services")}
              </Link>
              <Link
                href="#how-we-work"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
                onClick={(e) => handleAnchorClick(e, "#how-we-work")}
              >
                {t("howWeWork")}
              </Link>
              <Link
                href="#our-approach"
                className="text-white hover:text-[var(--color-lime)] transition-colors"
                onClick={(e) => handleAnchorClick(e, "#our-approach")}
              >
                {t("ourApproach")}
              </Link>
            </div>
            <Link
              href="#contact"
              className="ml-16 flex items-center justify-center rounded-[38px] bg-[#B9E629] px-6 py-4 text-lg font-medium text-[#1C1E1F] capitalize hover:opacity-90 transition-opacity"
              onClick={(e) => handleAnchorClick(e, "#contact")}
            >
              {t("contactUs")}
            </Link>
            <div className="ml-8">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop - shows left side of site, tap to close */}
      <div
        className={`fixed inset-0 z-[90] md:hidden bg-black/50 transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu panel - slides in from right, leaves left side of site visible */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-[100] md:hidden flex flex-col bg-[#1a1a1a] w-[min(85%,340px)] transition-transform duration-200 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
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

        {/* Content - right aligned, top */}
        <div
          className="flex flex-1 flex-col items-end justify-start pl-10 pr-6 pt-20 pb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {/* Logo */}
          <div className="relative mb-12 h-16 w-[11rem] shrink-0">
            <Image
              src="/logo.png"
              alt="PLANESCO"
              fill
              className="object-contain object-right"
              sizes="176px"
            />
          </div>

          {/* Nav links - right aligned, larger text */}
          <nav className="flex flex-col items-end gap-8">
            <Link
              href="#services"
              className="text-white text-[28px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={(e) => handleAnchorClick(e, "#services")}
            >
              {t("services")}
            </Link>
            <Link
              href="#how-we-work"
              className="text-white text-[28px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={(e) => handleAnchorClick(e, "#how-we-work")}
            >
              {t("howWeWork")}
            </Link>
            <Link
              href="#our-approach"
              className="text-white text-[28px] font-medium hover:text-[#B9E629] transition-colors"
              onClick={(e) => handleAnchorClick(e, "#our-approach")}
            >
              {t("ourApproach")}
            </Link>
          </nav>

          {/* CTA - right aligned, larger text */}
          <Link
            href="#contact"
            className="mt-10 flex w-full max-w-[320px] items-center justify-center rounded-[999px] bg-[#B9E629] px-5 py-3 text-[16px] font-bold text-black capitalize hover:opacity-90 transition-opacity"
            onClick={(e) => handleAnchorClick(e, "#contact")}
          >
            {t("contactUs")}
          </Link>

          {/* Language options - right aligned, larger text */}
          <div className="mt-16 flex w-full items-center justify-center gap-8">
            {routing.locales.map((locale) => (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                scroll={false}
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] font-medium transition-colors ${
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
