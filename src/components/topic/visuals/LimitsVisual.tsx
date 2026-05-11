import { useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import { ArrowLeftRight, CircleDot, Sigma } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const SVG_WIDTH = 920;
const SVG_HEIGHT = 420;
const X_MIN = -4;
const X_MAX = 4;
const Y_MIN = -2.35;
const Y_MAX = 2.35;
const PAD_X = 68;
const PAD_Y = 42;
const APPROACH_DISTANCE = 0.28;
const EPSILON = 0.0001;

type Branch = "leftLine" | "middleParabola" | "rightLine";

function piecewiseValue(x: number) {
  if (x < -1) return x + 2;
  if (x < 1) return x * x;
  if (Math.abs(x - 1) < EPSILON) return 2;
  return 3 - x;
}

function branchValue(x: number, branch: Branch) {
  if (branch === "leftLine") return x + 2;
  if (branch === "middleParabola") return x * x;
  return 3 - x;
}

function leftHandLimit(a: number) {
  if (a <= -1) return a + 2;
  if (a <= 1) return a * a;
  return 3 - a;
}

function rightHandLimit(a: number) {
  if (a < -1) return a + 2;
  if (a < 1) return a * a;
  return 3 - a;
}

function xScale(x: number) {
  return PAD_X + ((x - X_MIN) / (X_MAX - X_MIN)) * (SVG_WIDTH - PAD_X * 2);
}

function yScale(y: number) {
  return SVG_HEIGHT - PAD_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (SVG_HEIGHT - PAD_Y * 2);
}

function format(value: number) {
  return value.toFixed(2).replace("-0.00", "0.00");
}

function graphPath(start: number, end: number, branch: Branch) {
  return Array.from({ length: 121 }, (_, index) => {
    const x = start + (index / 120) * (end - start);
    const command = index === 0 ? "M" : "L";
    return `${command} ${xScale(x).toFixed(2)} ${yScale(branchValue(x, branch)).toFixed(2)}`;
  }).join(" ");
}

function limitsMatch(left: number, right: number) {
  return Math.abs(left - right) < 0.01;
}

export function LimitsVisual({ title }: { title?: string }) {
  const [targetA, setTargetA] = useState(1);
  const leftLimit = leftHandLimit(targetA);
  const rightLimit = rightHandLimit(targetA);
  const limitExists = limitsMatch(leftLimit, rightLimit);
  const leftX = Math.max(X_MIN, targetA - APPROACH_DISTANCE);
  const rightX = Math.min(X_MAX, targetA + APPROACH_DISTANCE);
  const leftY = piecewiseValue(leftX);
  const rightY = piecewiseValue(rightX);
  const paths = useMemo(
    () => ({
      left: graphPath(X_MIN, -1, "leftLine"),
      middle: graphPath(-1, 1, "middleParabola"),
      right: graphPath(1, X_MAX, "rightLine"),
    }),
    [],
  );

  return (
    <VisualShell
      title={title ?? "Limites"}
      subtitle="Mueve el punto a para comparar el limite por la izquierda y por la derecha."
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 sm:p-6">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="h-auto min-h-[340px] w-full"
            role="img"
            aria-label="Grafica interactiva de una funcion por partes para estudiar limites laterales"
          >
            <defs>
              <linearGradient id="limit-curve" x1="0" x2="1">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="50%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <filter id="limit-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="8"
                  floodColor="#15803D"
                  floodOpacity="0.22"
                />
              </filter>
            </defs>

            <rect x="24" y="24" width="872" height="372" rx="18" fill="#f8fafc" stroke="#e5e7eb" />
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => (
              <g key={x}>
                <line
                  x1={xScale(x)}
                  x2={xScale(x)}
                  y1={PAD_Y}
                  y2={SVG_HEIGHT - PAD_Y}
                  stroke={x === 0 ? "#94a3b8" : "#e2e8f0"}
                />
                <text
                  x={xScale(x)}
                  y={SVG_HEIGHT - 14}
                  textAnchor="middle"
                  className="fill-slate-500 text-[15px]"
                >
                  {x}
                </text>
              </g>
            ))}
            {[-2, -1, 0, 1, 2].map((y) => (
              <g key={y}>
                <line
                  x1={PAD_X}
                  x2={SVG_WIDTH - PAD_X}
                  y1={yScale(y)}
                  y2={yScale(y)}
                  stroke={y === 0 ? "#94a3b8" : "#e2e8f0"}
                />
                <text
                  x={42}
                  y={yScale(y) + 5}
                  textAnchor="middle"
                  className="fill-slate-500 text-[15px]"
                >
                  {y}
                </text>
              </g>
            ))}

            <line
              x1={xScale(targetA)}
              x2={xScale(targetA)}
              y1={PAD_Y}
              y2={SVG_HEIGHT - PAD_Y}
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="7 7"
            />
            <text
              x={xScale(targetA) + 12}
              y={PAD_Y - 12}
              textAnchor="start"
              className="fill-slate-700 text-[16px] font-semibold"
            >
              a = {format(targetA)}
            </text>

            <path
              d={paths.left}
              fill="none"
              stroke="#0f766e"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#limit-shadow)"
            />
            <path
              d={paths.middle}
              fill="none"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#limit-shadow)"
            />
            <path
              d={paths.right}
              fill="none"
              stroke="#ca8a04"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#limit-shadow)"
            />

            {[
              { x: -1, y: 1, fill: "#ffffff", stroke: "#0f766e", label: "abierto" },
              { x: -1, y: 1, fill: "#15803D", stroke: "#ffffff", label: "cerrado" },
              { x: 1, y: 1, fill: "#ffffff", stroke: "#15803D", label: "abierto" },
              { x: 1, y: 2, fill: "#ffffff", stroke: "#ca8a04", label: "abierto" },
              { x: 1, y: 2, fill: "#ca8a04", stroke: "#ffffff", label: "cerrado" },
            ].map((point, index) => (
              <circle
                key={`${point.x}-${point.y}-${point.label}-${index}`}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                r={point.label === "cerrado" ? 8 : 10}
                fill={point.fill}
                stroke={point.stroke}
                strokeWidth="4"
              />
            ))}

            {[
              { y: leftLimit, color: "#0f766e", label: "limite izq." },
              { y: rightLimit, color: "#ca8a04", label: "limite der." },
            ].map((guide, index) => (
              <g key={`${guide.label}-${guide.y}`}>
                <line
                  x1={index === 0 ? PAD_X : xScale(targetA)}
                  x2={index === 0 ? xScale(targetA) : SVG_WIDTH - PAD_X}
                  y1={yScale(guide.y)}
                  y2={yScale(guide.y)}
                  stroke={guide.color}
                  strokeDasharray="8 8"
                  strokeWidth="2"
                />
                <text
                  x={index === 0 ? PAD_X + 12 : SVG_WIDTH - PAD_X - 12}
                  y={yScale(guide.y) - 10}
                  textAnchor={index === 0 ? "start" : "end"}
                  className="fill-slate-700 text-[14px] font-semibold"
                >
                  {guide.label}: {format(guide.y)}
                </text>
              </g>
            ))}

            {[
              { x: leftX, y: leftY, color: "#0f766e", label: "x -> a-", labelOffset: -18 },
              { x: rightX, y: rightY, color: "#ca8a04", label: "x -> a+", labelOffset: 18 },
            ].map((point) => (
              <g key={point.label} className="transition-all duration-300 ease-out">
                <line
                  x1={xScale(point.x)}
                  x2={xScale(point.x)}
                  y1={yScale(0)}
                  y2={yScale(point.y)}
                  stroke={point.color}
                  strokeDasharray="5 7"
                  strokeWidth="2"
                />
                <line
                  x1={xScale(point.x)}
                  x2={xScale(targetA)}
                  y1={yScale(point.y)}
                  y2={yScale(point.label === "x -> a-" ? leftLimit : rightLimit)}
                  stroke={point.color}
                  strokeDasharray="5 7"
                  strokeWidth="2"
                  opacity="0.85"
                />
                <circle
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r="12"
                  fill={point.color}
                  stroke="#ffffff"
                  strokeWidth="4"
                />
                <text
                  x={xScale(point.x) + point.labelOffset}
                  y={yScale(point.y) - 22}
                  textAnchor={point.labelOffset < 0 ? "end" : "start"}
                  className="fill-slate-700 text-[15px] font-semibold"
                >
                  {point.label}
                </text>
              </g>
            ))}

            <text
              x={xScale(-3)}
              y={yScale(-1) - 18}
              className="fill-teal-800 text-[15px] font-semibold"
            >
              x + 2
            </text>
            <text
              x={xScale(0)}
              y={yScale(0) + 30}
              textAnchor="middle"
              className="fill-green-800 text-[15px] font-semibold"
            >
              x^2
            </text>
            <text
              x={xScale(2.55)}
              y={yScale(0.45) - 18}
              className="fill-slate-700 text-[17px] font-semibold"
            >
              3 - x
            </text>
          </svg>

          <div className="mt-2 rounded-xl border border-border bg-white/90 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <ArrowLeftRight className="h-4 w-4 text-[#15803D]" />
                Punto objetivo <InlineMath math="a" />
              </div>
              <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                a = {format(targetA)}
              </span>
            </div>
            <Slider
              value={[targetA]}
              min={-2.5}
              max={2.5}
              step={0.1}
              onValueChange={([next]) => setTargetA(Number(next.toFixed(1)))}
              aria-label="Punto a para evaluar el limite"
            />
          </div>
        </div>

        <aside className="border-t border-border bg-muted/20 p-5 lg:border-l lg:border-t-0">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14532D]">
              <Sigma className="h-4 w-4" />
              Lectura del limite
            </div>
            <div className="mt-3 text-2xl font-semibold">
              <InlineMath
                math={
                  limitExists
                    ? `\\lim_{x\\to ${format(targetA)}} f(x)=${format(leftLimit)}`
                    : `\\lim_{x\\to ${format(targetA)}} f(x)\\text{ no existe}`
                }
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              El limite general existe solo cuando los limites laterales coinciden. El valor de{" "}
              <InlineMath math="f(a)" /> puede ser distinto, o incluso no decidir el limite.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <ApproachCard label="Limite por la izquierda" color="teal" value={leftLimit} />
            <ApproachCard label="Limite por la derecha" color="amber" value={rightLimit} />
          </div>

          <div
            className={`mt-4 rounded-xl border p-4 text-sm ${
              limitExists
                ? "border-[#15803D]/25 bg-green-50 text-[#14532D]"
                : "border-amber-300 bg-amber-50 text-amber-900"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <CircleDot className="h-4 w-4" />
              Conclusion dinamica
            </div>
            <p className="leading-6">
              {limitExists
                ? `Como ambos lados llegan a ${format(leftLimit)}, el limite general existe en a=${format(targetA)}.`
                : `La izquierda llega a ${format(leftLimit)} y la derecha a ${format(rightLimit)}; por eso el limite general no existe.`}
            </p>
          </div>
        </aside>
      </div>
    </VisualShell>
  );
}

function ApproachCard({
  label,
  color,
  value,
}: {
  label: string;
  color: "teal" | "amber";
  value: number;
}) {
  const styles =
    color === "teal"
      ? "border-teal-200 bg-teal-50 text-teal-900"
      : "border-amber-200 bg-amber-50 text-amber-900";

  return (
    <div className={`rounded-xl border p-3 ${styles}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</p>
      <div className="mt-2 text-sm">
        <InlineMath math={format(value)} />
      </div>
    </div>
  );
}
