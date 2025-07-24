import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useState, useEffect } from "react";

export default function RageModePage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [rage, setRage] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold font-mono text-white mb-6 uppercase">RAGE COMMENT MODE</h1>
          <p className="text-gray-400 font-code mb-4">
            Toggle between a profanity-laced comment and a safe for work reaction.
          </p>
          <div className="mb-6">
            <GlitchButton
              onClick={() => setRage(!rage)}
              className="bg-primary text-black font-bold py-2 px-4"
              text="TOGGLE RAGE MODE"
            >
              TOGGLE RAGE MODE
            </GlitchButton>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            {rage ? (
              <p className="text-red-400 font-code">
                This article is complete bullshit. Whoever wrote it clearly hasn\'t touched real code in years.
              </p>
            ) : (
              <p className="text-gray-300 font-code">
                Interesting take! I\'ll have to give these tips a try when I\'m back at my desk.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
