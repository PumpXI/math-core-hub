import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kepler - STEM universitario para avanzar con claridad" },
      {
        name: "description",
        content:
          "Kepler te ayuda a entender y dominar Matemática Universitaria, Física General y Química con rutas claras, práctica progresiva y enfoque universitario.",
      },
      { property: "og:title", content: "Kepler - STEM universitario para avanzar con claridad" },
      {
        property: "og:description",
        content:
          "Dominá las materias que frenan tu carrera con una experiencia STEM universitaria premium.",
      },
    ],
  }),
  component: Landing,
});

const courseWorlds = [
  {
    name: "Matemática Universitaria",
    state: "Beta disponible",
    copy: "Desde precálculo hasta integrales: funciones, límites, derivadas y álgebra para construir base y avanzar con seguridad.",
    aura: "from-cyan-300/60 via-blue-400/25 to-transparent",
    accent: "#0891b2",
    visual: "calculus",
    tracks: [
      "Precálculo",
      "Funciones",
      "Límites",
      "Cálculo I",
      "Derivadas",
      "Integrales",
      "Álgebra",
    ],
    slug: "calculo-1",
    path: "M42 156 C102 42 164 250 224 126 C288 -4 342 208 432 70",
  },
  {
    name: "Física",
    state: "En diseño",
    copy: "Recorridos universitarios progresivos para construir intuición física, resolver problemas y rendir mejor.",
    aura: "from-orange-300/60 via-rose-300/25 to-transparent",
    accent: "#ea580c",
    visual: "physics",
    tracks: ["Física General I", "Física General II", "Física General III"],
    path: "M54 76 L132 162 L230 94 L318 174 L416 72",
  },
  {
    name: "Química",
    state: "En diseño",
    copy: "Fundamentos, profundidad y entrenamiento aplicado para entender química con criterio universitario.",
    aura: "from-emerald-300/60 via-yellow-200/35 to-transparent",
    accent: "#16a34a",
    visual: "chemistry",
    tracks: [
      "Química General I",
      "Química General II",
      "Química Intensiva",
      "Química Orgánica",
    ],
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
    title: "Ruta académica, no respuestas sueltas",
    copy: "Kepler organiza cada tema en secuencia pedagógica: teoría, ejemplos, práctica y evaluación para construir dominio real.",
  },
  {
    title: "Visual Lab donde más importa",
    copy: "La intuición se construye con experiencias interactivas dentro del módulo, conectadas con ejercicios tipo examen.",
  },
  {
    title: "Tutor AI con contexto del curso",
    copy: "No es un chat genérico: el tutor acompaña tu avance dentro del contenido y te guía según el punto exacto donde te trabaste.",
  },
  {
    title: "Pensado para aprobar y entender",
    copy: "Todo está diseñado para estudiantes universitarios STEM que necesitan claridad, práctica y progreso medible semana a semana.",
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
    <div className="relative min-h-screen overflow-x-clip bg-[#fffdf8] text-slate-950">
      <div aria-hidden="true" className="kepler-screen-glow" />
      <div aria-hidden="true" className="kepler-edge-aura" />
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
          </span>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            Dominá las materias que frenan tu carrera.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            Entendé lo que en clase nunca quedó claro y avanzá con confianza en Matemática
            Universitaria, Física General y Química.
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
            {["Claridad", "Práctica", "Dominio"].map((item) => (
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
            Cómo funciona
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Una ruta académica clara, de intuición a examen.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Cada módulo combina explicación guiada, ejemplos resueltos y práctica progresiva para que
            entiendas de verdad y rindas mejor.
          </p>
        </div>
        <ModulePreviewCard />
      </div>
    </section>
  );
}

function ModulePreviewCard() {
  const lessons = [
    { name: "Teoría guiada", tag: "Base conceptual" },
    { name: "Ejemplos resueltos", tag: "Paso a paso" },
    { name: "Ejercicios progresivos", tag: "Práctica" },
    { name: "Visual Lab de límites", tag: "Intuición" },
    { name: "Tutor AI del módulo", tag: "Soporte" },
    { name: "Ejercicios tipo examen", tag: "Evaluación" },
  ];

  return (
    <article className="reveal relative overflow-hidden rounded-[10px] border border-slate-950/12 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_24%_24%,rgba(34,211,238,0.2),transparent_52%),radial-gradient(circle_at_78%_26%,rgba(99,102,241,0.2),transparent_52%),radial-gradient(circle_at_58%_82%,rgba(16,185,129,0.14),transparent_54%),radial-gradient(circle_at_18%_78%,rgba(249,115,22,0.14),transparent_56%),radial-gradient(circle_at_82%_82%,rgba(236,72,153,0.14),transparent_56%)] blur-3xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
          <span className="rounded-full border border-slate-950/12 bg-slate-950/5 px-2.5 py-1">
            Vista de módulo
          </span>
          <span className="rounded-full border border-cyan-800/20 bg-cyan-100/70 px-2.5 py-1 text-cyan-900">
            42% completado
          </span>
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Módulo 1 · Límites</h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-700">
          Construí la idea de límite paso a paso, desde la intuición hasta los ejercicios tipo
          examen.
        </p>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-950/10">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-500" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-950/10 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
            Teoría
          </span>
          <span className="rounded-full border border-slate-950/10 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
            Ejemplos
          </span>
          <span className="rounded-full border border-slate-950/10 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
            Ejercicios
          </span>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-800">
            Visual Lab
          </span>
          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-800">
            Tutor AI
          </span>
        </div>

        <div className="mt-6 grid gap-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.name}
              className="rounded-[8px] border border-slate-950/8 bg-[#fffdf8] px-3 py-2.5"
            >
              <div>
                <span className="text-sm text-slate-800">{lesson.name}</span>
                <span className="ml-2 text-xs text-slate-500">{lesson.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
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

function WhyDifferent() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <SectionAura side="right" />
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-violet-700">Identidad Kepler</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Kepler no compite con un chat. Resuelve el proceso completo de estudiar STEM.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            ChatGPT o Claude pueden responder preguntas. Kepler te lleva por una secuencia académica
            diseñada para entender, practicar y sostener resultados en materias universitarias
            difíciles.
          </p>
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
    ["3", "Se activa tu acceso", "Entrás directo a tu ruta de estudio STEM y empezás a avanzar."],
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
            Entendé en serio. Practicá mejor. Avanzá más rápido.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-700">
            La plataforma STEM universitaria para superar materias difíciles con claridad y método.
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
