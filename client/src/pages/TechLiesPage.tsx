import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalBox from "@/components/ui/TerminalBox";
import { techLies } from "@/lib/data";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function TechLiesPage() {
  const [fuckItMode, setFuckItMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#181818] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <TerminalBox text={'grep -r "bullshit" ./tech_industry'} className="inline-block mb-4" />
            <h1 className="text-4xl font-bold font-mono text-white uppercase">TECH LIES WE SWALLOWED</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techLies.map((lie, index) => (
              <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg slanted-bg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-error-warning-fill text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white glitch-hover">{lie.title}</h3>
                </div>
                <p className="text-gray-400 font-code mb-6">{lie.content}</p>
                <div className="flex items-center justify-between">
                  <Link href="/tech-lies" className="text-secondary font-code hover:text-white transition">
                    READ FULL TAKEDOWN →
                  </Link>
                  <div className="flex items-center">
                    <button className="mr-3 text-gray-400 hover:text-primary">
                      <i className="ri-thumb-up-line"></i>
                    </button>
                    <span className="text-gray-500 text-sm">{lie.likes}</span>
                  </div>
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
