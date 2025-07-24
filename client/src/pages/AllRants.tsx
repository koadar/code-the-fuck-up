import { useState } from "react";
import { Link } from "wouter";
import { hotRants } from "@/lib/data";
import BlogCard from "@/components/ui/BlogCard";
import TerminalBox from "@/components/ui/TerminalBox";

export default function AllRants() {
  const [sortBy, setSortBy] = useState<'latest' | 'heat' | 'controversial'>('latest');
  const [filterBy, setFilterBy] = useState<'all' | 'javascript' | 'react' | 'backend'>('all');

  const getSortedRants = () => {
    let sorted = [...hotRants];
    
    switch (sortBy) {
      case 'heat':
        sorted.sort((a, b) => b.heatCount - a.heatCount);
        break;
      case 'controversial':
        sorted.sort((a, b) => Math.random() - 0.5);
        break;
      default:
        // latest is already in order
        break;
    }
    
    return sorted;
  };

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO MAIN
          </Link>
          
          <TerminalBox 
            text="find /rants -type f -name '*.rage' | sort -nr" 
            className="mb-4"
          />
          
          <h1 className="text-4xl font-bold font-mono text-white mb-4 uppercase">
            ALL HOT RANTS
          </h1>
          <p className="text-gray-400 font-code mb-8">
            Every single rage-fueled rant from developers who've had enough of the bullshit.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-code text-sm">SORT BY:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-3 py-1 rounded"
            >
              <option value="latest">Latest</option>
              <option value="heat">Most Heat</option>
              <option value="controversial">Most Controversial</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-code text-sm">FILTER:</span>
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-3 py-1 rounded"
            >
              <option value="all">All Rants</option>
              <option value="javascript">JavaScript Rage</option>
              <option value="react">React Nightmares</option>
              <option value="backend">Backend Hell</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedRants().map((rant, index) => (
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
    </div>
  );
}