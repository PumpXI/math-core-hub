import { type PointerEvent, type ReactNode, useEffect, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 430;
const PAD = 52;

type Mode = "accumulation" | "riemann" | "infinitesimal" | "antiderivative" | "function";
type Phase = 0 | 1 | 2;

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function Integral({ from, to, children }: { from: ReactNode; to: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="relative inline-flex pr-1 text-3xl leading-none">
        ∫
        <span className="absolute -bottom-2 left-3 text-[0.38em]">{from}</span>
        <span className="absolute -top-2 left-3 text-[0.38em]">{to}</span>
      </span>
      <span>{children}</span>
    </span>
  );
}

function format(value: number, digits = 2) {
  return value.toFixed(digits).replace("-0.00", "0.00");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function usePulse(period = 7) {
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
  }, []);
  return tick;
}

function scale(xMin: number, xMax: number, yMin: number, yMax: number) {
  return {
    x: (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2),
    y: (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2),
  };
}

function pathFromFunction(fn: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number, samples = 240) {
  const s = scale(xMin, xMax, yMin, yMax);
  return Array.from({ length: samples }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / (samples - 1);
    const y = Math.max(yMin, Math.min(yMax, fn(x)));
    return `${i === 0 ? "M" : "L"} ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`;
  }).join(" ");
}

function areaPath(fn: (x: number) => number, a: number, b: number, xMin: number, xMax: number, yMin: number, yMax: number) {
  const s = scale(xMin, xMax, yMin, yMax);
  const top = Array.from({ length: 90 }, (_, i) => {
    const x = a + ((b - a) * i) / 89;
    return `${i === 0 ? "M" : "L"} ${s.x(x).toFixed(2)} ${s.y(fn(x)).toFixed(2)}`;
  }).join(" ");
  return `${top} L ${s.x(b).toFixed(2)} ${s.y(0).toFixed(2)} L ${s.x(a).toFixed(2)} ${s.y(0).toFixed(2)} Z`;
}

function localPath(
  fn: (x: number) => number,
  box: { x: number; y: number; w: number; h: number },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  samples = 180,
) {
  const sx = (x: number) => box.x + ((x - xMin) / (xMax - xMin)) * box.w;
  const sy = (y: number) => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;
  const d = Array.from({ length: samples }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / (samples - 1);
    const y = Math.max(yMin, Math.min(yMax, fn(x)));
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
  }).join(" ");
  return { d, sx, sy };
}

function localArea(
  fn: (x: number) => number,
  box: { x: number; y: number; w: number; h: number },
  a: number,
  b: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
) {
  const sx = (x: number) => box.x + ((x - xMin) / (xMax - xMin)) * box.w;
  const sy = (y: number) => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;
  const top = Array.from({ length: 90 }, (_, i) => {
    const x = a + ((b - a) * i) / 89;
    const y = Math.max(yMin, Math.min(yMax, fn(x)));
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
  }).join(" ");
  return `${top} L ${sx(b).toFixed(2)} ${sy(0).toFixed(2)} L ${sx(a).toFixed(2)} ${sy(0).toFixed(2)} Z`;
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

function TopMath({ expression, idea, stage }: { expression: ReactNode; idea: string; stage: string }) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:grid-cols-[1fr_190px_220px] lg:items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Estructura actual</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{expression}</div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Idea</div>
        <div className="mt-2 rounded-xl bg-slate-950 px-3 py-2 text-center text-sm font-semibold text-white">{idea}</div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Etapa</div>
        <div className="mt-2 text-sm font-medium leading-snug text-slate-700">{stage}</div>
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
          <linearGradient id="accumulationFill" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="sliceGlow" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="26" fill="#fbfcfa" />
        {children}
      </svg>
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

function Axes({ xMin, xMax, yMin, yMax }: { xMin: number; xMax: number; yMin: number; yMax: number }) {
  const s = scale(xMin, xMax, yMin, yMax);
  return (
    <>
      <line x1={PAD} x2={W - PAD} y1={s.y(0)} y2={s.y(0)} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={s.x(0)} x2={s.x(0)} y1={PAD} y2={H - PAD} stroke="#e2e8f0" strokeWidth="1.5" />
    </>
  );
}

const baseFn = (x: number) => 0.34 + 0.32 * Math.sin(1.45 * x) + 0.18 * x;
const rateFn = (x: number) => 0.55 + 0.28 * Math.sin(1.25 * x);

function AccumulationMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const xMin = 0;
  const xMax = 5;
  const yMin = -0.15;
  const yMax = 2.15;
  const s = scale(xMin, xMax, yMin, yMax);
  const front = 0.7 + (phase === 0 ? 1.4 : phase === 1 ? 2.9 : 4.25) + pulse * 0.45;
  const b = Math.min(4.8, front);
  const droplets = Array.from({ length: 10 }, (_, i) => 0.35 + ((pulse + i / 10) % 1) * 4.4);

  return (
    <Layout
      top={<TopMath expression={<Integral from="0" to="x">f(t) dt</Integral>} idea="acumulación" stage={phase === 0 ? "flujo inicial" : phase === 1 ? "área creciendo" : "total construido"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Iniciar flujo" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Acumular" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Construir total" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Proceso vivo">
            Integrar no es sombrear una región ya terminada: es dejar que pequeñas contribuciones construyan una cantidad total.
          </Panel>
          <Panel title="Lectura">
            El frente de acumulación avanza y cada rebanada añade un poco al total.
          </Panel>
        </>
      }
    >
      <Frame label="Acumulación continua bajo una curva">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
        <path d={areaPath(baseFn, 0, b, xMin, xMax, yMin, yMax)} fill="url(#accumulationFill)" stroke="none" />
        <path d={pathFromFunction(baseFn, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        {droplets.map((x, i) => (
          <circle key={i} cx={s.x(x)} cy={s.y(baseFn(x)) - 16 - (i % 3) * 8} r="4" fill="#0f766e" opacity={x <= b ? 0.18 : 0.55} />
        ))}
        <line x1={s.x(b)} x2={s.x(b)} y1={s.y(0)} y2={s.y(baseFn(b))} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <circle cx={s.x(b)} cy={s.y(baseFn(b))} r="8" fill="#d97706" stroke="#ffffff" strokeWidth="3" />
      </Frame>
    </Layout>
  );
}

function RiemannMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const n = phase === 0 ? 6 : phase === 1 ? 14 : 34;
  const xMin = 0;
  const xMax = 5;
  const yMin = -0.15;
  const yMax = 2.15;
  const s = scale(xMin, xMax, yMin, yMax);
  const dx = (xMax - xMin) / n;

  return (
    <Layout
      top={<TopMath expression={<span>Σ f(xᵢ) Δx → <Integral from="a" to="b">f(x) dx</Integral></span>} idea="precisión" stage={phase === 0 ? "aproximación gruesa" : phase === 1 ? "refinamiento" : "convergencia visual"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Pocas piezas" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Refinar" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Casi continuo" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Aproximación">
            Las sumas de Riemann construyen área con piezas finitas. Al refinar, el error visible se encoge.
          </Panel>
          <Panel title="Convergencia">
            La transición no es una fórmula aislada: las piezas se estabilizan hacia una región continua.
          </Panel>
        </>
      }
    >
      <Frame label="Sumas de Riemann refinándose hacia el área exacta">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
        <path d={areaPath(baseFn, xMin, xMax, xMin, xMax, yMin, yMax)} fill="#0f766e" opacity="0.08" />
        {Array.from({ length: n }, (_, i) => {
          const x = xMin + i * dx;
          const sample = x + dx * (0.45 + 0.1 * Math.sin((pulse + i) * Math.PI));
          const h = baseFn(sample);
          return (
            <rect
              key={i}
              x={s.x(x)}
              y={s.y(h)}
              width={Math.max(1, s.x(x + dx) - s.x(x) - 1)}
              height={s.y(0) - s.y(h)}
              fill="#2563eb"
              opacity={phase === 2 ? 0.22 : 0.16}
              stroke="#2563eb"
              strokeOpacity="0.38"
            />
          );
        })}
        <path d={pathFromFunction(baseFn, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="568" y="66" width="124" height="46" rx="16" fill="#0f172a" />
        <text x="630" y="96" textAnchor="middle" className="fill-white text-[22px] font-bold">n = {n}</text>
      </Frame>
    </Layout>
  );
}

function InfinitesimalMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const count = phase === 0 ? 12 : phase === 1 ? 28 : 58;
  const stackHeight = phase === 0 ? 96 : phase === 1 ? 138 : 166;
  const curveTop = (t: number) => 318 - 210 * Math.sin(Math.PI * t);
  const curvePath = Array.from({ length: 96 }, (_, i) => {
    const t = i / 95;
    return `${i === 0 ? "M" : "L"} ${(132 + t * 556).toFixed(2)} ${curveTop(t).toFixed(2)}`;
  }).join(" ");

  return (
    <Layout
      top={<TopMath expression={<span>dA = f(x) dx</span>} idea="piezas infinitesimales" stage={phase === 0 ? "rebanadas visibles" : phase === 1 ? "ensamble" : "objeto continuo"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Rebanar" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Ensamblar" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Continuo" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Local a global">
            Cada pieza dA es pequeña, pero juntas construyen una cantidad completa.
          </Panel>
          <Panel title="Construcción">
            La integral une contribuciones locales sin perder la forma global.
          </Panel>
        </>
      }
    >
      <Frame label="Construcción infinitesimal desde rebanadas locales">
        <rect x="92" y="90" width="636" height="250" rx="28" fill="#ffffff" stroke="#dbe4ef" />
        {Array.from({ length: count }, (_, i) => {
          const t = i / Math.max(1, count - 1);
          const x = 132 + t * 556;
          const curveHeight = 210 * Math.sin(Math.PI * t);
          const fillFactor = phase === 0 ? 0.48 : phase === 1 ? 0.78 : 1;
          const assembledHeight = phase === 2
            ? curveHeight
            : Math.min(curveHeight * fillFactor, stackHeight * (0.72 + 0.02 * Math.sin((pulse + t) * Math.PI * 2)));
          const h = Math.max(4, assembledHeight);
          return <rect key={i} x={x} y={318 - h} width={Math.max(3, 520 / count)} height={h} rx="3" fill="url(#sliceGlow)" stroke="#0f766e" strokeOpacity="0.22" />;
        })}
        <path d={curvePath} fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" opacity={phase === 2 ? 0.9 : 0.42} />
        <text x="410" y="370" textAnchor="middle" className="fill-slate-700 text-[14px] font-semibold">{phase === 2 ? "las piezas ya se leen como un todo" : "cada rebanada aporta una cantidad local"}</text>
      </Frame>
    </Layout>
  );
}

function AntiderivativeMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const rateBox = { x: 74, y: 96, w: 270, h: 210 };
  const curveBox = { x: 476, y: 96, w: 270, h: 210 };
  const rate = (x: number) => 0.52 + 0.28 * Math.sin(1.3 * x);
  const antiBase = (x: number) => 0.52 * x - (0.28 / 1.3) * Math.cos(1.3 * x);
  const c = phase === 0 ? 0.35 : phase === 1 ? 0.85 : 1.35;
  const x = 0.45 + pulse * 5.1;
  const rateGraph = localPath(rate, rateBox, 0, 6, 0, 1.05);
  const activeCurve = localPath((v) => antiBase(v) + c, curveBox, 0, 6, 0, 4.8);

  return (
    <Layout
      top={<TopMath expression={<span>F'(x) = f(x)</span>} idea="reconstrucción" stage={phase === 0 ? "misma tasa, curva baja" : phase === 1 ? "curva reconstruida" : "misma tasa, curva alta"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Constante baja" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Base" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Constante alta" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Antiderivada">
            La tasa f(x) indica cómo debe inclinarse F. Al integrarla, la curva global se reconstruye desde esa información local.
          </Panel>
          <Panel title="Familia">
            Cambiar C mueve toda la curva verticalmente, pero no cambia sus pendientes.
          </Panel>
        </>
      }
    >
      <Frame label="Antiderivadas como reconstrucción desde tasas locales">
        <rect x={rateBox.x - 22} y={rateBox.y - 34} width={rateBox.w + 44} height={rateBox.h + 70} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <rect x={curveBox.x - 22} y={curveBox.y - 34} width={curveBox.w + 44} height={curveBox.h + 70} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <text x={rateBox.x} y={rateBox.y - 10} className="fill-amber-700 text-[13px] font-semibold">tasa local f(x)</text>
        <text x={curveBox.x} y={curveBox.y - 10} className="fill-emerald-700 text-[13px] font-semibold">curva reconstruida F(x)+C</text>
        <line x1={rateBox.x} x2={rateBox.x + rateBox.w} y1={rateGraph.sy(0)} y2={rateGraph.sy(0)} stroke="#e2e8f0" />
        <path d={rateGraph.d} fill="none" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        {[0.35, 0.85, 1.35].map((offset, index) => (
          <path key={offset} d={localPath((v) => antiBase(v) + offset, curveBox, 0, 6, 0, 4.8).d} fill="none" stroke={index === phase ? "#0f766e" : "#94a3b8"} strokeWidth={index === phase ? 4 : 2} strokeLinecap="round" opacity={index === phase ? 1 : 0.34} />
        ))}
        <path d="M 366 206 C 398 174, 426 174, 458 206" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="7 8" opacity="0.55" />
        <circle cx={rateGraph.sx(x)} cy={rateGraph.sy(rate(x))} r="7" fill="#d97706" stroke="#ffffff" strokeWidth="3" />
        <circle cx={activeCurve.sx(x)} cy={activeCurve.sy(antiBase(x) + c)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x="410" y="238" textAnchor="middle" className="fill-slate-600 text-[12px]">integrar reconstruye</text>
      </Frame>
    </Layout>
  );
}

function AccumulationFunctionMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const areaBox = { x: 78, y: 104, w: 278, h: 196 };
  const graphBox = { x: 486, y: 104, w: 258, h: 196 };
  const x = Math.min(4.8, 0.5 + (phase === 0 ? 1.25 : phase === 1 ? 2.7 : 4.05) + pulse * 0.28);
  const areaApprox = (v: number) => 0.55 * v + 0.18 * (1 - Math.cos(1.25 * v));
  const F = (v: number) => areaApprox(v) / 1.8;
  const fGraph = localPath(rateFn, areaBox, 0, 5, -0.2, 1.2);
  const FGraph = localPath(F, graphBox, 0, x, -0.1, 1.9);

  return (
    <Layout
      top={<TopMath expression={<span>F(x)=<Integral from="a" to="x">f(t) dt</Integral></span>} idea="función acumulada" stage={phase === 0 ? "comienza a crecer" : phase === 1 ? "se construye el grafo" : "la función ya lleva memoria"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Inicio" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Construir F" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Acumulación amplia" onClick={setPhase} />
        </>
      }
      side={
        <>
          <Panel title="Función acumulada">
            El área bajo f no solo da un número: al variar x, va dibujando una nueva función F.
          </Panel>
          <Panel title="Puente">
            La altura de F(x) registra todo lo acumulado desde el punto inicial.
          </Panel>
        </>
      }
    >
      <Frame label="Región acumulada construyendo simultáneamente la función F">
        <rect x={areaBox.x - 24} y={areaBox.y - 40} width={areaBox.w + 48} height={areaBox.h + 78} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <rect x={graphBox.x - 24} y={graphBox.y - 40} width={graphBox.w + 48} height={graphBox.h + 78} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <text x={areaBox.x} y={areaBox.y - 14} className="fill-emerald-700 text-[13px] font-semibold">área acumulada hasta x</text>
        <text x={graphBox.x} y={graphBox.y - 14} className="fill-blue-700 text-[13px] font-semibold">nuevo punto de F(x)</text>
        <path d={localArea(rateFn, areaBox, 0, x, 0, 5, -0.2, 1.2)} fill="url(#accumulationFill)" />
        <path d={fGraph.d} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
        <line x1={fGraph.sx(x)} x2={fGraph.sx(x)} y1={fGraph.sy(0)} y2={fGraph.sy(rateFn(x))} stroke="#d97706" strokeWidth="3" />
        <path d={FGraph.d} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <circle cx={FGraph.sx(x)} cy={FGraph.sy(F(x))} r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
        <path d="M 372 206 C 410 170, 450 170, 480 206" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="7 8" opacity="0.6" />
        <text x="410" y="244" textAnchor="middle" className="fill-slate-600 text-[12px]">el área dibuja F</text>
      </Frame>
    </Layout>
  );
}

function FundamentalTheoremMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const [xValue, setXValue] = useState(2.85);
  const [dragging, setDragging] = useState(false);
  const leftBox = { x: 70, y: 106, w: 330, h: 206 };
  const rightBox = { x: 508, y: 106, w: 220, h: 206 };
  const x = xValue;
  const F = (v: number) => 0.55 * v + (0.28 / 1.25) * (1 - Math.cos(1.25 * v));
  const fGraph = localPath(rateFn, leftBox, 0, 5, -0.2, 1.2);
  const FGraph = localPath(F, { x: 262, y: 332, w: 296, h: 52 }, 0, 5, -0.1, 3.4);
  const fValue = rateFn(x);
  const slope = fValue;
  const dx = 0.16;
  const stripX = fGraph.sx(x);
  const stripW = Math.max(7, fGraph.sx(Math.min(5, x + dx)) - stripX);
  const heightRatio = clamp((fValue + 0.2) / 1.4, 0, 1);
  const speedY = rightBox.y + rightBox.h - heightRatio * rightBox.h;

  function updateBoundary(event: PointerEvent<SVGSVGElement>) {
    if (!dragging && event.type !== "pointerdown") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const next = ((px - leftBox.x) / leftBox.w) * 5;
    setXValue(clamp(next, 0.35, 4.85));
  }

  function choosePhase(next: Phase) {
    setPhase(next);
    setXValue(next === 0 ? 1.15 : next === 1 ? 2.85 : 4.45);
  }

  return (
    <Layout
      top={
        <TopMath
          expression={phase === 2 ? <span>d/dx <Integral from="a" to="x">f(t)dt</Integral> = f(x)</span> : <span>A(x)=<Integral from="a" to="x">f(t)dt</Integral></span>}
          idea="procesos inversos"
          stage={phase === 0 ? "arrastra la frontera de acumulación" : phase === 1 ? `x = ${format(x, 2)} · dA ≈ f(x)dx` : "la pendiente de A coincide con la altura local"}
        />
      }
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Explorar frontera" onClick={choosePhase} />
          <PhaseButton phase={1} current={phase} label="Ver contribución local" onClick={choosePhase} />
          <PhaseButton phase={2} current={phase} label="Revelar igualdad" onClick={choosePhase} />
        </>
      }
      side={
        <>
          <Panel title="Teorema fundamental">
            Acumular y derivar son procesos inversos: una operación construye total, la otra recupera la tasa local.
          </Panel>
          <Panel title="Lectura visual">
            Donde F crece más rápido, f(x) es más grande. La pendiente de F reproduce la función original.
          </Panel>
        </>
      }
    >
      <Frame
        label="Modelo interactivo del Teorema Fundamental del Cálculo"
        onPointerDown={(event) => {
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          updateBoundary(event);
        }}
        onPointerMove={updateBoundary}
        onPointerUp={() => setDragging(false)}
      >
        <rect x={leftBox.x - 24} y={leftBox.y - 42} width={leftBox.w + 48} height={leftBox.h + 90} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <rect x={rightBox.x - 24} y={rightBox.y - 42} width={rightBox.w + 48} height={leftBox.h + 90} rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <text x={leftBox.x} y={leftBox.y - 16} className="fill-emerald-700 text-[13px] font-semibold">mundo de acumulación</text>
        <text x={rightBox.x} y={rightBox.y - 16} className="fill-blue-700 text-[13px] font-semibold">mundo local</text>
        <path d={localArea(rateFn, leftBox, 0, x, 0, 5, -0.2, 1.2)} fill="url(#accumulationFill)" />
        <path d={fGraph.d} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
        <rect x={stripX} y={fGraph.sy(fValue)} width={stripW} height={fGraph.sy(0) - fGraph.sy(fValue)} rx="3" fill="#d97706" opacity={phase === 0 ? 0.42 : 0.78} />
        <line x1={stripX + stripW / 2} x2={stripX + stripW / 2} y1={fGraph.sy(0)} y2={fGraph.sy(fValue)} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <circle cx={stripX + stripW / 2} cy={fGraph.sy(fValue)} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x={leftBox.x + leftBox.w - 86} y={leftBox.y + leftBox.h + 34} className="fill-slate-600 text-[12px]">arrastra x</text>

        <line x1={rightBox.x + 62} x2={rightBox.x + 62} y1={rightBox.y + rightBox.h} y2={rightBox.y} stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
        <line x1={rightBox.x + 62} x2={rightBox.x + 62} y1={rightBox.y + rightBox.h} y2={speedY} stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />
        <circle cx={rightBox.x + 62} cy={speedY} r="10" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
        <text x={rightBox.x + 96} y={rightBox.y + 62} className="fill-slate-700 text-[13px] font-semibold">altura local f(x)</text>
        <text x={rightBox.x + 96} y={rightBox.y + 88} className="fill-slate-500 text-[12px]">velocidad con la que crece A</text>
        <foreignObject x={rightBox.x + 94} y={rightBox.y + 118} width="112" height="64">
          <div className="rounded-2xl bg-slate-950 p-3 text-center text-white shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.16em] text-white/50">f(x)</div>
            <div className="mt-2 text-lg font-bold">{format(fValue, 2)}</div>
          </div>
        </foreignObject>

        <path d="M 420 202 C 450 168, 472 168, 500 202" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray={phase === 2 ? undefined : "7 8"} opacity="0.72" />
        {phase >= 1 ? (
          <>
            <rect x="250" y="326" width="322" height="72" rx="22" fill="#ffffff" stroke="#dbe4ef" />
            <path d={FGraph.d} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            <circle cx={FGraph.sx(x)} cy={FGraph.sy(F(x))} r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
            <line x1={FGraph.sx(x) - 28} x2={FGraph.sx(x) + 28} y1={FGraph.sy(F(x)) + slope * 14} y2={FGraph.sy(F(x)) - slope * 14} stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
            <text x="272" y="350" className="fill-blue-700 text-[12px] font-semibold">A(x) construido</text>
          </>
        ) : null}
        {phase === 2 ? (
          <foreignObject x="284" y="54" width="250" height="54">
            <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-lg font-semibold text-white shadow-sm">
              d/dx ∫ f(t)dt = f(x)
            </div>
          </foreignObject>
        ) : null}
      </Frame>
    </Layout>
  );
}

const modes: Array<[Mode, string]> = [
  ["accumulation", "Acumulación"],
  ["riemann", "Riemann"],
  ["infinitesimal", "Infinitesimal"],
  ["antiderivative", "Antiderivadas"],
  ["function", "Función acumulada"],
];

export function IntegrationFoundationsVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("accumulation");

  return (
    <VisualShell
      title={title ?? "Fundamentos de integración"}
      subtitle="Construye cantidades continuas a partir de cambio local y acumulación."
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
        {mode === "accumulation" ? <AccumulationMode /> : null}
        {mode === "riemann" ? <RiemannMode /> : null}
        {mode === "infinitesimal" ? <InfinitesimalMode /> : null}
        {mode === "antiderivative" ? <AntiderivativeMode /> : null}
        {mode === "function" ? <AccumulationFunctionMode /> : null}
      </div>
    </VisualShell>
  );
}
