"use client";

/**
 * Outcomes - Learning outcomes section
 * "By the end, you can..." with icon bullets
 */

interface Outcome {
  icon: React.ReactNode;
  text: string;
}

const outcomes: Outcome[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    text: "Read and complete PSV datasheets accurately",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    text: "Analyze backpressure and select the right valve type",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    text: "Size orifices using API 526 letter designations",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: "Identify relieving cases and discharge destinations",
  },
];

export function Outcomes() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-3">
            By the end, you can...
          </h2>
          <p className="text-[#6B7280]">
            Practical skills you&apos;ll develop through hands-on training
          </p>
        </div>

        {/* Outcomes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon container */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                {outcome.icon}
              </div>
              
              {/* Text */}
              <p className="text-[#374151] leading-relaxed pt-1">
                {outcome.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#6B7280] mb-4">
            All training is based on API 520/521 standards
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm text-[#6B7280]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            For training purposes only — always consult engineering standards for real-world applications
          </div>
        </div>
      </div>
    </section>
  );
}
