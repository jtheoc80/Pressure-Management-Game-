"use client";

/**
 * Client-side preview mode utilities
 * 
 * These work in the browser and check URL params for preview mode.
 * The actual preview mode state should be passed from server components
 * for security, but these helpers can be used for UI logic.
 */

/**
 * Check if preview mode is indicated in the URL
 * This should NOT be used for access control - use server-side checks
 */
export function isPreviewModeFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  
  const params = new URLSearchParams(window.location.search);
  return params.get("preview") === "1";
}

/**
 * Add preview param to a URL if preview mode is active
 */
export function withPreviewParam(url: string, isPreviewMode: boolean): string {
  if (!isPreviewMode) return url;
  
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}preview=1`;
}
