import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Food description is required" }, { status: 400 });
    }

      const prompt = `
      You are a nutrition expert.

      STRICT RULES (must follow exactly):
      1. Split the input ONLY by distinct food items.
      2. If the same food appears with a quantity (e.g. "5 chapatis"),
        return ONLY ONE food object with TOTAL nutrition.
      3. NEVER create multiple food objects for the same food.
      4. If multiple DIFFERENT foods are mentioned
        (e.g. "5 chapatis and biryani one bowl"),
        return ONE object PER food.
      5. Include the quantity in the food name.
      6. Do NOT add explanations or extra text.

      Return JSON in EXACT format below.

      JSON FORMAT:
      {
        "foods": [
          {
            "name": "",
            "calories": 0,
            "protein": 0,
            "carbs": 0,
            "fat": 0,
            "sugar": 0,
            "caffeine": 0
          }
        ]
      }

      Input: "${text}"
      `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

const aiText = response.choices[0].message.content;

const cleaned = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const json = JSON.parse(cleaned);

return NextResponse.json(json);
  } catch (err) {
    console.error("AI Nutrition Error:", err);
    return NextResponse.json({ error: "AI failed to process nutrition." }, { status: 500 });
  }
}
