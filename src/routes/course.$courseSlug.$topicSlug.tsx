import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { getCourse, getTopic } from "@/lib/courses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ChevronDown, ChevronUp } from "lucide-react";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/course/$courseSlug/$topicSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    const topic = getTopic(params.courseSlug, params.topicSlug);
    if (!course || !topic) throw notFound();
    return { course, topic };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Tema"} — STEMLab` },
      { name: "description", content: loaderData?.topic.description ?? "" },
    ],
  }),
  component: () => (<Protected><TopicPage /></Protected>),
});

function TopicPage() {
  const { course, topic } = Route.useLoaderData() as { course: import("@/lib/courses").Course; topic: import("@/lib/courses").Topic };
  const accent = course.slug === "precalculo" ? "data-[state=active]:bg-amber-500 data-[state=active]:text-white" : "data-[state=active]:bg-[#15803D] data-[state=active]:text-white";
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-6">
          <nav className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            {" / "}
            <Link to="/course/$courseSlug" params={{ courseSlug: course.slug }} className="hover:text-foreground">{course.name}</Link>
            {" / "}<span className="text-foreground">{topic.title}</span>
          </nav>
          <header>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{topic.title}</h1>
            <p className="mt-2 text-muted-foreground">{topic.description}</p>
          </header>

          <Tabs defaultValue="teoria" className="w-full">
            <TabsList className="grid grid-cols-4 max-w-2xl">
              <TabsTrigger value="teoria" className={accent}>Teoría</TabsTrigger>
              <TabsTrigger value="ejemplos" className={accent}>Ejemplos</TabsTrigger>
              <TabsTrigger value="ejercicios" className={accent}>Ejercicios</TabsTrigger>
              <TabsTrigger value="tutor" className={accent}>Tutor IA</TabsTrigger>
            </TabsList>

            <TabsContent value="teoria" className="mt-6 space-y-6">
              <article className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm prose max-w-none">
                <h2 className="text-2xl font-semibold mb-3">Concepto de límite</h2>
                <p className="text-muted-foreground">
                  Decimos que el límite de <em>f(x)</em> cuando <em>x</em> tiende a <em>a</em> es <em>L</em>, escrito
                  lim<sub>x→a</sub> f(x) = L, si los valores de f(x) se acercan arbitrariamente a L
                  cuando x se aproxima a a (sin necesariamente ser igual).
                </p>
                <h3 className="mt-6 text-lg font-semibold">Definición formal (ε–δ)</h3>
                <p className="text-muted-foreground">
                  Para todo ε &gt; 0 existe δ &gt; 0 tal que si 0 &lt; |x − a| &lt; δ, entonces |f(x) − L| &lt; ε.
                </p>
                <h3 className="mt-6 text-lg font-semibold">Propiedades</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Linealidad: lim(αf + βg) = α·lim f + β·lim g</li>
                  <li>Producto: lim(f·g) = lim f · lim g</li>
                  <li>Cociente: lim(f/g) = lim f / lim g, si lim g ≠ 0</li>
                </ul>
              </article>
              <div className="rounded-2xl border-2 border-dashed border-border/70 bg-card/30 p-12 text-center text-muted-foreground">
                Gráfica interactiva de Desmos aquí
              </div>
            </TabsContent>

            <TabsContent value="ejemplos" className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                { t: "Ejemplo 1", e: "Calcula lim x→2 (x² − 4)/(x − 2)", s: "Factorizamos: (x−2)(x+2)/(x−2) = x+2. Sustituimos: 4." },
                { t: "Ejemplo 2", e: "lim x→0 sin(x)/x", s: "Es un límite notable. Por teorema del emparedado: 1." },
                { t: "Ejemplo 3", e: "lim x→∞ (3x² + 2)/(x² + 5)", s: "Dividimos por x²: (3 + 2/x²)/(1 + 5/x²) → 3." },
              ].map((ex) => (
                <Card key={ex.t} className="glass">
                  <CardHeader><CardTitle className="text-base">{ex.t}</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded-lg bg-muted/40 p-3 font-mono text-xs">{ex.e}</div>
                    <div className="text-muted-foreground"><span className="text-foreground font-medium">Solución:</span> {ex.s}</div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ejercicios" className="mt-6 space-y-3">
              {[
                { e: "Calcula lim x→3 (x² − 9)/(x − 3)", s: "Factor: (x−3)(x+3)/(x−3) = x+3 → 6." },
                { e: "lim x→0 (1 − cos x)/x²", s: "Límite notable: 1/2." },
                { e: "lim x→∞ (5x³ − x)/(2x³ + 1)", s: "Coeficientes principales: 5/2." },
                { e: "lim x→1 (√x − 1)/(x − 1)", s: "Racionaliza: 1/(√x + 1) → 1/2." },
                { e: "lim x→0 tan(3x)/x", s: "tan(3x)/x = 3·sin(3x)/(3x·cos(3x)) → 3." },
              ].map((q, i) => <ExerciseRow key={i} index={i + 1} {...q} />)}
            </TabsContent>

            <TabsContent value="tutor" className="mt-6">
              <ChatBox topicTitle={topic.title} compact />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function ExerciseRow({ index, e, s }: { index: number; e: string; s: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Ejercicio {index}</div>
          <div className="font-mono text-sm mt-1">{e}</div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? <>Ocultar <ChevronUp className="ml-1 h-3.5 w-3.5" /></> : <>Ver solución <ChevronDown className="ml-1 h-3.5 w-3.5" /></>}
        </Button>
      </div>
      {open && (
        <div className="mt-3 rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Solución: </span>{s}
        </div>
      )}
    </div>
  );
}

export function ChatBox({ topicTitle, compact = false }: { topicTitle?: string; compact?: boolean }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `¡Hola! Soy tu tutor STEMLab. ¿Qué quieres practicar de ${topicTitle ?? "este tema"}?` },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "ai", text: "Excelente pregunta. Vamos paso a paso… (respuesta de demostración)" },
    ]);
    setInput("");
  };

  return (
    <div className={`glass rounded-2xl flex flex-col ${compact ? "h-[60vh]" : "h-[calc(100vh-9rem)]"}`}>
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "ml-auto bg-grad-primary text-white" : "bg-muted/60"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 p-3 flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Escribe tu pregunta de matemáticas…"
          className="bg-background/60"
        />
        <Button onClick={send} className="bg-grad-primary text-white hover:opacity-90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
