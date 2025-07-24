import { useState } from "react";
import { Link } from "wouter";
import { techLies } from "@/lib/data";
import TerminalBox from "@/components/ui/TerminalBox";

export default function AllTechLies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'likes' | 'alphabetical' | 'danger'>('likes');

  const getFilteredLies = () => {
    let filtered = techLies.filter(lie => 
      lie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lie.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'danger':
        filtered.sort((a, b) => Math.random() - 0.5);
        break;
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-[#181818] pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO MAIN
          </Link>
          
          <TerminalBox 
            text='grep -r "bullshit|lies|fake" ./tech_industry | wc -l' 
            className="mb-4"
          />
          
          <h1 className="text-4xl font-bold font-mono text-white mb-4 uppercase">
            COMPLETE TECH LIES DATABASE
          </h1>
          <p className="text-gray-400 font-code mb-8">
            Every lie, myth, and piece of bullshit that the tech industry has fed us over the years.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for lies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-2 rounded"
          />
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-3 py-2 rounded"
          >
            <option value="likes">Most Agreed Upon</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="danger">Danger Level</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {getFilteredLies().map((lie, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg slanted-bg hover:scale-105 transition-transform cursor-pointer"
                 onClick={() => window.location.href = `/tech-lies/${lie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-error-warning-fill text-2xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold font-mono text-white glitch-hover">{lie.title}</h3>
              </div>
              <p className="text-gray-400 font-code mb-6">{lie.content}</p>
              <div className="flex items-center justify-between">
                <Link 
                  href={`/tech-lies/${lie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="text-secondary font-code hover:text-white transition"
                >
                  READ FULL TAKEDOWN →
                </Link>
                <div className="flex items-center">
                  <button 
                    onClick={() => alert("Thanks for agreeing this is bullshit!")}
                    className="mr-3 text-gray-400 hover:text-primary"
                  >
                    <i className="ri-thumb-up-line"></i>
                  </button>
                  <span className="text-gray-500 text-sm">{lie.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredLies().length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 font-code">No lies found matching your search. That's suspicious...</p>
          </div>
        )}
      </div>
    </div>
  );
}