export type Topic = {
  slug: string;
  title: string;
  description: string;
  status: "completado" | "en-progreso" | "sin-empezar";
};

export type Course = {
  slug: string;
  name: string;
  short: string;
  description: string;
  progress: number;
  topics: Topic[];
};

export const courses: Course[] = [
  {
    slug: "precalculo",
    name: "Precálculo",
    short: "Bases sólidas para tu carrera",
    description:
      "Repasa álgebra, funciones, trigonometría y geometría analítica antes de iniciar cálculo.",
    progress: 65,
    topics: [
      { slug: "numeros-reales", title: "Números reales y desigualdades", description: "Propiedades, intervalos y valor absoluto.", status: "completado" },
      { slug: "funciones", title: "Funciones y gráficas", description: "Dominio, rango y transformaciones.", status: "completado" },
      { slug: "polinomios", title: "Polinomios y factorización", description: "Raíces, división sintética y teorema del residuo.", status: "en-progreso" },
      { slug: "exponenciales", title: "Exponenciales y logaritmos", description: "Propiedades y ecuaciones.", status: "sin-empezar" },
      { slug: "trigonometria", title: "Trigonometría", description: "Identidades, ecuaciones y triángulos.", status: "sin-empezar" },
    ],
  },
  {
    slug: "calculo-1",
    name: "Cálculo 1",
    short: "Límites, derivadas y aplicaciones",
    description:
      "Domina límites, continuidad, derivadas y sus aplicaciones a problemas reales.",
    progress: 32,
    topics: [
      { slug: "limites", title: "Límites y continuidad", description: "Concepto intuitivo, leyes y formas indeterminadas.", status: "en-progreso" },
      { slug: "derivadas", title: "Derivadas", description: "Definición, reglas y derivación implícita.", status: "sin-empezar" },
      { slug: "aplicaciones", title: "Aplicaciones de la derivada", description: "Optimización, razones de cambio y gráficas.", status: "sin-empezar" },
      { slug: "integral-intro", title: "Introducción a la integral", description: "Antiderivadas y teorema fundamental.", status: "sin-empezar" },
    ],
  },
  {
    slug: "calculo-2",
    name: "Cálculo 2",
    short: "Integrales, series y más",
    description:
      "Técnicas de integración, aplicaciones, sucesiones, series y coordenadas polares.",
    progress: 8,
    topics: [
      { slug: "tecnicas", title: "Técnicas de integración", description: "Por partes, sustitución trigonométrica y fracciones parciales.", status: "en-progreso" },
      { slug: "aplicaciones-int", title: "Aplicaciones de la integral", description: "Áreas, volúmenes y longitud de arco.", status: "sin-empezar" },
      { slug: "sucesiones", title: "Sucesiones y series", description: "Convergencia y criterios.", status: "sin-empezar" },
      { slug: "polares", title: "Coordenadas polares", description: "Curvas y áreas en polares.", status: "sin-empezar" },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getTopic = (cSlug: string, tSlug: string) => {
  const c = getCourse(cSlug);
  return c?.topics.find((t) => t.slug === tSlug);
};
