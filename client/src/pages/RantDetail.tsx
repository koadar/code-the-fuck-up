import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { hotRants } from "@/lib/data";
import TerminalBox from "@/components/ui/TerminalBox";
import GlitchButton from "@/components/ui/GlitchButton";

export default function RantDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [rant, setRant] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Find the rant by slug
    const foundRant = hotRants.find(r => 
      r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
    );
    
    if (foundRant) {
      setRant({
        ...foundRant,
        fullContent: generateFullContent(foundRant)
      });
      
      // Load mock comments
      setComments([
        {
          id: 1,
          author: "CodeWarrior",
          content: "This is exactly what I've been thinking! The whole industry is built on hype.",
          timeAgo: "2 hours ago",
          likes: 12
        },
        {
          id: 2,
          author: "DebuggingDave",
          content: "Finally someone said it. I'm so tired of all the fake positivity in tech.",
          timeAgo: "4 hours ago",
          likes: 8
        }
      ]);
    }
  }, [slug]);

  const generateFullContent = (rant: any) => {
    return `
# ${rant.title}

${rant.excerpt}

## The Reality Check

Look, I've been in this industry for years, and I'm fucking tired of pretending everything is fine. We need to talk about the elephant in the room.

### The Problem

Everyone's acting like we're changing the world with our JavaScript frameworks and microservices, but let's be honest - most of us are just building CRUD apps with fancy names. And that's okay! But stop pretending you're the next Steve Jobs because you can center a div.

### What Really Happens

1. **Day 1**: "This will be different! Clean code, proper documentation!"
2. **Day 30**: Copy-pasting from Stack Overflow at 2 AM
3. **Day 90**: "It works on my machine" becomes your catchphrase
4. **Day 180**: You're maintaining legacy code written by someone who left 3 years ago

### The Solution (Spoiler: There Isn't One)

The industry will keep spinning its wheels, generating new frameworks every week, and we'll keep pretending that this time it's different. But here's the thing - embrace the chaos. Write code that works, document what you can, and stop feeling guilty about not knowing the latest JavaScript framework.

### Final Thoughts

We're all just making it up as we go along. The sooner you accept that, the sooner you can actually enjoy writing code instead of constantly feeling like you're behind.

Peace out,
${rant.author.name}

---

*This rant was brought to you by caffeine, frustration, and years of production bugs.*
    `.trim();
  };

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, this would update the backend
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Anonymous",
        content: newComment,
        timeAgo: "Just now",
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  if (!rant) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-mono text-white mb-4">RANT NOT FOUND</h1>
          <p className="text-gray-400 font-code mb-8">This rant doesn't exist or has been deleted.</p>
          <Link href="/rants" className="text-secondary hover:text-white font-code">
            ← BACK TO ALL RANTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/rants" className="text-secondary hover:text-white font-code mb-4 inline-block">
            ← BACK TO ALL RANTS
          </Link>
          
          <TerminalBox 
            text={`cat /rants/${slug}.md | head -n 1`}
            className="mb-4"
          />
        </div>

        <article className="bg-[#1a1a1a] rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src={rant.author.image} className="w-12 h-12 rounded-full mr-4" alt={rant.author.name} />
              <div>
                <div className="text-white font-code">{rant.author.name}</div>
                <div className="text-gray-500 text-sm">@{rant.author.username} • {rant.timeAgo}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded ${liked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-red-500 transition`}
              >
                <i className="ri-heart-fill"></i>
                <span>{rant.heatCount + (liked ? 1 : 0)}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap font-code text-gray-300 leading-relaxed">
              {rant.fullContent}
            </div>
          </div>
        </article>

        <div className="bg-[#1a1a1a] rounded-lg p-8">
          <h3 className="text-2xl font-bold font-mono text-white mb-6">COMMENTS ({comments.length})</h3>
          
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your thoughts to this rant..."
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white font-code px-4 py-3 rounded resize-none h-24 focus:border-secondary"
            />
            <div className="mt-4">
              <GlitchButton
                type="submit"
                className="bg-primary text-black font-bold py-2 px-6"
                text="POST COMMENT"
              >
                POST COMMENT
              </GlitchButton>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-[#2a2a2a] pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold text-sm">
                        {comment.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-code">{comment.author}</span>
                    <span className="text-gray-500 text-sm ml-2">• {comment.timeAgo}</span>
                  </div>
                  <button className="text-gray-400 hover:text-primary text-sm">
                    <i className="ri-heart-line mr-1"></i>
                    {comment.likes}
                  </button>
                </div>
                <p className="text-gray-300 font-code">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}