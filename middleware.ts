import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [
  "/annuaire",
  "/inscription",
  "/actualites",
  "/professions",
  "/contact",
  "/a-propos",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if maintenance mode is enabled
  const maintenanceMode = request.cookies.get("maintenanceMode")?.value;

  if (maintenanceMode === "on") {
    // Allow access to admin and API
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname === "/connexion" ||
      pathname === "/maintenance"
    ) {
      return NextResponse.next();
    }
    // Redirect to maintenance page
    if (!pathname.startsWith("/maintenance") && pathname !== "/") {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public/).*)",
  ],
};
