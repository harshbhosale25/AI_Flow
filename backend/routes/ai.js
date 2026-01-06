import express from "express";
import axios from "axios";
import Prompt from "../models/Prompt.js";

const router = express.Router();

function cleanAIResponse(text) {
  return text
    .replace(/<s>/gi, "")
    .replace(/<\/s>/gi, "")
    .replace(/\[OUTST\]/gi, "")
    .replace(/\[OUT\]/gi, "")
    .replace(/User\s*\d*:/gi, "")
    .replace(/Assistant:/gi, "")
    .trim();
}

router.post("/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

   const rawAnswer = aiResponse.data.choices?.[0]?.message?.content || "";
const cleanedAnswer = cleanAIResponse(rawAnswer);

if (!cleanedAnswer || cleanedAnswer.length < 3) {
  return res.json({
    answer: " AI could not generate a valid response. Please try again."
  });
}

res.json({ answer: cleanedAnswer });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const record = new Prompt({ prompt, response });
    await record.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Save failed" });
  }
});

export default router;
