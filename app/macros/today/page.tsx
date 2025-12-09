// app/macros/today/page.tsx

import ExamplePage from "../progress/page";

type IntakeItem = {
  name: string;
  quantity: string;     // e.g. "2 rotis", "1 scoop"
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

export default function TodayIntakePage() {
  const totals = getTotals(todayItems);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex justify-center py-10">
      <div className="w-full max-w-4xl px-4 space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Today&apos;s Intake</h1>
            <p className="text-sm text-slate-400">
              Overview of everything eaten/drunk today and total macros.
            </p>
          </div>
          <div className="text-right text-sm text-slate-400">
            {/* You can later replace this with actual date from JS */}
            <span>📅 {new Date().toLocaleDateString()}</span>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Total Calories</p>
            <p className="text-lg font-semibold">{totals.calories} kcal</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Protein</p>
            <p className="text-lg font-semibold">{totals.protein} g</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Carbs</p>
            <p className="text-lg font-semibold">{totals.carbs} g</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Fat</p>
            <p className="text-lg font-semibold">{totals.fat} g</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Sugar</p>
            <p className="text-lg font-semibold">{totals.sugar} g</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Caffeine</p>
            <p className="text-lg font-semibold">{totals.caffeine} mg</p>
          </div>
        </section>
        <section>
            <ExamplePage/>
        </section>

        {/* Table of items */}
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
                  <th className="px-4 py-2 text-left font-medium">Qty</th>
                  <th className="px-4 py-2 text-right font-medium">Calories</th>
                  <th className="px-4 py-2 text-right font-medium">Protein (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Carbs (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Fat (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Sugar (g)</th>
                  <th className="px-4 py-2 text-right font-medium">Caffeine (mg)</th>
                </tr>
              </thead>
              <tbody>
                {todayItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-slate-800 hover:bg-slate-900/60"
                  >
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-slate-300">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">{item.calories}</td>
                    <td className="px-4 py-2 text-right">{item.protein}</td>
                    <td className="px-4 py-2 text-right">{item.carbs}</td>
                    <td className="px-4 py-2 text-right">{item.fat}</td>
                    <td className="px-4 py-2 text-right">{item.sugar}</td>
                    <td className="px-4 py-2 text-right">{item.caffeine}</td>
                  </tr>
                ))}

                {/* Totals row */}
                <tr className="border-t border-slate-800 bg-slate-900/80">
                  <td className="px-4 py-2 font-semibold">Total</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.calories}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.protein}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.carbs}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.fat}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.sugar}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {totals.caffeine}
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
