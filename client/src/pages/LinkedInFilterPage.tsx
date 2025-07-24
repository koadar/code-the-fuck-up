import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useState, useEffect } from "react";

export default function LinkedInFilterPage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [post, setPost] = useState("");
  const [filtered, setFiltered] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  const handleFilter = () => {
    setFiltered(post.replace(/synergy|disrupt|innovative/gi, "bullshit"));
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#181818] min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold font-mono text-white mb-6 uppercase">LINKEDIN FILTER</h1>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Paste cringe LinkedIn post here"
            className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code h-32 mb-4"
          />
          <GlitchButton
            onClick={handleFilter}
            className="bg-primary text-black font-bold py-2 px-4 mb-6"
            text="FILTER IT"
          >
            FILTER IT
          </GlitchButton>
          {filtered && (
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
              <p className="text-gray-300 font-code whitespace-pre-wrap">{filtered}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
