import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw, Sparkles, AlertCircle } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

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
    setError(null);
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, messages: next }),
      });

      const data = (await res.json().catch(() => ({ ok: false, error: "Respuesta inválida del servidor." }))) as {
        ok?: boolean;
        text?: string;
        error?: string;
      };

      if (!data.ok || !data.text) {
        const msg = data.error || `Error ${res.status}`;
        setError(msg);
        setMessages((m) => [...m, { role: "ai", text: `⚠️ ${msg}` }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: data.text! }]);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de red";
      setError(msg);
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
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
              m.role === "user" ? "ml-auto bg-[#15803D] text-white" : "bg-muted text-foreground"
            }`}
          >
            {m.text}
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
