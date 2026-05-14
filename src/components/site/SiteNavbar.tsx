import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-950/10 bg-[#fffdf8]/82 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo surface="light" brandName="Kepler" />
        <nav
          className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex"
          aria-label="Navegación principal"
        >
          <a href="#cursos" className="kepler-nav-glow transition-colors hover:text-slate-950">
            Cursos
          </a>
          <a
            href="#como-funciona"
            className="kepler-nav-glow transition-colors hover:text-slate-950"
          >
            Cómo funciona
          </a>
          <a href="#precio" className="kepler-nav-glow transition-colors hover:text-slate-950">
            Precio
          </a>
          <a href="#precio" className="kepler-nav-glow transition-colors hover:text-slate-950">
            Acceso
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-slate-700 hover:bg-slate-950/5 hover:text-slate-950 sm:inline-flex"
          >
            <Link to="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="kepler-access-glow bg-slate-950 text-white hover:bg-slate-800"
          >
            <Link to="/register">Solicitar acceso</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
