export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center py-10">
      <div className="max-w-3xl w-full px-4 space-y-6">

        {/* HEADER */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* CALENDAR */}
        <section className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="grid grid-cols-7 gap-y-3 place-items-center">
            {Array.from({ length: 28 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </section>

        {/* SELECTED DAY DETAILS */}
        <section className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-44" />
          </div>

          {/* MACRO BARS */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* FOOD TABLE */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800">
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

/* ---------------- SKELETON BLOCK ---------------- */

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-800 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
    </div>
  );
}
