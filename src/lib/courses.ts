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

const violet: CourseColor = {
  text: "text-violet-700",
  bg: "bg-violet-600",
  border: "border-violet-400",
  ring: "ring-violet-400",
  progress: "bg-violet-600",
  soft: "bg-violet-50",
  hex: "#7F77DD",
};

const blue: CourseColor = {
  text: "text-blue-700",
  bg: "bg-blue-600",
  border: "border-blue-400",
  ring: "ring-blue-400",
  progress: "bg-blue-600",
  soft: "bg-blue-50",
  hex: "#378ADD",
};

const coral: CourseColor = {
  text: "text-orange-700",
  bg: "bg-orange-600",
  border: "border-orange-400",
  ring: "ring-orange-400",
  progress: "bg-orange-600",
  soft: "bg-orange-50",
  hex: "#D85A30",
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
      "Bases algebraicas, funciones, geometría analítica, geometría del espacio y trigonometría para entrar sólido a Cálculo.",
    progress: 0,
    color: yellow,
    modules: [
      {
        slug: "lenguaje-algebraico",
        title: "Módulo 1 · Lenguaje algebraico",
        topics: [
          t("numeros-reales", "Números reales, orden e intervalos", "N, Z, Q, I y R; relación de orden, tricotomía, desigualdades e intervalos."),
          t("operaciones-numeros-reales", "Operaciones con números reales", "Jerarquía de operaciones, fracciones, potencias, radicales y simplificación numérica."),
          t("expresiones-algebraicas-polinomios", "Expresiones algebraicas y polinomios", "Suma, resta, producto y división de expresiones algebraicas y polinomios."),
          t("factorizacion-productos-notables", "Factorización y productos notables", "Factor común, agrupación, productos notables, trinomios, diferencia de cuadrados, suma y diferencia de cubos."),
          t("ecuaciones-inecuaciones", "Ecuaciones e inecuaciones", "Ecuaciones lineales, cuadráticas e inecuaciones lineales con análisis de soluciones."),
        ],
      },
      {
        slug: "funciones-desde-cero",
        title: "Módulo 2 · Funciones desde cero",
        topics: [
          t("concepto-funcion", "Concepto de función", "Definición de función, criterio, dominio, codominio, gráfico y evaluación."),
          t("dominio-ambito-imagen-preimagen", "Dominio, ámbito, imagen y preimagen", "Dominio máximo, restricciones algebraicas, ámbito, imagen y preimagen."),
          t("signo-intersecciones", "Signo e intersecciones", "Ceros de una función, intersecciones con los ejes y tabla de signos."),
          t("monotonia-extremos-concavidad", "Monotonía, extremos y concavidad", "Crecimiento, decrecimiento, máximos, mínimos, concavidad, convexidad y puntos de inflexión."),
          t("asintotas-comportamiento-grafico", "Asíntotas y comportamiento gráfico", "Asíntotas verticales, horizontales, oblicuas y lectura del comportamiento de una función."),
        ],
      },
      {
        slug: "transformaciones-algebra-funciones",
        title: "Módulo 3 · Transformaciones y álgebra de funciones",
        topics: [
          t("transformaciones-graficas", "Transformaciones de gráficas", "Traslaciones, reflexiones, compresiones, elongaciones y cambios sobre funciones base."),
          t("interseccion-graficas", "Intersección entre gráficas", "Resolución algebraica y gráfica de puntos de intersección entre funciones."),
          t("funcion-compuesta", "Función compuesta", "Composición de funciones, evaluación y dominio de una composición."),
          t("funcion-inversa-biyectividad", "Función inversa y biyectividad", "Inyectividad, sobreyectividad, biyectividad, cálculo de inversas e interpretación gráfica."),
        ],
      },
      {
        slug: "familias-fundamentales-funciones",
        title: "Módulo 4 · Familias fundamentales de funciones",
        topics: [
          t("funciones-polinomiales", "Funciones polinomiales", "Raíces, factorización, teorema del factor, teorema del residuo, raíces racionales, división sintética y completación de cuadrados."),
          t("funciones-racionales", "Funciones racionales", "Simplificación, restricciones, fracciones algebraicas, división de polinomios y fracciones parciales."),
          t("funciones-radicales-valor-absoluto", "Funciones radicales y valor absoluto", "Dominio, racionalización, definición a trozos, simplificación e intersecciones con los ejes."),
          t("funciones-exponenciales-logaritmicas", "Funciones exponenciales y logarítmicas", "Propiedades, dominios, ámbitos, gráficas, intersecciones y leyes de los logaritmos."),
          t("funciones-a-trozos", "Funciones a trozos", "Definición por partes, evaluación, dominio, continuidad visual y lectura gráfica."),
        ],
      },
      {
        slug: "geometria-analitica-espacio",
        title: "Módulo 5 · Geometría analítica y del espacio",
        topics: [
          t("rectas-distancia-punto-medio", "Rectas, distancia y punto medio", "Pendiente, ecuación de la recta, rectas paralelas, rectas perpendiculares, distancia entre puntos y punto medio."),
          t("geometria-del-espacio", "Geometría del espacio", "Área lateral, área total y volumen de prismas, pirámides, cilindros, conos y esferas."),
        ],
      },
      {
        slug: "trigonometria",
        title: "Módulo 6 · Trigonometría",
        topics: [
          t("circunferencia-trigonometrica-radianes", "Circunferencia trigonométrica y radianes", "Ángulos, grados, radianes, razones trigonométricas y circunferencia unitaria."),
          t("funciones-trigonometricas-inversas", "Funciones trigonométricas e inversas", "Seno, coseno, tangente, dominio, ámbito, período, asíntotas, gráficas e inversas trigonométricas."),
          t("identidades-ecuaciones-aplicaciones-trigonometricas", "Identidades, ecuaciones y aplicaciones trigonométricas", "Identidades pitagóricas, suma y diferencia, doble ángulo, ecuaciones trigonométricas y problemas aplicados."),
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
          t(
            "limites-continuidad",
            "Introducción a los límites y continuidad",
            "Aproximación, límites laterales, existencia, valor de la función, continuidad, discontinuidades y asíntotas.",
            "en-progreso",
          ),
          t(
            "tecnicas-algebraicas-limites",
            "Técnicas algebraicas de límites",
            "Factorización, simplificación, racionalización, manipulación algebraica y cambios de variable.",
          ),
          t(
            "limites-trigonometricos-indeterminaciones",
            "Límites trigonométricos e indeterminaciones",
            "Límites trigonométricos fundamentales, identidades, teorema de compresión y formas indeterminadas.",
          ),
          t(
            "limites-infinito-comportamiento-asintotico",
            "Límites al infinito y comportamiento asintótico",
            "Comportamiento dominante, funciones racionales, radicales, comparación asintótica y asíntotas horizontales.",
          ),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Derivación",
        topics: [
          t(
            "derivada-recta-tangente",
            "Derivada y recta tangente",
            "Definición de derivada, tasa de cambio, pendiente instantánea, rectas tangente y normal.",
          ),
          t(
            "reglas-derivacion",
            "Reglas de derivación",
            "Reglas básicas, suma, producto, cociente, cadena, polinomiales, exponenciales y trigonométricas.",
          ),
          t(
            "tecnicas-avanzadas-derivacion",
            "Técnicas avanzadas de derivación",
            "Derivación implícita, función inversa, logarítmicas, inversas trigonométricas, derivación logarítmica y orden superior.",
          ),
          t(
            "optimizacion-razones-cambio",
            "Optimización y razones de cambio",
            "Modelado con derivadas, extremos aplicados y problemas de cambio relacionado.",
          ),
          t(
            "analisis-funciones-derivadas",
            "Análisis de funciones con derivadas",
            "Extremos, teoremas de existencia, monotonía, concavidad, puntos de inflexión y criterios de derivadas.",
          ),
          t(
            "regla-lhopital",
            "Regla de L’Hôpital",
            "Indeterminaciones de cocientes y uso responsable de derivadas para evaluar límites.",
          ),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Integración",
        topics: [
          t("fundamentos-integracion", "Fundamentos de integración", "Antiderivadas, acumulación, sumas de Riemann y Teorema Fundamental."),
          t("reglas-basicas-integracion", "Reglas básicas e integrales inmediatas", "Linealidad, potencias, exponenciales, trigonométricas e inversas."),
          t("tecnicas-integracion", "Técnicas de integración", "Sustitución, partes, trigonométricas y fracciones parciales."),
          t("aplicaciones-integracion", "Aplicaciones de la integración", "Área entre curvas y acumulación geométrica."),
        ],
      },
    ],
  },
  {
    slug: "calculo-ii",
    code: "MA2001",
    name: "Cálculo II",
    short: "Series, coordenadas y métodos avanzados",
    description:
      "Desarrolla herramientas avanzadas de integración, series y representaciones para problemas universitarios.",
    progress: 0,
    color: violet,
    modules: [
      {
        slug: "tema-1",
        title: "Tema I · Series y desarrollos",
        topics: [
          t("taylor-maclaurin", "Polinomios de Taylor y Maclaurin", "Aproximación local de funciones mediante series."),
          t("desarrollos-limitados", "Desarrollos limitados", "Construcción de aproximaciones de orden finito."),
          t("limites-desarrollos", "Cálculo de límites con desarrollos limitados", "Resolución de indeterminaciones con series."),
          t("series-numericas", "Series numéricas", "Convergencia y divergencia de series."),
          t("criterios-convergencia-series", "Criterios de convergencia de series", "Comparación, razón, raíz y criterios clásicos."),
          t("series-potencias", "Series de potencias", "Representación funcional y manipulación algebraica."),
          t("radio-convergencia", "Radio y dominio de convergencia", "Intervalos y extremos de convergencia."),
          t("series-taylor", "Series de Taylor", "Expansiones en torno a un punto."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Integración y geometría",
        topics: [
          t("integrales-impropias", "Integrales impropias", "Evaluación con límites y casos de convergencia."),
          t("criterios-integrales-impropias", "Criterios de convergencia para integrales impropias", "Comparación y análisis asintótico."),
          t("secciones-conicas", "Secciones cónicas", "Parábola, elipse e hipérbola."),
          t("coordenadas-polares", "Coordenadas polares", "Conversión y representación en el plano."),
          t("curvas-polares", "Curvas polares", "Análisis y trazado de curvas en polar."),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Complejos y fundamentos",
        topics: [
          t("numeros-complejos", "Números complejos", "Forma binómica y operaciones."),
          t("moivre", "Forma polar y fórmula de De Moivre", "Potencias y raíces en forma polar."),
          t("euler", "Fórmula de Euler", "Relación entre exponenciales complejas y trigonometría."),
          t("raices-nesimas", "Raíces n-ésimas", "Determinación geométrica y algebraica de raíces."),
          t("induccion", "Inducción matemática", "Demostraciones por inducción."),
          t("sucesiones", "Sucesiones numéricas", "Convergencia y límites de sucesiones."),
          t("series-alternadas", "Series alternadas", "Convergencia condicional y criterio de Leibniz."),
          t("convergencia-absoluta-condicional", "Convergencia absoluta y condicional", "Diferencias y consecuencias."),
        ],
      },
    ],
  },
  {
    slug: "calculo-iii",
    code: "MA3001",
    name: "Cálculo III",
    short: "Multivariable y cálculo vectorial",
    description:
      "Domina cálculo en varias variables, integrales múltiples y teoremas del cálculo vectorial.",
    progress: 0,
    color: violet,
    modules: [
      {
        slug: "tema-1",
        title: "Tema I · Geometría en el espacio",
        topics: [
          t("rectas-planos-espacio", "Rectas y planos en el espacio", "Representaciones y relaciones geométricas."),
          t("secciones-superficies", "Secciones cónicas y superficies cuadráticas", "Clasificación y trazado básico."),
          t("cilindros-conos", "Cilindros y conos", "Superficies clásicas en R3."),
          t("funciones-vectoriales", "Funciones vectoriales", "Trayectorias y velocidad en el espacio."),
          t("curvas-parametrizadas", "Curvas parametrizadas", "Curvatura y parametrizaciones."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Varias variables",
        topics: [
          t("limites-varias-variables", "Límites y continuidad en varias variables", "Criterios y comportamiento multidireccional."),
          t("derivadas-parciales", "Derivadas parciales", "Cálculo y significado geométrico."),
          t("regla-cadena-multivariable", "Regla de la cadena en varias variables", "Composición de funciones multivariables."),
          t("derivacion-implicita-multivariable", "Derivación implícita en varias variables", "Relaciones implícitas y gradiente."),
          t("gradiente-direccional", "Gradiente y derivada direccional", "Direcciones de máximo crecimiento."),
          t("plano-tangente", "Plano tangente", "Aproximación local de superficies."),
          t("extremos-multivariable", "Extremos de funciones de varias variables", "Máximos, mínimos y puntos silla."),
          t("lagrange", "Multiplicadores de Lagrange", "Optimización con restricciones."),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Integración múltiple y campos",
        topics: [
          t("integrales-dobles", "Integrales dobles", "Cálculo en regiones planas."),
          t("cambio-orden", "Cambio de orden de integración", "Replanteo de límites."),
          t("cambio-variables-dobles", "Cambio de variables en integrales dobles", "Jacobiano y transformaciones."),
          t("polares-dobles", "Coordenadas polares en integrales dobles", "Integración en dominios circulares."),
          t("integrales-triples", "Integrales triples", "Volúmenes y densidades."),
          t("cilindricas-esfericas", "Coordenadas cilíndricas y esféricas", "Cambios de coordenadas en R3."),
          t("campos-vectoriales", "Campos vectoriales", "Flujos y potenciales."),
          t("integrales-linea", "Integrales de línea", "Trabajo y circulación."),
          t("campos-conservativos", "Campos conservativos", "Potenciales y caminos independientes."),
          t("green", "Teorema de Green", "Relación entre borde y región."),
          t("integrales-superficie", "Integrales de superficie", "Flujo a través de superficies."),
          t("stokes", "Teorema de Stokes", "Generalización de Green en superficies."),
          t("gauss-divergencia", "Teorema de la divergencia de Gauss", "Flujo total y divergencia."),
        ],
      },
    ],
  },
  {
    slug: "algebra-lineal",
    code: "MA2101",
    name: "Álgebra lineal",
    short: "Estructuras lineales y transformaciones",
    description:
      "Trabaja matrices, espacios vectoriales, transformaciones lineales y diagonalización con enfoque aplicado.",
    progress: 0,
    color: blue,
    modules: [
      {
        slug: "tema-1",
        title: "Tema I · Matrices y sistemas lineales",
        topics: [
          t("matrices", "Matrices", "Definición, notación y operaciones."),
          t("tipos-matrices", "Tipos de matrices", "Diagonal, triangular, identidad, simétrica."),
          t("algebra-matrices", "Álgebra de matrices", "Suma, producto y propiedades."),
          t("sistemas-lineales", "Sistemas de ecuaciones lineales", "Modelación y resolución."),
          t("gauss-jordan", "Método de Gauss-Jordan", "Reducción por filas y solución."),
          t("rango", "Rango de una matriz", "Dependencia lineal y consistencia."),
          t("invertibles", "Matrices invertibles", "Criterios y cálculo de inversa."),
          t("determinantes", "Determinantes", "Propiedades y aplicaciones."),
          t("cramer", "Regla de Cramer", "Resolución por determinantes."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Geometría vectorial y espacios",
        topics: [
          t("producto-escalar", "Producto escalar", "Ángulos y ortogonalidad."),
          t("norma-angulo", "Norma y ángulo entre vectores", "Medidas y relaciones."),
          t("producto-cruz", "Producto cruz", "Vectores normales y áreas."),
          t("proyecciones", "Proyecciones ortogonales", "Descomposición vectorial."),
          t("espacios-vectoriales", "Espacios vectoriales", "Axiomas y ejemplos."),
          t("subespacios", "Subespacios vectoriales", "Criterios de pertenencia."),
          t("bases-dimension", "Bases y dimensión", "Coordenadas y generación."),
          t("gram-schmidt", "Gram-Schmidt", "Ortogonalización de bases."),
          t("espacio-fila-columna", "Espacio fila y espacio columna", "Estructura de una matriz."),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Transformaciones y autovalores",
        topics: [
          t("transformaciones-lineales", "Transformaciones lineales", "Mapeos y propiedades lineales."),
          t("nucleo-imagen", "Núcleo e imagen", "Teorema rango-nulidad."),
          t("matriz-transformacion", "Matriz asociada a una transformación lineal", "Representación matricial."),
          t("cambio-base", "Cambio de base", "Conversión de coordenadas."),
          t("valores-vectores-propios", "Valores y vectores propios", "Espectro y autovectores."),
          t("diagonalizacion", "Diagonalización", "Criterios y aplicaciones."),
          t("formas-cuadraticas", "Formas cuadráticas", "Clasificación y definitud."),
          t("superficies-cuadraticas", "Curvas y superficies cuadráticas", "Interpretación geométrica."),
        ],
      },
    ],
  },
  {
    slug: "ecuaciones-diferenciales",
    code: "MA2201",
    name: "Ecuaciones diferenciales",
    short: "Modelado y métodos de resolución",
    description:
      "Resuelve ecuaciones diferenciales ordinarias y sistemas con métodos analíticos clásicos y Laplace.",
    progress: 0,
    color: blue,
    modules: [
      {
        slug: "tema-1",
        title: "Tema I · Primer orden",
        topics: [
          t("introduccion-ed", "Introducción a ecuaciones diferenciales", "Motivación y lenguaje básico."),
          t("clasificacion-ed", "Clasificación por tipo, orden y linealidad", "Taxonomía de ecuaciones."),
          t("pvi", "Problemas de valor inicial", "Condiciones iniciales y soluciones particulares."),
          t("existencia-unicidad", "Existencia y unicidad", "Condiciones del teorema."),
          t("separables", "Ecuaciones separables", "Método y aplicaciones."),
          t("lineales-primer-orden", "Ecuaciones lineales de primer orden", "Factor integrante."),
          t("exactas", "Ecuaciones exactas", "Potencial y condición de exactitud."),
          t("bernoulli-riccati", "Ecuaciones de Bernoulli y Riccati", "Cambios de variable útiles."),
          t("enfriamiento-newton", "Ley de enfriamiento de Newton", "Modelo térmico clásico."),
        ],
      },
      {
        slug: "tema-2",
        title: "Tema II · Orden superior y series",
        topics: [
          t("lineales-orden-superior", "Ecuaciones lineales de orden superior", "Estructura de soluciones."),
          t("superposicion", "Principio de superposición", "Combinación lineal de soluciones."),
          t("wronskiano", "Wronskiano", "Independencia lineal."),
          t("coeficientes-constantes", "Ecuaciones con coeficientes constantes", "Ecuación característica."),
          t("coeficientes-indeterminados", "Coeficientes indeterminados", "Particulares para forzamientos típicos."),
          t("reduccion-orden", "Reducción de orden", "Construcción de segunda solución."),
          t("euler-cauchy", "Ecuación de Euler", "Coeficientes variables con cambio logarítmico."),
          t("series-potencias-ed", "Soluciones por series de potencias", "Método alrededor de puntos ordinarios."),
          t("frobenius", "Método de Frobenius", "Puntos singulares regulares."),
        ],
      },
      {
        slug: "tema-3",
        title: "Tema III · Sistemas y transformada de Laplace",
        topics: [
          t("sistemas-lineales-ed", "Sistemas lineales de ecuaciones diferenciales", "Forma matricial de sistemas."),
          t("sistemas-autovalores", "Sistemas homogéneos con valores y vectores propios", "Resolución espectral."),
          t("sistemas-no-homogeneos", "Sistemas no homogéneos", "Solución general con forzamiento."),
          t("variacion-parametros", "Variación de parámetros", "Método general para particulares."),
          t("laplace", "Transformada de Laplace", "Propiedades operacionales."),
          t("laplace-inversa", "Transformada inversa de Laplace", "Fracciones parciales y tablas."),
          t("traslacion", "Teoremas de traslación", "Desplazamientos en tiempo/frecuencia."),
          t("escalon-unitario", "Función escalón unitario", "Modelado por tramos."),
          t("delta-dirac", "Delta de Dirac", "Impulsos y respuesta del sistema."),
          t("convolucion", "Convolución", "Producto en Laplace y señal en tiempo."),
          t("series-fourier", "Series de Fourier", "Descomposición armónica."),
          t("edp-separacion", "Ecuaciones en derivadas parciales y separación de variables", "Ideas base para ecuaciones clásicas."),
        ],
      },
    ],
  },
  {
    slug: "fisica-i",
    code: "FI1001",
    name: "Física I",
    short: "Mecánica clásica universitaria",
    description:
      "Desarrolla fundamentos de mecánica, energía, colisiones, rotación y fluidos para ingeniería y ciencias.",
    progress: 0,
    color: coral,
    modules: [
      {
        slug: "medicion-vectores",
        title: "Módulo 1 · Medición, unidades y vectores",
        topics: [
          t("magnitudes-fisicas", "Magnitudes físicas", "Escalares, vectoriales y unidades base."),
          t("notacion-cientifica", "Notación científica", "Orden de magnitud y cifras significativas."),
          t("unidades-conversiones", "Unidades y conversiones", "Sistemas de unidades y conversiones consistentes."),
          t("vectores", "Vectores", "Representación y operaciones básicas."),
          t("componentes-vectoriales", "Componentes vectoriales", "Descomposición en ejes cartesianos."),
          t("suma-resta-vectores", "Suma y resta de vectores", "Métodos geométricos y analíticos."),
        ],
      },
      {
        slug: "movimiento-1d-2d",
        title: "Módulo 2 · Movimiento en una y dos dimensiones",
        topics: [
          t("posicion-desplazamiento-velocidad-aceleracion", "Posición, desplazamiento, velocidad y aceleración", "Variables cinemáticas fundamentales."),
          t("movimiento-rectilineo", "Movimiento rectilíneo", "MRU y análisis de gráficas."),
          t("movimiento-aceleracion-constante", "Movimiento con aceleración constante", "Ecuaciones cinemáticas básicas."),
          t("caida-libre", "Caída libre", "Movimiento vertical bajo gravedad."),
          t("movimiento-dos-dimensiones", "Movimiento en dos dimensiones", "Composición de movimientos."),
          t("movimiento-parabolico", "Movimiento parabólico", "Tiro parabólico y alcance."),
          t("movimiento-circular", "Movimiento circular", "Rapidez angular y aceleración centrípeta."),
        ],
      },
      {
        slug: "newton-aplicaciones",
        title: "Módulo 3 · Leyes de Newton y aplicaciones",
        topics: [
          t("fuerza-masa", "Fuerza y masa", "Relación entre interacción y aceleración."),
          t("primera-ley-newton", "Primera ley de Newton", "Inercia y marcos inerciales."),
          t("segunda-ley-newton", "Segunda ley de Newton", "Dinámica y suma de fuerzas."),
          t("tercera-ley-newton", "Tercera ley de Newton", "Acción y reacción."),
          t("diagramas-cuerpo-libre", "Diagramas de cuerpo libre", "Modelo vectorial de fuerzas."),
          t("friccion", "Fricción", "Fricción estática y cinética."),
          t("fuerzas-tension-normal", "Fuerzas de tensión y normal", "Interacciones de contacto."),
          t("aplicaciones-leyes-newton", "Aplicaciones de las leyes de Newton", "Resolución de problemas típicos."),
        ],
      },
      {
        slug: "trabajo-energia",
        title: "Módulo 4 · Trabajo, energía y conservación de la energía",
        topics: [
          t("trabajo-fuerza", "Trabajo de una fuerza", "Producto escalar y trabajo neto."),
          t("energia-cinetica", "Energía cinética", "Energía asociada al movimiento."),
          t("energia-potencial", "Energía potencial", "Energía gravitatoria y elástica."),
          t("teorema-trabajo-energia", "Teorema trabajo-energía", "Relación entre trabajo y variación de energía."),
          t("fuerzas-conservativas-no-conservativas", "Fuerzas conservativas y no conservativas", "Criterios y efectos en la energía."),
          t("conservacion-energia-mecanica", "Conservación de la energía mecánica", "Sistemas aislados y disipativos."),
          t("potencia", "Potencia", "Rapidez de transferencia de energía."),
        ],
      },
      {
        slug: "momento-colisiones",
        title: "Módulo 5 · Cantidad de movimiento y colisiones",
        topics: [
          t("momento-lineal", "Momento lineal", "Cantidad de movimiento en sistemas."),
          t("impulso", "Impulso", "Cambio de momento por fuerza en el tiempo."),
          t("conservacion-momento-lineal", "Conservación del momento lineal", "Interacciones internas y externas."),
          t("centro-masa", "Centro de masa", "Descripción de sistemas de partículas."),
          t("colisiones-elasticas", "Colisiones elásticas", "Conservación de energía cinética y momento."),
          t("colisiones-inelasticas", "Colisiones inelásticas", "Pérdidas de energía mecánica."),
        ],
      },
      {
        slug: "rotacion-equilibrio",
        title: "Módulo 6 · Rotación y equilibrio",
        topics: [
          t("cinematica-rotacional", "Cinemática rotacional", "Variables angulares y relaciones lineales."),
          t("energia-rotacional", "Energía rotacional", "Energía cinética de cuerpos rígidos."),
          t("momento-inercia", "Momento de inercia", "Distribución de masa y rotación."),
          t("torque", "Torque", "Momento de fuerza."),
          t("momento-angular", "Momento angular", "Dinámica rotacional y conservación."),
          t("conservacion-momento-angular", "Conservación del momento angular", "Sistemas sin torque externo."),
          t("equilibrio-estatico", "Equilibrio estático", "Condiciones de reposo."),
          t("condiciones-equilibrio", "Condiciones de equilibrio", "Suma de fuerzas y torques nula."),
        ],
      },
      {
        slug: "mecanica-fluidos",
        title: "Módulo 7 · Mecánica de fluidos",
        topics: [
          t("densidad-presion", "Densidad y presión", "Propiedades básicas de fluidos."),
          t("presion-fluidos", "Presión en fluidos", "Variación hidrostática con profundidad."),
          t("principio-pascal", "Principio de Pascal", "Transmisión de presión."),
          t("principio-arquimedes", "Principio de Arquímedes", "Empuje y desplazamiento."),
          t("flotacion", "Flotación", "Condiciones de equilibrio de cuerpos en fluidos."),
          t("ecuacion-continuidad", "Ecuación de continuidad", "Conservación de masa en flujo."),
          t("ecuacion-bernoulli", "Ecuación de Bernoulli", "Conservación de energía en fluidos ideales."),
        ],
      },
    ],
  },
  {
    slug: "fisica-ii",
    code: "FI2001",
    name: "Física II",
    short: "Oscilaciones, termodinámica y electrostática",
    description:
      "Integra oscilaciones, ondas, calor, termodinámica y fundamentos eléctricos para cursos STEM universitarios.",
    progress: 0,
    color: coral,
    modules: [
      {
        slug: "fluidos-oscilaciones-ondas",
        title: "Módulo 1 · Fluidos, oscilaciones y ondas mecánicas",
        topics: [
          t("dinamica-fluidos", "Dinámica de fluidos", "Flujos y comportamiento macroscópico."),
          t("movimiento-oscilatorio", "Movimiento oscilatorio", "Variables y periodicidad."),
          t("mas", "Movimiento armónico simple", "Modelo sinusoidal de oscilación."),
          t("movimiento-ondulatorio", "Movimiento ondulatorio", "Propagación y parámetros de onda."),
          t("ondas-mecanicas", "Ondas mecánicas", "Medios materiales y transporte de energía."),
          t("superposicion-ondas", "Superposición de ondas", "Interferencia constructiva y destructiva."),
        ],
      },
      {
        slug: "sonido-temperatura",
        title: "Módulo 2 · Sonido y temperatura",
        topics: [
          t("ondas-sonoras", "Ondas sonoras", "Propagación y características."),
          t("intensidad-sonido", "Intensidad y nivel de sonido", "Escalas logarítmicas y decibeles."),
          t("efecto-doppler", "Efecto Doppler", "Cambio aparente de frecuencia."),
          t("temperatura", "Temperatura", "Interpretación microscópica y macroscópica."),
          t("escalas-temperatura", "Escalas de temperatura", "Celsius, Kelvin y Fahrenheit."),
          t("dilatacion-termica", "Dilatación térmica", "Expansión lineal y volumétrica."),
        ],
      },
      {
        slug: "calor-termodinamica",
        title: "Módulo 3 · Calor y termodinámica",
        topics: [
          t("calor-transferencia", "Calor y transferencia de calor", "Conducción, convección y radiación."),
          t("capacidad-calorifica", "Capacidad calorífica", "Calor requerido por cambio de temperatura."),
          t("calor-especifico", "Calor específico", "Propiedad intensiva térmica."),
          t("primera-ley-termo", "Primera ley de la termodinámica", "Conservación de energía en sistemas térmicos."),
          t("teoria-cinetica-gases", "Teoría cinética de los gases", "Modelo microscópico de gases."),
          t("segunda-ley-termo", "Segunda ley de la termodinámica", "Irreversibilidad y dirección de procesos."),
          t("maquinas-termicas", "Máquinas térmicas", "Rendimiento y ciclos."),
          t("entropia", "Entropía", "Medida de desorden y espontaneidad."),
        ],
      },
      {
        slug: "carga-campo-electrico",
        title: "Módulo 4 · Carga eléctrica, fuerza eléctrica y campo eléctrico",
        topics: [
          t("carga-electrica", "Carga eléctrica", "Propiedades y conservación."),
          t("conductores-aislantes", "Conductores y aislantes", "Comportamiento de materiales."),
          t("ley-coulomb", "Ley de Coulomb", "Interacción entre cargas puntuales."),
          t("campo-electrico", "Campo eléctrico", "Definición y cálculo."),
          t("lineas-campo-electrico", "Líneas de campo eléctrico", "Visualización e interpretación."),
          t("campo-distribuciones-continuas", "Campo eléctrico de distribuciones continuas", "Integración de contribuciones."),
        ],
      },
      {
        slug: "gauss-potencial",
        title: "Módulo 5 · Ley de Gauss y potencial eléctrico",
        topics: [
          t("flujo-electrico", "Flujo eléctrico", "Flujo a través de superficies."),
          t("ley-gauss", "Ley de Gauss", "Relación entre flujo y carga encerrada."),
          t("aplicaciones-gauss", "Aplicaciones de la ley de Gauss", "Simetrías y casos clásicos."),
          t("energia-potencial-electrica", "Energía potencial eléctrica", "Trabajo de interacción eléctrica."),
          t("potencial-electrico", "Potencial eléctrico", "Escalar asociado al campo."),
          t("diferencia-potencial", "Diferencia de potencial", "Voltaje y trabajo por unidad de carga."),
          t("equipotenciales", "Superficies equipotenciales", "Relación con líneas de campo."),
        ],
      },
      {
        slug: "capacitancia-dielectricos",
        title: "Módulo 6 · Capacitancia y dieléctricos",
        topics: [
          t("capacitores", "Capacitores", "Dispositivos de almacenamiento de carga."),
          t("capacitancia", "Capacitancia", "Relación carga-voltaje."),
          t("capacitores-serie-paralelo", "Capacitores en serie y paralelo", "Equivalentes y combinaciones."),
          t("energia-capacitor", "Energía almacenada en un capacitor", "Densidad de energía eléctrica."),
          t("dielectricos", "Dieléctricos", "Polarización y aumento de capacitancia."),
        ],
      },
      {
        slug: "corriente-resistencia-circuitos",
        title: "Módulo 7 · Corriente, resistencia y circuitos de corriente directa",
        topics: [
          t("corriente-electrica", "Corriente eléctrica", "Flujo de carga en conductores."),
          t("densidad-corriente", "Densidad de corriente", "Distribución de corriente por área."),
          t("resistencia-resistividad", "Resistencia y resistividad", "Modelo microscópico de conducción."),
          t("ley-ohm", "Ley de Ohm", "Relación V-I-R."),
          t("potencia-electrica", "Potencia eléctrica", "Tasa de transferencia de energía eléctrica."),
          t("fem", "Fuerza electromotriz", "Fuentes de voltaje."),
          t("circuitos-dc", "Circuitos DC", "Análisis de circuitos de corriente continua."),
          t("kirchhoff", "Leyes de Kirchhoff", "Nodos y mallas."),
          t("circuitos-rc", "Circuitos RC", "Carga y descarga exponencial."),
        ],
      },
    ],
  },
  {
    slug: "fisica-iii",
    code: "FI3001",
    name: "Física III",
    short: "Magnetismo, ondas EM y óptica",
    description:
      "Consolida electromagnetismo, óptica y física moderna con enfoque universitario aplicado.",
    progress: 0,
    color: coral,
    modules: [
      {
        slug: "campos-fuerza-magnetica",
        title: "Módulo 1 · Campos magnéticos y fuerza magnética",
        topics: [
          t("campo-magnetico", "Campo magnético", "Fuentes y representación."),
          t("fuerza-magnetica-cargas", "Fuerza magnética sobre cargas en movimiento", "Regla de la mano derecha."),
          t("particulas-campos-magneticos", "Movimiento de partículas cargadas en campos magnéticos", "Trayectorias y radio de giro."),
          t("fuerza-conductores-corriente", "Fuerza magnética sobre conductores con corriente", "Interacción corriente-campo."),
          t("torque-espiras", "Torque sobre espiras", "Momento magnético."),
        ],
      },
      {
        slug: "fuentes-campo-magnetico",
        title: "Módulo 2 · Fuentes del campo magnético",
        topics: [
          t("biot-savart", "Ley de Biot-Savart", "Campo generado por elementos de corriente."),
          t("campo-corrientes", "Campo magnético producido por corrientes", "Geometrías típicas."),
          t("ampere", "Ley de Ampère", "Circulación y simetría."),
          t("solenoides", "Solenoides", "Campo interior y aplicaciones."),
          t("materiales-magneticos", "Materiales magnéticos", "Respuesta magnética de la materia."),
        ],
      },
      {
        slug: "induccion-inductancia",
        title: "Módulo 3 · Inducción electromagnética e inductancia",
        topics: [
          t("flujo-magnetico", "Flujo magnético", "Flujo a través de superficies."),
          t("faraday", "Ley de Faraday", "Inducción por variación de flujo."),
          t("lenz", "Ley de Lenz", "Sentido de la fem inducida."),
          t("fem-inducida", "Fem inducida", "Origen y cálculo."),
          t("inductancia", "Inductancia", "Acoplamiento flujo-corriente."),
          t("autoinductancia", "Autoinductancia", "Respuesta inductiva propia."),
          t("energia-inductores", "Energía en inductores", "Almacenamiento magnético de energía."),
        ],
      },
      {
        slug: "corriente-alterna",
        title: "Módulo 4 · Circuitos de corriente alterna",
        topics: [
          t("corriente-alterna", "Corriente alterna", "Señales sinusoidales."),
          t("fasores", "Fasores", "Representación compleja de señales AC."),
          t("circuitos-r-c-l", "Circuitos resistivos, capacitivos e inductivos", "Impedancia básica."),
          t("circuitos-rlc", "Circuitos RLC", "Comportamiento forzado en AC."),
          t("resonancia", "Resonancia", "Frecuencia natural y amplitud máxima."),
          t("potencia-ac", "Potencia en circuitos AC", "Factor de potencia y potencia promedio."),
        ],
      },
      {
        slug: "ondas-electromagneticas",
        title: "Módulo 5 · Ondas electromagnéticas",
        topics: [
          t("campos-variables", "Campos eléctricos y magnéticos variables", "Acoplamiento dinámico."),
          t("ondas-em", "Ondas electromagnéticas", "Propagación en el vacío y medios."),
          t("energia-ondas-em", "Energía transportada por ondas electromagnéticas", "Vector de Poynting."),
          t("espectro-em", "Espectro electromagnético", "Bandas y aplicaciones."),
        ],
      },
      {
        slug: "optica-geometrica",
        title: "Módulo 6 · Óptica geométrica",
        topics: [
          t("naturaleza-luz", "Naturaleza de la luz", "Modelos de propagación."),
          t("reflexion", "Reflexión", "Leyes y formación de imágenes."),
          t("refraccion", "Refracción", "Cambio de dirección entre medios."),
          t("indice-refraccion", "Índice de refracción", "Rapidez de la luz en medios."),
          t("espejos", "Espejos", "Ecuaciones de espejos esféricos."),
          t("lentes", "Lentes", "Ecuación de lentes delgadas."),
          t("formacion-imagenes", "Formación de imágenes", "Trazado de rayos y aumentos."),
          t("instrumentos-opticos", "Instrumentos ópticos básicos", "Lupa, microscopio y telescopio."),
        ],
      },
      {
        slug: "optica-ondulatoria",
        title: "Módulo 7 · Óptica ondulatoria",
        topics: [
          t("interferencia", "Interferencia", "Superposición coherente."),
          t("difraccion", "Difracción", "Desviación en aperturas y obstáculos."),
          t("polarizacion", "Polarización", "Orientación del campo eléctrico."),
          t("patrones-interferencia", "Patrones de interferencia", "Franjas y condiciones."),
          t("patrones-difraccion", "Patrones de difracción", "Mínimos y máximos de intensidad."),
        ],
      },
      {
        slug: "fisica-moderna",
        title: "Módulo 8 · Física moderna",
        topics: [
          t("relatividad-especial", "Relatividad especial básica", "Postulados y consecuencias."),
          t("cuantizacion", "Cuantización", "Energía discreta en sistemas microscópicos."),
          t("fotones", "Fotones", "Cuantos de radiación electromagnética."),
          t("efecto-fotoelectrico", "Efecto fotoeléctrico", "Evidencia cuántica de la luz."),
          t("dualidad-onda-particula", "Dualidad onda-partícula", "Naturaleza dual de la materia y radiación."),
          t("intro-cuantica", "Introducción a física cuántica", "Conceptos base y alcance."),
        ],
      },
    ],
  },
  {
    slug: "quimica-general-i",
    code: "QU1001",
    name: "Química General I",
    short: "Fundamentos químicos universitarios",
    description:
      "Construye bases sólidas de estructura atómica, enlace, estequiometría y termoquímica.",
    progress: 0,
    color: blue,
    modules: [
      {
        slug: "materia-medicion-lenguaje",
        title: "Módulo 1 · Materia, medición y lenguaje químico",
        topics: [
          t("quimica-estudio-materia", "La química como estudio de la materia", "Alcance y método de la química."),
          t("clasificacion-materia", "Clasificación de la materia", "Sustancias puras, mezclas y estados."),
          t("propiedades-fisicas-quimicas", "Propiedades físicas y químicas", "Cambios y comportamiento de sustancias."),
          t("medicion-unidades", "Medición y unidades", "Sistema internacional y consistencia dimensional."),
          t("cifras-significativas", "Cifras significativas", "Precisión y redondeo en resultados."),
          t("notacion-cientifica-quimica", "Notación científica", "Escalas y órdenes de magnitud."),
        ],
      },
      {
        slug: "atomos-moleculas-iones-nomenclatura",
        title: "Módulo 2 · Átomos, moléculas, iones y nomenclatura",
        topics: [
          t("estructura-basica-atomo", "Estructura básica del átomo", "Partículas subatómicas y modelo básico."),
          t("elementos-quimicos", "Elementos", "Símbolos y organización elemental."),
          t("moleculas", "Moléculas", "Enlaces y composición molecular."),
          t("iones", "Iones", "Formación y carga de especies iónicas."),
          t("compuestos-quimicos", "Compuestos químicos", "Combinación y formulación."),
          t("formulas-quimicas", "Fórmulas químicas", "Representación de composición."),
          t("nomenclatura-inorganica", "Nomenclatura inorgánica básica", "Reglas de nombrado fundamentales."),
        ],
      },
      {
        slug: "estructura-electronica-periodicidad",
        title: "Módulo 3 · Estructura electrónica y periodicidad",
        topics: [
          t("atomo-cuantico", "El átomo cuántico", "Modelo cuántico y orbitales."),
          t("configuracion-electronica", "Configuración electrónica", "Distribución electrónica por niveles."),
          t("tabla-periodica", "Tabla periódica", "Organización y tendencias periódicas."),
          t("carga-nuclear-efectiva", "Carga nuclear efectiva", "Pantallamiento y atracción efectiva."),
          t("radio-atomico", "Radio atómico", "Variación del tamaño atómico."),
          t("energia-ionizacion", "Energía de ionización", "Energía para remover electrones."),
          t("afinidad-electronica", "Afinidad electrónica", "Ganancia electrónica y energía."),
          t("electronegatividad", "Electronegatividad", "Capacidad de atraer electrones."),
          t("caracter-metalico", "Carácter metálico", "Tendencias metálicas en la tabla."),
        ],
      },
      {
        slug: "reacciones-disolucion-acuosa",
        title: "Módulo 4 · Reacciones químicas en disolución acuosa",
        topics: [
          t("disoluciones", "Disoluciones", "Fases y componentes de una disolución."),
          t("concentracion", "Concentración", "Formas de expresar concentración."),
          t("tipos-reacciones-quimicas", "Tipos de reacciones químicas", "Clasificación de reacciones frecuentes."),
          t("reacciones-precipitacion", "Reacciones de precipitación", "Formación de sólidos insolubles."),
          t("reacciones-acido-base", "Reacciones ácido-base", "Neutralización y especies conjugadas."),
          t("reacciones-redox-intro", "Reacciones redox introductorias", "Transferencia de electrones."),
          t("ecuaciones-ionicas", "Ecuaciones iónicas", "Especies espectadoras y ecuación neta."),
        ],
      },
      {
        slug: "estequiometria",
        title: "Módulo 5 · Estequiometría",
        topics: [
          t("mol-cantidad-sustancia", "Mol y cantidad de sustancia", "Unidad química de conteo."),
          t("masa-molar", "Masa molar", "Conversión masa-moles."),
          t("ecuaciones-balanceadas", "Ecuaciones químicas balanceadas", "Conservación de masa."),
          t("calculos-estequiometricos", "Cálculos estequiométricos", "Relaciones molares en reacción."),
          t("reactivo-limitante", "Reactivo limitante", "Determinación del reactivo agotado."),
          t("rendimiento-teorico-porcentual", "Rendimiento teórico y porcentual", "Eficiencia de reacción."),
        ],
      },
      {
        slug: "termoquimica",
        title: "Módulo 6 · Termoquímica",
        topics: [
          t("energia-calor", "Energía y calor", "Transferencia energética en procesos."),
          t("sistemas-alrededores", "Sistemas y alrededores", "Fronteras y tipos de sistema."),
          t("entalpia", "Entalpía", "Contenido energético a presión constante."),
          t("cambios-entalpia", "Cambios de entalpía", "Entalpías de reacción."),
          t("calorimetria", "Calorimetría", "Medición experimental de calor."),
          t("energia-reacciones-quimicas", "Energía en reacciones químicas", "Procesos exotérmicos y endotérmicos."),
        ],
      },
      {
        slug: "enlace-geometria-molecular",
        title: "Módulo 7 · Enlace químico y geometría molecular",
        topics: [
          t("enlace-ionico", "Enlace iónico", "Transferencia electrónica y redes iónicas."),
          t("enlace-covalente", "Enlace covalente", "Compartición electrónica."),
          t("estructuras-lewis", "Estructuras de Lewis", "Representación de electrones de valencia."),
          t("carga-formal", "Carga formal", "Evaluación de estructuras posibles."),
          t("resonancia", "Resonancia", "Deslocalización electrónica."),
          t("geometria-molecular", "Geometría molecular", "Forma molecular y pares libres."),
          t("teoria-rpecv", "Teoría RPECV", "Predicción geométrica por repulsión electrónica."),
          t("polaridad-molecular", "Polaridad molecular", "Distribución de carga y dipolos."),
          t("teoria-enlace-valencia-intro", "Introducción a teoría de enlace de valencia", "Hibridación y traslape orbital."),
        ],
      },
      {
        slug: "intro-quimica-ambiental",
        title: "Módulo 8 · Introducción a química ambiental",
        topics: [
          t("contaminacion-atmosferica", "Contaminación atmosférica", "Fuentes y efectos químicos."),
          t("quimica-ambiente", "Química y ambiente", "Interacciones químicas en ecosistemas."),
          t("aplicaciones-biologicas-industriales", "Aplicaciones químicas en procesos biológicos e industriales", "Impacto y utilidad de la química aplicada."),
        ],
      },
    ],
  },
  {
    slug: "quimica-general-ii",
    code: "QU2001",
    name: "Química General II",
    short: "Equilibrio, cinética y electroquímica",
    description:
      "Profundiza en gases, equilibrio químico, termodinámica y electroquímica con problemas universitarios.",
    progress: 0,
    color: blue,
    modules: [
      {
        slug: "gases",
        title: "Módulo 1 · Gases",
        topics: [
          t("leyes-gases", "Leyes de los gases", "Relaciones presión-volumen-temperatura."),
          t("gas-ideal", "Gas ideal", "Modelo ideal y ecuación de estado."),
          t("mezclas-gases", "Mezclas de gases", "Composición y comportamiento de mezclas."),
          t("presiones-parciales", "Presiones parciales", "Ley de Dalton."),
          t("teoria-cinetica-molecular", "Teoría cinética molecular", "Interpretación microscópica de gases."),
        ],
      },
      {
        slug: "intermoleculares-liquidos-solidos",
        title: "Módulo 2 · Fuerzas intermoleculares, líquidos y sólidos",
        topics: [
          t("fuerzas-intermoleculares", "Fuerzas intermoleculares", "Interacciones entre moléculas."),
          t("puentes-hidrogeno", "Puentes de hidrógeno", "Interacción direccional fuerte."),
          t("propiedades-liquidos", "Propiedades de líquidos", "Viscosidad, tensión superficial y volatilidad."),
          t("solidos", "Sólidos", "Estructuras cristalinas y amorfas."),
          t("cambios-fase", "Cambios de fase", "Transiciones entre estados."),
          t("diagramas-fase", "Diagramas de fase", "Regiones de estabilidad de fases."),
        ],
      },
      {
        slug: "disoluciones-coligativas",
        title: "Módulo 3 · Disoluciones y propiedades coligativas",
        topics: [
          t("tipos-disoluciones", "Tipos de disoluciones", "Clasificación por estado y concentración."),
          t("concentracion-disoluciones", "Concentración", "Molaridad y otras expresiones."),
          t("solubilidad", "Solubilidad", "Factores que afectan la disolución."),
          t("coloides", "Coloides", "Sistemas dispersos y estabilidad."),
          t("propiedades-coligativas", "Propiedades coligativas", "Dependencia del número de partículas."),
          t("presion-vapor", "Presión de vapor", "Disminución por solutos."),
          t("osmosis", "Ósmosis", "Movimiento de solvente a través de membranas."),
        ],
      },
      {
        slug: "cinetica-quimica",
        title: "Módulo 4 · Cinética química",
        topics: [
          t("velocidad-reaccion", "Velocidad de reacción", "Cambio de concentración en el tiempo."),
          t("ley-velocidad", "Ley de velocidad", "Dependencia con concentración."),
          t("orden-reaccion", "Orden de reacción", "Orden global y parcial."),
          t("energia-activacion", "Energía de activación", "Barrera energética de reacción."),
          t("mecanismos-reaccion", "Mecanismos de reacción", "Pasos elementales de reacción."),
          t("catalizadores", "Catalizadores", "Aceleración sin consumo neto."),
        ],
      },
      {
        slug: "equilibrio-quimico",
        title: "Módulo 5 · Equilibrio químico",
        topics: [
          t("concepto-equilibrio", "Concepto de equilibrio", "Estado dinámico reversible."),
          t("constante-equilibrio", "Constante de equilibrio", "Relación de actividades o concentraciones."),
          t("cociente-reaccion", "Cociente de reacción", "Dirección espontánea hacia equilibrio."),
          t("le-chatelier", "Principio de Le Châtelier", "Respuesta ante perturbaciones."),
          t("calculos-equilibrio", "Cálculos de equilibrio", "Resolución cuantitativa."),
        ],
      },
      {
        slug: "equilibrio-acido-base",
        title: "Módulo 6 · Equilibrio ácido-base",
        topics: [
          t("acidos-bases", "Ácidos y bases", "Definiciones de Brønsted y Lewis."),
          t("ph-poh", "pH y pOH", "Escalas de acidez y basicidad."),
          t("acidos-bases-fuertes", "Ácidos y bases fuertes", "Disociación completa."),
          t("acidos-bases-debiles", "Ácidos y bases débiles", "Equilibrio ácido-base."),
          t("hidrolisis", "Hidrólisis", "Reacción de sales con agua."),
          t("titulaciones-acido-base", "Titulaciones ácido-base", "Curvas y puntos de equivalencia."),
        ],
      },
      {
        slug: "amortiguadores-solubilidad",
        title: "Módulo 7 · Amortiguadores y solubilidad",
        topics: [
          t("soluciones-amortiguadoras", "Soluciones amortiguadoras", "Resistencia a cambios de pH."),
          t("henderson-hasselbalch", "Ecuación de Henderson-Hasselbalch", "Relación pH-pKa."),
          t("equilibrios-solubilidad", "Equilibrios de solubilidad", "Disolución de sales poco solubles."),
          t("kps", "Kps", "Producto de solubilidad."),
          t("efecto-ion-comun", "Efecto del ion común", "Desplazamiento de equilibrio."),
          t("precipitacion-selectiva", "Precipitación selectiva", "Separación por solubilidad."),
        ],
      },
      {
        slug: "termodinamica-quimica",
        title: "Módulo 8 · Termodinámica química",
        topics: [
          t("entropia-quimica", "Entropía", "Medida de dispersión de energía."),
          t("energia-libre-gibbs", "Energía libre de Gibbs", "Criterio de espontaneidad."),
          t("espontaneidad", "Espontaneidad", "Dirección natural de procesos."),
          t("energia-libre-equilibrio", "Relación entre energía libre y equilibrio", "Vínculo entre ΔG y K."),
          t("temperatura-espontaneidad", "Temperatura y espontaneidad", "Dependencia térmica de procesos."),
        ],
      },
      {
        slug: "electroquimica",
        title: "Módulo 9 · Electroquímica",
        topics: [
          t("reacciones-redox", "Reacciones redox", "Oxidación y reducción."),
          t("celdas-galvanicas", "Celdas galvánicas", "Conversión química-eléctrica."),
          t("potenciales-estandar", "Potenciales estándar", "Potencial de reducción estándar."),
          t("ecuacion-nernst", "Ecuación de Nernst", "Potencial en condiciones no estándar."),
          t("electrolisis", "Electrólisis", "Procesos no espontáneos."),
          t("baterias", "Baterías", "Aplicaciones electroquímicas."),
        ],
      },
      {
        slug: "quimica-ambiental",
        title: "Módulo 10 · Química ambiental",
        topics: [
          t("quimica-atmosferica", "Química atmosférica", "Reacciones en la atmósfera."),
          t("contaminantes", "Contaminantes", "Tipos y efectos químicos."),
          t("procesos-quimicos-ambientales", "Procesos químicos ambientales", "Transformaciones en agua, aire y suelo."),
          t("aplicaciones-ambientales", "Aplicaciones químicas al ambiente", "Mitigación y control de impacto."),
        ],
      },
    ],
  },
  {
    slug: "quimica-intensiva",
    code: "QU3001",
    name: "Química General Intensiva",
    short: "Ruta acelerada de química general",
    description:
      "Concentra los ejes de química general para avanzar con ritmo alto antes de parciales y finales.",
    progress: 0,
    color: blue,
    modules: [
      {
        slug: "fundamentos-medicion-lenguaje",
        title: "Módulo 1 · Fundamentos, medición y lenguaje químico",
        topics: [
          t("estudio-cambio", "Estudio del cambio", "Fenómenos químicos y su interpretación."),
          t("materia-medicion", "Materia y medición", "Magnitudes y unidades en química."),
          t("cifras-significativas-intensiva", "Cifras significativas", "Precisión en cálculos químicos."),
          t("unidades-intensiva", "Unidades", "Conversión y consistencia dimensional."),
          t("formulas-quimicas-intensiva", "Fórmulas químicas", "Representación de compuestos."),
          t("nomenclatura-intensiva", "Nomenclatura", "Nombrado básico de compuestos."),
        ],
      },
      {
        slug: "atomos-moleculas-iones",
        title: "Módulo 2 · Átomos, moléculas e iones",
        topics: [
          t("estructura-atomica-intensiva", "Estructura atómica", "Partículas y niveles de energía."),
          t("elementos-intensiva", "Elementos", "Identificación y periodicidad."),
          t("moleculas-intensiva", "Moléculas", "Composición molecular."),
          t("iones-intensiva", "Iones", "Formación de cationes y aniones."),
          t("compuestos-intensiva", "Compuestos", "Relaciones entre elementos."),
          t("formulas-nombres", "Fórmulas y nombres químicos", "Correspondencia fórmula-nombre."),
        ],
      },
      {
        slug: "estequiometria-reacciones",
        title: "Módulo 3 · Estequiometría y reacciones químicas",
        topics: [
          t("mol-intensiva", "Mol", "Cantidad de sustancia."),
          t("masa-molar-intensiva", "Masa molar", "Relación masa-cantidad."),
          t("ecuaciones-quimicas-intensiva", "Ecuaciones químicas", "Representación de reacciones."),
          t("balanceo-intensiva", "Balanceo", "Ajuste estequiométrico."),
          t("reactivo-limitante-intensiva", "Reactivo limitante", "Determinación de límites de reacción."),
          t("rendimiento-intensiva", "Rendimiento", "Eficiencia de reacción."),
          t("reacciones-quimicas-intensiva", "Reacciones químicas", "Clasificación y análisis."),
          t("reacciones-disolucion-acuosa-intensiva", "Reacciones en disolución acuosa", "Iones en solución."),
        ],
      },
      {
        slug: "estructura-periodicidad",
        title: "Módulo 4 · Estructura electrónica y periodicidad",
        topics: [
          t("estructura-electronica-intensiva", "Estructura electrónica", "Distribución de electrones."),
          t("configuracion-electronica-intensiva", "Configuración electrónica", "Reglas de llenado orbital."),
          t("propiedades-periodicas", "Propiedades periódicas", "Tendencias en la tabla periódica."),
          t("radio-atomico-intensiva", "Radio atómico", "Variación periódica."),
          t("energia-ionizacion-intensiva", "Energía de ionización", "Remoción electrónica."),
          t("afinidad-electronica-intensiva", "Afinidad electrónica", "Ganancia de electrones."),
          t("electronegatividad-intensiva", "Electronegatividad", "Polarización de enlaces."),
        ],
      },
      {
        slug: "enlace-geometria",
        title: "Módulo 5 · Enlace químico y geometría molecular",
        topics: [
          t("enlaces-quimicos-intensiva", "Enlaces químicos", "Tipos de enlace."),
          t("lewis-intensiva", "Estructuras de Lewis", "Representación electrónica."),
          t("enlace-ionico-intensiva", "Enlace iónico", "Interacciones electrostáticas."),
          t("enlace-covalente-intensiva", "Enlace covalente", "Compartición electrónica."),
          t("geometria-molecular-intensiva", "Geometría molecular", "Forma espacial de moléculas."),
          t("polaridad-intensiva", "Polaridad", "Dipolo molecular."),
          t("teoria-enlace-intensiva", "Teoría de enlace", "Modelos básicos de enlace."),
        ],
      },
      {
        slug: "gases-fuerzas-intermoleculares",
        title: "Módulo 6 · Gases y fuerzas intermoleculares",
        topics: [
          t("leyes-gases-intensiva", "Leyes de los gases", "Relaciones macroscópicas."),
          t("gas-ideal-intensiva", "Gas ideal", "Modelo ideal y ecuación."),
          t("teoria-cinetica-intensiva", "Teoría cinética", "Interpretación molecular."),
          t("fuerzas-intermoleculares-intensiva", "Fuerzas intermoleculares", "Interacciones entre moléculas."),
          t("liquidos-intensiva", "Líquidos", "Propiedades macroscópicas."),
          t("propiedades-fisicas-materia-intensiva", "Propiedades físicas de la materia", "Comportamiento en fases."),
        ],
      },
      {
        slug: "disoluciones-propiedades-fisicas",
        title: "Módulo 7 · Disoluciones y propiedades físicas",
        topics: [
          t("propiedades-disoluciones", "Propiedades de las disoluciones", "Características de mezclas homogéneas."),
          t("concentracion-intensiva", "Concentración", "Expresiones y conversiones."),
          t("solubilidad-intensiva", "Solubilidad", "Factores de disolución."),
          t("propiedades-coligativas-intensiva", "Propiedades coligativas", "Efectos de soluto no volátil."),
        ],
      },
      {
        slug: "equilibrio-acido-base-solubilidad",
        title: "Módulo 8 · Equilibrio químico, ácido-base y solubilidad",
        topics: [
          t("equilibrio-quimico-intensiva", "Equilibrio químico", "Balance dinámico de reacción."),
          t("constantes-equilibrio-intensiva", "Constantes de equilibrio", "K y su interpretación."),
          t("le-chatelier-intensiva", "Principio de Le Châtelier", "Desplazamiento de equilibrio."),
          t("equilibrio-acido-base-intensiva", "Equilibrio ácido-base", "Sistemas protónicos."),
          t("ph-intensiva", "pH", "Escala de acidez."),
          t("amortiguadores-intensiva", "Amortiguadores", "Control de pH."),
          t("solubilidad-intensiva-2", "Solubilidad", "Sales poco solubles."),
          t("kps-intensiva", "Kps", "Producto de solubilidad."),
        ],
      },
      {
        slug: "termodinamica-termoquimica",
        title: "Módulo 9 · Termodinámica y termoquímica",
        topics: [
          t("termoquimica-intensiva", "Termoquímica", "Calor de reacción."),
          t("entalpia-intensiva", "Entalpía", "Cambios energéticos a presión constante."),
          t("entropia-intensiva", "Entropía", "Dispersión de energía."),
          t("gibbs-intensiva", "Energía libre de Gibbs", "Criterio de espontaneidad."),
          t("espontaneidad-intensiva", "Espontaneidad", "Dirección natural de procesos."),
        ],
      },
      {
        slug: "electroquimica-nuclear",
        title: "Módulo 10 · Electroquímica y química nuclear",
        topics: [
          t("redox-intensiva", "Reacciones redox", "Transferencia electrónica."),
          t("celdas-electroquimicas-intensiva", "Celdas electroquímicas", "Conversión química-eléctrica."),
          t("potenciales-intensiva", "Potenciales", "Potencial electroquímico."),
          t("electrolisis-intensiva", "Electrólisis", "Procesos impulsados eléctricamente."),
          t("quimica-nuclear", "Química nuclear", "Núcleo, decaimientos y energía nuclear."),
          t("procesos-nucleares", "Procesos nucleares", "Fisión, fusión y transformaciones."),
          t("aplicaciones-ambientales-intensiva", "Aplicaciones ambientales", "Impacto y uso responsable."),
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
