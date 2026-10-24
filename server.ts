import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Endpoint to generate custom quiz questions using Gemini
app.post("/api/quiz/generate", async (req, res) => {
  try {
    const { subject, grade = "Class 7", count = 5 } = req.body;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(400).json({ error: "Gemini API key not configured. Using preloaded questions." });
    }

    const prompt = `Generate ${count} multiple-choice quiz questions for ${grade} students about ${subject}. Each question must have 4 options, the exact 0-indexed correct answer index, and a fun, kid-friendly explanation (1-2 sentences) suitable for children under class 8.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The quiz question text" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 4 possible answers"
              },
              correctIndex: { type: Type.INTEGER, description: "Index of correct answer (0 to 3)" },
              explanation: { type: Type.STRING, description: "Kid-friendly explanation of why the answer is correct" },
              funFact: { type: Type.STRING, description: "An amazing fun fact related to this question" }
            },
            required: ["question", "options", "correctIndex", "explanation", "funFact"]
          }
        }
      }
    });

    const jsonText = response.text ? response.text.trim() : "[]";
    const questions = JSON.parse(jsonText);
    res.json({ questions });
  } catch (error: any) {
    console.error("Gemini quiz generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate quiz questions" });
  }
});

// Endpoint for AI Tutor explanation
app.post("/api/quiz/explain", async (req, res) => {
  try {
    const { question, selectedAnswer, correctAnswer, subject } = req.body;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({ explanation: `The correct answer is "${correctAnswer}". Great try! Keep exploring ${subject}!` });
    }

    const prompt = `A student in middle school answered a quiz question incorrectly. 
Subject: ${subject}
Question: "${question}"
Student's incorrect answer: "${selectedAnswer}"
Correct answer: "${correctAnswer}"

Act as Professor Spark, an encouraging, friendly robot tutor for kids. Explain in 2 sentences why the correct answer is right and encourage the student kindly without making them feel bad.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ explanation: response.text?.trim() || "Keep exploring and learning every day!" });
  } catch (error: any) {
    console.error("AI tutor error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to download project archive on mobile
app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "quizwiz.tar.gz"));
});

// Endpoint to download pre-built production website files
app.get("/download-dist", (req, res) => {
  res.download(path.join(__dirname, "quizwiz-dist.tar.gz"));
});

// Vite middleware integration for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
