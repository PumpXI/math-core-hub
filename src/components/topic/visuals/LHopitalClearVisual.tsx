import { type ReactNode, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 430;

type Mode = "local" | "resolution" | "zoom" | "dominance" | "validity";
type Phase = 0 | 1 | 2;

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function Fraction({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle leading-none">
      <span>{top}</span>
      <span className="my-1 h-px w-full min-w-10 bg-current" />
      <span>{bottom}</span>
    </span>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

function PhaseButton({ phase, current, label, onClick }: { phase: Phase; current: Phase; label: string; onClick: (phase: Phase) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick(phase)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        current === phase ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200/80 hover:text-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function TopMath({ expression, form, stage }: { expression: ReactNode; form: string; stage: string }) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:grid-cols-[1fr_190px_220px] lg:items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Límite actual</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{expression}</div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Forma</div>
        <div className="mt-2 rounded-xl bg-slate-950 px-3 py-2 text-center text-lg font-semibold text-white">{form}</div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Etapa</div>
        <div className="mt-2 text-sm font-medium leading-snug text-slate-700">{stage}</div>
      </div>
    </div>
  );
}

function Layout({ top, controls, children, side }: { top: ReactNode; controls: ReactNode; children: ReactNode; side: ReactNode }) {
  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-4 p-4 sm:p-5">
        {top}
        <div className="flex flex-wrap gap-2">{controls}</div>
        {children}
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">{side}</aside>
    </div>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[350px] w-full" role="img" aria-label={label}>
        <defs>
          <linearGradient id="centerField" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#0f766e" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="26" fill="#fbfcfa" />
        {children}
      </svg>
    </div>
  );
}

function localPath(fn: (t: number) => number, box: { x: number; y: number; w: number; h: number }, xMin = -1, xMax = 1, yMin = -1, yMax = 1) {
  const sx = (x: number) => box.x + ((x - xMin) / (xMax - xMin)) * box.w;
  const sy = (y: number) => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;
  return Array.from({ length: 120 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / 119;
    const y = Math.max(yMin, Math.min(yMax, fn(x)));
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
  }).join(" ");
}

function BehaviorField({
  phase,
  numerator,
  denominator,
  ratio,
}: {
  phase: Phase;
  numerator: (x: number) => number;
  denominator: (x: number) => number;
  ratio: string;
}) {
  const left = { x: 62, y: 98, w: 230, h: 210 };
  const right = { x: 528, y: 98, w: 230, h: 210 };
  const clarity = phase === 0 ? 0.42 : phase === 1 ? 0.72 : 1;
  const jitter = phase === 0 ? 18 : phase === 1 ? 8 : 0;

  return (
    <>
      <rect x={left.x} y={left.y} width={left.w} height={left.h} rx="24" fill="#ffffff" stroke="#dbe4ef" strokeWidth="1.5" />
      <rect x={right.x} y={right.y} width={right.w} height={right.h} rx="24" fill="#ffffff" stroke="#dbe4ef" strokeWidth="1.5" />
      <rect x="326" y="92" width="168" height="222" rx="28" fill="url(#centerField)" stroke="#dbe4ef" strokeWidth="1.5" />

      <text x={left.x + 20} y={left.y + 32} className="fill-slate-700 text-[14px] font-semibold">Numerador</text>
      <text x={right.x + 20} y={right.y + 32} className="fill-slate-700 text-[14px] font-semibold">Denominador</text>

      <line x1={left.x + 18} x2={left.x + left.w - 18} y1={left.y + left.h / 2} y2={left.y + left.h / 2} stroke="#e2e8f0" />
      <line x1={right.x + 18} x2={right.x + right.w - 18} y1={right.y + right.h / 2} y2={right.y + right.h / 2} stroke="#e2e8f0" />
      <path d={localPath(numerator, { ...left, y: left.y + 44, h: left.h - 68 })} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" opacity={clarity} />
      <path d={localPath(denominator, { ...right, y: right.y + 44, h: right.h - 68 })} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" opacity={clarity} />

      {[0, 1, 2, 3, 4].map((i) => {
        const y = 132 + i * 36 + (i % 2 === 0 ? jitter : -jitter);
        return <line key={i} x1="344" x2="476" y1={y} y2={phase === 2 ? 206 : 278 - y * 0.22} stroke={phase === 2 ? "#0f766e" : "#94a3b8"} strokeWidth={phase === 2 ? 3 : 2} strokeDasharray={phase === 0 ? "4 8" : undefined} opacity={phase === 0 ? 0.5 : 0.82} />;
      })}

      <circle cx="410" cy="206" r={phase === 0 ? 42 : phase === 1 ? 34 : 26} fill="#ffffff" stroke={phase === 2 ? "#0f766e" : "#64748b"} strokeWidth="3" />
      <text x="410" y="201" textAnchor="middle" className="fill-slate-500 text-[11px] font-medium">razón local</text>
      <text x="410" y="224" textAnchor="middle" className="fill-slate-950 text-[20px] font-semibold">{ratio}</text>
    </>
  );
}

function LocalBehaviorMode() {
  const [phase, setPhase] = useState<Phase>(0);
  const stages = ["ambas partes se acercan a 0", "se comparan sus ritmos locales", "las tasas revelan la razón"];

  return (
    <Layout
      top={
        <TopMath
          expression={<span>lim x→0 <Fraction top="sen(x)" bottom="x" /></span>}
          form="0/0"
          stage={stages[phase]}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Valores colapsan" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Comparar ritmos" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Razón estable" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Competencia local">
            El numerador y el denominador llegan a 0. El valor no se decide por sus tamaños, sino por cómo se aproximan.
          </Panel>
          <Panel title="Resolución">
            Como la tasa local de sen(x) en 0 es 1 y la de x también es 1, el cociente se estabiliza en 1.
          </Panel>
        </>
      }
    >
      <Frame label="Comparación local entre sen(x) y x">
        <BehaviorField phase={phase} numerator={(x) => Math.sin(x)} denominator={(x) => x} ratio={phase === 2 ? "1" : "?"} />
      </Frame>
    </Layout>
  );
}

function StructuralResolutionMode() {
  const [phase, setPhase] = useState<Phase>(0);
  const original = <Fraction top={<span>e<Sup>x</Sup> − 1</span>} bottom="x" />;
  const transformed = <Fraction top={<span>e<Sup>x</Sup></span>} bottom="1" />;

  return (
    <Layout
      top={
        <TopMath
          expression={<span>lim x→0 {phase === 2 ? transformed : original}</span>}
          form="0/0"
          stage={phase === 0 ? "forma original indeterminada" : phase === 1 ? "se revelan las capas derivadas" : "cociente de tasas legible"}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Original" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Derivar capas" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Resolver" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Transformación estructural">
            L’Hôpital no borra la expresión: cambia la pregunta hacia la razón entre las tasas locales.
          </Panel>
          <Panel title="Resultado">
            La ambigüedad de (eˣ − 1)/x se convierte en eˣ/1, que en x = 0 vale 1.
          </Panel>
        </>
      }
    >
      <Frame label="Transformación estructural de un cociente indeterminado">
        <rect x="72" y="92" width="676" height="234" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        <foreignObject x={phase === 0 ? 122 : 86} y="150" width="230" height="110">
          <div className={`text-center text-4xl font-semibold text-slate-950 transition ${phase === 2 ? "opacity-30" : "opacity-100"}`}>{original}</div>
        </foreignObject>
        <path d="M 342 205 C 382 168, 438 168, 478 205" fill="none" stroke="#d97706" strokeWidth={phase === 0 ? 2 : 4} strokeDasharray={phase === 0 ? "6 9" : undefined} opacity={phase === 0 ? 0.35 : 0.9} />
        <text x="410" y="148" textAnchor="middle" className="fill-amber-700 text-[13px] font-semibold">{phase === 0 ? "estructura oculta" : "derivar numerador y denominador"}</text>
        <foreignObject x={phase === 2 ? 514 : 486} y="150" width="180" height="110">
          <div className={`text-center text-4xl font-semibold text-slate-950 transition ${phase === 0 ? "opacity-25" : "opacity-100"}`}>{transformed}</div>
        </foreignObject>
        <line x1="410" x2="410" y1="238" y2="292" stroke="#0f766e" strokeWidth={phase === 2 ? 4 : 2} strokeDasharray={phase === 2 ? undefined : "6 8"} opacity={phase === 0 ? 0.25 : 0.85} />
        <text x="410" y="312" textAnchor="middle" className="fill-slate-950 text-[18px] font-semibold">{phase === 2 ? "límite = 1" : "esperando una razón estable"}</text>
      </Frame>
    </Layout>
  );
}

function InfinitesimalZoomMode() {
  const [phase, setPhase] = useState<Phase>(0);
  const spread = phase === 0 ? 86 : phase === 1 ? 38 : 10;
  const scale = phase === 0 ? "1×" : phase === 1 ? "4×" : "16×";

  return (
    <Layout
      top={
        <TopMath
          expression={<span>lim x→0 <Fraction top="sen(x)" bottom="x" /></span>}
          form="0/0"
          stage={phase === 0 ? "vista global" : phase === 1 ? "acercamiento local" : "equivalencia infinitesimal"}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Vista global" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Acercar" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Microscopio" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Microscopio matemático">
            Al observar una escala cada vez más pequeña, sen(x) se comporta como x alrededor de 0.
          </Panel>
          <Panel title="Idea">
            La regla de L’Hôpital trabaja precisamente con esa estructura local: compara primeras tasas de cambio.
          </Panel>
        </>
      }
    >
      <Frame label="Zoom infinitesimal para comparar sen(x) y x">
        <rect x="82" y="80" width="656" height="260" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        <line x1="122" x2="698" y1="210" y2="210" stroke="#e2e8f0" />
        <line x1="410" x2="410" y1="104" y2="316" stroke="#e2e8f0" />
        <path d={`M 138 ${252 - spread * 0.18} C 260 ${130 + spread}, 560 ${130 - spread}, 682 ${252 + spread * 0.18}`} fill="none" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />
        <path d={`M 138 ${252 + spread * 0.1} C 262 ${158 + spread * 0.35}, 558 ${158 - spread * 0.35}, 682 ${252 - spread * 0.1}`} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="410" cy="210" r={phase === 2 ? 20 : phase === 1 ? 36 : 58} fill="none" stroke="#d97706" strokeWidth="3" />
        <text x="128" y="104" className="fill-emerald-700 text-[13px] font-semibold">sen(x)</text>
        <text x="638" y="104" className="fill-blue-700 text-[13px] font-semibold">x</text>
        <text x="410" y="372" textAnchor="middle" className="fill-slate-950 text-[20px] font-semibold">zoom local {scale}</text>
      </Frame>
    </Layout>
  );
}

function GrowthDominanceMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const multiplier = phase === 0 ? 0.42 : phase === 1 ? 0.72 : 1;
  const rows = [
    { label: "ln(x)", width: 70, color: "#64748b" },
    { label: "x", width: 130, color: "#0f766e" },
    { label: "x²", width: 245, color: "#2563eb" },
    { label: "eˣ", width: 430, color: "#d97706" },
    { label: "n!", width: 610, color: "#7c3aed" },
  ];

  return (
    <Layout
      top={
        <TopMath
          expression={<span>comparación: ln(x) ≪ x ≪ x<Sup>2</Sup> ≪ e<Sup>x</Sup></span>}
          form="∞/∞"
          stage={phase === 0 ? "crecimiento inicial" : phase === 1 ? "dominancia visible" : "separación extrema"}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Escala inicial" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Expansión" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Dominancia" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Dominancia">
            En límites al infinito, L’Hôpital puede revelar qué familia crece más rápido, pero la jerarquía guía el juicio.
          </Panel>
          <Panel title="Lectura visual">
            Las barras no son datos exactos: representan velocidad de expansión relativa.
          </Panel>
        </>
      }
    >
      <Frame label="Dominancia de crecimiento como ocupación espacial">
        <rect x="74" y="74" width="672" height="286" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        {rows.map((row, index) => {
          const y = 116 + index * 52;
          const width = Math.min(520, Math.max(44, row.width * multiplier));
          return (
            <g key={row.label}>
              <text x="116" y={y + 6} className="fill-slate-700 text-[15px] font-semibold">{row.label}</text>
              <rect x="190" y={y - 17} width="520" height="32" rx="16" fill="#f8fafc" stroke="#e2e8f0" />
              <rect x="190" y={y - 17} width={width} height="32" rx="16" fill={row.color} opacity="0.28" />
              <circle cx={190 + width} cy={y - 1} r="7" fill={row.color} />
            </g>
          );
        })}
      </Frame>
    </Layout>
  );
}

function ValidityAnalysisMode() {
  const [phase, setPhase] = useState<Phase>(0);
  const paths = [
    { title: "Álgebra mejor", detail: "factorizar o cancelar aclara antes", color: "#0f766e" },
    { title: "L’Hôpital ayuda", detail: "0/0 o ∞/∞ con tasas claras", color: "#2563eb" },
    { title: "Costo crece", detail: "derivar complica la expresión", color: "#d97706" },
  ];

  return (
    <Layout
      top={
        <TopMath
          expression={<span>límite difícil ≠ aplicar L’Hôpital automáticamente</span>}
          form="juicio"
          stage={paths[phase].title}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Álgebra" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="L’Hôpital" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Evitar costo" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Uso responsable">
            La regla es poderosa cuando transforma ambigüedad en estructura. No es una respuesta universal para cualquier límite.
          </Panel>
          <Panel title="Meta">
            El buen camino reduce complejidad y aumenta claridad matemática.
          </Panel>
        </>
      }
    >
      <Frame label="Análisis de validez y costo de aplicar L'Hôpital">
        <rect x="80" y="82" width="660" height="250" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        <circle cx="410" cy="206" r="48" fill="#0f172a" opacity="0.06" />
        <text x="410" y="202" textAnchor="middle" className="fill-slate-950 text-[15px] font-semibold">límite</text>
        <text x="410" y="222" textAnchor="middle" className="fill-slate-500 text-[11px]">elige estrategia</text>
        {paths.map((path, index) => {
          const positions = [
            { x: 126, y: 124 },
            { x: 514, y: 124 },
            { x: 320, y: 278 },
          ];
          const p = positions[index];
          const active = phase === index;
          return (
            <g key={path.title}>
              <path d={`M 410 206 C ${p.x + 110} ${p.y + 40}, ${p.x + 110} ${p.y + 40}, ${p.x + 92} ${p.y + 42}`} fill="none" stroke={path.color} strokeWidth={active ? 4 : 2} strokeDasharray={active ? undefined : "7 9"} opacity={active ? 0.9 : 0.35} />
              <foreignObject x={p.x} y={p.y} width="196" height="86">
                <div className={`rounded-2xl bg-white p-3 shadow-sm ring-1 ${active ? "ring-slate-300" : "ring-slate-200/70"}`}>
                  <div className="text-sm font-semibold text-slate-950">{path.title}</div>
                  <div className="mt-1 text-xs leading-snug text-slate-500">{path.detail}</div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </Frame>
    </Layout>
  );
}

const modes: Array<[Mode, string]> = [
  ["local", "Comportamiento local"],
  ["resolution", "Resolución estructural"],
  ["zoom", "Zoom infinitesimal"],
  ["dominance", "Dominancia"],
  ["validity", "Validez"],
];

export function LHopitalClearVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("local");

  return (
    <VisualShell
      title={title ?? "Regla de L’Hôpital"}
      subtitle="Compara comportamientos locales hasta que la estructura del límite se vuelve legible."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex flex-wrap gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
          {modes.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                mode === id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {mode === "local" ? <LocalBehaviorMode /> : null}
        {mode === "resolution" ? <StructuralResolutionMode /> : null}
        {mode === "zoom" ? <InfinitesimalZoomMode /> : null}
        {mode === "dominance" ? <GrowthDominanceMode /> : null}
        {mode === "validity" ? <ValidityAnalysisMode /> : null}
      </div>
    </VisualShell>
  );
}
