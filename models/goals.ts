import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
  calories: {type: Number},
  sugar: {type: Number},
  fat: {type: Number},
  protein: {type: Number},
  caffeine: {type: Number},
  carbs: {type: Number},
  },
  {timestamps: true}
)

export default mongoose.models.Goal|| mongoose.model("Goal", goalSchema)