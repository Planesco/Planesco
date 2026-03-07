"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <Image
            src="/logo.png"
            alt="PLANESCO"
            width={260}
            height={44}
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </Link>
        {/* Hamburger menu button - mobile only, right side */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex flex-col justify-center gap-1.5 p-2 text-white md:hidden"
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
      {/* Mobile quick nav overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[57px] z-40 md:hidden bg-[rgba(18,20,21,0.98)] backdrop-blur-sm"
          aria-hidden
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`md:hidden absolute left-0 right-0 top-full z-50 border-b border-[#9095A2] overflow-hidden transition-[max-height] duration-300 ease-out ${
          menuOpen ? "max-h-[80vh]" : "max-h-0"
        }`}
        style={{
          background:
            "linear-gradient(0deg, rgba(18, 20, 21, 0.98), rgba(18, 20, 21, 0.98))",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fontSize: "14px",
        }}
      >
        <nav className="flex flex-col py-6 px-6 gap-1">
          <Link
            href="#services"
            className="py-3 text-white hover:text-[var(--color-lime)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t("services")}
          </Link>
          <Link
            href="#how-we-work"
            className="py-3 text-white hover:text-[var(--color-lime)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t("howWeWork")}
          </Link>
          <Link
            href="#our-approach"
            className="py-3 text-white hover:text-[var(--color-lime)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t("ourApproach")}
          </Link>
          <Link
            href="#contact"
            className="mt-2 flex items-center justify-center rounded-[38px] bg-[#B9E629] px-5 py-3.5 font-medium text-[#1C1E1F] capitalize hover:opacity-90 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            {t("contactUs")}
          </Link>
          <div className="mt-4 pt-4 border-t border-[#9095A2]">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
