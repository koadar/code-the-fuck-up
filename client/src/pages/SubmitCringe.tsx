import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitchButton from "@/components/ui/GlitchButton";
import { useEffect, useState } from "react";

export default function SubmitCringe() {
  const [fuckItMode, setFuckItMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit handler
    alert("Thanks for submitting your cringe!");
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-3xl font-bold font-mono text-white mb-6 uppercase">SUBMIT YOUR CRINGE</h1>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code h-32"
            />
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full py-2 px-3 bg-[#242424] border border-[#2a2a2a] rounded text-white font-code"
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
