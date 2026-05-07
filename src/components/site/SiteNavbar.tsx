import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#cursos" className="hover:text-foreground transition-colors">Cursos</a>
          <a href="#precios" className="hover:text-foreground transition-colors">Precios</a>
          <a href="#nosotros" className="hover:text-foreground transition-colors">Sobre nosotros</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#15803D] hover:bg-[#166534] text-white">
            <Link to="/register">Comenzar gratis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
