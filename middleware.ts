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

/**
 * Check if preview/content-review mode is enabled
 * SECURITY: Never enabled in Vercel production
 */
const isPreviewModeEnabled = (req: NextRequest) => {
  // CRITICAL: Never enable in production on Vercel
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }
  
  // Check for CONTENT_REVIEW_MODE env var
  if (process.env.CONTENT_REVIEW_MODE === "true") {
    return true;
  }
  
  // Check for preview query param (only in non-production)
  if (process.env.NODE_ENV !== "production") {
    const url = new URL(req.url);
    if (url.searchParams.get("preview") === "1") {
      return true;
    }
  }
  
  return false;
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
  // If preview mode is enabled, allow all requests through
  // and set a cookie so client can detect preview mode
  if (isPreviewModeEnabled(req)) {
    const response = NextResponse.next();
    response.cookies.set("preview_mode", "true", {
      httpOnly: false, // Allow JS access for client-side detection
      sameSite: "lax",
      path: "/",
      maxAge: 3600, // 1 hour
    });
    return response;
  }
  
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
