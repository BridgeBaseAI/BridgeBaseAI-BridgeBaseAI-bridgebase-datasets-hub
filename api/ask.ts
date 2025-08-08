import { z } from 'zod';

// Inline schema for Vercel serverless
const insertAiQuerySchema = z.object({
  question: z.string(),
  context: z.string().optional()
});

interface AiQuery {
  id: string;
  question: string;
  context?: string;
  answer: string;
  confidence: string;
  sources: string[];
  createdAt: Date;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = insertAiQuerySchema.parse(req.body);
    
    // Create query record for tracking
    const query: AiQuery = {
      id: Math.random().toString(36).substr(2, 9),
      question: body.question,
      context: body.context,
      answer: '',
      confidence: '0.85',
      sources: [],
      createdAt: new Date()
    };
    
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
        "HTTP-Referer": process.env.SITE_URL || "https://bridgebase-datasets-hub.vercel.app",
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
}