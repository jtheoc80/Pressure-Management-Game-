"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { isClerkConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const clerkConfigured = isClerkConfigured();

  return (
    <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--puffer-navy)]">
            Welcome to PSV Sizing Quest
          </h1>
          <p className="text-sm text-[var(--puffer-gray)] mt-2">
            Sign in to access training scenarios and track your progress
          </p>
        </div>
        {clerkConfigured ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg border border-[var(--puffer-border)]",
                headerTitle: "text-[var(--puffer-navy)]",
                headerSubtitle: "text-[var(--puffer-gray)]",
                formButtonPrimary:
                  "bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)]",
                footerActionLink: "text-[var(--puffer-accent)]",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/psv-quest"
          />
        ) : (
          <div className="rounded-lg border border-[var(--puffer-border)] bg-white p-6 shadow-lg">
            <p className="text-sm text-[var(--puffer-gray)]">
              Authentication isn&apos;t configured. Set{" "}
              <code className="font-mono text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
              (and <code className="font-mono text-xs">CLERK_SECRET_KEY</code>) in your environment.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/">
                <Button variant="outline">Back to home</Button>
              </Link>
              <Link href="/learn">
                <Button>Continue without sign-in</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
