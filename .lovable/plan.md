
## Diagnóstico de los 2 problemas

### 1. "Al abrir un tema me devuelve a la lista"
En realidad la ruta **sí navega** a `/course/precalculo/<tema>` (lo confirma el title que cambia a "Propiedades de la suma y la multiplicación en R — STEMLab"). Lo que pasa es que `topicContent.ts` solo tiene contenido para ~5 slugs (`dominio-maximo`, `funcion-polinomial`, `funcion-racional`, `funcion-logaritmica`, `funciones-trig-inversas`, `limites-intuitivo`, `tecnicas-limites`…). Para el resto, `TopicBody` cae al `placeholderContent` y muestra solo "Contenido en desarrollo" + un cuadro de "Gráfica próximamente". Visualmente queda casi vacío y se siente como si no hubiera abierto nada.

### 2. Tutor IA devuelve 502
El handler `/api/tutor` reenvía el body de Gemini sin try/catch sólido y, sobre todo, llama al modelo `gemini-2.0-flash` con `streamGenerateContent?alt=sse`. Causas probables del 502 que el handler emite:
- El nombre `gemini-2.0-flash` no siempre está disponible en `v1beta`; lo estable y gratuito es `gemini-1.5-flash-latest` (o `gemini-2.0-flash-exp`).
- Si Gemini responde no-OK, el handler devuelve 502 con el cuerpo upstream — sin reintento ni fallback.
- Cualquier excepción de red revienta como 500 sin mensaje legible para el cliente.

## Plan de cambios

### A. Contenido real para los temas activos (los marcados "completado" o "en-progreso")

**Precálculo:**
- `numeros-reales`, `propiedades-suma-producto`, `orden-en-r`, `desigualdades-intervalos`

**Cálculo 1:**
- `limites-intuitivo` (ya existe — revisar)

Para cada uno se añade en `src/lib/topicContent.ts`:
- 3-4 párrafos de teoría con notación matemática.
- 2-3 fórmulas en LaTeX.
- 1 definición destacada.
- 3 ejemplos paso a paso.
- 5 ejercicios con solución.
- Un **`geogebraId`** opcional (ID de applet público de geogebra.org) para el embed.

Los demás temas conservan el placeholder pero con un layout más rico (ver punto C).

### B. Visualización dinámica con GeoGebra

Crear `src/components/topic/GeoGebraEmbed.tsx`:
- Iframe a `https://www.geogebra.org/material/iframe/id/<geogebraId>` con `width=100%`, alto responsive, `allowfullscreen`.
- Si el tema no define `geogebraId`, mostrar un fallback elegante ("Visualización próximamente") en lugar del cuadro punteado actual.

`TopicBody.tsx` se actualiza para renderizar `<GeoGebraEmbed>` debajo de la teoría cuando exista, dentro del tab **Teoría**.

IDs sugeridos por tema (applets públicos verificables al implementar):
- `numeros-reales` → recta numérica con subconjuntos
- `propiedades-suma-producto` → calculadora interactiva
- `orden-en-r` → recta con intervalos
- `desigualdades-intervalos` → resolución gráfica de inecuaciones
- `limites-intuitivo` → función con puntos acercándose

### C. Mejorar la página de tema cuando no hay contenido aún

Aunque sea placeholder, debe sentirse como una página real:
- Header del tema (ya está).
- Cards visibles con "En preparación · Próximamente disponible" + ícono.
- Botón "Pregúntale al tutor IA sobre este tema" que salta directo al tab Tutor IA.

Así el usuario ya no percibe que "no abre".

### D. Arreglar el tutor IA (502)

Reescribir `src/routes/api/tutor.ts` con:

1. **Modelo estable**: usar `gemini-1.5-flash-latest` (con fallback a `gemini-2.0-flash-exp` si el primero falla con 404).
2. **Modo no-streaming primero, streaming opcional**: cambiar a `:generateContent` (sin SSE) para simplificar y eliminar el parseo SSE frágil del cliente. La respuesta llega en un único JSON; el chat ya la muestra completa.
3. **try/catch envolviendo todo el handler**, devolviendo siempre JSON estructurado:
   ```
   { ok: false, error: "mensaje legible" }   // status 200, fallback=true
   ```
   En lugar de 502, así el cliente puede renderizar el error en la burbuja.
4. **Logs**: `console.error` con el cuerpo de Gemini cuando upstream falla, para verlo en `stack_modern--server-function-logs`.
5. **Headers CORS** mínimos por si el preview los necesita.

`AITutorChat.tsx` se simplifica:
- Quita el parser SSE.
- Hace `await res.json()` y muestra `data.text` o `data.error`.
- Mantiene el indicador "escribiendo…".

### E. Verificación post-cambio

1. Abrir `/course/precalculo/propiedades-suma-producto` → debe mostrar teoría real, fórmulas KaTeX y un applet GeoGebra embebido.
2. Abrir un tema sin contenido (p.ej. `funcion-radical`) → muestra estructura con "Próximamente" y CTA al tutor.
3. Mandar un mensaje al tutor → respuesta real de Gemini en español; si Gemini falla, burbuja con mensaje de error claro (no 502 al usuario).
4. Revisar logs del worker para confirmar que cualquier fallo de Gemini queda registrado.

## Detalles técnicos

- Sin cambios de schema ni de auth.
- Sin paquetes nuevos (GeoGebra es iframe puro).
- Tokens semánticos: el embed usa `border-border bg-card rounded-2xl` para integrarse con el design system.
- El handler sigue usando `process.env.GEMINI_API_KEY` (server-only, nunca llega al cliente).
