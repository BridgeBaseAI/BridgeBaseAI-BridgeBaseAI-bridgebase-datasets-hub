import { Database, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToDatasets = () => {
    const element = document.getElementById('datasets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            BridgeBase Datasets Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered insights + real Web3 data. Built for devs, founders, and curious minds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              onClick={scrollToDatasets}
            >
              <Database className="mr-2" size={20} />
              Explore Datasets
            </Button>
            <Button 
              variant="outline"
              className="border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors text-lg font-medium"
              onClick={() => scrollToSection('ai-chat')}
            >
              <Bot className="mr-2" size={20} />
              AI Q&A Chat
            </Button>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 font-medium">
            "Built with zero budget, full vision."
          </p>
        </div>
      </div>
    </section>
  );
}
