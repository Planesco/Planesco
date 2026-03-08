import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SetLocaleLang from "@/components/SetLocaleLang";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://planesco.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
      ),
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "fr" ? "fr_FR" : "es_ES",
      url: canonicalUrl,
      siteName: "PLANESCO",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function getJsonLd(locale: string) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "PLANESCO",
    url: baseUrl,
    email: "info@planesco.com",
    description: "Industrial construction consulting: project management, project planning, and project controls for predictable delivery.",
    sameAs: [],
  };
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PLANESCO – Industrial Construction Consulting",
    url: baseUrl,
    description: "Project management and project planning for industrial construction. Control, predictability, and compliance across all phases of your construction project.",
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: locale === "en" ? "en" : locale === "fr" ? "fr" : "es",
    potentialAction: {
      "@type": "ContactAction",
      target: { "@type": "EntryPoint", url: `${baseUrl}/#contact` },
      contactPoint: { "@type": "ContactPoint", email: "info@planesco.com" },
    },
  };
  return [organization, webSite];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = getJsonLd(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <SetLocaleLang locale={locale} />
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {children}
    </NextIntlClientProvider>
  );
}
