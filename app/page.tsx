import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-4 py-10 relative">
      
      {/* 3D Hero Image */}
      <div className="relative w-full max-w-lg">
        <Image 
          src="/macrys.png" 
          alt="MacroMind hero graphic" 
          width={800}
          height={800}
          priority
          className="rounded-2xl mx-auto drop-shadow-[0px_0px_35px_rgba(0,158,255,0.3)]"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mt-6 tracking-tight">
        MacroMind
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-center max-w-md mt-2">
        Track your meals, monitor macros, and hit your fitness goals
        — all in one clean and simple dashboard.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <Link
          href="/macros/new"
          className="rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2 text-sm font-medium transition"
        >
          ➕ Log today&apos;s meal
        </Link>

        <Link
          href="/macros/today"
          className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium hover:bg-slate-800 transition"
        >
          📊 Today
        </Link>

        <Link
          href="/macros/month"
          className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium hover:bg-slate-800 transition"
        >
          📅 Month
        </Link>
      </div>

      {/* 🤖 Floating AI Button */}
      <Link
        href="/macros/ai"
        className="fixed bottom-6 right-6 z-50
                   flex items-center gap-2
                   bg-purple-600 hover:bg-purple-500
                   text-white
                   px-4 py-3
                   rounded-full
                   shadow-xl transition
                   active:scale-95"
      >
        <span className="text-xl">🤖</span>
        <span className="text-sm font-medium">Ask AI</span>
      </Link>
    </main>
  );
}
