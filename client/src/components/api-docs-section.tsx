import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Clock, Bot } from "lucide-react";

export default function ApiDocsSection() {
  return (
    <section id="api-docs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Developer API</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate Web3 data and AI insights into your applications with our REST API endpoints.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Datasets Endpoint */}
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-secondary text-white px-3 py-1 rounded text-sm font-medium">GET</Badge>
                <span className="font-mono text-gray-700">/api/datasets</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Curated Datasets</h3>
              <p className="text-gray-600 mb-4">Returns 5 curated Web3 datasets with metadata, source links, and tags.</p>
              
              <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                <pre className="text-green-400">
{`{
  "datasets": [
    {
      "id": "defi-tvl-analytics",
      "title": "DeFi TVL Analytics",
      "description": "Real-time TVL data across 150+ protocols",
      "source": "https://defillama.com/api",
      "tags": ["defi", "tvl", "defillama"],
      "updateFrequency": "hourly",
      "volume": "150+ protocols"
    }
    // ... 4 more datasets
  ]
}`}
                </pre>
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Shield className="mr-1" size={14} />
                  Rate limited
                </span>
                <span className="flex items-center">
                  <Key className="mr-1" size={14} />
                  No auth required
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Ask Endpoint */}
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">POST</Badge>
                <span className="font-mono text-gray-700">/api/ask</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Assistant Query</h3>
              <p className="text-gray-600 mb-4">Send questions to our DeepSeek-powered AI for Web3 insights.</p>
              
              <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                <pre className="text-green-400">
{`// Request
{
  "question": "What's the current DeFi TVL?",
  "context": "defi-analysis"
}

// Response
{
  "answer": "Current DeFi TVL is $140.7B...",
  "sources": ["defillama.com"],
  "confidence": 0.95
}`}
                </pre>
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Bot className="mr-1" size={14} />
                  DeepSeek powered
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1" size={14} />
                  Real-time
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Implementation Examples */}
        <Card className="mt-12 bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Implementation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">JavaScript / Node.js</h4>
                <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                  <pre className="text-green-400">
{`// Fetch datasets
const datasets = await fetch('/api/datasets')
  .then(res => res.json());

// Ask AI question  
const response = await fetch('/api/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Analyze DeFi trends'
  })
});`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Python</h4>
                <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                  <pre className="text-green-400">
{`import requests

# Get datasets
datasets = requests.get('/api/datasets').json()

# Query AI
response = requests.post('/api/ask', json={
    'question': 'What are NFT trends?'
}).json()`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
