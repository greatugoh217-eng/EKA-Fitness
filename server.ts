/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface GroundingSource {
  title: string;
  url: string;
}

// API endpoint for Real-Time Google Search Grounded Agent
app.post('/api/agent/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, mode = 'general', context } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'A valid prompt string is required.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error: 'Gemini API key is not configured in environment secrets. Please configure GEMINI_API_KEY.',
      });
      return;
    }

    let modeInstruction = '';
    if (mode === 'fact_check') {
      modeInstruction = `
You are acting as an objective Fact-Checking Verification Agent.
Investigate the user's claim against the latest real-time web search information.
Structure your reply with:
1. Verdict: Give a clear verdict tag: [VERIFIED ACCURATE], [MOSTLY TRUE], [MISLEADING], [UNSUBSTANTIATED], or [FALSE].
2. Key Evidence & Facts: Cite exact dates, reputable publications, institutions, or official statements.
3. Context: Clarify nuances or common misconceptions.
`;
    } else if (mode === 'current_events') {
      modeInstruction = `
You are an expert Global & Regional Current Events Journalist and Analyst.
Provide up-to-the-minute, objective synthesis of breaking news, sports developments, political or economic affairs, or community updates.
Always highlight recency, timeline of events, and differing official accounts if any.
`;
    } else if (mode === 'fitness_science') {
      modeInstruction = `
You are a Fitness & Sports Medicine Research Agent.
Verify fitness routines, nutrition claims, supplements, workout safety, exercise science, or sports news using recent scientific literature and reputable sports medical sources.
`;
    }

    const systemInstruction = `You are a real-time Search & Intelligence Agent equipped with Google Search grounding.
${modeInstruction}
You must answer based on up-to-date real-world facts from Google Search.
Be clear, concise, accurate, and professional. Use markdown formatting with bolding, lists, and headings for readability.`;

    const userContent = context ? `Context: ${context}\n\nUser Question/Claim: ${prompt}` : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userContent,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated.';

    // Extract real-time grounding citations
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    const sources: GroundingSource[] = [];
    const seenUrls = new Set<string>();

    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        const url = chunk.web.uri;
        const title = chunk.web.title || new URL(url).hostname;
        if (!seenUrls.has(url)) {
          seenUrls.add(url);
          sources.push({ title, url });
        }
      }
    }

    res.json({
      success: true,
      text,
      sources,
      searchQueries: webSearchQueries,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/agent/search:', error);
    let errorMsg = error?.message || 'Failed to query real-time search agent.';
    
    // Check if error is JSON string
    try {
      if (typeof errorMsg === 'string' && errorMsg.startsWith('{')) {
        const parsed = JSON.parse(errorMsg);
        if (parsed?.error?.message) {
          errorMsg = parsed.error.message;
        }
      }
    } catch {
      // ignore JSON parse error
    }

    if (error?.status === 429 || errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('quota')) {
      errorMsg = 'Gemini API search quota is currently busy or rate-limited. If you have an active API key with quota, you can configure it in the Secrets panel, or retry shortly.';
    }

    res.status(500).json({
      error: errorMsg,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Setup Vite middlewares for development, or serve dist for production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server error:', err);
  process.exit(1);
});
