import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 390;
const PAD_X = 58;
const PAD_Y = 38;

type MainTab = "tangent" | "normal";
type TangentMode = "geometria" | "movimiento";

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function CubicLabel() {
  return (
    <span className="whitespace-nowrap">
      f(x) = x<Sup>3</Sup> − 3x + 1
    </span>
  );
}

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(digits).replace("-0.000", "0.000").replace("-0.00", "0.00");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function f(x: number) {
  return x * x * x - 3 * x + 1;
}

function fp(x: number) {
  return 3 * x * x - 3;
}

function scale(value: number, min: number, max: number, start: number, end: number) {
  return start + ((value - min) / (max - min)) * (end - start);
}

function makeScales(xMin: number, xMax: number, yMin: number, yMax: number) {
  return {
    x: (value: number) => scale(value, xMin, xMax, PAD_X, W - PAD_X),
    y: (value: number) => scale(value, yMax, yMin, PAD_Y, H - PAD_Y),
  };
}

function makePath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  samples = 260,
) {
  const scales = makeScales(xMin, xMax, yMin, yMax);
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 1 || y > yMax + 1) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${scales.x(x).toFixed(2)} ${scales.y(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

function clippedLinePath(pointX: number, pointY: number, slope: number, xMin: number, xMax: number, yMin: number, yMax: number) {
  const scales = makeScales(xMin, xMax, yMin, yMax);
  if (!Number.isFinite(slope)) {
    return `M ${scales.x(pointX).toFixed(2)} ${scales.y(yMin).toFixed(2)} L ${scales.x(pointX).toFixed(2)} ${scales.y(yMax).toFixed(2)}`;
  }

  const candidates: Array<{ x: number; y: number }> = [
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
  const unique = visible.filter((point, index) => visible.findIndex((other) => Math.abs(other.x - point.x) < 0.0001 && Math.abs(other.y - point.y) < 0.0001) === index);
  const [start, end] = unique.slice(0, 2);

  if (!start || !end) return "";
  return `M ${scales.x(start.x).toFixed(2)} ${scales.y(start.y).toFixed(2)} L ${scales.x(end.x).toFixed(2)} ${scales.y(end.y).toFixed(2)}`;
}

function screenLinePath(cx: number, cy: number, dx: number, dy: number) {
  const candidates: Array<{ x: number; y: number }> = [];
  const left = PAD_X;
  const right = W - PAD_X;
  const top = PAD_Y;
  const bottom = H - PAD_Y;

  if (Math.abs(dx) > 0.0001) {
    const tLeft = (left - cx) / dx;
    const yLeft = cy + tLeft * dy;
    if (yLeft >= top && yLeft <= bottom) candidates.push({ x: left, y: yLeft });

    const tRight = (right - cx) / dx;
    const yRight = cy + tRight * dy;
    if (yRight >= top && yRight <= bottom) candidates.push({ x: right, y: yRight });
  }

  if (Math.abs(dy) > 0.0001) {
    const tTop = (top - cy) / dy;
    const xTop = cx + tTop * dx;
    if (xTop >= left && xTop <= right) candidates.push({ x: xTop, y: top });

    const tBottom = (bottom - cy) / dy;
    const xBottom = cx + tBottom * dx;
    if (xBottom >= left && xBottom <= right) candidates.push({ x: xBottom, y: bottom });
  }

  const unique = candidates.filter((point, index) => candidates.findIndex((other) => Math.abs(other.x - point.x) < 0.01 && Math.abs(other.y - point.y) < 0.01) === index);
  const [start, end] = unique.slice(0, 2);
  if (!start || !end) return "";
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function rightAnglePath(cx: number, cy: number, tx: number, ty: number, nx: number, ny: number) {
  const tLength = Math.hypot(tx, ty) || 1;
  const nLength = Math.hypot(nx, ny) || 1;
  const ux = tx / tLength;
  const uy = ty / tLength;
  const vx = nx / nLength;
  const vy = ny / nLength;
  const size = 17;
  const p1 = { x: cx + ux * size, y: cy + uy * size };
  const p2 = { x: p1.x + vx * size, y: p1.y + vy * size };
  const p3 = { x: cx + vx * size, y: cy + vy * size };
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`;
}

function axes(xMin: number, xMax: number, yMin: number, yMax: number) {
  const scales = makeScales(xMin, xMax, yMin, yMax);
  const xTicks = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => x >= xMin && x <= xMax);
  const yTicks = [-6, -4, -2, 0, 2, 4, 6].filter((y) => y >= yMin && y <= yMax);
  return (
    <>
      {xTicks.map((x) => (
        <line
          key={`x-${x}`}
          x1={scales.x(x)}
          x2={scales.x(x)}
          y1={PAD_Y}
          y2={H - PAD_Y}
          stroke={x === 0 ? "#94a3b8" : "#e5e7eb"}
          strokeDasharray={x === 0 ? undefined : "3 8"}
        />
      ))}
      {yTicks.map((y) => (
        <line
          key={`y-${y}`}
          x1={PAD_X}
          x2={W - PAD_X}
          y1={scales.y(y)}
          y2={scales.y(y)}
          stroke={y === 0 ? "#94a3b8" : "#e5e7eb"}
          strokeDasharray={y === 0 ? undefined : "3 8"}
        />
      ))}
    </>
  );
}

function ToggleRow({
  showSecant,
  setShowSecant,
  showTangent,
  setShowTangent,
  showDx,
  setShowDx,
  showDy,
  setShowDy,
  showSlope,
  setShowSlope,
  localZoom,
  setLocalZoom,
}: {
  showSecant: boolean;
  setShowSecant: (value: boolean) => void;
  showTangent: boolean;
  setShowTangent: (value: boolean) => void;
  showDx: boolean;
  setShowDx: (value: boolean) => void;
  showDy: boolean;
  setShowDy: (value: boolean) => void;
  showSlope: boolean;
  setShowSlope: (value: boolean) => void;
  localZoom: boolean;
  setLocalZoom: (value: boolean) => void;
}) {
  const toggles = [
    ["Mostrar secante", showSecant, setShowSecant],
    ["Mostrar tangente", showTangent, setShowTangent],
    ["Mostrar Δx", showDx, setShowDx],
    ["Mostrar Δy", showDy, setShowDy],
    ["Mostrar pendiente", showSlope, setShowSlope],
    ["Mostrar zoom local", localZoom, setLocalZoom],
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {toggles.map(([label, checked, setChecked]) => (
        <button
          key={label}
          type="button"
          onClick={() => setChecked(!checked)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            checked ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-950"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TangentTab() {
  const [hValue, setHValue] = useState(54);
  const [mode, setMode] = useState<TangentMode>("geometria");
  const [showSecant, setShowSecant] = useState(true);
  const [showTangent, setShowTangent] = useState(true);
  const [showDx, setShowDx] = useState(true);
  const [showDy, setShowDy] = useState(true);
  const [showSlope, setShowSlope] = useState(true);
  const [localZoom, setLocalZoom] = useState(true);

  const a = 0.65;
  const hSign = hValue < 50 ? -1 : 1;
  const h = hSign * (0.025 + (Math.abs(hValue - 50) / 50) ** 2.25 * 2.15);
  const qx = a + h;
  const py = f(a);
  const qy = f(qx);
  const secantSlope = (qy - py) / h;
  const tangentSlope = fp(a);
  const zoomStrength = localZoom ? clamp(1 - Math.abs(h) / 2.18, 0, 1) : 0;
  const halfWidth = 4.2 - zoomStrength * 3.15;
  const xMin = a - halfWidth;
  const xMax = a + halfWidth;
  const yCenter = py;
  const halfHeight = 6.5 - zoomStrength * 5.2;
  const yMin = yCenter - halfHeight;
  const yMax = yCenter + halfHeight;
  const scales = makeScales(xMin, xMax, yMin, yMax);

  const curvePath = useMemo(() => makePath(f, xMin, xMax, yMin, yMax), [xMin, xMax, yMin, yMax]);
  const secantPath = useMemo(() => clippedLinePath(a, py, secantSlope, xMin, xMax, yMin, yMax), [a, py, secantSlope, xMin, xMax, yMin, yMax]);
  const tangentPath = useMemo(() => clippedLinePath(a, py, tangentSlope, xMin, xMax, yMin, yMax), [a, py, tangentSlope, xMin, xMax, yMin, yMax]);

  return (
    <div className="bg-[#f7f8f6]">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex rounded-xl bg-white p-1 text-sm font-medium shadow-sm ring-1 ring-slate-200/70">
              {[
                ["geometria", "Geometría"],
                ["movimiento", "Tasa de cambio"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id as TangentMode)}
                  className={`rounded-lg px-3 py-2 transition ${mode === id ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-950"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <ToggleRow
              showSecant={showSecant}
              setShowSecant={setShowSecant}
              showTangent={showTangent}
              setShowTangent={setShowTangent}
              showDx={showDx}
              setShowDx={setShowDx}
              showDy={showDy}
              setShowDy={setShowDy}
              showSlope={showSlope}
              setShowSlope={setShowSlope}
              localZoom={localZoom}
              setLocalZoom={setLocalZoom}
            />
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[340px] w-full" role="img" aria-label="Secante que converge a recta tangente">
              <defs>
                <filter id="tangent-glow" x="-25%" y="-25%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f766e" floodOpacity="0.2" />
                </filter>
              </defs>
              <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
              {axes(xMin, xMax, yMin, yMax)}
              <path d={curvePath} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" filter="url(#tangent-glow)" />
              {showSecant ? <path d={secantPath} fill="none" stroke="#7c3aed" strokeWidth="3.2" strokeLinecap="round" opacity="0.82" /> : null}
              {showTangent ? <path d={tangentPath} fill="none" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="9 8" opacity="0.82" /> : null}

              {showDx ? (
                <line x1={scales.x(a)} x2={scales.x(qx)} y1={scales.y(py)} y2={scales.y(py)} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
              ) : null}
              {showDy ? (
                <line x1={scales.x(qx)} x2={scales.x(qx)} y1={scales.y(py)} y2={scales.y(qy)} stroke="#b45309" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
              ) : null}

              <circle cx={scales.x(a)} cy={scales.y(py)} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
              <circle cx={scales.x(qx)} cy={scales.y(qy)} r="7" fill="#7c3aed" stroke="#ffffff" strokeWidth="3" />
              <text x={scales.x(a) + 10} y={scales.y(py) - 10} className="fill-slate-700 text-[12px] font-medium">P</text>
              <text x={scales.x(qx) + 10} y={scales.y(qy) - 10} className="fill-violet-700 text-[12px] font-medium">Q</text>
              {showSlope ? (
                <text x={W - PAD_X - 8} y={PAD_Y + 20} textAnchor="end" className="fill-slate-600 text-[13px] font-medium">
                  m = Δy / Δx = {format(secantSlope, 3)}
                </text>
              ) : null}
            </svg>

            <div className="space-y-3 px-5 pb-5">
              <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                <span>h → 0</span>
                <span className="font-mono text-slate-500">h = {format(h, 4)}</span>
              </div>
              <Slider value={[hValue]} min={0} max={100} step={1} onValueChange={([value]) => setHValue(value)} />
            </div>
          </div>
        </div>

        <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Función</div>
            <div className="mt-2 text-lg font-semibold text-slate-950"><CubicLabel /></div>
          </div>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Pendiente instantánea</div>
            <div className="mt-2 text-2xl font-semibold">{format(tangentSlope, 4)}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {mode === "geometria"
              ? "Mientras Q se acerca a P, la recta secante pierde su carácter promedio y revela la dirección instantánea de la curva."
              : "La misma pendiente mide tasa de cambio: promedio entre dos instantes, instantánea cuando h se acerca a cero."}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Δx</div>
              <div className="mt-1 font-mono text-slate-700">{format(h, 4)}</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Δy</div>
              <div className="mt-1 font-mono text-slate-700">{format(qy - py, 4)}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function NormalTab() {
  const [pointValue, setPointValue] = useState(62);
  const a = -1.65 + (pointValue / 100) * 3.3;
  const py = f(a);
  const tangentSlope = fp(a);
  const normalSlope = Math.abs(tangentSlope) < 0.02 ? Number.POSITIVE_INFINITY : -1 / tangentSlope;
  const xMin = -3.25;
  const xMax = 3.25;
  const yMin = -5.8;
  const yMax = 5.8;
  const scales = makeScales(xMin, xMax, yMin, yMax);
  const curvePath = useMemo(() => makePath(f, xMin, xMax, yMin, yMax), []);
  const px = scales.x(a);
  const pyScreen = scales.y(py);
  const unitX = scales.x(a + 1) - scales.x(a);
  const unitY = scales.y(py + tangentSlope) - scales.y(py);
  const tangentPath = useMemo(() => screenLinePath(px, pyScreen, unitX, unitY), [px, pyScreen, unitX, unitY]);
  const normalPath = useMemo(() => screenLinePath(px, pyScreen, -unitY, unitX), [px, pyScreen, unitX, unitY]);
  const anglePath = useMemo(() => rightAnglePath(px, pyScreen, unitX, unitY, -unitY, unitX), [px, pyScreen, unitX, unitY]);

  return (
    <div className="grid bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[340px] w-full" role="img" aria-label="Recta tangente y recta normal perpendiculares">
            <rect x="18" y="18" width={W - 36} height={H - 36} rx="24" fill="#fbfcfa" />
            {axes(xMin, xMax, yMin, yMax)}
            <path d={curvePath} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
            <path d={tangentPath} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <path d={normalPath} fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />
            <circle cx={scales.x(a)} cy={scales.y(py)} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
            <path
              d={anglePath}
              fill="none"
              stroke="#64748b"
              strokeWidth="1.8"
              opacity="0.7"
            />
            <text x={scales.x(a) + 11} y={scales.y(py) - 12} className="fill-slate-700 text-[12px] font-medium">P</text>
          </svg>
          <div className="space-y-3 px-5 pb-5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600">
              <span>Mover punto</span>
              <span className="font-mono text-slate-500">x = {format(a, 3)}</span>
            </div>
            <Slider value={[pointValue]} min={0} max={100} step={1} onValueChange={([value]) => setPointValue(value)} />
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Geometría local</div>
          <div className="mt-2 text-sm leading-relaxed text-slate-600">La normal gira junto con la tangente y conserva una relación perpendicular en el punto de contacto.</div>
        </div>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Pendiente tangente</div>
          <div className="mt-2 text-2xl font-semibold">{format(tangentSlope, 4)}</div>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4 text-amber-950">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-700">Pendiente normal</div>
          <div className="mt-2 text-2xl font-semibold">{Number.isFinite(normalSlope) ? format(normalSlope, 4) : "vertical"}</div>
        </div>
        <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">Cuando una pendiente se vuelve muy plana, su normal se vuelve casi vertical.</div>
      </aside>
    </div>
  );
}

export function DerivativeTangentVisual({ title }: { title?: string }) {
  const [tab, setTab] = useState<MainTab>("tangent");

  return (
    <VisualShell
      title={title ?? "Derivada y recta tangente"}
      subtitle="Observa cómo el cambio promedio se convierte en dirección instantánea."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
          {[
            ["tangent", "Recta Tangente"],
            ["normal", "Recta Normal"],
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
        {tab === "tangent" ? <TangentTab /> : <NormalTab />}
      </div>
    </VisualShell>
  );
}
