// Tutor IA de STEMLab — conectado a Groq (LLaMA 3.3) con renderizado Markdown + KaTeX
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw, Sparkles, AlertCircle } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

// Renderiza markdown con fórmulas KaTeX
function MathMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        code: ({ children }) => <code className="bg-black/10 rounded px-1 text-xs">{children}</code>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export function AITutorChat({ topicTitle, compact = false }: { topicTitle?: string; compact?: boolean }) {
  const tema = topicTitle ?? "Matemáticas universitarias general";
  const initialGreeting = `¡Hola! Soy **STEMLab AI**, tu tutor de matemáticas. Estamos trabajando en **${tema}**. ¿Qué te gustaría practicar o entender mejor?`;
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
    setError(null);

    if (!GROQ_API_KEY) {
      setError("Falta configurar VITE_GROQ_API_KEY en el archivo .env");
      return;
    }

    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const systemPrompt = `Eres STEMLab AI, un tutor especializado en matemáticas universitarias.
Ayudas a estudiantes de Precálculo y Cálculo 1 de la Universidad de Costa Rica.

Reglas que debes seguir siempre:
1. Responde ÚNICAMENTE preguntas de matemáticas de Precálculo o Cálculo 1. Si preguntan otra cosa, redirige amablemente.
2. Resuelve siempre paso a paso, explicando el razonamiento de cada paso.
3. Usa lenguaje claro y accesible. Si hay confusión, usa ejemplos más simples.
4. Al final de cada explicación, propón un ejercicio similar para practicar.
5. Si el estudiante comete un error, guíalo con preguntas en lugar de corregirlo directamente.
6. Sé motivador, paciente y amigable. Nunca condescendiente.
7. Responde siempre en español.
8. El tema actual del estudiante es: ${tema}. Enfócate en métodos de ese tema.
9. FORMATO: usa Markdown para estructurar tu respuesta. Para fórmulas matemáticas usa siempre LaTeX: inline con $...$ y en bloque con $$...$$. Ejemplo: La derivada es $f'(x) = 2x$ y la regla de la cadena es $$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$`;

    const historial = next
      .slice(1)
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...historial,
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message ?? `Error HTTP ${res.status}`);
      }

      const data = await res.json();
      const respuesta = data?.choices?.[0]?.message?.content ?? "";

      if (!respuesta) throw new Error("Groq no devolvió una respuesta.");

      setMessages((m) => [...m, { role: "ai", text: respuesta }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de red";
      setError(msg);
      setMessages((m) => [...m, { role: "ai", text: `⚠️ ${msg}` }]);
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

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user"
                ? "ml-auto bg-[#15803D] text-white"
                : "bg-muted text-foreground"
            }`}
          >
            {m.role === "user" ? (
              <span>{m.text}</span>
            ) : (
              <MathMarkdown text={m.text} />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "120ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "240ms" }} />
            </span>
            STEMLab AI está pensando…
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
