// One food/drink item that the user consumed
export type MacroItem = {
  _id?: string;          // MongoDB id (string later)
  
  name: string;          // e.g. "Black Coffee", "Chicken Biryani"

  // Nutrition per serving consumed
  calories: number;      // in kcal
  sugar: number;         // in grams
  fat: number;           // in grams
  carbs: number;         // in grams
  caffeine: number;      // in mg (0 if not applicable)

  // Optional metadata
  quantity?: number;     // e.g. 1, 2.5 (cups, pieces etc.)
  unit?: string;         // e.g. "cup", "g", "ml", "piece"

  // When the user consumed it
  consumedAt: string;    // ISO date string: "2025-12-04T18:30:00.000Z"

  // For later when you add users/auth
  userId?: string;       // link to the logged-in user (optional for now)
  createdAt?: string;    // when entry was created
  updatedAt?: string;    // when entry was last updated
};
