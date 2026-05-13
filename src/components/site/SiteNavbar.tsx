import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050711]/82 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
          <a href="#cursos" className="transition-colors hover:text-cyan-200">Cursos</a>
          <a href="#precios" className="transition-colors hover:text-cyan-200">Acceso</a>
          <a href="#nosotros" className="transition-colors hover:text-cyan-200">STEMLab</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild size="sm" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
            <Link to="/register">Entrar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
