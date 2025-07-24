import TerminalBox from "@/components/ui/TerminalBox";
import BlogCard from "@/components/ui/BlogCard";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { hotRants } from "@/lib/data";

interface HotRantsProps {
  fuckItMode: boolean;
}

export default function HotRants({ fuckItMode }: HotRantsProps) {
  const [rants, setRants] = useState(hotRants);
  
  useEffect(() => {
    // In fuck it mode, we could show more extreme content
    if (fuckItMode) {
      // This is where we would load the more extreme content if we had it
      // For now we'll just keep the same content
      setRants(hotRants);
    } else {
      setRants(hotRants);
    }
  }, [fuckItMode]);

  return (
    <section id="hot-rants" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2">
            <TerminalBox 
              text="cd /hot-rants" 
              className="inline-block mb-4"
            />
            <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">HOT RANTS</h2>
            <p className="text-gray-400 font-code">Raw blog posts about the real dev life, no filter, no bullshit.</p>
          </div>
          <div className="w-full md:w-1/2 md:text-right mt-6 md:mt-0">
            <Link href="/rants" className="inline-flex items-center text-secondary hover:text-white transition duration-200">
              <span className="mr-2 font-code">VIEW ALL RANTS</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rants.map((rant, index) => (
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
    </section>
  );
}
