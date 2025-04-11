import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

export default function TypingText({ 
  text, 
  className = "", 
  containerClassName = "" 
}: TypingTextProps) {
  return (
    <div className={cn("typing-container", containerClassName)}>
      <div className={cn("typing-text text-[#39ff14] font-terminal", className)}>
        {text}
      </div>
    </div>
  );
}
