import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen, Construction, Sparkles } from "lucide-react";
import { AITutorChat } from "./AITutorChat";
import { TopicVisual } from "./TopicVisual";
import type { TopicContent } from "@/lib/topicContent";

// Renderiza texto con Markdown + fórmulas KaTeX ($...$ inline, $$...$$ bloque)
function MathMarkdown({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <span className="block mb-1 last:mb-0">{children}</span>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-1">{children}</ol>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-1">{children}</ul>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
        }}
      >
        {text}
      </ReactMarkdown>
    </span>
  );
}

export function TopicBody({
  courseSlug,
  topicSlug,
  topicTitle,
  topicDescription,
  content,
  accent,
}: {
  courseSlug: string;
  topicSlug: string;
  topicTitle: string;
  topicDescription: string;
  content: TopicContent | undefined;
  accent: string;
}) {
  const [tab, setTab] = useState<string>("teoria");
  const c = content;
  const isPlaceholder = !c;
  const topicKey = `${courseSlug}:${topicSlug}`;

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid grid-cols-4 max-w-2xl">
        <TabsTrigger value="teoria" className={accent}>Teoría</TabsTrigger>
        <TabsTrigger value="ejemplos" className={accent}>Ejemplos</TabsTrigger>
        <TabsTrigger value="ejercicios" className={accent}>Ejercicios</TabsTrigger>
        <TabsTrigger value="tutor" className={accent}>Tutor IA</TabsTrigger>
      </TabsList>

      {/* ── TAB TEORÍA ── */}
      <TabsContent value="teoria" className="mt-6 space-y-6">
        {isPlaceholder ? (
          <PlaceholderCard
            title={topicTitle}
            description={topicDescription}
            onAskAI={() => setTab("tutor")}
          />
        ) : (
          <>
            <article className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-2xl font-semibold">{topicTitle}</h2>
              {c.theory.map((p, i) => (
                <div key={i} className="text-muted-foreground leading-relaxed">
                  <MathMarkdown text={p} />
                </div>
              ))}
              {c.formulas.length > 0 && (
                <FormulaGrid formulas={c.formulas} />
              )}
              <div className="mt-2 rounded-xl border-l-4 border-[#15803D] bg-green-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#14532D]">
                  <BookOpen className="h-4 w-4" /> {c.definition.title}
                </div>
                <p className="mt-1 text-sm text-[#14532D]/90">
                  <MathMarkdown text={c.definition.body} />
                </p>
              </div>
            </article>
            <TopicVisual topicKey={topicKey} title={topicTitle} />
          </>
        )}
      </TabsContent>

      {/* ── TAB EJEMPLOS ── */}
      <TabsContent value="ejemplos" className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {!c || c.examples.length === 0 ? (
          <div className="md:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Ejemplos en preparación. Mientras tanto puedes pedirle al tutor IA ejemplos de este tema.
          </div>
        ) : (
          c.examples.map((ex, i) => (
            <Card key={i} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ejemplo {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg bg-muted/50 p-3 font-medium">
                  <MathMarkdown text={ex.statement} />
                </div>
                <ol className="space-y-2">
                  {ex.steps.map((s, k) => (
                    <li key={k} className="rounded-md border border-border bg-background p-2.5 text-muted-foreground flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] text-[10px] font-bold text-white">{k + 1}</span>
                      <MathMarkdown text={s} />
                    </li>
                  ))}
                </ol>
                <div className="rounded-md bg-green-50 border border-green-200 p-2.5 text-[#14532D]">
                  <span className="font-semibold">Conclusión: </span>
                  <MathMarkdown text={ex.conclusion} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>

      {/* ── TAB EJERCICIOS ── */}
      <TabsContent value="ejercicios" className="mt-6 space-y-3">
        {!c || c.exercises.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Ejercicios en preparación.
          </div>
        ) : (
          c.exercises.map((q, i) => <ExerciseRow key={i} index={i + 1} {...q} />)
        )}
      </TabsContent>

      {/* ── TAB TUTOR IA ── */}
      <TabsContent value="tutor" className="mt-6">
        <AITutorChat topicTitle={c?.contextLabel ?? topicTitle} compact />
      </TabsContent>
    </Tabs>
  );
}

function FormulaGrid({ formulas }: { formulas: string[] }) {
  return (
    <section className="pt-3">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D]">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Fórmulas clave</h3>
          <p className="text-xs text-muted-foreground">Ideas esenciales para reconocer patrones.</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {formulas.map((formula, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-xl border border-green-200/70 border-t-4 border-t-[#15803D] bg-gradient-to-br from-green-50/80 via-white to-emerald-50/60 shadow-sm transition-colors hover:border-green-300"
          >
            <div className="flex items-center justify-between gap-2 border-b border-green-100/80 px-3 py-2">
              <span className="rounded-full bg-[#15803D]/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#14532D]">
                Idea {index + 1}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]/60" />
            </div>
            <div className="max-w-full overflow-x-auto px-4 py-4 text-center text-[0.92rem] [scrollbar-width:thin] sm:px-5 [&_.katex-display]:my-0 [&_.katex-display]:min-w-max">
              <div className="inline-block min-w-full px-3">
                <BlockMath math={formula} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlaceholderCard({
  title,
  description,
  onAskAI,
}: {
  title: string;
  description: string;
  onAskAI: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700">
          <Construction className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="rounded-xl bg-muted/40 border border-dashed border-border p-5 text-sm text-muted-foreground">
        Estamos preparando teoría, ejemplos paso a paso, ejercicios y una visualización interactiva
        para este tema. Disponible próximamente.
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={onAskAI} className="bg-[#15803D] hover:bg-[#166534] text-white">
          <Sparkles className="mr-1.5 h-4 w-4" /> Pregúntale al tutor IA sobre este tema
        </Button>
        <span className="text-xs text-muted-foreground">El tutor ya conoce el contexto del tema.</span>
      </div>
    </div>
  );
}

function ExerciseRow({ index, statement, solution }: { index: number; statement: string; solution: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-xs text-muted-foreground mb-1">Ejercicio {index}</div>
          <div className="text-sm">
            <MathMarkdown text={statement} />
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? <>Ocultar <ChevronUp className="ml-1 h-3.5 w-3.5" /></> : <>Ver solución <ChevronDown className="ml-1 h-3.5 w-3.5" /></>}
        </Button>
      </div>
      {open && (
        <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Solución: </span>
          <MathMarkdown text={solution} />
        </div>
      )}
    </div>
  );
}
