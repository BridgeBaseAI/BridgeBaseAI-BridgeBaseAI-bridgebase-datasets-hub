import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAiQuerySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // GET /api/datasets - Returns curated Web3 datasets
  app.get("/api/datasets", async (req, res) => {
    try {
      const datasets = await storage.getAllDatasets();
      res.json({ datasets });
    } catch (error) {
      console.error("Error fetching datasets:", error);
      res.status(500).json({ 
        error: "Failed to fetch datasets",
        message: "Unable to retrieve Web3 datasets. Please try again later."
      });
    }
  });

  // POST /api/ask - AI assistant powered by DeepSeek
  app.post("/api/ask", async (req, res) => {
    try {
      const body = insertAiQuerySchema.parse(req.body);
      
      // Create query record
      const query = await storage.createAiQuery(body);
      
      // Call OpenRouter API with DeepSeek model
      const openRouterKey = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_KEY || "";
      
      if (!openRouterKey) {
        return res.status(500).json({
          error: "API configuration missing",
          message: "OpenRouter API key is not configured. Please check environment variables."
        });
      }

      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.SITE_URL || "http://localhost:5000",
          "X-Title": "BridgeHub Web3 AI Assistant"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a Web3 and blockchain expert assistant. Provide accurate, helpful information about DeFi protocols, NFT markets, DAO governance, cryptocurrency, and blockchain technology. Use current data when possible and cite sources. Keep responses informative but concise."
            },
            {
              role: "user",
              content: body.question
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        console.error("OpenRouter API error:", errorText);
        return res.status(500).json({
          error: "AI service unavailable",
          message: "The AI assistant is temporarily unavailable. Please try again later."
        });
      }

      const openRouterData = await openRouterResponse.json();
      const aiAnswer = openRouterData.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try rephrasing your question.";

      // Update query with response
      query.answer = aiAnswer;
      query.sources = ["OpenRouter DeepSeek API"];
      query.confidence = "0.85";

      res.json({
        answer: aiAnswer,
        sources: query.sources,
        confidence: parseFloat(query.confidence)
      });

    } catch (error) {
      console.error("Error in AI query:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request format",
          message: "Please provide a valid question in your request.",
          details: error.errors
        });
      }

      res.status(500).json({
        error: "Internal server error",
        message: "An unexpected error occurred while processing your question. Please try again."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
