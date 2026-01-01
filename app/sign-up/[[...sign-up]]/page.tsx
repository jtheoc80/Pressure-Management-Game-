"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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
      </div>
    </div>
  );
}
