import About from "@/components/About";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import News from "@/components/News";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Team from "@/components/Team";

export default function Home() {
  return (

    <div className="min-h-screen bg-background my-20">
      
      <main className="overflow-hidden">
        <HeroSection />
        <About />
        <Services />
        <Team />
        <Portfolio />
        <News />
        <Contact />
      </main>

    </div>
  );
}

