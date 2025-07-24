import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import AllRants from "@/pages/AllRants";
import AllTechLies from "@/pages/AllTechLies";
import SubmitCringe from "@/pages/SubmitCringe";
import SubmitStory from "@/pages/SubmitStory";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rants" component={AllRants} />
      <Route path="/tech-lies" component={AllTechLies} />
      <Route path="/submit-cringe" component={SubmitCringe} />
      <Route path="/submit-story" component={SubmitStory} />
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
