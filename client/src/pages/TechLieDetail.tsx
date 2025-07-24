import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { techLies } from "@/lib/data";
import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";

export default function TechLieDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [lie, setLie] = useState<any>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    // Find the lie by slug
    const foundLie = techLies.find(l => 
      l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
    );
    
    if (foundLie) {
      setLie({
        ...foundLie,
        fullTakedown: generateFullTakedown(foundLie)
      });
    }
  }, [slug]);

  const generateFullTakedown = (lie: any) => {
    return `
# ${lie.title}

## The Lie That Broke Us All

${lie.content}

## The Full Takedown

Let me break this down for you because apparently, we all need a reality check.

### Why This Lie Spread

1. **Marketing Hype**: Companies needed something shiny to sell
2. **Conference Circuit**: Speakers needed hot takes for their talks
3. **Social Media**: LinkedIn influencers needed content
4. **FOMO**: Nobody wanted to be left behind

### The Actual Reality

Here's what really happens when you buy into this bullshit:

- You spend weeks learning something that's already outdated
- Your team wastes months on migration projects that add zero business value
- You realize the "revolutionary" solution has the same problems as the old one
- You become the person who has to maintain this "innovative" mess

### The Cost

**Time**: Hundreds of hours learning, implementing, debugging
**Money**: License fees, training, consulting, therapy
**Sanity**: Questioning every technology decision you've ever made
**Relationships**: Fighting with your team about whether to adopt this

### Real-World Examples

I've seen teams completely rewrite working applications because someone read a blog post about how their current stack was "legacy." The rewrite took 18 months, introduced new bugs, and the end result was functionally identical to what they had before.

### The Pattern

1. New technology emerges
2. Early adopters claim it solves everything
3. Conference talks promise 10x improvements
4. Everyone adopts it without understanding the tradeoffs
5. Reality sets in
6. Silent migration back to boring, proven solutions
7. Nobody talks about the failure
8. Repeat with next new thing

### What You Should Do Instead

- Ask "What problem does this actually solve?"
- Look for companies using it in production for 2+ years
- Check if the creators are still using it themselves
- Consider the operational complexity
- Calculate the true cost of adoption

### The Truth

Most "revolutionary" technologies are incremental improvements with exponential marketing budgets. The boring stuff works. The exciting stuff breaks in production.

### Conclusion

Stop chasing every shiny new thing. Master the fundamentals. Build stuff that works. Your future self will thank you when you're not debugging some bleeding-edge framework at 3 AM.

---

*This takedown was brought to you by years of painful experience and a healthy dose of skepticism.*

**Sources:**
- My own mistakes
- Watching teams fail spectacularly
- The graveyard of "game-changing" technologies
- Common sense (apparently rare in tech)
    `.trim();
  };

  const handleVote = () => {
    setVoted(!voted);
    // In a real app, this would update the backend
  };

  if (!lie) {
    return (
      <div className="min-h-screen bg-[#181818] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-mono text-white mb-4">LIE NOT FOUND</h1>
          <p className="text-gray-400 font-code mb-8">This tech lie doesn't exist or has been debunked.</p>
          <Link href="/tech-lies" className="text-secondary hover:text-white font-code">
            ← BACK TO ALL TECH LIES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818] pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/tech-lies" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO ALL TECH LIES
          </Link>
          
          <TerminalBox 
            text={`grep -r "${slug}" /tech_lies/ | head -n 1`}
            className="mb-4"
          />
        </div>

        <article className="bg-[#1a1a1a] rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-destructive text-white text-sm font-bold py-2 px-4 rounded-full">
              BUSTED LIE
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 px-4 py-2 rounded ${voted ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-green-500 transition`}
              >
                <i className="ri-thumb-up-fill"></i>
                <span>{lie.likes + (voted ? 1 : 0)} agree this is BS</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap font-code text-gray-300 leading-relaxed">
              {lie.fullTakedown}
            </div>
          </div>
        </article>

        <div className="bg-[#1a1a1a] rounded-lg p-8">
          <h3 className="text-2xl font-bold font-mono text-white mb-6">SHARE YOUR PAIN</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] transition text-left">
              <div className="text-white font-bold mb-2">Been Burned By This?</div>
              <div className="text-gray-400 text-sm font-code">Share your story of how this lie cost you time/money</div>
            </button>
            
            <button className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] transition text-left">
              <div className="text-white font-bold mb-2">Know More Examples?</div>
              <div className="text-gray-400 text-sm font-code">Submit more evidence of this lie in action</div>
            </button>
          </div>

          <div className="mt-8 p-6 bg-[#2a2a2a] rounded-lg">
            <h4 className="text-white font-bold font-mono mb-4">RELATED LIES YOU MIGHT ENJOY</h4>
            <div className="space-y-2">
              {techLies.slice(0, 3).filter(l => l.title !== lie.title).map((relatedLie, index) => (
                <Link 
                  key={index}
                  href={`/tech-lies/${relatedLie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="block text-secondary hover:text-white font-code text-sm"
                >
                  → {relatedLie.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}