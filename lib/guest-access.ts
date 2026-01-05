/**
 * Guest Access Mode Configuration
 * 
 * When enabled, users can access PSV Quest training content
 * without signing in. Useful for content review and demos.
 * 
 * Enable via:
 * - Environment variable: NEXT_PUBLIC_GUEST_ACCESS=true
 * - Or set GUEST_ACCESS_ENABLED constant below to true
 */

// Direct toggle for guest access - set to true to enable without env var
const GUEST_ACCESS_ENABLED = true;

/**
 * Check if guest access mode is enabled
 * Allows unauthenticated users to access training content
 */
export function isGuestAccessEnabled(): boolean {
  // Check environment variable first
  if (process.env.NEXT_PUBLIC_GUEST_ACCESS === "true") {
    return true;
  }
  
  // Fall back to direct constant toggle
  return GUEST_ACCESS_ENABLED;
}

/**
 * Server-side check for guest access
 * Used in middleware and API routes
 */
export function isGuestAccessEnabledServer(): boolean {
  // Check server-side env var
  if (process.env.GUEST_ACCESS === "true" || process.env.NEXT_PUBLIC_GUEST_ACCESS === "true") {
    return true;
  }
  
  // Fall back to direct constant toggle
  return GUEST_ACCESS_ENABLED;
}
