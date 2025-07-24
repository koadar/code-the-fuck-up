import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageGlitch from "@/components/ui/ImageGlitch";
import TerminalBox from "@/components/ui/TerminalBox";
import { cringeGallery } from "@/lib/data";
import { useEffect, useState } from "react";

export default function CringeGalleryPage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <TerminalBox text={'find /linkedin -name "*.cringe" | sort -r'} className="inline-block mb-4" />
            <h1 className="text-4xl font-bold font-mono text-white uppercase">CRINGE GALLERY</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cringeGallery.map((item, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                <ImageGlitch src={item.image} alt={item.title} imageClassName="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-mono text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm font-code mb-3">{item.description}</p>
                  <span className="text-xs text-gray-500 font-code">Submitted by <span className="text-secondary">@{item.submittedBy}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
