"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { isClerkConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const clerkConfigured = isClerkConfigured();

  return (
    <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--puffer-navy)]">
            Join Puffer Training Academy
          </h1>
          <p className="text-sm text-[var(--puffer-gray)] mt-2">
            Create an account to start your PSV training journey
          </p>
        </div>
        {clerkConfigured ? (
          <SignUp
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
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl="/learn"
          />
        ) : (
          <div className="rounded-lg border border-[var(--puffer-border)] bg-white p-6 shadow-lg">
            <p className="text-sm text-[var(--puffer-gray)]">
              Sign-up isn&apos;t available because authentication isn&apos;t configured. Set{" "}
              <code className="font-mono text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
              (and <code className="font-mono text-xs">CLERK_SECRET_KEY</code>) in your environment.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/">
                <Button variant="outline">Back to home</Button>
              </Link>
              <Link href="/learn">
                <Button>Continue without account</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
