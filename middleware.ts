import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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

export default clerkMiddleware(async (auth, req) => {
  // Check if route requires auth
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
