import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDinoScoreSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dino game leaderboard routes
  
  // Get top scores
  app.get("/api/dino-scores", async (req, res) => {
    try {
      const scores = await storage.getTopDinoScores(10);
      res.json(scores);
    } catch (error) {
      console.error("Failed to get dino scores:", error);
      res.status(500).json({ error: "Failed to get scores" });
    }
  });

  // Submit new score
  app.post("/api/dino-scores", async (req, res) => {
    try {
      const result = insertDinoScoreSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ error: error.message });
      }

      const score = await storage.createDinoScore(result.data);
      res.status(201).json(score);
    } catch (error) {
      console.error("Failed to create dino score:", error);
      res.status(500).json({ error: "Failed to save score" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
