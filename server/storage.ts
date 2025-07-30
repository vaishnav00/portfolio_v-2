import { type User, type InsertUser, type DinoScore, type InsertDinoScore, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTopDinoScores(limit: number): Promise<DinoScore[]>;
  createDinoScore(score: InsertDinoScore): Promise<DinoScore>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dinoScores: Map<string, DinoScore>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.dinoScores = new Map();
    this.contactMessages = new Map();
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

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const messages = Array.from(this.contactMessages.values());
    return messages.sort((a, b) => {
      const aDate = a.createdAt || new Date(0);
      const bDate = b.createdAt || new Date(0);
      return bDate.getTime() - aDate.getTime(); // Sort by newest first
    });
  }
}

export const storage = new MemStorage();
