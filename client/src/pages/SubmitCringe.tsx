import { useState } from "react";
import { Link } from "wouter";
import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";

export default function SubmitCringe() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    submitterName: "",
    category: "linkedin"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert("Cringe submitted! Our team will review and add it to the hall of shame.");
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      submitterName: "",
      category: "linkedin"
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO MAIN
          </Link>
          
          <TerminalBox 
            text='echo "Adding new cringe to database..." >> submit.log' 
            className="mb-4"
          />
          
          <h1 className="text-4xl font-bold font-mono text-white mb-4 uppercase">
            SUBMIT YOUR CRINGE
          </h1>
          <p className="text-gray-400 font-code mb-8">
            Found some peak LinkedIn cringe? Awful resume? Self-important tech post? Share it with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-code mb-2">CRINGE TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., 'CEO of Breathing' LinkedIn Post"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary"
            />
          </div>

          <div>
            <label className="block text-white font-code mb-2">CATEGORY</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded"
            >
              <option value="linkedin">LinkedIn Flex</option>
              <option value="resume">Resume Disaster</option>
              <option value="twitter">Twitter Tech Bro</option>
              <option value="github">GitHub Bio Cringe</option>
              <option value="website">Personal Website Horror</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-code mb-2">IMAGE URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://imgur.com/your-screenshot"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary"
            />
            <p className="text-gray-500 text-sm mt-1 font-code">
              Upload to Imgur, take a screenshot, or paste any image URL
            </p>
          </div>

          <div>
            <label className="block text-white font-code mb-2">DESCRIPTION *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell us why this makes you want to delete LinkedIn forever..."
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-code mb-2">YOUR NAME (optional)</label>
            <input
              type="text"
              value={formData.submitterName}
              onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
              placeholder="Anonymous Whistleblower"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary"
            />
          </div>

          <div className="pt-4">
            <GlitchButton
              type="submit"
              className="bg-primary text-black font-bold py-3 px-8"
              text="SUBMIT CRINGE"
            >
              SUBMIT TO HALL OF SHAME
            </GlitchButton>
          </div>
        </form>

        <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg">
          <h3 className="text-white font-bold font-mono mb-4">SUBMISSION GUIDELINES</h3>
          <ul className="text-gray-400 font-code space-y-2 text-sm">
            <li>• No personal information (blur out names, emails, etc.)</li>
            <li>• Must be genuinely cringe-worthy</li>
            <li>• No harassment or doxxing</li>
            <li>• Screenshots preferred over links</li>
            <li>• We reserve the right to reject submissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}