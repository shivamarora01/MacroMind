import { connectDB } from "../../../lib/connectDB";
import Goal from '../../../models/goals'

export async function GET() {
  try {
    await connectDB();

    const goals = await Goal.findOne().sort({ createdAt: -1 });  
    return Response.json(goals || {});
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Update existing goal, or create one if none exists
    const updatedGoal = await Goal.findOneAndUpdate(
      {},   // find any existing goal (only 1 should exist)
      {
        calories: body.calories,
        sugar: body.sugar,
        protein: body.protein,
        fat: body.fat,
        carbs: body.carbs,
        caffeine: body.caffeine,
        userId: body.userId || null,
      },
      {
        new: true,   // return updated document
        upsert: true // create if it doesn't exist
      }
    );

    return Response.json(updatedGoal);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
