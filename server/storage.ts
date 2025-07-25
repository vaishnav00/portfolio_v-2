import { type User, type InsertUser, type DinoScore, type InsertDinoScore } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTopDinoScores(limit: number): Promise<DinoScore[]>;
  createDinoScore(score: InsertDinoScore): Promise<DinoScore>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dinoScores: Map<string, DinoScore>;

  constructor() {
    this.users = new Map();
    this.dinoScores = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTopDinoScores(limit: number): Promise<DinoScore[]> {
    const scores = Array.from(this.dinoScores.values());
    return scores
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, limit);
  }

  async createDinoScore(insertScore: InsertDinoScore): Promise<DinoScore> {
    const id = randomUUID();
    const score: DinoScore = { 
      ...insertScore, 
      id, 
      createdAt: new Date()
    };
    this.dinoScores.set(id, score);
    return score;
  }
}

export const storage = new MemStorage();
