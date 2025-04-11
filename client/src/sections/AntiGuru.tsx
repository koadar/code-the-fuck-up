import TerminalBox from "@/components/ui/TerminalBox";
import ImageGlitch from "@/components/ui/ImageGlitch";
import GlitchButton from "@/components/ui/GlitchButton";
import { antiGurus } from "@/lib/data";

export default function AntiGuru() {
  return (
    <section className="py-16 bg-[#181818] relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2">
            <TerminalBox 
              text={'sudo rm -rf /influencer_bullshit/*'} 
              className="inline-block mb-4"
            />
            <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">ANTI-GURU GUIDE</h2>
            <p className="text-gray-400 font-code">Parody of influencer-style courses with "zero value" promises. Learn nothing useful, just like the real things!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {antiGurus.map((guru, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
              <ImageGlitch
                src={guru.image}
                alt={guru.title}
                imageClassName="w-full h-48 object-cover"
              />
              <div className="p-6 relative">
                <div className="absolute top-6 right-6 bg-destructive text-white text-xs font-bold py-1 px-3 rounded-full">
                  PARODY
                </div>
                <h3 className="text-2xl font-bold font-mono text-white mb-3 glitch-hover">{guru.title}</h3>
                <p className="text-gray-400 text-sm font-code mb-6">{guru.description}</p>
                <div className="mb-6">
                  <div className="text-white font-bold font-code mb-2">THIS COURSE INCLUDES:</div>
                  <ul className="text-gray-400 text-sm font-code space-y-2">
                    {guru.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <i className="ri-check-line text-secondary mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold font-mono">{guru.price}</span>
                    <span className="text-gray-500 text-sm line-through ml-2">{guru.originalPrice}</span>
                  </div>
                  <GlitchButton
                    className="bg-primary text-black font-bold py-2 px-6"
                    text={guru.buttonText}
                    onClick={() => {}}
                  >
                    {guru.buttonText}
                  </GlitchButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
