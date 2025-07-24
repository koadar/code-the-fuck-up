import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface Author {
  name: string;
  image: string;
  username: string;
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  timeAgo: string;
  heatCount: number;
  author: Author;
  className?: string;
  category?: string;
  slug?: string;
  index?: number;
}

export default function BlogCard({
  title,
  excerpt,
  timeAgo,
  heatCount,
  author,
  className = "",
  category = "RANT",
  slug,
  index = 0
}: BlogCardProps) {
  const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const blogUrl = category === "RANT" ? `/rants/${blogSlug}` : `/tech-lies/${blogSlug}`;

  return (
    <Link href={blogUrl} className={cn(
      "blog-card bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg block hover:scale-105 transition-transform cursor-pointer",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-code text-gray-400">{timeAgo}</span>
          <span className="bg-primary bg-opacity-20 text-primary text-xs py-1 px-3 rounded-full">{category}</span>
        </div>
        <h3 className="text-xl font-bold font-mono text-white mb-3 glitch-hover">{title}</h3>
        <p className="text-gray-400 text-sm font-code mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={author.image} className="w-8 h-8 rounded-full mr-2" alt={author.name} />
            <span className="text-xs font-code text-gray-500">by <span className="text-secondary">@{author.username}</span></span>
          </div>
          <div className="text-gray-500 flex items-center">
            <i className="ri-fire-fill mr-1 text-primary"></i>
            <span className="text-xs">{heatCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
