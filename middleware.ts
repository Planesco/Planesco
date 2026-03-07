import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr", "es"];
const DEFAULT_LOCALE = "en";

function getLocaleFromPathname(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  return segment && LOCALES.includes(segment) ? segment : null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);

  if (locale) {
    return NextResponse.next();
  }

  const newPath =
    pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
