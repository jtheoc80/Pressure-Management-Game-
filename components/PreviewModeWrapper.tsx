"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, Suspense, type ReactNode } from "react";

// Context to provide preview mode state
const PreviewModeContext = createContext<boolean>(false);

/**
 * Hook to check if preview mode is enabled
 * Must be used within PreviewModeProvider
 */
export function usePreviewMode(): boolean {
  return useContext(PreviewModeContext);
}

/**
 * Inner component that reads search params
 * This needs to be wrapped in Suspense
 */
function PreviewModeInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  
  // Check URL param for preview mode
  const previewParam = searchParams.get("preview") === "1";
  
  // Check for server-injected preview mode via cookie
  let previewCookie = false;
  if (typeof window !== "undefined") {
    previewCookie = document.cookie.includes("preview_mode=true");
    
    // In production on Vercel, preview mode is always disabled
    const isVercelProd = window.location.hostname.includes("vercel.app") || 
                        window.location.hostname.includes(".com");
    
    if (isVercelProd) {
      return (
        <PreviewModeContext.Provider value={false}>
          {children}
        </PreviewModeContext.Provider>
      );
    }
  }
  
  const isPreviewMode = previewParam || previewCookie;
  
  return (
    <PreviewModeContext.Provider value={isPreviewMode}>
      {children}
    </PreviewModeContext.Provider>
  );
}

/**
 * Provider component that enables preview mode detection
 * Wraps content in Suspense to handle useSearchParams SSR requirements
 */
export function PreviewModeProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PreviewModeContext.Provider value={false}>{children}</PreviewModeContext.Provider>}>
      <PreviewModeInner>{children}</PreviewModeInner>
    </Suspense>
  );
}
