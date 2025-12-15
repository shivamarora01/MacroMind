import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Food description is required" }, { status: 400 });
    }

    const prompt = `You are a nutrition expert... JSON FORMAT TO FOLLOW EXACTLY: { "foods": [ { "name": "", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "sugar": 0, "caffeine": 0 } ] } Input: "${text}"`;

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
