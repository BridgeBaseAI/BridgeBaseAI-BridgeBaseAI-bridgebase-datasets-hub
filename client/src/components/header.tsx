import { useState } from "react";
import { Menu } from "lucide-react";
import logoImg from "@assets/LShYQVVc_400x400_1754533189170.jpg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src={logoImg} 
                alt="BridgeBaseAI Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">BridgeBase Datasets Hub</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('datasets')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Datasets
            </button>
            <button 
              onClick={() => scrollToSection('ai-chat')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              AI Chat
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('datasets')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
              >
                Datasets
              </button>
              <button 
                onClick={() => scrollToSection('ai-chat')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
              >
                AI Chat
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
              >
                About
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
