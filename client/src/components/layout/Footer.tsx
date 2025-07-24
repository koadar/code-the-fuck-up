import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#181818] border-t border-[#2a2a2a] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold font-mono text-primary tracking-wide inline-flex items-center mb-4"
            >
              <span className="mr-1 text-secondary">&lt;</span>
              CODE_THE_FUCK_UP
              <span className="ml-1 text-secondary">/&gt;</span>
            </Link>
            <p className="text-gray-400 font-code mb-4">A no-bullshit platform for developers tired of fake tech influencer culture, over-polished tutorials, and corporate vanilla bullshit.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-discord-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-reddit-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white font-bold font-mono mb-4 uppercase">CONTENT</h3>
            <ul className="text-gray-400 font-code space-y-2">
              <li><a href="#hot-rants" className="hover:text-white">Hot Rants</a></li>
              <li><a href="#tech-lies" className="hover:text-white">Tech Lies We Swallowed</a></li>
              <li><a href="#cringe-gallery" className="hover:text-white">Cringe Gallery</a></li>
              <li><a href="#real-devs" className="hover:text-white">Real Devs, Real Shit</a></li>
              <li><a href="#features" className="hover:text-white">Build. Burn. Rebuild.</a></li>
              <li><a href="#anti-guru" className="hover:text-white">Anti-Guru Guide</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white font-bold font-mono mb-4 uppercase">FEATURES</h3>
            <ul className="text-gray-400 font-code space-y-2">
              <li><Link href="/" className="hover:text-white">Rage Comment Mode</Link></li>
              <li><Link href="/" className="hover:text-white">Real Resume Builder</Link></li>
              <li><Link href="/" className="hover:text-white">LinkedIn Filter</Link></li>
              <li><Link href="/" className="hover:text-white">Deploy or Die Button</Link></li>
              <li><Link href="/" className="hover:text-white">Daily Fuck-Up Generator</Link></li>
              <li><Link href="/" className="hover:text-white">Code Confession Booth</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2a2a2a] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-code mb-4 md:mb-0">© 2023 CODE THE FUCK UP. No rights reserved. Copy whatever you want.</p>
          <div className="flex space-x-4 text-sm font-code">
            <Link href="/" className="text-gray-500 hover:text-white">Privacy Policy</Link>
            <Link href="/" className="text-gray-500 hover:text-white">Terms of Service</Link>
            <Link href="/" className="text-gray-500 hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
