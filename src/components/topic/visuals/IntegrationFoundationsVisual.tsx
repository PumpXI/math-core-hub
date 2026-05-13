import { type ReactNode, useEffect, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 430;
const PAD = 52;

type Mode = "accumulation" | "riemann" | "infinitesimal" | "antiderivative" | "function" | "ftc";
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

function usePulse() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let frame = 0;
    let start = performance.now();
    const animate = (now: number) => {
      setTick(((now - start) / 1000) % 1);
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

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[350px] w-full" role="img" aria-label={label}>
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
        <text x="600" y="82" className="fill-slate-700 text-[14px] font-semibold">el total emerge</text>
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
        <text x="574" y="82" className="fill-slate-700 text-[14px] font-semibold">n = {n}</text>
      </Frame>
    </Layout>
  );
}

function InfinitesimalMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const count = phase === 0 ? 12 : phase === 1 ? 28 : 58;
  const stackHeight = phase === 0 ? 120 : phase === 1 ? 180 : 230;

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
          const h = 42 + stackHeight * (0.28 + 0.72 * Math.sin(Math.PI * t)) * (0.96 + 0.04 * Math.sin((pulse + t) * Math.PI * 2));
          return <rect key={i} x={x} y={318 - h} width={Math.max(3, 520 / count)} height={h} rx="3" fill="url(#sliceGlow)" stroke="#0f766e" strokeOpacity="0.22" />;
        })}
        <path d="M 126 316 C 250 94, 560 94, 694 316" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" opacity={phase === 2 ? 0.9 : 0.42} />
        <text x="410" y="370" textAnchor="middle" className="fill-slate-700 text-[14px] font-semibold">{phase === 2 ? "las piezas ya se leen como un todo" : "cada rebanada aporta una cantidad local"}</text>
      </Frame>
    </Layout>
  );
}

function AntiderivativeMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const xMin = 0;
  const xMax = 6;
  const yMin = -0.6;
  const yMax = 4.4;
  const s = scale(xMin, xMax, yMin, yMax);
  const rate = (x: number) => 0.52 + 0.28 * Math.sin(1.3 * x);
  const anti = (x: number) => 0.52 * x - (0.28 / 1.3) * Math.cos(1.3 * x) + 1.2 + (phase - 1) * 0.55;
  const x = 0.6 + pulse * 5.0;

  return (
    <Layout
      top={<TopMath expression={<span>F'(x) = f(x)</span>} idea="recuperar comportamiento" stage={phase === 0 ? "misma pendiente, otra altura" : phase === 1 ? "curva reconstruida" : "familia vertical"} />}
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
            Integrar una tasa reconstruye una curva. La pendiente queda fijada; la altura inicial puede cambiar.
          </Panel>
          <Panel title="Familia">
            Todas las curvas F(x)+C comparten la misma derivada.
          </Panel>
        </>
      }
    >
      <Frame label="Antiderivadas como reconstrucción desde tasas locales">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
        {[0, 1, 2].map((offset) => (
          <path key={offset} d={pathFromFunction((v) => anti(v) + (offset - phase) * 0.55, xMin, xMax, yMin, yMax)} fill="none" stroke={offset === phase ? "#0f766e" : "#94a3b8"} strokeWidth={offset === phase ? 4 : 2} strokeLinecap="round" opacity={offset === phase ? 1 : 0.34} />
        ))}
        <path d={pathFromFunction((v) => rate(v) - 0.4, xMin, xMax, yMin, yMax)} fill="none" stroke="#d97706" strokeWidth="2.8" strokeLinecap="round" opacity="0.72" />
        <circle cx={s.x(x)} cy={s.y(anti(x))} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x="582" y="82" className="fill-amber-700 text-[13px] font-semibold">tasa f(x)</text>
        <text x="582" y="108" className="fill-emerald-700 text-[13px] font-semibold">curva F(x)</text>
      </Frame>
    </Layout>
  );
}

function AccumulationFunctionMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const xMin = 0;
  const xMax = 5;
  const yMin = -0.2;
  const yMax = 2.5;
  const s = scale(xMin, xMax, yMin, yMax);
  const x = 0.35 + (phase === 0 ? 1.4 : phase === 1 ? 3.0 : 4.35) + pulse * 0.18;
  const areaApprox = (v: number) => 0.55 * v + 0.18 * (1 - Math.cos(1.25 * v));
  const F = (v: number) => areaApprox(v) / 1.8;

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
        <rect x="52" y="62" width="335" height="300" rx="22" fill="#ffffff" stroke="#dbe4ef" />
        <rect x="432" y="62" width="335" height="300" rx="22" fill="#ffffff" stroke="#dbe4ef" />
        <g transform="translate(-8 0)">
          <path d={areaPath(rateFn, 0, Math.min(5, x), xMin, xMax, yMin, yMax)} fill="url(#accumulationFill)" />
          <path d={pathFromFunction(rateFn, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
          <line x1={s.x(x) - 8} x2={s.x(x) - 8} y1={s.y(0)} y2={s.y(rateFn(x))} stroke="#d97706" strokeWidth="3" />
        </g>
        <g transform="translate(380 0)">
          <path d={pathFromFunction(F, xMin, Math.min(5, x), yMin, yMax)} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <circle cx={s.x(Math.min(5, x))} cy={s.y(F(Math.min(5, x)))} r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
        </g>
        <text x="122" y="92" className="fill-slate-700 text-[13px] font-semibold">área bajo f</text>
        <text x="510" y="92" className="fill-slate-700 text-[13px] font-semibold">grafo de F</text>
      </Frame>
    </Layout>
  );
}

function FundamentalTheoremMode() {
  const [phase, setPhase] = useState<Phase>(1);
  const pulse = usePulse();
  const xMin = 0;
  const xMax = 5;
  const yMin = -0.15;
  const yMax = 2.5;
  const s = scale(xMin, xMax, yMin, yMax);
  const x = 0.65 + pulse * 4.1;
  const F = (v: number) => 0.5 * v + 0.2 * (1 - Math.cos(1.4 * v));

  return (
    <Layout
      top={<TopMath expression={<span>d/dx <Integral from="a" to="x">f(t)dt</Integral> = f(x)</span>} idea="procesos inversos" stage={phase === 0 ? "construcción" : phase === 1 ? "sincronización" : "extracción local"} />}
      controls={
        <>
          <PhaseButton phase={0} current={phase} label="Construir" onClick={setPhase} />
          <PhaseButton phase={1} current={phase} label="Sincronizar" onClick={setPhase} />
          <PhaseButton phase={2} current={phase} label="Derivar" onClick={setPhase} />
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
      <Frame label="Teorema Fundamental del Cálculo como construcción y extracción">
        <rect x="58" y="78" width="310" height="260" rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <rect x="452" y="78" width="310" height="260" rx="24" fill="#ffffff" stroke="#dbe4ef" />
        <g transform="translate(-18 0)">
          <path d={areaPath(rateFn, 0, x, xMin, xMax, yMin, yMax)} fill="url(#accumulationFill)" />
          <path d={pathFromFunction(rateFn, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={s.x(x)} cy={s.y(rateFn(x))} r="7" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
        </g>
        <g transform="translate(386 0)">
          <path d={pathFromFunction(F, xMin, xMax, yMin, yMax)} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <circle cx={s.x(x)} cy={s.y(F(x))} r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          {phase >= 1 ? <line x1={s.x(x) - 34} x2={s.x(x) + 34} y1={s.y(F(x)) + 18} y2={s.y(F(x)) - 18} stroke="#d97706" strokeWidth="3" strokeLinecap="round" /> : null}
        </g>
        <path d="M 374 206 C 405 174, 425 174, 456 206" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray={phase === 0 ? "7 9" : undefined} opacity={phase === 0 ? 0.4 : 0.85} />
        <text x="132" y="106" className="fill-emerald-700 text-[13px] font-semibold">acumular f</text>
        <text x="526" y="106" className="fill-blue-700 text-[13px] font-semibold">derivar F</text>
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
  ["ftc", "Teorema fundamental"],
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
        {mode === "ftc" ? <FundamentalTheoremMode /> : null}
      </div>
    </VisualShell>
  );
}
