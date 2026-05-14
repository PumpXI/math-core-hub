import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses, getCourseTopics } from "@/lib/courses";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — STEMLab" }, { name: "description", content: "Tu panel de aprendizaje en STEMLab." }] }),
  component: Dashboard,
});

function Dashboard() {
  const nombre = "estudiante";

  return (
    <div className="min-h-screen bg-[#050711] text-white">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="relative flex-1 space-y-10 overflow-hidden px-4 py-8 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_10%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_14%_35%,rgba(124,58,237,0.16),transparent_34%)]" />
          <section className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-cyan-100/75">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Espacio de aprendizaje
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Hola, {nombre}</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Elige un entorno, continúa tu recorrido y vuelve al laboratorio donde la matemática se siente en movimiento.</p>
          </section>

          <section className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl">
              <div className="absolute right-10 top-8 h-36 w-36 rounded-full border border-cyan-300/15" />
              <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Continuar donde lo dejé</div>
                  <h3 className="mt-2 text-2xl font-semibold">Cálculo 1 · Concepto intuitivo de límite</h3>
                  <p className="mt-2 text-sm text-slate-400">Estabas explorando límites laterales y notación.</p>
                  <div className="mt-3 max-w-md">
                    <Progress value={45} indicatorClassName="bg-cyan-300" />
                    <div className="mt-2 text-xs text-slate-500">45% completado</div>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                  <Link to="/course/$courseSlug/$topicSlug" params={{ courseSlug: "calculo-1", topicSlug: "limites-intuitivo" }}>
                    <PlayCircle className="mr-2 h-4 w-4" /> Continuar
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="relative space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Course worlds</p>
              <h2 className="mt-2 text-2xl font-semibold">Mis cursos</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {courses.map((c) => {
                const topicCount = getCourseTopics(c).length;
                const isCalc = c.slug === "calculo-1";
                const accent = isCalc ? "cyan" : "violet";
                return (
                  <div key={c.slug} className="group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-white/20">
                    <div className={`absolute inset-0 ${accent === "cyan" ? "bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.24),transparent_38%)]" : "bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.24),transparent_38%)]"}`} />
                    <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/10 transition group-hover:scale-110" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${accent === "cyan" ? "text-cyan-200/80" : "text-violet-200/80"}`}>
                          {c.code} · {c.short}
                        </div>
                        <h3 className="mt-4 text-3xl font-semibold tracking-tight">{c.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{c.description}</p>
                        <div className="mt-6">
                          <Progress value={c.progress} indicatorClassName={accent === "cyan" ? "bg-cyan-300" : "bg-violet-300"} />
                          <div className="mt-2 flex justify-between text-xs text-slate-500">
                            <span>{c.progress}% completado</span>
                            <span>{topicCount} temas</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="mt-7 w-full border-white/15 bg-white/[0.04] text-white hover:bg-white/10 hover:text-white">
                        <Link to="/course/$courseSlug" params={{ courseSlug: c.slug }}>
                          Entrar al mundo <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="relative grid gap-5 md:grid-cols-3">
            {[
              ["Movimiento", "Transiciones suaves entre cursos, temas y laboratorios."],
              ["Identidad", "Cada curso ilumina la interfaz con su propio color."],
              ["Acceso", "₡2500 base mensual + ₡500 por curso adicional."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <div className="text-sm font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                      </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
