import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 surface-alt">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Matemáticas universitarias claras, con teoría, ejemplos y un tutor con IA disponible 24/7.
          </p>
        </div>
        {[
          { t: "Producto", l: ["Cursos", "Precios", "Tutor IA", "Demo"] },
          { t: "Compañía", l: ["Sobre nosotros", "Blog", "Contacto", "Carreras"] },
          { t: "Legal", l: ["Términos", "Privacidad", "Cookies", "Licencias"] },
        ].map((c) => (
          <div key={c.t}>
            <h4 className="font-semibold mb-3">{c.t}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((x) => <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} STEMLab · Hecho con cariño en Costa Rica 🇨🇷
      </div>
    </footer>
  );
}
