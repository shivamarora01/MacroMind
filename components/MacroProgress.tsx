type MacroCardProps = {
  label: string;
  value: number;
  goal: number;
  unit?: string;
};

export function MacroProgress({ label, value, goal, unit = "g" }: MacroCardProps) {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-semibold">{value} / {goal} {unit}</p>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
