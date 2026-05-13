import { type PointerEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 430;

type Mode = "transform" | "geometry" | "strategy";
type TechniqueKey = "substitution" | "parts" | "partial" | "trig";

function Sup({ children }: { children: ReactNode }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function Fraction({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle leading-none">
      <span>{top}</span>
      <span className="my-1 h-px w-full min-w-8 bg-current" />
      <span>{bottom}</span>
    </span>
  );
}

function Integral({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-3xl leading-none">∫</span>
      <span>{children}</span>
      <span>dx</span>
    </span>
  );
}

function usePulse(period = 8) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = ((now - start) / 1000) / period;
      setTick(0.5 - 0.5 * Math.cos(t * Math.PI * 2));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [period]);
  return tick;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Frame({
  children,
  label,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  children: ReactNode;
  label: string;
  onPointerDown?: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerMove?: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerUp?: (event: PointerEvent<SVGSVGElement>) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto min-h-[350px] w-full touch-none"
        role="img"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <defs>
          <linearGradient id="techField" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fbfcfa" />
            <stop offset="100%" stopColor="#eef6f2" />
          </linearGradient>
          <linearGradient id="techEmerald" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="techAmber" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
          <marker id="flowArrowTech" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#0f172a" />
          </marker>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="28" fill="url(#techField)" />
        {children}
      </svg>
    </div>
  );
}

function TopMath({ left, center, right }: { left: ReactNode; center: string; right: ReactNode }) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:grid-cols-[1fr_210px_1fr] lg:items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Estructura inicial</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{left}</div>
      </div>
      <div className="rounded-xl bg-slate-950 px-3 py-2 text-center text-sm font-semibold text-white">{center}</div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Forma integrable</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{right}</div>
      </div>
    </div>
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

function PillButton<T extends string>({ value, current, label, onClick }: { value: T; current: T; label: string; onClick: (value: T) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        current === value ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200/80 hover:text-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

const techniques: Record<
  TechniqueKey,
  {
    label: string;
    topLeft: ReactNode;
    topRight: ReactNode;
    center: string;
    sideTitle: string;
    sideCopy: string;
    nodes: Array<{ text: string; x: number; y: number; r: number; tone: "emerald" | "amber" | "slate" }>;
    flows: Array<{ d: string; tone: "emerald" | "amber" | "slate" }>;
  }
> = {
  substitution: {
    label: "Sustitución u",
    topLeft: (
      <Integral>
        2x cos(x<Sup>2</Sup>)
      </Integral>
    ),
    topRight: <Integral>cos(u) du</Integral>,
    center: "extraer estructura interna",
    sideTitle: "Capa oculta",
    sideCopy: "La pieza x² no es un adorno: su cambio 2x dx ya está dentro de la integral.",
    nodes: [
      { text: "2x", x: 156, y: 240, r: 44, tone: "amber" },
      { text: "cos(x²)", x: 312, y: 190, r: 62, tone: "emerald" },
      { text: "u = x²", x: 470, y: 160, r: 54, tone: "emerald" },
      { text: "du = 2x dx", x: 470, y: 286, r: 62, tone: "amber" },
      { text: "∫cos(u) du", x: 650, y: 224, r: 72, tone: "slate" },
    ],
    flows: [
      { d: "M 206 232 C 292 294, 390 304, 420 286", tone: "amber" },
      { d: "M 362 180 C 396 150, 420 146, 430 158", tone: "emerald" },
      { d: "M 530 160 C 595 166, 626 190, 636 214", tone: "slate" },
      { d: "M 532 286 C 594 280, 628 258, 640 236", tone: "slate" },
    ],
  },
  parts: {
    label: "Por partes",
    topLeft: (
      <Integral>
        x e<Sup>x</Sup>
      </Integral>
    ),
    topRight: (
      <span>
        x e<Sup>x</Sup> − ∫e<Sup>x</Sup> dx
      </span>
    ),
    center: "redistribuir complejidad",
    sideTitle: "Intercambio",
    sideCopy: "Una parte se deriva para simplificarse; la otra se integra para sostener la estructura.",
    nodes: [
      { text: "u = x", x: 170, y: 180, r: 52, tone: "emerald" },
      { text: "dv = eˣdx", x: 170, y: 294, r: 58, tone: "amber" },
      { text: "du = dx", x: 410, y: 160, r: 50, tone: "emerald" },
      { text: "v = eˣ", x: 410, y: 314, r: 50, tone: "amber" },
      { text: "uv − ∫vdu", x: 640, y: 236, r: 76, tone: "slate" },
    ],
    flows: [
      { d: "M 222 178 C 292 140, 344 136, 368 154", tone: "emerald" },
      { d: "M 226 294 C 292 338, 348 338, 372 322", tone: "amber" },
      { d: "M 458 166 C 544 174, 594 202, 612 225", tone: "slate" },
      { d: "M 458 310 C 542 300, 594 270, 614 246", tone: "slate" },
    ],
  },
  partial: {
    label: "Fracciones parciales",
    topLeft: (
      <Integral>
        <Fraction top="1" bottom="(x+1)(x+2)" />
      </Integral>
    ),
    topRight: (
      <Integral>
        <span>
          <Fraction top="A" bottom="x+1" /> + <Fraction top="B" bottom="x+2" />
        </span>
      </Integral>
    ),
    center: "descomponer en piezas simples",
    sideTitle: "Separación",
    sideCopy: "El denominador factorizado revela dos comportamientos elementales que pueden integrarse por separado.",
    nodes: [
      { text: "(x+1)", x: 210, y: 164, r: 54, tone: "emerald" },
      { text: "(x+2)", x: 210, y: 292, r: 54, tone: "amber" },
      { text: "1/((x+1)(x+2))", x: 410, y: 226, r: 82, tone: "slate" },
      { text: "A/(x+1)", x: 626, y: 164, r: 58, tone: "emerald" },
      { text: "B/(x+2)", x: 626, y: 292, r: 58, tone: "amber" },
    ],
    flows: [
      { d: "M 474 204 C 536 168, 568 160, 584 162", tone: "emerald" },
      { d: "M 474 248 C 536 286, 568 294, 584 292", tone: "amber" },
      { d: "M 262 164 C 314 172, 346 190, 360 208", tone: "emerald" },
      { d: "M 262 292 C 314 284, 346 262, 360 244", tone: "amber" },
    ],
  },
  trig: {
    label: "Trigonométricas",
    topLeft: (
      <Integral>
        sen<Sup>2</Sup>(x)
      </Integral>
    ),
    topRight: (
      <Integral>
        <Fraction top={<span>1 − cos(2x)</span>} bottom="2" />
      </Integral>
    ),
    center: "reorganizar identidad",
    sideTitle: "Ritmo",
    sideCopy: "La potencia trigonométrica se vuelve integrable cuando la identidad revela una oscilación más simple.",
    nodes: [
      { text: "sen²(x)", x: 180, y: 226, r: 66, tone: "emerald" },
      { text: "identidad", x: 410, y: 138, r: 58, tone: "slate" },
      { text: "1/2", x: 560, y: 206, r: 42, tone: "amber" },
      { text: "−cos(2x)/2", x: 620, y: 298, r: 70, tone: "emerald" },
      { text: "integrable", x: 410, y: 308, r: 58, tone: "slate" },
    ],
    flows: [
      { d: "M 242 210 C 310 158, 346 140, 356 138", tone: "emerald" },
      { d: "M 464 150 C 520 166, 548 184, 554 198", tone: "amber" },
      { d: "M 464 152 C 542 206, 596 254, 610 278", tone: "emerald" },
      { d: "M 566 298 C 502 322, 464 320, 450 310", tone: "slate" },
    ],
  },
};

function Node({ text, x, y, r, tone, active }: { text: string; x: number; y: number; r: number; tone: "emerald" | "amber" | "slate"; active?: boolean }) {
  const stroke = tone === "emerald" ? "#0f766e" : tone === "amber" ? "#d97706" : "#0f172a";
  const fill = tone === "emerald" ? "#ecfdf5" : tone === "amber" ? "#fffbeb" : "#ffffff";
  const size = text.length > 12 ? "text-[15px]" : text.length > 8 ? "text-[17px]" : "text-[20px]";
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth={active ? 3 : 1.8} opacity={active ? 1 : 0.94} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={`fill-slate-950 ${size} font-semibold`}>
        {text}
      </text>
    </g>
  );
}

function TransformMode() {
  const [key, setKey] = useState<TechniqueKey>("substitution");
  const pulse = usePulse(7);
  const selected = techniques[key];

  return (
    <Layout
      top={<TopMath left={selected.topLeft} center={selected.center} right={selected.topRight} />}
      controls={
        <>
          {(Object.keys(techniques) as TechniqueKey[]).map((item) => (
            <PillButton key={item} value={item} current={key} label={techniques[item].label} onClick={setKey} />
          ))}
        </>
      }
      side={
        <>
          <Panel title={selected.sideTitle}>{selected.sideCopy}</Panel>
          <Panel title="Lectura">La técnica no se elige por receta: aparece cuando una estructura puede transformarse en una familia inmediata.</Panel>
        </>
      }
    >
      <Frame label="Transformacion estructural de tecnicas de integracion">
        {selected.flows.map((flow, index) => {
          const color = flow.tone === "emerald" ? "#0f766e" : flow.tone === "amber" ? "#d97706" : "#0f172a";
          return <path key={index} d={flow.d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" markerEnd="url(#flowArrowTech)" opacity={0.32 + pulse * 0.42} />;
        })}
        {selected.nodes.map((node, index) => (
          <Node key={node.text} {...node} active={index === selected.nodes.length - 1} />
        ))}
      </Frame>
    </Layout>
  );
}

function GeometryMode() {
  const [angleDegrees, setAngleDegrees] = useState(48);
  const cx = 410;
  const cy = 220;
  const r = 124;
  const angle = (angleDegrees / 180) * Math.PI;
  const px = cx + Math.cos(angle) * r;
  const py = cy - Math.sin(angle) * r;
  const xValue = Math.sin(angle);
  const rootValue = Math.abs(Math.cos(angle));
  const verticalLabelX = px >= cx ? px + 16 : px - 132;

  return (
    <Layout
      top={
        <TopMath
          left={<span>√(a² − x²)</span>}
          center="hacer visible la geometría"
          right={<span>x = a sen(θ)</span>}
        />
      }
      controls={
        <>
          <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
            <span className="whitespace-nowrap">θ = {angleDegrees}°</span>
            <input
              type="range"
              min="0"
              max="180"
              step="1"
              value={angleDegrees}
              onChange={(event) => setAngleDegrees(Number(event.currentTarget.value))}
              className="h-2 w-full accent-slate-950"
              aria-label="Ángulo theta"
            />
          </div>
        </>
      }
      side={
        <>
          <Panel title="Geometría oculta">Mueve la barra: el cateto vertical es x y al mismo tiempo x = a sen(θ).</Panel>
          <Panel title="Correspondencia">
            <span className="font-medium text-slate-900">x/a ≈ {xValue.toFixed(2)}</span>
            <br />
            <span>√(a²−x²)/a ≈ {rootValue.toFixed(2)}</span>
          </Panel>
        </>
      }
    >
      <Frame label="Geometria oculta en sustituciones trigonometricas">
        <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d={`M ${cx} ${cy} A 42 42 0 0 0 ${(cx + Math.cos(angle) * 42).toFixed(2)} ${(cy - Math.sin(angle) * 42).toFixed(2)}`} fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <text x={cx + 52} y={cy - 18} className="fill-violet-700 text-[15px] font-semibold">θ</text>
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <line x1={px} y1={cy} x2={px} y2={py} stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <circle cx={px} cy={py} r="11" fill="#0f172a" className="cursor-grab" />
        <text x={verticalLabelX} y={(py + cy) / 2 + 5} className="fill-teal-800 text-[16px] font-semibold">x = a sen(θ)</text>
        <text x={(px + cx) / 2 - 34} y={cy + 28} className="fill-amber-800 text-[16px] font-semibold">√(a²−x²)</text>
        <rect x="356" y="338" width="108" height="34" rx="13" fill="#ffffff" stroke="#dbe4ef" />
        <text x="410" y="360" textAnchor="middle" className="fill-slate-700 text-[15px] font-semibold">radio a</text>
        <rect x="76" y="78" width="234" height="70" rx="22" fill="#ffffff" stroke="#dbe4ef" />
        <text x="193" y="121" textAnchor="middle" className="fill-slate-950 text-[24px] font-bold">
          √(a²−x²)
        </text>
        <path d="M 318 116 C 370 88, 455 88, 502 116" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#flowArrowTech)" opacity="0.72" />
        <rect x="512" y="78" width="224" height="70" rx="22" fill="#0f172a" />
        <text x="624" y="121" textAnchor="middle" className="fill-white text-[22px] font-semibold">
          x = a sen(θ)
        </text>
      </Frame>
    </Layout>
  );
}

const signatures = [
  { label: "2x cos(x²)", technique: "Sustitución", x: 160, y: 150, targetX: 410, targetY: 120, color: "#0f766e" },
  { label: "x eˣ", technique: "Por partes", x: 160, y: 280, targetX: 410, targetY: 210, color: "#d97706" },
  { label: "1/((x+1)(x+2))", technique: "Fracciones parciales", x: 650, y: 150, targetX: 410, targetY: 302, color: "#7c3aed" },
  { label: "√(a²−x²)", technique: "Sust. trig.", x: 650, y: 280, targetX: 410, targetY: 210, color: "#2563eb" },
];

function StrategyMode() {
  const [active, setActive] = useState(0);
  const selected = signatures[active];

  return (
    <Layout
      top={<TopMath left={<Integral>{selected.label}</Integral>} center="reconocer la firma" right={<span>{selected.technique}</span>} />}
      controls={
        <>
          {signatures.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === index ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200/80 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </>
      }
      side={
        <>
          <Panel title="Estrategia">Cada integral tiene una firma: capa interna, producto, factorización o geometría escondida.</Panel>
          <Panel title="Meta">La decisión técnica se vuelve una lectura estructural, no un árbol de recetas.</Panel>
        </>
      }
    >
      <Frame label="Ambiente de reconocimiento de estrategias de integracion">
        <circle cx="410" cy="216" r="104" fill="#ffffff" stroke="#dbe4ef" strokeWidth="2" />
        <text x="410" y="208" textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold uppercase tracking-[0.18em]">
          estrategia
        </text>
        <text x="410" y="240" textAnchor="middle" className="fill-slate-950 text-[24px] font-bold">
          {selected.technique}
        </text>
        {signatures.map((item, index) => {
          const isActive = active === index;
          return (
            <g key={item.label}>
              <path
                d={`M ${item.x} ${item.y} C ${(item.x + item.targetX) / 2} ${item.y}, ${(item.x + item.targetX) / 2} ${item.targetY}, ${item.targetX} ${item.targetY}`}
                fill="none"
                stroke={item.color}
                strokeWidth={isActive ? 3.4 : 2}
                strokeLinecap="round"
                markerEnd={isActive ? "url(#flowArrowTech)" : undefined}
                opacity={isActive ? 0.82 : 0.2}
              />
              <rect x={item.x - 92} y={item.y - 30} width="184" height="60" rx="20" fill={isActive ? "#0f172a" : "#ffffff"} stroke={isActive ? "#0f172a" : "#dbe4ef"} />
              <text x={item.x} y={item.y + 6} textAnchor="middle" className={`${isActive ? "fill-white" : "fill-slate-700"} text-[16px] font-semibold`}>
                {item.label}
              </text>
            </g>
          );
        })}
      </Frame>
    </Layout>
  );
}

export function IntegrationTechniquesVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("transform");
  const modes = useMemo<Array<[Mode, string]>>(
    () => [
      ["transform", "Transformación estructural"],
      ["geometry", "Geometría oculta"],
      ["strategy", "Reconocimiento estratégico"],
    ],
    [],
  );

  return (
    <VisualShell
      title={title ?? "Técnicas de integración"}
      subtitle="Transforma estructuras difíciles en formas integrables."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
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
        {mode === "transform" ? <TransformMode /> : null}
        {mode === "geometry" ? <GeometryMode /> : null}
        {mode === "strategy" ? <StrategyMode /> : null}
      </div>
    </VisualShell>
  );
}
