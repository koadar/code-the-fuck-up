import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children: ReactNode;
  className?: string;
}

export default function GlitchButton({ 
  text, 
  children, 
  className = "", 
  ...props 
}: GlitchButtonProps) {
  return (
    <button
      className={cn(
        "relative glitch-btn",
        className
      )}
      data-text={text}
      {...props}
    >
      {children}
      <style jsx>{`
        .glitch-btn:hover {
          position: relative;
        }
        
        .glitch-btn:hover::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          top: 0;
          color: #ff3e3e;
          width: 100%;
          height: 100%;
          clip: rect(0, 0, 0, 0);
          animation: glitch 0.3s linear infinite;
        }
        
        .glitch-btn:hover::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          top: 0;
          color: #00ff8c;
          width: 100%;
          height: 100%;
          clip: rect(0, 0, 0, 0);
          animation: glitch 0.2s linear reverse infinite;
        }
      `}</style>
    </button>
  );
}
