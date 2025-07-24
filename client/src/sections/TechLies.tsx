import TerminalBox from "@/components/ui/TerminalBox";
import { techLies } from "@/lib/data";
import { Link } from "wouter";

interface TechLiesProps {
  fuckItMode: boolean;
}

export default function TechLies({ fuckItMode }: TechLiesProps) {
  return (
    <section id="tech-lies" className="py-16 bg-[#181818] relative">
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
            <Link href="/tech-lies" className="inline-flex items-center text-secondary hover:text-white transition duration-200">
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
                <Link href="/tech-lies" className="text-secondary font-code hover:text-white transition">READ FULL TAKEDOWN →</Link>
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
    </section>
  );
}
