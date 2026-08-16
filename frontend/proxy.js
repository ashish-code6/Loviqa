import { NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/onboarding", "/profile"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const requiresSession = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (requiresSession && !request.cookies.get("loviqa_token")?.value) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("auth", "login");
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/profile/:path*"],
};
