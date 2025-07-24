import TerminalBox from "@/components/ui/TerminalBox";
import { techLies } from "@/lib/data";
import { Link } from "wouter";

interface TechLiesProps {
  fuckItMode: boolean;
}

export default function TechLies({ fuckItMode }: TechLiesProps) {
  return (
    <section className="py-16 bg-[#181818] relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2">
            <TerminalBox 
              text={'grep -r "bullshit" ./tech_industry'} 
              className="inline-block mb-4"
            />
            <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">TECH LIES WE SWALLOWED</h2>
            <p className="text-gray-400 font-code">Busting myths, influencer lies, and fake job titles one painful truth at a time.</p>
          </div>
          <div className="w-full md:w-1/2 md:text-right mt-6 md:mt-0">
            <Link
              href="/tech-lies"
              className="inline-flex items-center text-secondary hover:text-white transition duration-200"
            >
              <span className="mr-2 font-code">VIEW ALL TECH LIES</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
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
                <Link 
                  href={`/tech-lies/${lie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="text-secondary font-code hover:text-white transition"
                >
                  READ FULL TAKEDOWN →
                </Link>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => alert("👍 Thanks for agreeing this is bullshit! Your validation helps us fight the tech industry's reality distortion field.")}
                    className="text-gray-400 hover:text-primary flex items-center gap-1"
                  >
                    <i className="ri-thumb-up-line"></i>
                    <span className="text-sm">{lie.likes}</span>
                  </button>
                  <button 
                    onClick={() => {
                      const responses = [
                        "Been burned by this lie too? Share your painful story!",
                        "Know more examples of this bullshit in action? Submit them!",
                        "Help us expose more lies like this - submit your evidence!",
                        "This lie cost you time/money? Share the damage report!"
                      ];
                      alert(responses[Math.floor(Math.random() * responses.length)]);
                    }}
                    className="text-secondary font-code hover:text-white text-sm"
                  >
                    SHARE YOUR PAIN →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
