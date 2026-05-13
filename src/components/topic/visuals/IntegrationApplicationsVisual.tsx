import { type PointerEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 460;
const graph = { x: 58, y: 48, w: 704, h: 250 };
const mini = { x: 92, y: 334, w: 636, h: 82 };
const miniPad = 14;
const xMin = -3.2;
const xMax = 3.2;
const yMin = -2.2;
const yMax = 3.2;

type DragTarget = "a" | "b" | "frontier" | null;
type LabTab = "area" | "flow";

function Sup({ children }: { children: ReactNode }) {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function format(value: number, digits = 2) {
  return value.toFixed(digits).replace("-0.00", "0.00");
}

function sx(x: number) {
  return graph.x + ((x - xMin) / (xMax - xMin)) * graph.w;
}

function sy(y: number) {
  return graph.y + graph.h - ((y - yMin) / (yMax - yMin)) * graph.h;
}

function miniX(x: number) {
  return mini.x + ((x - xMin) / (xMax - xMin)) * mini.w;
}

function miniY(y: number, min: number, max: number) {
  return mini.y + miniPad + (mini.h - miniPad * 2) - ((y - min) / (max - min)) * (mini.h - miniPad * 2);
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

function TopMath({ signed, total, currentGap }: { signed: boolean; total: number; currentGap: number }) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:grid-cols-[1fr_190px_190px] lg:items-center">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Acumulación actual</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">
          {signed ? (
            <Integral from="a" to="b">(f(x) − g(x)) dx</Integral>
          ) : (
            <Integral from="a" to="b">|f(x) − g(x)| dx</Integral>
          )}
        </div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Área</div>
        <div className="mt-2 rounded-xl bg-slate-950 px-3 py-2 text-center text-lg font-semibold text-white">{format(total)}</div>
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Distancia vertical</div>
        <div className={`mt-2 text-lg font-semibold ${currentGap >= 0 ? "text-teal-700" : "text-amber-700"}`}>{format(currentGap)}</div>
      </div>
    </div>
  );
}

function pathFrom(fn: (x: number) => number, samples = 220) {
  return Array.from({ length: samples }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / (samples - 1);
    const y = clamp(fn(x), yMin, yMax);
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
  }).join(" ");
}

function areaBandPath(f: (x: number) => number, g: (x: number) => number, a: number, b: number) {
  const left = Math.min(a, b);
  const right = Math.max(a, b);
  const top = Array.from({ length: 96 }, (_, i) => {
    const x = left + ((right - left) * i) / 95;
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(clamp(f(x), yMin, yMax)).toFixed(2)}`;
  }).join(" ");
  const bottom = Array.from({ length: 96 }, (_, i) => {
    const x = right - ((right - left) * i) / 95;
    return `L ${sx(x).toFixed(2)} ${sy(clamp(g(x), yMin, yMax)).toFixed(2)}`;
  }).join(" ");
  return `${top} ${bottom} Z`;
}

function integrate(fn: (x: number) => number, a: number, b: number, steps = 220) {
  if (Math.abs(b - a) < 0.001) return 0;
  const dir = b >= a ? 1 : -1;
  const left = Math.min(a, b);
  const right = Math.max(a, b);
  const dx = (right - left) / steps;
  let sum = 0;
  for (let i = 0; i < steps; i += 1) {
    const x = left + (i + 0.5) * dx;
    sum += fn(x) * dx;
  }
  return sum * dir;
}

function crossings(f: (x: number) => number, g: (x: number) => number) {
  const points: number[] = [];
  let lastX = xMin;
  let last = f(lastX) - g(lastX);
  for (let i = 1; i <= 320; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / 320;
    const value = f(x) - g(x);
    if (last === 0 || value === 0 || last * value < 0) {
      let lo = lastX;
      let hi = x;
      for (let j = 0; j < 18; j += 1) {
        const mid = (lo + hi) / 2;
        const midValue = f(mid) - g(mid);
        if ((f(lo) - g(lo)) * midValue <= 0) hi = mid;
        else lo = mid;
      }
      points.push((lo + hi) / 2);
    }
    lastX = x;
    last = value;
  }
  return points.filter((x, index) => index === 0 || Math.abs(x - points[index - 1]) > 0.05);
}

function ApplicationsCanvas({
  amp,
  shift,
  signed,
  a,
  b,
  frontier,
  setA,
  setB,
  setFrontier,
}: {
  amp: number;
  shift: number;
  signed: boolean;
  a: number;
  b: number;
  frontier: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
  setFrontier: (value: number) => void;
}) {
  const [drag, setDrag] = useState<DragTarget>(null);
  const f = (x: number) => 0.55 * x + 0.7 + amp * Math.sin(1.35 * x);
  const g = (x: number) => -0.24 * x * x + shift;
  const gap = (x: number) => f(x) - g(x);
  const accumulationFn = (x: number) => integrate((t) => (signed ? gap(t) : Math.abs(gap(t))), a, x, 180);
  const total = integrate((x) => (signed ? gap(x) : Math.abs(gap(x))), a, b, 260);
  const activeTotal = integrate((x) => (signed ? gap(x) : Math.abs(gap(x))), a, frontier, 200);
  const currentGap = gap(frontier);
  const cross = crossings(f, g);
  const accSamples = Array.from({ length: 160 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / 159;
    return { x, y: accumulationFn(x) };
  });
  const accExtent = Math.max(0.35, ...accSamples.map((p) => Math.abs(p.y)), Math.abs(activeTotal)) * 1.18;
  const accMin = -accExtent;
  const accMax = accExtent;
  const accPath = accSamples
    .filter((p) => (a <= frontier ? p.x >= a && p.x <= frontier : p.x <= a && p.x >= frontier))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${miniX(p.x).toFixed(2)} ${miniY(p.y, accMin, accMax).toFixed(2)}`)
    .join(" ");

  function updateFromPointer(event: PointerEvent<SVGSVGElement>, target: DragTarget = drag) {
    if (!target) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * W;
    const value = clamp(xMin + ((svgX - graph.x) / graph.w) * (xMax - xMin), xMin, xMax);
    if (target === "a") {
      const next = Math.min(value, b - 0.2);
      setA(next);
      setFrontier(clamp(frontier, next, b));
    }
    if (target === "b") {
      const next = Math.max(value, a + 0.2);
      setB(next);
      setFrontier(clamp(frontier, a, next));
    }
    if (target === "frontier") setFrontier(clamp(value, a, b));
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto min-h-[390px] w-full touch-none select-none"
        role="img"
        aria-label="Acumulacion geometrica de area entre curvas"
        onPointerMove={(event) => updateFromPointer(event)}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
      >
        <defs>
          <linearGradient id="positiveFill" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="negativeFill" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="28" fill="#fbfcfa" />
        <line x1={graph.x} x2={graph.x + graph.w} y1={sy(0)} y2={sy(0)} stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1={sx(0)} x2={sx(0)} y1={graph.y} y2={graph.y + graph.h} stroke="#e2e8f0" strokeWidth="1.5" />
        <path d={areaBandPath(f, g, a, frontier)} fill={currentGap >= 0 || !signed ? "url(#positiveFill)" : "url(#negativeFill)"} opacity="0.95" />
        {Array.from({ length: 22 }, (_, i) => {
          const x = a + ((frontier - a) * i) / 21;
          const y1 = f(x);
          const y2 = g(x);
          const positive = gap(x) >= 0;
          return <line key={i} x1={sx(x)} x2={sx(x)} y1={sy(y1)} y2={sy(y2)} stroke={positive || !signed ? "#0f766e" : "#d97706"} strokeWidth="2.4" strokeLinecap="round" opacity="0.48" />;
        })}
        <path d={pathFrom(f)} fill="none" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
        <path d={pathFrom(g)} fill="none" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" />
        <text x="704" y={sy(f(2.65)) - 10} className="fill-slate-950 text-[16px] font-semibold">f(x)</text>
        <text x="704" y={sy(g(2.65)) + 20} className="fill-blue-700 text-[16px] font-semibold">g(x)</text>
        {cross.map((x) => (
          <g key={x}>
            <circle cx={sx(x)} cy={sy(f(x))} r="7" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
            {x >= a && x <= b ? <line x1={sx(x)} x2={sx(x)} y1={graph.y + 16} y2={graph.y + graph.h - 16} stroke="#7c3aed" strokeDasharray="5 9" opacity="0.34" /> : null}
          </g>
        ))}
        {[
          ["a", a],
          ["b", b],
        ].map(([label, value]) => (
          <g
            key={label as string}
            className="cursor-ew-resize"
            onPointerDown={(event) => {
              setDrag(label as DragTarget);
              updateFromPointer(event, label as DragTarget);
            }}
          >
            <line x1={sx(value as number)} x2={sx(value as number)} y1={graph.y} y2={graph.y + graph.h + 22} stroke="#0f172a" strokeWidth="2" opacity="0.62" />
            <circle cx={sx(value as number)} cy={graph.y + graph.h + 22} r="12" fill="#0f172a" />
            <text x={sx(value as number)} y={graph.y + graph.h + 49} textAnchor="middle" className="fill-slate-800 text-[15px] font-semibold">{label as string}</text>
          </g>
        ))}
        <g
          className="cursor-ew-resize"
          onPointerDown={(event) => {
            setDrag("frontier");
            updateFromPointer(event, "frontier");
          }}
        >
          <line x1={sx(frontier)} x2={sx(frontier)} y1={graph.y + 6} y2={graph.y + graph.h - 6} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
          <circle cx={sx(frontier)} cy={sy(f(frontier))} r="8" fill="#d97706" />
          <circle cx={sx(frontier)} cy={sy(g(frontier))} r="8" fill="#d97706" />
        </g>
        <rect x={mini.x} y={mini.y} width={mini.w} height={mini.h} rx="18" fill="#ffffff" stroke="#dbe4ef" />
        <line x1={mini.x + 14} x2={mini.x + mini.w - 14} y1={miniY(0, accMin, accMax)} y2={miniY(0, accMin, accMax)} stroke="#cbd5e1" />
        <path d={accPath} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx={miniX(frontier)} cy={miniY(activeTotal, accMin, accMax)} r="7" fill="#0f172a" />
        <text x={mini.x + 18} y={mini.y + 28} className="fill-slate-500 text-[13px] font-semibold">A(x)</text>
      </svg>
    </div>
  );
}

function FlowCanvas({
  signed,
  setSigned,
}: {
  signed: boolean;
  setSigned: (value: boolean) => void;
}) {
  const [frontier, setFrontier] = useState(-2.45);
  const [slice, setSlice] = useState(-0.4);
  const [playing, setPlaying] = useState(true);
  const [dragging, setDragging] = useState(false);
  const a = -2.45;
  const b = 2.55;
  const f = (x: number) => 0.78 + 0.62 * Math.sin(1.52 * x) + 0.14 * x;
  const g = (x: number) => 0.28 * x * x - 0.58 + 0.08 * Math.cos(1.8 * x);
  const gap = (x: number) => f(x) - g(x);
  const contribution = (x: number) => (signed ? gap(x) : Math.abs(gap(x)));
  const activeTotal = integrate(contribution, a, frontier, 240);
  const sliceGap = gap(slice);
  const cross = crossings(f, g).filter((x) => x >= a && x <= b);
  const segmentBreaks = [a, ...cross.filter((x) => x > a && x < frontier), frontier].sort((left, right) => left - right);
  const signedSegments = segmentBreaks.slice(0, -1).map((left, index) => {
    const right = segmentBreaks[index + 1];
    const mid = (left + right) / 2;
    return { left, right, positive: gap(mid) >= 0 };
  }).filter((segment) => segment.right - segment.left > 0.01);

  useEffect(() => {
    if (!playing || dragging) return;
    let frame = 0;
    let last = performance.now();
    const animate = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      setFrontier((value) => {
        const next = value + dt * 0.42;
        return next > b ? a : next;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playing, dragging]);

  const accSamples = Array.from({ length: 160 }, (_, i) => {
    const x = a + ((b - a) * i) / 159;
    return { x, y: integrate(contribution, a, x, 180) };
  });
  const accExtent = Math.max(0.4, ...accSamples.map((p) => Math.abs(p.y)), Math.abs(activeTotal)) * 1.2;
  const accMin = -accExtent;
  const accMax = accExtent;
  const accPath = accSamples
    .filter((p) => p.x <= frontier)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${miniX(p.x).toFixed(2)} ${miniY(p.y, accMin, accMax).toFixed(2)}`)
    .join(" ");
  const flowGhosts = Array.from({ length: 8 }, (_, i) => clamp(frontier - 0.16 * (i + 1), a, b)).filter((x) => x < frontier);

  function updateSlice(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * W;
    const value = clamp(xMin + ((svgX - graph.x) / graph.w) * (xMax - xMin), a, b);
    setSlice(value);
    setFrontier(value);
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto min-h-[390px] w-full touch-none select-none"
        role="img"
        aria-label="Flujo geometrico de acumulacion entre curvas"
        onPointerMove={(event) => {
          if (dragging) updateSlice(event);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <defs>
          <linearGradient id="flowPositive" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="flowNegative" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="28" fill="#fbfcfa" />
        <line x1={graph.x} x2={graph.x + graph.w} y1={sy(0)} y2={sy(0)} stroke="#d7dee8" strokeWidth="1.4" />
        <line x1={sx(0)} x2={sx(0)} y1={graph.y} y2={graph.y + graph.h} stroke="#e6ebf2" strokeWidth="1.4" />
        {signedSegments.map((segment) => (
          <path
            key={`${segment.left}-${segment.right}`}
            d={areaBandPath(f, g, segment.left, segment.right)}
            fill={!signed || segment.positive ? "url(#flowPositive)" : "url(#flowNegative)"}
            opacity={!signed || segment.positive ? 0.94 : 0.88}
          />
        ))}
        {Array.from({ length: 36 }, (_, i) => {
          const x = a + ((b - a) * i) / 35;
          const strength = Math.min(0.85, 0.14 + Math.abs(gap(x)) / 4);
          const positive = gap(x) >= 0;
          return (
            <line
              key={i}
              x1={sx(x)}
              x2={sx(x)}
              y1={sy(f(x))}
              y2={sy(g(x))}
              stroke={positive || !signed ? "#0f766e" : "#d97706"}
              strokeWidth={x <= frontier ? 2.4 : 1.5}
              strokeLinecap="round"
              opacity={x <= frontier ? strength : 0.18}
            />
          );
        })}
        {flowGhosts.map((x, index) => (
          <line
            key={x}
            x1={sx(x)}
            x2={sx(x)}
            y1={graph.y + 8}
            y2={graph.y + graph.h - 8}
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.12 - index * 0.012}
          />
        ))}
        <path d={pathFrom(f)} fill="none" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
        <path d={pathFrom(g)} fill="none" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" />
        {cross.map((x) => (
          <g key={x}>
            <circle cx={sx(x)} cy={sy(f(x))} r="7" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
            <line x1={sx(x)} x2={sx(x)} y1={graph.y + 18} y2={graph.y + graph.h - 18} stroke="#7c3aed" strokeDasharray="5 9" opacity="0.28" />
          </g>
        ))}
        <g>
          <line x1={sx(frontier)} x2={sx(frontier)} y1={graph.y + 6} y2={graph.y + graph.h - 6} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" opacity="0.84" />
          <circle cx={sx(frontier)} cy={sy(f(frontier))} r="8" fill="#0f172a" />
          <circle cx={sx(frontier)} cy={sy(g(frontier))} r="8" fill="#0f172a" />
        </g>
        <g
          className="cursor-ew-resize"
          onPointerDown={(event) => {
            setDragging(true);
            setPlaying(false);
            updateSlice(event);
          }}
        >
          <line x1={sx(slice)} x2={sx(slice)} y1={sy(f(slice))} y2={sy(g(slice))} stroke={sliceGap >= 0 || !signed ? "#0f766e" : "#d97706"} strokeWidth="6" strokeLinecap="round" opacity="0.88" />
          <circle cx={sx(slice)} cy={(sy(f(slice)) + sy(g(slice))) / 2} r="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
        </g>
        <rect x={mini.x} y={mini.y} width={mini.w} height={mini.h} rx="18" fill="#ffffff" stroke="#dbe4ef" />
        <line x1={mini.x + 14} x2={mini.x + mini.w - 14} y1={miniY(0, accMin, accMax)} y2={miniY(0, accMin, accMax)} stroke="#cbd5e1" />
        <path d={accPath} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx={miniX(frontier)} cy={miniY(activeTotal, accMin, accMax)} r="7" fill="#0f172a" />
        <text x={mini.x + 18} y={mini.y + 28} className="fill-slate-500 text-[13px] font-semibold">A(x)</text>
        <rect x="604" y="54" width="128" height="42" rx="16" fill={signed && activeTotal < 0 ? "#92400e" : "#0f172a"} />
        <text x="668" y="81" textAnchor="middle" className="fill-white text-[15px] font-semibold">{format(activeTotal)}</text>
      </svg>
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200/70 bg-white/80 p-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm"
        >
          {playing ? "Pausar flujo" : "Reanudar flujo"}
        </button>
        <button
          type="button"
          onClick={() => setSigned(!signed)}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80"
        >
          {signed ? "Ver área geométrica" : "Ver modo firmado"}
        </button>
        <span className="text-sm font-medium text-slate-500">Rebanada local: {format(sliceGap)}</span>
      </div>
    </div>
  );
}

function AreaBetweenCurvesScene() {
  const [a, setA] = useState(-2.35);
  const [b, setB] = useState(2.35);
  const [frontier, setFrontier] = useState(1.2);
  const [amp, setAmp] = useState(0.62);
  const [shift, setShift] = useState(0.35);
  const [signed, setSigned] = useState(true);
  const f = (x: number) => 0.55 * x + 0.7 + amp * Math.sin(1.35 * x);
  const g = (x: number) => -0.24 * x * x + shift;
  const total = useMemo(() => integrate((x) => (signed ? f(x) - g(x) : Math.abs(f(x) - g(x))), a, b, 260), [a, b, amp, shift, signed]);
  const currentGap = f(frontier) - g(frontier);

  return (
    <div className="grid gap-0 bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-4 p-4 sm:p-5">
        <TopMath signed={signed} total={total} currentGap={currentGap} />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSigned((value) => !value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${signed ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-700 ring-1 ring-slate-200/80"}`}
          >
            {signed ? "Acumulación firmada" : "Área geométrica"}
          </button>
          <label className="flex min-w-[220px] items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
            curvatura f
            <input type="range" min="0.15" max="1.15" step="0.01" value={amp} onChange={(event) => setAmp(Number(event.currentTarget.value))} className="accent-slate-950" />
          </label>
          <label className="flex min-w-[220px] items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
            altura g
            <input type="range" min="-0.35" max="1.1" step="0.01" value={shift} onChange={(event) => setShift(Number(event.currentTarget.value))} className="accent-slate-950" />
          </label>
        </div>
        <ApplicationsCanvas amp={amp} shift={shift} signed={signed} a={a} b={b} frontier={frontier} setA={setA} setB={setB} setFrontier={setFrontier} />
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <Panel title="Interacción">Arrastra a, b y la frontera naranja. La región se construye progresivamente desde a hasta x.</Panel>
        <Panel title="Lectura">Cada rebanada mide la distancia vertical entre f(x) y g(x). La gráfica A(x) acumula esas rebanadas.</Panel>
        <Panel title="Cruces">Los puntos violeta marcan intersecciones: ahí la diferencia cambia de signo y el área geométrica se separa naturalmente.</Panel>
      </aside>
    </div>
  );
}

function DynamicAccumulationScene() {
  const [signed, setSigned] = useState(true);

  return (
    <div className="grid gap-0 bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Flujo integral</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950">
            <Integral from="a" to="x">(f(t) − g(t)) dt</Integral>
          </div>
        </div>
        <FlowCanvas signed={signed} setSigned={setSigned} />
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <Panel title="Exploración viva">El frente avanza y deja memoria geométrica; la región no aparece de golpe, se construye.</Panel>
        <Panel title="Rebanada local">Toma la rebanada gruesa y muévela: su altura es la contribución instantánea f(x) − g(x).</Panel>
        <Panel title="Área firmada">Cuando la diferencia cambia de signo, el flujo cambia de color y la acumulación puede cancelar.</Panel>
      </aside>
    </div>
  );
}

export function IntegrationApplicationsVisual({ title }: { title?: string }) {
  const [tab, setTab] = useState<LabTab>("area");

  return (
    <VisualShell
      title={title ?? "Aplicaciones de la integración"}
      subtitle="Área entre curvas como acumulación de distancia vertical."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
          {[
            ["area", "Área entre curvas"],
            ["flow", "Integral Flow"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as LabTab)}
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                tab === id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "area" ? <AreaBetweenCurvesScene /> : <DynamicAccumulationScene />}
      </div>
    </VisualShell>
  );
}
