import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/translate", async (req, res) => {
  const { text, language } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Translate the following text into ${language}`,
        },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    });

    res.json({ translation: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(3001, () =>
  console.log("✅ Server running on http://localhost:3001")
);
