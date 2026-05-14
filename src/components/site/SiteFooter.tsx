import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-950/10 bg-[#fffdf8] text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Logo surface="light" />
          <p className="max-w-xs text-sm leading-6 text-slate-600">
            Una experiencia visual premium para entender STEM con estructura, intuición y movimiento.
          </p>
        </div>
        {[
          { t: "Producto", l: ["Mundos de aprendizaje", "Laboratorios visuales", "Intuición conceptual", "Expansión STEM"] },
          { t: "Áreas", l: ["Cálculo", "Precálculo", "Física", "Química"] },
          { t: "Acceso", l: ["SINPE Móvil", "Plan mensual", "Cursos extra", "Sin cargos escondidos"] },
        ].map((column) => (
          <div key={column.t}>
            <h4 className="mb-3 font-semibold">{column.t}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {column.l.map((item) => (
                <li key={item}>
                  <a href={item === "Mundos de aprendizaje" ? "#cursos" : item === "Plan mensual" ? "#precio" : "#"} className="transition-colors hover:text-slate-950">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-950/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} STEMLab · Costa Rica
      </div>
    </footer>
  );
}
