import { useState } from "react";
import { Link } from "wouter";
import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";

export default function SubmitStory() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorName: "",
    authorUsername: "",
    category: "failure",
    isAnonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert("Story submitted! Our team will review and add it to the real dev stories section.");
    setFormData({
      title: "",
      content: "",
      authorName: "",
      authorUsername: "",
      category: "failure",
      isAnonymous: false
    });
  };

  return (
    <div className="min-h-screen bg-[#181818] pt-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO MAIN
          </Link>
          
          <TerminalBox 
            text='cat > real_dev_story.md' 
            className="mb-4"
          />
          
          <h1 className="text-4xl font-bold font-mono text-white mb-4 uppercase">
            SUBMIT YOUR DEV STORY
          </h1>
          <p className="text-gray-400 font-code mb-8">
            Share your real developer experience - the failures, breakthroughs, burnout, and weird reality of coding life.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-code mb-2">STORY TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., 'How I Accidentally Deleted Production on My First Day'"
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
              <option value="failure">Epic Failure</option>
              <option value="breakthrough">Breakthrough Moment</option>
              <option value="burnout">Burnout & Recovery</option>
              <option value="career">Career Change</option>
              <option value="workplace">Workplace Drama</option>
              <option value="learning">Learning Journey</option>
              <option value="wtf">WTF Moments</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-code mb-2">YOUR STORY *</label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Tell us your story... Be honest, be real, be human. This is a safe space for dev trauma."
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary resize-none"
            />
            <p className="text-gray-500 text-sm mt-1 font-code">
              Support Markdown formatting. Minimum 200 characters.
            </p>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
              className="mr-3"
            />
            <label htmlFor="anonymous" className="text-white font-code">
              Submit anonymously
            </label>
          </div>

          {!formData.isAnonymous && (
            <>
              <div>
                <label className="block text-white font-code mb-2">YOUR NAME</label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                  placeholder="Your display name"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-white font-code mb-2">USERNAME/HANDLE</label>
                <input
                  type="text"
                  value={formData.authorUsername}
                  onChange={(e) => setFormData({...formData, authorUsername: e.target.value})}
                  placeholder="@yourusername"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-code px-4 py-3 rounded focus:border-secondary"
                />
              </div>
            </>
          )}

          <div className="pt-4">
            <GlitchButton
              type="submit"
              className="bg-primary text-black font-bold py-3 px-8"
              text="SUBMIT STORY"
            >
              SHARE YOUR TRUTH
            </GlitchButton>
          </div>
        </form>

        <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg">
          <h3 className="text-white font-bold font-mono mb-4">STORY GUIDELINES</h3>
          <ul className="text-gray-400 font-code space-y-2 text-sm">
            <li>• Be honest and authentic</li>
            <li>• No company names if it's negative</li>
            <li>• Focus on your experience, not blaming individuals</li>
            <li>• Stories should be educational or relatable</li>
            <li>• We may edit for length and clarity</li>
            <li>• Anonymous submissions are totally fine</li>
          </ul>
        </div>
      </div>
    </div>
  );
}