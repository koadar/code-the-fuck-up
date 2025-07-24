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
        "relative glitch-btn hover:glitch-effect",
        className
      )}
      data-text={text}
      {...props}
    >
      {children}
    </button>
  );
}
