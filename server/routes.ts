import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDinoScoreSchema, insertContactMessageSchema } from "@shared/schema";
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

  // Contact message routes
  
  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ error: error.message });
      }

      const message = await storage.createContactMessage(result.data);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Failed to create contact message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Get all contact messages (for you to read)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Failed to get contact messages:", error);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
