import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero";
import HotRants from "@/sections/HotRants";
import TechLies from "@/sections/TechLies";
import CringeGallery from "@/sections/CringeGallery";
import RealDevs from "@/sections/RealDevs";
import Features from "@/sections/Features";
import AntiGuru from "@/sections/AntiGuru";
import Newsletter from "@/sections/Newsletter";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function Home() {
  const [fuckItMode, setFuckItMode] = useState(false);

  const toggleFuckItMode = () => {
    const newMode = !fuckItMode;
    setFuckItMode(newMode);
    
    // Change page theme when fuck it mode is on
    if (newMode) {
      document.body.classList.add('fuck-it-mode');
    } else {
      document.body.classList.remove('fuck-it-mode');
    }
  };

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={toggleFuckItMode} />
      <main>
        <Hero />
        <section id="hot-rants">
          <HotRants fuckItMode={fuckItMode} />
        </section>
        <section id="tech-lies">
          <TechLies fuckItMode={fuckItMode} />
        </section>
        <section id="cringe-gallery">
          <CringeGallery fuckItMode={fuckItMode} />
        </section>
        <section id="real-devs">
          <RealDevs fuckItMode={fuckItMode} />
        </section>
        <section id="features">
          <Features />
        </section>
        <AntiGuru />
        <section id="newsletter">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </>
  );
}
