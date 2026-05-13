import { type ReactNode, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 420;

type Mode = "competition" | "resolution" | "layers" | "map" | "microscope" | "hierarchy" | "judgment";
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
        phase === current ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 ring-1 ring-slate-200/70 hover:text-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[340px] w-full" role="img" aria-label={label}>
        <defs>
          <radialGradient id="lhaze" cx="50%" cy="42%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
            <stop offset="52%" stopColor="#e0f2fe" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.98" />
          </radialGradient>
          <linearGradient id="resolveGlow" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
            <stop offset="52%" stopColor="#14b8a6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.11" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="26" fill="url(#lhaze)" />
        {children}
      </svg>
    </div>
  );
}

function Layout({ controls, children, side }: { controls: ReactNode; children: ReactNode; side: ReactNode }) {
  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-4 p-4 sm:p-5">
        {controls}
        {children}
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">{side}</aside>
    </div>
  );
}

function ExpressionCard({ title, children, x, y, active = true }: { title: string; children: ReactNode; x: number; y: number; active?: boolean }) {
  return (
    <foreignObject x={x} y={y} width="220" height="84">
      <div className={`rounded-2xl bg-white/90 p-3 shadow-sm ring-1 ring-slate-200/70 transition ${active ? "opacity-100" : "opacity-45"}`}>
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">{title}</div>
        <div className="mt-2 text-lg font-semibold text-slate-950">{children}</div>
      </div>
    </foreignObject>
  );
}

function CompetitionScene() {
  const [phase, setPhase] = useState<Phase>(0);
  const balance = phase === 0 ? 0.5 : phase === 1 ? 0.82 : 0.18;
  const examples = [
    { label: "sen(x) / x", top: 126, bottom: 122, color: "#0f766e" },
    { label: "eˣ / x³", top: phase === 2 ? 172 : 116, bottom: phase === 2 ? 76 : 132, color: "#2563eb" },
    { label: "ln(x) / x", top: phase === 1 ? 72 : 96, bottom: phase === 1 ? 168 : 136, color: "#d97706" },
  ];

  return (
    <Layout
      controls={
        <div className="flex flex-wrap gap-2">
          <PhaseButton phase={0} current={phase} label="Competencia ambigua" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Denominador domina" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Numerador domina" onClick={setPhase} />
        </div>
      }
      side={
        <>
          <Panel title="Competencia de ritmos">
            Una forma indeterminada es una carrera sin ganador visible. La pregunta no es “cuánto vale cada parte”, sino cuál cambia más rápido.
          </Panel>
          <Panel title="Lectura">
            L’Hôpital compara tasas locales cuando el cociente original no decide por sí mismo.
          </Panel>
        </>
      }
    >
      <Frame label="Competencia de crecimiento entre numerador y denominador">
        <rect x="92" y="86" width="636" height="230" rx="34" fill="url(#resolveGlow)" />
        <line x1="410" x2="410" y1="104" y2="298" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="7 9" />
        <text x="255" y="70" textAnchor="middle" className="fill-slate-500 text-[12px] font-medium">numerador</text>
        <text x="565" y="70" textAnchor="middle" className="fill-slate-500 text-[12px] font-medium">denominador</text>
        {examples.map((item, index) => (
          <g key={item.label} opacity={0.92 - index * 0.12}>
            <circle cx={220 + index * 26} cy={220 - item.top * balance * 0.55} r={18 + item.top * 0.08} fill={item.color} opacity="0.16" />
            <circle cx={600 - index * 28} cy={220 - item.bottom * (1 - balance) * 0.55} r={18 + item.bottom * 0.08} fill={item.color} opacity="0.16" />
            <path d={`M ${236 + index * 20} ${220 - item.top * balance * 0.55} C 330 160, 490 160, ${584 - index * 20} ${220 - item.bottom * (1 - balance) * 0.55}`} fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
            <text x="410" y={338 + index * 20} textAnchor="middle" className="fill-slate-500 text-[11px]">{item.label}</text>
          </g>
        ))}
        <text x="410" y="206" textAnchor="middle" className="fill-slate-950 text-[17px] font-semibold">{phase === 0 ? "comportamiento no resuelto" : phase === 1 ? "el cociente colapsa" : "el cociente crece"}</text>
      </Frame>
    </Layout>
  );
}

function ResolutionScene() {
  const [phase, setPhase] = useState<Phase>(0);
  const blur = phase === 0 ? 12 : phase === 1 ? 5 : 0;
  const opacity = phase === 0 ? 0.28 : phase === 1 ? 0.58 : 0.96;

  return (
    <Layout
      controls={
        <div className="flex flex-wrap gap-2">
          <PhaseButton phase={0} current={phase} label="0/0 ambiguo" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Aplicar L’Hôpital" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Estructura clara" onClick={setPhase} />
        </div>
      }
      side={
        <>
          <Panel title="No es magia">
            La regla no reemplaza pensamiento por receta: toma una forma ilegible y pregunta por las tasas que la generan.
          </Panel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Ejemplo</div>
            <div className="mt-3 text-lg font-semibold">
              <Fraction top={<span>e<Sup>x</Sup> − 1</span>} bottom="x" /> → <Fraction top={<span>e<Sup>x</Sup></span>} bottom="1" />
            </div>
          </div>
        </>
      }
    >
      <Frame label="Ambigüedad que se estabiliza al comparar derivadas">
        <filter id="softBlur">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
        <g filter={phase === 2 ? undefined : "url(#softBlur)"} opacity={opacity}>
          <circle cx="410" cy="206" r="118" fill="#14b8a6" opacity="0.12" />
          <circle cx="410" cy="206" r="74" fill="#2563eb" opacity="0.12" />
          <path d="M 182 260 C 292 96, 522 96, 638 260" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
          <path d="M 184 264 C 290 104, 520 104, 636 264" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
        </g>
        <ExpressionCard x={82} y={78} title="forma original" active={phase < 2}>
          <Fraction top={<span>e<Sup>x</Sup> − 1</span>} bottom="x" />
        </ExpressionCard>
        <ExpressionCard x={518} y={78} title="cociente de tasas" active={phase > 0}>
          <Fraction top={<span>e<Sup>x</Sup></span>} bottom="1" />
        </ExpressionCard>
        <path d="M 314 120 C 368 96, 452 96, 506 120" fill="none" stroke="#d97706" strokeWidth={phase === 0 ? 1.5 : 3} strokeDasharray={phase === 0 ? "6 10" : undefined} opacity={phase === 0 ? 0.35 : 0.85} />
        <text x="410" y="336" textAnchor="middle" className="fill-slate-600 text-[13px]">{phase === 0 ? "la forma 0/0 oculta el comportamiento" : phase === 1 ? "las capas derivadas empiezan a alinearse" : "la razón local se lee sin ambigüedad"}</text>
      </Frame>
    </Layout>
  );
}

function LayersScene() {
  const [phase, setPhase] = useState<Phase>(0);
  const left = phase === 0 ? 212 : phase === 1 ? 168 : 132;
  const right = phase === 0 ? 388 : phase === 1 ? 454 : 512;

  return (
    <Layout
      controls={
        <div className="flex flex-wrap gap-2">
          <PhaseButton phase={0} current={phase} label="Cociente original" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Revelar capas" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Cociente derivado" onClick={setPhase} />
        </div>
      }
      side={
        <>
          <Panel title="Transformación estructural">
            La expresión no desaparece: se reorganiza. Numerador y denominador muestran su primera capa de cambio.
          </Panel>
          <Panel title="Idea central">
            f(x)/g(x) se vuelve f'(x)/g'(x) solo cuando la forma indeterminada y las hipótesis lo permiten.
          </Panel>
        </>
      }
    >
      <Frame label="Capas de derivación de una expresión">
        <rect x="98" y="92" width="624" height="210" rx="34" fill="#ffffff" opacity="0.72" stroke="#e2e8f0" />
        <g transform={`translate(${left}, 146)`} opacity={phase === 2 ? 0.34 : 1}>
          <foreignObject x="0" y="0" width="180" height="90">
            <div className="text-center text-3xl font-semibold text-slate-950">
              <Fraction top={<span>e<Sup>x</Sup> − 1</span>} bottom="x" />
            </div>
          </foreignObject>
        </g>
        <g opacity={phase === 0 ? 0.2 : 0.9}>
          <path d={`M ${left + 196} 188 C 352 148, 454 148, ${right - 18} 188`} fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" strokeDasharray={phase === 1 ? "8 8" : undefined} />
          <text x="410" y="134" textAnchor="middle" className="fill-amber-700 text-[12px] font-medium">derivar capas</text>
        </g>
        <g transform={`translate(${right}, 146)`} opacity={phase === 0 ? 0.22 : 1}>
          <foreignObject x="0" y="0" width="160" height="90">
            <div className="text-center text-3xl font-semibold text-slate-950">
              <Fraction top={<span>e<Sup>x</Sup></span>} bottom="1" />
            </div>
          </foreignObject>
        </g>
        <text x="410" y="336" textAnchor="middle" className="fill-slate-500 text-[13px]">{phase === 0 ? "la expresión está comprimida" : phase === 1 ? "las tasas ocultas emergen" : "la estructura local queda estabilizada"}</text>
      </Frame>
    </Layout>
  );
}

function MapScene() {
  const forms = [
    { label: "0/0", x: 170, y: 112, good: true },
    { label: "∞/∞", x: 330, y: 92, good: true },
    { label: "0·∞", x: 500, y: 112, good: false },
    { label: "∞−∞", x: 646, y: 190, good: false },
    { label: "1^∞", x: 502, y: 282, good: false },
    { label: "0^0", x: 330, y: 304, good: false },
    { label: "∞^0", x: 170, y: 282, good: false },
  ];

  return (
    <Layout
      controls={<div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/70">Mapa conceptual de formas indeterminadas</div>}
      side={
        <>
          <Panel title="Uso responsable">
            L’Hôpital aplica directamente a cocientes 0/0 o ∞/∞. Otras formas suelen necesitar transformación previa.
          </Panel>
          <Panel title="Juicio matemático">
            El camino elegante puede ser algebraico, logarítmico o comparativo antes de derivar.
          </Panel>
        </>
      }
    >
      <Frame label="Mapa de formas indeterminadas y transformaciones válidas">
        <circle cx="410" cy="206" r="72" fill="#0f172a" opacity="0.05" />
        <text x="410" y="200" textAnchor="middle" className="fill-slate-950 text-[15px] font-semibold">cociente</text>
        <text x="410" y="220" textAnchor="middle" className="fill-slate-500 text-[11px]">0/0 o ∞/∞</text>
        {forms.map((form) => (
          <g key={form.label}>
            <path d={`M 410 206 L ${form.x} ${form.y}`} stroke={form.good ? "#0f766e" : "#94a3b8"} strokeWidth={form.good ? 3 : 2} strokeDasharray={form.good ? undefined : "7 9"} opacity="0.65" />
            <circle cx={form.x} cy={form.y} r="42" fill={form.good ? "#ecfdf5" : "#ffffff"} stroke={form.good ? "#0f766e" : "#cbd5e1"} strokeWidth="2" />
            <text x={form.x} y={form.y + 5} textAnchor="middle" className="fill-slate-950 text-[16px] font-semibold">{form.label}</text>
          </g>
        ))}
        <text x="410" y="368" textAnchor="middle" className="fill-slate-500 text-[12px]">las rutas punteadas requieren transformar antes de decidir</text>
      </Frame>
    </Layout>
  );
}

function MicroscopeScene() {
  const [phase, setPhase] = useState<Phase>(0);
  const zoom = phase === 0 ? 1 : phase === 1 ? 2.8 : 6.2;
  const spread = phase === 0 ? 74 : phase === 1 ? 34 : 9;
  const opacity = phase === 0 ? 0.36 : phase === 1 ? 0.66 : 0.96;

  return (
    <Layout
      controls={
        <div className="flex flex-wrap gap-2">
          <PhaseButton phase={0} current={phase} label="Vista normal" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Acercamiento local" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Microscopio infinitesimal" onClick={setPhase} />
        </div>
      }
      side={
        <>
          <Panel title="Microscopio local">
            Cerca de x = 0, sen(x) y x se vuelven indistinguibles a primer orden.
          </Panel>
          <Panel title="Lectura">
            L’Hôpital trabaja en esta escala: compara el comportamiento local que queda al amplificar el límite.
          </Panel>
        </>
      }
    >
      <Frame label="Microscopio infinitesimal para sen(x) dividido entre x">
        <circle cx="410" cy="206" r={130 / zoom} fill="none" stroke="#0f172a" strokeWidth="2" opacity="0.18" />
        <circle cx="410" cy="206" r="118" fill="#ffffff" opacity="0.55" stroke="#e2e8f0" />
        <path d={`M ${180 + spread} ${254} C ${292} ${145 + spread * 0.22}, ${528} ${145 - spread * 0.22}, ${640 - spread} ${254}`} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" opacity={opacity} />
        <path d={`M ${180 + spread} ${254 - spread * 0.18} C ${292} ${154}, ${528} ${154}, ${640 - spread} ${254 + spread * 0.18}`} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity={opacity} />
        <line x1="190" x2="630" y1="254" y2="254" stroke="#cbd5e1" strokeDasharray="7 9" />
        <circle cx="410" cy="206" r={phase === 2 ? 8 : 14} fill="#d97706" opacity="0.86" />
        <text x="410" y="74" textAnchor="middle" className="fill-slate-950 text-[18px] font-semibold">
          <tspan>sen(x) / x → 1</tspan>
        </text>
        <text x="410" y="346" textAnchor="middle" className="fill-slate-500 text-[12px]">zoom local ×{zoom.toFixed(1)}</text>
      </Frame>
    </Layout>
  );
}

function HierarchyScene() {
  const families = [
    { label: "ln(x)", width: 98, color: "#64748b" },
    { label: "x", width: 170, color: "#0f766e" },
    { label: "x²", width: 266, color: "#2563eb" },
    { label: "eˣ", width: 430, color: "#d97706" },
    { label: "n!", width: 590, color: "#7c3aed" },
  ];
  return (
    <Layout
      controls={<div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/70">Jerarquía visual de crecimiento: expansión comparada</div>}
      side={
        <>
          <Panel title="Dominancia">
            En límites al infinito, no todas las expresiones crecen con la misma fuerza.
          </Panel>
          <Panel title="Comparación">
            ln(x) crece lentamente; las potencias dominan al logaritmo; la exponencial domina a las potencias.
          </Panel>
        </>
      }
    >
      <Frame label="Jerarquía de crecimiento como expansión espacial">
        {families.map((family, index) => {
          const y = 92 + index * 56;
          return (
            <g key={family.label}>
              <text x="118" y={y + 7} className="fill-slate-600 text-[13px] font-medium">{family.label}</text>
              <rect x="188" y={y - 16} width={family.width} height="30" rx="15" fill={family.color} opacity="0.16" />
              <rect x="188" y={y - 16} width={family.width * 0.72} height="30" rx="15" fill={family.color} opacity="0.22" />
              <circle cx={188 + family.width} cy={y - 1} r="7" fill={family.color} />
            </g>
          );
        })}
        <path d="M 190 356 C 282 332, 520 332, 686 356" fill="none" stroke="#0f172a" strokeWidth="2" strokeDasharray="8 9" opacity="0.38" />
        <text x="410" y="382" textAnchor="middle" className="fill-slate-500 text-[12px]">más expansión significa mayor dominancia asintótica</text>
      </Frame>
    </Layout>
  );
}

function JudgmentScene() {
  const [phase, setPhase] = useState<Phase>(0);
  const paths = [
    { label: "simplificación algebraica", x: 164, y: 134, active: phase === 0, color: "#0f766e" },
    { label: "L’Hôpital elegante", x: 486, y: 134, active: phase === 1, color: "#2563eb" },
    { label: "derivar sin criterio", x: 326, y: 280, active: phase === 2, color: "#d97706" },
  ];
  return (
    <Layout
      controls={
        <div className="flex flex-wrap gap-2">
          <PhaseButton phase={0} current={phase} label="Álgebra primero" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="L’Hôpital útil" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Camino costoso" onClick={setPhase} />
        </div>
      }
      side={
        <>
          <Panel title="Criterio">
            Una buena solución no aplica derivadas por reflejo: elige la transformación que reduce la complejidad.
          </Panel>
          <Panel title="Responsabilidad">
            Si derivar complica la expresión, la herramienta correcta puede ser factorizar, racionalizar o reescribir.
          </Panel>
        </>
      }
    >
      <Frame label="Rutas responsables para resolver límites">
        <circle cx="410" cy="206" r="58" fill="#0f172a" opacity="0.06" />
        <text x="410" y="204" textAnchor="middle" className="fill-slate-950 text-[15px] font-semibold">límite difícil</text>
        <text x="410" y="224" textAnchor="middle" className="fill-slate-500 text-[11px]">elige una ruta</text>
        {paths.map((path) => (
          <g key={path.label}>
            <path d={`M 410 206 C ${path.x + 70} ${path.y}, ${path.x + 90} ${path.y}, ${path.x + 128} ${path.y + 28}`} fill="none" stroke={path.color} strokeWidth={path.active ? 4 : 2} strokeDasharray={path.active ? undefined : "7 9"} opacity={path.active ? 0.88 : 0.28} />
            <foreignObject x={path.x} y={path.y} width="220" height="86">
              <div className={`rounded-2xl bg-white/92 p-3 text-sm shadow-sm ring-1 ${path.active ? "ring-slate-300" : "ring-slate-200/70 opacity-60"}`}>
                <div className="font-semibold text-slate-950">{path.label}</div>
                <div className="mt-1 text-xs leading-snug text-slate-500">
                  {path.active && phase === 0 ? "reduce antes de derivar" : path.active && phase === 1 ? "la derivada revela la razón" : path.active ? "la complejidad crece" : "ruta alternativa"}
                </div>
              </div>
            </foreignObject>
          </g>
        ))}
      </Frame>
    </Layout>
  );
}

const modes: Array<[Mode, string]> = [
  ["competition", "Competencia"],
  ["resolution", "Resolución"],
  ["layers", "Capas"],
  ["map", "Mapa"],
  ["microscope", "Microscopio"],
  ["hierarchy", "Jerarquía"],
  ["judgment", "Criterio"],
];

export function LHopitalVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("resolution");

  return (
    <VisualShell
      title={title ?? "Regla de L’Hôpital"}
      subtitle="Resuelve ambigüedades comparando estructura y tasas locales."
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
        {mode === "competition" ? <CompetitionScene /> : null}
        {mode === "resolution" ? <ResolutionScene /> : null}
        {mode === "layers" ? <LayersScene /> : null}
        {mode === "map" ? <MapScene /> : null}
        {mode === "microscope" ? <MicroscopeScene /> : null}
        {mode === "hierarchy" ? <HierarchyScene /> : null}
        {mode === "judgment" ? <JudgmentScene /> : null}
      </div>
    </VisualShell>
  );
}
