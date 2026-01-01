import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent, NextMiddleware } from "next/server";

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

// Lazily initialized Clerk middleware
let clerkAuthMiddleware: NextMiddleware | null = null;

async function getClerkMiddleware(): Promise<NextMiddleware> {
  if (!clerkAuthMiddleware) {
    const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");
    
    const isProtected = createRouteMatcher([
      "/psv-quest(.*)",
      "/api/progress(.*)",
      "/admin(.*)",
    ]);
    
    const isPublic = createRouteMatcher([
      "/",
      "/learn(.*)",
      "/glossary(.*)",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api/psv/grade",
    ]);
    
    clerkAuthMiddleware = clerkMiddleware(async (auth, request) => {
      if (isProtected(request) && !isPublic(request)) {
        await auth.protect();
      }
    });
  }
  return clerkAuthMiddleware;
}

// Middleware that handles both configured and unconfigured Clerk states
export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  // If Clerk is not configured, allow all requests through
  if (!isClerkConfigured()) {
    return NextResponse.next();
  }

  // Use Clerk middleware when configured (lazy load)
  const authMiddleware = await getClerkMiddleware();
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
