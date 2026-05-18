import { request } from "http";
import { APIError } from "../../../lib/APIError";
import { connectDB } from "../../../lib/connectDB";
import { getUserIdFromToken } from "../../../lib/getUserIdFromToken";
import {withErrorWrapper} from "../../../lib/withErrorWrapper"
import Goal from '../../../models/goals'
import mongoose from "mongoose";
import goals from "../../../models/goals";


// export async function GET() {
//   try {
//     await connectDB();
//     const user = await getUserIdFromToken();
//     const userId = new mongoose.Types.ObjectId(user.userId);
//     const goals = await Goal.findOne({userId: userId}).sort({ createdAt: -1 });  
//     return Response.json(goals || {});
//   } catch (err) {
//     return Response.json({ error: err.message }, { status: 500 });
//     return new APIError("")
//   }
// }

export const GET = withErrorWrapper(async function(){
  await connectDB();
  const user = await getUserIdFromToken();
  if(!user){
    return new APIError("No user is there for token", 401);
  }
  const userId = user.userId;
  if(!userId){
    return new APIError("No user Id is there for token", 401);
  }
  const goals = await Goal.findOne({userId: userId}).sort({createdAt: -1});
  if(!goals){
    return new APIError("not found any data", 404);
  }
  return Response.json(goals || {}, {status: 200});
})



export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Goal Body", body);
    const user = await getUserIdFromToken();
    const userId = new mongoose.Types.ObjectId(user.userId);
    console.log("userid", userId);
    // Update existing goal, or create one if none exists
    const updatedGoal = await Goal.findOneAndUpdate(
      {userId},   // find any existing goal (only 1 should exist)
      {
        $set: {
        calories: body.calories,
        sugar: body.sugar,
        protein: body.protein,
        fat: body.fat,
        carbs: body.carbs,
        caffeine: body.caffeine,
        },
        $setOnInsert: {
          userId,
        }
      },
      {
        new: true,   // return updated document
        upsert: true // create if it doesn't exist
      }
    );

    return Response.json(updatedGoal);
  } catch (err) {
    console.log("Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
