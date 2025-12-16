"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewMacroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [caffeine, setCaffeine] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugar, setSugar] = useState("");

  // ⭐ New states for date + time
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async() => {
    setMessage("");
    if(!name || !calories || !protein || !fat || !carbs || !sugar){
      setMessage("Please enter all fields");
      return;
    }
    const consumedAt = new Date(`${date}T${time || "00:00"}`).toISOString();
    const body = {
    name,
    calories: Number(calories),
    protein: Number(protein),
    fat: Number(fat),
    carbs: Number(carbs),
    sugar: Number(sugar),
    caffeine: Number(caffeine),
    consumedAt,
  };
    //else do the post request
    try {
      const res = await fetch("/api/macros/new", {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify(body)
    });
    if(!res.ok) throw new Error("Failed to Save");

    const data = await res.json();
    setMessage("Saved succesfully!");

    // Clear fields
    setName("");
    setCalories("");
    setProtein("");
    setFat("");
    setCarbs("");
    setSugar("");
    setCaffeine("");
    setDate("");
    setTime("");
    } catch (error) {
      setMessage("Something went wrong.");
    }
  }
  useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage("");
  }, 1000); // ⏱ 1 second

  return () => clearTimeout(timer);
}, [message]);


  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center items-start py-12">
{message && (
  <div className="fixed inset-0 z-50 flex items-start justify-center pt-100">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

    {/* Message box */}
    <div className="relative z-10 px-6 py-3 rounded-lg bg-slate-900 border border-slate-700 shadow-lg">
      <p className="text-green-400 text-sm text-center">
        {message}
      </p>
    </div>
  </div>
)}

      <div className="relative w-full max-w-md px-4 z-10">
        <h1 className="text-2xl font-semibold mb-2">Add Food / Drink</h1>
        <p className="text-sm text-slate-400 mb-6">
          Log what you consumed and its macros.
        </p>

        <form className="space-y-6">

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Time (optional)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Item Name</label>
            <input
              type="text"
              placeholder="e.g. Black Coffee, Apple"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block mb-1 text-sm font-medium">Calories (kcal)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* sugar / fat / carbs */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Sugar (g)</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Fat (g)</label>
              <input
                type="number"
                placeholder="e.g. 3"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Carbs (g)</label>
              <input
                type="number"
                placeholder="e.g. 20"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Protein */}
          <div>
            <label className="block mb-1 text-sm font-medium">Protein (g)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* caffeine */}
          <div>
            <label className="block mb-1 text-sm font-medium">Caffeine (mg)</label>
            <input
              type="number"
              placeholder="e.g. 80"
              value={caffeine}
              onChange={(e) => setCaffeine(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleCreate}
            className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2 font-medium text-sm transition"
          >
            Save
          </button>
        </form>
      </div>
      {/* 🤖 AI Button */}
      <button
        onClick={() => router.push("/macros/ai")}
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
      </button>
    </main>
  );
}
