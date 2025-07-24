import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useState, useEffect } from "react";

export default function ResumeBuilderPage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Congrats ${name}! Your totally truthful resume is ready (not really).`);
    setName("");
    setSkills("");
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-4xl font-bold font-mono text-white mb-6 uppercase">REAL RESUME BUILDER</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code"
              required
            />
            <textarea
              placeholder="Your Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code h-32"
              required
            />
            <GlitchButton type="submit" className="bg-primary text-black font-bold py-2 px-4" text="BUILD IT">
              BUILD IT
            </GlitchButton>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
