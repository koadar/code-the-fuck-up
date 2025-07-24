import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useEffect, useState } from "react";

export default function SubmitStory() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Story submitted! Thanks for keeping it real.");
    setTitle("");
    setStory("");
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#181818] min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-3xl font-bold font-mono text-white mb-6 uppercase">SUBMIT YOUR STORY</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Title"
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code"
            />
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
              placeholder="Your story"
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code h-40"
            />
            <GlitchButton type="submit" text="SUBMIT" className="bg-primary text-black font-bold py-2 px-4">
              SUBMIT
            </GlitchButton>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
