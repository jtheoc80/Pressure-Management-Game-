/**
 * Preview/Content-Review Mode
 * 
 * Allows content reviewers to access all scenarios without authentication
 * or progress requirements. This is a temporary feature for reviewing
 * training content.
 * 
 * USAGE:
 * - Set CONTENT_REVIEW_MODE=true in .env.local
 * - Optionally add ?preview=1 to URL (only works in non-production)
 * 
 * SECURITY:
 * - Preview mode is DISABLED in production by default
 * - Even with env var set, VERCEL_ENV=production will block preview mode
 * - XP/progress writes are no-op'd in preview mode
 */

/**
 * Check if we're in a production environment
 * This is the source of truth for production detection
 */
export function isProductionEnvironment(): boolean {
  // Check Vercel environment
  if (process.env.VERCEL_ENV === "production") {
    return true;
  }
  
  // Check NODE_ENV as fallback
  if (process.env.NODE_ENV === "production" && !process.env.CONTENT_REVIEW_MODE) {
    return true;
  }
  
  return false;
}

/**
 * Check if preview mode is enabled via environment variable
 * Server-side only - checks env vars
 */
export function isPreviewModeEnabledServer(): boolean {
  // CRITICAL SAFETY CHECK: Never enable in production on Vercel
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }
  
  // Check for explicit content review mode env var
  const contentReviewMode = process.env.CONTENT_REVIEW_MODE === "true";
  
  // If CONTENT_REVIEW_MODE is set, allow it (except in Vercel production)
  if (contentReviewMode) {
    return true;
  }
  
  // In development/test, allow preview mode
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  
  return false;
}

/**
 * Check if preview mode is enabled from URL query param
 * Works on both client and server
 */
export function isPreviewModeFromUrl(searchParams?: URLSearchParams | null): boolean {
  if (!searchParams) return false;
  
  // Check for preview query param
  return searchParams.get("preview") === "1";
}

/**
 * Combined check for preview mode
 * Use on server components
 */
export function isPreviewModeEnabled(searchParams?: URLSearchParams | null): boolean {
  // Safety check: never in Vercel production
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }
  
  // Check env var first
  if (isPreviewModeEnabledServer()) {
    return true;
  }
  
  // Check URL param (only in non-production)
  if (process.env.NODE_ENV !== "production" && isPreviewModeFromUrl(searchParams)) {
    return true;
  }
  
  return false;
}

/**
 * Assert that preview mode is not accidentally enabled in production
 * Call this in critical paths as a safeguard
 */
export function assertNotProductionPreview(): void {
  if (process.env.VERCEL_ENV === "production" && process.env.CONTENT_REVIEW_MODE === "true") {
    console.error("SECURITY WARNING: Attempted to enable preview mode in production");
    throw new Error("Preview mode cannot be enabled in production");
  }
}

/**
 * Self-test function to verify preview mode safety
 * This runs assertions that preview mode cannot be enabled in production
 * Call this at build time or startup to ensure safety
 */
export function runPreviewModeSafetyTests(): { passed: boolean; message: string } {
  // Test 1: Preview mode should be disabled when VERCEL_ENV is production
  const originalVercelEnv = process.env.VERCEL_ENV;
  
  try {
    // Simulate production environment
    process.env.VERCEL_ENV = "production";
    
    if (isPreviewModeEnabledServer()) {
      return { 
        passed: false, 
        message: "FAIL: Preview mode should be disabled when VERCEL_ENV=production" 
      };
    }
    
    // Test 2: Even with CONTENT_REVIEW_MODE=true, production should block it
    const originalContentReviewMode = process.env.CONTENT_REVIEW_MODE;
    process.env.CONTENT_REVIEW_MODE = "true";
    
    if (isPreviewModeEnabled()) {
      process.env.CONTENT_REVIEW_MODE = originalContentReviewMode;
      return { 
        passed: false, 
        message: "FAIL: Preview mode should be disabled in production even with CONTENT_REVIEW_MODE=true" 
      };
    }
    
    // Restore original values
    process.env.VERCEL_ENV = originalVercelEnv;
    process.env.CONTENT_REVIEW_MODE = originalContentReviewMode;
    
    return { 
      passed: true, 
      message: "PASS: Preview mode safety checks passed" 
    };
  } catch (error) {
    // Restore original values on error
    process.env.VERCEL_ENV = originalVercelEnv;
    return { 
      passed: false, 
      message: `FAIL: Error during safety test: ${error}` 
    };
  }
}

/**
 * Get preview mode status for passing to client components
 * Returns an object that can be safely serialized
 */
export function getPreviewModeStatus(searchParams?: URLSearchParams | null): {
  enabled: boolean;
  reason: "env" | "url" | null;
} {
  // Safety check
  if (process.env.VERCEL_ENV === "production") {
    return { enabled: false, reason: null };
  }
  
  if (isPreviewModeEnabledServer()) {
    return { enabled: true, reason: "env" };
  }
  
  if (process.env.NODE_ENV !== "production" && isPreviewModeFromUrl(searchParams)) {
    return { enabled: true, reason: "url" };
  }
  
  return { enabled: false, reason: null };
}
