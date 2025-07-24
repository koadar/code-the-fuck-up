import GlitchButton from "@/components/ui/GlitchButton";
import GlitchText from "@/components/ui/GlitchText";
import TypingText from "@/components/ui/TypingText";
import ImageGlitch from "@/components/ui/ImageGlitch";
import { useState } from "react";

export default function Hero() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  
  const quotes = [
    "Fuck it, ship it. We'll fix the bugs in production like real devs.",
    "Your code is bad and you should feel bad. Ship it anyway.",
    "When in doubt, blame the front-end developer.",
    "Legacy code: Code written by the person who left last week.",
    "There are two types of code: code that doesn't work, and code you don't understand."
  ];
  
  const deployOrDie = () => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setShowQuoteModal(true);
  };

  return (
    <section id="hero" className="relative py-20 overflow-hidden bg-[#181818]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-white leading-tight mb-6">
              <div className="mb-2">
                <TypingText text="NO BULLSHIT." />
              </div>
              <GlitchText className="mb-2">JUST RAW DEV</GlitchText>
              <div className="text-primary">REALITY.</div>
            </h1>
            <p className="text-lg font-code text-gray-300 mb-8">
              A platform for developers tired of the fake tech influencer culture, 
              over-polished tutorials, and corporate vanilla blog posts.
            </p>
            <div className="flex flex-wrap items-center">
              <GlitchButton 
                className="bg-[#39ff14] text-black font-bold py-3 px-6 mr-4 mb-4 md:mb-0" 
                text="DEPLOY OR DIE"
                onClick={deployOrDie}
              >
                DEPLOY OR DIE <i className="ri-rocket-2-fill ml-1"></i>
              </GlitchButton>
              <a href="#" className="inline-flex items-center text-secondary hover:text-white transition duration-200 mb-4 md:mb-0">
                <span className="mr-2 font-code">CONFESS YOUR CODE SINS</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <ImageGlitch 
              src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg" 
              alt="Punk developer with glitch effect" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      
      {/* Deploy or Die Quote Modal */}
      {showQuoteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
            onClick={() => setShowQuoteModal(false)}
          ></div>
          <div className="bg-[#1a1a1a] border border-primary relative z-10 max-w-md w-full p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono text-white">DEPLOY OR DIE WISDOM</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowQuoteModal(false)}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="border border-[#39ff14] bg-black/70 p-4 font-terminal w-full mb-4">
              <div className="terminal-content text-[#39ff14]">
                <span>{currentQuote}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                className="text-secondary font-code hover:text-white"
                onClick={() => setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])}
              >
                GIVE ME ANOTHER →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
