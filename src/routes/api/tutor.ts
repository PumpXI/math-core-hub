import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "ai"; text: string };

const MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
];

async function callGemini(model: string, apiKey: string, payload: unknown) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export const Route = createFileRoute("/api/tutor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (data: unknown, status = 200) =>
          new Response(JSON.stringify(data), {
            status,
            headers: { "Content-Type": "application/json" },
          });

        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) {
            return json({ ok: false, error: "Falta la clave GEMINI_API_KEY en el servidor." });
          }

          let body: { tema?: string; messages?: Msg[] };
          try {
            body = await request.json();
          } catch {
            return json({ ok: false, error: "Solicitud inválida." }, 400);
          }

          const tema = (body.tema || "Matemáticas universitarias general").toString().slice(0, 200);
          const messages = (Array.isArray(body.messages) ? body.messages : []).slice(-30);

          const systemPrompt = `Eres STEMLab AI, un tutor de matemáticas universitarias para estudiantes de Precálculo y Cálculo 1 de la Universidad de Costa Rica.

Reglas:
1. Responde solo preguntas de matemáticas (Precálculo o Cálculo 1). Si preguntan otra cosa, redirige amablemente.
2. Resuelve paso a paso, explicando el razonamiento.
3. Lenguaje claro y accesible. Usa analogías si el estudiante se confunde.
4. Al final propón un ejercicio similar para practicar.
5. Si el estudiante se equivoca, guíalo con preguntas, no des la respuesta directa.
6. Sé motivador y paciente, nunca condescendiente.
7. Responde siempre en español.
8. El tema actual es: ${tema}. Prioriza ejemplos sobre ese tema.
9. Usa LaTeX entre $...$ cuando sea conveniente para fórmulas.`;

          const contents = messages
            .filter((m) => m && typeof m.text === "string" && m.text.trim().length > 0)
            .map((m) => ({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            }));

          const payload = {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          };

          let lastDetail = "";
          for (const model of MODELS) {
            const upstream = await callGemini(model, apiKey, payload);
            if (upstream.ok) {
              const data = (await upstream.json()) as {
                candidates?: { content?: { parts?: { text?: string }[] } }[];
              };
              const text =
                data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
              if (!text) {
                lastDetail = `Modelo ${model} devolvió respuesta vacía.`;
                continue;
              }
              return json({ ok: true, text, model });
            }
            lastDetail = `Modelo ${model}: ${upstream.status} ${await upstream
              .text()
              .catch(() => "")
              .then((s) => s.slice(0, 200))}`;
            console.error("[tutor] gemini upstream failed", lastDetail);
            // Reintentar con el siguiente modelo si es 404 (no existe), 429 (cuota) o 5xx
            if (![404, 429].includes(upstream.status) && upstream.status < 500) break;
          }

          return json({
            ok: false,
            error: `No se pudo contactar al modelo. ${lastDetail || "Error desconocido."}`,
          });
        } catch (err) {
          console.error("[tutor] handler exception", err);
          return new Response(
            JSON.stringify({
              ok: false,
              error: err instanceof Error ? err.message : "Error inesperado en el servidor.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
