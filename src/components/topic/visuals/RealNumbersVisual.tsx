import { useMemo, useRef, useState } from "react";
import { InlineMath } from "react-katex";
import { BadgeCheck, MoveHorizontal } from "lucide-react";
import { VisualShell } from "./VisualShell";

const MIN = -10;
const MAX = 10;
const SVG_WIDTH = 920;
const SVG_HEIGHT = 300;
const LINE_START = 70;
const LINE_END = 850;
const LINE_Y = 150;

function clamp(value: number, min = MIN, max = MAX) {
  return Math.min(max, Math.max(min, value));
}

function roundTenth(value: number) {
  return Math.round(value * 10) / 10;
}

function valueToX(value: number) {
  return LINE_START + ((value - MIN) / (MAX - MIN)) * (LINE_END - LINE_START);
}

function xToValue(x: number) {
  return MIN + ((x - LINE_START) / (LINE_END - LINE_START)) * (MAX - MIN);
}

function isInteger(value: number) {
  return Math.abs(value - Math.round(value)) < 0.001;
}

function isNatural(value: number) {
  return isInteger(value) && value > 0;
}

function isRational(value: number) {
  return Number.isFinite(value);
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function membership(value: number) {
  const groups = [
    { label: "N", name: "Natural", active: isNatural(value) },
    { label: "Z", name: "Entero", active: isInteger(value) },
    { label: "Q", name: "Racional", active: isRational(value) },
    { label: "R", name: "Real", active: true },
  ];

  const strongest = groups.find((group) => group.active)?.name ?? "Real";
  return { groups, strongest };
}

export function RealNumbersVisual({ title }: { title?: string }) {
  const [value, setValue] = useState(2.4);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointX = valueToX(value);
  const info = useMemo(() => membership(value), [value]);

  const updateFromClientX = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const localX = ((clientX - rect.left) / rect.width) * SVG_WIDTH;
    setValue(roundTenth(clamp(xToValue(localX))));
  };

  return (
    <VisualShell
      title={title ?? "Numeros reales"}
      subtitle="Arrastra el punto para explorar subconjuntos de los numeros reales."
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative min-h-[420px] overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 sm:p-6">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="h-full min-h-[300px] w-full touch-none select-none"
            role="img"
            aria-label="Recta numerica interactiva de numeros reales"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragging(true);
              updateFromClientX(event.clientX);
            }}
            onPointerMove={(event) => {
              if (dragging) updateFromClientX(event.clientX);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <defs>
              <linearGradient id="real-line-gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="50%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <filter id="real-point-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="8"
                  floodColor="#15803D"
                  floodOpacity="0.24"
                />
              </filter>
            </defs>

            <rect x="28" y="28" width="864" height="232" rx="18" fill="#f8fafc" stroke="#e5e7eb" />
            <g opacity="0.9">
              {Array.from({ length: 21 }, (_, index) => {
                const tick = MIN + index;
                const x = valueToX(tick);
                const major = tick % 5 === 0 || tick === 0;
                return (
                  <g key={tick}>
                    <line
                      x1={x}
                      x2={x}
                      y1={major ? 118 : 130}
                      y2={major ? 182 : 170}
                      stroke={tick === 0 ? "#111827" : "#cbd5e1"}
                      strokeWidth={tick === 0 ? 2 : 1}
                    />
                    {major ? (
                      <text
                        x={x}
                        y={208}
                        textAnchor="middle"
                        className="fill-slate-500 text-[18px] font-medium"
                      >
                        {tick}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </g>

            <line
              x1={LINE_START}
              x2={LINE_END}
              y1={LINE_Y}
              y2={LINE_Y}
              stroke="url(#real-line-gradient)"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <path
              d={`M ${LINE_START - 22} ${LINE_Y} L ${LINE_START} ${LINE_Y - 13} L ${LINE_START} ${LINE_Y + 13} Z`}
              fill="#0f766e"
            />
            <path
              d={`M ${LINE_END + 22} ${LINE_Y} L ${LINE_END} ${LINE_Y - 13} L ${LINE_END} ${LINE_Y + 13} Z`}
              fill="#ca8a04"
            />

            <line
              x1={pointX}
              x2={pointX}
              y1="74"
              y2="226"
              stroke="#15803D"
              strokeDasharray="6 8"
              strokeLinecap="round"
              className="transition-all duration-200 ease-out"
            />
            <g
              transform={`translate(${pointX} ${LINE_Y})`}
              filter="url(#real-point-shadow)"
              className="cursor-grab transition-transform duration-200 ease-out active:cursor-grabbing"
            >
              <circle
                r={dragging ? 20 : 17}
                fill="#15803D"
                className="transition-all duration-150"
              />
              <circle r="8" fill="#ffffff" opacity="0.95" />
            </g>

            <g transform={`translate(${Math.min(Math.max(pointX, 118), 802)} 72)`}>
              <rect x="-58" y="-28" width="116" height="40" rx="12" fill="#111827" />
              <text textAnchor="middle" y="-2" className="fill-white text-[18px] font-semibold">
                x = {formatNumber(value)}
              </text>
            </g>
          </svg>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-border/80 bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 font-medium">
              <MoveHorizontal className="h-4 w-4 text-[#15803D]" />
              Punto arrastrable
            </div>
            <span className="text-muted-foreground">Paso de 0.1</span>
          </div>
        </div>

        <aside className="border-t border-border bg-muted/20 p-5 lg:border-l lg:border-t-0">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#15803D]">
              Valor seleccionado
            </p>
            <div className="mt-2 text-3xl font-semibold text-foreground">
              <InlineMath math={`x=${formatNumber(value)}`} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Este punto pertenece al conjunto mas especifico mostrado como{" "}
              <span className="font-semibold text-foreground">{info.strongest}</span>, y por lo
              tanto tambien a los conjuntos que lo contienen.
            </p>
          </div>

          <div className="mt-4 grid gap-2">
            {info.groups.map((group) => (
              <div
                key={group.label}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                  group.active
                    ? "border-[#15803D]/30 bg-green-50 text-[#14532D]"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white font-semibold shadow-sm">
                    <InlineMath math={`\\mathbb{${group.label}}`} />
                  </span>
                  <span className="text-sm font-medium">{group.name}</span>
                </div>
                {group.active ? <BadgeCheck className="h-4 w-4" /> : null}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </VisualShell>
  );
}
