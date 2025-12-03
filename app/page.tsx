// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">MacroMind</h1>
      <p className="text-slate-300">
        Type your meals. Get instant calories & macros with AI. 
        Track how close you are to your daily goals.
      </p>

      <Link
        href="/goals"
        className="inline-block mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-800"
      >
        Set Your Daily Goals
      </Link>
    </div>
  );
}
