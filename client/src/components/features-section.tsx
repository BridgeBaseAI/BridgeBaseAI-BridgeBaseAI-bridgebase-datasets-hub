import { Database, Bot, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Database className="text-blue-600" size={32} />,
      title: "Real Blockchain Data",
      description: "Access live data from NFTs, DeFi protocols, DAOs, Bitcoin, and Ethereum networks with real-time updates."
    },
    {
      icon: <Bot className="text-purple-600" size={32} />,
      title: "AI Chat Assistant",
      description: "Get instant insights using OpenRouter API. Ask questions about blockchain trends and market analytics."
    },
    {
      icon: <Code className="text-green-600" size={32} />,
      title: "Developer-Friendly REST API",
      description: "Easy-to-use API endpoints with no signup required. Perfect for developers building Web3 applications."
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      title: "Zero Budget, Full Vision",
      description: "Built without external funding, proving that resourceful founders can create valuable tools from scratch."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to explore and analyze Web3 data with AI-powered insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}