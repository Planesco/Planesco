import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const url = new URL("/favicon.png", request.url);
  return NextResponse.redirect(url, 308);
}
