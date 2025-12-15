"use client";

import { useEffect, useState } from "react";

// ---------- Types ----------
type Goals = {
  calories: number | "";
  protein: number | "";
  carbs: number | "";
  fat: number | "";
  sugar: number | "";
  caffeine: number | "";
};

// Props for reusable Input component
type InputProps = {
  label: string;
  state: number | "";
  setState: (v: number | "") => void;
};

// ---------- Reusable Input Component ----------
function NumberInput({ label, state, setState }: InputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-slate-300">{label}</label>
      <input
        type="number"
        value={state}
        onChange={(e) => {
          const value = e.target.value;
          setState(value === "" ? "" : Number(value));
        }}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

// ---------- MAIN PAGE ----------
export default function GoalsPage() {
  const [goals, setGoals] = useState<Goals>({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    sugar: "",
    caffeine: "",
  });

  const [message, setMessage] = useState<string>("");

  // Load existing goals from backend
  useEffect(() => {
    async function loadGoals() {
      const res = await fetch("/api/goals");
      const data = await res.json();

      if (data) {
        setGoals({
          calories: data.calories ?? "",
          protein: data.protein ?? "",
          carbs: data.carbs ?? "",
          fat: data.fat ?? "",
          sugar: data.sugar ?? "",
          caffeine: data.caffeine ?? "",
        });
      }
    }

    loadGoals();
  }, []);

  // Save goals
  const saveGoals = async () => {
    setMessage("");

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goals),
    });

    if (res.ok) setMessage("Goals saved successfully!");
    else setMessage("Error saving goals.");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center items-start py-12">
      <div className="w-full max-w-md px-4 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold">Set Goal</h1>
        <p className="text-sm text-slate-400">
          Set your macro targets used for progress tracking.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <NumberInput
            label="Calories"
            state={goals.calories}
            setState={(v) => setGoals({ ...goals, calories: v })}
          />
          <NumberInput
            label="Protein (g)"
            state={goals.protein}
            setState={(v) => setGoals({ ...goals, protein: v })}
          />
          <NumberInput
            label="Carbs (g)"
            state={goals.carbs}
            setState={(v) => setGoals({ ...goals, carbs: v })}
          />
          <NumberInput
            label="Fat (g)"
            state={goals.fat}
            setState={(v) => setGoals({ ...goals, fat: v })}
          />
          <NumberInput
            label="Sugar (g)"
            state={goals.sugar}
            setState={(v) => setGoals({ ...goals, sugar: v })}
          />
          <NumberInput
            label="Caffeine (mg)"
            state={goals.caffeine}
            setState={(v) => setGoals({ ...goals, caffeine: v })}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveGoals}
          className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2 font-medium text-sm transition"
        >
          Save Goals
        </button>

        {/* Status message */}
        {message && (
          <p className="text-center text-green-400 text-sm mt-3">{message}</p>
        )}
      </div>
    </main>
  );
}
