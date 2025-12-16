"use client";

import { useEffect, useState } from "react";



type DayData = {
  date: string;
  dayNumber: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  caffeine: number;
  foods: IntakeItem[];
};


type Goal = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  caffeine: number;
};

function MacroProgress({
  label,
  value,
  goal,
  unit,
}: {
  label: string;
  value: number;
  goal: number;
  unit: string;
}) {
  const percent = Math.min((value / goal) * 100, 100);
  const color =
    percent >= 100 ? "bg-red-500" : percent >= 60 ? "bg-green-500" : "bg-blue-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span>
          {value} / {goal} {unit}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

type IntakeItem = {
  name: string;     // e.g. "2 rotis", "1 scoop"
  calories: number;
  protein: number;      // g
  carbs: number;        // g
  fat: number;          // g
  sugar: number;        // g
  caffeine: number;     // mg
};

const todayItems: IntakeItem[] = [
  {
    name: "Black Coffee",
    quantity: "1 cup",
    calories: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    sugar: 0,
    caffeine: 80,
  },
  {
    name: "Oats with Milk",
    quantity: "1 bowl",
    calories: 250,
    protein: 10,
    carbs: 40,
    fat: 5,
    sugar: 8,
    caffeine: 0,
  },
  {
    name: "Grilled Chicken & Rice",
    quantity: "1 plate",
    calories: 550,
    protein: 35,
    carbs: 60,
    fat: 15,
    sugar: 2,
    caffeine: 0,
  },
];

function getTotals(items: IntakeItem[]) {
  return items.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
      acc.sugar += item.sugar;
      acc.caffeine += item.caffeine;
      return acc;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      caffeine: 0,
    }
  );
}

export default function MonthPage() {
  const [monthData, setMonthData] = useState<DayData[]>([]);
  const [selected, setSelected] = useState<DayData | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const totals = getTotals(todayItems);
  const foods = selected?.foods?? [];
  console.log("monthData", monthData);
  console.log(selected);
  console.log(foods);

  // Fetch month totals
  useEffect(() => {
    async function fetchMonth() {
      const res = await fetch("/api/macros/month");
      const data = await res.json();
      setMonthData(data);

      // Auto-select today's day OR first entry
      const todayStr = new Date().toISOString().slice(0, 10);
      const today = data.find((d: any) => d.date === todayStr) || data[0] || null;
      setSelected(today);
    }

    fetchMonth();
  }, []);

  // Fetch goal data
  useEffect(() => {
    async function fetchGoal() {
      const res = await fetch("/api/goals");
      const g = await res.json();
      setGoal(g);
    }
    fetchGoal();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center py-10">
      <div className="max-w-3xl w-full px-4 space-y-6">
        {/* HEADER */}
        <h1 className="text-2xl font-semibold">Monthly Overview</h1>
        <p className="text-sm text-slate-400">Tap a day to see stats</p>

        {/* CALENDAR */}
        <section className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="grid grid-cols-7 gap-y-3 place-items-center">
            {monthData.map((day) => (
              <div
                key={day.date}
                onClick={() => setSelected(day)}
                className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition 
                ${
                  selected?.date === day.date
                    ? "bg-blue-600 text-white ring-2 ring-blue-300"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                {day.dayNumber}
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED DAY DETAILS */}
        {selected && goal && (
          <section className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Selected Day</p>
              <p className="text-lg font-semibold">
                {selected.date} • Day {selected.dayNumber}
              </p>
            </div>

            {/* MACRO BARS */}
            <div className="space-y-3">
              <MacroProgress
                label="Calories"
                value={selected.calories}
                goal={goal.calories}
                unit="kcal"
              />
              <MacroProgress
                label="Protein"
                value={selected.protein}
                goal={goal.protein}
                unit="g"
              />
              <MacroProgress
                label="Carbs"
                value={selected.carbs}
                goal={goal.carbs}
                unit="g"
              />
              <MacroProgress
                label="Fat"
                value={selected.fat}
                goal={goal.fat}
                unit="g"
              />
              <MacroProgress
                label="Sugar"
                value={selected.sugar}
                goal={goal.sugar}
                unit="g"
              />
            </div>
          </section>
        )}
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-200">
              Items consumed today
            </h2>
            <span className="text-xs text-slate-400">
              {todayItems.length} item{todayItems.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900">
                <tr className="text-xs text-slate-400">
                  <th className="px-4 py-2 text-left font-medium">Item</th>
                  <th className="px-4 py-2 text-right font-medium">Calories</th>
                  <th className="px-4 py-2 text-right font-medium">Protein (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Carbs (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Fat (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Sugar (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Caffeine (mg)</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-slate-800 hover:bg-slate-900/60"
                  >
                    <td className="px-4 py-2 line-clamp 1">{food.name}</td>
                    <td className="px-4 py-2 text-right">{food.calories}</td>
                    <td className="px-4 py-2 text-right">{food.protein}</td>
                    <td className="px-4 py-2 text-right">{food.carbs}</td>
                    <td className="px-4 py-2 text-right">{food.fat}</td>
                    <td className="px-4 py-2 text-right">{food.sugar}</td>
                    <td className="px-4 py-2 text-right">{food.caffeine}</td>
                  </tr>
                ))}

                {/* Totals row */}
                <tr className="border-t border-slate-800 bg-slate-900/80">
                  <td className="px-4 py-2 font-semibold">Total</td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {selected?.calories}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.protein}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {selected?.carbs}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {selected?.fat}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {selected?.sugar}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {selected?.caffeine}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
