import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kepler - STEM que se ve, se entiende y se queda" },
      {
        name: "description",
        content:
          "Kepler revela los patrones invisibles detrás de matemática, física y química con modelos visuales e interactivos.",
      },
      { property: "og:title", content: "Kepler - STEM que se ve, se entiende y se queda" },
      {
        property: "og:description",
        content:
          "Visualizá lo que normalmente solo te explican con símbolos: patrones, movimiento y estructura detrás de STEM.",
      },
    ],
  }),
  component: Landing,
});

const courseWorlds = [
  {
    name: "Matemáticas",
    state: "Beta disponible",
    copy: "Cálculo, álgebra lineal y ecuaciones diferenciales como patrones visibles.",
    aura: "from-cyan-300/60 via-blue-400/25 to-transparent",
    accent: "#0891b2",
    visual: "calculus",
    tracks: [
      "Cálculo I",
      "Cálculo II",
      "Cálculo III",
      "Álgebra lineal",
      "Ecuaciones diferenciales",
    ],
    slug: "calculo-1",
    path: "M42 156 C102 42 164 250 224 126 C288 -4 342 208 432 70",
  },
  {
    name: "Precálculo",
    state: "Beta disponible",
    copy: "Funciones, trigonometría y estructura algebraica como modelos que se pueden ver.",
    aura: "from-violet-300/60 via-fuchsia-300/25 to-transparent",
    accent: "#7c3aed",
    visual: "precalculus",
    tracks: ["Reales", "Enteros", "Racionales", "Naturales"],
    slug: "precalculo",
    path: "M40 146 C98 86 144 84 188 132 S288 190 346 88 S422 108 448 52",
  },
  {
    name: "Física",
    state: "En diseño",
    copy: "Movimiento, campos, ondas, óptica y energía como trayectorias y relaciones visibles.",
    aura: "from-orange-300/60 via-rose-300/25 to-transparent",
    accent: "#ea580c",
    visual: "physics",
    tracks: ["Física I", "Física II", "Física III"],
    path: "M54 76 L132 162 L230 94 L318 174 L416 72",
  },
  {
    name: "Química",
    state: "En diseño",
    copy: "Estructura molecular, reacción y equilibrio como patrones emergentes.",
    aura: "from-emerald-300/60 via-yellow-200/35 to-transparent",
    accent: "#16a34a",
    visual: "chemistry",
    tracks: ["General 1", "General 2", "Orgánica", "Intensiva"],
    path: "M74 132 L150 82 L228 132 L304 80 L388 132",
  },
  {
    name: "Más áreas STEM",
    state: "Próximamente",
    copy: "Computación, ingeniería, biología y nuevas áreas con la misma lógica visual.",
    aura: "from-cyan-300/50 via-amber-200/35 to-violet-300/35",
    accent: "#111827",
    visual: "future",
    tracks: ["Computación", "Ingeniería", "Biología"],
    path: "M56 164 C116 40 190 210 250 88 C310 -10 374 170 436 62",
  },
];

const differences = [
  {
    title: "Ver antes de memorizar",
    copy: "La estructura aparece primero: movimiento, forma, relación y después la fórmula.",
  },
  {
    title: "Modelos como mundos",
    copy: "No entrás a una lista de materiales. Entrás a experiencias donde cada concepto revela un patrón.",
  },
  {
    title: "Patrones visibles",
    copy: "Los conceptos se vuelven más claros porque los ves comportarse, cambiar y conectarse.",
  },
  {
    title: "STEM más allá de símbolos",
    copy: "Matemática, física, química y futuras áreas comparten una misma identidad visual.",
  },
];

const pricingFeatures = [
  "₡2500 al mes",
  "Incluye 1 curso",
  "+₡500 al mes por cada curso extra",
  "Sin cargos escondidos",
  "Pago por SINPE Móvil",
];

type SurfacePatch = {
  points: string;
  fill: string;
  opacity: number;
};

type SurfaceLine = {
  d: string;
  color: string;
  opacity: number;
  width: number;
  dash?: string;
};

const TAU = Math.PI * 2;
const SURFACE_COLORS = ["#06b6d4", "#2563eb", "#8b5cf6", "#ec4899", "#f59e0b", "#22c55e"];

function mexicanHatZ(x: number, y: number) {
  const r = Math.hypot(x, y);
  return r < 0.001 ? 1 : Math.sin(r) / r;
}

function projectSurfacePoint(x: number, y: number, z: number) {
  const rot = -0.62;
  const xr = x * Math.cos(rot) - y * Math.sin(rot);
  const yr = x * Math.sin(rot) + y * Math.cos(rot);
  const depth = 1 / (1 + (yr + 9) * 0.018);

  return {
    x: 380 + xr * 23 * depth,
    y: 348 + yr * 12.5 * depth - z * 158 * depth,
    depth,
  };
}

function pathFromSamples(samples: Array<{ x: number; y: number }>) {
  return samples
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

function surfaceColor(z: number, r: number) {
  const colorIndex = Math.max(
    0,
    Math.min(SURFACE_COLORS.length - 1, Math.floor(((z + 0.28) / 1.28) * SURFACE_COLORS.length)),
  );
  return SURFACE_COLORS[(colorIndex + Math.floor(r / 2.2)) % SURFACE_COLORS.length];
}

function buildMexicanHatSurface() {
  const range = 9.5;
  const steps = 24;
  const step = (range * 2) / steps;
  const patches: Array<SurfacePatch & { depth: number }> = [];

  for (let ix = 0; ix < steps; ix += 1) {
    for (let iy = 0; iy < steps; iy += 1) {
      const corners = [
        [ix, iy],
        [ix + 1, iy],
        [ix + 1, iy + 1],
        [ix, iy + 1],
      ].map(([gx, gy]) => {
        const x = -range + gx * step;
        const y = -range + gy * step;
        const z = mexicanHatZ(x, y);
        return { ...projectSurfacePoint(x, y, z), z, r: Math.hypot(x, y) };
      });

      const avgZ = corners.reduce((sum, point) => sum + point.z, 0) / corners.length;
      const avgR = corners.reduce((sum, point) => sum + point.r, 0) / corners.length;
      const avgDepth = corners.reduce((sum, point) => sum + point.depth, 0) / corners.length;

      patches.push({
        points: corners.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" "),
        fill: surfaceColor(avgZ, avgR),
        opacity: 0.32 + Math.max(0, avgZ + 0.24) * 0.5,
        depth: avgDepth,
      });
    }
  }

  const radialLines: SurfaceLine[] = Array.from({ length: 18 }, (_, index) => {
    const angle = (index / 18) * TAU;
    const samples = Array.from({ length: 80 }, (_, stepIndex) => {
      const radius = (stepIndex / 79) * range;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return projectSurfacePoint(x, y, mexicanHatZ(x, y));
    });

    return {
      d: pathFromSamples(samples),
      color: SURFACE_COLORS[index % SURFACE_COLORS.length],
      opacity: 0.26,
      width: index % 3 === 0 ? 1.6 : 1.05,
    };
  });

  const ringLines: SurfaceLine[] = Array.from({ length: 8 }, (_, index) => {
    const radius = 1.1 + index * 1.05;
    const samples = Array.from({ length: 128 }, (_, stepIndex) => {
      const angle = (stepIndex / 127) * TAU;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return projectSurfacePoint(x, y, mexicanHatZ(x, y));
    });

    return {
      d: pathFromSamples(samples),
      color: SURFACE_COLORS[(index + 1) % SURFACE_COLORS.length],
      opacity: 0.4,
      width: index % 2 === 0 ? 1.9 : 1.25,
    };
  });

  return {
    patches: patches.sort((a, b) => b.depth - a.depth).map(({ depth: _depth, ...patch }) => patch),
    radialLines,
    ringLines,
  };
}

const MEXICAN_HAT_SURFACE = buildMexicanHatSurface();

function lineBetweenSurfacePoints(
  start: { x: number; y: number; z: number },
  end: { x: number; y: number; z: number },
) {
  const from = projectSurfacePoint(start.x, start.y, start.z);
  const to = projectSurfacePoint(end.x, end.y, end.z);
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function buildCartesianPlane() {
  const range = 10;
  const grid = [-8, -6, -4, -2, 2, 4, 6, 8];
  const lines: SurfaceLine[] = [
    ...grid.map((value) => ({
      d: lineBetweenSurfacePoints({ x: -range, y: value, z: 0 }, { x: range, y: value, z: 0 }),
      color: "#0f172a",
      opacity: 0.08,
      width: 1,
      dash: "6 12",
    })),
    ...grid.map((value) => ({
      d: lineBetweenSurfacePoints({ x: value, y: -range, z: 0 }, { x: value, y: range, z: 0 }),
      color: "#0f172a",
      opacity: 0.08,
      width: 1,
      dash: "6 12",
    })),
    {
      d: lineBetweenSurfacePoints({ x: -range, y: 0, z: 0 }, { x: range, y: 0, z: 0 }),
      color: "#0284c7",
      opacity: 0.42,
      width: 2.2,
    },
    {
      d: lineBetweenSurfacePoints({ x: 0, y: -range, z: 0 }, { x: 0, y: range, z: 0 }),
      color: "#7c3aed",
      opacity: 0.38,
      width: 2.2,
    },
    {
      d: lineBetweenSurfacePoints({ x: 0, y: 0, z: -0.52 }, { x: 0, y: 0, z: 1.16 }),
      color: "#0f172a",
      opacity: 0.34,
      width: 2.15,
    },
  ];

  const origin = projectSurfacePoint(0, 0, 0);
  const zTip = projectSurfacePoint(0, 0, 1.16);

  return { lines, origin, zTip };
}

const CARTESIAN_PLANE = buildCartesianPlane();

function Landing() {
  useReveal();

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffdf8] text-slate-950">
      <div aria-hidden="true" className="kepler-screen-glow" />
      <SiteNavbar />
      <main>
        <Hero />
        <StemShowcase />
        <WhyDifferent />
        <CourseWorlds />
        <PricingAccess />
        <SinpeFlow />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-16 sm:px-6 lg:py-24">
      <PageAura />
      <div className="absolute inset-x-0 top-24 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-slate-950/10 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/75 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
            Patrones invisibles, modelos visibles
          </span>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            Kepler
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            STEM que se ve, se entiende y se queda. Kepler convierte matemática, física y química en
            modelos visuales para revelar el porqué detrás de cada fórmula.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-slate-950 text-white shadow-[0_18px_50px_rgba(15,23,42,0.2)] hover:bg-slate-800"
            >
              <Link to="/dashboard">
                Explorar Kepler <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-950/15 bg-white/75 text-slate-950 hover:bg-white"
            >
              <a href="#como-funciona">Cómo funciona</a>
            </Button>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-600">
            {["Patrones", "Modelos", "STEM"].map((item) => (
              <div key={item} className="border-l border-slate-950/10 pl-3">
                <span className="block font-semibold text-slate-950">{item}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  en movimiento
                </span>
              </div>
            ))}
          </div>
        </div>

        <HeroMathScene />
      </div>
    </section>
  );
}

function PageAura() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="landing-aura absolute left-1/2 top-8 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_25%_36%,rgba(34,211,238,0.42),transparent_32%),radial-gradient(circle_at_62%_34%,rgba(99,102,241,0.34),transparent_30%),radial-gradient(circle_at_82%_58%,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_42%_78%,rgba(250,204,21,0.28),transparent_36%)] blur-3xl" />
      <div className="landing-aura landing-aura-delay absolute -left-52 top-[30%] h-[520px] w-[640px] rounded-full bg-[radial-gradient(circle_at_45%_48%,rgba(16,185,129,0.24),transparent_58%),radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.18),transparent_55%)] blur-3xl" />
      <div className="landing-aura absolute -right-56 top-[12%] h-[560px] w-[680px] rounded-full bg-[radial-gradient(circle_at_42%_45%,rgba(249,115,22,0.22),transparent_58%),radial-gradient(circle_at_66%_62%,rgba(168,85,247,0.2),transparent_58%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.2),rgba(255,253,248,0.94)_70%,#fffdf8)]" />
    </div>
  );
}

function HeroMathScene() {
  return (
    <div
      className="reveal landing-hero-scene relative min-h-[430px] sm:min-h-[570px]"
      aria-label="Superficie matematica animada sobre un plano 3D"
    >
      <div className="absolute inset-4 rounded-[8px] bg-[radial-gradient(circle_at_48%_42%,rgba(255,255,255,0.88),rgba(255,255,255,0)_62%)]" />
      <svg
        viewBox="0 0 760 620"
        className="relative h-full min-h-[430px] w-full sm:min-h-[570px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="surfaceAuraStroke" x1="8%" x2="92%" y1="6%" y2="90%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="30%" stopColor="#2563eb" />
            <stop offset="58%" stopColor="#a855f7" />
            <stop offset="78%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="surfaceCoreAura" cx="50%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="44%" stopColor="#e0f2fe" stopOpacity="0.42" />
            <stop offset="72%" stopColor="#f5d0fe" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="depthFade" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#0f172a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.06" />
          </linearGradient>
          <filter
            id="landingSoftGlow"
            x="-160"
            y="-160"
            width="1080"
            height="940"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="landing-plane" style={{ transformOrigin: "380px 432px" }}>
          <path
            d="M94 458 L354 300 L702 405 L402 558 Z"
            fill="rgba(255,255,255,0.34)"
            stroke="#0f172a"
            strokeOpacity="0.08"
          />
          {CARTESIAN_PLANE.lines.map((line, index) => (
            <path
              key={`cartesian-${index}`}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeDasharray={line.dash}
              strokeLinecap="round"
              strokeOpacity={line.opacity}
              strokeWidth={line.width}
            />
          ))}
          <circle
            cx={CARTESIAN_PLANE.origin.x}
            cy={CARTESIAN_PLANE.origin.y}
            r="4"
            fill="#0f172a"
            fillOpacity="0.3"
          />
          <circle
            cx={CARTESIAN_PLANE.zTip.x}
            cy={CARTESIAN_PLANE.zTip.y}
            r="5"
            fill="#0f172a"
            fillOpacity="0.28"
          />
        </g>

        <g className="landing-surface-turn" style={{ transformOrigin: "380px 308px" }}>
          <ellipse
            className="landing-surface-breathe"
            cx="380"
            cy="348"
            rx="256"
            ry="184"
            fill="url(#surfaceCoreAura)"
            opacity="0.76"
          />
          <ellipse
            className="landing-surface-shadow"
            cx="382"
            cy="414"
            rx="286"
            ry="86"
            fill="url(#surfaceAuraStroke)"
            opacity="0.14"
            filter="url(#landingSoftGlow)"
          />

          <g className="landing-surface-fill">
            {MEXICAN_HAT_SURFACE.patches.map((patch, index) => (
              <polygon
                key={`surface-patch-${index}`}
                points={patch.points}
                fill={patch.fill}
                fillOpacity={patch.opacity}
                stroke={patch.fill}
                strokeOpacity="0.055"
                strokeWidth="0.45"
              />
            ))}
          </g>

          <g className="landing-surface-lines" style={{ transformOrigin: "380px 330px" }}>
            {MEXICAN_HAT_SURFACE.ringLines.map((path, index) => (
              <path
                key={`surface-ring-${index}`}
                className="landing-surface-ring"
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeOpacity={path.opacity}
                strokeWidth={path.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {MEXICAN_HAT_SURFACE.radialLines.map((path, index) => (
              <path
                key={`surface-radial-${index}`}
                className="landing-surface-radial"
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeOpacity={path.opacity}
                strokeWidth={path.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </g>

        <g className="landing-vector-field" opacity="0.72">
          {[
            [156, 458, 38, -18, "#06b6d4"],
            [244, 430, 44, -24, "#2563eb"],
            [340, 482, 48, -18, "#a855f7"],
            [498, 430, 48, -24, "#f59e0b"],
            [584, 394, 42, -20, "#10b981"],
          ].map(([x, y, dx, dy, color], index) => (
            <g
              key={`${x}-${y}`}
              className="landing-vector"
              style={{ animationDelay: `${index * 0.24}s` }}
            >
              <line
                x1={x}
                y1={y}
                x2={Number(x) + Number(dx)}
                y2={Number(y) + Number(dy)}
                stroke={color}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle
                cx={Number(x) + Number(dx)}
                cy={Number(y) + Number(dy)}
                r="4"
                fill={color}
                filter="url(#landingSoftGlow)"
              />
            </g>
          ))}
        </g>

        <g opacity="0.76">
          {[
            [176, 214, "#06b6d4"],
            [278, 126, "#f59e0b"],
            [532, 154, "#10b981"],
            [632, 408, "#a855f7"],
            [252, 512, "#ec4899"],
          ].map(([cx, cy, color], index) => (
            <g
              key={`${cx}-${cy}`}
              className="landing-float"
              style={{ animationDelay: `${index * 0.35}s` }}
            >
              <circle cx={cx} cy={cy} r="6" fill={color} filter="url(#landingSoftGlow)" />
              <circle cx={cx} cy={cy} r="17" fill="none" stroke={color} strokeOpacity="0.2" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function StemShowcase() {
  return (
    <section id="como-funciona" className="relative px-4 py-24 sm:px-6">
      <SectionAura side="left" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
            Modelos para ver lo invisible
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            La ciencia, por fin visual.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Una fuerza, una trayectoria y una estructura molecular no son ideas separadas: son
            patrones, relaciones y cambios que podés aprender a reconocer.
          </p>
        </div>
        <PhysicsChemistryScene />
      </div>
    </section>
  );
}

function SectionAura({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 -z-10 h-[560px] w-[720px] rounded-full blur-3xl ${
        side === "left" ? "-left-60" : "-right-60"
      } bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.18),transparent_36%),radial-gradient(circle_at_65%_48%,rgba(168,85,247,0.16),transparent_38%),radial-gradient(circle_at_52%_74%,rgba(250,204,21,0.18),transparent_42%)]`}
    />
  );
}

function PhysicsChemistryScene() {
  return (
    <div className="reveal landing-atom-panel relative overflow-hidden rounded-[8px] p-2">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[26px] bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.16),transparent_58%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.14),transparent_56%),radial-gradient(circle_at_52%_76%,rgba(250,204,21,0.1),transparent_54%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_28%_28%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_72%_34%,rgba(168,85,247,0.14),transparent_36%),radial-gradient(circle_at_52%_76%,rgba(250,204,21,0.12),transparent_40%),radial-gradient(circle_at_78%_72%,rgba(34,197,94,0.1),transparent_36%),linear-gradient(180deg,rgba(255,253,248,0.2),rgba(255,253,248,0.52))]"
      />
      <svg
        viewBox="0 0 760 420"
        className="relative h-[360px] w-full sm:h-[420px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="atomOrbitStroke" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="52%" stopColor="#06b6d4" />
            <stop offset="74%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="atomNucleusGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="32%" stopColor="#fde68a" stopOpacity="0.86" />
            <stop offset="58%" stopColor="#ec4899" stopOpacity="0.42" />
            <stop offset="82%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter
            id="sceneGlow"
            x="-120"
            y="-120"
            width="1000"
            height="720"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          className="landing-atom-field"
          cx="380"
          cy="222"
          rx="278"
          ry="132"
          fill="none"
          stroke="#0f172a"
          strokeOpacity="0.055"
        />
        <ellipse
          className="landing-atom-field landing-atom-field-delay"
          cx="380"
          cy="222"
          rx="214"
          ry="92"
          fill="none"
          stroke="#0f172a"
          strokeOpacity="0.045"
        />

        <g className="landing-atom-scene" style={{ transformOrigin: "380px 218px" }}>
          <ellipse
            className="landing-nucleus-glow"
            cx="380"
            cy="220"
            rx="150"
            ry="150"
            fill="url(#atomNucleusGlow)"
            opacity="0.52"
            filter="url(#sceneGlow)"
          />

          {[
            [-16, 12, "#06b6d4", 18],
            [14, -12, "#ec4899", 17],
            [12, 18, "#f59e0b", 15],
            [-18, -16, "#8b5cf6", 14],
            [2, 2, "#22c55e", 16],
            [30, 4, "#2563eb", 11],
            [-34, 6, "#f97316", 10],
          ].map(([tx, ty, color, radius], index) => (
            <circle
              key={`nucleus-${index}`}
              cx="380"
              cy="220"
              r={Number(radius)}
              fill={String(color)}
              opacity={index < 5 ? "0.86" : "0.64"}
              filter="url(#sceneGlow)"
              transform={`translate(${Number(tx)} ${Number(ty)})`}
            >
              <animateTransform
                attributeName="transform"
                additive="sum"
                type="translate"
                values={`0 0; ${index % 2 === 0 ? 3 : -3} ${index % 3 === 0 ? -2 : 2}; 0 0`}
                dur={`${2.6 + index * 0.18}s`}
                begin={`${index * -0.28}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {[
            {
              className: "landing-atom-orbit-a",
              angle: -18,
              scale: 0.42,
              radius: 214,
              color: "#06b6d4",
              delay: "0s",
              size: 8,
            },
            {
              className: "landing-atom-orbit-b",
              angle: 62,
              scale: 0.36,
              radius: 202,
              color: "#a855f7",
              delay: "-2.8s",
              size: 7,
            },
            {
              className: "landing-atom-orbit-c",
              angle: -72,
              scale: 0.34,
              radius: 188,
              color: "#22c55e",
              delay: "-4.6s",
              size: 7,
            },
          ].map((orbit) => (
            <g
              key={orbit.className}
              className={orbit.className}
              style={{ transformOrigin: "380px 220px", animationDelay: orbit.delay }}
            >
              <g transform={`translate(380 220) rotate(${orbit.angle}) scale(1 ${orbit.scale})`}>
                <circle
                  cx="0"
                  cy="0"
                  r={orbit.radius}
                  fill="none"
                  stroke="url(#atomOrbitStroke)"
                  strokeOpacity="0.34"
                  strokeWidth="2.1"
                />
                <circle
                  cx="0"
                  cy="0"
                  r={orbit.radius - 28}
                  fill="none"
                  stroke={orbit.color}
                  strokeOpacity="0.08"
                  strokeWidth="24"
                />
                <g transform={`translate(${orbit.radius} 0) scale(1 ${1 / orbit.scale})`}>
                  <circle
                    r={orbit.size + 9}
                    fill={orbit.color}
                    opacity="0.14"
                    filter="url(#sceneGlow)"
                  />
                  <circle r={orbit.size} fill={orbit.color} filter="url(#sceneGlow)" />
                  <circle
                    r={orbit.size + 3}
                    fill="none"
                    stroke={orbit.color}
                    strokeOpacity="0.22"
                  />
                </g>
              </g>
            </g>
          ))}

          <g className="landing-atom-depth" style={{ transformOrigin: "380px 220px" }}>
            <path
              d="M192 220 C262 150 504 150 568 220 C504 290 262 290 192 220"
              fill="none"
              stroke="#0f172a"
              strokeOpacity="0.12"
              strokeWidth="1.4"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function WhyDifferent() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <SectionAura side="right" />
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-violet-700">
            No es otra plataforma de cursos
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Para estudiantes que quieren entender el porqué.
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-slate-950/10 bg-slate-950/10 md:grid-cols-2">
          {differences.map((item, index) => (
            <article key={item.title} className="reveal relative min-h-[230px] bg-[#fffdf8]/95 p-7">
              <div
                aria-hidden="true"
                className={`absolute right-0 top-0 h-36 w-36 rounded-full blur-3xl ${
                  index === 0
                    ? "bg-cyan-300/32"
                    : index === 1
                      ? "bg-violet-300/32"
                      : index === 2
                        ? "bg-emerald-300/32"
                        : "bg-amber-300/32"
                }`}
              />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md leading-7 text-slate-700">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseWorlds() {
  return (
    <section id="cursos" className="relative px-4 py-24 sm:px-6">
      <SectionAura side="left" />
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
              Mapas de aprendizaje
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Cada área revela una estructura distinta de STEM.
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-slate-950/15 bg-white/75 text-slate-950 hover:bg-white"
          >
            <Link to="/dashboard">
              Ver cursos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-5">
          {courseWorlds.map((course) => {
            const content = <CourseWorldCard key={course.name} course={course} />;

            if (course.slug) {
              return (
                <Link
                  key={course.name}
                  to="/course/$courseSlug"
                  params={{ courseSlug: course.slug }}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/40"
                >
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}

function CourseWorldCard({ course }: { course: (typeof courseWorlds)[number] }) {
  return (
    <article className="reveal group relative h-full min-h-[430px] overflow-hidden rounded-[8px] border border-slate-950/10 bg-white/88 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-slate-950/20">
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${course.aura}`} />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-slate-950/10 transition duration-700 group-hover:scale-110"
      />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {course.state}
            </span>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: course.accent }} />
          </div>
          <h3 className="mt-8 text-3xl font-semibold tracking-tight text-slate-950">
            {course.name}
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-700">{course.copy}</p>
          <div className="mt-5 flex min-h-[58px] flex-wrap content-start gap-2">
            {course.tracks.map((track) => (
              <span
                key={track}
                className="rounded-full border border-slate-950/10 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur"
              >
                {track}
              </span>
            ))}
          </div>
        </div>

        <CourseWorldVisual course={course} />
      </div>
    </article>
  );
}

function CourseWorldVisual({ course }: { course: (typeof courseWorlds)[number] }) {
  return <div className="mt-8 h-36 w-full" aria-hidden="true" />;
}

function PricingAccess() {
  return (
    <section id="precio" className="relative px-4 py-24 sm:px-6">
      <SectionAura side="right" />
      <div className="mx-auto max-w-7xl">
        <div className="reveal relative overflow-hidden rounded-[8px] border border-slate-950/10 bg-white/88 p-8 text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur md:p-12">
          <div
            aria-hidden="true"
            className="landing-aura absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.32),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.24),transparent_58%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="landing-aura landing-aura-delay absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(250,204,21,0.28),transparent_60%),radial-gradient(circle_at_68%_52%,rgba(16,185,129,0.2),transparent_62%)] blur-2xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
                Precio y acceso
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Un acceso mensual claro. Sin cargos escondidos.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
                Pagás por SINPE Móvil y accedés a Kepler. Simple, local y pensado para estudiantes.
              </p>
            </div>

            <div className="rounded-[8px] border border-slate-950/10 bg-[#fffdf8]/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="text-sm font-medium text-slate-600">Acceso mensual base</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-6xl font-semibold tracking-tight text-slate-950">₡2500</span>
                <span className="pb-2 text-slate-600">al mes</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Incluye 1 curso. Cada curso extra suma ₡500 al mes.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {pricingFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7 w-full bg-slate-950 text-white hover:bg-slate-800">
                <Link to="/register">Solicitar acceso</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SinpeFlow() {
  const steps = [
    ["1", "Elegís tu acceso", "Seleccionás el curso incluido y cualquier curso extra."],
    ["2", "Pagás por SINPE Móvil", "Un pago mensual sencillo, local y transparente."],
    ["3", "Se activa tu acceso", "Entrás directo a tus modelos visuales de aprendizaje STEM."],
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
            SINPE Móvil
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Local, transparente y profesional.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, copy]) => (
            <article
              key={number}
              className="reveal rounded-[8px] border border-slate-950/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {number}
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-700">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-slate-950/10 bg-white p-8 text-center shadow-[0_28px_90px_rgba(15,23,42,0.08)] md:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.26),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.2),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(250,204,21,0.22),transparent_38%),radial-gradient(circle_at_30%_82%,rgba(16,185,129,0.16),transparent_36%)]"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Kepler</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Convertí conceptos abstractos en ideas visibles.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Aprendé desde modelos, movimiento y patrones; no desde bloques de texto.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-slate-950 text-white hover:bg-slate-800">
              <Link to="/register">
                Solicitar acceso <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-950/15 bg-white/70 text-slate-950 hover:bg-white"
            >
              <a href="#cursos">Explorar mundos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
