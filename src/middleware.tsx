import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("user_id")?.value

  if (
    !userId &&
    !request.nextUrl.pathname.startsWith("/login") &&
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
