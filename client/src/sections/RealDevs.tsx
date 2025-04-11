import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";
import { devStories } from "@/lib/data";

interface RealDevsProps {
  fuckItMode: boolean;
}

export default function RealDevs({ fuckItMode }: RealDevsProps) {
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
            <GlitchButton
              className="bg-primary text-black font-bold py-2 px-4"
              text="SUBMIT YOUR STORY"
              onClick={() => {}}
            >
              SUBMIT YOUR STORY <i className="ri-arrow-right-line ml-1"></i>
            </GlitchButton>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4 flex items-center">
            <img src={devStories[0].author.image} alt="Developer photo" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-mono text-white font-bold">{devStories[0].title}</h4>
              <span className="text-xs text-gray-400 font-code">by <span className="text-secondary">@{devStories[0].author.username}</span> • {devStories[0].timeAgo}</span>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none mb-6 font-code text-gray-300" dangerouslySetInnerHTML={{ __html: devStories[0].content }}>
          </div>
          
          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-4">
            <div className="flex items-center">
              <button className="flex items-center text-gray-400 hover:text-primary mr-4">
                <i className="ri-heart-line mr-1"></i>
                <span className="text-sm">{devStories[0].likes}</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-primary">
                <i className="ri-chat-1-line mr-1"></i>
                <span className="text-sm">{devStories[0].comments}</span>
              </button>
            </div>
            <button className="text-secondary hover:text-white font-code text-sm">
              SHARE THIS REALITY CHECK
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="border border-[#2a2a2a] text-gray-400 font-code py-3 px-6 hover:bg-[#242424] transition">
            LOAD MORE REAL DEV STORIES
          </button>
        </div>
      </div>
    </section>
  );
}
