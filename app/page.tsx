import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1F3B] to-[#12345A]">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-4 pt-12 pb-16 text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Puffer Training Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          PSV Sizing Quest
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Master pressure safety valve selection through realistic training scenarios.
          Learn the fundamentals, then apply your knowledge.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/learn">
            <Button size="lg" className="bg-white text-[#0B1F3B] hover:bg-white/90 min-w-[180px]">
              Start Learning
            </Button>
          </Link>
          <Link href="/psv-quest">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 min-w-[180px]">
              Play Scenarios
            </Button>
          </Link>
        </div>
      </header>

      {/* Feature Cards */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Training Academy Card */}
          <Link href="/learn">
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Training Academy</h3>
                <p className="text-white/60 text-sm mb-4">
                  18 lessons covering PSV fundamentals and tank protection. Complete required lessons to unlock gameplay.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> PSV terminology & concepts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Backpressure & valve selection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Tank & flame protection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Scenarios Card */}
          <Link href="/psv-quest">
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">PSV Sizing Quest</h3>
                <p className="text-white/60 text-sm mb-4">
                  Apply your knowledge in realistic scenarios. Fill datasheets, select valve types, and choose orifice sizes.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Steam, gas, and liquid services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Real-world constraints
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Detailed feedback & scoring
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Glossary Card */}
          <Link href="/glossary">
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Industry Glossary</h3>
                <p className="text-white/60 text-sm mb-4">
                  60+ terms with definitions, examples, and common mistakes. Quick reference for all your training needs.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Pressure & temperature terms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Valve types & sizing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Tank & overfill protection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* How It Works */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Sign Up", desc: "Create your account to track progress" },
              { step: 2, title: "Learn", desc: "Complete required PSV lessons" },
              { step: 3, title: "Practice", desc: "Unlock and play training scenarios" },
              { step: 4, title: "Master", desc: "Earn badges and improve your rank" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-white/5 border-white/10 inline-block">
            <CardContent className="px-8 py-6">
              <p className="text-white/70 mb-4">Ready to start your training journey?</p>
              <Link href="/sign-up">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-white/40">
          <div>Puffer Training Platform • PSV Sizing Quest v1.0</div>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-white/60">Academy</Link>
            <Link href="/glossary" className="hover:text-white/60">Glossary</Link>
            <span>Training mode only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
