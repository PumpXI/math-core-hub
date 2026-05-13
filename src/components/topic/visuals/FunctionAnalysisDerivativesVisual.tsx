import { type ReactNode, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 420;
const PAD = 48;

type Mode = "extrema" | "growth" | "concavity" | "inflection" | "tests" | "theorems";
type TheoremMode = "mvt" | "rolle";

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function format(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(digits).replace("-0.00", "0.00");
}

function makeScales(xMin: number, xMax: number, yMin: number, yMax: number) {
  return {
    x: (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2),
    y: (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2),
  };
}

function pathFromFunction(fn: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number, samples = 280) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 0.35 || y > yMax + 0.35) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

function coloredSegments(fn: (x: number) => number, sign: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  const segments: Array<{ d: string; positive: boolean }> = [];
  let current = "";
  let currentSign = sign(xMin) >= 0;
  for (let i = 0; i <= 220; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / 220;
    const y = fn(x);
    const nextSign = sign(x) >= 0;
    if (nextSign !== currentSign && current) {
      segments.push({ d: current, positive: currentSign });
      current = `M ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`;
      currentSign = nextSign;
    } else {
      current += `${current ? " L" : "M"} ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`;
    }
  }
  if (current) segments.push({ d: current, positive: currentSign });
  return segments;
}

function clippedLine(pointX: number, pointY: number, slope: number, xMin: number, xMax: number, yMin: number, yMax: number) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  if (Math.abs(slope) > 1000) return `M ${s.x(pointX)} ${s.y(yMin)} L ${s.x(pointX)} ${s.y(yMax)}`;
  const candidates = [
    { x: xMin, y: pointY + slope * (xMin - pointX) },
    { x: xMax, y: pointY + slope * (xMax - pointX) },
  ];
  if (Math.abs(slope) > 0.0001) {
    candidates.push(
      { x: pointX + (yMin - pointY) / slope, y: yMin },
      { x: pointX + (yMax - pointY) / slope, y: yMax },
    );
  }
  const visible = candidates.filter((p) => p.x >= xMin - 0.001 && p.x <= xMax + 0.001 && p.y >= yMin - 0.001 && p.y <= yMax + 0.001);
  const unique = visible.filter((p, index) => visible.findIndex((q) => Math.abs(q.x - p.x) < 0.001 && Math.abs(q.y - p.y) < 0.001) === index);
  const [a, b] = unique.slice(0, 2);
  if (!a || !b) return "";
  return `M ${s.x(a.x).toFixed(2)} ${s.y(a.y).toFixed(2)} L ${s.x(b.x).toFixed(2)} ${s.y(b.y).toFixed(2)}`;
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[340px] w-full" role="img" aria-label={label}>
        <defs>
          <linearGradient id="curveMist" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="26" fill="#fbfcfa" />
        {children}
      </svg>
    </div>
  );
}

function Axes({ xMin, xMax, yMin, yMax, xTicks = [], yTicks = [] }: { xMin: number; xMax: number; yMin: number; yMax: number; xTicks?: number[]; yTicks?: number[] }) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  return (
    <>
      {xTicks.map((x) => (
        <line key={`x-${x}`} x1={s.x(x)} x2={s.x(x)} y1={PAD} y2={H - PAD} stroke={x === 0 ? "#94a3b8" : "#e5e7eb"} strokeDasharray={x === 0 ? undefined : "4 9"} />
      ))}
      {yTicks.map((y) => (
        <line key={`y-${y}`} x1={PAD} x2={W - PAD} y1={s.y(y)} y2={s.y(y)} stroke={y === 0 ? "#94a3b8" : "#e5e7eb"} strokeDasharray={y === 0 ? undefined : "4 9"} />
      ))}
    </>
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

function SliderControl({ label, value, detail, onChange }: { label: string; value: number; detail: string; onChange: (value: number) => void }) {
  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span className="font-mono text-xs text-slate-500">{detail}</span>
      </div>
      <Slider value={[value]} min={0} max={100} step={1} onValueChange={([next]) => onChange(next)} />
    </div>
  );
}

function ToggleRow<T extends string>({ value, options, onChange }: { value: T; options: Array<[T, string]>; onChange: (value: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === id ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 ring-1 ring-slate-200/70 hover:text-slate-950"
          }`}
        >
          {label}
        </button>
      ))}
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

function ExtremaScene() {
  const [shape, setShape] = useState(44);
  const [cursor, setCursor] = useState(64);
  const k = -0.7 + (shape / 100) * 1.4;
  const x = -3.2 + (cursor / 100) * 6.4;
  const f = (t: number) => t ** 3 + (k - 3) * t + 0.4;
  const fp = (t: number) => 3 * t ** 2 + k - 3;
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -5.2;
  const yMax = 5.2;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const c = Math.sqrt(Math.max(0, (3 - k) / 3));
  const critical = [-c, c];
  const y = f(x);
  const slope = fp(x);

  return (
    <Layout
      controls={
        <>
          <SliderControl label="Forma de la curva" value={shape} onChange={setShape} detail={`parámetro = ${format(k)}`} />
          <SliderControl label="Punto de lectura" value={cursor} onChange={setCursor} detail={`pendiente = ${format(slope)}`} />
        </>
      }
      side={
        <>
          <Panel title="Puntos críticos">
            Los puntos críticos aparecen donde la curva deja de subir o bajar por un instante: la tangente se vuelve horizontal.
          </Panel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Lectura local</div>
            <div className="mt-3 text-sm">
              f'(x) = {format(slope)}
              <div className="mt-2 text-white/60">{slope > 0.08 ? "la función está aumentando" : slope < -0.08 ? "la función está disminuyendo" : "posible extremo local"}</div>
            </div>
          </div>
        </>
      }
    >
      <Frame label="Curva con extremos y tangente dinámica">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[-2, 0, 2]} yTicks={[0]} />
        <path d={pathFromFunction(f, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <path d={clippedLine(x, y, slope, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" opacity="0.76" />
        {critical.map((cx, index) => (
          <g key={cx}>
            <circle cx={s.x(cx)} cy={s.y(f(cx))} r="9" fill={index === 0 ? "#2563eb" : "#d97706"} fillOpacity="0.18" />
            <circle cx={s.x(cx)} cy={s.y(f(cx))} r="5" fill={index === 0 ? "#2563eb" : "#d97706"} />
            <text x={s.x(cx) + 10} y={s.y(f(cx)) - 10} className="fill-slate-500 text-[11px]">{index === 0 ? "máx. local" : "mín. local"}</text>
          </g>
        ))}
        <circle cx={s.x(x)} cy={s.y(y)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
      </Frame>
    </Layout>
  );
}

function GrowthScene() {
  const [cursor, setCursor] = useState(52);
  const x = -3.2 + (cursor / 100) * 6.4;
  const f = (t: number) => 0.2 * t ** 3 - 1.25 * t + 0.3;
  const fp = (t: number) => 0.6 * t ** 2 - 1.25;
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -4.4;
  const yMax = 4.4;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const segments = coloredSegments(f, fp, xMin, xMax, yMin, yMax);
  const derivativePath = pathFromFunction(fp, xMin, xMax, yMin, yMax);

  return (
    <Layout
      controls={<SliderControl label="Recorrer la curva" value={cursor} onChange={setCursor} detail={`f'(x) = ${format(fp(x))}`} />}
      side={
        <>
          <Panel title="Dirección">
            Verde significa pendiente positiva: la curva sube. Azul significa pendiente negativa: la curva baja.
          </Panel>
          <Panel title="Prueba de la primera derivada">
            Cuando f'(x) cambia de signo, el movimiento de la curva cambia de dirección y puede emerger un extremo.
          </Panel>
        </>
      }
    >
      <Frame label="Crecimiento y decrecimiento sincronizados con la derivada">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[-2, 0, 2]} yTicks={[0]} />
        {segments.map((segment, index) => (
          <path key={index} d={segment.d} fill="none" stroke={segment.positive ? "#0f766e" : "#2563eb"} strokeWidth="4" strokeLinecap="round" />
        ))}
        <path d={derivativePath} fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        <line x1={s.x(x)} x2={s.x(x)} y1={PAD} y2={H - PAD} stroke="#0f172a" strokeDasharray="7 8" opacity="0.45" />
        <circle cx={s.x(x)} cy={s.y(f(x))} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <circle cx={s.x(x)} cy={s.y(fp(x))} r="6" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />
        <text x="588" y="70" className="fill-amber-700 text-[12px] font-medium">curva de f'(x)</text>
      </Frame>
    </Layout>
  );
}

function ConcavityScene() {
  const [cursor, setCursor] = useState(68);
  const [bend, setBend] = useState(58);
  const a = 0.7 + (bend / 100) * 1.1;
  const x = -3.2 + (cursor / 100) * 6.4;
  const f = (t: number) => 0.12 * a * t ** 3 - 0.55 * t + 0.2;
  const fp = (t: number) => 0.36 * a * t ** 2 - 0.55;
  const fpp = (t: number) => 0.72 * a * t;
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -3.8;
  const yMax = 3.8;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const y = f(x);
  const second = fpp(x);

  return (
    <Layout
      controls={
        <>
          <SliderControl label="Intensidad de curvatura" value={bend} onChange={setBend} detail={`factor = ${format(a)}`} />
          <SliderControl label="Punto de observación" value={cursor} onChange={setCursor} detail={`f''(x) = ${format(second)}`} />
        </>
      }
      side={
        <>
          <Panel title="Curvatura">
            f''(x) describe cómo cambia la pendiente. Si es positiva, la inclinación aumenta; si es negativa, la inclinación disminuye.
          </Panel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Sensación geométrica</div>
            <div className="mt-3 text-sm text-white/75">{second > 0 ? "concavidad hacia arriba: crecimiento que se acelera" : second < 0 ? "concavidad hacia abajo: crecimiento que se frena" : "transición de concavidad"}</div>
          </div>
        </>
      }
    >
      <Frame label="Concavidad y segunda derivada">
        <rect x={PAD} y={PAD} width={(W - PAD * 2) / 2} height={H - PAD * 2} fill="#2563eb" opacity="0.035" />
        <rect x={PAD + (W - PAD * 2) / 2} y={PAD} width={(W - PAD * 2) / 2} height={H - PAD * 2} fill="#0f766e" opacity="0.04" />
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[-2, 0, 2]} yTicks={[0]} />
        <path d={pathFromFunction(f, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <path d={clippedLine(x, y, fp(x), xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="2.5" opacity="0.65" />
        <circle cx={s.x(x)} cy={s.y(y)} r={Math.min(24, 8 + Math.abs(second) * 4)} fill={second >= 0 ? "#0f766e" : "#2563eb"} opacity="0.14" />
        <circle cx={s.x(x)} cy={s.y(y)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x="92" y="74" className="fill-blue-700 text-[12px]">pendientes disminuyen</text>
        <text x="560" y="74" className="fill-emerald-700 text-[12px]">pendientes aumentan</text>
      </Frame>
    </Layout>
  );
}

function InflectionScene() {
  const [cursor, setCursor] = useState(50);
  const [morph, setMorph] = useState(52);
  const x = -3.2 + (cursor / 100) * 6.4;
  const lift = -0.7 + (morph / 100) * 1.4;
  const f = (t: number) => 0.18 * t ** 3 + lift * t;
  const fp = (t: number) => 0.54 * t ** 2 + lift;
  const fpp = (t: number) => 1.08 * t;
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -4.2;
  const yMax = 4.2;
  const s = makeScales(xMin, xMax, yMin, yMax);

  return (
    <Layout
      controls={
        <>
          <SliderControl label="Transformar la curva" value={morph} onChange={setMorph} detail="misma inflexión, distinta inclinación" />
          <SliderControl label="Atravesar la transición" value={cursor} onChange={setCursor} detail={`f''(x) = ${format(fpp(x))}`} />
        </>
      }
      side={
        <>
          <Panel title="Punto de inflexión">
            La inflexión no es solo un punto: es el instante donde la curva cambia su forma de doblarse.
          </Panel>
          <Panel title="Cambio de personalidad">
            A la izquierda la concavidad apunta en un sentido; a la derecha se invierte suavemente.
          </Panel>
        </>
      }
    >
      <Frame label="Transición de concavidad en un punto de inflexión">
        <rect x={PAD} y={PAD} width={(W - PAD * 2) / 2} height={H - PAD * 2} fill="#2563eb" opacity="0.04" />
        <rect x={PAD + (W - PAD * 2) / 2} y={PAD} width={(W - PAD * 2) / 2} height={H - PAD * 2} fill="#d97706" opacity="0.045" />
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[-2, 0, 2]} yTicks={[0]} />
        <path d={pathFromFunction(f, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <line x1={s.x(0)} x2={s.x(0)} y1={PAD} y2={H - PAD} stroke="#d97706" strokeDasharray="7 8" opacity="0.62" />
        <path d={clippedLine(x, f(x), fp(x), xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <circle cx={s.x(0)} cy={s.y(f(0))} r="8" fill="#d97706" stroke="#ffffff" strokeWidth="3" />
        <circle cx={s.x(x)} cy={s.y(f(x))} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x={s.x(0) + 12} y={s.y(f(0)) - 12} className="fill-amber-700 text-[12px] font-medium">inflexión</text>
      </Frame>
    </Layout>
  );
}

function TestsScene() {
  const [cursor, setCursor] = useState(36);
  const x = -3.2 + (cursor / 100) * 6.4;
  const f = (t: number) => 0.22 * t ** 4 - 1.45 * t ** 2 + 0.2;
  const fp = (t: number) => 0.88 * t ** 3 - 2.9 * t;
  const fpp = (t: number) => 2.64 * t ** 2 - 2.9;
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -3.2;
  const yMax = 4.2;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const critical = [-Math.sqrt(2.9 / 0.88), 0, Math.sqrt(2.9 / 0.88)];

  return (
    <Layout
      controls={<SliderControl label="Leer alrededor de puntos críticos" value={cursor} onChange={setCursor} detail={`f' = ${format(fp(x))} · f'' = ${format(fpp(x))}`} />}
      side={
        <>
          <Panel title="Primera derivada">
            El signo de f'(x) predice si la curva avanza hacia arriba o hacia abajo.
          </Panel>
          <Panel title="Segunda derivada">
            Cerca de un punto crítico, f''(x) revela si la geometría abre hacia arriba o hacia abajo.
          </Panel>
        </>
      }
    >
      <Frame label="Pruebas de primera y segunda derivada como lectura geométrica">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[-2, 0, 2]} yTicks={[0]} />
        <path d={pathFromFunction(f, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        {critical.map((cx) => (
          <g key={cx}>
            <circle cx={s.x(cx)} cy={s.y(f(cx))} r="7" fill={fpp(cx) > 0 ? "#d97706" : "#2563eb"} stroke="#ffffff" strokeWidth="3" />
            <text x={s.x(cx) + 10} y={s.y(f(cx)) - 10} className="fill-slate-500 text-[11px]">{fpp(cx) > 0 ? "mínimo" : "máximo"}</text>
          </g>
        ))}
        <path d={clippedLine(x, f(x), fp(x), xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="2.5" opacity="0.65" />
        <circle cx={s.x(x)} cy={s.y(f(x))} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <text x="560" y="72" className="fill-slate-500 text-[12px]">clasificación por geometría local</text>
      </Frame>
    </Layout>
  );
}

function TheoremsScene() {
  const [mode, setMode] = useState<TheoremMode>("mvt");
  const [slide, setSlide] = useState(54);
  const xMin = -3.4;
  const xMax = 3.4;
  const yMin = -3.2;
  const yMax = 3.8;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const f = mode === "mvt" ? (x: number) => 0.1 * x ** 3 - 0.4 * x + 1 : (x: number) => 0.18 * (x ** 2 - 4);
  const fp = mode === "mvt" ? (x: number) => 0.3 * x ** 2 - 0.4 : (x: number) => 0.36 * x;
  const a = mode === "mvt" ? -3 : -2;
  const b = mode === "mvt" ? 3 : 2;
  const secantSlope = (f(b) - f(a)) / (b - a);
  const target = mode === "mvt" ? Math.sqrt((secantSlope + 0.4) / 0.3) : 0;
  const c = mode === "mvt" ? -target + (slide / 100) * (2 * target) : -1 + (slide / 100) * 2;
  const matched = Math.abs(fp(c) - secantSlope);

  return (
    <Layout
      controls={
        <>
          <ToggleRow value={mode} onChange={setMode} options={[["mvt", "Valor medio"], ["rolle", "Rolle"]]} />
          <SliderControl label="Buscar tangente garantizada" value={slide} onChange={setSlide} detail={`diferencia de pendientes = ${format(matched)}`} />
        </>
      }
      side={
        <>
          <Panel title={mode === "mvt" ? "Teorema del valor medio" : "Teorema de Rolle"}>
            {mode === "mvt"
              ? "Entre dos puntos de una curva suave, debe existir una tangente paralela a la secante."
              : "Si los extremos tienen la misma altura, en algún punto interior la tangente debe quedar horizontal."}
          </Panel>
          <Panel title="Inevitabilidad geométrica">
            El teorema no inventa una regla: describe algo que la curva no puede evitar.
          </Panel>
        </>
      }
    >
      <Frame label="Teoremas de existencia como geometría inevitable">
        <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xTicks={[a, 0, b]} yTicks={[0]} />
        <path d={pathFromFunction(f, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <line x1={s.x(a)} x2={s.x(b)} y1={s.y(f(a))} y2={s.y(f(b))} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <path d={clippedLine(c, f(c), fp(c), xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={matched < 0.08 ? undefined : "7 8"} opacity="0.72" />
        <circle cx={s.x(a)} cy={s.y(f(a))} r="6" fill="#2563eb" />
        <circle cx={s.x(b)} cy={s.y(f(b))} r="6" fill="#2563eb" />
        <circle cx={s.x(c)} cy={s.y(f(c))} r="8" fill={matched < 0.08 ? "#d97706" : "#0f172a"} stroke="#ffffff" strokeWidth="3" />
        <text x={s.x(c) + 12} y={s.y(f(c)) - 12} className="fill-slate-600 text-[12px]">{matched < 0.08 ? "tangente encontrada" : "ajusta el punto"}</text>
      </Frame>
    </Layout>
  );
}

const modes: Array<[Mode, string]> = [
  ["extrema", "Extremos"],
  ["growth", "Crecimiento"],
  ["concavity", "Concavidad"],
  ["inflection", "Inflexión"],
  ["tests", "Criterios"],
  ["theorems", "Teoremas"],
];

export function FunctionAnalysisDerivativesVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("extrema");

  return (
    <VisualShell
      title={title ?? "Análisis de funciones con derivadas"}
      subtitle="Lee la geometría de una curva a través de sus derivadas."
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
        {mode === "extrema" ? <ExtremaScene /> : null}
        {mode === "growth" ? <GrowthScene /> : null}
        {mode === "concavity" ? <ConcavityScene /> : null}
        {mode === "inflection" ? <InflectionScene /> : null}
        {mode === "tests" ? <TestsScene /> : null}
        {mode === "theorems" ? <TheoremsScene /> : null}
      </div>
    </VisualShell>
  );
}
