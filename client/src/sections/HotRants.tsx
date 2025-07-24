import TerminalBox from "@/components/ui/TerminalBox";
import BlogCard from "@/components/ui/BlogCard";
import { useEffect, useState } from "react";
import { hotRants } from "@/lib/data";
import { Link } from "wouter";

interface HotRantsProps {
  fuckItMode: boolean;
}

export default function HotRants({ fuckItMode }: HotRantsProps) {
  const [rants, setRants] = useState(hotRants);
  
  useEffect(() => {
    if (fuckItMode) {
      // Add some extra spicy content for fuck it mode
      const extremeRants = [
        ...hotRants,
        {
          title: "🔥 FUCK IT MODE: Why I Deployed on Friday",
          excerpt: "Everyone said don't deploy on Friday. I said fuck it and pushed anyway. Spoiler: It broke everything and I spent the weekend fixing it. Would I do it again? Absolutely.",
          timeAgo: "2 hours ago",
          heatCount: 420,
          author: {
            name: "Deploy Yolo",
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
            username: "DeployYolo"
          }
        }
      ];
      setRants(extremeRants);
    } else {
      setRants(hotRants);
    }
  }, [fuckItMode]);

  return (
    <section className="py-16 bg-[#121212]">
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
            <Link
              href="/rants"
              className="inline-flex items-center text-secondary hover:text-white transition duration-200"
            >
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
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
