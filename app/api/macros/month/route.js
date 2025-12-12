import { connectDB } from "@/lib/connectDB";
import Macros from "../../../../models/macros";
import Goal from "../../../../models/goals";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    // Example: "2025-12"
    const prefix = `${year}-${month}`;

    const days = await Macros.find({
      date: { $regex: `^${prefix}` },
    }).sort({ date: 1 });

    console.log(days[0].foods);
    // Format for UI
    const formatted = days.map((d) => ({
      date: d.date,
      dayNumber: Number(d.date.slice(8, 10)),
      calories: d.calories,
      protein: d.protein,
      carbs: d.carbs,
      fat: d.fat,
      sugar: d.sugar,
      caffeine: d.caffeine,
    }));

    return Response.json(formatted);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
