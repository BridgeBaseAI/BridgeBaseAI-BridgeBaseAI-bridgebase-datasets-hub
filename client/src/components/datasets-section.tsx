import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Image, Users, Bitcoin, Zap, Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Dataset } from "@shared/schema";

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'defi':
      return <TrendingUp className="text-primary-600" size={24} />;
    case 'nft':
      return <Image className="text-accent-600" size={24} />;
    case 'dao':
      return <Users className="text-secondary-600" size={24} />;
    case 'blockchain':
      return <Bitcoin className="text-orange-500" size={24} />;
    default:
      return <Zap className="text-purple-500" size={24} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'defi':
      return 'bg-primary/10';
    case 'nft':
      return 'bg-yellow-500/10';
    case 'dao':
      return 'bg-secondary/10';
    case 'blockchain':
      return 'bg-orange-500/10';
    default:
      return 'bg-purple-500/10';
  }
};

const getStatusBadge = (status: string) => {
  const isLive = status === 'live';
  return (
    <Badge className={`${isLive ? 'bg-secondary/20 text-secondary-600' : 'bg-orange-500/20 text-orange-700'} px-3 py-1 rounded-full text-sm font-medium`}>
      {isLive ? 'Live' : 'Historical'}
    </Badge>
  );
};

export default function DatasetsSection() {
  const { data: datasetsResponse, isLoading, error } = useQuery({
    queryKey: ['/api/datasets'],
  });

  const datasets = (datasetsResponse as any)?.datasets || [];

  if (error) {
    return (
      <section id="datasets" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Datasets</h2>
            <p className="text-red-600">Failed to load Web3 datasets. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="datasets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Web3 Data Sources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access live blockchain data across NFTs, DeFi, DAOs, Bitcoin, and Ethereum. No signup required.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-gray-50 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {datasets.map((dataset: Dataset) => (
              <Card key={dataset.id} className="bg-gray-50 hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${getCategoryColor(dataset.category)} rounded-lg flex items-center justify-center`}>
                      {getCategoryIcon(dataset.category)}
                    </div>
                    {getStatusBadge(dataset.status)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{dataset.title}</h3>
                  <p className="text-gray-600 mb-4">{dataset.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dataset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <TrendingUp className="mr-1" size={14} />
                      Updated {dataset.updateFrequency}
                    </span>
                    <span className="flex items-center">
                      <Link className="mr-1" size={14} />
                      {dataset.volume}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    onClick={() => window.open(dataset.source, '_blank')}
                  >
                    Access Dataset
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
