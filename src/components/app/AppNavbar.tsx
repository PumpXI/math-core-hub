import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo to="/dashboard" />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai-tutor" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">Tutor IA</Link>
          <span className="hidden sm:block text-sm text-muted-foreground">Hola, María</span>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-grad-primary text-white text-xs">MJ</AvatarFallback>
            </Avatar>
          </Button>
          <Button variant="outline" size="icon" className="hidden sm:inline-flex">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
