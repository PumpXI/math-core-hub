import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Search,
  User,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Home académico — Kepler" },
      { name: "description", content: "Centro operativo académico para estudiantes STEM de Kepler." },
    ],
  }),
  component: Dashboard,
});

type ModuleState = "no-iniciado" | "en-progreso" | "completado";

type HomeModule = {
  id: string;
  title: string;
  topic: string;
  subtopics?: string[];
  keywords?: string[];
  route?: { courseSlug: string; topicSlug: string };
};

type HomeCourse = {
  id: string;
  area: string;
  name: string;
  description: string;
  accent: string;
  courseSlug?: string;
  modules: HomeModule[];
};

type ProgressStore = {
  completedModuleIds: string[];
  inProgressModuleIds: string[];
};

const STORAGE_KEY = "kepler-home-progress-v1";

const topicToModule = (courseId: string, topic: string, route?: HomeModule["route"], keywords?: string[]): HomeModule => ({
  id: `${courseId}-${normalizeText(topic).replace(/[^a-z0-9]+/g, "-")}`,
  title: topic,
  topic,
  route,
  keywords,
});

const homeCourses: HomeCourse[] = [
  {
    id: "precalculo",
    area: "Matemáticas",
    name: "Precálculo",
    description: "Bases de álgebra y funciones para entrar a cálculo con seguridad.",
    accent: "#EDE9FE",
    courseSlug: "precalculo",
    modules: [
      topicToModule("precalculo", "Números reales y subconjuntos", { courseSlug: "precalculo", topicSlug: "numeros-reales" }),
      topicToModule("precalculo", "Propiedades de la suma y la multiplicación", { courseSlug: "precalculo", topicSlug: "propiedades-suma-producto" }),
      topicToModule("precalculo", "Orden en R", { courseSlug: "precalculo", topicSlug: "orden-en-r" }),
      topicToModule("precalculo", "Desigualdades e intervalos", { courseSlug: "precalculo", topicSlug: "desigualdades-intervalos" }),
      topicToModule("precalculo", "Operaciones con números reales", { courseSlug: "precalculo", topicSlug: "operaciones-reales" }),
      topicToModule("precalculo", "Operaciones con expresiones algebraicas", { courseSlug: "precalculo", topicSlug: "operaciones-algebraicas" }),
      topicToModule("precalculo", "Factorización de polinomios en R", { courseSlug: "precalculo", topicSlug: "factorizacion-polinomios" }),
      topicToModule("precalculo", "Ecuaciones lineales y cuadráticas", { courseSlug: "precalculo", topicSlug: "ecuaciones-inecuaciones" }),
      topicToModule("precalculo", "Funciones y geometría analítica", { courseSlug: "precalculo", topicSlug: "intersecciones-ejes" }),
      topicToModule("precalculo", "Monotonía de una función", { courseSlug: "precalculo", topicSlug: "monotonia" }),
      topicToModule("precalculo", "Puntos máximos y mínimos", { courseSlug: "precalculo", topicSlug: "max-min-inflexion" }),
      topicToModule("precalculo", "Relaciones de asíntotas", { courseSlug: "precalculo", topicSlug: "asintotas" }, ["asintotas"]),
      topicToModule("precalculo", "Intervalos de concavidad y convexidad", { courseSlug: "precalculo", topicSlug: "concavidad-convexidad" }),
      topicToModule("precalculo", "Biyectividad", { courseSlug: "precalculo", topicSlug: "biyectividad" }),
      topicToModule("precalculo", "Intersecciones con los ejes", { courseSlug: "precalculo", topicSlug: "intersecciones-ejes" }),
      topicToModule("precalculo", "Signo de una función", { courseSlug: "precalculo", topicSlug: "signo-funcion" }),
      topicToModule("precalculo", "Dominio máximo de una función", { courseSlug: "precalculo", topicSlug: "dominio-maximo" }),
      topicToModule("precalculo", "Función inversa", { courseSlug: "precalculo", topicSlug: "funcion-inversa" }),
      topicToModule("precalculo", "Función compuesta", { courseSlug: "precalculo", topicSlug: "funcion-compuesta" }),
      topicToModule("precalculo", "Función polinomial", { courseSlug: "precalculo", topicSlug: "funcion-polinomial" }),
      topicToModule("precalculo", "Función racional", { courseSlug: "precalculo", topicSlug: "funcion-racional" }),
      topicToModule("precalculo", "Función radical", { courseSlug: "precalculo", topicSlug: "funcion-radical" }),
      topicToModule("precalculo", "Función valor absoluto", { courseSlug: "precalculo", topicSlug: "funcion-valor-absoluto" }),
      topicToModule("precalculo", "Función logarítmica", { courseSlug: "precalculo", topicSlug: "funcion-logaritmica" }, ["logaritmica"]),
      topicToModule("precalculo", "Función exponencial"),
      topicToModule("precalculo", "Funciones trigonométricas", { courseSlug: "precalculo", topicSlug: "funciones-trig-inversas" }, ["trigonometricas"]),
      topicToModule("precalculo", "Identidades trigonométricas", { courseSlug: "precalculo", topicSlug: "identidades-trig" }, ["trigonometricas"]),
      topicToModule("precalculo", "Ecuaciones trigonométricas", { courseSlug: "precalculo", topicSlug: "aplicaciones-razones" }, ["trigonometricas"]),
    ],
  },
  {
    id: "calculo-i",
    area: "Matemáticas",
    name: "Cálculo I",
    description: "Límites, continuidad y derivación inicial con foco en fundamentos sólidos.",
    accent: "#D9D1FB",
    courseSlug: "calculo-1",
    modules: [
      topicToModule("calculo-i", "Funciones y límites", { courseSlug: "calculo-1", topicSlug: "limites-continuidad" }, ["limites"]),
      topicToModule("calculo-i", "Límites laterales", { courseSlug: "calculo-1", topicSlug: "limites-continuidad" }, ["limites"]),
      topicToModule("calculo-i", "Límites infinitos y al infinito", { courseSlug: "calculo-1", topicSlug: "limites-infinito-comportamiento-asintotico" }, ["limites"]),
      topicToModule("calculo-i", "Continuidad", { courseSlug: "calculo-1", topicSlug: "limites-continuidad" }),
      topicToModule("calculo-i", "Derivada y recta tangente", { courseSlug: "calculo-1", topicSlug: "derivada-recta-tangente" }),
      topicToModule("calculo-i", "Reglas de derivación", { courseSlug: "calculo-1", topicSlug: "reglas-derivacion" }),
      topicToModule("calculo-i", "Derivación implícita", { courseSlug: "calculo-1", topicSlug: "tecnicas-avanzadas-derivacion" }),
      topicToModule("calculo-i", "Derivación logarítmica", { courseSlug: "calculo-1", topicSlug: "tecnicas-avanzadas-derivacion" }),
      topicToModule("calculo-i", "Tasas relacionadas", { courseSlug: "calculo-1", topicSlug: "optimizacion-razones-cambio" }),
      topicToModule("calculo-i", "Optimización", { courseSlug: "calculo-1", topicSlug: "optimizacion-razones-cambio" }),
      topicToModule("calculo-i", "Teoremas de Rolle y valor medio"),
      topicToModule("calculo-i", "Monotonía y concavidad", { courseSlug: "calculo-1", topicSlug: "analisis-funciones-derivadas" }),
      topicToModule("calculo-i", "Trazado de curvas", { courseSlug: "calculo-1", topicSlug: "analisis-funciones-derivadas" }),
      topicToModule("calculo-i", "Integrales indefinidas", { courseSlug: "calculo-1", topicSlug: "reglas-basicas-integracion" }, ["integrales"]),
      topicToModule("calculo-i", "Integrales definidas", { courseSlug: "calculo-1", topicSlug: "fundamentos-integracion" }, ["integrales"]),
      topicToModule("calculo-i", "Teorema fundamental del cálculo", { courseSlug: "calculo-1", topicSlug: "fundamentos-integracion" }),
      topicToModule("calculo-i", "Técnicas básicas de integración", { courseSlug: "calculo-1", topicSlug: "tecnicas-integracion" }, ["integracion"]),
      topicToModule("calculo-i", "Aplicaciones de la integral", { courseSlug: "calculo-1", topicSlug: "aplicaciones-integracion" }, ["integrales"]),
    ],
  },
  {
    id: "calculo-ii",
    area: "Matemáticas",
    name: "Cálculo II",
    description: "Integración avanzada, técnicas y aplicaciones en problemas universitarios.",
    accent: "#B8A8F3",
    courseSlug: "calculo-ii",
    modules: [
      topicToModule("calculo-ii", "Polinomios de Taylor y Maclaurin", undefined, ["taylor", "maclaurin"]),
      topicToModule("calculo-ii", "Desarrollos limitados"),
      topicToModule("calculo-ii", "Cálculo de límites con desarrollos limitados", undefined, ["limites"]),
      topicToModule("calculo-ii", "Integrales impropias", undefined, ["integrales"]),
      topicToModule("calculo-ii", "Criterios de convergencia para integrales impropias", undefined, ["integrales impropias", "convergencia"]),
      topicToModule("calculo-ii", "Secciones cónicas"),
      topicToModule("calculo-ii", "Coordenadas polares"),
      topicToModule("calculo-ii", "Curvas polares"),
      topicToModule("calculo-ii", "Números complejos"),
      topicToModule("calculo-ii", "Forma polar y fórmula de De Moivre", undefined, ["moivre"]),
      topicToModule("calculo-ii", "Fórmula de Euler", undefined, ["euler"]),
      topicToModule("calculo-ii", "Raíces n-ésimas", undefined, ["raices n esimas"]),
      topicToModule("calculo-ii", "Inducción matemática", undefined, ["induccion"]),
      topicToModule("calculo-ii", "Sucesiones numéricas", undefined, ["sucesiones"]),
      topicToModule("calculo-ii", "Series numéricas", undefined, ["series"]),
      topicToModule("calculo-ii", "Series alternadas", undefined, ["series"]),
      topicToModule("calculo-ii", "Convergencia absoluta y condicional", undefined, ["series", "convergencia"]),
      topicToModule("calculo-ii", "Criterios de convergencia de series", undefined, ["series", "convergencia"]),
      topicToModule("calculo-ii", "Series de potencias", undefined, ["series"]),
      topicToModule("calculo-ii", "Radio y dominio de convergencia", undefined, ["series", "convergencia"]),
      topicToModule("calculo-ii", "Series de Taylor", undefined, ["taylor", "series"]),
    ],
  },
  {
    id: "calculo-iii",
    area: "Matemáticas",
    name: "Cálculo III",
    description: "Funciones multivariables, derivadas parciales e integrales múltiples.",
    accent: "#8E79E5",
    courseSlug: "calculo-iii",
    modules: [
      topicToModule("calculo-iii", "Rectas y planos en el espacio"),
      topicToModule("calculo-iii", "Secciones cónicas y superficies cuadráticas"),
      topicToModule("calculo-iii", "Cilindros y conos"),
      topicToModule("calculo-iii", "Funciones vectoriales"),
      topicToModule("calculo-iii", "Curvas parametrizadas"),
      topicToModule("calculo-iii", "Límites y continuidad en varias variables", undefined, ["limites"]),
      topicToModule("calculo-iii", "Derivadas parciales"),
      topicToModule("calculo-iii", "Regla de la cadena en varias variables"),
      topicToModule("calculo-iii", "Derivación implícita en varias variables"),
      topicToModule("calculo-iii", "Gradiente y derivada direccional"),
      topicToModule("calculo-iii", "Plano tangente"),
      topicToModule("calculo-iii", "Extremos de funciones de varias variables"),
      topicToModule("calculo-iii", "Multiplicadores de Lagrange"),
      topicToModule("calculo-iii", "Integrales dobles", undefined, ["integrales"]),
      topicToModule("calculo-iii", "Cambio de orden de integración"),
      topicToModule("calculo-iii", "Cambio de variables en integrales dobles"),
      topicToModule("calculo-iii", "Coordenadas polares en integrales dobles"),
      topicToModule("calculo-iii", "Integrales triples", undefined, ["integrales"]),
      topicToModule("calculo-iii", "Coordenadas cilíndricas y esféricas"),
      topicToModule("calculo-iii", "Campos vectoriales"),
      topicToModule("calculo-iii", "Integrales de línea", undefined, ["integrales"]),
      topicToModule("calculo-iii", "Campos conservativos"),
      topicToModule("calculo-iii", "Teorema de Green", undefined, ["green"]),
      topicToModule("calculo-iii", "Integrales de superficie", undefined, ["integrales"]),
      topicToModule("calculo-iii", "Teorema de Stokes", undefined, ["stokes"]),
      topicToModule("calculo-iii", "Teorema de la divergencia de Gauss", undefined, ["gauss", "divergencia"]),
    ],
  },
  {
    id: "algebra-lineal",
    area: "Matemáticas",
    name: "Álgebra lineal",
    description: "Matrices, sistemas lineales y espacios vectoriales aplicados.",
    accent: "#6D5BD0",
    courseSlug: "algebra-lineal",
    modules: [
      topicToModule("algebra-lineal", "Matrices", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Tipos de matrices", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Álgebra de matrices", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Sistemas de ecuaciones lineales"),
      topicToModule("algebra-lineal", "Matriz aumentada", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Operaciones elementales por filas"),
      topicToModule("algebra-lineal", "Forma escalonada y escalonada reducida"),
      topicToModule("algebra-lineal", "Método de Gauss-Jordan", undefined, ["gauss", "jordan"]),
      topicToModule("algebra-lineal", "Rango de una matriz", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Matrices invertibles", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Matrices elementales", undefined, ["matrices"]),
      topicToModule("algebra-lineal", "Determinantes"),
      topicToModule("algebra-lineal", "Cofactores y adjunta"),
      topicToModule("algebra-lineal", "Regla de Cramer"),
      topicToModule("algebra-lineal", "Geometría vectorial"),
      topicToModule("algebra-lineal", "Producto escalar"),
      topicToModule("algebra-lineal", "Norma y ángulo entre vectores"),
      topicToModule("algebra-lineal", "Producto cruz"),
      topicToModule("algebra-lineal", "Proyecciones ortogonales"),
      topicToModule("algebra-lineal", "Rectas y planos"),
      topicToModule("algebra-lineal", "Espacios vectoriales"),
      topicToModule("algebra-lineal", "Subespacios vectoriales"),
      topicToModule("algebra-lineal", "Combinación lineal"),
      topicToModule("algebra-lineal", "Conjunto generador"),
      topicToModule("algebra-lineal", "Bases y dimensión"),
      topicToModule("algebra-lineal", "Coordenadas respecto a una base"),
      topicToModule("algebra-lineal", "Espacio fila y espacio columna"),
      topicToModule("algebra-lineal", "Ortogonalidad y proyecciones"),
      topicToModule("algebra-lineal", "Gram-Schmidt", undefined, ["gram schmidt"]),
      topicToModule("algebra-lineal", "Transformaciones lineales"),
      topicToModule("algebra-lineal", "Núcleo e imagen"),
      topicToModule("algebra-lineal", "Matriz asociada a una transformación lineal"),
      topicToModule("algebra-lineal", "Cambio de base"),
      topicToModule("algebra-lineal", "Valores y vectores propios", undefined, ["valores propios", "autovalores"]),
      topicToModule("algebra-lineal", "Diagonalización"),
      topicToModule("algebra-lineal", "Formas cuadráticas"),
      topicToModule("algebra-lineal", "Curvas y superficies cuadráticas"),
    ],
  },
  {
    id: "ecuaciones-diferenciales",
    area: "Matemáticas",
    name: "Ecuaciones diferenciales",
    description: "Modelos diferenciales de primer y segundo orden con interpretación.",
    accent: "#4B36B5",
    courseSlug: "ecuaciones-diferenciales",
    modules: [
      topicToModule("ecuaciones-diferenciales", "Introducción a ecuaciones diferenciales"),
      topicToModule("ecuaciones-diferenciales", "Clasificación por tipo, orden y linealidad"),
      topicToModule("ecuaciones-diferenciales", "Solución de una ecuación diferencial"),
      topicToModule("ecuaciones-diferenciales", "Problemas de valor inicial"),
      topicToModule("ecuaciones-diferenciales", "Existencia y unicidad"),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones separables"),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones lineales de primer orden"),
      topicToModule("ecuaciones-diferenciales", "Sustituciones y ecuaciones homogéneas"),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones de Bernoulli y Riccati"),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones exactas"),
      topicToModule("ecuaciones-diferenciales", "Factores integrantes"),
      topicToModule("ecuaciones-diferenciales", "Aplicaciones de primer orden"),
      topicToModule("ecuaciones-diferenciales", "Crecimiento y decrecimiento"),
      topicToModule("ecuaciones-diferenciales", "Ley de enfriamiento de Newton", undefined, ["newton"]),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones lineales de orden superior"),
      topicToModule("ecuaciones-diferenciales", "Principio de superposición"),
      topicToModule("ecuaciones-diferenciales", "Wronskiano"),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones con coeficientes constantes"),
      topicToModule("ecuaciones-diferenciales", "Coeficientes indeterminados"),
      topicToModule("ecuaciones-diferenciales", "Reducción de orden"),
      topicToModule("ecuaciones-diferenciales", "Ecuación de Euler", undefined, ["euler"]),
      topicToModule("ecuaciones-diferenciales", "Soluciones por series de potencias", undefined, ["series"]),
      topicToModule("ecuaciones-diferenciales", "Método de Frobenius", undefined, ["frobenius"]),
      topicToModule("ecuaciones-diferenciales", "Aplicaciones de segundo orden"),
      topicToModule("ecuaciones-diferenciales", "Sistemas lineales de ecuaciones diferenciales"),
      topicToModule("ecuaciones-diferenciales", "Sistemas homogéneos con valores y vectores propios", undefined, ["valores propios"]),
      topicToModule("ecuaciones-diferenciales", "Sistemas no homogéneos"),
      topicToModule("ecuaciones-diferenciales", "Variación de parámetros"),
      topicToModule("ecuaciones-diferenciales", "Transformada de Laplace", undefined, ["laplace"]),
      topicToModule("ecuaciones-diferenciales", "Transformada inversa de Laplace", undefined, ["laplace"]),
      topicToModule("ecuaciones-diferenciales", "Teoremas de traslación"),
      topicToModule("ecuaciones-diferenciales", "Función escalón unitario"),
      topicToModule("ecuaciones-diferenciales", "Delta de Dirac", undefined, ["dirac"]),
      topicToModule("ecuaciones-diferenciales", "Convolución"),
      topicToModule("ecuaciones-diferenciales", "Función Gamma", undefined, ["gamma"]),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones integro-diferenciales"),
      topicToModule("ecuaciones-diferenciales", "Series de Fourier", undefined, ["series", "fourier"]),
      topicToModule("ecuaciones-diferenciales", "Ecuaciones en derivadas parciales"),
      topicToModule("ecuaciones-diferenciales", "Separación de variables"),
    ],
  },
  {
    id: "fisica-i",
    area: "Física",
    name: "Física I",
    description: "Cinemática, dinámica y leyes de Newton en contexto universitario.",
    accent: "#F5C4B3",
    courseSlug: "fisica-i",
    modules: [
      {
        id: "fisica-i-medicion-vectores",
        title: "Módulo 1 · Medición, unidades y vectores",
        topic: "Medición, unidades y vectores",
        subtopics: [
          "Magnitudes físicas",
          "Notación científica",
          "Unidades y conversiones",
          "Vectores",
          "Componentes vectoriales",
          "Suma y resta de vectores",
        ],
      },
      {
        id: "fisica-i-movimiento",
        title: "Módulo 2 · Movimiento en una y dos dimensiones",
        topic: "Movimiento en una y dos dimensiones",
        subtopics: [
          "Posición, desplazamiento, velocidad y aceleración",
          "Movimiento rectilíneo",
          "Movimiento con aceleración constante",
          "Caída libre",
          "Movimiento en dos dimensiones",
          "Movimiento parabólico",
          "Movimiento circular",
        ],
      },
      {
        id: "fisica-i-newton",
        title: "Módulo 3 · Leyes de Newton y aplicaciones",
        topic: "Leyes de Newton y aplicaciones",
        subtopics: [
          "Fuerza y masa",
          "Primera ley de Newton",
          "Segunda ley de Newton",
          "Tercera ley de Newton",
          "Diagramas de cuerpo libre",
          "Fricción",
          "Fuerzas de tensión y normal",
          "Aplicaciones de las leyes de Newton",
        ],
        keywords: ["newton"],
      },
      {
        id: "fisica-i-energia",
        title: "Módulo 4 · Trabajo, energía y conservación de la energía",
        topic: "Trabajo, energía y conservación de la energía",
        subtopics: [
          "Trabajo de una fuerza",
          "Energía cinética",
          "Energía potencial",
          "Teorema trabajo-energía",
          "Fuerzas conservativas y no conservativas",
          "Conservación de la energía mecánica",
          "Potencia",
        ],
      },
      {
        id: "fisica-i-colisiones",
        title: "Módulo 5 · Cantidad de movimiento y colisiones",
        topic: "Cantidad de movimiento y colisiones",
        subtopics: [
          "Momento lineal",
          "Impulso",
          "Conservación del momento lineal",
          "Centro de masa",
          "Colisiones elásticas",
          "Colisiones inelásticas",
        ],
      },
      {
        id: "fisica-i-rotacion",
        title: "Módulo 6 · Rotación y equilibrio",
        topic: "Rotación y equilibrio",
        subtopics: [
          "Cinemática rotacional",
          "Energía rotacional",
          "Momento de inercia",
          "Torque",
          "Momento angular",
          "Conservación del momento angular",
          "Equilibrio estático",
          "Condiciones de equilibrio",
        ],
      },
      {
        id: "fisica-i-fluidos",
        title: "Módulo 7 · Mecánica de fluidos",
        topic: "Mecánica de fluidos",
        subtopics: [
          "Densidad y presión",
          "Presión en fluidos",
          "Principio de Pascal",
          "Principio de Arquímedes",
          "Flotación",
          "Ecuación de continuidad",
          "Ecuación de Bernoulli",
        ],
        keywords: ["bernoulli"],
      },
    ],
  },
  {
    id: "fisica-ii",
    area: "Física",
    name: "Física II",
    description: "Trabajo, energía, impulso y conservación para resolver problemas complejos.",
    accent: "#D85A30",
    courseSlug: "fisica-ii",
    modules: [
      {
        id: "fisica-ii-ondas",
        title: "Módulo 1 · Fluidos, oscilaciones y ondas mecánicas",
        topic: "Fluidos, oscilaciones y ondas mecánicas",
        subtopics: [
          "Dinámica de fluidos",
          "Movimiento oscilatorio",
          "Movimiento armónico simple",
          "Movimiento ondulatorio",
          "Ondas mecánicas",
          "Superposición de ondas",
        ],
        keywords: ["ondas"],
      },
      {
        id: "fisica-ii-sonido-temperatura",
        title: "Módulo 2 · Sonido y temperatura",
        topic: "Sonido y temperatura",
        subtopics: [
          "Ondas sonoras",
          "Intensidad y nivel de sonido",
          "Efecto Doppler",
          "Temperatura",
          "Escalas de temperatura",
          "Dilatación térmica",
        ],
      },
      {
        id: "fisica-ii-termo",
        title: "Módulo 3 · Calor y termodinámica",
        topic: "Calor y termodinámica",
        subtopics: [
          "Calor y transferencia de calor",
          "Capacidad calorífica",
          "Calor específico",
          "Primera ley de la termodinámica",
          "Teoría cinética de los gases",
          "Segunda ley de la termodinámica",
          "Máquinas térmicas",
          "Entropía",
        ],
      },
      {
        id: "fisica-ii-carga-campo",
        title: "Módulo 4 · Carga eléctrica, fuerza eléctrica y campo eléctrico",
        topic: "Carga eléctrica, fuerza eléctrica y campo eléctrico",
        subtopics: [
          "Carga eléctrica",
          "Conductores y aislantes",
          "Ley de Coulomb",
          "Campo eléctrico",
          "Líneas de campo eléctrico",
          "Campo eléctrico de distribuciones continuas",
        ],
      },
      {
        id: "fisica-ii-gauss-potencial",
        title: "Módulo 5 · Ley de Gauss y potencial eléctrico",
        topic: "Ley de Gauss y potencial eléctrico",
        subtopics: [
          "Flujo eléctrico",
          "Ley de Gauss",
          "Aplicaciones de la ley de Gauss",
          "Energía potencial eléctrica",
          "Potencial eléctrico",
          "Diferencia de potencial",
          "Superficies equipotenciales",
        ],
        keywords: ["gauss"],
      },
      {
        id: "fisica-ii-capacitancia",
        title: "Módulo 6 · Capacitancia y dieléctricos",
        topic: "Capacitancia y dieléctricos",
        subtopics: [
          "Capacitores",
          "Capacitancia",
          "Capacitores en serie y paralelo",
          "Energía almacenada en un capacitor",
          "Dieléctricos",
        ],
      },
      {
        id: "fisica-ii-circuitos-dc",
        title: "Módulo 7 · Corriente, resistencia y circuitos de corriente directa",
        topic: "Corriente, resistencia y circuitos de corriente directa",
        subtopics: [
          "Corriente eléctrica",
          "Densidad de corriente",
          "Resistencia y resistividad",
          "Ley de Ohm",
          "Potencia eléctrica",
          "Fuerza electromotriz",
          "Circuitos DC",
          "Leyes de Kirchhoff",
          "Circuitos RC",
        ],
        keywords: ["kirchhoff"],
      },
    ],
  },
  {
    id: "fisica-iii",
    area: "Física",
    name: "Física III",
    description: "Ondas, electricidad y magnetismo con entrenamiento aplicado.",
    accent: "#993C1D",
    courseSlug: "fisica-iii",
    modules: [
      {
        id: "fisica-iii-campos",
        title: "Módulo 1 · Campos magnéticos y fuerza magnética",
        topic: "Campos magnéticos y fuerza magnética",
        subtopics: [
          "Campo magnético",
          "Fuerza magnética sobre cargas en movimiento",
          "Movimiento de partículas cargadas en campos magnéticos",
          "Fuerza magnética sobre conductores con corriente",
          "Torque sobre espiras",
        ],
      },
      {
        id: "fisica-iii-fuentes",
        title: "Módulo 2 · Fuentes del campo magnético",
        topic: "Fuentes del campo magnético",
        subtopics: [
          "Ley de Biot-Savart",
          "Campo magnético producido por corrientes",
          "Ley de Ampère",
          "Solenoides",
          "Materiales magnéticos",
        ],
      },
      {
        id: "fisica-iii-induccion",
        title: "Módulo 3 · Inducción electromagnética e inductancia",
        topic: "Inducción electromagnética e inductancia",
        subtopics: [
          "Flujo magnético",
          "Ley de Faraday",
          "Ley de Lenz",
          "Fem inducida",
          "Inductancia",
          "Autoinductancia",
          "Energía en inductores",
        ],
        keywords: ["faraday"],
      },
      {
        id: "fisica-iii-ac",
        title: "Módulo 4 · Circuitos de corriente alterna",
        topic: "Circuitos de corriente alterna",
        subtopics: [
          "Corriente alterna",
          "Fasores",
          "Circuitos resistivos, capacitivos e inductivos",
          "Circuitos RLC",
          "Resonancia",
          "Potencia en circuitos AC",
        ],
      },
      {
        id: "fisica-iii-em",
        title: "Módulo 5 · Ondas electromagnéticas",
        topic: "Ondas electromagnéticas",
        subtopics: [
          "Campos eléctricos y magnéticos variables",
          "Ondas electromagnéticas",
          "Energía transportada por ondas electromagnéticas",
          "Espectro electromagnético",
        ],
        keywords: ["ondas"],
      },
      {
        id: "fisica-iii-optica-geo",
        title: "Módulo 6 · Óptica geométrica",
        topic: "Óptica geométrica",
        subtopics: [
          "Naturaleza de la luz",
          "Reflexión",
          "Refracción",
          "Índice de refracción",
          "Espejos",
          "Lentes",
          "Formación de imágenes",
          "Instrumentos ópticos básicos",
        ],
        keywords: ["lentes"],
      },
      {
        id: "fisica-iii-optica-ond",
        title: "Módulo 7 · Óptica ondulatoria",
        topic: "Óptica ondulatoria",
        subtopics: [
          "Interferencia",
          "Difracción",
          "Polarización",
          "Patrones de interferencia",
          "Patrones de difracción",
        ],
        keywords: ["difraccion"],
      },
      {
        id: "fisica-iii-moderna",
        title: "Módulo 8 · Física moderna",
        topic: "Física moderna",
        subtopics: [
          "Relatividad especial básica",
          "Cuantización",
          "Fotones",
          "Efecto fotoeléctrico",
          "Dualidad onda-partícula",
          "Introducción a física cuántica",
        ],
        keywords: ["fotoelectrico"],
      },
    ],
  },
  {
    id: "quimica-general-i",
    area: "Química",
    name: "Química general I",
    description: "Base de estructura atómica, enlace químico y lenguaje químico.",
    accent: "#9FE1CB",
    courseSlug: "quimica-general-i",
    modules: [
      {
        id: "quimica-general-i-materia-medicion",
        title: "Módulo 1 · Materia, medición y lenguaje químico",
        topic: "Materia, medición y lenguaje químico",
        subtopics: [
          "La química como estudio de la materia",
          "Clasificación de la materia",
          "Propiedades físicas y químicas",
          "Medición y unidades",
          "Cifras significativas",
          "Notación científica",
        ],
      },
      {
        id: "quimica-general-i-atomos-moleculas",
        title: "Módulo 2 · Átomos, moléculas, iones y nomenclatura",
        topic: "Átomos, moléculas, iones y nomenclatura",
        subtopics: [
          "Estructura básica del átomo",
          "Elementos",
          "Moléculas",
          "Iones",
          "Compuestos químicos",
          "Fórmulas químicas",
          "Nomenclatura inorgánica básica",
        ],
        keywords: ["nomenclatura"],
      },
      {
        id: "quimica-general-i-periodicidad",
        title: "Módulo 3 · Estructura electrónica y periodicidad",
        topic: "Estructura electrónica y periodicidad",
        subtopics: [
          "El átomo cuántico",
          "Configuración electrónica",
          "Tabla periódica",
          "Carga nuclear efectiva",
          "Radio atómico",
          "Energía de ionización",
          "Afinidad electrónica",
          "Electronegatividad",
          "Carácter metálico",
        ],
      },
      {
        id: "quimica-general-i-disolucion",
        title: "Módulo 4 · Reacciones químicas en disolución acuosa",
        topic: "Reacciones químicas en disolución acuosa",
        subtopics: [
          "Disoluciones",
          "Concentración",
          "Tipos de reacciones químicas",
          "Reacciones de precipitación",
          "Reacciones ácido-base",
          "Reacciones redox introductorias",
          "Ecuaciones iónicas",
        ],
      },
      {
        id: "quimica-general-i-estequiometria",
        title: "Módulo 5 · Estequiometría",
        topic: "Estequiometría",
        subtopics: [
          "Mol y cantidad de sustancia",
          "Masa molar",
          "Ecuaciones químicas balanceadas",
          "Cálculos estequiométricos",
          "Reactivo limitante",
          "Rendimiento teórico y porcentual",
        ],
        keywords: ["estequiometria"],
      },
      {
        id: "quimica-general-i-termoquimica",
        title: "Módulo 6 · Termoquímica",
        topic: "Termoquímica",
        subtopics: [
          "Energía y calor",
          "Sistemas y alrededores",
          "Entalpía",
          "Cambios de entalpía",
          "Calorimetría",
          "Energía en reacciones químicas",
        ],
        keywords: ["termoquimica"],
      },
      {
        id: "quimica-general-i-enlace-geometria",
        title: "Módulo 7 · Enlace químico y geometría molecular",
        topic: "Enlace químico y geometría molecular",
        subtopics: [
          "Enlace iónico",
          "Enlace covalente",
          "Estructuras de Lewis",
          "Carga formal",
          "Resonancia",
          "Geometría molecular",
          "Teoría RPECV",
          "Polaridad molecular",
          "Introducción a teoría de enlace de valencia",
        ],
      },
      {
        id: "quimica-general-i-ambiental",
        title: "Módulo 8 · Introducción a química ambiental",
        topic: "Introducción a química ambiental",
        subtopics: [
          "Contaminación atmosférica",
          "Química y ambiente",
          "Aplicaciones químicas en procesos biológicos e industriales",
        ],
      },
    ],
  },
  {
    id: "quimica-general-ii",
    area: "Química",
    name: "Química general II",
    description: "Equilibrio, cinética y termodinámica para comprensión integral.",
    accent: "#1D9E75",
    courseSlug: "quimica-general-ii",
    modules: [
      {
        id: "quimica-general-ii-gases",
        title: "Módulo 1 · Gases",
        topic: "Gases",
        subtopics: [
          "Leyes de los gases",
          "Gas ideal",
          "Mezclas de gases",
          "Presiones parciales",
          "Teoría cinética molecular",
        ],
        keywords: ["gases"],
      },
      {
        id: "quimica-general-ii-intermoleculares",
        title: "Módulo 2 · Fuerzas intermoleculares, líquidos y sólidos",
        topic: "Fuerzas intermoleculares, líquidos y sólidos",
        subtopics: [
          "Fuerzas intermoleculares",
          "Puentes de hidrógeno",
          "Propiedades de líquidos",
          "Sólidos",
          "Cambios de fase",
          "Diagramas de fase",
        ],
      },
      {
        id: "quimica-general-ii-disoluciones",
        title: "Módulo 3 · Disoluciones y propiedades coligativas",
        topic: "Disoluciones y propiedades coligativas",
        subtopics: [
          "Tipos de disoluciones",
          "Concentración",
          "Solubilidad",
          "Coloides",
          "Propiedades coligativas",
          "Presión de vapor",
          "Ósmosis",
        ],
      },
      {
        id: "quimica-general-ii-cinetica",
        title: "Módulo 4 · Cinética química",
        topic: "Cinética química",
        subtopics: [
          "Velocidad de reacción",
          "Ley de velocidad",
          "Orden de reacción",
          "Energía de activación",
          "Mecanismos de reacción",
          "Catalizadores",
        ],
      },
      {
        id: "quimica-general-ii-equilibrio",
        title: "Módulo 5 · Equilibrio químico",
        topic: "Equilibrio químico",
        subtopics: [
          "Concepto de equilibrio",
          "Constante de equilibrio",
          "Cociente de reacción",
          "Principio de Le Châtelier",
          "Cálculos de equilibrio",
        ],
        keywords: ["equilibrio"],
      },
      {
        id: "quimica-general-ii-acido-base",
        title: "Módulo 6 · Equilibrio ácido-base",
        topic: "Equilibrio ácido-base",
        subtopics: [
          "Ácidos y bases",
          "pH y pOH",
          "Ácidos y bases fuertes",
          "Ácidos y bases débiles",
          "Hidrólisis",
          "Titulaciones ácido-base",
        ],
      },
      {
        id: "quimica-general-ii-amortiguadores",
        title: "Módulo 7 · Amortiguadores y solubilidad",
        topic: "Amortiguadores y solubilidad",
        subtopics: [
          "Soluciones amortiguadoras",
          "Ecuación de Henderson-Hasselbalch",
          "Equilibrios de solubilidad",
          "Kps",
          "Efecto del ion común",
          "Precipitación selectiva",
        ],
      },
      {
        id: "quimica-general-ii-termo",
        title: "Módulo 8 · Termodinámica química",
        topic: "Termodinámica química",
        subtopics: [
          "Entropía",
          "Energía libre de Gibbs",
          "Espontaneidad",
          "Relación entre energía libre y equilibrio",
          "Temperatura y espontaneidad",
        ],
      },
      {
        id: "quimica-general-ii-electroquimica",
        title: "Módulo 9 · Electroquímica",
        topic: "Electroquímica",
        subtopics: [
          "Reacciones redox",
          "Celdas galvánicas",
          "Potenciales estándar",
          "Ecuación de Nernst",
          "Electrólisis",
          "Baterías",
        ],
        keywords: ["electroquimica"],
      },
      {
        id: "quimica-general-ii-ambiental",
        title: "Módulo 10 · Química ambiental",
        topic: "Química ambiental",
        subtopics: [
          "Química atmosférica",
          "Contaminantes",
          "Procesos químicos ambientales",
          "Aplicaciones químicas al ambiente",
        ],
      },
    ],
  },
  {
    id: "quimica-intensiva",
    area: "Química",
    name: "Química General Intensiva",
    description: "Entrenamiento de alto ritmo en problemas clave de química universitaria.",
    accent: "#0F6E56",
    courseSlug: "quimica-intensiva",
    modules: [
      {
        id: "quimica-intensiva-fundamentos",
        title: "Módulo 1 · Fundamentos, medición y lenguaje químico",
        topic: "Fundamentos, medición y lenguaje químico",
        subtopics: [
          "Estudio del cambio",
          "Materia y medición",
          "Cifras significativas",
          "Unidades",
          "Fórmulas químicas",
          "Nomenclatura",
        ],
        keywords: ["nomenclatura"],
      },
      {
        id: "quimica-intensiva-atomos",
        title: "Módulo 2 · Átomos, moléculas e iones",
        topic: "Átomos, moléculas e iones",
        subtopics: [
          "Estructura atómica",
          "Elementos",
          "Moléculas",
          "Iones",
          "Compuestos",
          "Fórmulas y nombres químicos",
        ],
      },
      {
        id: "quimica-intensiva-estequiometria",
        title: "Módulo 3 · Estequiometría y reacciones químicas",
        topic: "Estequiometría y reacciones químicas",
        subtopics: [
          "Mol",
          "Masa molar",
          "Ecuaciones químicas",
          "Balanceo",
          "Reactivo limitante",
          "Rendimiento",
          "Reacciones químicas",
          "Reacciones en disolución acuosa",
        ],
        keywords: ["estequiometria"],
      },
      {
        id: "quimica-intensiva-electronica",
        title: "Módulo 4 · Estructura electrónica y periodicidad",
        topic: "Estructura electrónica y periodicidad",
        subtopics: [
          "Estructura electrónica",
          "Configuración electrónica",
          "Propiedades periódicas",
          "Radio atómico",
          "Energía de ionización",
          "Afinidad electrónica",
          "Electronegatividad",
        ],
      },
      {
        id: "quimica-intensiva-enlace",
        title: "Módulo 5 · Enlace químico y geometría molecular",
        topic: "Enlace químico y geometría molecular",
        subtopics: [
          "Enlaces químicos",
          "Estructuras de Lewis",
          "Enlace iónico",
          "Enlace covalente",
          "Geometría molecular",
          "Polaridad",
          "Teoría de enlace",
        ],
      },
      {
        id: "quimica-intensiva-gases",
        title: "Módulo 6 · Gases y fuerzas intermoleculares",
        topic: "Gases y fuerzas intermoleculares",
        subtopics: [
          "Leyes de los gases",
          "Gas ideal",
          "Teoría cinética",
          "Fuerzas intermoleculares",
          "Líquidos",
          "Propiedades físicas de la materia",
        ],
        keywords: ["gases"],
      },
      {
        id: "quimica-intensiva-disoluciones",
        title: "Módulo 7 · Disoluciones y propiedades físicas",
        topic: "Disoluciones y propiedades físicas",
        subtopics: [
          "Propiedades de las disoluciones",
          "Concentración",
          "Solubilidad",
          "Propiedades coligativas",
        ],
      },
      {
        id: "quimica-intensiva-equilibrio",
        title: "Módulo 8 · Equilibrio químico, ácido-base y solubilidad",
        topic: "Equilibrio químico, ácido-base y solubilidad",
        subtopics: [
          "Equilibrio químico",
          "Constantes de equilibrio",
          "Principio de Le Châtelier",
          "Equilibrio ácido-base",
          "pH",
          "Amortiguadores",
          "Solubilidad",
          "Kps",
        ],
        keywords: ["equilibrio"],
      },
      {
        id: "quimica-intensiva-termo",
        title: "Módulo 9 · Termodinámica y termoquímica",
        topic: "Termodinámica y termoquímica",
        subtopics: [
          "Termoquímica",
          "Entalpía",
          "Entropía",
          "Energía libre de Gibbs",
          "Espontaneidad",
        ],
        keywords: ["termoquimica"],
      },
      {
        id: "quimica-intensiva-electro",
        title: "Módulo 10 · Electroquímica y química nuclear",
        topic: "Electroquímica y química nuclear",
        subtopics: [
          "Reacciones redox",
          "Celdas electroquímicas",
          "Potenciales",
          "Electrólisis",
          "Química nuclear",
          "Procesos nucleares",
          "Aplicaciones ambientales",
        ],
        keywords: ["electroquimica", "quimica nuclear"],
      },
    ],
  },
];

const allModules = homeCourses.flatMap((course) =>
  course.modules.map((module) => ({ ...module, courseId: course.id, courseName: course.name })),
);

function getCourseProgress(course: HomeCourse, store: ProgressStore) {
  const completed = course.modules.filter((module) => store.completedModuleIds.includes(module.id)).length;
  return Math.round((completed / course.modules.length) * 100);
}

function getCourseStatus(course: HomeCourse, store: ProgressStore, progress: number): ModuleState {
  if (progress === 0) return "no-iniciado";
  if (progress === 100) return "completado";
  const hasInProgress = course.modules.some((module) => store.inProgressModuleIds.includes(module.id));
  if (hasInProgress) return "en-progreso";
  return "en-progreso";
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((ch) => ch + ch).join("") : clean;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isDark(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function Dashboard() {
  const [query, setQuery] = useState("");
  const [store, setStore] = useState<ProgressStore>({
    completedModuleIds: [],
    inProgressModuleIds: [],
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as ProgressStore;
      setStore({
        completedModuleIds: parsed.completedModuleIds ?? [],
        inProgressModuleIds: parsed.inProgressModuleIds ?? [],
      });
    } catch {
      setStore({ completedModuleIds: [], inProgressModuleIds: [] });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  const courseStats = useMemo(
    () =>
      homeCourses.map((course) => {
        const progress = getCourseProgress(course, store);
        return {
          course,
          progress,
          status: getCourseStatus(course, store, progress),
          completedModules: course.modules.filter((module) =>
            store.completedModuleIds.includes(module.id),
          ).length,
        };
      }),
    [store],
  );

  const filteredCourses = useMemo(() => {
    const normalized = normalizeText(query);
    if (!normalized) return courseStats;

    return courseStats
      .map((entry) => {
        const { course } = entry;
        const matchedModules = course.modules.filter((module) => {
          const inTopic = normalizeText(module.topic).includes(normalized);
          const inTitle = normalizeText(module.title).includes(normalized);
          const inSubtopics = (module.subtopics ?? []).some((subtopic) =>
            normalizeText(subtopic).includes(normalized),
          );
          const inKeywords = (module.keywords ?? []).some((keyword) =>
            normalizeText(keyword).includes(normalized),
          );
          return inTopic || inTitle || inSubtopics || inKeywords;
        });
        return {
          ...entry,
          matchedModules,
        };
      })
      .filter(({ course, matchedModules }) => {
      const inCourse = normalizeText(course.name).includes(normalized);
      const inArea = normalizeText(course.area).includes(normalized);
      const inDescription = normalizeText(course.description).includes(normalized);
      return inCourse || inArea || inDescription || matchedModules.length > 0;
    });
  }, [courseStats, query]);

  const groupedCourses = useMemo(() => {
    const areaOrder = ["Matemáticas", "Física", "Química"] as const;
    return areaOrder
      .map((area) => ({
        area,
        items: filteredCourses.filter(({ course }) => course.area === area),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredCourses]);

  const markModuleCompleted = (moduleId: string) => {
    setStore((prev) => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModuleIds: [...prev.completedModuleIds, moduleId],
        inProgressModuleIds: prev.inProgressModuleIds.filter((id) => id !== moduleId),
      };
    });
  };

  const startModule = (moduleId: string) => {
    setStore((prev) => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      if (prev.inProgressModuleIds.includes(moduleId)) {
        return {
          ...prev,
        };
      }
      return {
        ...prev,
        inProgressModuleIds: [...prev.inProgressModuleIds, moduleId],
      };
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#fcfbf7] text-slate-950">
      <div aria-hidden="true" className="kepler-home-aura" />

      <header className="sticky top-0 z-40 border-b border-slate-950/10 bg-[#fcfbf7]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo to="/dashboard" brandName="Kepler" showText />
          <div className="hidden min-w-[260px] flex-1 items-center md:flex md:max-w-xl">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 border-slate-950/12 bg-white pl-9"
                placeholder="Buscar tema, curso o ejercicio..."
                aria-label="Buscar tema, curso o ejercicio"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/account" className="rounded-full border border-slate-950/12 bg-white px-3 py-1.5 text-slate-700">
              <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Cuenta</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto px-4 pb-4 sm:px-6 md:hidden">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 border-slate-950/12 bg-white pl-9"
              placeholder="Buscar tema, curso o ejercicio..."
              aria-label="Buscar tema, curso o ejercicio"
            />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-7">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">¿Qué querés dominar hoy?</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-700">
            Retomá tu progreso y avanzá en tus cursos STEM antes del examen.
          </p>
        </section>

        <section>

          <div className="space-y-6">
            {groupedCourses.length === 0 && (
              <div className="rounded-2xl border border-slate-950/10 bg-white p-6 text-sm text-slate-700">
                No encontramos cursos o temas que coincidan con tu búsqueda.
              </div>
            )}
            {groupedCourses.map((group) => (
              <div key={group.area}>
                <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {group.area}
                </h3>
                <div className="grid gap-4 lg:grid-cols-3">
                  {group.items.map(({ course, progress, status }) => {
                    const statusText =
                      status === "completado"
                        ? "Completado"
                        : status === "en-progreso"
                          ? "En progreso"
                          : "";
                    const accentDark = isDark(course.accent);
                    const accentText = accentDark ? "#F8FAFC" : "#0F172A";

                    const firstIncomplete = course.modules.find(
                      (module) => !store.completedModuleIds.includes(module.id),
                    );
                    const canOpenCourse = Boolean(course.courseSlug);

                    return (
                      <article
                        key={course.id}
                        className="flex h-full flex-col rounded-3xl border border-slate-950/10 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]"
                        style={{
                          borderColor: rgba(course.accent, 0.42),
                          boxShadow: `0 16px 45px rgba(15,23,42,0.06), inset 0 1px 0 ${rgba(course.accent, 0.24)}`,
                          backgroundImage: `radial-gradient(circle at 88% 14%, ${rgba(course.accent, 0.12)}, transparent 38%)`,
                        }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-xl font-semibold tracking-tight">{course.name}</h4>
                          {statusText ? (
                            <span
                              className="rounded-full border px-2.5 py-1 text-xs font-medium"
                              style={{
                                borderColor: rgba(course.accent, 0.5),
                                backgroundColor: rgba(course.accent, accentDark ? 0.92 : 0.35),
                                color: accentText,
                              }}
                            >
                              {statusText}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{course.description}</p>
                        <div className="mt-auto pt-4 flex gap-2">
                          {canOpenCourse ? (
                            <Button
                              asChild
                              className="flex-1 border-0"
                              style={{
                                backgroundColor: course.accent,
                                color: accentText,
                              }}
                              onClick={() => firstIncomplete && startModule(firstIncomplete.id)}
                            >
                              <Link
                                to="/course/$courseSlug"
                                params={{ courseSlug: course.courseSlug! }}
                              >
                                {progress > 0 ? "Continuar" : "Ver curso"}
                              </Link>
                            </Button>
                          ) : (
                            <Button asChild
                              className="flex-1 border-0"
                              style={{
                                backgroundColor: course.accent,
                                color: accentText,
                              }}
                            >
                              <Link to="/course/$courseSlug" params={{ courseSlug: course.id }}>
                                Desbloquear curso
                              </Link>
                            </Button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
