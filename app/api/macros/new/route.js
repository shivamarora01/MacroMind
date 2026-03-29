//when write a post request
//db connect -> 

import { connectDB } from "../../../../lib/connectDB";
import Macros from '../../../../models/macros'
import { getUserIdFromToken } from "../../../../lib/getUserIdFromToken";

export async function POST(request){
    await connectDB();
    const user = await getUserIdFromToken();
    const userId = user.userId;
    console.log("userId",userId);
    const body = await request.json();
    console.log("body",body);
    const dateString = new Date(body.consumedAt).toISOString().slice(0, 10);
    const existing = await Macros.findOne({ date: dateString });

    const foodItem = {
    name: body.name,
    calories: body.calories,
    protein: body.protein,
    carbs: body.carbs,
    fat: body.fat,
    sugar: body.sugar || 0,
    caffeine: body.caffeine || 0,
    consumedAt: new Date(body.consumedAt),
  };

    if (existing) {
    // Add food to the food array
    existing.foods.push(foodItem);
    // Update totals
    existing.calories += body.calories;
    existing.protein += body.protein;
    existing.carbs += body.carbs;
    existing.fat += body.fat;
    existing.sugar += body.sugar || 0;
    existing.caffeine += body.caffeine || 0;

    await existing.save();
    return Response.json(existing);
  }
    const newMacro = await Macros.create({
    userId: userId,
    date: dateString, 
    name: body.name,
    calories: body.calories,
    sugar: body.sugar,
    fat: body.fat,
    protein: body.protein,
    carbs: body.carbs,
    caffeine: body.caffeine,
    quantity: body.quantity,
    consumedAt: body.consumedAt,
    foods: [foodItem],
  });
  return Response.json(newMacro);
}