import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalBoxProps {
  text: string;
  className?: string;
  autoType?: boolean;
  typingSpeed?: number;
}

export default function TerminalBox({ 
  text, 
  className = "",
  autoType = true,
  typingSpeed = 50
}: TerminalBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(autoType);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (autoType && isTyping) {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    } else if (!autoType) {
      setDisplayedText(text);
    }
  }, [text, autoType, isTyping, typingSpeed]);
  
  return (
    <div 
      className={cn(
        "border border-[#39ff14] bg-black/70 p-4 font-terminal relative",
        className
      )}
      ref={terminalRef}
    >
      <div className="terminal-content text-[#39ff14]">
        <span className="pl-4 block relative">
          <span className="absolute left-0 top-0">&gt;</span>
          <span className={isTyping ? "console-typing" : ""}>{displayedText}</span>
        </span>
      </div>
    </div>
  );
}
