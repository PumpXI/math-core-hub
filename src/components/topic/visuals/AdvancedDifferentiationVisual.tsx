import { type PointerEvent, type ReactNode, useMemo, useState } from "react";
import { VisualShell } from "./VisualShell";
import { Slider } from "@/components/ui/slider";

const W = 820;
const H = 390;
const PAD = 42;

type Mode = "implicit" | "inverse" | "logarithmic" | "inverseTrig" | "higher";

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

function Root({ children }: { children: ReactNode }) {
  return <span>√({children})</span>;
}

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(digits).replace("-0.000", "0.000").replace("-0.00", "0.00");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeScales(xMin: number, xMax: number, yMin: number, yMax: number) {
  return {
    x: (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2),
    y: (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2),
  };
}

function pathFromFunction(fn: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number, samples = 260) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 0.4 || y > yMax + 0.4) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

function pathFromPoints(points: Array<{ x: number; y: number }>, xMin: number, xMax: number, yMin: number, yMax: number) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${s.x(point.x).toFixed(2)} ${s.y(point.y).toFixed(2)}`).join(" ");
}

function clippedLinePath(pointX: number, pointY: number, slope: number, xMin: number, xMax: number, yMin: number, yMax: number) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  if (!Number.isFinite(slope)) return `M ${s.x(pointX).toFixed(2)} ${s.y(yMin).toFixed(2)} L ${s.x(pointX).toFixed(2)} ${s.y(yMax).toFixed(2)}`;
  const candidates = [
    { x: xMin, y: pointY + slope * (xMin - pointX) },
    { x: xMax, y: pointY + slope * (xMax - pointX) },
  ];
  if (Math.abs(slope) > 0.00001) {
    candidates.push(
      { x: pointX + (yMin - pointY) / slope, y: yMin },
      { x: pointX + (yMax - pointY) / slope, y: yMax },
    );
  }
  const visible = candidates.filter(({ x, y }) => x >= xMin - 0.0001 && x <= xMax + 0.0001 && y >= yMin - 0.0001 && y <= yMax + 0.0001);
  const unique = visible.filter((point, index) => visible.findIndex((other) => Math.abs(other.x - point.x) < 0.001 && Math.abs(other.y - point.y) < 0.001) === index);
  const [start, end] = unique.slice(0, 2);
  if (!start || !end) return "";
  return `M ${s.x(start.x).toFixed(2)} ${s.y(start.y).toFixed(2)} L ${s.x(end.x).toFixed(2)} ${s.y(end.y).toFixed(2)}`;
}

function axes(xMin: number, xMax: number, yMin: number, yMax: number, xTicks: number[], yTicks: number[]) {
  const s = makeScales(xMin, xMax, yMin, yMax);
  return (
    <>
      {xTicks.map((x) => (
        <line key={`x-${x}`} x1={s.x(x)} x2={s.x(x)} y1={PAD} y2={H - PAD} stroke={x === 0 ? "#94a3b8" : "#e5e7eb"} strokeDasharray={x === 0 ? undefined : "3 8"} />
      ))}
      {yTicks.map((y) => (
        <line key={`y-${y}`} x1={PAD} x2={W - PAD} y1={s.y(y)} y2={s.y(y)} stroke={y === 0 ? "#94a3b8" : "#e5e7eb"} strokeDasharray={y === 0 ? undefined : "3 8"} />
      ))}
    </>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[330px] w-full" role="img" aria-label={label}>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
        {children}
      </svg>
    </div>
  );
}

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

function ImplicitMode() {
  const [angle, setAngle] = useState(46);
  const [dragging, setDragging] = useState(false);
  const xMin = -6;
  const xMax = 6;
  const yMin = -6;
  const yMax = 6;
  const s = makeScales(xMin, xMax, yMin, yMax);
  const theta = (angle / 100) * Math.PI * 2;
  const x = 5 * Math.cos(theta);
  const y = 5 * Math.sin(theta);
  const slope = Math.abs(y) < 0.03 ? Number.POSITIVE_INFINITY : -x / y;
  const circle = useMemo(
    () =>
      pathFromPoints(
        Array.from({ length: 241 }, (_, index) => {
          const t = (index / 240) * Math.PI * 2;
          return { x: 5 * Math.cos(t), y: 5 * Math.sin(t) };
        }),
        xMin,
        xMax,
        yMin,
        yMax,
      ),
    [],
  );
  const tangent = clippedLinePath(x, y, slope, xMin, xMax, yMin, yMax);

  function updateFromPointer(event: PointerEvent<SVGSVGElement>) {
    if (!dragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const py = ((event.clientY - rect.top) / rect.height) * H;
    const mx = xMin + ((px - PAD) / (W - PAD * 2)) * (xMax - xMin);
    const my = yMax - ((py - PAD) / (H - PAD * 2)) * (yMax - yMin);
    const next = Math.atan2(my, mx);
    setAngle((((next + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * 100);
  }

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto min-h-[330px] w-full touch-none"
            role="img"
            aria-label="Curva implícita con punto móvil y tangente"
            onPointerMove={updateFromPointer}
            onPointerUp={() => setDragging(false)}
            onPointerLeave={() => setDragging(false)}
          >
            <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
            {axes(xMin, xMax, yMin, yMax, [-5, 0, 5], [-5, 0, 5])}
            <path d={circle} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
            <path d={tangent} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeDasharray="9 8" />
            <line x1={s.x(x)} x2={s.x(x + 0.7)} y1={s.y(y)} y2={s.y(y)} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
            <line x1={s.x(x + 0.7)} x2={s.x(x + 0.7)} y1={s.y(y)} y2={s.y(y + slope * 0.7)} stroke="#b45309" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
            <circle
              cx={s.x(x)}
              cy={s.y(y)}
              r="9"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="3"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragging(true);
              }}
            />
            <text x={s.x(x) + 12} y={s.y(y) - 12} className="fill-slate-700 text-[12px] font-medium">P</text>
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>Mover punto sobre la curva</span>
              <span className="font-mono text-slate-500">m = {format(slope, 3)}</span>
            </div>
            <Slider value={[angle]} min={0} max={100} step={1} onValueChange={([value]) => setAngle(value)} />
          </div>
        </div>
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <InfoPanel title="Curva implícita">
          <div className="text-lg font-semibold text-slate-950">x<Sup>2</Sup> + y<Sup>2</Sup> = 25</div>
        </InfoPanel>
        <InfoPanel title="Dependencia oculta">
          Al mover x sobre la curva, y también cambia. Por eso y se trata como una función dependiente de x.
        </InfoPanel>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Transformación</div>
          <div className="mt-3 space-y-2 text-sm">
            <div>d/dx(y<Sup>2</Sup>)</div>
            <div className="text-white/50">↓ y cambia con x</div>
            <div className="text-lg font-semibold">2y · dy/dx</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function InverseMode() {
  const [value, setValue] = useState(62);
  const xMin = -3.2;
  const xMax = 3.2;
  const yMin = -3.2;
  const yMax = 3.2;
  const a = -2.2 + (value / 100) * 4.4;
  const f = (x: number) => 0.18 * x * x * x + 0.72 * x;
  const fp = (x: number) => 0.54 * x * x + 0.72;
  const b = f(a);
  const m = fp(a);
  const s = makeScales(xMin, xMax, yMin, yMax);
  const original = useMemo(() => pathFromFunction(f, xMin, xMax, yMin, yMax), []);
  const inverse = useMemo(
    () => pathFromPoints(Array.from({ length: 240 }, (_, index) => {
      const x = xMin + ((xMax - xMin) * index) / 239;
      return { x: f(x), y: x };
    }), xMin, xMax, yMin, yMax),
    [],
  );

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <Frame label="Función inversa reflejada sobre y igual x">
          {axes(xMin, xMax, yMin, yMax, [-2, 0, 2], [-2, 0, 2])}
          <line x1={s.x(xMin)} x2={s.x(xMax)} y1={s.y(xMin)} y2={s.y(xMax)} stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 8" />
          <path d={original} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
          <path d={inverse} fill="none" stroke="#7c3aed" strokeWidth="3.4" strokeLinecap="round" />
          <path d={clippedLinePath(a, b, m, xMin, xMax, yMin, yMax)} fill="none" stroke="#0f172a" strokeWidth="2.7" strokeLinecap="round" />
          <path d={clippedLinePath(b, a, 1 / m, xMin, xMax, yMin, yMax)} fill="none" stroke="#b45309" strokeWidth="2.7" strokeLinecap="round" strokeDasharray="8 8" />
          <line x1={s.x(a)} x2={s.x(b)} y1={s.y(b)} y2={s.y(a)} stroke="#cbd5e1" strokeWidth="2" />
          <circle cx={s.x(a)} cy={s.y(b)} r="8" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
          <circle cx={s.x(b)} cy={s.y(a)} r="8" fill="#7c3aed" stroke="#ffffff" strokeWidth="3" />
        </Frame>
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="mb-3 flex justify-between text-sm font-medium text-slate-600">
            <span>Mover punto sincronizado</span>
            <span className="font-mono text-slate-500">({format(a, 2)}, {format(b, 2)}) ↔ ({format(b, 2)}, {format(a, 2)})</span>
          </div>
          <Slider value={[value]} min={0} max={100} step={1} onValueChange={([next]) => setValue(next)} />
        </div>
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <InfoPanel title="Reflexión">El punto (a,b) en f se convierte en (b,a) en la inversa al reflejarse sobre y = x.</InfoPanel>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Pendientes sincronizadas</div>
          <div className="mt-3 space-y-2 text-sm">
            <div>pendiente original: {format(m, 3)}</div>
            <div>pendiente inversa: {format(1 / m, 3)}</div>
            <div className="text-white/55">(f⁻¹)'(b) = 1 / f'(a)</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function LogarithmicMode() {
  const [phase, setPhase] = useState(1);
  const steps = [
    { title: "Expresión compleja", body: <span>y = x<Sup>x</Sup></span> },
    { title: "Aplicar logaritmo", body: <span>ln(y) = ln(x<Sup>x</Sup>)</span> },
    { title: "Reorganizar estructura", body: <span>ln(y) = x ln(x)</span> },
    { title: "Derivar implícitamente", body: <span><Fraction top="y'" bottom="y" /> = ln(x) + 1</span> },
    { title: "Recuperar y", body: <span>y' = x<Sup>x</Sup>(ln(x) + 1)</span> },
  ];

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Diferenciación logarítmica</div>
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setPhase(index)}
                className={`rounded-2xl p-4 text-left transition ${
                  phase === index ? "bg-slate-950 text-white shadow-sm" : index < phase ? "bg-emerald-50 text-emerald-950" : "bg-slate-50 text-slate-500"
                }`}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-60">{step.title}</div>
                <div className="mt-2 text-xl font-semibold">{step.body}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <InfoPanel title="Transformación">El logaritmo convierte potencias y productos en una estructura más legible antes de derivar.</InfoPanel>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <div className="mb-2 font-semibold text-slate-950">Reglas que revelan estructura</div>
          <div>ln(ab) → ln(a) + ln(b)</div>
          <div>ln(a<Sup>b</Sup>) → b ln(a)</div>
        </div>
      </aside>
    </div>
  );
}

function InverseTrigMode() {
  const [value, setValue] = useState(76);
  const x = -0.92 + (value / 100) * 1.84;
  const adjacent = Math.sqrt(1 - x * x);
  const angle = Math.asin(x);
  const derivative = 1 / adjacent;
  const graphPath = useMemo(() => {
    const left = 438;
    const top = 62;
    const width = 318;
    const height = 252;
    return Array.from({ length: 180 }, (_, index) => {
      const t = -0.98 + (index / 179) * 1.96;
      const y = Math.asin(t);
      const sx = left + ((t + 1) / 2) * width;
      const sy = top + ((Math.PI / 2 - y) / Math.PI) * height;
      return `${index === 0 ? "M" : "L"} ${sx.toFixed(2)} ${sy.toFixed(2)}`;
    }).join(" ");
  }, []);
  const circle = {
    cx: 214,
    cy: 195,
    r: 118,
  };
  const point = {
    x: circle.cx + adjacent * circle.r,
    y: circle.cy - x * circle.r,
  };
  const graph = {
    left: 438,
    top: 62,
    width: 318,
    height: 252,
    x: 438 + ((x + 1) / 2) * 318,
    y: 62 + ((Math.PI / 2 - angle) / Math.PI) * 252,
  };

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[330px] w-full" role="img" aria-label="Relación entre círculo unitario y gráfica de arcsen">
            <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
            <rect x="44" y="46" width="340" height="286" rx="22" fill="#f8fafc" />
            <rect x={graph.left - 26} y="46" width="370" height="286" rx="22" fill="#f8fafc" />

            <text x="62" y="76" className="fill-slate-500 text-[12px] font-medium">Círculo unitario: sen(y) = x</text>
            <text x={graph.left} y="76" className="fill-slate-500 text-[12px] font-medium">Gráfica: y = arcsen(x)</text>

            <line x1={circle.cx - 140} x2={circle.cx + 140} y1={circle.cy} y2={circle.cy} stroke="#d1d5db" />
            <line x1={circle.cx} x2={circle.cx} y1={circle.cy - 140} y2={circle.cy + 140} stroke="#e5e7eb" />
            <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="#ecfdf5" opacity="0.38" />
            <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="none" stroke="#0f766e" strokeWidth="3" />

            <path d={`M ${circle.cx + 36} ${circle.cy} A 36 36 0 0 ${x >= 0 ? 0 : 1} ${circle.cx + 36 * Math.cos(angle)} ${circle.cy - 36 * Math.sin(angle)}`} fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
            <line x1={circle.cx} x2={point.x} y1={circle.cy} y2={point.y} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <line x1={circle.cx} x2={point.x} y1={circle.cy} y2={circle.cy} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            <line x1={point.x} x2={point.x} y1={circle.cy} y2={point.y} stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            <circle cx={point.x} cy={point.y} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
            <text x={circle.cx + 42} y={circle.cy - 11} className="fill-violet-700 text-[12px] font-medium">y</text>
            <text x={(circle.cx + point.x) / 2 - 18} y={circle.cy + 23} className="fill-blue-700 text-[12px] font-medium">√(1−x²)</text>
            <text x={point.x + 10} y={(point.y + circle.cy) / 2} className="fill-amber-700 text-[12px] font-medium">x</text>

            <line x1={graph.left} x2={graph.left + graph.width} y1={graph.top + graph.height / 2} y2={graph.top + graph.height / 2} stroke="#d1d5db" />
            <line x1={graph.left + graph.width / 2} x2={graph.left + graph.width / 2} y1={graph.top} y2={graph.top + graph.height} stroke="#e5e7eb" />
            <rect x={graph.left} y={graph.top} width={graph.width} height={graph.height} fill="none" stroke="#e5e7eb" rx="14" />
            <rect x={graph.left - 32} y={graph.top} width="32" height={graph.height} fill="#f8fafc" opacity="0.85" />
            <rect x={graph.left + graph.width} y={graph.top} width="32" height={graph.height} fill="#f8fafc" opacity="0.85" />
            <path d={graphPath} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
            <line x1={graph.x} x2={graph.x} y1={graph.top + graph.height / 2} y2={graph.y} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 7" />
            <line x1={graph.left + graph.width / 2} x2={graph.x} y1={graph.y} y2={graph.y} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 7" />
            <circle cx={graph.x} cy={graph.y} r="8" fill="#7c3aed" stroke="#ffffff" strokeWidth="3" />
            <text x={graph.left + graph.width - 40} y={graph.top + graph.height - 12} className="fill-slate-500 text-[11px]">x ∈ [−1,1]</text>
          </svg>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="mb-3 flex justify-between text-sm font-medium text-slate-600">
            <span>x en el dominio de arcsen</span>
            <span className="font-mono text-slate-500">x = {format(x, 3)}</span>
          </div>
          <Slider value={[value]} min={0} max={100} step={1} onValueChange={([next]) => setValue(next)} />
        </div>
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <InfoPanel title="Relación inversa">El mismo valor x aparece como altura en el círculo y como entrada en la gráfica. El resultado arcsen(x) es el ángulo y.</InfoPanel>
        <InfoPanel title="Triángulo visible">
          La hipotenusa vale 1, el cateto vertical vale x y el cateto horizontal vale √(1−x²).
        </InfoPanel>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Derivada geométrica</div>
          <div className="mt-3 text-lg font-semibold">
            <Fraction top="1" bottom={<Root><span>1 − x<Sup>2</Sup></span></Root>} />
          </div>
          <div className="mt-3 text-sm text-white/60">valor actual: {format(derivative, 3)}</div>
        </div>
      </aside>
    </div>
  );
}

function HigherOrderMode() {
  const [value, setValue] = useState(54);
  const x = -2.2 + (value / 100) * 4.4;
  const fn = (t: number) => t * t * t - 3 * t;
  const d1 = (t: number) => 3 * t * t - 3;
  const d2 = (t: number) => 6 * t;
  const xMin = -2.4;
  const xMax = 2.4;
  const bands = [
    { label: "f(x)", fn, yMin: -4.4, yMax: 4.4, color: "#0f766e" },
    { label: "f'(x)", fn: d1, yMin: -3.4, yMax: 9.8, color: "#7c3aed" },
    { label: "f''(x)", fn: d2, yMin: -14, yMax: 14, color: "#b45309" },
  ];
  const panelH = H / 3;
  const sx = PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2);

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[330px] w-full" role="img" aria-label="Funciones sincronizadas de orden superior">
            <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
            {bands.map((band, index) => {
              const top = index * panelH + 14;
              const bottom = (index + 1) * panelH - 10;
              const yScale = (y: number) => bottom - ((y - band.yMin) / (band.yMax - band.yMin)) * (bottom - top);
              const path = Array.from({ length: 220 }, (_, i) => {
                const t = xMin + ((xMax - xMin) * i) / 219;
                return `${i === 0 ? "M" : "L"} ${PAD + ((t - xMin) / (xMax - xMin)) * (W - PAD * 2)} ${yScale(band.fn(t))}`;
              }).join(" ");
              return (
                <g key={band.label}>
                  <line x1={PAD} x2={W - PAD} y1={yScale(0)} y2={yScale(0)} stroke="#e5e7eb" />
                  <text x={PAD + 8} y={top + 18} className="fill-slate-500 text-[12px] font-medium">{band.label}</text>
                  <path d={path} fill="none" stroke={band.color} strokeWidth="3" strokeLinecap="round" />
                  <circle cx={sx} cy={yScale(band.fn(x))} r="6" fill={band.color} stroke="#ffffff" strokeWidth="2.5" />
                </g>
              );
            })}
            <line x1={sx} x2={sx} y1={PAD} y2={H - PAD} stroke="#0f172a" strokeWidth="2" strokeDasharray="7 8" opacity="0.55" />
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <span>Cursor sincronizado</span>
              <span className="font-mono text-slate-500">x = {format(x, 3)}</span>
            </div>
            <Slider value={[value]} min={0} max={100} step={1} onValueChange={([next]) => setValue(next)} />
          </div>
        </div>
      </div>
      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <InfoPanel title="Cambio del cambio">f'(x) mide inclinación. f''(x) muestra cómo cambia esa inclinación.</InfoPanel>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Lectura local</div>
          <div className="mt-3 space-y-2 text-sm">
            <div>f'(x) = {format(d1(x), 3)}</div>
            <div>f''(x) = {format(d2(x), 3)}</div>
            <div className="text-white/60">{d2(x) > 0 ? "concavidad hacia arriba" : d2(x) < 0 ? "concavidad hacia abajo" : "punto de inflexión"}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

const modes: Array<[Mode, string]> = [
  ["implicit", "Implícita"],
  ["inverse", "Inversas"],
  ["logarithmic", "Logarítmica"],
  ["inverseTrig", "Trigonométricas inversas"],
  ["higher", "Orden superior"],
];

export function AdvancedDifferentiationVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("implicit");

  return (
    <VisualShell
      title={title ?? "Técnicas avanzadas de derivación"}
      subtitle="Transforma estructuras ocultas hasta revelar su derivada."
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
        {mode === "implicit" ? <ImplicitMode /> : null}
        {mode === "inverse" ? <InverseMode /> : null}
        {mode === "logarithmic" ? <LogarithmicMode /> : null}
        {mode === "inverseTrig" ? <InverseTrigMode /> : null}
        {mode === "higher" ? <HigherOrderMode /> : null}
      </div>
    </VisualShell>
  );
}
