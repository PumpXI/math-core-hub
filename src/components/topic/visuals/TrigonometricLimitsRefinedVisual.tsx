import { type ReactNode, useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import { RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const CIRCLE_W = 700;
const CIRCLE_H = 440;
const GRAPH_W = 760;
const GRAPH_H = 340;
const PAD = 44;

type MainTab = "circle" | "squeeze";
type IdentityMode = "geometria" | "identidades";
type CurveKey = "lower" | "middle" | "upper";

function XSquared({ negative = false }: { negative?: boolean }) {
  return (
    <span className="whitespace-nowrap">
      {negative ? "−" : null}x<sup className="text-[0.68em] leading-none">2</sup>
    </span>
  );
}

function XSquaredSen() {
  return (
    <span className="whitespace-nowrap">
      x<sup className="text-[0.68em] leading-none">2</sup>sen(x)
    </span>
  );
}

function SqueezeInequality() {
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
      <XSquared negative />
      <span>≤</span>
      <XSquaredSen />
      <span>≤</span>
      <XSquared />
    </span>
  );
}

function TanIdentity() {
  return (
    <span className="inline-flex items-center gap-2">
      <span>tan(x) =</span>
      <span className="inline-flex flex-col items-center px-1 leading-none">
        <span>sen(x)</span>
        <span className="my-1 h-px w-full min-w-14 bg-emerald-950" />
        <span>cos(x)</span>
      </span>
    </span>
  );
}

const curveLabels: Record<CurveKey, ReactNode> = {
  lower: (
    <span className="whitespace-nowrap">
      y = <XSquared negative />
    </span>
  ),
  middle: (
    <span className="whitespace-nowrap">
      y = <XSquaredSen />
    </span>
  ),
  upper: (
    <span className="whitespace-nowrap">
      y = <XSquared />
    </span>
  ),
};

function fmt(value: number) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(4).replace("-0.0000", "0.0000");
}

function polar(cx: number, cy: number, r: number, theta: number) {
  return {
    x: cx + r * Math.cos(theta),
    y: cy - r * Math.sin(theta),
  };
}

function makePath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  xScale: (x: number) => number,
  yScale: (y: number) => number,
) {
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= 260; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / 260;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 0.15 || y > yMax + 0.15) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${xScale(x).toFixed(2)} ${yScale(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

function makeBandPath(
  lower: (x: number) => number,
  upper: (x: number) => number,
  xMin: number,
  xMax: number,
  xScale: (x: number) => number,
  yScale: (y: number) => number,
) {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= 180; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / 180;
    top.push(`${xScale(x).toFixed(2)} ${yScale(upper(x)).toFixed(2)}`);
    bottom.unshift(`${xScale(x).toFixed(2)} ${yScale(lower(x)).toFixed(2)}`);
  }
  return `M ${top.join(" L ")} L ${bottom.join(" L ")} Z`;
}

export function TrigonometricLimitsRefinedVisual({ title }: { title?: string }) {
  const [tab, setTab] = useState<MainTab>("circle");
  const [identityMode, setIdentityMode] = useState<IdentityMode>("geometria");
  const [angleValue, setAngleValue] = useState(28);
  const [squeezeValue, setSqueezeValue] = useState(54);
  const [zoom, setZoom] = useState(true);
  const [visibleCurves, setVisibleCurves] = useState<Record<CurveKey, boolean>>({
    lower: true,
    middle: true,
    upper: true,
  });

  const theta = 0.001 + (angleValue / 100) * (Math.PI - 0.002);
  const degrees = (theta * 180) / Math.PI;
  const sin = Math.sin(theta);
  const cos = Math.cos(theta);
  const tan = Math.tan(theta);
  const tanVisible = Math.abs(cos) > 0.08 && Math.abs(tan) < 5;

  const cx = 310;
  const cy = 230;
  const r = 142;
  const point = polar(cx, cy, r, theta);
  const arcR = 54;
  const arcPoint = polar(cx, cy, arcR, theta);
  const largeArc = theta > Math.PI ? 1 : 0;
  const tanBaseX = cx + r;
  const tanY = cy - r * tan;
  const cosEndX = cx + r * cos;
  const sinEndY = cy - r * sin;

  const sq = {
    sin: Math.abs(sin),
    cos: Math.abs(cos),
    tan: Math.abs(tan),
  };
  const pythagoreanSum = sin * sin + cos * cos;
  const ratio = Math.abs(cos) < 0.0001 ? Number.POSITIVE_INFINITY : sin / cos;

  const squeezeDirection = squeezeValue < 50 ? -1 : 1;
  const squeezeX = squeezeDirection * (0.006 + (Math.abs(squeezeValue - 50) / 50) ** 2 * (zoom ? 1.05 : 2));
  const domain = zoom ? 1.05 : 2;
  const xMin = -domain;
  const xMax = domain;
  const yLimit = domain * domain * 1.08;
  const yMin = -yLimit;
  const yMax = yLimit;
  const xScale = (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (GRAPH_W - PAD * 2);
  const yScale = (y: number) => GRAPH_H - PAD - ((y - yMin) / (yMax - yMin)) * (GRAPH_H - PAD * 2);
  const lowerBound = (x: number) => -(x * x);
  const middleCurve = (x: number) => x * x * Math.sin(x);
  const upperBound = (x: number) => x * x;

  const paths = useMemo(
    () => ({
      lower: makePath(lowerBound, xMin, xMax, yMin, yMax, xScale, yScale),
      middle: makePath(middleCurve, xMin, xMax, yMin, yMax, xScale, yScale),
      upper: makePath(upperBound, xMin, xMax, yMin, yMax, xScale, yScale),
      band: makeBandPath(lowerBound, upperBound, xMin, xMax, xScale, yScale),
    }),
    [xMin, xMax, yMin, yMax],
  );

  function toggleCurve(key: CurveKey) {
    setVisibleCurves((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <VisualShell
      title={title ?? "Límites trigonométricos e indeterminaciones"}
      subtitle="Una exploración visual de la geometría que estabiliza los límites trigonométricos."
    >
      <div className="bg-[#f7f8f6] p-4 sm:p-5">
        <div className="mb-4 flex w-full rounded-2xl border border-slate-200 bg-white/80 p-1 text-sm font-medium shadow-sm backdrop-blur">
          {[
            ["circle", "Círculo unitario"],
            ["squeeze", "Teorema de compresión"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as MainTab)}
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                tab === id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "circle" ? (
          <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Círculo unitario</p>
                  <h3 className="mt-1 text-base font-semibold text-slate-950">Seno, coseno y tangente como geometría viva</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAngleValue(28)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reiniciar
                </button>
              </div>

              <svg viewBox={`0 0 ${CIRCLE_W} ${CIRCLE_H}`} className="h-auto w-full">
                <defs>
                  <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.06 0 0 0 0 0.42 0 0 0 0 0.32 0 0 0 0.18 0" />
                    <feBlend in="SourceGraphic" />
                  </filter>
                </defs>
                <rect x="18" y="18" width={CIRCLE_W - 36} height={CIRCLE_H - 36} rx="30" fill="#fbfcfa" />
                <circle cx={cx} cy={cy} r={r + 34} fill="#ecfdf5" opacity="0.35" />
                <line x1="72" x2="628" y1={cy} y2={cy} stroke="#cbd5e1" strokeWidth="1.2" />
                <line x1={cx} x2={cx} y1="54" y2="390" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#dbe4df" strokeWidth="2" />
                <line x1={tanBaseX} x2={tanBaseX} y1="64" y2="396" stroke="#b6c2bd" strokeWidth="1.4" strokeDasharray="5 8" />

                <path
                  d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcPoint.x} ${arcPoint.y}`}
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.82"
                />
                <text x={cx + 64} y={cy - 28} className="fill-slate-500 text-[13px] font-medium">θ</text>

                <line x1={cx} y1={cy} x2={point.x} y2={point.y} stroke="#0f3f37" strokeWidth="2.6" strokeLinecap="round" filter="url(#softGlow)" />
                <line x1={cx} y1={cy} x2={cosEndX} y2={cy} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                <line x1={point.x} y1={cy} x2={point.x} y2={point.y} stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                <line x1={point.x} y1={point.y} x2={cosEndX} y2={cy} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 7" />
                {tanVisible ? (
                  <>
                    <line x1={tanBaseX} y1={cy} x2={tanBaseX} y2={tanY} stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                    <line x1={cx} y1={cy} x2={tanBaseX} y2={tanY} stroke="#d97706" strokeWidth="1.7" strokeDasharray="6 7" />
                  </>
                ) : null}
                <circle cx={point.x} cy={point.y} r="6" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />

                <text x={cx + (cosEndX - cx) / 2 - 18} y={cy + 23} className="fill-blue-700 text-[12px] font-medium">cos(x)</text>
                <text x={point.x + 10} y={(point.y + sinEndY) / 2} className="fill-violet-700 text-[12px] font-medium">sin(x)</text>
                {tanVisible ? <text x={tanBaseX + 12} y={(tanY + cy) / 2} className="fill-amber-700 text-[12px] font-medium">tan(x)</text> : null}
              </svg>

              <div className="space-y-3 px-5 pb-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Ángulo continuo: 0° a 180°</span>
                  <span className="font-mono text-slate-800">{degrees.toFixed(1)}°</span>
                </div>
                <Slider value={[angleValue]} min={0} max={100} step={1} onValueChange={([value]) => setAngleValue(value)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex rounded-2xl bg-slate-100 p-1 text-xs font-medium">
                  {[
                    ["geometria", "Geometría"],
                    ["identidades", "Identidades"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setIdentityMode(id as IdentityMode)}
                      className={`flex-1 rounded-xl px-3 py-2 transition ${
                        identityMode === id ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {identityMode === "geometria" ? (
                  <div className="space-y-3">
                    {[
                      ["sin(x)", sin, "bg-violet-500"],
                      ["cos(x)", cos, "bg-blue-500"],
                      ["tan(x)", tanVisible ? tan : 0, "bg-amber-500"],
                    ].map(([label, value, color]) => {
                      const width = Math.min(100, Math.abs(value as number) * 78);
                      return (
                        <div key={label as string}>
                          <div className="mb-1 flex justify-between text-xs text-slate-500">
                            <span>{label}</span>
                            <span className="font-mono text-slate-800">{tanVisible || label !== "tan(x)" ? fmt(value as number) : "no definida"}</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-base font-semibold text-slate-950">
                        <InlineMath math="\\sin^2(x)+\\cos^2(x)=1" />
                      </div>
                      <div className="mt-4 grid grid-cols-[1fr_86px] gap-4">
                        <div className="space-y-3">
                          <div>
                            <div className="mb-1 flex justify-between text-xs text-slate-500">
                              <InlineMath math="\\sin^2(x)" />
                              <span className="font-mono">{fmt(sin * sin)}</span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                              <div className="h-full rounded-full bg-violet-500" style={{ width: `${sq.sin * sq.sin * 100}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex justify-between text-xs text-slate-500">
                              <InlineMath math="\\cos^2(x)" />
                              <span className="font-mono">{fmt(cos * cos)}</span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                              <div className="h-full rounded-full bg-blue-500" style={{ width: `${sq.cos * sq.cos * 100}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="grid place-items-center rounded-2xl bg-white text-center shadow-sm">
                          <div>
                            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">suma</div>
                            <div className="font-mono text-lg font-semibold text-slate-950">{fmt(pythagoreanSum)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <div className="text-base font-semibold text-emerald-950">
                        <TanIdentity />
                      </div>
                      <div className="mt-4 grid gap-2 text-xs">
                        <div className="grid grid-cols-[72px_1fr_auto] items-center gap-2">
                          <span className="font-medium text-emerald-950">sen(x)</span>
                          <div className="h-2.5 overflow-hidden rounded-full bg-white">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${Math.abs(sin) * 100}%` }} />
                          </div>
                          <span className="font-mono text-emerald-950">{fmt(sin)}</span>
                        </div>
                        <div className="grid grid-cols-[72px_1fr_auto] items-center gap-2">
                          <span className="font-medium text-emerald-950">cos(x)</span>
                          <div className="h-2.5 overflow-hidden rounded-full bg-white">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.abs(cos) * 100}%` }} />
                          </div>
                          <span className="font-mono text-emerald-950">{fmt(cos)}</span>
                        </div>
                        <div className="mt-1 rounded-xl bg-white px-3 py-2 font-mono text-sm text-emerald-950 shadow-sm">
                          {fmt(sin)} / {fmt(cos)} = {Number.isFinite(ratio) ? fmt(ratio) : "no definido"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.38fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Teorema de compresión</p>
                  <h3 className="mt-1 text-base font-semibold text-slate-950">
                    <SqueezeInequality />
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["lower", "middle", "upper"] as CurveKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCurve(key)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        visibleCurves[key] ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {curveLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="h-auto min-h-[320px] w-full">
                <rect x="18" y="18" width={GRAPH_W - 36} height={GRAPH_H - 36} rx="28" fill="#fbfcfa" />
                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                  <line key={`v-${tick}`} x1={xScale(xMin + (xMax - xMin) * tick)} x2={xScale(xMin + (xMax - xMin) * tick)} y1={PAD} y2={GRAPH_H - PAD} stroke="#e5e7eb" />
                ))}
                {[-1, -0.5, 0, 0.5, 1].map((ratioTick) => (
                  <line
                    key={ratioTick}
                    x1={PAD}
                    x2={GRAPH_W - PAD}
                    y1={yScale(ratioTick * domain * domain)}
                    y2={yScale(ratioTick * domain * domain)}
                    stroke={ratioTick === 0 ? "#94a3b8" : "#e5e7eb"}
                  />
                ))}
                <line x1={xScale(0)} x2={xScale(0)} y1={PAD} y2={GRAPH_H - PAD} stroke="#94a3b8" strokeDasharray="5 7" />
                <path d={paths.band} fill="#10b981" opacity="0.1" />
                {visibleCurves.upper ? <path d={paths.upper} fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" /> : null}
                {visibleCurves.lower ? <path d={paths.lower} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" /> : null}
                {visibleCurves.middle ? <path d={paths.middle} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" /> : null}
                <line
                  x1={xScale(squeezeX)}
                  x2={xScale(squeezeX)}
                  y1={yScale(upperBound(squeezeX))}
                  y2={yScale(lowerBound(squeezeX))}
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.18"
                />
                <circle cx={xScale(squeezeX)} cy={yScale(middleCurve(squeezeX))} r="7" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
                <circle cx={xScale(squeezeX)} cy={yScale(lowerBound(squeezeX))} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx={xScale(squeezeX)} cy={yScale(upperBound(squeezeX))} r="5" fill="#111827" stroke="#ffffff" strokeWidth="2" />
                <text x={xScale(0) + 8} y={PAD + 18} className="fill-slate-500 text-[12px] font-medium">x = 0</text>
              </svg>

              <div className="space-y-3 px-5 pb-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>x se acerca a cero</span>
                  <span className="font-mono text-slate-800">x = {squeezeX.toFixed(4)}</span>
                </div>
                <Slider value={[squeezeValue]} min={0} max={100} step={1} onValueChange={([value]) => setSqueezeValue(value)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Convergencia</div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    {curveLabels.lower}
                    <span className="font-mono text-slate-950">{fmt(lowerBound(squeezeX))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {curveLabels.middle}
                    <span className="font-mono text-emerald-800">{fmt(middleCurve(squeezeX))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {curveLabels.upper}
                    <span className="font-mono text-slate-950">{fmt(upperBound(squeezeX))}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600 shadow-sm">
                <p>Observa cómo la función central queda atrapada entre dos funciones que se acercan a 0.</p>
                <p className="mt-3">
                  Como <XSquared negative /> y <XSquared /> tienden a 0, la función <XSquaredSen /> también debe tender a 0.
                </p>
              </div>
              <label className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
                <input type="checkbox" checked={zoom} onChange={(event) => setZoom(event.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                Acercamiento cerca de cero
              </label>
            </div>
          </div>
        )}
      </div>
    </VisualShell>
  );
}
