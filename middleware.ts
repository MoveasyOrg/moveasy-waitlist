import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/* — but never gate /admin/login itself.
  const isAdmin = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  if (!isAdmin || isLoginPage) return NextResponse.next();

  const ok = await verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
