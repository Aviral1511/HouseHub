import { GoogleGenerativeAI } from "@google/generative-ai";
import Provider from "../models/Provider.js";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.GEMINI_API_KEY;
// console.log(key);
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Analyze issue and extract { category, severity, cost, reasoning }
export const analyzeProblem = async (description) => {
    const prompt = `
You are an expert home repair consultant.
Analyze the user's issue and respond with JSON only.

Required JSON format:
{
 "category": "Plumber/Electrician/Carpenter/AC Repair/Cleaner/Painter",
 "severity": "low/medium/high",
 "estimatedCost": "range in INR",
 "explanation": "Reasoning in one sentence"
}

User Issue: "${description}"

Make sure response is only pure JSON with no explanation outside.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

        // 1. Clean Markdown: Remove ```json and ``` if present
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            text = jsonMatch[0];
        }

    return JSON.parse(text); // Extract JSON cleanly
};

// Fetch top providers of that category
export const getRecommendedProviders = async (category) => {
    return await Provider.find({ serviceCategory: category }).limit(5);
};
