import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscribe logic here
    console.log("Subscribing email:", email);
    // Reset field
    setEmail("");
    // Show success message
  };

  return (
    <section id="newsletter" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <TerminalBox 
            text={'echo "fuck my inbox up" >> subscribe.sh'} 
            className="inline-block mb-4"
          />
          <h2 className="text-4xl font-bold font-mono text-white mb-4 uppercase glitch-hover">RUIN YOUR INBOX</h2>
          <p className="text-gray-400 font-code mb-8">Get our weekly newsletter full of rants, horror stories, and actual useful shit. No sponsored content, no affiliate links, just raw content that will make you feel better about your own code.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-grow py-3 px-4 bg-[#242424] border border-[#2a2a2a] rounded-lg focus:outline-none focus:border-secondary text-white font-code"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <GlitchButton
              type="submit"
              className="bg-primary text-black font-bold py-3 px-6"
              text="SUBSCRIBE"
            >
              SUBSCRIBE
            </GlitchButton>
          </form>
          <p className="text-gray-500 text-xs font-code">We won't sell your data because we're too lazy to figure out how.</p>
        </div>
      </div>
    </section>
  );
}
