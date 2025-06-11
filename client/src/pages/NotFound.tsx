import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import TerminalBox from "@/components/ui/TerminalBox";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-primary">
        <CardContent className="pt-6">
          <div className="mb-5">
            <TerminalBox text="cd /404 && echo 'WHAT THE FUCK DID YOU DO?'" />
          </div>
          
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold font-mono text-white">404 PAGE NOT FOUND</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground font-code mb-6">
            You broke it. Good job. This page doesn't exist or you typed some garbage URL.
          </p>
          
          <Link
            href="/"
            className="text-secondary hover:text-white transition-colors font-code"
          >
            &lt; GO BACK TO SAFETY
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
