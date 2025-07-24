import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";
import { devStories } from "@/lib/data";
import { Link } from "wouter";
import { useState } from "react";

interface RealDevsProps {
  fuckItMode: boolean;
}

export default function RealDevs({ fuckItMode }: RealDevsProps) {
  const [currentStories, setCurrentStories] = useState(devStories);
  const [loading, setLoading] = useState(false);

  const loadMoreStories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/features/dev-stories?limit=3');
      const data = await response.json();
      setCurrentStories(prev => [...prev, ...data]);
    } catch (error) {
      alert('Failed to load more stories. The backend is probably broken again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-16 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2">
            <TerminalBox 
              text={'cat /dev/reality | grep "truth"'} 
              className="inline-block mb-4"
            />
            <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">REAL DEVS, REAL SHIT</h2>
            <p className="text-gray-400 font-code">User-submitted stories of failure, burnout, breakthroughs, and the weird reality of being a developer.</p>
          </div>
          <div className="w-full md:w-1/2 md:text-right mt-6 md:mt-0">
            <Link href="/submit-story">
              <GlitchButton
                className="bg-primary text-black font-bold py-2 px-4"
                text="SUBMIT YOUR STORY"
              >
                SUBMIT YOUR STORY <i className="ri-arrow-right-line ml-1"></i>
              </GlitchButton>
            </Link>
          </div>
        </div>

        {currentStories.map((story, index) => (
          <div key={index} className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-4 flex items-center">
              <img src={story.author.image} alt="Developer photo" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-mono text-white font-bold">{story.title}</h4>
                <span className="text-xs text-gray-400 font-code">by <span className="text-secondary">@{story.author.username}</span> • {story.timeAgo}</span>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none mb-6 font-code text-gray-300" dangerouslySetInnerHTML={{ __html: story.content }}>
            </div>
            
            <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center">
                <button 
                  onClick={() => alert("❤️ You relate to this dev pain!")}
                  className="flex items-center text-gray-400 hover:text-primary mr-4"
                >
                  <i className="ri-heart-line mr-1"></i>
                  <span className="text-sm">{story.likes}</span>
                </button>
                <button 
                  onClick={() => alert("💬 Comments coming soon! For now, rant about it on Twitter.")}
                  className="flex items-center text-gray-400 hover:text-primary"
                >
                  <i className="ri-chat-1-line mr-1"></i>
                  <span className="text-sm">{story.comments}</span>
                </button>
              </div>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: story.title,
                      text: "Check out this real dev story",
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("📋 Link copied! Share this reality check with fellow devs.");
                  }
                }}
                className="text-secondary hover:text-white font-code text-sm"
              >
                SHARE THIS REALITY CHECK
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button 
            onClick={loadMoreStories}
            disabled={loading}
            className="border border-[#2a2a2a] text-gray-400 font-code py-3 px-6 hover:bg-[#242424] transition disabled:opacity-50"
          >
            {loading ? 'LOADING MORE DISASTERS...' : 'LOAD MORE REAL DEV STORIES'}
          </button>
        </div>
      </div>
    </section>
  );
}
