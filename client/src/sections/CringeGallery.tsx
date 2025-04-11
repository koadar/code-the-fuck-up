import TerminalBox from "@/components/ui/TerminalBox";
import ImageGlitch from "@/components/ui/ImageGlitch";
import { cringeGallery } from "@/lib/data";

interface CringeGalleryProps {
  fuckItMode: boolean;
}

export default function CringeGallery({ fuckItMode }: CringeGalleryProps) {
  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2">
            <TerminalBox 
              text={'find /linkedin -name "*.cringe" | sort -r'} 
              className="inline-block mb-4"
            />
            <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase">CRINGE GALLERY</h2>
            <p className="text-gray-400 font-code">Screenshots of awful LinkedIn flexes, resume disasters, and self-important tech posts that make us all die inside.</p>
          </div>
          <div className="w-full md:w-1/2 md:text-right mt-6 md:mt-0">
            <a href="#" className="inline-flex items-center text-secondary hover:text-white transition duration-200">
              <span className="mr-2 font-code">SUBMIT YOUR CRINGE</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cringeGallery.map((item, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
              <ImageGlitch
                src={item.image}
                alt={item.title}
                imageClassName="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-mono text-white font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm font-code mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-code">Submitted by <span className="text-secondary">@{item.submittedBy}</span></span>
                  <button className="text-gray-400 hover:text-primary">
                    <i className="ri-skull-fill"></i>
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
