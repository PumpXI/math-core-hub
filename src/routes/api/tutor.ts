import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "ai"; text: string };

export const Route = createFileRoute("/api/tutor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response("Missing GEMINI_API_KEY", { status: 500 });
        }

        let body: { tema?: string; messages?: Msg[] };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const tema = (body.tema || "Matemáticas universitarias general").toString().slice(0, 200);
        const messages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];

        const systemPrompt = `Eres STEMLab AI, un tutor especializado en matemáticas universitarias.
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

        const contents = messages
          .filter((m) => m && typeof m.text === "string" && m.text.trim().length > 0)
          .map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          }));

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`;
        const upstream = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const detail = await upstream.text().catch(() => "");
          return new Response(`Gemini error ${upstream.status}: ${detail.slice(0, 300)}`, {
            status: 502,
          });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
