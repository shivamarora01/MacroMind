import { connectDB } from "@/lib/connectDB";
import Macros from "../../../../models/macros";
import Goal from "../../../../models/goals";
//always import in curly when importing a function
import {withErrorWrapper} from "../../../../lib/withErrorWrapper"
import { verifyAuth } from "../../../../lib/verifyAuth";
import { getUserIdFromToken } from "../../../../lib/getUserIdFromToken";

// export async function GET() {
//   try {
//     await connectDB();

    // const now = new Date();
    // const year = now.getFullYear();
    // const month = String(now.getMonth() + 1).padStart(2, "0");

    // // Example: "2025-12"
    // const prefix = `${year}-${month}`;

    // const days = await Macros.find({
    //   date: { $regex: `^${prefix}` },
    // }).sort({ date: 1 });

    // console.log(days);
    // // Format for UI
    // const formatted = days.map((d) => ({
    //   date: d.date,
    //   dayNumber: Number(d.date.slice(8, 10)),
    //   calories: d.calories,
    //   protein: d.protein,
    //   carbs: d.carbs,
    //   fat: d.fat,
    //   sugar: d.sugar,
    //   caffeine: d.caffeine,
    //   foods: d.foods
    // }));

    // return Response.json(formatted);
//   } catch (err) {
//     return Response.json({ error: err.message }, { status: 500 });
//   }
// }

//We changed GET from a function declaration to a variable because wrappers return a function, and we need to assign that returned function to GET.
export const GET = withErrorWrapper(
  verifyAuth(async (request) => {
    await connectDB();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const user = await getUserIdFromToken();
    const userId = user.userId; 

    // Example: "2025-12"
    const prefix = `${year}-${month}`;

    const days = await Macros.find({
      userId: userId,
      date: { $regex: `^${prefix}` },
    }).sort({ date: 1 });

    console.log(days);
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
      foods: d.foods
    }));

    return Response.json(formatted);
  })
)