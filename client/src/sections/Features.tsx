import TerminalBox from "@/components/ui/TerminalBox";
import { features } from "@/lib/data";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function Features() {
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [showConfessionModal, setShowConfessionModal] = useState(false);
  const [showFuckupModal, setShowFuckupModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [confessionText, setConfessionText] = useState("");
  const [currentFuckup, setCurrentFuckup] = useState<any>(null);
  const [rageMode, setRageMode] = useState(false);
  
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

  const handleFeatureClick = async (featureId: string) => {
    switch (featureId) {
      case 'rage-mode':
        const newRageMode = !rageMode;
        setRageMode(newRageMode);
        try {
          await fetch('/api/features/rage-mode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: newRageMode }),
          });
          alert(`🔥 Rage mode ${newRageMode ? 'ENABLED' : 'DISABLED'}! ${newRageMode ? 'Prepare for uncensored developer fury!' : 'Back to civilized discourse.'}`);
        } catch (error) {
          alert('Failed to toggle rage mode. The system is probably broken, just like everything else.');
        }
        break;
        
      case 'resume-builder':
        setShowResumeModal(true);
        break;
        
      case 'linkedin-filter':
        alert('🔍 LinkedIn Filter activated! Now generating sarcastic responses to "I\'m humbled to announce..." posts. Feature coming soon!');
        break;
        
      case 'deploy-or-die':
        deployOrDie();
        break;
        
      case 'fuckup-generator':
        try {
          const response = await fetch('/api/features/daily-fuckup');
          const data = await response.json();
          setCurrentFuckup(data);
          setShowFuckupModal(true);
        } catch (error) {
          alert('Failed to generate daily fuckup. Ironically, this failure is your daily fuckup.');
        }
        break;
        
      case 'confession-booth':
        setShowConfessionModal(true);
        break;
        
      default:
        alert(`🔧 ${featureId}: Coming soon! (Translation: we haven't built it yet)`);
    }
  };

  const submitConfession = async () => {
    if (!confessionText.trim()) {
      alert('Your confession cannot be empty. We need details!');
      return;
    }
    
    try {
      const response = await fetch('/api/features/confession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confession: confessionText,
          anonymous: true
        }),
      });
      
      const data = await response.json();
      alert(data.message);
      setConfessionText('');
      setShowConfessionModal(false);
    } catch (error) {
      alert('Failed to submit confession. Even our confession booth is broken.');
    }
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
              
              <button 
                onClick={() => handleFeatureClick(feature.id)}
                className="text-secondary font-code hover:text-white transition text-sm"
              >
                {feature.buttonText}
              </button>
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

      {/* Confession Booth Modal */}
      {showConfessionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
            onClick={() => setShowConfessionModal(false)}
          ></div>
          <div className="bg-[#1a1a1a] border border-primary relative z-10 max-w-md w-full p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono text-white">CODE CONFESSION BOOTH</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowConfessionModal(false)}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <p className="text-gray-400 font-code text-sm mb-4">Confess your dev sins anonymously. No judgment, only understanding.</p>
            <textarea
              value={confessionText}
              onChange={(e) => setConfessionText(e.target.value)}
              placeholder="I once pushed to production on Friday at 5pm..."
              className="w-full h-32 bg-black/70 border border-[#39ff14] text-[#39ff14] p-3 font-terminal text-sm resize-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <button 
                className="text-gray-400 font-code hover:text-white"
                onClick={() => setShowConfessionModal(false)}
              >
                CANCEL
              </button>
              <button 
                className="text-secondary font-code hover:text-white"
                onClick={submitConfession}
              >
                CONFESS SINS →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Fuckup Modal */}
      {showFuckupModal && currentFuckup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
            onClick={() => setShowFuckupModal(false)}
          ></div>
          <div className="bg-[#1a1a1a] border border-primary relative z-10 max-w-lg w-full p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono text-white">DAILY CATASTROPHE</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowFuckupModal(false)}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold font-mono text-primary mb-2">{currentFuckup.title}</h4>
              <p className="text-gray-300 font-code text-sm mb-3">{currentFuckup.story}</p>
              <div className="text-xs text-gray-500 font-code">
                By <span className="text-secondary">@{currentFuckup.author}</span> • {currentFuckup.timestamp}
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                className="text-secondary font-code hover:text-white"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/features/daily-fuckup');
                    const data = await response.json();
                    setCurrentFuckup(data);
                  } catch (error) {
                    alert('Failed to generate another fuckup.');
                  }
                }}
              >
                GIVE ME ANOTHER DISASTER →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Builder Modal */}
      {showResumeModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
            onClick={() => setShowResumeModal(false)}
          ></div>
          <div className="bg-[#1a1a1a] border border-primary relative z-10 max-w-2xl w-full p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono text-white">TRUTHFUL RESUME GENERATOR</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowResumeModal(false)}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="border border-[#39ff14] bg-black/70 p-4 font-terminal text-[#39ff14] mb-4 max-h-96 overflow-y-auto">
              <div className="text-sm">
                <h4 className="text-lg mb-2">JOHN DEV - FULL-STACK DEVELOPER</h4>
                <p className="mb-2">Email: definitely.not.copy.pasting.from.stackoverflow@gmail.com</p>
                <p className="mb-4">LinkedIn: /in/10x-developer-thought-leader</p>
                
                <h5 className="font-bold mb-1">EXPERIENCE:</h5>
                <p className="mb-1">• Senior Full-Stack Developer (6 months)</p>
                <p className="mb-1">  - Built scalable applications (copied tutorials)</p>
                <p className="mb-1">  - Optimized database queries (added indexes after site crashed)</p>
                <p className="mb-1">  - Led team initiatives (complained loudly in Slack)</p>
                <p className="mb-3">  - Mentored junior developers (told them "just Google it")</p>
                
                <h5 className="font-bold mb-1">SKILLS:</h5>
                <p className="mb-1">• JavaScript (can write console.log)</p>
                <p className="mb-1">• React (knows useState exists)</p>
                <p className="mb-1">• Node.js (installed once)</p>
                <p className="mb-1">• MongoDB (thinks it's web scale)</p>
                <p className="mb-1">• AWS (scared of the billing)</p>
                <p className="mb-3">• Git (force pushes to main)</p>
                
                <h5 className="font-bold mb-1">ACHIEVEMENTS:</h5>
                <p className="mb-1">• Reduced bugs by 90% (stopped testing)</p>
                <p className="mb-1">• Improved performance by 200% (removed features)</p>
                <p className="mb-1">• Led successful migrations (broke everything, called it microservices)</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                className="text-secondary font-code hover:text-white"
                onClick={() => alert('Resume copied to clipboard! Use at your own professional risk.')}
              >
                COPY RESUME →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
