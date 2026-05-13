import { type PointerEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 430;

type Mode = "families" | "duality" | "special";
type FamilyKey = "power" | "exp" | "trig" | "inverse";
type DualKey = "power" | "exp" | "trig";

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

function TopMath({ left, right, caption }: { left: ReactNode; right: ReactNode; caption: string }) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:grid-cols-[1fr_56px_1fr] lg:items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Estructura de entrada</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{left}</div>
      </div>
      <div className="hidden text-center text-2xl font-semibold text-slate-400 lg:block">→</div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">{caption}</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{right}</div>
      </div>
    </div>
  );
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
          <linearGradient id="ruleField" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#eef6f2" />
          </linearGradient>
          <linearGradient id="powerGlow" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="amberGlow" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
          <marker id="integrationArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#0f766e" />
          </marker>
          <marker id="amberArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#b45309" />
          </marker>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="28" fill="url(#ruleField)" />
        {children}
      </svg>
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

const families: Record<
  FamilyKey,
  {
    label: string;
    input: ReactNode;
    output: ReactNode;
    title: string;
    note: string;
    nodes: Array<{ text: string; x: number; y: number; r: number }>;
    result: string;
    tone: "power" | "amber";
  }
> = {
  power: {
    label: "Potencias",
    input: (
      <Integral>
        x<Sup>n</Sup>
      </Integral>
    ),
    output: (
      <span>
        <Fraction top={<span>x<Sup>n+1</Sup></span>} bottom="n + 1" /> + C
      </span>
    ),
    title: "familia de potencias",
    note: "El exponente sube una unidad y aparece el factor que deshace la derivada.",
    nodes: [
      { text: "x²", x: 150, y: 255, r: 42 },
      { text: "x⁵", x: 245, y: 190, r: 46 },
      { text: "√x", x: 345, y: 255, r: 42 },
      { text: "xⁿ", x: 465, y: 188, r: 54 },
      { text: "xⁿ⁺¹/(n+1)", x: 625, y: 226, r: 66 },
    ],
    result: "misma estructura, exponente desplazado",
    tone: "power",
  },
  exp: {
    label: "Exponenciales",
    input: (
      <Integral>
        e<Sup>x</Sup>
      </Integral>
    ),
    output: (
      <span>
        e<Sup>x</Sup> + C
      </span>
    ),
    title: "familia exponencial",
    note: "La forma exponencial conserva su identidad; en aˣ aparece una escala constante.",
    nodes: [
      { text: "eˣ", x: 165, y: 235, r: 48 },
      { text: "aˣ", x: 290, y: 190, r: 44 },
      { text: "aˣ/ln(a)", x: 455, y: 224, r: 58 },
      { text: "eˣ + C", x: 625, y: 210, r: 58 },
    ],
    result: "crecimiento que se preserva",
    tone: "amber",
  },
  trig: {
    label: "Trigonométricas",
    input: <Integral>sen(x)</Integral>,
    output: <span>−cos(x) + C</span>,
    title: "familia cíclica",
    note: "Seno y coseno forman un ciclo: integrar mueve la estructura alrededor de esa órbita.",
    nodes: [
      { text: "sen(x)", x: 235, y: 150, r: 50 },
      { text: "−cos(x)", x: 525, y: 150, r: 54 },
      { text: "−sen(x)", x: 525, y: 295, r: 54 },
      { text: "cos(x)", x: 235, y: 295, r: 50 },
    ],
    result: "rotación dentro de una familia",
    tone: "power",
  },
  inverse: {
    label: "Inversas trig.",
    input: (
      <Integral>
        <Fraction top="1" bottom={<span>1 + x<Sup>2</Sup></span>} />
      </Integral>
    ),
    output: <span>arctan(x) + C</span>,
    title: "estructuras especiales",
    note: "Ciertas fracciones tienen una silueta muy reconocible y activan una función inversa.",
    nodes: [
      { text: "1/(1+x²)", x: 190, y: 165, r: 58 },
      { text: "arctan(x)", x: 625, y: 165, r: 58 },
      { text: "1/√(1−x²)", x: 190, y: 288, r: 60 },
      { text: "arcsen(x)", x: 625, y: 288, r: 58 },
    ],
    result: "patrones raros y memorables",
    tone: "amber",
  },
};

function FamiliesMode() {
  const [familyKey, setFamilyKey] = useState<FamilyKey>("power");
  const pulse = usePulse(7);
  const family = families[familyKey];
  const path = familyKey === "trig"
    ? "M 235 150 C 365 78, 515 92, 525 150 C 604 206, 602 282, 525 295 C 392 358, 258 356, 235 295 C 156 236, 158 164, 235 150"
    : familyKey === "inverse"
      ? ""
      : "M 150 255 C 260 145, 390 286, 465 188 C 520 122, 586 168, 625 226";

  return (
    <Layout
      top={<TopMath left={family.input} right={family.output} caption="Antiderivada reconocida" />}
      controls={
        <>
          {(Object.keys(families) as FamilyKey[]).map((key) => (
            <PillButton key={key} value={key} current={familyKey} label={families[key].label} onClick={setFamilyKey} />
          ))}
        </>
      }
      side={
        <>
          <Panel title={family.title}>{family.note}</Panel>
          <Panel title="Lectura estructural">La integral se reconoce por familia: primero se ve la forma, luego aparece la antiderivada natural.</Panel>
        </>
      }
    >
      <Frame label="Organizacion visual de familias de integrales inmediatas">
        {familyKey !== "inverse" ? (
          <path d={path} fill="none" stroke={family.tone === "power" ? "#0f766e" : "#a16207"} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" opacity="0.3" />
        ) : null}
        {familyKey === "trig" ? (
          <>
            <path d="M 318 124 C 382 96, 462 103, 500 135" fill="none" stroke="#0f766e" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#integrationArrow)" opacity="0.86" />
            <path d="M 558 205 C 580 236, 572 266, 544 284" fill="none" stroke="#0f766e" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#integrationArrow)" opacity="0.86" />
            <path d="M 444 324 C 374 350, 300 340, 256 306" fill="none" stroke="#0f766e" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#integrationArrow)" opacity="0.86" />
            <path d="M 202 244 C 181 210, 184 177, 214 158" fill="none" stroke="#0f766e" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#integrationArrow)" opacity="0.86" />
            <rect x="342" y="208" width="136" height="32" rx="14" fill="#ffffff" fillOpacity="0.92" stroke="#dbe4ef" />
            <text x="410" y="229" textAnchor="middle" dominantBaseline="middle" className="fill-slate-600 text-[13px] font-semibold">
              integrar
            </text>
          </>
        ) : null}
        {familyKey === "inverse" ? (
          <>
            <path d="M 260 165 C 365 120, 470 120, 558 165" fill="none" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="8 12" opacity="0.32" />
            <path d="M 260 288 C 365 333, 470 333, 558 288" fill="none" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="8 12" opacity="0.32" />
            <path d="M 292 155 C 384 116, 476 120, 552 155" fill="none" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#amberArrow)" opacity="0.88" />
            <path d="M 292 298 C 384 336, 476 332, 552 298" fill="none" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" markerEnd="url(#amberArrow)" opacity="0.88" />
            <rect x="346" y="211" width="128" height="32" rx="14" fill="#ffffff" fillOpacity="0.94" stroke="#ead7b0" />
            <text x="410" y="232" textAnchor="middle" dominantBaseline="middle" className="fill-amber-800 text-[13px] font-semibold">
              reconocer e integrar
            </text>
          </>
        ) : null}
        {family.nodes.map((node, index) => {
          const active = familyKey === "inverse" ? index === 1 || index === 3 : index === family.nodes.length - 1;
          const lift = Math.sin((pulse + index / family.nodes.length) * Math.PI * 2) * 5;
          const fontSize = node.text.length > 10 ? "text-[16px]" : node.text.length > 7 ? "text-[18px]" : "text-[21px]";
          return (
            <g key={node.text} transform={`translate(0 ${lift.toFixed(2)})`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={active ? (family.tone === "power" ? "#ecfdf5" : "#fffbeb") : "#ffffff"}
                stroke={active ? (family.tone === "power" ? "#0f766e" : "#d97706") : "#cbd5e1"}
                strokeWidth={active ? 2.8 : 1.6}
              />
              <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" className={`fill-slate-950 ${fontSize} font-semibold`}>
                {node.text}
              </text>
            </g>
          );
        })}
        <rect x={familyKey === "trig" ? 552 : 246} y={familyKey === "trig" ? 42 : 52} width={familyKey === "trig" ? 206 : 328} height={familyKey === "trig" ? 34 : 48} rx={familyKey === "trig" ? 13 : 18} fill="#0f172a" />
        <text x={familyKey === "trig" ? 655 : 410} y={familyKey === "trig" ? 64 : 83} textAnchor="middle" className={`fill-white ${familyKey === "trig" ? "text-[13px]" : "text-[18px]"} font-semibold`}>
          {family.result}
        </text>
      </Frame>
    </Layout>
  );
}

const dualExamples: Record<
  DualKey,
  {
    label: string;
    integral: ReactNode;
    antiderivative: ReactNode;
    derivative: ReactNode;
    svgLeft: string;
    svgRight: string;
    note: string;
  }
> = {
  power: {
    label: "Potencia",
    integral: (
      <Integral>
        x<Sup>2</Sup>
      </Integral>
    ),
    antiderivative: (
      <span>
        <Fraction top={<span>x<Sup>3</Sup></span>} bottom="3" /> + C
      </span>
    ),
    derivative: (
      <span>
        d/dx(<Fraction top={<span>x<Sup>3</Sup></span>} bottom="3" />) = x<Sup>2</Sup>
      </span>
    ),
    svgLeft: "x²",
    svgRight: "x³/3",
    note: "La división entre 3 aparece porque al derivar x³ vuelve a bajar ese factor.",
  },
  exp: {
    label: "Exponencial",
    integral: (
      <Integral>
        e<Sup>x</Sup>
      </Integral>
    ),
    antiderivative: (
      <span>
        e<Sup>x</Sup> + C
      </span>
    ),
    derivative: (
      <span>
        d/dx(e<Sup>x</Sup>) = e<Sup>x</Sup>
      </span>
    ),
    svgLeft: "eˣ",
    svgRight: "eˣ",
    note: "La exponencial eˣ es estable: derivar e integrar conservan la misma forma.",
  },
  trig: {
    label: "Trigonométrica",
    integral: <Integral>cos(x)</Integral>,
    antiderivative: <span>sen(x) + C</span>,
    derivative: <span>d/dx(sen(x)) = cos(x)</span>,
    svgLeft: "cos(x)",
    svgRight: "sen(x)",
    note: "La antiderivada se lee como el paso inverso dentro del ciclo trigonométrico.",
  },
};

function DualityMode() {
  const [dualKey, setDualKey] = useState<DualKey>("power");
  const [reverse, setReverse] = useState(false);
  const pulse = usePulse(6);
  const selected = dualExamples[dualKey];
  const arrowX = 338 + pulse * 144;

  return (
    <Layout
      top={<TopMath left={selected.integral} right={reverse ? selected.derivative : selected.antiderivative} caption={reverse ? "Derivada recuperada" : "Antiderivada estructural"} />}
      controls={
        <>
          {(Object.keys(dualExamples) as DualKey[]).map((key) => (
            <PillButton key={key} value={key} current={dualKey} label={dualExamples[key].label} onClick={setDualKey} />
          ))}
          <button
            type="button"
            onClick={() => setReverse((value) => !value)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200/80 transition hover:text-slate-950"
          >
            {reverse ? "Ver integración" : "Ver derivación inversa"}
          </button>
        </>
      }
      side={
        <>
          <Panel title="Dualidad">{selected.note}</Panel>
          <Panel title="Idea visual">La misma estructura viaja en dos sentidos: integrar construye una forma cuya derivada regresa al integrando.</Panel>
        </>
      }
    >
      <Frame label="Transformacion visual entre integrando y antiderivada">
        <rect x="86" y="90" width="250" height="240" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        <rect x="484" y="90" width="250" height="240" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        <text x="211" y="134" textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold uppercase tracking-[0.2em]">
          integrando
        </text>
        <text x="609" y="134" textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold uppercase tracking-[0.2em]">
          familia origen
        </text>
        <circle cx="211" cy="218" r="70" fill="url(#powerGlow)" stroke="#0f766e" strokeOpacity="0.5" />
        <circle cx="609" cy="218" r="80" fill="url(#amberGlow)" stroke="#d97706" strokeOpacity="0.5" />
        <text x="211" y="228" textAnchor="middle" className="fill-slate-950 text-[34px] font-bold">
          {selected.svgLeft}
        </text>
        <text x="609" y="228" textAnchor="middle" className="fill-slate-950 text-[34px] font-bold">
          {selected.svgRight}
        </text>
        <path d="M 340 218 C 392 174, 430 174, 482 218" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx={arrowX} cy={218 - Math.sin(pulse * Math.PI) * 28} r="9" fill="#0f172a" />
        <text x="410" y="286" textAnchor="middle" className="fill-slate-700 text-[16px] font-semibold">
          {reverse ? "derivar confirma la estructura" : "integrar reconstruye la estructura"}
        </text>
      </Frame>
    </Layout>
  );
}

function SpecialMode() {
  const [selected, setSelected] = useState<"arctan" | "arcsen">("arctan");
  const [probe, setProbe] = useState(0.42);
  const [dragging, setDragging] = useState(false);
  const isArctan = selected === "arctan";
  const leftBox = { x: 74, y: 88, w: 302, h: 236 };
  const rightBox = { x: 444, y: 88, w: 302, h: 236 };
  const domainMin = isArctan ? -2.4 : -0.95;
  const domainMax = isArctan ? 2.4 : 0.95;
  const yMin = isArctan ? 0 : 0.15;
  const yMax = isArctan ? 1.05 : 3.4;
  const aMin = isArctan ? -1.25 : -1.35;
  const aMax = isArctan ? 1.25 : 1.35;
  const integrand = (x: number) => (isArctan ? 1 / (1 + x * x) : 1 / Math.sqrt(Math.max(0.08, 1 - x * x)));
  const primitive = (x: number) => (isArctan ? Math.atan(x) : Math.asin(clamp(x, -0.999, 0.999)));
  const sx = (box: typeof leftBox, x: number) => box.x + ((x - domainMin) / (domainMax - domainMin)) * box.w;
  const sy = (box: typeof leftBox, y: number, min: number, max: number) => box.y + box.h - ((y - min) / (max - min)) * box.h;
  const makePath = (box: typeof leftBox, fn: (x: number) => number, min: number, max: number) =>
    Array.from({ length: 190 }, (_, i) => {
      const x = domainMin + ((domainMax - domainMin) * i) / 189;
      const y = clamp(fn(x), min, max);
      return `${i === 0 ? "M" : "L"} ${sx(box, x).toFixed(2)} ${sy(box, y, min, max).toFixed(2)}`;
    }).join(" ");
  const activeX = clamp(probe, domainMin + 0.04, domainMax - 0.04);
  const leftX = sx(leftBox, activeX);
  const rightX = sx(rightBox, activeX);
  const integrandY = sy(leftBox, clamp(integrand(activeX), yMin, yMax), yMin, yMax);
  const primitiveY = sy(rightBox, primitive(activeX), aMin, aMax);

  function updateProbe(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * W;
    const inLeft = svgX >= leftBox.x && svgX <= leftBox.x + leftBox.w;
    const inRight = svgX >= rightBox.x && svgX <= rightBox.x + rightBox.w;
    if (!inLeft && !inRight) return;
    const box = inLeft ? leftBox : rightBox;
    const next = domainMin + ((svgX - box.x) / box.w) * (domainMax - domainMin);
    setProbe(clamp(next, domainMin + 0.04, domainMax - 0.04));
  }

  return (
    <Layout
      top={
        <TopMath
          left={
            isArctan ? (
              <Integral>
                <Fraction top="1" bottom={<span>1 + x<Sup>2</Sup></span>} />
              </Integral>
            ) : (
              <Integral>
                <Fraction top="1" bottom={<span>√(1 − x<Sup>2</Sup>)</span>} />
              </Integral>
            )
          }
          right={isArctan ? <span>arctan(x) + C</span> : <span>arcsen(x) + C</span>}
          caption="Forma especial reconocida"
        />
      }
      controls={
        <>
          <PillButton value="arctan" current={selected} label="1/(1 + x²)" onClick={(value) => { setSelected(value); setProbe(0.42); }} />
          <PillButton value="arcsen" current={selected} label="1/√(1 − x²)" onClick={(value) => { setSelected(value); setProbe(0.42); }} />
          {[-0.6, 0, 0.6].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setProbe(clamp(value, domainMin + 0.04, domainMax - 0.04))}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                Math.abs(activeX - value) < 0.03 ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200/80 hover:text-slate-950"
              }`}
            >
              x = {value}
            </button>
          ))}
        </>
      }
      side={
        <>
          <Panel title="Reconocimiento fino">Mueve el cursor sobre cualquiera de las dos gráficas: el mismo valor de x conecta la firma del integrando con la curva que acumula.</Panel>
          <Panel title="Lectura">{isArctan ? "1/(1+x²) es una campana suave; su acumulación crece como arctan(x) y se aplana lejos del centro." : "1/√(1−x²) crece cerca de los bordes del dominio; esa firma produce arcsen(x)."}</Panel>
        </>
      }
    >
      <Frame
        label="Comparacion interactiva de estructuras especiales de integrales trigonométricas inversas"
        onPointerDown={(event) => {
          setDragging(true);
          updateProbe(event);
        }}
        onPointerMove={(event) => {
          if (dragging) updateProbe(event);
        }}
        onPointerUp={() => setDragging(false)}
      >
        {[leftBox, rightBox].map((box, index) => (
          <g key={index}>
            <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="24" fill="#ffffff" stroke="#dbe4ef" />
            <line x1={box.x + 22} x2={box.x + box.w - 22} y1={box.y + box.h / 2} y2={box.y + box.h / 2} stroke="#e2e8f0" strokeWidth="1.4" />
            <line x1={box.x + box.w / 2} x2={box.x + box.w / 2} y1={box.y + 22} y2={box.y + box.h - 22} stroke="#eef2f7" strokeWidth="1.4" />
          </g>
        ))}
        <text x={leftBox.x + leftBox.w / 2} y={leftBox.y - 18} textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold uppercase tracking-[0.18em]">
          firma del integrando
        </text>
        <text x={rightBox.x + rightBox.w / 2} y={rightBox.y - 18} textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold uppercase tracking-[0.18em]">
          antiderivada reconocida
        </text>
        <path d={makePath(leftBox, integrand, yMin, yMax)} fill="none" stroke={isArctan ? "#0f766e" : "#7c3aed"} strokeWidth="4" strokeLinecap="round" />
        <path d={makePath(rightBox, primitive, aMin, aMax)} fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <line x1={leftX} x2={leftX} y1={leftBox.y + 16} y2={leftBox.y + leftBox.h - 16} stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
        <line x1={rightX} x2={rightX} y1={rightBox.y + 16} y2={rightBox.y + rightBox.h - 16} stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
        <circle cx={leftX} cy={integrandY} r="9" fill="#0f172a" />
        <circle cx={rightX} cy={primitiveY} r="9" fill="#0f172a" />
        <path d={`M ${leftX.toFixed(2)} ${integrandY.toFixed(2)} C 410 92, 410 92, ${rightX.toFixed(2)} ${primitiveY.toFixed(2)}`} fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="7 10" opacity="0.55" />
        <rect x="238" y="346" width="344" height="48" rx="17" fill="#0f172a" />
        <text x="410" y="377" textAnchor="middle" className="fill-white text-[18px] font-semibold">
          {isArctan ? "1/(1+x²)  →  arctan(x)" : "1/√(1−x²)  →  arcsen(x)"}
        </text>
      </Frame>
    </Layout>
  );
}

export function BasicIntegrationRulesVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("families");
  const modes = useMemo<Array<[Mode, string]>>(
    () => [
      ["families", "Familias estructurales"],
      ["duality", "Derivada ↔ antiderivada"],
      ["special", "Estructuras especiales"],
    ],
    [],
  );

  return (
    <VisualShell
      title={title ?? "Reglas básicas e integrales inmediatas"}
      subtitle="Reconoce familias de integración por estructura, no por memoria aislada."
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
        {mode === "families" ? <FamiliesMode /> : null}
        {mode === "duality" ? <DualityMode /> : null}
        {mode === "special" ? <SpecialMode /> : null}
      </div>
    </VisualShell>
  );
}
