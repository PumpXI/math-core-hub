import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { ChatBox } from "./course.$courseSlug.$topicSlug";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses, getCourseTopics } from "@/lib/courses";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/ai-tutor")({
  head: () => ({ meta: [{ title: "Tutor IA — STEMLab" }, { name: "description", content: "Conversa con el tutor de matemáticas con IA." }] }),
  component: () => (<Protected><AITutor /></Protected>),
});

const history = [
  "Límites por sustitución directa",
  "Derivada de funciones compuestas",
  "Integración por partes",
  "Series geométricas",
  "Identidades trigonométricas",
];

function AITutor() {
  const [topic, setTopic] = useState("calculo-1:limites");
  const allTopics = courses.flatMap((c) => getCourseTopics(c).map((t) => ({ id: `${c.slug}:${t.slug}`, label: `${c.name} · ${t.title}` })));
  const current = allTopics.find((t) => t.id === topic);

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <div className="flex-1 mx-auto w-full max-w-[1400px] flex">
        <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-border/40 bg-sidebar/50 backdrop-blur p-4">
          <Button className="bg-[#15803D] hover:bg-[#166534] text-white mb-4">
            <Plus className="mr-2 h-4 w-4" /> Nueva conversación
          </Button>
          <div className="text-xs uppercase tracking-wider text-muted-foreground px-1 mb-2">Historial</div>
          <ul className="space-y-1 overflow-y-auto">
            {history.map((h, i) => (
              <li key={i}>
                <button className="w-full text-left flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span className="truncate">{h}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 flex flex-col p-4 sm:p-6 gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Tutor IA</h1>
              <p className="text-sm text-muted-foreground">Pregunta lo que quieras sobre el tema seleccionado.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Tema activo:</span>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="w-[260px] bg-background/60"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {allTopics.map((t) => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1">
            <ChatBox topicTitle={current?.label} />
          </div>
        </main>
      </div>
    </div>
  );
}
