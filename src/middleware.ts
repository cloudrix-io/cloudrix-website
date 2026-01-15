import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  experiments,
  AB_COOKIE_NAME,
  parseAssignments,
  serializeAssignments,
  getVariantAssignment,
} from "@/lib/ab-testing";

export function middleware(request: NextRequest) {
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

// Only run middleware on pages (not API routes, static files, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|admin).*)",
  ],
};
