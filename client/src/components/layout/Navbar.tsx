import { useState } from "react";
import { Link } from "wouter";
import GlitchButton from "@/components/ui/GlitchButton";

interface NavbarProps {
  fuckItMode: boolean;
  toggleFuckItMode: () => void;
}

export default function Navbar({ fuckItMode, toggleFuckItMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#121212] sticky top-0 z-50 border-b border-[#2a2a2a] shadow-md">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold font-mono text-primary tracking-wide flex items-center"
          >
            <span className="mr-1 text-secondary">&lt;</span>
            CODE<span className="hidden sm:inline">_THE_</span>FUCK<span className="hidden sm:inline">_</span>UP
            <span className="ml-1 text-secondary">/&gt;</span>
          </Link>
        </div>
        
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center space-x-6 text-sm font-code flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-[#121212] md:bg-transparent p-4 md:p-0 border-b md:border-0 border-[#2a2a2a] gap-4 md:gap-0`}>
          <button
            onClick={() => scrollToSection('hot-rants')}
            className="nav-link text-white hover:text-secondary uppercase"
          >
            HOT RANTS
          </button>
          <button
            onClick={() => scrollToSection('tech-lies')}
            className="nav-link text-white hover:text-secondary uppercase"
          >
            TECH LIES
          </button>
          <button
            onClick={() => scrollToSection('cringe-gallery')}
            className="nav-link text-white hover:text-secondary uppercase"
          >
            CRINGE GALLERY
          </button>
          <button
            onClick={() => scrollToSection('real-devs')}
            className="nav-link text-white hover:text-secondary uppercase"
          >
            REAL DEVS
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="nav-link text-white hover:text-secondary uppercase"
          >
            BUILD.BURN
          </button>
        </div>
        
        <div className="flex items-center">
          <GlitchButton 
            onClick={toggleFuckItMode}
            className="hidden md:flex items-center bg-primary text-black font-bold py-2 px-4 mr-2"
            text="FUCK IT MODE"
          >
            FUCK IT MODE
            <i className="ri-fire-fill ml-1"></i>
          </GlitchButton>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
