export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About BridgeBaseAI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't raise money — we raise intelligence.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              BridgeBaseAI is building the future using just human brains + AI with no external funding. 
              Our mission is to show that resourceful founders can win. We don't need venture capital 
              when we have vision, talent, and the unstoppable force of builders who believe in 
              creating value from zero.
            </p>
            <div className="text-center">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                <span className="text-gray-600 font-medium">Built with zero budget, full vision.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}