import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

// Check if Clerk is configured (server-side check)
const isClerkConfigured = () => {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(
    secretKey &&
    secretKey.length > 10 &&
    publishableKey &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length > 20
  );
};

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/psv-quest(.*)",
  "/api/progress(.*)",
  "/admin(.*)",
]);

// Routes that are always public
const isPublicRoute = createRouteMatcher([
  "/",
  "/learn(.*)",
  "/glossary(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/psv/grade",
]);

// Create the Clerk middleware with route protection
const authMiddleware = clerkMiddleware(async (auth, request) => {
  // Check if route requires auth
  if (isProtectedRoute(request) && !isPublicRoute(request)) {
    await auth.protect();
  }
});

// Middleware that handles both configured and unconfigured Clerk states
export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // If Clerk is not configured, allow all requests through
  if (!isClerkConfigured()) {
    return NextResponse.next();
  }

  // Use Clerk middleware when configured
  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
