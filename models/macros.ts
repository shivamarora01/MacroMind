import mongoose from "mongoose";

const macroSchema = new mongoose.Schema(
  {
  name: {type: String},
  calories: {type: Number},
  sugar: {type: Number},
  fat: {type: Number},
  protein: {type: Number},
  caffine: {type: Number},
  carbs: {type: Number},
  quantity: {type: Number, default: 1},
  unit: {type: String, default:""},
  consumedAt: {type: Date, required: true},
  userId: {type: String}
  },
  {timestamps: true}
)

export default mongoose.models.macros || mongoose.model("macros", macroSchema)