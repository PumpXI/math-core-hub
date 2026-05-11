export type Topic = {
  slug: string;
  title: string;
  description: string;
  status: "completado" | "en-progreso" | "sin-empezar";
};

export type Module = {
  slug: string;
  title: string;
  topics: Topic[];
};

export type CourseColor = {
  /** Tailwind text class for the course accent (e.g. text-amber-500) */
  text: string;
  /** Tailwind background class */
  bg: string;
  /** Tailwind border class */
  border: string;
  /** Tailwind ring class */
  ring: string;
  /** Background for filled progress bar */
  progress: string;
  /** Soft tint background for cards */
  soft: string;
  /** Hex used for inline styles (sidebar dots, etc.) */
  hex: string;
};

export type Course = {
  slug: string;
  code: string;
  name: string;
  short: string;
  description: string;
  progress: number;
  color: CourseColor;
  modules: Module[];
};

const yellow: CourseColor = {
  text: "text-amber-600",
  bg: "bg-amber-500",
  border: "border-amber-400",
  ring: "ring-amber-400",
  progress: "bg-amber-500",
  soft: "bg-amber-50",
  hex: "#EAB308",
};

const green: CourseColor = {
  text: "text-green-700",
  bg: "bg-green-600",
  border: "border-green-500",
  ring: "ring-green-500",
  progress: "bg-green-600",
  soft: "bg-green-50",
  hex: "#16A34A",
};

const t = (slug: string, title: string, description = "", status: Topic["status"] = "sin-empezar"): Topic =>
  ({ slug, title, description, status });

export const courses: Course[] = [
  {
    slug: "precalculo",
    code: "MA0001",
    name: "Precálculo",
    short: "Bases sólidas para tu carrera",
    description:
      "Repasa álgebra, funciones, trigonometría y geometría analítica antes de iniciar cálculo.",
    progress: 35,
    color: yellow,
    modules: [
      {
        slug: "modulo-0",
        title: "Módulo 0 · Temas transversales",
        topics: [
          t("numeros-reales", "Números reales y sus subconjuntos", "N, Z, Q, I y R: definiciones y ejemplos.", "completado"),
          t("propiedades-suma-producto", "Propiedades de la suma y la multiplicación en R", "Conmutatividad, asociatividad, distributividad, neutros e inversos.", "completado"),
          t("orden-en-r", "Orden en R", "Relación de orden, tricotomía y propiedades.", "completado"),
          t("desigualdades-intervalos", "Desigualdades e intervalos", "Notación de intervalos y resolución de desigualdades.", "en-progreso"),
          t("operaciones-reales", "Operaciones con números reales", "Jerarquía, fracciones, potencias y radicales."),
          t("operaciones-algebraicas", "Operaciones con expresiones algebraicas", "Suma, resta, producto y división de polinomios."),
          t("factorizacion-polinomios", "Factorización de polinomios en R", "Factor común, agrupación, productos notables y trinomios."),
          t("ecuaciones-inecuaciones", "Ecuaciones lineales y cuadráticas, inecuaciones lineales", "Métodos de resolución y análisis de soluciones."),
          t("conceptos-funcion", "Conceptos básicos de una función", "Dominio, codominio, ámbito, gráfico, imagen y preimagen."),
        ],
      },
      {
        slug: "tema-1",
        title: "Tema I · Funciones y Geometría Analítica",
        topics: [
          t("monotonia", "Monotonía de una función", "Funciones crecientes y decrecientes."),
          t("max-min-inflexion", "Puntos máximos, mínimos y de inflexión", "Análisis cualitativo del gráfico."),
          t("asintotas", "Ecuaciones de asíntotas", "Asíntotas verticales, horizontales y oblicuas."),
          t("concavidad-convexidad", "Intervalos de concavidad y convexidad", "Lectura desde el gráfico."),
          t("biyectividad", "Biyectividad", "Funciones inyectivas, sobreyectivas y biyectivas."),
          t("intersecciones-ejes", "Intersecciones con los ejes", "Polinomial, racional, radical, valor absoluto, exponencial, logarítmica y a trozos."),
          t("signo-funcion", "Signo de una función", "Tabla de signos y análisis."),
          t("dominio-maximo", "Dominio máximo de una función", "Restricciones algebraicas."),
          t("funcion-inversa", "Función inversa", "Cálculo y gráfica."),
          t("funcion-compuesta", "Función compuesta", "Composición y dominio."),
          t("funcion-polinomial", "Función polinomial", "Factorización, teorema del factor, residuo, raíces racionales y división sintética."),
          t("funcion-racional", "Función racional", "División de polinomios, simplificación, fracciones algebraicas y descomposición en parciales."),
          t("funcion-radical", "Función radical", "Racionalización del criterio."),
          t("funcion-valor-absoluto", "Función valor absoluto", "Definición a trozos y gráficas."),
          t("funcion-logaritmica", "Función logarítmica", "Propiedades de los logaritmos."),
          t("graficacion-transformaciones", "Graficación mediante transformaciones", "Traslaciones, compresiones, elongaciones y reflexiones."),
          t("interseccion-graficas", "Intersección entre gráficas de funciones", "Resolución algebraica y gráfica."),
          t("ecuacion-recta", "Ecuación de la recta", "Rectas paralelas y perpendiculares."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Funciones Trigonométricas e Inversas",
        topics: [
          t("circunferencia-trig", "Circunferencia trigonométrica", "Ángulos, radianes y razones."),
          t("funciones-trig-inversas", "Funciones trigonométricas e inversas", "Dominio, ámbito, período, gráficas, intersecciones, concavidad y monotonía."),
          t("identidades-trig", "Identidades trigonométricas", "Pitagóricas, suma y diferencia, doble y medio ángulo."),
          t("sustituciones-trig", "Sustituciones trigonométricas", "Aplicación a expresiones algebraicas."),
          t("aplicaciones-razones", "Aplicaciones de razones trigonométricas", "Triángulos rectángulos y problemas."),
        ],
      },
    ],
  },
  {
    slug: "calculo-1",
    code: "MA1001",
    name: "Cálculo 1",
    short: "Límites, derivadas e integrales",
    description:
      "Domina límites, continuidad, derivación e integración con aplicaciones a problemas reales.",
    progress: 12,
    color: green,
    modules: [
      {
        slug: "tema-1",
        title: "Tema I · Límites",
        topics: [
          t("limites-intuitivo", "Concepto intuitivo de límite y límites laterales", "Aproximaciones y notación.", "en-progreso"),
          t("limites-infinitos", "Límites infinitos y al infinito", "Comportamiento asintótico."),
          t("tecnicas-limites", "Técnicas algebraicas de cálculo de límites", "Factorización, racionalización y simplificación."),
          t("indeterminaciones-encaje", "Indeterminaciones y teorema de compresión", "Formas indeterminadas y teorema del encaje."),
          t("continuidad", "Continuidad en un punto y en un intervalo", "Definición y propiedades."),
          t("continuidad-lateral", "Continuidad por la derecha y por la izquierda", "Casos especiales."),
          t("tipos-discontinuidad", "Tipos de discontinuidad", "Removible, salto e infinita."),
          t("cambios-variable", "Cambios de variable", "Aplicaciones al cálculo de límites."),
          t("limites-trigonometricos", "Límites trigonométricos", "Técnicas, sustituciones e identidades para límites con funciones trigonométricas.", "en-progreso"),
          t("asintotas-vh", "Asíntotas verticales y horizontales", "Determinación a partir de límites."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Derivación",
        topics: [
          t("definicion-derivada", "Definición e interpretación de la derivada", "Tasa de cambio y pendiente."),
          t("reglas-derivacion", "Reglas de derivación", "Suma, producto, cociente y cadena."),
          t("derivada-pol-exp", "Derivada de funciones polinomiales y exponenciales", "Aplicación de reglas básicas."),
          t("derivada-trig", "Derivada de funciones trigonométricas", "Y límites trigonométricos especiales."),
          t("derivacion-implicita", "Derivación implícita", "Curvas definidas implícitamente."),
          t("derivada-inversa", "Derivada de la función inversa", "Fórmula y aplicaciones."),
          t("derivada-log-inv-trig", "Derivada de logarítmicas e inversas trigonométricas", "Reglas y ejemplos."),
          t("derivacion-logaritmica", "Derivación logarítmica", "Productos y potencias complejas."),
          t("derivadas-orden-superior", "Derivadas de orden superior", "Segunda, tercera y n-ésima derivada."),
          t("recta-tangente-normal", "Rectas tangente y normal a una curva", "Ecuaciones y gráficas."),
          t("razones-cambio", "Razones de cambio", "Modelado de problemas."),
          t("extremos", "Extremos absolutos y relativos", "Definiciones y búsqueda."),
          t("fermat-tve", "Teorema de Fermat y teorema del valor extremo", "Condiciones necesarias."),
          t("monotonia-1ra", "Intervalos de monotonía y criterio de la primera derivada", "Crecimiento y decrecimiento."),
          t("concavidad-2da", "Concavidad, puntos de inflexión y criterio de la segunda derivada", "Análisis del gráfico."),
          t("lhopital", "Regla de L'Hôpital", "Indeterminaciones 0/0 e ∞/∞."),
          t("optimizacion", "Problemas de optimización", "Máximos y mínimos aplicados."),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Integración",
        topics: [
          t("integral-indefinida", "Integral indefinida y sus propiedades", "Antiderivadas y constantes."),
          t("integral-definida", "Integral definida como área y sus propiedades", "Sumas de Riemann."),
          t("tfc", "Teorema fundamental del cálculo", "Conexión entre derivada e integral."),
          t("integracion-basica", "Integración de funciones potenciales, exponenciales y trigonométricas", "Tabla de integrales básicas."),
          t("metodo-sustitucion", "Método de sustitución", "Cambio de variable."),
          t("integracion-partes", "Integración por partes", "Fórmula y aplicaciones."),
          t("integrales-trig", "Integrales trigonométricas", "Productos de senos y cosenos."),
          t("sustituciones-trig-int", "Sustituciones trigonométricas", "Para expresiones con raíces."),
          t("fracciones-parciales", "Integración de funciones racionales", "Mediante fracciones simples."),
          t("areas-regiones", "Cálculo de áreas de regiones planas", "Aplicaciones de la integral definida."),
        ],
      },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

const allTopicsOf = (c: Course): Topic[] => c.modules.flatMap((m) => m.topics);

export const getTopic = (cSlug: string, tSlug: string) => {
  const c = getCourse(cSlug);
  if (!c) return undefined;
  return allTopicsOf(c).find((t) => t.slug === tSlug);
};

export const getCourseTopics = (c: Course): Topic[] => allTopicsOf(c);
