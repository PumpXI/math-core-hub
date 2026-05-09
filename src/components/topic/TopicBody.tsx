import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { AITutorChat } from "./AITutorChat";
import type { TopicContent } from "@/lib/topicContent";

const placeholderContent = (title: string): TopicContent => ({
  contextLabel: title,
  theory: ["Contenido en desarrollo — disponible próximamente."],
  formulas: [],
  definition: { title: "Definición", body: "Contenido en desarrollo — disponible próximamente." },
  examples: [],
  exercises: [],
});

export function TopicBody({
  courseSlug,
  topicTitle,
  topicDescription,
  content,
  accent,
}: {
  courseSlug: string;
  topicTitle: string;
  topicDescription: string;
  content: TopicContent | undefined;
  accent: string;
}) {
  const c = content ?? placeholderContent(topicTitle);
  const isPlaceholder = !content;

  return (
    <Tabs defaultValue="teoria" className="w-full">
      <TabsList className="grid grid-cols-4 max-w-2xl">
        <TabsTrigger value="teoria" className={accent}>Teoría</TabsTrigger>
        <TabsTrigger value="ejemplos" className={accent}>Ejemplos</TabsTrigger>
        <TabsTrigger value="ejercicios" className={accent}>Ejercicios</TabsTrigger>
        <TabsTrigger value="tutor" className={accent}>Tutor IA</TabsTrigger>
      </TabsList>

      <TabsContent value="teoria" className="mt-6 space-y-6">
        <article className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold">{topicTitle}</h2>
          {isPlaceholder ? (
            <p className="text-muted-foreground">Contenido en desarrollo — disponible próximamente.</p>
          ) : (
            <>
              {c.theory.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
              {c.formulas.length > 0 && (
                <div className="space-y-3 pt-2">
                  {c.formulas.map((f, i) => (
                    <div key={i} className="rounded-lg bg-muted/50 px-4 py-3 overflow-x-auto">
                      <BlockMath math={f} />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 rounded-xl border-l-4 border-[#15803D] bg-green-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#14532D]">
                  <BookOpen className="h-4 w-4" /> {c.definition.title}
                </div>
                <p className="mt-1 text-sm text-[#14532D]/90">{c.definition.body}</p>
              </div>
            </>
          )}
        </article>
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-12 text-center text-muted-foreground text-sm">
          📊 Gráfica interactiva — próximamente
        </div>
      </TabsContent>

      <TabsContent value="ejemplos" className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {c.examples.length === 0 ? (
          <div className="md:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Contenido en desarrollo — disponible próximamente.
          </div>
        ) : (
          c.examples.map((ex, i) => (
            <Card key={i} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ejemplo {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg bg-muted/50 p-3 font-medium">{ex.statement}</div>
                <ol className="space-y-2">
                  {ex.steps.map((s, k) => (
                    <li key={k} className="rounded-md border border-border bg-background p-2.5 text-muted-foreground">
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] text-[10px] font-bold text-white">{k + 1}</span>
                      <MathInline text={s} />
                    </li>
                  ))}
                </ol>
                <div className="rounded-md bg-green-50 border border-green-200 p-2.5 text-[#14532D]">
                  <span className="font-semibold">Conclusión: </span>
                  <MathInline text={ex.conclusion} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>

      <TabsContent value="ejercicios" className="mt-6 space-y-3">
        {c.exercises.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Contenido en desarrollo — disponible próximamente.
          </div>
        ) : (
          c.exercises.map((q, i) => <ExerciseRow key={i} index={i + 1} {...q} />)
        )}
      </TabsContent>

      <TabsContent value="tutor" className="mt-6">
        <AITutorChat topicTitle={c.contextLabel} compact />
      </TabsContent>
    </Tabs>
  );
}

function ExerciseRow({ index, statement, solution }: { index: number; statement: string; solution: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Ejercicio {index}</div>
          <div className="mt-1 text-sm"><MathInline text={statement} /></div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? <>Ocultar <ChevronUp className="ml-1 h-3.5 w-3.5" /></> : <>Ver solución <ChevronDown className="ml-1 h-3.5 w-3.5" /></>}
        </Button>
      </div>
      {open && (
        <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Solución: </span>
          <MathInline text={solution} />
        </div>
      )}
    </div>
  );
}

/** Renders text and inline $...$ snippets with KaTeX. */
function MathInline({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("$") && p.endsWith("$") && p.length > 2) {
          return <InlineMath key={i} math={p.slice(1, -1)} />;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
