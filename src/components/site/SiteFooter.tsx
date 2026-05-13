import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#050711] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-6 text-slate-400">
            Matemáticas universitarias como experiencia visual, conceptual y profundamente interactiva.
          </p>
        </div>
        {[
          { t: "Producto", l: ["Cursos", "Acceso", "Tutor IA", "Visual Labs"] },
          { t: "Plataforma", l: ["STEMLab", "Cálculo", "Precálculo", "Progreso"] },
          { t: "Acceso", l: ["SINPE Móvil", "Mensual", "Cursos extra", "Cuenta"] },
        ].map((c) => (
          <div key={c.t}>
            <h4 className="font-semibold mb-3">{c.t}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {c.l.map((x) => <li key={x}><a href="#" className="transition-colors hover:text-cyan-200">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} STEMLab · Costa Rica
      </div>
    </footer>
  );
}
