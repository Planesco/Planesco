"use client";

import { useRef, useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "Eng",
  fr: "Fr",
  es: "Esp",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer border-0 bg-transparent p-0 text-inherit"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="text-[14px] font-medium leading-[100%] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: 0 }}>
          {localeLabels[currentLocale] ?? currentLocale}
        </span>
        <svg
          width="7"
          height="6"
          viewBox="0 0 7 6"
          fill="none"
          className={`pointer-events-none transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}
          aria-hidden
        >
          <path d="M3.5 6L0 0h7L3.5 6z" fill="#B9E629" />
        </svg>
      </button>
      <div
        role="listbox"
        className={`absolute top-full right-0 mt-1 py-1 bg-[#1C1E1F] border border-[#9095A2] rounded-lg shadow-lg transition-all z-50 min-w-[80px] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {routing.locales.map((locale) => (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            scroll={false}
            onClick={() => setIsOpen(false)}
            className={`block w-full text-left px-4 py-2 text-[12px] font-medium hover:bg-[#B9E629] hover:text-[#1C1E1F] transition-colors ${currentLocale === locale ? "text-[#B9E629]" : "text-white"}`}
            role="option"
            aria-selected={currentLocale === locale}
          >
            {localeLabels[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
