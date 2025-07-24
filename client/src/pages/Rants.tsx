import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/ui/BlogCard";
import { hotRants } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Rants() {
  const [fuckItMode, setFuckItMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main className="py-16 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-mono text-white mb-8 uppercase">ALL RANTS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotRants.map((rant, index) => (
              <BlogCard
                key={index}
                title={rant.title}
                excerpt={rant.excerpt}
                timeAgo={rant.timeAgo}
                heatCount={rant.heatCount}
                author={rant.author}
                category="RANT"
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
