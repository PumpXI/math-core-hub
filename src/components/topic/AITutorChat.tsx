import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw, Sparkles, AlertCircle } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SYSTEM_PROMPT = (tema: string) => `Eres STEMLab AI, un tutor especializado en matemáticas universitarias.
Ayudas a estudiantes de Precálculo y Cálculo 1 de la Universidad de Costa Rica.

Reglas que debes seguir siempre:
1. Responde ÚNICAMENTE preguntas de matemáticas de Precálculo o Cálculo 1. Si preguntan otra cosa, redirige amablemente hacia matemáticas.
2. Resuelve siempre paso a paso, explicando el razonamiento de cada paso con claridad.
3. Usa lenguaje claro y accesible. Si el estudiante se confunde, usa ejemplos más simples o analogías.
4. Al final de cada explicación, propón un ejercicio similar para que el estudiante practique.
5. Si el estudiante comete un error, no lo corrijas directamente — guíalo con preguntas para que él mismo lo descubra.
6. Sé motivador, paciente y amigable. Nunca condescendiente.
7. Responde siempre en español.
8. El tema actual del estudiante es: ${tema}. Prioriza ejemplos relacionados con ese tema.`;

const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ?? "";

export function AITutorChat({ topicTitle, compact = false }: { topicTitle?: string; compact?: boolean }) {
  const tema = topicTitle ?? "Matemáticas universitarias general";
  const initialGreeting = `¡Hola! Soy STEMLab AI, tu tutor de matemáticas. Estamos trabajando en **${tema}**. ¿Qué te gustaría practicar o entender mejor?`;
  const [messages, setMessages] = useState<Msg[]>([{ role: "ai", text: initialGreeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const reset = () => {
    setMessages([{ role: "ai", text: initialGreeting }]);
    setError(null);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!apiKey) {
      setError("Para activar el tutor IA agrega tu VITE_GEMINI_API_KEY en la configuración del proyecto");
      return;
    }
    setError(null);
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Build Gemini contents from history (skip the initial greeting? include for context)
    const contents = next.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT(tema) }] },
          contents,
        }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Error ${res.status}: ${detail.slice(0, 200) || "no se pudo conectar con Gemini"}`);
      }

      // Add empty AI bubble that we will fill via streaming
      setMessages((m) => [...m, { role: "ai", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const chunk: string = json?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
            if (chunk) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === "ai") copy[copy.length - 1] = { role: "ai", text: last.text + chunk };
                return copy;
              });
            }
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      setError(msg);
      setMessages((m) => {
        const copy = [...m];
        if (copy[copy.length - 1]?.role === "ai" && copy[copy.length - 1].text === "") copy.pop();
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-2xl flex flex-col shadow-sm ${compact ? "h-[60vh]" : "h-[calc(100vh-9rem)]"}`}>
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-[#15803D]" />
          STEMLab AI · {tema}
        </div>
        <Button variant="ghost" size="sm" onClick={reset} title="Limpiar conversación">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {!apiKey && (
        <div className="m-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          Para activar el tutor IA agrega tu <code className="font-mono">VITE_GEMINI_API_KEY</code> en la configuración del proyecto.
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
              m.role === "user"
                ? "ml-auto bg-[#15803D] text-white"
                : "bg-muted text-foreground"
            }`}
          >
            {m.text || (loading && i === messages.length - 1 ? "…" : "")}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "120ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "240ms" }} />
            </span>
            STEMLab AI está escribiendo…
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-border/60 p-3 flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Escribe tu pregunta de matemáticas…"
          disabled={loading}
          className="bg-background"
        />
        <Button onClick={send} disabled={loading || !input.trim()} className="bg-[#15803D] hover:bg-[#166534] text-white">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
