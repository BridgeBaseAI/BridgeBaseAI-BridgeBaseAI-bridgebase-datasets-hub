// Inline storage for Vercel serverless
interface Dataset {
  id: string;
  title: string;
  description: string;
  source: string;
  tags: string[];
  updateFrequency: string;
  volume: string;
  category: string;
  status: string;
  createdAt: Date;
}

const datasets: Dataset[] = [
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
    createdAt: new Date()
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
    createdAt: new Date()
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
    createdAt: new Date()
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
    createdAt: new Date()
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
    createdAt: new Date()
  }
];

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.json({ datasets });
  } catch (error) {
    console.error("Error fetching datasets:", error);
    res.status(500).json({ 
      error: "Failed to fetch datasets",
      message: "Unable to retrieve Web3 datasets. Please try again later."
    });
  }
}