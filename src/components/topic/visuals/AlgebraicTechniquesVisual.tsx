import { useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import { ArrowLeftRight, CircleDot, Eye, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const SVG_WIDTH = 760;
const SVG_HEIGHT = 360;
const PAD_X = 52;
const PAD_Y = 34;
const EPSILON = 0.035;

type TechniqueId = "factorizacion" | "racionalizacion" | "simplificacion" | "cambio";
type GraphMode = "original" | "simplificada" | "ambas";

type Step = {
  expression: string;
  note: string;
  highlight: string;
};

type Technique = {
  id: TechniqueId;
  label: string;
  shortLabel: string;
  accent: string;
  a: number;
  xRange: [number, number];
  yRange: [number, number];
  original: string;
  simplified: string;
  limit: string;
  challenge: string;
  steps: Step[];
  originalValue: (x: number) => number | null;
  simplifiedValue: (x: number) => number | null;
};

const techniques: Technique[] = [
  {
    id: "factorizacion",
    label: "Factorización",
    shortLabel: "Factorizar",
    accent: "#15803D",
    a: 1,
    xRange: [-1.2, 3.2],
    yRange: [-0.2, 4.6],
    original: "\\frac{x^2-1}{x-1}",
    simplified: "x+1\\;(x\\ne1)",
    limit: "2",
    challenge: "¿Qué estructura permite eliminar la indeterminación?",
    steps: [
      {
        expression: "\\frac{x^2-1}{x-1}",
        note: "La sustitución directa produce \\(0/0\\). Eso no es un valor: es una señal de que la expresión oculta una estructura.",
        highlight: "Forma indeterminada",
      },
      {
        expression: "\\frac{(x-1)(x+1)}{x-1}",
        note: "La diferencia de cuadrados revela el factor común que causa la indeterminación.",
        highlight: "Factor común visible",
      },
      {
        expression: "x+1,\\quad x\\ne1",
        note: "La cancelación describe el mismo comportamiento cerca de \\(x=1\\), pero no define el valor original en \\(x=1\\).",
        highlight: "Comportamiento local visible",
      },
    ],
    originalValue: (x) => (Math.abs(x - 1) < EPSILON ? null : (x * x - 1) / (x - 1)),
    simplifiedValue: (x) => x + 1,
  },
  {
    id: "racionalizacion",
    label: "Racionalización",
    shortLabel: "Racionalizar",
    accent: "#0f766e",
    a: 0,
    xRange: [-0.85, 2.4],
    yRange: [-0.1, 1.2],
    original: "\\frac{\\sqrt{x+1}-1}{x}",
    simplified: "\\frac{1}{\\sqrt{x+1}+1}\\;(x\\ne0)",
    limit: "\\frac12",
    challenge: "¿Qué operación conserva la expresión y elimina la resta de radicales?",
    steps: [
      {
        expression: "\\frac{\\sqrt{x+1}-1}{x}",
        note: "Al evaluar en \\(x=0\\), el numerador y el denominador se anulan. La raíz impide ver la razón de cambio directamente.",
        highlight: "Radical con cancelación oculta",
      },
      {
        expression: "\\frac{\\sqrt{x+1}-1}{x}\\cdot\\frac{\\sqrt{x+1}+1}{\\sqrt{x+1}+1}",
        note: "Multiplicamos por el conjugado. No cambiamos la función donde está definida: multiplicamos por una forma de \\(1\\).",
        highlight: "Conjugado",
      },
      {
        expression: "\\frac{x}{x(\\sqrt{x+1}+1)}",
        note: "La identidad \\((a-b)(a+b)=a^2-b^2\\) hace desaparecer la resta de radicales.",
        highlight: "Radical transformado",
      },
      {
        expression: "\\frac{1}{\\sqrt{x+1}+1},\\quad x\\ne0",
        note: "La forma simplificada muestra el límite: al acercarse \\(x\\) a \\(0\\), el denominador se acerca a \\(2\\).",
        highlight: "Límite visible",
      },
    ],
    originalValue: (x) => {
      if (x <= -1 || Math.abs(x) < EPSILON) return null;
      return (Math.sqrt(x + 1) - 1) / x;
    },
    simplifiedValue: (x) => (x <= -1 ? null : 1 / (Math.sqrt(x + 1) + 1)),
  },
  {
    id: "simplificacion",
    label: "Simplificación algebraica",
    shortLabel: "Simplificar",
    accent: "#ca8a04",
    a: 2,
    xRange: [0.4, 4.2],
    yRange: [-1.2, 0.2],
    original: "\\frac{\\frac1x-\\frac12}{x-2}",
    simplified: "-\\frac{1}{2x}\\;(x\\ne2)",
    limit: "-\\frac14",
    challenge: "¿Qué primer paso ordena una fracción compleja?",
    steps: [
      {
        expression: "\\frac{\\frac1x-\\frac12}{x-2}",
        note: "La expresión tiene una fracción dentro de otra. Antes de evaluar, conviene construir un numerador más claro.",
        highlight: "Fracción compleja",
      },
      {
        expression: "\\frac{\\frac{2-x}{2x}}{x-2}",
        note: "Usamos denominador común en el numerador. Ahora aparece una relación con el factor \\(x-2\\).",
        highlight: "Denominador común",
      },
      {
        expression: "\\frac{-(x-2)}{2x(x-2)}",
        note: "Reescribir \\(2-x\\) como \\(-(x-2)\\) revela el factor que se cancela.",
        highlight: "Factor oculto revelado",
      },
      {
        expression: "-\\frac{1}{2x},\\quad x\\ne2",
        note: "La forma simplificada muestra que el comportamiento cercano se aproxima a \\(-1/4\\).",
        highlight: "Forma local equivalente",
      },
    ],
    originalValue: (x) => (Math.abs(x - 2) < EPSILON || Math.abs(x) < EPSILON ? null : (1 / x - 1 / 2) / (x - 2)),
    simplifiedValue: (x) => (Math.abs(x) < EPSILON ? null : -1 / (2 * x)),
  },
  {
    id: "cambio",
    label: "Cambio de variable",
    shortLabel: "Cambiar variable",
    accent: "#7c3aed",
    a: 2,
    xRange: [-0.5, 4.5],
    yRange: [-0.4, 5.4],
    original: "\\frac{(x-2)^2+3(x-2)}{x-2}",
    simplified: "x+1\\;(x\\ne2)",
    limit: "3",
    challenge: "¿Qué sustitución recentra el problema alrededor del punto objetivo?",
    steps: [
      {
        expression: "\\frac{(x-2)^2+3(x-2)}{x-2}",
        note: "Toda la estructura gira alrededor de \\(x-2\\). El punto \\(x=2\\) se vuelve más claro si recentramos.",
        highlight: "Estructura repetida",
      },
      {
        expression: "u=x-2,\\quad x\\to2 \\Rightarrow u\\to0",
        note: "El cambio de variable no cambia el límite; solo mueve el centro del análisis a \\(u=0\\).",
        highlight: "Recentrar",
      },
      {
        expression: "\\frac{u^2+3u}{u}",
        note: "En la variable nueva, aparece una factorización elemental.",
        highlight: "Estructura simple",
      },
      {
        expression: "u+3=x+1,\\quad x\\ne2",
        note: "Volvemos a \\(x\\). La forma final muestra que el límite al acercarse a \\(2\\) es \\(3\\).",
        highlight: "Comportamiento revelado",
      },
    ],
    originalValue: (x) => {
      const u = x - 2;
      return Math.abs(u) < EPSILON ? null : (u * u + 3 * u) / u;
    },
    simplifiedValue: (x) => x + 1,
  },
];

function format(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "no definido";
  return value.toFixed(3).replace("-0.000", "0.000");
}

function buildPath(
  technique: Technique,
  fn: (x: number) => number | null,
  xScale: (x: number) => number,
  yScale: (y: number) => number,
) {
  const points: string[] = [];
  let drawing = false;
  const [min, max] = technique.xRange;
  for (let i = 0; i <= 220; i += 1) {
    const x = min + ((max - min) * i) / 220;
    const y = fn(x);
    if (y === null || y < technique.yRange[0] - 1 || y > technique.yRange[1] + 1) {
      drawing = false;
      continue;
    }
    points.push(`${drawing ? "L" : "M"} ${xScale(x).toFixed(2)} ${yScale(y).toFixed(2)}`);
    drawing = true;
  }
  return points.join(" ");
}

export function AlgebraicTechniquesVisual({ title }: { title?: string }) {
  const [techniqueId, setTechniqueId] = useState<TechniqueId>("factorizacion");
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<GraphMode>("ambas");
  const [showHole, setShowHole] = useState(true);
  const [sliderValue, setSliderValue] = useState(44);
  const [challengeChoice, setChallengeChoice] = useState<TechniqueId | null>(null);

  const technique = techniques.find((item) => item.id === techniqueId) ?? techniques[0];
  const step = technique.steps[Math.min(stepIndex, technique.steps.length - 1)];
  const [xMin, xMax] = technique.xRange;
  const [yMin, yMax] = technique.yRange;
  const sliderCenter = sliderValue / 100;
  const xValue = xMin + sliderCenter * (xMax - xMin);
  const originalY = technique.originalValue(xValue);
  const simplifiedY = technique.simplifiedValue(xValue);
  const holeY = technique.simplifiedValue(technique.a);

  const xScale = (x: number) => PAD_X + ((x - xMin) / (xMax - xMin)) * (SVG_WIDTH - PAD_X * 2);
  const yScale = (y: number) => SVG_HEIGHT - PAD_Y - ((y - yMin) / (yMax - yMin)) * (SVG_HEIGHT - PAD_Y * 2);

  const paths = useMemo(
    () => ({
      original: buildPath(technique, technique.originalValue, xScale, yScale),
      simplified: buildPath(technique, technique.simplifiedValue, xScale, yScale),
    }),
    [technique],
  );

  function selectTechnique(id: TechniqueId) {
    const next = techniques.find((item) => item.id === id) ?? techniques[0];
    setTechniqueId(id);
    setStepIndex(0);
    setChallengeChoice(null);
    const t = (next.a - next.xRange[0]) / (next.xRange[1] - next.xRange[0]);
    setSliderValue(Math.round(Math.min(0.92, Math.max(0.08, t + 0.12)) * 100));
  }

  return (
    <VisualShell
      title={title ?? "Técnicas algebraicas para límites"}
      subtitle="Transforma expresiones para revelar el comportamiento local del límite."
    >
      <div className="space-y-4 bg-slate-50 p-4 sm:p-5">
        <div className="grid gap-2 md:grid-cols-4">
          {techniques.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTechnique(item.id)}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-all ${
                item.id === technique.id
                  ? "border-emerald-500 bg-white text-emerald-800 shadow-sm"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Expresión actual
          </div>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-2xl font-semibold text-slate-900 md:text-3xl">
              <InlineMath math={step.expression} />
            </div>
            <div className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: technique.accent }}>
              {step.highlight}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {step.note.replaceAll("\\(", "").replaceAll("\\)", "")}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Transformación algebraica</h3>
                <p className="text-xs text-slate-500">Avanza paso a paso y observa qué cambia.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                Paso {stepIndex + 1}/{technique.steps.length}
              </span>
            </div>
            <div className="space-y-2">
              {technique.steps.map((item, index) => (
                <button
                  key={item.expression}
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={`w-full rounded-xl border p-3 text-left transition-all ${
                    index === stepIndex
                      ? "border-emerald-400 bg-emerald-50 shadow-sm"
                      : "border-slate-200 bg-slate-50/70 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: index <= stepIndex ? technique.accent : "#94a3b8" }}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="overflow-x-auto text-sm font-semibold text-slate-900">
                        <InlineMath math={item.expression} />
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.highlight}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Paso anterior
              </button>
              <button
                type="button"
                onClick={() => setStepIndex((value) => Math.min(technique.steps.length - 1, value + 1))}
                className="rounded-lg bg-[#15803D] px-3 py-2 text-sm font-medium text-white hover:bg-[#166534]"
              >
                Siguiente paso
              </button>
              <button
                type="button"
                onClick={() => setStepIndex(0)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Comportamiento gráfico</h3>
                <p className="text-xs text-slate-500">
                  Compara la forma original y la simplificada cerca de <InlineMath math={`x=${technique.a}`} />.
                </p>
              </div>
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-medium">
                {(["original", "simplificada", "ambas"] as GraphMode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-md px-2.5 py-1 capitalize ${
                      mode === item ? "bg-white text-emerald-800 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="h-auto min-h-[300px] w-full">
              <rect x="18" y="18" width={SVG_WIDTH - 36} height={SVG_HEIGHT - 36} rx="18" fill="#f8fafc" stroke="#e2e8f0" />
              {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                const x = xMin + tick * (xMax - xMin);
                return (
                  <line key={`x-${tick}`} x1={xScale(x)} x2={xScale(x)} y1={PAD_Y} y2={SVG_HEIGHT - PAD_Y} stroke="#e2e8f0" />
                );
              })}
              {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                const y = yMin + tick * (yMax - yMin);
                return (
                  <line key={`y-${tick}`} x1={PAD_X} x2={SVG_WIDTH - PAD_X} y1={yScale(y)} y2={yScale(y)} stroke="#e2e8f0" />
                );
              })}
              {yMin < 0 && yMax > 0 ? (
                <line x1={PAD_X} x2={SVG_WIDTH - PAD_X} y1={yScale(0)} y2={yScale(0)} stroke="#94a3b8" strokeWidth="1.5" />
              ) : null}
              {xMin < 0 && xMax > 0 ? (
                <line x1={xScale(0)} x2={xScale(0)} y1={PAD_Y} y2={SVG_HEIGHT - PAD_Y} stroke="#94a3b8" strokeWidth="1.5" />
              ) : null}

              <line
                x1={xScale(technique.a)}
                x2={xScale(technique.a)}
                y1={PAD_Y}
                y2={SVG_HEIGHT - PAD_Y}
                stroke="#475569"
                strokeDasharray="6 7"
                strokeWidth="2"
              />
              <text x={xScale(technique.a) + 8} y={PAD_Y + 18} className="fill-slate-600 text-[13px] font-semibold">
                {`x -> ${technique.a}`}
              </text>

              {(mode === "original" || mode === "ambas") && (
                <path d={paths.original} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" opacity={mode === "ambas" ? 0.72 : 1} />
              )}
              {(mode === "simplificada" || mode === "ambas") && (
                <path d={paths.simplified} fill="none" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={mode === "ambas" ? "9 7" : "0"} />
              )}

              {showHole && holeY !== null && (
                <circle cx={xScale(technique.a)} cy={yScale(holeY)} r="8" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
              )}

              {originalY !== null && (mode === "original" || mode === "ambas") && (
                <circle cx={xScale(xValue)} cy={yScale(originalY)} r="8" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
              )}
              {simplifiedY !== null && (mode === "simplificada" || mode === "ambas") && (
                <circle cx={xScale(xValue)} cy={yScale(simplifiedY)} r="7" fill="#7c3aed" stroke="#ffffff" strokeWidth="3" />
              )}
            </svg>

            <div className="mt-3 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <ArrowLeftRight className="h-3.5 w-3.5 text-emerald-700" />
                    Mover x hacia a
                  </span>
                  <span className="font-mono">x = {xValue.toFixed(3)}</span>
                </div>
                <Slider value={[sliderValue]} min={0} max={100} step={1} onValueChange={([value]) => setSliderValue(value)} />
              </div>
              <div className="grid gap-2 text-xs md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">Original</div>
                  <div className="mt-1 font-mono font-semibold text-slate-900">{format(originalY)}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">Simplificada</div>
                  <div className="mt-1 font-mono font-semibold text-slate-900">{format(simplifiedY)}</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="text-emerald-700">Límite esperado</div>
                  <div className="mt-1 font-semibold text-emerald-950">
                    <InlineMath math={technique.limit} />
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={showHole}
                  onChange={(event) => setShowHole(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-700"
                />
                Mostrar discontinuidad removible
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
              <CircleDot className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-900">Microdesafío</h3>
              <p className="mt-1 text-sm text-slate-600">{technique.challenge}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {techniques.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChallengeChoice(item.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      challengeChoice === item.id
                        ? item.id === technique.id
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                          : "border-amber-300 bg-amber-50 text-amber-800"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>
              {challengeChoice ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <Eye className="h-3.5 w-3.5" />
                  {challengeChoice === technique.id
                    ? "Correcto: esa técnica revela la forma equivalente más útil."
                    : `Aquí conviene ${technique.shortLabel.toLowerCase()} para revelar el comportamiento local.`}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}
