import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer
      className="pt-8 pb-20 px-6 md:pt-12 md:pb-28"
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
        <div
          className="mt-12 flex flex-col gap-5 text-[12px] font-normal leading-[18px]"
          style={{ color: "#99A39D" }}
        >
          <span>{t("tagline")}</span>
          <span>{t("line2")}</span>
          <span>
            {t("contact")}{" "}
            <a
              href="mailto:info@planesco.com"
              className="text-[#B9E629] hover:underline"
            >
              info@planesco.com
            </a>
          </span>
        </div>
        <p
          className="mt-28 text-[12px] font-normal leading-[18px]"
          style={{ color: "#99A39D" }}
        >
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
