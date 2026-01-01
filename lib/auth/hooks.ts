"use client";

// Clerk disabled for development - returns mock values

// Mock user type to match Clerk's user object
interface MockUser {
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
  id: string;
}

// Check if Clerk is configured (always false for now)
export const isClerkConfigured = () => false;

// Mock user hook - always returns not signed in
export function useSafeUser(): {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: MockUser | null;
} {
  return {
    isSignedIn: false,
    isLoaded: true,
    user: null,
  };
}

// Mock auth hook
export function useSafeAuth() {
  return {
    isSignedIn: false,
    isLoaded: true,
    userId: null,
    sessionId: null,
    getToken: async () => null,
  };
}
