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
              <button 
                onClick={() => alert("🐦 Follow us on Twitter: @codethefuckup (coming soon!)")}
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-twitter-fill text-xl"></i>
              </button>
              <button 
                onClick={() => alert("🚀 GitHub repo: github.com/codethefuckup (open source coming soon!)")}
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-github-fill text-xl"></i>
              </button>
              <button 
                onClick={() => alert("💬 Discord server: discord.gg/codethefuckup (setting up soon!)")}
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-discord-fill text-xl"></i>
              </button>
              <button 
                onClick={() => alert("🤬 Reddit: r/codethefuckup (creating community soon!)")}
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-reddit-fill text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white font-bold font-mono mb-4 uppercase">CONTENT</h3>
            <ul className="text-gray-400 font-code space-y-2">
              <li><button onClick={() => document.getElementById('hot-rants')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Hot Rants</button></li>
              <li><button onClick={() => document.getElementById('tech-lies')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Tech Lies We Swallowed</button></li>
              <li><button onClick={() => document.getElementById('cringe-gallery')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Cringe Gallery</button></li>
              <li><button onClick={() => document.getElementById('real-devs')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Real Devs, Real Shit</button></li>
              <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Build. Burn. Rebuild.</button></li>
              <li><button onClick={() => alert("📚 Anti-Guru Guide coming to blog section soon!")} className="hover:text-white">Anti-Guru Guide</button></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white font-bold font-mono mb-4 uppercase">FEATURES</h3>
            <ul className="text-gray-400 font-code space-y-2">
              <li><button onClick={() => alert("🔥 Rage Comment Mode: Coming in v2.0 - Unleash your inner dev rage!")} className="hover:text-white">Rage Comment Mode</button></li>
              <li><button onClick={() => alert("📄 Real Resume Builder: No BS resume tool coming soon!")} className="hover:text-white">Real Resume Builder</button></li>
              <li><button onClick={() => alert("🚫 LinkedIn Filter: Browser extension to filter cringe posts coming!")} className="hover:text-white">LinkedIn Filter</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">Deploy or Die Button</button></li>
              <li><button onClick={() => alert("💥 Daily Fuck-Up Generator: Random coding disasters for motivation!")} className="hover:text-white">Daily Fuck-Up Generator</button></li>
              <li><button onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white">Code Confession Booth</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2a2a2a] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-code mb-4 md:mb-0">© 2023 CODE THE FUCK UP. No rights reserved. Copy whatever you want.</p>
          <div className="flex space-x-4 text-sm font-code">
            <button onClick={() => alert("🔒 Privacy Policy: We don't track shit because we're too lazy to set up analytics.")} className="text-gray-500 hover:text-white">Privacy Policy</button>
            <button onClick={() => alert("📜 Terms: Don't be a dick. Don't break our servers. That's it.")} className="text-gray-500 hover:text-white">Terms of Service</button>
            <button onClick={() => alert("📧 Contact: hello@codethefuckup.com or slide into our DMs!")} className="text-gray-500 hover:text-white">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
