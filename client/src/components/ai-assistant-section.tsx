import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Bot, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Web3 AI assistant. I can help you analyze DeFi protocols, NFT trends, DAO governance, and blockchain data. What would you like to explore?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const askAIMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest('POST', '/api/ask', { question });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString() + '_assistant',
        role: 'assistant',
        content: data.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error) => {
      toast({
        title: "AI Assistant Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive",
      });
      console.error('AI query error:', error);
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    askAIMutation.mutate(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Analyze Ethereum gas fees",
    "DAO treasury trends", 
    "NFT market recovery"
  ];

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    askAIMutation.mutate(question);
  };

  return (
    <section id="ai-chat" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Chat Assistant</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant insights on Web3 data using OpenRouter API. Ask about blockchain trends, DeFi protocols, or NFT markets.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              {/* Chat Interface */}
              <div className="h-96 bg-gray-50 rounded-xl p-4 mb-4 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'assistant' ? 'bg-primary' : 'bg-gray-300'
                      }`}>
                        {message.role === 'assistant' ? 
                          <Bot className="text-white" size={16} /> : 
                          <User className="text-gray-600" size={16} />
                        }
                      </div>
                      <div className={`rounded-lg p-3 max-w-md ${
                        message.role === 'assistant' 
                          ? 'bg-white text-gray-800' 
                          : 'bg-primary text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {askAIMutation.isPending && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="text-white" size={16} />
                      </div>
                      <div className="bg-white rounded-lg p-3 max-w-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Input Area */}
              <div className="flex space-x-4">
                <Input 
                  type="text" 
                  placeholder="Ask about Web3 data, DeFi trends, NFT markets..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={askAIMutation.isPending}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={askAIMutation.isPending || !inputValue.trim()}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <Send size={20} />
                </Button>
              </div>
              
              {/* Quick Questions */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Try these questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      disabled={askAIMutation.isPending}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
