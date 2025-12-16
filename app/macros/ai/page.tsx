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
    setFoods([]);
    setAdded([]);
    const data = await res.json();
    setFoods(data.foods || []);
    setLoading(false);
  }

  async function handleAddMacros(f: Food, i: number){
    try {
    console.log(f);
    console.log(i);
    //now the post request to send data to db

    //okay let's create the body first
    const consumedAt = new Date().toISOString();
    const body = {
      name: f.name,
      calories: Number(f.calories),
      protein: Number(f.protein),
      fat: Number(f.fat),
      carbs: Number(f.carbs),
      sugar: Number(f.sugar),
      caffeine: Number(f.caffeine),
      consumedAt,
    }
    console.log("sending payload", body);
    const res = await fetch('/api/macros/new', {
      method: "POST",
      headers: {"Content-type": "application.json"},
      body: JSON.stringify(body),
    })
    if(!res.ok){
      throw new Error("Failed to add macros");
      return;
    }
    const data = res.json();
    console.log(data);
    setAdded((prev) => [...prev, i]);
    } catch (error) {
      alert("error occured while adding");
      console.log("error", error);
    }
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
          {/* Rows */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900 border-b border-slate-800">
              <tr className="text-xs text-slate-400">
                <th className="px-4 py-2 text-left font-medium">Food</th>
                <th className="px-4 py-2 text-right font-medium">Calories</th>
                <th className="px-4 py-2 text-right font-medium">Protein</th>
                <th className="px-4 py-2 text-right font-medium">Carbs</th>
                <th className="px-4 py-2 text-right font-medium">Fat</th>
                <th className="px-4 py-2 text-right font-medium">Sugar</th>
                <th className="px-4 py-2 text-right font-medium">Caffeine</th>
                <th className="px-4 py-2 text-center font-medium">Add</th>
              </tr>
            </thead>

            <tbody>
              {foods.map((food, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-800 hover:bg-slate-900/60"
                >
                  <td className="px-4 py-2 max-w-[180px]">
                    <p className="truncate" title={food.name}>
                      {food.name}
                    </p>
                  </td>

                  <td className="px-4 py-2 text-right">{food.calories}</td>
                  <td className="px-4 py-2 text-right">{food.protein}</td>
                  <td className="px-4 py-2 text-right">{food.carbs}</td>
                  <td className="px-4 py-2 text-right">{food.fat}</td>
                  <td className="px-4 py-2 text-right">{food.sugar}</td>
                  <td className="px-4 py-2 text-right">{food.caffeine}</td>

                  {/* ✅ ADD LOGIC */}
                  <td className="px-4 py-2 text-center">
                    {added.includes(i) ? (
                      <span className="text-green-400 text-xs font-medium">
                        Added
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddMacros(food, i)}
                        className="text-blue-400 hover:text-blue-300 text-lg"
                        title="Add to daily macros"
                      >
                        ➕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
    </div>
  );
}
