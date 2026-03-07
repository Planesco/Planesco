import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsCard from "@/components/MetricsCard";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import OurApproach from "@/components/OurApproach";
import Footer from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MetricsCard />
        <Services />
        <HowWeWork />
        <OurApproach />
        <Footer />
      </main>
    </>
  );
}
