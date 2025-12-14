"use client";

import { useState } from "react";

type Food = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  caffeine: number;
};

export default function AINutritionDemo() {
  const [input, setInput] = useState("");
  //this is being used in tyescript to define type of food state
  //useState<Food[]> means foods is an array of Food type and intially empty array
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<number[]>([]);

  async function handleAI() {
    //trim remove extra spaces so that empty input is not sent
    if (!input.trim()) return;

    setLoading(true);
    const res = await fetch("/api/ai/nutrition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setFoods(data.foods || []);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 text-white">
      
      {/* Input */}
      <textarea
        className="w-full p-3 h-32 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none"
        placeholder="e.g. 2 eggs and black coffee"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleAI}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition"
      >
        {loading ? "Analyzing..." : "Get Nutrition (AI)"}
      </button>

      {/* Result Grid Table */}
      {foods.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-6 gap-2 px-3 py-2 text-xs text-slate-400 border-b border-slate-700">
            <div>Food</div>
            <div className="text-center">Cal</div>
            <div className="text-center">Protein</div>
            <div className="text-center">Carbs</div>
            <div className="text-center">Fat</div>
            <div className="text-center">Add into daily macro</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800">
            {foods.map((f, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-2 px-3 py-2 items-center"
              >
                <div className="truncate w-full">{f.name}</div>
                <div className="text-center">{f.calories}</div>
                <div className="text-center">{f.protein}</div>
                <div className="text-center">{f.carbs}</div>
                <div className="text-center">{f.fat}</div>

                <div className="text-center">
                  {added.includes(i) ? (
                    <span className="text-green-400 text-xs">Added</span>
                  ) : (
                    <button
                      onClick={() => setAdded((prev) => [...prev, i])}
                      className="text-blue-400 hover:text-blue-300 text-lg"
                    >
                      ➕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
