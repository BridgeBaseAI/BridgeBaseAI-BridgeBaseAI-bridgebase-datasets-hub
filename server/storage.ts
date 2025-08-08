import { type Dataset, type InsertDataset, type AiQuery, type InsertAiQuery } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Dataset operations
  getAllDatasets(): Promise<Dataset[]>;
  getDataset(id: string): Promise<Dataset | undefined>;
  createDataset(dataset: InsertDataset): Promise<Dataset>;
  
  // AI query operations
  createAiQuery(query: InsertAiQuery): Promise<AiQuery>;
  getRecentQueries(limit?: number): Promise<AiQuery[]>;
}

export class MemStorage implements IStorage {
  private datasets: Map<string, Dataset>;
  private aiQueries: Map<string, AiQuery>;

  constructor() {
    this.datasets = new Map();
    this.aiQueries = new Map();
    this.initializeDatasets();
  }

  private initializeDatasets() {
    // Initialize with real Web3 datasets based on research
    const initialDatasets: Dataset[] = [
      {
        id: "defi-tvl-analytics",
        title: "DeFi TVL Analytics",
        description: "Real-time Total Value Locked data across 150+ protocols. Includes Ethereum ($84.1B), Solana ($9.9B), and emerging chains with comprehensive protocol analytics.",
        source: "https://defillama.com/api",
        tags: ["defi", "tvl", "defillama", "protocols"],
        updateFrequency: "hourly",
        volume: "150+ protocols",
        category: "DeFi",
        status: "live",
        createdAt: new Date(),
      },
      {
        id: "nft-trading-data",
        title: "NFT Trading Data",
        description: "Comprehensive NFT marketplace data with $946M monthly volume. Ethereum dominance at 78.5% with emerging Polygon growth and 9.2M monthly sales.",
        source: "https://dappradar.com/nft",
        tags: ["nft", "trading", "opensea", "polygon"],
        updateFrequency: "daily",
        volume: "9.2M sales/month",
        category: "NFT",
        status: "live",
        createdAt: new Date(),
      },
      {
        id: "dao-ecosystem",
        title: "DAO Ecosystem Analytics",
        description: "Track 13,000+ DAOs with $40B+ combined treasury value. Governance activity across major protocols and communities with 11M token holders globally.",
        source: "https://www.alchemy.com/dapps/top/daos",
        tags: ["dao", "governance", "treasury", "tokens"],
        updateFrequency: "weekly",
        volume: "11M token holders",
        category: "DAO",
        status: "live",
        createdAt: new Date(),
      },
      {
        id: "bitcoin-blockchain",
        title: "Bitcoin Blockchain Historical Data",
        description: "Complete historical Bitcoin blockchain data from Kaggle BigQuery. Includes blocks, transactions, and address analytics for comprehensive Bitcoin network analysis.",
        source: "https://www.kaggle.com/datasets/bigquery/bitcoin-blockchain",
        tags: ["bitcoin", "blockchain", "kaggle", "historical"],
        updateFrequency: "quarterly",
        volume: "Full blockchain",
        category: "Blockchain",
        status: "historical",
        createdAt: new Date(),
      },
      {
        id: "ethereum-defi-protocols",
        title: "Ethereum DeFi Protocols",
        description: "Ethereum ecosystem with 59.7% DeFi market share. Includes Uniswap, Aave, and Lido Finance protocol data with $84.1B total value locked.",
        source: "https://defillama.com/chain/Ethereum",
        tags: ["ethereum", "defi", "uniswap", "aave"],
        updateFrequency: "hourly",
        volume: "$84.1B TVL",
        category: "DeFi",
        status: "live",
        createdAt: new Date(),
      },
    ];

    initialDatasets.forEach(dataset => {
      this.datasets.set(dataset.id, dataset);
    });
  }

  async getAllDatasets(): Promise<Dataset[]> {
    return Array.from(this.datasets.values());
  }

  async getDataset(id: string): Promise<Dataset | undefined> {
    return this.datasets.get(id);
  }

  async createDataset(insertDataset: InsertDataset): Promise<Dataset> {
    const dataset: Dataset = {
      ...insertDataset,
      status: insertDataset.status || "live",
      createdAt: new Date(),
    };
    this.datasets.set(dataset.id, dataset);
    return dataset;
  }

  async createAiQuery(insertQuery: InsertAiQuery): Promise<AiQuery> {
    const id = randomUUID();
    const query: AiQuery = {
      id,
      question: insertQuery.question,
      context: insertQuery.context || null,
      answer: "", // Will be filled by the AI service
      confidence: null,
      sources: null,
      createdAt: new Date(),
    };
    this.aiQueries.set(id, query);
    return query;
  }

  async getRecentQueries(limit: number = 10): Promise<AiQuery[]> {
    const queries = Array.from(this.aiQueries.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return queries;
  }
}

export const storage = new MemStorage();
