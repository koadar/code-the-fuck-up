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
import { useState, useEffect } from "react";

export default function Home() {
  const [fuckItMode, setFuckItMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("fuck-it-mode", fuckItMode);
  }, [fuckItMode]);

  return (
    <>
      <Navbar fuckItMode={fuckItMode} toggleFuckItMode={() => setFuckItMode(!fuckItMode)} />
      <main>
        <Hero />
        <HotRants fuckItMode={fuckItMode} />
        <TechLies fuckItMode={fuckItMode} />
        <CringeGallery fuckItMode={fuckItMode} />
        <RealDevs fuckItMode={fuckItMode} />
        <Features />
        <AntiGuru />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
