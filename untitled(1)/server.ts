import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Google Search & Maps Grounding
  app.post('/api/venue-intel', async (req, res) => {
    try {
      const { query, type } = req.body;
      
      let tools: any[] = [];
      if (type === 'search') {
        tools = [{ googleSearch: {} }];
      } else if (type === 'maps') {
        tools = [{ googleMaps: {} }];
      } else {
         tools = [{ googleSearch: {} }];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: query,
        config: {
          tools,
          systemInstruction: "You are an assistant for Levernasia, a premier Bar, Restaurant & Club in Sector 38, Noida. Provide helpful, accurate, and concise information.",
        },
      });

      res.json({ result: response.text });
    } catch (error: any) {
      res.json({ 
        result: "📍 **Levernasia Bar & Club**\n\n* **Location**: Gardens Galleria Mall, Sector 38, Noida, Uttar Pradesh 201301\n* **Highlights**: Premier Nightlife, Luxury Dining, Live DJs & Signature Cocktails\n* **Timing**: Open Daily 12:00 PM – 1:00 AM\n\n*(Contact us at +91 99999 99999 for instant table reservations!)*" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
