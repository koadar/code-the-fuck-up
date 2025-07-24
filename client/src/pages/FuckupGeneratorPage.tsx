import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useState, useEffect } from "react";
import { devStories } from "@/lib/data";

export default function FuckupGeneratorPage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [story, setStory] = useState(devStories[0].content);

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  const generate = () => {
    const random = devStories[Math.floor(Math.random() * devStories.length)];
    setStory(random.content);
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold font-mono text-white mb-6 uppercase">DAILY FUCK-UP GENERATOR</h1>
          <GlitchButton onClick={generate} className="bg-primary text-black font-bold py-2 px-4 mb-6" text="GENERATE">
            GENERATE CATASTROPHE
          </GlitchButton>
          <div className="prose prose-invert max-w-none font-code" dangerouslySetInnerHTML={{ __html: story }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
