import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.GEMINI_API_KEY;
// console.log(key);
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export const aiChat = async (req, res) => {
  try {
    const { messages } = req.body;

    const prompt = `
You are HouseHub AI Assistant.
Help users with home service problems. 
Suggestions can include plumber, electrician, carpenter, AC repair etc.

Keep responses short & helpful.
Chat history is below:

${messages.map(m => `${m.sender}: ${m.text}`).join("\n")}

Reply as AI only.
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
