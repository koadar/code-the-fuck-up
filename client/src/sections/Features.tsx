import TerminalBox from "@/components/ui/TerminalBox";
import { features } from "@/lib/data";
import { useState } from "react";

export default function Features() {
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  
  const quotes = [
    "Fuck it, ship it. We'll fix the bugs in production like real devs.",
    "Your code is bad and you should feel bad. Ship it anyway.",
    "When in doubt, blame the front-end developer.",
    "Legacy code: Code written by the person who left last week.",
    "There are two types of code: code that doesn't work, and code you don't understand.",
    "It's not a bug, it's an undocumented feature.",
    "The best error message is the one that never shows up because you actually tested your code.",
    "Programming is like sex: One mistake and you have to support it for the rest of your life."
  ];
  
  const deployOrDie = () => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setShowDeployModal(true);
  };

  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <TerminalBox 
            text={'ls -la /crazy_features'} 
            className="inline-block mb-4"
          />
          <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">CRAZY FEATURES</h2>
          <p className="text-gray-400 font-code max-w-2xl mx-auto">Tools, widgets, and digital therapy for the modern developer's existential crisis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-2xl text-primary`}></i>
              </div>
              <h3 className="text-xl font-bold font-mono text-white mb-3 glitch-hover">{feature.title}</h3>
              <p className="text-gray-400 text-sm font-code mb-4">{feature.description}</p>
              
              {feature.id === 'deploy-or-die' ? (
                <button
                  onClick={deployOrDie}
                  className="text-secondary font-code hover:text-white transition text-sm"
                >
                  {feature.buttonText}
                </button>
              ) : (
                <button 
                  onClick={() => alert(`🔧 ${feature.title}: ${feature.description} - Coming soon!`)}
                  className="text-secondary font-code hover:text-white transition text-sm"
                >
                  {feature.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Deploy or Die Quote Modal */}
      {showDeployModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
            onClick={() => setShowDeployModal(false)}
          ></div>
          <div className="bg-[#1a1a1a] border border-primary relative z-10 max-w-md w-full p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono text-white">DEPLOY OR DIE WISDOM</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowDeployModal(false)}>
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
