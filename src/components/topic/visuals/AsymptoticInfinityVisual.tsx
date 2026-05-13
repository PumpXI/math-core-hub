import { type ReactNode, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const GRAPH_W = 820;
const GRAPH_H = 360;
const PAD_X = 54;
const PAD_Y = 36;

type MainTab = "dominance" | "asymptotes";
type DominanceSubtab = "growth" | "radicals" | "vanishing";
type AsymptoteExample = "quadratic" | "crossing" | "oscillation";

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function ExpX() {
  return (
    <span className="whitespace-nowrap">
      e<Sup>x</Sup>
    </span>
  );
}

function XPower({ power }: { power: string }) {
  return (
    <span className="whitespace-nowrap">
      x<Sup>{power}</Sup>
    </span>
  );
}

function Fraction({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle leading-none">
      <span>{top}</span>
      <span className="my-1 h-px w-full min-w-12 bg-current" />
      <span>{bottom}</span>
    </span>
  );
}

function RadicalExpression() {
  return (
    <span className="whitespace-nowrap">
      √(x<Sup>2</Sup> + 3x) − x
    </span>
  );
}

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return "no definido";
  if (Math.abs(value) >= 1000) return value.toExponential(2);
  return value.toFixed(digits).replace("-0.000", "0.000").replace("-0.00", "0.00");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scaleLinear(value: number, min: number, max: number, start: number, end: number) {
  return start + ((value - min) / (max - min)) * (end - start);
}

function makePath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  samples = 280,
) {
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 0.4 || y > yMax + 0.4) {
      drawing = false;
      continue;
    }
    const sx = scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X);
    const sy = scaleLinear(y, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y);
    commands.push(`${drawing ? "L" : "M"} ${sx.toFixed(2)} ${sy.toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

const asymptoteExamples = {
  quadratic: {
    label: "Cociente de grados iguales",
    asymptote: 2,
    yMin: -2.2,
    yMax: 5.2,
    value: (x: number) => (2 * x * x + 1) / (x * x - 3),
    dominant: () => 2,
    note: "Lejos del origen, el cociente de los términos cuadráticos fija la altura final.",
  },
  crossing: {
    label: "Cruza la asíntota",
    asymptote: 0,
    yMin: -0.9,
    yMax: 0.9,
    value: (x: number) => x / (x * x + 1),
    dominant: (x: number) => (Math.abs(x) < 0.001 ? 0 : 1 / x),
    note: "La recta y = 0 describe el destino; la gráfica puede cruzarla en valores finitos.",
  },
  oscillation: {
    label: "Oscilación amortiguada",
    asymptote: 0,
    yMin: -1.1,
    yMax: 1.1,
    value: (x: number) => (Math.abs(x) < 0.001 ? 1 : Math.sin(x) / x),
    dominant: () => 0,
    note: "La oscilación permanece, pero su amplitud se apaga hacia la asíntota.",
  },
} satisfies Record<
  AsymptoteExample,
  {
    label: string;
    asymptote: number;
    yMin: number;
    yMax: number;
    value: (x: number) => number;
    dominant: (x: number) => number;
    note: string;
  }
>;

function axes(xMin: number, xMax: number, yMin: number, yMax: number, xTicks: number[], yTicks: number[]) {
  return (
    <>
      {xTicks.map((x) => (
        <line
          key={`x-${x}`}
          x1={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
          x2={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
          y1={PAD_Y}
          y2={GRAPH_H - PAD_Y}
          stroke={x === 0 ? "#94a3b8" : "#e5e7eb"}
          strokeDasharray={x === 0 ? "0" : "3 8"}
        />
      ))}
      {yTicks.map((y) => (
        <line
          key={`y-${y}`}
          x1={PAD_X}
          x2={GRAPH_W - PAD_X}
          y1={scaleLinear(y, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
          y2={scaleLinear(y, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
          stroke={y === 0 ? "#94a3b8" : "#e5e7eb"}
          strokeDasharray={y === 0 ? "0" : "3 8"}
        />
      ))}
    </>
  );
}

function GrowthComparisonSubtab() {
  const [slider, setSlider] = useState(46);
  const x = 1 + (slider / 100) * 7;
  const rows = [
    { id: "constante", label: "1", value: 1, color: "#94a3b8" },
    { id: "log", label: "log(x)", value: Math.log(x), color: "#06b6d4" },
    { id: "x", label: "x", value: x, color: "#10b981" },
    { id: "x2", label: <XPower power="2" />, value: x ** 2, color: "#3b82f6" },
    { id: "x3", label: <XPower power="3" />, value: x ** 3, color: "#6366f1" },
    { id: "exp", label: <ExpX />, value: Math.exp(x), color: "#7c3aed" },
  ];
  const maxValue = Math.max(...rows.map((row) => row.value));
  const xMin = 1;
  const xMax = 8;
  const yMin = 0;
  const yMax = Math.exp(8);
  const paths = useMemo(
    () => [
      { key: "constante", path: makePath(() => 1, xMin, xMax, yMin, yMax), color: "#94a3b8", width: 2 },
      { key: "log", path: makePath((t) => Math.log(t), xMin, xMax, yMin, yMax), color: "#06b6d4", width: 2.4 },
      { key: "x", path: makePath((t) => t, xMin, xMax, yMin, yMax), color: "#10b981", width: 2.6 },
      { key: "x2", path: makePath((t) => t ** 2, xMin, xMax, yMin, yMax), color: "#3b82f6", width: 2.8 },
      { key: "x3", path: makePath((t) => t ** 3, xMin, xMax, yMin, yMax), color: "#6366f1", width: 3 },
      { key: "exp", path: makePath((t) => Math.exp(t), xMin, xMax, yMin, yMax), color: "#7c3aed", width: 4 },
    ],
    [],
  );

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[320px] w-full" role="img" aria-label="Comparación de crecimiento en escala normal">
            <rect x="18" y="18" width={GRAPH_W - 36} height={GRAPH_H - 36} rx="22" fill="#fbfcfa" />
            {axes(xMin, xMax, yMin, yMax, [1, 2, 4, 6, 8], [0, 750, 1500, 2250, 3000])}
            {paths.map((item) => (
              <path key={item.key} d={item.path} fill="none" stroke={item.color} strokeWidth={item.width} strokeLinecap="round" />
            ))}
            <line
              x1={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
              x2={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
              y1={PAD_Y}
              y2={GRAPH_H - PAD_Y}
              stroke="#0f172a"
              strokeWidth="2"
              strokeDasharray="7 8"
              opacity="0.5"
            />
            <text x={GRAPH_W - PAD_X - 10} y={PAD_Y + 22} textAnchor="end" className="fill-slate-500 text-[13px] font-medium">x aumenta →</text>
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>x aumenta →</span>
              <span className="font-mono text-slate-500">x = {format(x, 2)}</span>
            </div>
            <Slider value={[slider]} min={0} max={100} step={1} onValueChange={([value]) => setSlider(value)} />
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Carrera en escala normal</div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[74px_1fr_78px] items-center gap-3 text-sm text-slate-700">
              <span>{row.label}</span>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${clamp((row.value / maxValue) * 100, 1, 100)}%`, backgroundColor: row.color }}
                />
              </div>
              <span className="text-right font-mono text-xs text-slate-500">{format(row.value, 2)}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-slate-950 p-4 text-sm leading-relaxed text-white">
          <ExpX /> termina ocupando casi toda la escala visual mientras las potencias quedan comprimidas cerca del eje.
        </div>
      </aside>
    </div>
  );
}

function RadicalLogSubtab() {
  const [slider, setSlider] = useState(58);
  const x = 1 + (slider / 100) ** 2 * 119;
  const radical = (t: number) => Math.sqrt(t * t + 3 * t) - t;
  const rationalized = (t: number) => (3 * t) / (Math.sqrt(t * t + 3 * t) + t);
  const logRatio = (t: number) => Math.log(t) / t;
  const xMin = 1;
  const xMax = 120;
  const yMin = -0.05;
  const yMax = 1.75;
  const radicalPath = useMemo(() => makePath(radical, xMin, xMax, yMin, yMax), []);
  const logPath = useMemo(() => makePath(logRatio, xMin, xMax, yMin, yMax), []);
  const currentRadical = radical(x);
  const currentLog = logRatio(x);

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[320px] w-full" role="img" aria-label="Radicales y logaritmos al infinito">
            <rect x="18" y="18" width={GRAPH_W - 36} height={GRAPH_H - 36} rx="22" fill="#fbfcfa" />
            {axes(xMin, xMax, yMin, yMax, [1, 30, 60, 90, 120], [0, 0.5, 1, 1.5])}
            <line
              x1={PAD_X}
              x2={GRAPH_W - PAD_X}
              y1={scaleLinear(1.5, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              y2={scaleLinear(1.5, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              stroke="#b45309"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.65"
            />
            <line
              x1={PAD_X}
              x2={GRAPH_W - PAD_X}
              y1={scaleLinear(0, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              y2={scaleLinear(0, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.55"
            />
            <path d={radicalPath} fill="none" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <path d={logPath} fill="none" stroke="#0f766e" strokeWidth="3.4" strokeLinecap="round" />
            <circle
              cx={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
              cy={scaleLinear(currentRadical, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              r="7"
              fill="#b45309"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <circle
              cx={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
              cy={scaleLinear(currentLog, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              r="6"
              fill="#0f766e"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>x → +∞</span>
              <span className="font-mono text-slate-500">x = {format(x, 2)}</span>
            </div>
            <Slider value={[slider]} min={0} max={100} step={1} onValueChange={([value]) => setSlider(value)} />
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Radical</div>
          <div className="mt-2 text-lg font-semibold text-slate-950"><RadicalExpression /></div>
          <div className="mt-2 font-mono text-sm text-amber-700">{format(currentRadical, 5)}</div>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">
          <Fraction top={<span>3x</span>} bottom={<span>√(x<Sup>2</Sup> + 3x) + x</span>} /> muestra la misma función y revela el acercamiento a 3 / 2.
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Logaritmo contra x</div>
          <div className="mt-2 text-lg font-semibold text-slate-950"><Fraction top="ln(x)" bottom="x" /></div>
          <div className="mt-2 font-mono text-sm text-emerald-700">{format(currentLog, 5)}</div>
        </div>
      </aside>
    </div>
  );
}

function VanishingTermsSubtab() {
  const [slider, setSlider] = useState(48);
  const x = 1 + (slider / 100) ** 2 * 39;
  const fn = (t: number) => (5 * t) / (t ** 4 + 2 * t * t + 1);
  const xMin = 1;
  const xMax = 40;
  const yMin = -0.03;
  const yMax = 1.3;
  const path = useMemo(() => makePath(fn, xMin, xMax, yMin, yMax), []);
  const value = fn(x);
  const numerator = 5 * x;
  const terms = [
    { id: "x4", label: <XPower power="4" />, value: x ** 4, color: "bg-emerald-700" },
    { id: "2x2", label: <span>2x<Sup>2</Sup></span>, value: 2 * x * x, color: "bg-sky-500" },
    { id: "uno", label: "1", value: 1, color: "bg-slate-400" },
  ];
  const maxTerm = Math.max(...terms.map((term) => term.value));

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[320px] w-full" role="img" aria-label="Términos que desaparecen al infinito">
            <rect x="18" y="18" width={GRAPH_W - 36} height={GRAPH_H - 36} rx="22" fill="#fbfcfa" />
            {axes(xMin, xMax, yMin, yMax, [1, 10, 20, 30, 40], [0, 0.4, 0.8, 1.2])}
            <line
              x1={PAD_X}
              x2={GRAPH_W - PAD_X}
              y1={scaleLinear(0, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              y2={scaleLinear(0, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              stroke="#0f172a"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.55"
            />
            <path d={path} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
            <circle
              cx={scaleLinear(x, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
              cy={scaleLinear(value, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y)}
              r="7"
              fill="#0f766e"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <text x={GRAPH_W - PAD_X - 10} y={scaleLinear(0, yMax, yMin, PAD_Y, GRAPH_H - PAD_Y) - 10} textAnchor="end" className="fill-slate-600 text-[13px] font-semibold">
              y = 0
            </text>
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>x → ∞</span>
              <span className="font-mono text-slate-500">x = {format(x, 2)}</span>
            </div>
            <Slider value={[slider]} min={0} max={100} step={1} onValueChange={([value]) => setSlider(value)} />
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Función</div>
          <div className="mt-2 text-lg font-semibold text-slate-950">
            f(x) = <Fraction top="5x" bottom={<span>x<Sup>4</Sup> + 2x<Sup>2</Sup> + 1</span>} />
          </div>
          <div className="mt-2 font-mono text-sm text-emerald-700">f(x) = {format(value, 6)}</div>
        </div>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Comparación</div>
          <div className="mt-2 flex items-end justify-between">
            <span>5x</span>
            <span className="font-mono text-sm text-white/60">{format(numerator, 2)}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Denominador domina</div>
          {terms.map((term) => (
            <div key={term.id} className="grid grid-cols-[58px_1fr_76px] items-center gap-3 text-sm text-slate-700">
              <span>{term.label}</span>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full transition-all duration-500 ${term.color}`} style={{ width: `${clamp((term.value / maxTerm) * 100, 1, 100)}%` }} />
              </div>
              <span className="text-right font-mono text-xs text-slate-500">{format(term.value, 2)}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function DominanceTab() {
  const [subtab, setSubtab] = useState<DominanceSubtab>("growth");
  const subtabs: Array<[DominanceSubtab, string]> = [
    ["growth", "Comparación de crecimiento"],
    ["radicals", "Radicales y logaritmos"],
    ["vanishing", "Términos que desaparecen"],
  ];

  return (
    <div className="bg-[#f7f8f6]">
      <div className="border-b border-slate-200/70 bg-white/60 p-2">
        <div className="grid gap-2 md:grid-cols-3">
          {subtabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSubtab(id)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                subtab === id ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {subtab === "growth" ? <GrowthComparisonSubtab /> : null}
      {subtab === "radicals" ? <RadicalLogSubtab /> : null}
      {subtab === "vanishing" ? <VanishingTermsSubtab /> : null}
    </div>
  );
}

function AsymptoteTab() {
  const [example, setExample] = useState<AsymptoteExample>("quadratic");
  const [showAsymptote, setShowAsymptote] = useState(true);
  const [showDominant, setShowDominant] = useState(true);
  const [rangeValue, setRangeValue] = useState(58);
  const selected = asymptoteExamples[example];
  const range = 6 + (rangeValue / 100) ** 1.7 * 34;
  const xMin = -range;
  const xMax = range;
  const graph = useMemo(() => makePath(selected.value, xMin, xMax, selected.yMin, selected.yMax, 540), [selected, xMin, xMax]);
  const dominant = useMemo(() => makePath(selected.dominant, xMin, xMax, selected.yMin, selected.yMax, 540), [selected, xMin, xMax]);
  const yAsymptote = scaleLinear(selected.asymptote, selected.yMax, selected.yMin, PAD_Y, GRAPH_H - PAD_Y);

  return (
    <div className="grid bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(asymptoteExamples) as AsymptoteExample[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setExample(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                example === key ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-950"
              }`}
            >
              {asymptoteExamples[key].label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[320px] w-full" role="img" aria-label="Gráfica de asíntotas horizontales">
            <rect x="18" y="18" width={GRAPH_W - 36} height={GRAPH_H - 36} rx="22" fill="#fbfcfa" />
            <rect x="28" y="28" width="118" height={GRAPH_H - 56} rx="18" fill="#eef2ff" opacity="0.55" />
            <rect x={GRAPH_W - 146} y="28" width="118" height={GRAPH_H - 56} rx="18" fill="#ecfdf5" opacity="0.68" />
            {axes(xMin, xMax, selected.yMin, selected.yMax, [-range, -range / 2, 0, range / 2, range], [selected.asymptote, 0])}
            {showAsymptote ? (
              <>
                <line x1={PAD_X} x2={GRAPH_W - PAD_X} y1={yAsymptote} y2={yAsymptote} stroke="#0f172a" strokeWidth="2" strokeDasharray="9 8" />
                <text x={GRAPH_W - PAD_X - 8} y={yAsymptote - 10} textAnchor="end" className="fill-slate-700 text-[13px] font-semibold">
                  y = {selected.asymptote}
                </text>
              </>
            ) : null}
            {showDominant ? <path d={dominant} fill="none" stroke="#64748b" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 8" opacity="0.65" /> : null}
            <path d={graph} fill="none" stroke={example === "oscillation" ? "#7c3aed" : "#0f766e"} strokeWidth="4" strokeLinecap="round" />
            {example !== "quadratic" ? (
              <circle
                cx={scaleLinear(0, xMin, xMax, PAD_X, GRAPH_W - PAD_X)}
                cy={yAsymptote}
                r="6"
                fill="#b45309"
                stroke="#ffffff"
                strokeWidth="3"
              />
            ) : null}
            <text x={PAD_X + 8} y={PAD_Y + 20} className="fill-slate-500 text-[13px] font-medium">x → −∞</text>
            <text x={GRAPH_W - PAD_X - 8} y={PAD_Y + 20} textAnchor="end" className="fill-slate-500 text-[13px] font-medium">x → ∞</text>
          </svg>

          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>Expandir rango de x</span>
              <span className="font-mono text-slate-500">[−{format(range, 1)}, {format(range, 1)}]</span>
            </div>
            <Slider value={[rangeValue]} min={0} max={100} step={1} onValueChange={([value]) => setRangeValue(value)} />
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div className="space-y-2">
          <label className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            Mostrar asíntota
            <input type="checkbox" checked={showAsymptote} onChange={(event) => setShowAsymptote(event.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            Comportamiento dominante
            <input type="checkbox" checked={showDominant} onChange={(event) => setShowDominant(event.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          </label>
        </div>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Asíntota horizontal</div>
          <div className="mt-2 text-2xl font-semibold">y = {selected.asymptote}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          {selected.note}
          {example !== "quadratic" ? <p className="mt-3 font-medium text-slate-900">Cruzar una asíntota horizontal no la rompe: la asíntota habla del comportamiento lejano.</p> : null}
        </div>
        <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
          {example === "quadratic" ? (
            <span>
              <Fraction top={<span>2x<Sup>2</Sup> + 1</span>} bottom={<span>x<Sup>2</Sup> − 3</span>} /> se estabiliza cerca de 2.
            </span>
          ) : null}
          {example === "crossing" ? (
            <span>
              <Fraction top="x" bottom={<span>x<Sup>2</Sup> + 1</span>} /> se acerca a 0 por ambos extremos.
            </span>
          ) : null}
          {example === "oscillation" ? (
            <span>
              <Fraction top="sen(x)" bottom="x" /> oscila, pero queda cada vez más cerca de 0.
            </span>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

export function AsymptoticInfinityVisual({ title }: { title?: string }) {
  const [tab, setTab] = useState<MainTab>("dominance");

  return (
    <VisualShell
      title={title ?? "Límites al infinito y comportamiento asintótico"}
      subtitle="Observa cómo el infinito revela qué términos importan de verdad."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
          {[
            ["dominance", "Dominio Asintótico"],
            ["asymptotes", "Asíntotas Horizontales"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as MainTab)}
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                tab === id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "dominance" ? <DominanceTab /> : <AsymptoteTab />}
      </div>
    </VisualShell>
  );
}
