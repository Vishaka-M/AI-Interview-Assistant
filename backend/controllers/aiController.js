// backend/controllers/aiController.js
import dotenv from "dotenv";
console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

import Interview from "../models/Interview.js";
import OpenAI from "openai";

// You can remove dotenv here if server.js already calls dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateInterview = async (req, res) => {
try {
    const { candidateName = "TBD", role, language = "English", level = "Mid" } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key missing on server" });
    }
    if (!role) {
    return res.status(400).json({ error: "Role is required" });
    }

    // Prompt
    const system = "You are an expert tech interviewer. Return ONLY valid JSON.";
    const user = `
Role: ${role}
Seniority: ${level}
Language: ${language}

Return JSON:
{
"questions": [
    { "q": "..." , "topic": "core", "difficulty": 1 }
],
"rubric": "Short guidance on how to evaluate"
}`;

    // Call OpenAI
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",        // or gpt-4.1-mini if enabled
    messages: [
        { role: "system", content: system },
        { role: "user", content: user }
    ],
    temperature: 0.7
    });

    const text = resp.choices?.[0]?.message?.content?.trim() || "";

    // Parse JSON (with fallback that extracts the first {...} block)
    let parsed;
    try {
    parsed = JSON.parse(text);
    } catch {
    const match = text.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : { questions: [], rubric: "" };
    }

    // Normalize questions to string[]
    const questions = (parsed.questions || []).map(q => (q?.q ?? q)?.toString());

    // Persist
    const interview = await Interview.create({
    candidateName,
    role,
    language,
    questions,
    answers: [],
    score: 0,
    feedback: ""
    });

    return res.status(201).json({
    interviewId: interview._id,
    questions: interview.questions,
    rubric: parsed.rubric || ""
    });
} catch (err) {
    console.error("generateInterview error:", err);
    return res.status(500).json({ error: "Failed to generate interview questions" });
}
};
