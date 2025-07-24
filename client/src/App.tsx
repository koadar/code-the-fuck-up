import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Rants from "@/pages/Rants";
import TechLiesPage from "@/pages/TechLiesPage";
import CringeGalleryPage from "@/pages/CringeGalleryPage";
import RealDevsPage from "@/pages/RealDevsPage";
import SubmitCringe from "@/pages/SubmitCringe";
import SubmitStory from "@/pages/SubmitStory";
import RageModePage from "@/pages/RageModePage";
import ResumeBuilderPage from "@/pages/ResumeBuilderPage";
import LinkedInFilterPage from "@/pages/LinkedInFilterPage";
import FuckupGeneratorPage from "@/pages/FuckupGeneratorPage";
import ConfessionBoothPage from "@/pages/ConfessionBoothPage";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rants" component={Rants} />
      <Route path="/tech-lies" component={TechLiesPage} />
      <Route path="/cringe" component={CringeGalleryPage} />
      <Route path="/real-devs" component={RealDevsPage} />
      <Route path="/submit-cringe" component={SubmitCringe} />
      <Route path="/submit-story" component={SubmitStory} />
      <Route path="/rage-mode" component={RageModePage} />
      <Route path="/resume-builder" component={ResumeBuilderPage} />
      <Route path="/linkedin-filter" component={LinkedInFilterPage} />
      <Route path="/fuckups" component={FuckupGeneratorPage} />
      <Route path="/confess" component={ConfessionBoothPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen relative">
        <div className="noise"></div>
        <div className="scanlines"></div>
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
