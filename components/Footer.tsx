import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer
      className="py-12 px-6 md:py-16"
      style={{
        background: "#1A1818",
        fontFamily: "Inter",
      }}
    >
      <div className="mx-auto max-w-[749px] text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo-grey.png"
            alt="PLANESCO"
            width={282}
            height={48}
            className="mx-auto h-12 w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <p
          className="mt-10 text-[12px] font-normal leading-[15px]"
          style={{ color: "#99A39D" }}
        >
          {t("tagline")}
          <br />
          {t("line2")}
          <br />
          {t("contact")}{" "}
          <a
            href="mailto:info@planesco.com"
            className="text-[#99A39D] hover:underline"
          >
            info@planesco.com
          </a>
          <br />
          <br />
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
