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
    </div>
  );
}
