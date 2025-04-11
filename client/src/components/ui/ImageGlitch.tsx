import { cn } from "@/lib/utils";

interface ImageGlitchProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export default function ImageGlitch({ 
  src, 
  alt, 
  className = "", 
  imageClassName = "" 
}: ImageGlitchProps) {
  return (
    <div className={cn("image-glitch relative overflow-hidden", className)}>
      <img 
        src={src} 
        alt={alt} 
        className={cn("relative z-[1] block w-full h-auto", imageClassName)} 
      />
    </div>
  );
}
