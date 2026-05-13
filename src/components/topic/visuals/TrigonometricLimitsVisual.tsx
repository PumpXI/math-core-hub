import { useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import { Eye, RotateCcw, Sigma } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const GRAPH_W = 720;
const GRAPH_H = 300;
const PAD = 38;
const UNIT_W = 320;
const UNIT_H = 260;

type SceneId = "fundamental" | "identidad" | "tangente";
type GraphMode = "razon" | "compresion" | "ambas";

type Scene = {
  id: SceneId;
  label: string;
  expression: string;
  transformed: string;
  target: string;
  note: string;
  value: (x: number) => number | null;
  lower?: (x: number) => number | null;
  upper?: (x: number) => number | null;
};

const scenes: Scene[] = [
  {
    id: "fundamental",
    label: "Límite fundamental",
    expression: "\\frac{\\sin x}{x}",
    transformed: "\\cos x \\le \\frac{\\sin x}{x} \\le 1",
    target: "1",
    note: "El arco mide x, la altura mide sin(x) y ambos se vuelven indistinguibles cuando el ángulo se hace pequeño.",
    value: (x) => (Math.abs(x) < 0.0001 ? 1 : Math.sin(x) / x),
    lower: (x) => Math.cos(x),
    upper: () => 1,
  },
  {
    id: "identidad",
    label: "Identidad trigonométrica",
    expression: "\\frac{1-\\cos x}{x}",
    transformed: "\\frac{1-\\cos x}{x}=\\frac{\\sin x}{x}\\cdot\\frac{\\sin x}{1+\\cos x}",
    target: "0",
    note: "La forma directa es 0/0. La identidad transforma la resta de cosenos en factores cuyo comportamiento cerca de cero ya conocemos.",
    value: (x) => (Math.abs(x) < 0.0001 ? 0 : (1 - Math.cos(x)) / x),
  },
  {
    id: "tangente",
    label: "Forma indeterminada",
    expression: "\\frac{\\tan x}{x}",
    transformed: "\\frac{\\tan x}{x}=\\frac{\\sin x}{x}\\cdot\\frac{1}{\\cos x}",
    target: "1",
    note: "Indeterminado no significa imposible: significa que hay que reescribir para comparar velocidades de anulación.",
    value: (x) => (Math.abs(x) < 0.0001 ? 1 : Math.tan(x) / x),
  },
];

function fmt(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "no definido";
  return value.toFixed(5).replace("-0.00000", "0.00000");
}

function makePath(fn: (x: number) => number | null, xScale: (x: number) => number, yScale: (y: number) => number) {
  let drawing = false;
  const commands: string[] = [];
  for (let i = 0; i <= 240; i += 1) {
    const x = -1.2 + (2.4 * i) / 240;
    const y = fn(x);
    if (y === null || y < -0.35 || y > 1.35) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${xScale(x).toFixed(2)} ${yScale(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

export function TrigonometricLimitsVisual({ title }: { title?: string }) {
  const [sceneId, setSceneId] = useState<SceneId>("fundamental");
  const [angleValue, setAngleValue] = useState(62);
  const [mode, setMode] = useState<GraphMode>("ambas");
  const [showZoom, setShowZoom] = useState(true);

  const scene = scenes.find((item) => item.id === sceneId) ?? scenes[0];
  const angle = 0.015 + (angleValue / 100) * 0.985;
  const signedAngle = scene.id === "identidad" ? angle * 0.8 : angle;
  const ratio = scene.value(signedAngle);
  const sinValue = Math.sin(signedAngle);
  const cosValue = Math.cos(signedAngle);
  const tanValue = Math.tan(signedAngle);

  const xScale = (x: number) => PAD + ((x + 1.2) / 2.4) * (GRAPH_W - PAD * 2);
  const yScale = (y: number) => GRAPH_H - PAD - ((y + 0.25) / 1.55) * (GRAPH_H - PAD * 2);

  const graphPaths = useMemo(
    () => ({
      ratio: makePath(scene.value, xScale, yScale),
      lower: scene.lower ? makePath(scene.lower, xScale, yScale) : "",
      upper: scene.upper ? makePath(scene.upper, xScale, yScale) : "",
    }),
    [scene],
  );

  const cx = 120;
  const cy = 150;
  const r = 86;
  const px = cx + r * Math.cos(signedAngle);
  const py = cy - r * Math.sin(signedAngle);
  const tx = cx + r;
  const ty = cy - r * Math.tan(signedAngle);
  const arcEndX = cx + 38 * Math.cos(signedAngle);
  const arcEndY = cy - 38 * Math.sin(signedAngle);

  return (
    <VisualShell
      title={title ?? "Límites trigonométricos e indeterminaciones"}
      subtitle="Explora cómo la geometría trigonométrica estabiliza expresiones cerca de valores críticos."
    >
      <div className="space-y-4 bg-slate-50 p-4 sm:p-5">
        <div className="grid gap-2 md:grid-cols-3">
          {scenes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSceneId(item.id)}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                item.id === scene.id
                  ? "border-emerald-500 bg-white text-emerald-800 shadow-sm"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expresión en estudio</div>
              <div className="mt-3 text-3xl font-semibold text-slate-900">
                <InlineMath math={scene.expression} />
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Límite esperado</div>
              <div className="mt-1 text-2xl font-bold">
                <InlineMath math={scene.target} />
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">{scene.note}</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Geometría en el círculo unitario</h3>
                <p className="text-xs text-slate-500">Reduce el ángulo y compara seno, arco y tangente.</p>
              </div>
              <button
                type="button"
                onClick={() => setAngleValue(62)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reiniciar
              </button>
            </div>

            <svg viewBox={`0 0 ${UNIT_W} ${UNIT_H}`} className="h-auto w-full">
              <rect x="10" y="10" width={UNIT_W - 20} height={UNIT_H - 20} rx="18" fill="#f8fafc" stroke="#e2e8f0" />
              <line x1="32" x2="292" y1={cy} y2={cy} stroke="#94a3b8" />
              <line x1={cx} x2={cx} y1="32" y2="228" stroke="#cbd5e1" />
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <path d={`M ${cx + 38} ${cy} A 38 38 0 0 0 ${arcEndX} ${arcEndY}`} fill="none" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
              <line x1={cx} y1={cy} x2={px} y2={py} stroke="#0f766e" strokeWidth="3" />
              <line x1={px} y1={py} x2={px} y2={cy} stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
              <line x1={tx} y1={cy} x2={tx} y2={ty} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#f97316" strokeWidth="2" strokeDasharray="5 6" />
              <circle cx={px} cy={py} r="5" fill="#0f766e" />
              <text x={px + 8} y={py - 8} className="fill-slate-600 text-[12px] font-semibold">sin x</text>
              <text x={cx + 42} y={cy - 14} className="fill-emerald-700 text-[12px] font-semibold">arco x</text>
              <text x={tx + 8} y={(ty + cy) / 2} className="fill-red-600 text-[12px] font-semibold">tan x</text>
            </svg>

            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Ángulo x hacia 0</span>
                <span className="font-mono">x = {signedAngle.toFixed(4)} rad</span>
              </div>
              <Slider value={[angleValue]} min={0} max={100} step={1} onValueChange={([value]) => setAngleValue(value)} />
              <div className="grid gap-2 text-xs sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">sin(x)</div>
                  <div className="mt-1 font-mono font-semibold">{fmt(sinValue)}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">x</div>
                  <div className="mt-1 font-mono font-semibold">{fmt(signedAngle)}</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="text-emerald-700">razón</div>
                  <div className="mt-1 font-mono font-semibold text-emerald-950">{fmt(ratio)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Compresión y comportamiento local</h3>
                <p className="text-xs text-slate-500">La gráfica muestra cómo las expresiones equivalentes se estabilizan cerca de cero.</p>
              </div>
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-medium">
                {(["razon", "compresion", "ambas"] as GraphMode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-md px-2.5 py-1 capitalize ${mode === item ? "bg-white text-emerald-800 shadow-sm" : "text-slate-500"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[270px] w-full">
              <rect x="14" y="14" width={GRAPH_W - 28} height={GRAPH_H - 28} rx="18" fill="#f8fafc" stroke="#e2e8f0" />
              {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                <line key={`v-${tick}`} x1={xScale(-1.2 + 2.4 * tick)} x2={xScale(-1.2 + 2.4 * tick)} y1={PAD} y2={GRAPH_H - PAD} stroke="#e2e8f0" />
              ))}
              {[0, 0.5, 1].map((y) => (
                <line key={y} x1={PAD} x2={GRAPH_W - PAD} y1={yScale(y)} y2={yScale(y)} stroke={y === 1 ? "#94a3b8" : "#e2e8f0"} />
              ))}
              <line x1={xScale(0)} x2={xScale(0)} y1={PAD} y2={GRAPH_H - PAD} stroke="#94a3b8" strokeDasharray="5 6" />
              {(mode === "compresion" || mode === "ambas") && graphPaths.lower ? (
                <path d={graphPaths.lower} fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="7 7" />
              ) : null}
              {(mode === "compresion" || mode === "ambas") && graphPaths.upper ? (
                <path d={graphPaths.upper} fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="7 7" />
              ) : null}
              {(mode === "razon" || mode === "ambas") && (
                <path d={graphPaths.ratio} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
              )}
              <circle cx={xScale(signedAngle)} cy={yScale(ratio ?? 0)} r="7" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
              <text x={xScale(0) + 8} y={PAD + 18} className="fill-slate-600 text-[13px] font-semibold">x = 0</text>
            </svg>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <Sigma className="h-3.5 w-3.5" />
                  Transformación guiada
                </div>
                <div className="mt-3 overflow-x-auto text-lg font-semibold text-slate-900">
                  <InlineMath math={scene.transformed} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  La transformación conserva el comportamiento cercano al punto crítico, pero cambia la forma para que el límite se vuelva visible.
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <Eye className="h-3.5 w-3.5" />
                  Lectura dinámica
                </div>
                <div className="mt-2 space-y-1 font-mono text-emerald-950">
                  <div>cos(x) = {fmt(cosValue)}</div>
                  <div>tan(x) = {fmt(tanValue)}</div>
                  <div>valor = {fmt(ratio)}</div>
                </div>
                <label className="mt-3 flex items-center gap-2 font-medium text-emerald-900">
                  <input type="checkbox" checked={showZoom} onChange={(event) => setShowZoom(event.target.checked)} className="h-4 w-4 rounded border-emerald-300" />
                  Enfatizar cercanía a cero
                </label>
              </div>
            </div>
          </div>
        </div>

        {showZoom ? (
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Idea central</div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Cerca de cero, <InlineMath math="\\sin x" /> y <InlineMath math="x" /> se acercan con la misma rapidez. Por eso una forma <InlineMath math="0/0" /> puede resolverse al reescribirla: la indeterminación no bloquea el límite, solo pide revelar la comparación correcta.
            </p>
          </div>
        ) : null}
      </div>
    </VisualShell>
  );
}
