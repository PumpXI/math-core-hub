import { type ReactNode, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { VisualShell } from "./VisualShell";

const W = 820;
const H = 420;
const PAD = 48;

type Mode = "optimization" | "rates" | "modeling";
type OptimizationExample = "rectangle" | "box";
type RatesExample = "ladder" | "sphere" | "shadow";
type ModelingExample = "growth" | "motion" | "profit";

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function format(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(digits).replace("-0.00", "0.00");
}

function scales(xMin: number, xMax: number, yMin: number, yMax: number) {
  return {
    x: (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2),
    y: (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2),
  };
}

function pathFromFunction(fn: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number, samples = 260) {
  const s = scales(xMin, xMax, yMin, yMax);
  const commands: string[] = [];
  let drawing = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 0.5 || y > yMax + 0.5) {
      drawing = false;
      continue;
    }
    commands.push(`${drawing ? "L" : "M"} ${s.x(x).toFixed(2)} ${s.y(y).toFixed(2)}`);
    drawing = true;
  }
  return commands.join(" ");
}

function localGraph(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  box: { x: number; y: number; w: number; h: number },
  samples = 220,
) {
  const sx = (x: number) => box.x + ((x - xMin) / (xMax - xMin)) * box.w;
  const sy = (y: number) => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;
  const path = Array.from({ length: samples }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / (samples - 1);
    return `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(fn(x)).toFixed(2)}`;
  }).join(" ");
  return { path, sx, sy };
}

function MiniPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{children}</div>
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

function ElegantFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-h-[340px] w-full" role="img" aria-label={label}>
        <defs>
          <linearGradient id="areaGlow" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="sphereGlow" cx="34%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="42%" stopColor="#5eead4" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.92" />
          </radialGradient>
        </defs>
        <rect x="18" y="18" width={W - 36} height={H - 36} rx="26" fill="#fbfcfa" />
        {children}
      </svg>
    </div>
  );
}

function Axes({ xMin, xMax, yMin, yMax, xTicks = [], yTicks = [] }: { xMin: number; xMax: number; yMin: number; yMax: number; xTicks?: number[]; yTicks?: number[] }) {
  const s = scales(xMin, xMax, yMin, yMax);
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

function OptimizationScene() {
  const [example, setExample] = useState<OptimizationExample>("rectangle");
  const [value, setValue] = useState(50);

  if (example === "box") {
    const cut = 0.45 + (value / 100) * 4.25;
    const length = 16;
    const width = 10;
    const volume = cut * (length - 2 * cut) * (width - 2 * cut);
    const maxCut = (52 - Math.sqrt(1744)) / 12;
    const maxVolume = maxCut * (length - 2 * maxCut) * (width - 2 * maxCut);
    const graphBox = { x: 104, y: 302, w: 610, h: 72 };
    const volumeFn = (x: number) => x * (length - 2 * x) * (width - 2 * x);
    const graph = localGraph(volumeFn, 0, 5, 0, 210, graphBox);
    const sheetX = 84;
    const sheetY = 82;
    const sheetW = 270;
    const sheetH = 170;
    const c = (cut / 5) * 76;
    const boxX = 470;
    const boxY = 170;
    const boxW = 180 - cut * 20;
    const boxD = 78 - cut * 7;
    const boxH = 22 + cut * 24;

    return (
      <LabLayout
        controls={
          <>
            <ToggleRow value={example} onChange={setExample} options={[["rectangle", "Rectángulo"], ["box", "Caja abierta"]]} />
            <ControlSlider label="Tamaño del corte" value={value} onChange={setValue} detail={`x = ${format(cut)} · V = ${format(volume, 1)}`} />
          </>
        }
        side={
          <>
            <MiniPanel title="Sistema acoplado">
              Al aumentar el corte, la altura crece, pero la base se encoge. El volumen nace de esa competencia.
            </MiniPanel>
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Óptimo visual</div>
              <div className="mt-3 text-lg font-semibold">x ≈ {format(maxCut, 2)}</div>
              <div className="mt-1 text-sm text-white/60">la curva de volumen queda plana en el máximo</div>
            </div>
          </>
        }
      >
        <ElegantFrame label="Caja abierta con corte variable y gráfica de volumen">
          <text x="84" y="56" className="fill-slate-500 text-[12px] font-medium">Lámina con cortes</text>
          <rect x={sheetX} y={sheetY} width={sheetW} height={sheetH} rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {[
            [sheetX, sheetY],
            [sheetX + sheetW - c, sheetY],
            [sheetX, sheetY + sheetH - c],
            [sheetX + sheetW - c, sheetY + sheetH - c],
          ].map(([x, y], index) => (
            <rect key={index} x={x} y={y} width={c} height={c} fill="#f59e0b" fillOpacity="0.16" stroke="#d97706" strokeDasharray="6 6" />
          ))}
          <line x1={sheetX + c} x2={sheetX + c} y1={sheetY} y2={sheetY + sheetH} stroke="#0f766e" strokeDasharray="7 8" />
          <line x1={sheetX + sheetW - c} x2={sheetX + sheetW - c} y1={sheetY} y2={sheetY + sheetH} stroke="#0f766e" strokeDasharray="7 8" />
          <line x1={sheetX} x2={sheetX + sheetW} y1={sheetY + c} y2={sheetY + c} stroke="#0f766e" strokeDasharray="7 8" />
          <line x1={sheetX} x2={sheetX + sheetW} y1={sheetY + sheetH - c} y2={sheetY + sheetH - c} stroke="#0f766e" strokeDasharray="7 8" />

          <text x="480" y="56" className="fill-slate-500 text-[12px] font-medium">Caja resultante</text>
          <polygon points={`${boxX},${boxY} ${boxX + boxW},${boxY} ${boxX + boxW + boxD},${boxY - boxD * 0.45} ${boxX + boxD},${boxY - boxD * 0.45}`} fill="#ecfeff" stroke="#0f766e" strokeWidth="2" />
          <polygon points={`${boxX},${boxY} ${boxX},${boxY + boxH} ${boxX + boxW},${boxY + boxH} ${boxX + boxW},${boxY}`} fill="#14b8a6" fillOpacity="0.13" stroke="#0f766e" strokeWidth="2" />
          <polygon points={`${boxX + boxW},${boxY} ${boxX + boxW},${boxY + boxH} ${boxX + boxW + boxD},${boxY + boxH - boxD * 0.45} ${boxX + boxW + boxD},${boxY - boxD * 0.45}`} fill="#2563eb" fillOpacity="0.10" stroke="#2563eb" strokeWidth="2" />

          <g>
            <text x={graphBox.x} y={graphBox.y - 14} className="fill-slate-500 text-[12px] font-medium">Volumen de la caja</text>
            <rect x={graphBox.x} y={graphBox.y} width={graphBox.w} height={graphBox.h} rx="14" fill="#ffffff" stroke="#e2e8f0" />
            <line x1={graphBox.x + 16} x2={graphBox.x + graphBox.w - 16} y1={graph.sy(0)} y2={graph.sy(0)} stroke="#e5e7eb" />
            <path d={graph.path} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
            <line x1={graph.sx(maxCut)} x2={graph.sx(maxCut)} y1={graphBox.y + graphBox.h - 8} y2={graph.sy(maxVolume)} stroke="#d97706" strokeDasharray="6 7" />
            <circle cx={graph.sx(cut)} cy={graph.sy(volume)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
            <circle cx={graph.sx(maxCut)} cy={graph.sy(maxVolume)} r="5" fill="#d97706" />
            <text x={graph.sx(maxCut) + 10} y={graph.sy(maxVolume) + 4} className="fill-amber-700 text-[11px]">máximo</text>
          </g>
        </ElegantFrame>
      </LabLayout>
    );
  }

  const width = 2 + (value / 100) * 10;
  const height = 12 - width;
  const area = width * height;
  const graphBox = { x: 462, y: 112, w: 270, h: 210 };
  const areaFn = (x: number) => x * (12 - x);
  const graph = localGraph(areaFn, 0, 12, 0, 38, graphBox);
  const rectW = width * 24;
  const rectH = height * 24;
  const rx = 205 - rectW / 2;
  const ry = 190 - rectH / 2;

  return (
    <LabLayout
      controls={
        <>
          <ToggleRow value={example} onChange={setExample} options={[["rectangle", "Rectángulo"], ["box", "Caja abierta"]]} />
          <ControlSlider label="Ancho variable" value={value} onChange={setValue} detail={`P = 24 · A = ${format(area, 1)}`} />
        </>
      }
      side={
        <>
          <MiniPanel title="Competencia">
            Con perímetro fijo, aumentar el ancho obliga a reducir la altura. El máximo aparece cuando el sistema se equilibra.
          </MiniPanel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Momento crítico</div>
            <div className="mt-3 text-lg font-semibold">ancho = altura = 6</div>
            <div className="mt-1 text-sm text-white/60">la pendiente de A(w) se vuelve cero</div>
          </div>
        </>
      }
    >
      <ElegantFrame label="Rectángulo de perímetro fijo con gráfica de área">
        <text x="86" y="58" className="fill-slate-500 text-[12px] font-medium">Geometría restringida</text>
        <rect x={rx} y={ry} width={rectW} height={rectH} rx="12" fill="url(#areaGlow)" stroke="#0f766e" strokeWidth="3" />
        <text x={205} y={ry - 14} textAnchor="middle" className="fill-slate-500 text-[12px]">ancho {format(width)}</text>
        <text x={rx + rectW + 14} y={190} className="fill-slate-500 text-[12px]">altura {format(height)}</text>
        <line x1={rx} x2={rx + rectW} y1={ry + rectH + 18} y2={ry + rectH + 18} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <line x1={rx + rectW + 18} x2={rx + rectW + 18} y1={ry} y2={ry + rectH} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

        <text x="474" y="58" className="fill-slate-500 text-[12px] font-medium">Área A(w)</text>
        <rect x={graphBox.x} y={graphBox.y} width={graphBox.w} height={graphBox.h} rx="18" fill="#ffffff" stroke="#e2e8f0" />
        <line x1={graphBox.x + 16} x2={graphBox.x + graphBox.w - 16} y1={graph.sy(0)} y2={graph.sy(0)} stroke="#e5e7eb" />
        <line x1={graph.sx(6)} x2={graph.sx(6)} y1={graphBox.y + graphBox.h - 10} y2={graph.sy(36)} stroke="#d97706" strokeDasharray="6 7" />
        <path d={graph.path} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx={graph.sx(width)} cy={graph.sy(area)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <circle cx={graph.sx(6)} cy={graph.sy(36)} r="5" fill="#d97706" />
        <text x={graph.sx(6) + 10} y={graph.sy(36) + 4} className="fill-amber-700 text-[11px]">máximo</text>
      </ElegantFrame>
    </LabLayout>
  );
}

function RelatedRatesScene() {
  const [example, setExample] = useState<RatesExample>("ladder");
  const [value, setValue] = useState(54);

  if (example === "sphere") {
    const r = 1 + (value / 100) * 5;
    const volume = (4 / 3) * Math.PI * r ** 3;
    const rate = 4 * Math.PI * r ** 2;
    const graph = pathFromFunction((x) => (4 / 3) * Math.PI * x ** 3, 0, 6.2, 0, 950);
    const s = scales(0, 6.2, 0, 950);

    return (
      <LabLayout
        controls={
          <>
            <ToggleRow value={example} onChange={setExample} options={[["ladder", "Escalera"], ["sphere", "Esfera"], ["shadow", "Sombra"]]} />
            <ControlSlider label="Radio del sistema" value={value} onChange={setValue} detail={`r = ${format(r)} · dV/dr = ${format(rate, 1)}`} />
          </>
        }
        side={
          <>
            <MiniPanel title="Crecimiento no lineal">
              El radio cambia suavemente, pero el volumen responde cada vez con más fuerza.
            </MiniPanel>
            <MiniPanel title="Lectura diferencial">
              dV/dt = 4πr<Sup>2</Sup> · dr/dt
            </MiniPanel>
          </>
        }
      >
        <ElegantFrame label="Esfera expansiva con curva de volumen">
          <circle cx="232" cy="205" r={r * 26} fill="url(#sphereGlow)" stroke="#0f766e" strokeWidth="2" />
          <circle cx="232" cy="205" r={r * 26 + 12} fill="none" stroke="#14b8a6" strokeOpacity="0.18" strokeWidth="10" />
          <line x1="232" x2={232 + r * 26} y1="205" y2="205" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <text x={248 + r * 13} y="196" className="fill-slate-600 text-[12px]">r</text>
          <text x="116" y="342" className="fill-slate-500 text-[12px]">Un pequeño aumento radial envuelve más volumen alrededor.</text>
          <path d={graph} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={s.x(r)} cy={s.y(volume)} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
          <text x="520" y="72" className="fill-slate-500 text-[12px] font-medium">Volumen V(r)</text>
        </ElegantFrame>
      </LabLayout>
    );
  }

  if (example === "shadow") {
    const personX = 1.6 + (value / 100) * 7.6;
    const poleH = 6;
    const personH = 1.8;
    const shadow = (personH * personX) / (poleH - personH);
    const groundY = 318;
    const px = 120 + personX * 56;
    const poleX = 102;
    const personTop = groundY - personH * 32;
    const poleTop = groundY - poleH * 32;
    const tip = px + shadow * 56;

    return (
      <LabLayout
        controls={
          <>
            <ToggleRow value={example} onChange={setExample} options={[["ladder", "Escalera"], ["sphere", "Esfera"], ["shadow", "Sombra"]]} />
            <ControlSlider label="Persona caminando" value={value} onChange={setValue} detail={`sombra = ${format(shadow)} · razón acoplada`} />
          </>
        }
        side={
          <>
            <MiniPanel title="Proporción dinámica">
              La persona avanza y la sombra cambia porque ambos triángulos comparten la misma línea de luz.
            </MiniPanel>
            <MiniPanel title="Dependencia">
              La punta de la sombra se mueve más rápido que la persona: una variable arrastra a la otra.
            </MiniPanel>
          </>
        }
      >
        <ElegantFrame label="Poste de luz, persona y sombra cambiante">
          <line x1="74" x2="760" y1={groundY} y2={groundY} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={poleX} x2={poleX} y1={groundY} y2={poleTop} stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <circle cx={poleX} cy={poleTop} r="10" fill="#f59e0b" />
          <line x1={poleX} x2={tip} y1={poleTop} y2={groundY} stroke="#d97706" strokeWidth="2.5" strokeDasharray="8 8" />
          <line x1={px} x2={px} y1={groundY} y2={personTop} stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <circle cx={px} cy={personTop - 10} r="10" fill="#2563eb" />
          <line x1={px} x2={tip} y1={groundY + 2} y2={groundY + 2} stroke="#0f766e" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
          <circle cx={tip} cy={groundY} r="5" fill="#0f766e" />
          <text x={px - 18} y={personTop - 28} className="fill-slate-600 text-[12px]">persona</text>
          <text x={(px + tip) / 2 - 22} y={groundY + 28} className="fill-slate-600 text-[12px]">sombra</text>
        </ElegantFrame>
      </LabLayout>
    );
  }

  const x = 3.1 + (value / 100) * 6.4;
  const length = 10;
  const y = Math.sqrt(length ** 2 - x ** 2);
  const dyDx = -x / y;
  const floorY = 330;
  const wallX = 110;
  const scale = 25;
  const footX = wallX + x * scale;
  const topY = floorY - y * scale;

  return (
    <LabLayout
      controls={
        <>
          <ToggleRow value={example} onChange={setExample} options={[["ladder", "Escalera"], ["sphere", "Esfera"], ["shadow", "Sombra"]]} />
          <ControlSlider label="Extremo inferior" value={value} onChange={setValue} detail={`dx/dt arrastra dy/dt · dy/dx = ${format(dyDx)}`} />
        </>
      }
      side={
        <>
          <MiniPanel title="Variables conectadas">
            La longitud de la escalera permanece fija. Si x aumenta, y debe disminuir.
          </MiniPanel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Relación instantánea</div>
            <div className="mt-3 text-lg font-semibold">x<Sup>2</Sup> + y<Sup>2</Sup> = 10<Sup>2</Sup></div>
            <div className="mt-1 text-sm text-white/60">las razones se transmiten por la restricción</div>
          </div>
        </>
      }
    >
      <ElegantFrame label="Escalera deslizante con triángulo de razones relacionadas">
        <line x1={wallX} x2={wallX} y1="64" y2={floorY} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1={wallX} x2="744" y1={floorY} y2={floorY} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <polygon points={`${wallX},${floorY} ${footX},${floorY} ${wallX},${topY}`} fill="#14b8a6" fillOpacity="0.08" stroke="#0f766e" strokeDasharray="7 9" />
        <line x1={wallX} x2={footX} y1={topY} y2={floorY} stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
        <circle cx={footX} cy={floorY} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <circle cx={wallX} cy={topY} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
        <path d={`M ${footX - 58} ${floorY + 34} L ${footX + 10} ${floorY + 34}`} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        <path d={`M ${wallX - 36} ${topY - 10} L ${wallX - 36} ${topY + 58}`} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <text x={footX - 48} y={floorY + 58} className="fill-blue-700 text-[12px]">dx/dt</text>
        <text x={wallX - 84} y={topY + 34} className="fill-amber-700 text-[12px]">dy/dt</text>
      </ElegantFrame>
    </LabLayout>
  );
}

function ModelingScene() {
  const [example, setExample] = useState<ModelingExample>("motion");
  const [value, setValue] = useState(54);

  if (example === "growth") {
    const t = (value / 100) * 10;
    const cooling = (x: number) => 22 + 68 * Math.exp(-0.32 * x);
    const slope = -21.76 * Math.exp(-0.32 * t);
    const path = pathFromFunction(cooling, 0, 10, 15, 95);
    const s = scales(0, 10, 15, 95);

    return (
      <LabLayout
        controls={
          <>
            <ToggleRow value={example} onChange={setExample} options={[["motion", "Movimiento"], ["growth", "Crecimiento y decaimiento"], ["profit", "Beneficio"]]} />
            <ControlSlider label="Tiempo" value={value} onChange={setValue} detail={`t = ${format(t)} · razón = ${format(slope, 2)}`} />
          </>
        }
        side={
          <>
            <MiniPanel title="Modelo vivo">
              La curva no solo da valores: su pendiente describe la intensidad del cambio en cada instante.
            </MiniPanel>
            <MiniPanel title="Interpretación">
              Al acercarse al equilibrio, la razón de cambio se vuelve cada vez más pequeña.
            </MiniPanel>
          </>
        }
      >
        <ElegantFrame label="Curva de decaimiento con pendiente dinámica">
          <Axes xMin={0} xMax={10} yMin={15} yMax={95} xTicks={[0, 5, 10]} yTicks={[22, 90]} />
          <path d={path} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
          <line x1={PAD} x2={W - PAD} y1={s.y(22)} y2={s.y(22)} stroke="#d97706" strokeDasharray="7 8" />
          <circle cx={s.x(t)} cy={s.y(cooling(t))} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
          <text x={s.x(t) + 14} y={s.y(cooling(t)) - 12} className="fill-slate-600 text-[12px]">pendiente actual</text>
        </ElegantFrame>
      </LabLayout>
    );
  }

  if (example === "profit") {
    const q = 5 + (value / 100) * 90;
    const profit = (x: number) => -0.042 * (x - 54) ** 2 + 130;
    const marginal = -0.084 * (q - 54);
    const path = pathFromFunction(profit, 0, 100, -20, 140);
    const s = scales(0, 100, -20, 140);

    return (
      <LabLayout
        controls={
          <>
            <ToggleRow value={example} onChange={setExample} options={[["motion", "Movimiento"], ["growth", "Crecimiento y decaimiento"], ["profit", "Beneficio"]]} />
            <ControlSlider label="Producción" value={value} onChange={setValue} detail={`q = ${format(q)} · marginal = ${format(marginal, 2)}`} />
          </>
        }
        side={
          <>
            <MiniPanel title="Óptimo aplicado">
              El beneficio crece mientras el marginal es positivo y deja de crecer cuando la pendiente llega a cero.
            </MiniPanel>
            <MiniPanel title="Lectura">
              La derivada no es una fórmula aislada: indica si conviene moverse más o detenerse.
            </MiniPanel>
          </>
        }
      >
        <ElegantFrame label="Curva de beneficio y máximo marginal">
          <Axes xMin={0} xMax={100} yMin={-20} yMax={140} xTicks={[0, 54, 100]} yTicks={[0, 130]} />
          <path d={path} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <line x1={s.x(54)} x2={s.x(54)} y1={s.y(-20)} y2={s.y(130)} stroke="#d97706" strokeDasharray="7 8" />
          <circle cx={s.x(q)} cy={s.y(profit(q))} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
          <text x={s.x(54) + 12} y={s.y(130) - 12} className="fill-amber-700 text-[12px]">máximo</text>
        </ElegantFrame>
      </LabLayout>
    );
  }

  const t = (value / 100) * 8;
  const position = (x: number) => 0.18 * (x - 4) ** 3 - 1.2 * (x - 4) + 4;
  const velocity = (x: number) => 0.54 * (x - 4) ** 2 - 1.2;
  const acceleration = (x: number) => 1.08 * (x - 4);
  const bands = [
    { label: "posición s(t)", note: "curva verde", fn: position, yMin: 0, yMax: 8, color: "#0f766e" },
    { label: "velocidad v(t)", note: "curva azul", fn: velocity, yMin: -2, yMax: 7, color: "#2563eb" },
    { label: "aceleración a(t)", note: "curva naranja", fn: acceleration, yMin: -5, yMax: 5, color: "#d97706" },
  ];
  const sx = PAD + (t / 8) * (W - PAD * 2);
  const particleX = 118 + (t / 8) * 580;
  const particleY = 104;

  return (
    <LabLayout
      controls={
        <>
          <ToggleRow value={example} onChange={setExample} options={[["motion", "Movimiento"], ["growth", "Crecimiento y decaimiento"], ["profit", "Beneficio"]]} />
          <ControlSlider label="Tiempo compartido" value={value} onChange={setValue} detail={`v = ${format(velocity(t))} · a = ${format(acceleration(t))}`} />
        </>
      }
      side={
        <>
          <MiniPanel title="Tres lecturas">
            La posición muestra dónde está el objeto. La velocidad muestra cómo cambia la posición. La aceleración muestra cómo cambia la velocidad.
          </MiniPanel>
          <MiniPanel title="Trayectoria">
            La partícula sigue una trayectoria recta horizontal; las curvas inferiores describen su movimiento con respecto al tiempo.
          </MiniPanel>
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Instante actual</div>
            <div className="mt-3 space-y-1 text-sm">
              <div>posición = {format(position(t))}</div>
              <div>velocidad = {format(velocity(t))}</div>
              <div>aceleración = {format(acceleration(t))}</div>
            </div>
          </div>
        </>
      }
    >
      <ElegantFrame label="Movimiento sincronizado con posición, velocidad y aceleración">
        <text x="76" y="56" className="fill-slate-500 text-[12px] font-medium">Objeto en movimiento</text>
        <text x="604" y="56" className="fill-slate-400 text-[11px]">trayectoria recta</text>
        <line x1="90" x2="730" y1="104" y2="104" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="90" x2="730" y1="104" y2="104" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" opacity="0.08" />
        <circle cx={particleX} cy={particleY} r="17" fill="#0f172a" opacity="0.08" />
        <circle cx={particleX} cy={particleY} r="10" fill="#0f172a" />
        {bands.map((band, index) => {
          const top = 154 + index * 78;
          const yScale = (y: number) => top + 58 - ((y - band.yMin) / (band.yMax - band.yMin)) * 50;
          const path = Array.from({ length: 220 }, (_, i) => {
            const x = (8 * i) / 219;
            return `${i === 0 ? "M" : "L"} ${PAD + (x / 8) * (W - PAD * 2)} ${yScale(band.fn(x))}`;
          }).join(" ");
          return (
            <g key={band.label}>
              <rect x={PAD - 4} y={top - 25} width="162" height="22" rx="8" fill="#fbfcfa" opacity="0.96" />
              <circle cx={PAD + 8} cy={top - 14} r="4" fill={band.color} />
              <text x={PAD + 18} y={top - 8} className="fill-slate-500 text-[12px] font-medium">{band.label}</text>
              <text x={PAD + 118} y={top - 8} className="fill-slate-400 text-[10px]">{band.note}</text>
              <line x1={PAD} x2={W - PAD} y1={yScale(0)} y2={yScale(0)} stroke="#e5e7eb" />
              <path d={path} fill="none" stroke={band.color} strokeWidth="3" strokeLinecap="round" />
              <circle cx={sx} cy={yScale(band.fn(t))} r="6" fill={band.color} stroke="#ffffff" strokeWidth="2.5" />
            </g>
          );
        })}
        <line x1={sx} x2={sx} y1="136" y2="382" stroke="#0f172a" strokeWidth="2" strokeDasharray="7 8" opacity="0.5" />
      </ElegantFrame>
    </LabLayout>
  );
}

function ControlSlider({ label, value, detail, onChange }: { label: string; value: number; detail: string; onChange: (value: number) => void }) {
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

function LabLayout({ children, controls, side }: { children: ReactNode; controls: ReactNode; side: ReactNode }) {
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

const modes: Array<[Mode, string]> = [
  ["optimization", "Optimización"],
  ["rates", "Razones de cambio"],
  ["modeling", "Modelado dinámico"],
];

export function OptimizationRelatedRatesVisual({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("optimization");

  return (
    <VisualShell
      title={title ?? "Optimización y razones de cambio"}
      subtitle="Sistemas dinámicos donde las restricciones convierten el cambio en estructura."
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
        {mode === "optimization" ? <OptimizationScene /> : null}
        {mode === "rates" ? <RelatedRatesScene /> : null}
        {mode === "modeling" ? <ModelingScene /> : null}
      </div>
    </VisualShell>
  );
}
