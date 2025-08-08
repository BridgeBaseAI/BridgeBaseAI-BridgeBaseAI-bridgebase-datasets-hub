import Header from "../components/header";
import HeroSection from "../components/hero-section";
import AboutSection from "../components/about-section";
import FeaturesSection from "../components/features-section";
import DatasetsSection from "../components/datasets-section";
import AiAssistantSection from "../components/ai-assistant-section";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <DatasetsSection />
      <AiAssistantSection />
      <Footer />
    </div>
  );
}
