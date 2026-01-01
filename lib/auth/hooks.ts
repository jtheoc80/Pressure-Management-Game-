"use client";

import { useUser as useClerkUser, useAuth as useClerkAuth } from "@clerk/nextjs";

// Check if Clerk is configured
export const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return key && key.startsWith("pk_") && key.length > 20;
};

// Safe wrapper for useUser that returns defaults when Clerk isn't configured
export function useSafeUser() {
  // If Clerk isn't configured, return default values
  if (!isClerkConfigured()) {
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
    };
  }

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn, isLoaded, user } = useClerkUser();
    return { isSignedIn, isLoaded, user };
  } catch {
    // Fallback if hook fails
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
    };
  }
}

// Safe wrapper for useAuth
export function useSafeAuth() {
  if (!isClerkConfigured()) {
    return {
      isSignedIn: false,
      isLoaded: true,
      userId: null,
      sessionId: null,
      getToken: async () => null,
    };
  }

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useClerkAuth();
  } catch {
    return {
      isSignedIn: false,
      isLoaded: true,
      userId: null,
      sessionId: null,
      getToken: async () => null,
    };
  }
}
