import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminPaths = ["/admin", "/admin/"];
  if (adminPaths.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const protectedPaths = ["/dashboard", "/tasks", "/rewards", "/transactions", "/payments", "/profile", "/settings", "/support"];
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/rewards/:path*",
    "/transactions/:path*",
    "/payments/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/support/:path*",
    "/admin/:path*"
  ]
};
