import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  const text = typeof children === 'string' ? children : '';
  
  return (
    <div 
      className={cn("glitch-text relative", className)}
      data-text={text}
    >
      {children}
      <style jsx>{`
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          left: 0;
        }
        
        .glitch-text::before {
          color: #ff3e3e;
          animation: glitch-animation 2s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          color: #00ff8c;
          animation: glitch-animation 3s infinite linear alternate;
        }
      `}</style>
    </div>
  );
}
