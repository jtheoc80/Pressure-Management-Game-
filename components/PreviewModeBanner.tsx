"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";

interface PreviewModeBannerProps {
  isEnabled: boolean;
}

/**
 * Banner shown when preview/content-review mode is active
 * Warns users that progress won't be saved
 */
export function PreviewModeBanner({ isEnabled }: PreviewModeBannerProps) {
  if (!isEnabled) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Alert className="rounded-none border-x-0 border-t-0 bg-amber-400 border-amber-500">
        <AlertDescription className="flex items-center justify-center gap-2 text-amber-900 font-medium">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            Preview Mode: Progress, XP, and badges will NOT be saved
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
}

/**
 * Compact banner for pages with less space
 * Fixed to top of viewport
 */
export function PreviewModeBannerCompact({ isEnabled }: PreviewModeBannerProps) {
  if (!isEnabled) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-400 text-amber-900 px-3 py-1.5 text-center text-sm font-medium shadow-sm">
      <span className="mr-2">⚠️</span>
      Preview Mode: Progress/XP not saved
    </div>
  );
}
