import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Bot, PencilRuler, ArrowRight, Check, Sparkles, Sigma } from "lucide-react";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MathCore — Matemáticas universitarias con tutor IA" },
      { name: "description", content: "Aprende Precálculo, Cálculo 1 y Cálculo 2 con teoría clara, ejercicios interactivos y un tutor IA disponible 24/7." },
      { property: "og:title", content: "MathCore — Matemáticas universitarias con tutor IA" },
      { property: "og:description", content: "Plataforma educativa para estudiantes universitarios de Costa Rica y Latinoamérica." },
    ],
  }),
  component: Landing,
});

function Landing() {
  useReveal();
  return (
    <div className="min-h-screen">
      <SiteNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CoursesSection />
      <Pricing />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Nuevo · Tutor IA con razonamiento paso a paso
          </span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Domina las matemáticas <span className="text-grad-primary">universitarias</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Teoría didáctica, ejemplos resueltos y un tutor con IA disponible 24/7. Diseñado para estudiantes de Costa Rica y Latinoamérica.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-grad-primary text-white hover:opacity-90 glow">
              <Link to="/dashboard">Comenzar gratis <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/70">
              <Link to="/ai-tutor">Ver demo</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div>+5,000 estudiantes</div>
            <div className="h-4 w-px bg-border" />
            <div>UCR · TEC · UNA · UNED</div>
          </div>
        </div>

        <div className="reveal relative">
          <div className="glass rounded-3xl p-6 glow animate-float">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sigma className="h-4 w-4 text-primary" /> Cálculo 1 · Límites
              </div>
              <span>Tutor IA</span>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl bg-muted/50 p-3 max-w-[85%]">
                ¿Cómo resuelvo lim<sub>x→0</sub> sin(x)/x?
              </div>
              <div className="rounded-2xl bg-grad-primary text-white p-3 max-w-[90%] ml-auto">
                Es un límite notable: vale 1. Te lo demuestro con el teorema del emparedado…
              </div>
              <div className="rounded-2xl bg-muted/50 p-3 max-w-[60%]">¡Gracias! 🙌</div>
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
              f(x) = sin(x)/x · gráfica interactiva
            </div>
          </div>
          <div className="absolute -inset-10 -z-10 bg-grad-primary opacity-20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: BookOpen, title: "Teoría didáctica", desc: "Explicaciones claras con notación formal y ejemplos visuales adaptados al currículo universitario." },
    { icon: Bot, title: "Tutor con IA 24/7", desc: "Resuelve dudas paso a paso, en español, cuando lo necesites — sin esperar consultas." },
    { icon: PencilRuler, title: "Ejercicios interactivos", desc: "Practica con problemas curados por nivel y recibe retroalimentación inmediata." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="reveal glass border-border/60">
            <CardHeader>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-grad-primary glow">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription className="text-muted-foreground">{desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Elige tu curso", d: "Precálculo, Cálculo 1 o Cálculo 2 según tu nivel actual." },
    { n: "02", t: "Aprende con teoría y ejemplos", d: "Lecciones cortas con ejemplos resueltos y gráficas interactivas." },
    { n: "03", t: "Practica con el tutor IA", d: "Resuelve ejercicios y pregúntale al tutor cuando te trabes." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="reveal text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight">Cómo funciona</h2>
        <p className="mt-3 text-muted-foreground">Tres pasos para empezar a aprender hoy.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="reveal glass rounded-2xl p-6">
            <div className="text-grad-primary text-3xl font-bold">{s.n}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="cursos" className="mx-auto max-w-7xl px-6 py-20">
      <div className="reveal flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Cursos disponibles</h2>
          <p className="mt-2 text-muted-foreground">Diseñados con el currículo universitario costarricense y latinoamericano.</p>
        </div>
        <Button asChild variant="ghost"><Link to="/dashboard">Ver todos <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.slug} className="reveal glass border-border/60 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="text-xs text-primary uppercase tracking-wider">{c.short}</div>
              <CardTitle className="mt-1 text-2xl">{c.name}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/course/$courseSlug" params={{ courseSlug: c.slug }}>Explorar curso</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Plan Mensual", price: "₡8.900", per: "/mes", highlight: false, features: ["Acceso a los 3 cursos", "Tutor IA ilimitado", "Ejercicios con retroalimentación", "Cancela cuando quieras"] },
    { name: "Plan Anual", price: "₡71.000", per: "/año", highlight: true, badge: "Ahorra 33%", features: ["Todo lo del Plan Mensual", "2 sesiones grupales al mes", "Acceso anticipado a nuevos cursos", "Certificado de finalización"] },
  ];
  return (
    <section id="precios" className="mx-auto max-w-7xl px-6 py-20">
      <div className="reveal text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight">Precios simples</h2>
        <p className="mt-3 text-muted-foreground">Empieza gratis. Mejora cuando estés listo.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((p) => (
          <Card key={p.name} className={`reveal relative ${p.highlight ? "border-primary glow bg-grad-primary/5" : "glass border-border/60"}`}>
            {p.badge && (
              <span className="absolute -top-3 right-6 rounded-full bg-grad-primary px-3 py-1 text-xs text-white">{p.badge}</span>
            )}
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-muted-foreground">{p.per}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full ${p.highlight ? "bg-grad-primary text-white hover:opacity-90" : ""}`} variant={p.highlight ? "default" : "outline"}>
                <Link to="/dashboard">Suscribirme</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
