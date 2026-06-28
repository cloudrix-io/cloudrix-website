import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import {
  experiments,
  AB_COOKIE_NAME,
  parseAssignments,
  serializeAssignments,
  getVariantAssignment,
} from "@/lib/ab-testing";

const AUTH_COOKIE_NAME = "cloudrix_admin_token";

async function verifyAdminToken(token: string): Promise<boolean> {
  if (!process.env.JWT_SECRET) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin route protection ---
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  // --- A/B Testing (skip for admin, API, static files) ---
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Get existing assignments from cookie
  const existingCookie = request.cookies.get(AB_COOKIE_NAME)?.value;
  const existingAssignments = parseAssignments(existingCookie);

  let hasNewAssignments = false;
  const updatedAssignments = { ...existingAssignments };

  // Assign variants for all active experiments
  for (const experiment of experiments) {
    if (!experiment.isActive) continue;

    const { variant, isNew } = getVariantAssignment(experiment.id, existingAssignments);

    if (isNew) {
      updatedAssignments[experiment.id] = variant;
      hasNewAssignments = true;
    }
  }

  // Set cookie if there are new assignments
  if (hasNewAssignments) {
    response.cookies.set({
      name: AB_COOKIE_NAME,
      value: serializeAssignments(updatedAssignments),
      httpOnly: false, // Allow client-side access for tracking
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$).*)",
  ],
};
