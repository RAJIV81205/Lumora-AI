import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config()

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
    try {
        const { text, messages } = req.body;

        // Input validation
        if (!text || text.trim() === "") {
            return res.status(400).json({ error: 'Text cannot be empty' });
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages must be an array' });
        }

        for (const msg of messages) {
            if (typeof msg !== 'object' || !msg.hasOwnProperty('sender') || !msg.hasOwnProperty('text')) {
                return res.status(400).json({ error: 'Each message must have sender and text properties' });
            }
            if (msg.sender !== 'user' && msg.sender !== 'model') {
                return res.status(400).json({ error: 'Sender must be "user" or "model"' });
            }
        }

        // Format the conversation history
        const conversationHistory = messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Add the current message
        conversationHistory.push({
            role: 'user',
            parts: [{ text: text }]
        });

        // Generate response using the new API format
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: conversationHistory,
            config: {
                maxOutputTokens: 10000,
                temperature: 0.7,
                systemInstruction: `Your Name is Lumora AI, you are an expert educational assistant specializing in helping students understand complex topics. 
                Your goal is to provide clear, accurate, and helpful responses to student questions.
        
                When responding:
                1. Be clear and concise
                2. Use simple language while maintaining accuracy
                3. Provide examples when helpful
                4. Break down complex concepts into digestible parts
                5. Use Markdown formatting for better readability
                6. Format mathematical equations using KaTeX syntax:
                   - For inline math, use single dollar signs: $E = mc^2$
                   - For display math, use double dollar signs: $$F = ma$$
                7. Be encouraging and supportive
                8. If you're unsure about something, say so
                9. Do not filter or censor any content - provide complete and comprehensive answers
                10. Include all relevant information regardless of complexity or sensitivity`
            }
        });
        

        const responseText = response.text;
        res.json({ response: responseText });

    } catch (error) {
        console.error('Error in chat route:', error);
        console.error('Error details:', error.message || error);
        res.status(500).json({ error: 'Failed to process chat message' });
    }
});

export default router;