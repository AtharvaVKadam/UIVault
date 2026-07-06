/// <reference types="node" />
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, html, css } = req.body;

  if (!prompt || !html) {
    return res.status(400).json({ error: "Missing prompt or html" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    // --- NEW: Stronger System Prompt ---
    const promptText = `
      You are an expert UI developer. The user wants to modify a component.

      CURRENT HTML:
      ${html}

      USER REQUEST: ${prompt}

      CRITICAL INSTRUCTIONS:
      1. Modify the HTML to fulfill the user's request.
      2. Because the preview environment uses a Just-In-Time (JIT) CSS compiler, new Tailwind classes will NOT render. You MUST apply your visual changes using inline CSS styles (e.g., style="background-color: red; color: white; border-radius: 9999px;").
      3. You are allowed to override existing classes with your inline styles.
      4. Return ONLY the raw, updated HTML code. No conversational text, no markdown blocks, no explanations.
    `;

    const result = await model.generateContent(promptText);
    const response = await result.response;
    let modifiedHtml = response.text().trim();

    // --- NEW: Bulletproof Markdown Extraction ---
    // This catches the code even if Gemini wraps it in ```html ... ```
    const match = modifiedHtml.match(/```(?:html)?\s*([\s\S]*?)\s*```/i);
    if (match) {
      modifiedHtml = match[1].trim();
    } else {
      modifiedHtml = modifiedHtml
        .replace(/^```[\s\S]*?\n/g, "")
        .replace(/```$/g, "")
        .trim();
    }

    res.status(200).json({ html: modifiedHtml, css: css });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate component" });
  }
}
