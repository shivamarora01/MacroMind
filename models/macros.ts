import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  sugar: { type: Number, default: 0 },
  caffeine: { type: Number, default: 0 },
  consumedAt: { type: Date, required: true }, // timestamp for this food
});

const macroSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },  
    // Example: "2025-12-11"
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    caffeine: { type: Number, default: 0 },

    foods: [foodSchema], // list of foods eaten on this day
  },
  { timestamps: true }
);

export default mongoose.models.Macros || mongoose.model("Macros", macroSchema);
