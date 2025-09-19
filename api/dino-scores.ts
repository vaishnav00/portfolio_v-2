import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertDinoScoreSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { googleSheetsService } from '../server/googleSheets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Initialize Google Sheets service
    await googleSheetsService.initialize();

    if (req.method === 'GET') {
      // Get top scores
      const scores = await storage.getTopDinoScores(10);
      return res.json(scores);
    }

    if (req.method === 'POST') {
      // Submit new score
      const result = insertDinoScoreSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ error: error.message });
      }

      const score = await storage.createDinoScore(result.data);
      
      // Save to Google Sheets
      const sheetsSaved = await googleSheetsService.saveDinoScore({
        playerName: result.data.playerName,
        score: result.data.score,
        timestamp: (score.createdAt || new Date()).toISOString()
      });

      if (sheetsSaved) {
        console.log('Dino score saved to Google Sheets');
      }

      return res.status(201).json(score);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}