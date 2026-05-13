import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Orbit, Sparkles } from "lucide-react";
import { courses, getCourseTopics } from "@/lib/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STEMLab — Matemáticas universitarias con tutor IA" },
      { name: "description", content: "Aprende Precálculo y Cálculo 1 con teoría clara, ejercicios interactivos y un tutor IA disponible 24/7." },
      { property: "og:title", content: "STEMLab — Matemáticas universitarias con tutor IA" },
      { property: "og:description", content: "Plataforma educativa para estudiantes universitarios de Costa Rica y Latinoamérica." },
    ],
  }),
  component: Landing,
});

function Landing() {
  useReveal();
  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] text-white">
      <SiteNavbar />
      <Hero />
      <CoursesSection />
      <Pricing />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_18%_40%,rgba(124,58,237,0.22),transparent_38%),linear-gradient(180deg,#050711_0%,#0b1022_58%,#050711_100%)]" />
      <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-cyan-300/10" />
      <div className="absolute left-1/2 top-32 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-violet-300/10" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-cyan-100/80 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> STEMLab · entorno matemático interactivo
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">
            Entra a un mundo donde la matemática se mueve.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            STEMLab transforma cursos universitarios en laboratorios visuales, navegación inmersiva y experiencias conceptuales que se sienten vivas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-cyan-300 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.24)] hover:bg-cyan-200">
              <Link to="/register">Entrar a STEMLab <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/[0.04] text-white hover:bg-white/10 hover:text-white">
              <Link to="/dashboard">Explorar cursos</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span>Visual Labs</span>
            <span>Universidad</span>
            <span>Matemática viva</span>
          </div>
        </div>

        <div className="reveal relative min-h-[440px]">
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl" />
          <div className="absolute inset-8 rounded-full border border-cyan-300/20" />
          <div className="absolute inset-20 rounded-full border border-violet-300/20" />
          <svg viewBox="0 0 560 420" className="relative h-full min-h-[440px] w-full">
            <defs>
              <linearGradient id="heroCurve" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path d="M 42 258 C 120 132, 196 344, 276 210 C 354 80, 428 270, 520 150" fill="none" stroke="url(#heroCurve)" strokeWidth="5" strokeLinecap="round" />
            <path d="M 70 304 C 158 190, 230 366, 306 238 C 382 108, 452 318, 520 206" fill="none" stroke="#38bdf8" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
            {Array.from({ length: 18 }, (_, i) => {
              const x = 76 + i * 24;
              const h = 44 + Math.sin(i * 0.8) * 24 + i * 1.2;
              return <line key={i} x1={x} x2={x} y1={300 - h} y2={302} stroke={i % 3 === 0 ? "#22d3ee" : "#8b5cf6"} strokeOpacity="0.34" strokeWidth="3" strokeLinecap="round" />;
            })}
            <circle cx="276" cy="210" r="9" fill="#22d3ee" />
            <circle cx="428" cy="270" r="7" fill="#a78bfa" />
            <text x="52" y="74" fill="#e0f2fe" fontSize="18" fontWeight="600">Cálculo 1</text>
            <text x="52" y="104" fill="#94a3b8" fontSize="13">límites · derivadas · integración</text>
          </svg>
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Laboratorio activo</div>
                <div className="mt-1 text-lg font-semibold text-white">Acumulación geométrica</div>
              </div>
              <Orbit className="h-6 w-6 text-cyan-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="cursos" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300/70">Course worlds</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Elige tu entorno de estudio</h2>
            <p className="mt-3 max-w-2xl text-slate-400">Cada curso tiene atmósfera, color y ritmo propio. No entras a una lista: entras a un mundo matemático.</p>
          </div>
          <Button asChild variant="ghost" className="text-cyan-200 hover:bg-white/10 hover:text-white"><Link to="/dashboard">Ver dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.map((c) => {
            const isCalc = c.slug === "calculo-1";
            const glow = isCalc ? "from-cyan-400/30 via-blue-500/10 to-transparent" : "from-violet-500/30 via-fuchsia-500/10 to-transparent";
            const accent = isCalc ? "text-cyan-200" : "text-violet-200";
            return (
              <Link
                key={c.slug}
                to="/course/$courseSlug"
                params={{ courseSlug: c.slug }}
                className="reveal group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${glow}`} />
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
                <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full border border-white/10 transition duration-500 group-hover:scale-110" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${accent}`}>
                    {c.code} · {c.short}
                  </div>
                    <h3 className="mt-5 text-4xl font-semibold tracking-tight text-white">{c.name}</h3>
                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">{c.description}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-sm text-slate-400">{getCourseTopics(c).length} temas · {c.modules.length} módulos</div>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-slate-950 transition group-hover:scale-105">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const features = ["Acceso base mensual", "Un curso incluido", "+₡500 por curso adicional", "Preparado para SINPE Móvil"];
  return (
    <section id="precios" className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300/70">Access</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Acceso simple, sin tabla corporativa.</h2>
            <p className="mt-4 max-w-2xl text-slate-400">Una experiencia premium debe sentirse clara desde el pago. La integración con SINPE Móvil queda preparada como siguiente etapa.</p>
          </div>
          <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/70 p-6">
            <div className="text-sm text-slate-400">Acceso mensual base</div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-semibold text-white">₡2500</span>
              <span className="pb-2 text-slate-400">/mes</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-300" /> {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              <Link to="/register">Solicitar acceso</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
