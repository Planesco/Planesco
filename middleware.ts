import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
});

export default async function middleware(request: NextRequest) {
  const fallback = () =>
    NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  try {
    const response = intlMiddleware(request);
    if (response instanceof Promise) {
      return response.catch((error) => {
        console.error("[middleware]", error);
        return fallback();
      });
    }
    return response;
  } catch (error) {
    console.error("[middleware]", error);
    return fallback();
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
