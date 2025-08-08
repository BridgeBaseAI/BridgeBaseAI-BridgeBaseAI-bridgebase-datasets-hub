import { SiX, SiGithub } from "react-icons/si";
import logoImg from "@assets/LShYQVVc_400x400_1754533189170.jpg";

export default function Footer() {
  return (
    <footer id="connect" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={logoImg} 
                alt="BridgeBaseAI Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold">BridgeBase Datasets Hub</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered insights + real Web3 data. Built for devs, founders, and curious minds.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/BridgeBaseAI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiX size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SiGithub size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://twitter.com/BridgeBaseAI" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@BridgeBaseAI</a></li>
              <li><a href="https://twitter.com/huzaiii_founder" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@huzaiii_founder</a></li>
              <li><a href="https://bridgebaseai.github.io/Bridgebaseai-v1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Project Website</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub (coming soon)</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">API Endpoints</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white transition-colors">/api/datasets</span></li>
              <li><span className="hover:text-white transition-colors">/api/ask</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BridgeBaseAI. Built with zero budget, full vision.</p>
        </div>
      </div>
    </footer>
  );
}
