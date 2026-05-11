export type TopicExample = {
  statement: string;
  steps: string[];
  conclusion: string;
};

export type TopicExercise = {
  statement: string;
  solution: string;
};

export type TopicContent = {
  /** Tema actual para inyectar en el prompt del tutor IA */
  contextLabel: string;
  /** Párrafos de explicación teórica (texto plano, puede contener $...$ inline KaTeX) */
  theory: string[];
  /** Fórmulas en LaTeX (sin $) que se renderizan en bloque */
  formulas: string[];
  /** Definición formal destacada */
  definition: { title: string; body: string };
  examples: TopicExample[];
  exercises: TopicExercise[];
  /** ID público de un material de GeoGebra (geogebra.org/m/<id>) para la visualización dinámica. */
  geogebraId?: string;
};

const M = (key: string, c: TopicContent): [string, TopicContent] => [key, c];

export const topicContent: Record<string, TopicContent> = Object.fromEntries([
  // ---------------- PRECÁLCULO ----------------
  M("precalculo:dominio-maximo", {
    contextLabel: "Dominio y rango de una función",
    theory: [
      "El dominio de una función real f es el conjunto de todos los valores de x para los cuales f(x) está definido. El rango (o ámbito) es el conjunto de valores que toma f cuando x recorre el dominio.",
      "Para encontrar el dominio máximo de una función dada por una fórmula, identificamos las restricciones algebraicas: denominadores que no pueden ser cero, radicandos pares que deben ser no negativos y argumentos de logaritmos que deben ser positivos.",
      "Por ejemplo, en una función racional el dominio excluye los ceros del denominador; en una función con raíz cuadrada el dominio se obtiene resolviendo una desigualdad; en una función logarítmica resolvemos la inecuación que hace positivo al argumento.",
      "Determinar el rango suele requerir despejar x en función de y o estudiar el comportamiento gráfico (máximos, mínimos, asíntotas) de la función.",
    ],
    formulas: [
      "f(x) = \\dfrac{1}{x-3} \\;\\Rightarrow\\; D_f = \\mathbb{R}\\setminus\\{3\\}",
      "g(x) = \\sqrt{x-2} \\;\\Rightarrow\\; D_g = [2,\\,+\\infty)",
    ],
    definition: {
      title: "Dominio máximo",
      body: "Es el conjunto más grande de números reales x para los que la expresión que define a f(x) produce un número real.",
    },
    examples: [
      {
        statement: "Halla el dominio de f(x) = (x+1)/(x²−4).",
        steps: [
          "Identificamos restricción: el denominador no puede ser cero.",
          "Resolvemos x² − 4 = 0 ⇒ x = 2 o x = −2.",
          "Excluimos esos valores del conjunto de los reales.",
        ],
        conclusion: "D_f = ℝ \\ {−2, 2}.",
      },
      {
        statement: "Halla el dominio de g(x) = √(5 − x).",
        steps: [
          "Restricción: 5 − x ≥ 0.",
          "Despejamos x ≤ 5.",
        ],
        conclusion: "D_g = (−∞, 5].",
      },
      {
        statement: "Halla el dominio de h(x) = ln(x − 1).",
        steps: [
          "Restricción del logaritmo: x − 1 > 0.",
          "Despejamos x > 1.",
        ],
        conclusion: "D_h = (1, +∞).",
      },
    ],
    exercises: [
      { statement: "f(x) = 1/(x²−9)", solution: "D = ℝ \\ {−3, 3}." },
      { statement: "f(x) = √(x²−4)", solution: "x²−4 ≥ 0 ⇒ D = (−∞,−2] ∪ [2,+∞)." },
      { statement: "f(x) = ln(4 − x²)", solution: "4−x² > 0 ⇒ D = (−2, 2)." },
      { statement: "f(x) = √x / (x−1)", solution: "x ≥ 0 y x ≠ 1 ⇒ D = [0,1)∪(1,+∞)." },
      { statement: "f(x) = 1/√(x−3)", solution: "x − 3 > 0 ⇒ D = (3, +∞)." },
    ],
  }),

  M("precalculo:funcion-polinomial", {
    contextLabel: "Función polinomial",
    theory: [
      "Una función polinomial es una función de la forma p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, donde los coeficientes son números reales y n es un entero no negativo llamado grado.",
      "Su dominio es siempre el conjunto de los reales. Las funciones polinomiales son continuas, suaves y su comportamiento al infinito está determinado por el término de mayor grado.",
      "Para hallar sus ceros (raíces) podemos usar factorización, productos notables, división sintética o el teorema de las raíces racionales: si p/q es raíz racional de un polinomio con coeficientes enteros, entonces p divide al término independiente y q al coeficiente principal.",
      "El teorema del factor garantiza que (x − r) es factor de p(x) si y solo si p(r) = 0.",
    ],
    formulas: [
      "p(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0",
      "p(r)=0 \\;\\Longleftrightarrow\\; (x-r)\\mid p(x)",
    ],
    definition: {
      title: "Polinomio de grado n",
      body: "Expresión p(x) = Σ aₖxᵏ con aₙ ≠ 0. El número n se llama grado y aₙ coeficiente principal.",
    },
    examples: [
      {
        statement: "Factoriza p(x) = x³ − 7x + 6.",
        steps: [
          "Posibles raíces racionales: ±1, ±2, ±3, ±6.",
          "Probamos x = 1: 1 − 7 + 6 = 0 ✓.",
          "División sintética por (x−1) da x² + x − 6.",
          "Factorizamos x² + x − 6 = (x+3)(x−2).",
        ],
        conclusion: "p(x) = (x−1)(x−2)(x+3).",
      },
      {
        statement: "Halla los ceros de p(x) = 2x² − 5x − 3.",
        steps: [
          "Aplicamos la fórmula cuadrática.",
          "x = (5 ± √(25+24))/4 = (5 ± 7)/4.",
        ],
        conclusion: "x = 3 o x = −1/2.",
      },
      {
        statement: "Determina el grado y el coeficiente principal de p(x) = −4x⁵ + x² − 9.",
        steps: ["Identificamos la mayor potencia: x⁵.", "El coeficiente que la acompaña es −4."],
        conclusion: "Grado 5, coeficiente principal −4.",
      },
    ],
    exercises: [
      { statement: "Factoriza x³ − x² − 4x + 4", solution: "(x−1)(x−2)(x+2)." },
      { statement: "Halla las raíces de x² − 6x + 9", solution: "x = 3 (raíz doble)." },
      { statement: "¿Es 2 raíz de p(x)=x⁴−3x³+2?", solution: "p(2)=16−24+2=−6 ≠ 0, no lo es." },
      { statement: "Divide x³−2x²+x−2 entre (x−2)", solution: "Cociente x²+1, resto 0." },
      { statement: "Factoriza x⁴ − 16", solution: "(x−2)(x+2)(x²+4)." },
    ],
  }),

  M("precalculo:funcion-racional", {
    contextLabel: "Función racional",
    theory: [
      "Una función racional es el cociente de dos polinomios: f(x) = p(x)/q(x), con q(x) no idénticamente cero.",
      "Su dominio es el conjunto de los reales menos los ceros del denominador. En esos puntos puede haber asíntotas verticales o discontinuidades removibles si también son ceros del numerador.",
      "Las asíntotas horizontales se determinan comparando los grados: si grado(p) < grado(q) la asíntota es y = 0; si son iguales es y = aₙ/bₙ; si grado(p) = grado(q)+1 hay asíntota oblicua que se obtiene por división de polinomios.",
      "Las funciones racionales se simplifican factorizando numerador y denominador y cancelando factores comunes. Esa cancelación produce huecos (discontinuidades removibles) en la gráfica.",
    ],
    formulas: [
      "f(x) = \\dfrac{p(x)}{q(x)}, \\quad q(x)\\neq 0",
      "\\lim_{x\\to\\infty}\\dfrac{a_n x^n + \\dots}{b_m x^m + \\dots} = \\begin{cases}0 & n<m\\\\ a_n/b_m & n=m\\\\ \\pm\\infty & n>m\\end{cases}",
    ],
    definition: {
      title: "Función racional",
      body: "Toda función f que puede escribirse como cociente de dos polinomios con denominador no idénticamente nulo.",
    },
    examples: [
      {
        statement: "Halla las asíntotas de f(x) = (2x²+1)/(x²−4).",
        steps: [
          "Asíntotas verticales: x²−4 = 0 ⇒ x = ±2.",
          "Numerador no se anula en esos puntos, así que ambas son verticales.",
          "Asíntota horizontal: grados iguales, cociente de coeficientes 2/1.",
        ],
        conclusion: "Verticales x = 2, x = −2; horizontal y = 2.",
      },
      {
        statement: "Simplifica (x²−9)/(x−3).",
        steps: [
          "Factor numerador: (x−3)(x+3).",
          "Cancela (x−3) (con x ≠ 3).",
        ],
        conclusion: "f(x) = x + 3 con un hueco en x = 3.",
      },
      {
        statement: "Encuentra la asíntota oblicua de (x²+1)/(x−1).",
        steps: [
          "División: x²+1 = (x−1)(x+1) + 2.",
          "Cociente x + 1, resto 2.",
        ],
        conclusion: "Asíntota oblicua y = x + 1.",
      },
    ],
    exercises: [
      { statement: "Asíntotas de f(x) = 1/(x−5)", solution: "Vertical x = 5, horizontal y = 0." },
      { statement: "Dominio de (x+2)/(x²−1)", solution: "ℝ \\ {−1, 1}." },
      { statement: "Simplifica (x²−1)/(x²−x)", solution: "(x+1)/x con x ≠ 0, 1." },
      { statement: "Asíntota horizontal de (3x+1)/(2x−5)", solution: "y = 3/2." },
      { statement: "¿Tiene asíntota oblicua (x³)/(x²+1)?", solution: "Sí, por división y = x." },
    ],
  }),

  M("precalculo:funcion-logaritmica", {
    contextLabel: "Funciones exponencial y logarítmica",
    theory: [
      "La función exponencial de base a > 0, a ≠ 1, se define como f(x) = aˣ. Su dominio es ℝ y su rango (0, +∞). Es creciente si a > 1 y decreciente si 0 < a < 1.",
      "La función logarítmica de base a es la inversa de la exponencial: y = logₐ(x) ⇔ aʸ = x. Su dominio es (0, +∞) y su rango ℝ.",
      "Las propiedades fundamentales son: log(xy) = log x + log y, log(x/y) = log x − log y, log(xⁿ) = n·log x, y el cambio de base log_a x = (ln x)/(ln a).",
      "La constante e ≈ 2.718 da lugar al logaritmo natural ln x = log_e x, omnipresente en cálculo por sus derivadas e integrales especialmente sencillas.",
    ],
    formulas: [
      "y = \\log_a x \\;\\Longleftrightarrow\\; a^y = x",
      "\\log_a(xy) = \\log_a x + \\log_a y, \\qquad \\log_a(x^n) = n\\log_a x",
    ],
    definition: {
      title: "Logaritmo",
      body: "Para a > 0 y a ≠ 1, log_a x es el único número real y tal que aʸ = x, definido para x > 0.",
    },
    examples: [
      {
        statement: "Resuelve 2^(x+1) = 32.",
        steps: ["Escribimos 32 = 2⁵.", "Igualamos exponentes: x+1 = 5."],
        conclusion: "x = 4.",
      },
      {
        statement: "Resuelve log₃(x−2) = 2.",
        steps: ["Pasamos a forma exponencial: x−2 = 3² = 9.", "Despejamos x = 11.", "Verificamos x−2 > 0 ✓."],
        conclusion: "x = 11.",
      },
      {
        statement: "Simplifica log₂(8) + log₂(4) − log₂(2).",
        steps: ["log₂(8)=3, log₂(4)=2, log₂(2)=1.", "Sumamos 3 + 2 − 1."],
        conclusion: "Resultado 4.",
      },
    ],
    exercises: [
      { statement: "Resuelve 3^x = 81", solution: "x = 4." },
      { statement: "Resuelve log(x) + log(x−3) = 1", solution: "log(x(x−3))=1 ⇒ x²−3x=10 ⇒ x=5." },
      { statement: "Dominio de f(x)=ln(x²−1)", solution: "x²−1>0 ⇒ (−∞,−1)∪(1,+∞)." },
      { statement: "Reescribe ln(a²b/√c)", solution: "2 ln a + ln b − ½ ln c." },
      { statement: "Resuelve e^(2x) = 7", solution: "x = (ln 7)/2." },
    ],
  }),

  M("precalculo:funciones-trig-inversas", {
    contextLabel: "Funciones trigonométricas e inversas",
    theory: [
      "Las funciones trigonométricas relacionan ángulos con razones de longitudes en un triángulo rectángulo o, más generalmente, con coordenadas sobre la circunferencia unitaria.",
      "Las funciones seno y coseno tienen dominio ℝ, rango [−1, 1] y período 2π. La tangente tiene período π y asíntotas verticales en x = π/2 + kπ.",
      "Para definir inversas hay que restringir el dominio: arcsin: [−1,1] → [−π/2, π/2]; arccos: [−1,1] → [0, π]; arctan: ℝ → (−π/2, π/2).",
      "Las identidades fundamentales sin²x + cos²x = 1 y la fórmula de suma sin(a+b) = sin a cos b + cos a sin b permiten simplificar expresiones y resolver ecuaciones trigonométricas.",
    ],
    formulas: [
      "\\sin^2 x + \\cos^2 x = 1",
      "\\sin(a\\pm b) = \\sin a\\cos b \\pm \\cos a \\sin b",
    ],
    definition: {
      title: "Circunferencia trigonométrica",
      body: "Es la circunferencia de radio 1 centrada en el origen. Para un ángulo θ, el punto (cos θ, sin θ) está sobre ella.",
    },
    examples: [
      {
        statement: "Resuelve sin x = 1/2 en [0, 2π).",
        steps: ["Ángulos de referencia: x = π/6.", "En el segundo cuadrante también x = π − π/6."],
        conclusion: "x = π/6 o x = 5π/6.",
      },
      {
        statement: "Calcula arccos(−1/2).",
        steps: ["Buscamos y ∈ [0, π] con cos y = −1/2.", "y = 2π/3."],
        conclusion: "arccos(−1/2) = 2π/3.",
      },
      {
        statement: "Simplifica sin(x)cos(x) usando doble ángulo.",
        steps: ["Identidad: sin(2x) = 2 sin x cos x.", "Despejamos sin x cos x = sin(2x)/2."],
        conclusion: "sin x cos x = ½ sin(2x).",
      },
    ],
    exercises: [
      { statement: "Resuelve cos x = 0 en [0, 2π)", solution: "x = π/2 o x = 3π/2." },
      { statement: "Calcula arctan(1)", solution: "π/4." },
      { statement: "Simplifica 1 − sin² x", solution: "cos² x." },
      { statement: "Resuelve 2 sin x − 1 = 0 en [0, 2π)", solution: "x = π/6 o 5π/6." },
      { statement: "Calcula sin(75°) usando suma de ángulos", solution: "sin(45°+30°) = (√6+√2)/4." },
    ],
  }),

  // ---------------- CÁLCULO 1 ----------------
  M("calculo-1:limites-intuitivo", {
    contextLabel: "Límites: concepto intuitivo y límites laterales",
    theory: [
      "Decir que el límite de f(x) cuando x tiende a a es L significa que los valores de f(x) se aproximan tanto como queramos a L cuando x se aproxima a a, sin necesariamente igualar a a.",
      "Los límites laterales miran qué ocurre al acercarse por un solo lado: lim x→a⁻ f(x) usa valores menores que a y lim x→a⁺ usa valores mayores. El límite global existe si y solo si ambos laterales existen y coinciden.",
      "Esta noción permite estudiar comportamiento local de funciones que están indefinidas en a o que presentan saltos. Es la base de la continuidad y de la derivada.",
      "Numéricamente podemos estimar un límite construyendo una tabla de valores que se acerquen a a por ambos lados; gráficamente seguimos la curva acercándonos al punto.",
    ],
    formulas: [
      "\\lim_{x\\to a} f(x) = L \\;\\Longleftrightarrow\\; \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L",
      "\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1",
    ],
    definition: {
      title: "Definición ε–δ",
      body: "lim x→a f(x) = L si para todo ε > 0 existe δ > 0 tal que 0 < |x−a| < δ implica |f(x) − L| < ε.",
    },
    examples: [
      {
        statement: "Calcula lim x→2 (x²−4)/(x−2).",
        steps: [
          "La sustitución directa da 0/0 (indeterminación).",
          "Factorizamos: (x−2)(x+2)/(x−2).",
          "Cancelamos (x−2) (con x ≠ 2) ⇒ x+2.",
          "Sustituimos x = 2 en x+2.",
        ],
        conclusion: "El límite vale 4.",
      },
      {
        statement: "Estudia los límites laterales de f(x) = |x|/x en x = 0.",
        steps: [
          "Para x > 0: |x|/x = 1.",
          "Para x < 0: |x|/x = −1.",
          "Los laterales son distintos.",
        ],
        conclusion: "El límite no existe en x = 0.",
      },
      {
        statement: "Calcula lim x→1 (x³−1)/(x−1).",
        steps: [
          "Indeterminación 0/0.",
          "Factor: x³−1 = (x−1)(x²+x+1).",
          "Cancelamos y evaluamos en x = 1.",
        ],
        conclusion: "El límite vale 3.",
      },
    ],
    exercises: [
      { statement: "lim x→3 (x²−9)/(x−3)", solution: "Factor (x−3)(x+3)/(x−3) ⇒ 6." },
      { statement: "lim x→0 (sin 3x)/x", solution: "= 3 · lim sin(3x)/(3x) = 3." },
      { statement: "lim x→0⁺ 1/x", solution: "+∞ (no existe finito)." },
      { statement: "lim x→4 (√x − 2)/(x − 4)", solution: "Racionaliza ⇒ 1/(√x+2) ⇒ 1/4." },
      { statement: "lim x→2 (x²−4)/(x²−5x+6)", solution: "(x−2)(x+2)/((x−2)(x−3)) ⇒ −4." },
    ],
  }),

  M("calculo-1:tecnicas-limites", {
    contextLabel: "Técnicas algebraicas de cálculo de límites",
    theory: [
      "Cuando la sustitución directa produce una indeterminación (típicamente 0/0 o ∞/∞), debemos manipular algebraicamente la expresión para revelar el límite.",
      "Las técnicas más útiles son: factorización y cancelación de factores comunes, racionalización (multiplicar por el conjugado cuando hay raíces), división por la mayor potencia de x para límites al infinito y uso de límites notables como sin(x)/x → 1.",
      "Algunos cambios de variable convierten un límite complicado en otro conocido. Por ejemplo, hacer u = √x convierte una raíz en una variable polinómica.",
      "El teorema del emparedado (compresión) afirma que si g(x) ≤ f(x) ≤ h(x) cerca de a y g, h tienen el mismo límite L en a, entonces f también tiene límite L.",
    ],
    formulas: [
      "\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2} = \\dfrac12",
      "\\lim_{x\\to\\infty}\\left(1+\\tfrac{1}{x}\\right)^x = e",
    ],
    definition: {
      title: "Indeterminaciones clásicas",
      body: "Las formas 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0⁰ y ∞⁰ no permiten concluir el límite directamente y requieren técnicas específicas.",
    },
    examples: [
      {
        statement: "Calcula lim x→0 (√(x+1) − 1)/x.",
        steps: [
          "Indeterminación 0/0; multiplicamos por el conjugado (√(x+1)+1).",
          "Numerador: (x+1) − 1 = x.",
          "Queda 1/(√(x+1)+1).",
          "Sustituimos x = 0.",
        ],
        conclusion: "El límite vale 1/2.",
      },
      {
        statement: "Calcula lim x→∞ (3x² + 2x)/(5x² − 1).",
        steps: ["Dividimos numerador y denominador por x².", "Queda (3 + 2/x)/(5 − 1/x²).", "Términos con 1/x → 0."],
        conclusion: "Límite = 3/5.",
      },
      {
        statement: "Usa el teorema del emparedado para lim x→0 x² sin(1/x).",
        steps: [
          "Acotamos: −x² ≤ x² sin(1/x) ≤ x².",
          "lim x→0 x² = 0 y lim x→0 −x² = 0.",
          "Por compresión el límite del medio es 0.",
        ],
        conclusion: "El límite vale 0.",
      },
    ],
    exercises: [
      { statement: "lim x→0 (1−cos x)/x", solution: "Multiplica por (1+cos x); el resultado es 0." },
      { statement: "lim x→∞ (2x³−x)/(x³+5)", solution: "Coeficientes principales: 2." },
      { statement: "lim x→0 tan(2x)/x", solution: "= 2 · lim sin(2x)/(2x cos(2x)) = 2." },
      { statement: "lim x→9 (√x − 3)/(x − 9)", solution: "Racionaliza ⇒ 1/6." },
      { statement: "lim x→∞ (√(x²+1) − x)", solution: "Multiplica por conjugado ⇒ 0." },
    ],
  }),

  M("calculo-1:continuidad", {
    contextLabel: "Continuidad de una función",
    theory: [
      "Una función f es continua en x = a si se cumplen tres condiciones: f(a) está definida, lim x→a f(x) existe y dicho límite coincide con f(a).",
      "La continuidad en un intervalo significa continuidad en cada uno de sus puntos. En extremos se exige solo la continuidad lateral correspondiente.",
      "Las funciones polinomiales, racionales (en su dominio), exponenciales, logarítmicas, trigonométricas y combinaciones algebraicas de continuas son continuas en su dominio.",
      "Los tipos de discontinuidad son removible (el límite existe pero f(a) no coincide o no está definida), de salto (los laterales son finitos pero distintos) e infinita (el límite es ±∞).",
    ],
    formulas: [
      "f \\text{ continua en } a \\iff \\lim_{x\\to a} f(x) = f(a)",
      "f,g \\text{ continuas} \\Rightarrow f+g,\\;fg,\\; f/g\\;(g\\neq 0) \\text{ continuas}",
    ],
    definition: {
      title: "Continuidad puntual",
      body: "f es continua en a si y solo si para todo ε > 0 existe δ > 0 tal que |x − a| < δ implica |f(x) − f(a)| < ε.",
    },
    examples: [
      {
        statement: "¿Es continua f(x) = (x²−1)/(x−1) en x = 1?",
        steps: ["f(1) no está definida (denominador 0).", "Aunque lim x→1 f(x) = 2, falla la primera condición."],
        conclusion: "Discontinuidad removible en x = 1.",
      },
      {
        statement: "Clasifica la discontinuidad de f(x) = 1/x en x = 0.",
        steps: ["Laterales: x→0⁻ ⇒ −∞; x→0⁺ ⇒ +∞.", "El límite es infinito por ambos lados (con signos distintos)."],
        conclusion: "Discontinuidad infinita en x = 0.",
      },
      {
        statement: "Encuentra k para que f(x) = {x+k si x<2, 3x−1 si x≥2} sea continua en 2.",
        steps: ["Igualamos límites: 2 + k = 3·2 − 1 = 5.", "Despejamos k = 3."],
        conclusion: "k = 3.",
      },
    ],
    exercises: [
      { statement: "¿Dónde es continua f(x)=√(x−1)?", solution: "En [1, +∞)." },
      { statement: "Clasifica la discontinuidad de f(x)=(x−2)/(x²−4) en x=2", solution: "Removible." },
      { statement: "Halla k: f(x)={2x si x<1, x²+k si x≥1} continua", solution: "1+k=2 ⇒ k=1." },
      { statement: "¿Es continua tan(x) en x=π/2?", solution: "No, discontinuidad infinita." },
      { statement: "¿Es f(x)=|x| continua en 0?", solution: "Sí, ambos laterales valen 0 = f(0)." },
    ],
  }),

  M("calculo-1:definicion-derivada", {
    contextLabel: "Definición e interpretación de la derivada",
    theory: [
      "La derivada de f en a, denotada f'(a), mide la tasa instantánea de cambio de f en ese punto. Geométricamente es la pendiente de la recta tangente a la gráfica de f en (a, f(a)).",
      "Se define como un límite: f'(a) = lim h→0 (f(a+h) − f(a))/h, siempre que el límite exista. Si existe decimos que f es derivable en a.",
      "La derivabilidad implica continuidad, pero no al revés: la función |x| es continua en 0 pero no derivable allí porque la pendiente cambia bruscamente.",
      "La función derivada f' asigna a cada punto donde f es derivable el valor de la pendiente. Sus aplicaciones incluyen velocidad, aceleración, optimización y análisis de gráficas.",
    ],
    formulas: [
      "f'(a) = \\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}",
      "f'(a) = \\lim_{x\\to a}\\dfrac{f(x)-f(a)}{x-a}",
    ],
    definition: {
      title: "Derivada en un punto",
      body: "f es derivable en a si existe el límite f'(a) = lim h→0 (f(a+h) − f(a))/h.",
    },
    examples: [
      {
        statement: "Calcula la derivada de f(x) = x² en x = 3 por definición.",
        steps: [
          "f(3+h) = (3+h)² = 9 + 6h + h².",
          "f(3+h) − f(3) = 6h + h².",
          "Cociente: (6h+h²)/h = 6 + h.",
          "Tomamos límite h → 0.",
        ],
        conclusion: "f'(3) = 6.",
      },
      {
        statement: "Halla f'(x) si f(x) = √x.",
        steps: [
          "Cociente: (√(x+h) − √x)/h.",
          "Multiplicamos por conjugado ⇒ h/[h(√(x+h)+√x)].",
          "Simplificamos y tomamos h → 0.",
        ],
        conclusion: "f'(x) = 1/(2√x).",
      },
      {
        statement: "Halla la ecuación de la recta tangente a y = x² en x = 1.",
        steps: ["f'(x)=2x ⇒ pendiente m = 2.", "Punto (1,1).", "Recta y − 1 = 2(x − 1)."],
        conclusion: "y = 2x − 1.",
      },
    ],
    exercises: [
      { statement: "Por definición, derivada de f(x)=3x+2", solution: "Cociente (3h)/h = 3 ⇒ f'(x)=3." },
      { statement: "Por definición, derivada de f(x)=x³ en x=2", solution: "12." },
      { statement: "¿Es derivable f(x)=|x| en 0?", solution: "No, los laterales 1 y −1 difieren." },
      { statement: "Tangente a y=1/x en x=1", solution: "Pendiente −1, recta y = −x + 2." },
      { statement: "Derivada por definición de f(x)=1/x", solution: "−1/x²." },
    ],
  }),

  M("calculo-1:reglas-derivacion", {
    contextLabel: "Reglas de derivación",
    theory: [
      "Las reglas de derivación permiten calcular derivadas sin recurrir cada vez a la definición. Las básicas son la regla de la potencia, suma, producto, cociente y cadena.",
      "Regla de la potencia: si f(x) = xⁿ entonces f'(x) = n xⁿ⁻¹ (válida para cualquier exponente real).",
      "Regla del producto: (fg)' = f'g + fg'. Regla del cociente: (f/g)' = (f'g − fg')/g². Regla de la cadena: (f∘g)'(x) = f'(g(x))·g'(x).",
      "Combinando estas reglas con derivadas conocidas (sin'=cos, cos'=−sin, (eˣ)'=eˣ, (ln x)'=1/x) se calcula casi cualquier derivada elemental.",
    ],
    formulas: [
      "(f g)' = f' g + f g', \\qquad \\left(\\dfrac{f}{g}\\right)' = \\dfrac{f' g - f g'}{g^2}",
      "(f\\circ g)'(x) = f'(g(x))\\cdot g'(x)",
    ],
    definition: {
      title: "Regla de la cadena",
      body: "Si y = f(u) y u = g(x) son derivables, entonces dy/dx = (dy/du)(du/dx) = f'(g(x))·g'(x).",
    },
    examples: [
      {
        statement: "Deriva f(x) = (3x² + 1)·sin(x).",
        steps: [
          "Aplicamos producto con u = 3x²+1 (u'=6x) y v = sin x (v'=cos x).",
          "(uv)' = 6x·sin x + (3x²+1)·cos x.",
        ],
        conclusion: "f'(x) = 6x sin x + (3x² + 1) cos x.",
      },
      {
        statement: "Deriva g(x) = sin(x²).",
        steps: ["Cadena con u = x² ⇒ u'=2x.", "g'(x) = cos(u)·u' = cos(x²)·2x."],
        conclusion: "g'(x) = 2x cos(x²).",
      },
      {
        statement: "Deriva h(x) = (x+1)/(x²+1).",
        steps: [
          "Cociente: numerador 1·(x²+1) − (x+1)·2x.",
          "Simplificamos numerador: x²+1 − 2x²−2x = −x²−2x+1.",
        ],
        conclusion: "h'(x) = (−x² − 2x + 1)/(x² + 1)².",
      },
    ],
    exercises: [
      { statement: "Deriva f(x) = x⁵ − 3x² + 7", solution: "5x⁴ − 6x." },
      { statement: "Deriva f(x) = e^(2x)", solution: "2 e^(2x)." },
      { statement: "Deriva f(x) = ln(x² + 1)", solution: "2x/(x²+1)." },
      { statement: "Deriva f(x) = x² cos(x)", solution: "2x cos x − x² sin x." },
      { statement: "Deriva f(x) = √(3x+1)", solution: "3/(2√(3x+1))." },
    ],
  }),

  M("calculo-1:integral-indefinida", {
    contextLabel: "Integral indefinida",
    theory: [
      "Una antiderivada (o primitiva) de f es una función F tal que F'(x) = f(x). La integral indefinida ∫f(x) dx denota la familia de todas las antiderivadas y se escribe F(x) + C, donde C es una constante arbitraria.",
      "La integración es la operación inversa de la derivación. Las reglas básicas son la linealidad ∫(a f + b g) = a∫f + b∫g y la regla de la potencia ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, válida para n ≠ −1.",
      "Para n = −1 tenemos ∫ dx/x = ln|x| + C. Otras integrales fundamentales son ∫ eˣ dx = eˣ + C, ∫ sin x dx = −cos x + C, ∫ cos x dx = sin x + C.",
      "Métodos avanzados como sustitución y partes permiten reducir integrales complejas a estas formas básicas.",
    ],
    formulas: [
      "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C,\\quad n\\neq -1",
      "\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C",
    ],
    definition: {
      title: "Antiderivada",
      body: "F es antiderivada de f en un intervalo si F'(x) = f(x) para todo x del intervalo. Dos antiderivadas difieren en una constante.",
    },
    examples: [
      {
        statement: "Calcula ∫ (3x² − 4x + 5) dx.",
        steps: [
          "Linealidad: separamos en tres integrales.",
          "∫3x²dx = x³, ∫−4x dx = −2x², ∫5 dx = 5x.",
          "Sumamos y añadimos C.",
        ],
        conclusion: "x³ − 2x² + 5x + C.",
      },
      {
        statement: "Calcula ∫ (1/x + e^x) dx.",
        steps: ["∫1/x dx = ln|x|.", "∫eˣ dx = eˣ.", "Sumamos."],
        conclusion: "ln|x| + eˣ + C.",
      },
      {
        statement: "Verifica que F(x) = x sin x es antiderivada de f(x) = sin x + x cos x.",
        steps: ["Derivamos F: F'(x) = sin x + x cos x.", "Coincide con f."],
        conclusion: "Sí, F es antiderivada de f.",
      },
    ],
    exercises: [
      { statement: "∫ (2x + 3) dx", solution: "x² + 3x + C." },
      { statement: "∫ √x dx", solution: "(2/3) x^(3/2) + C." },
      { statement: "∫ cos(x) dx", solution: "sin x + C." },
      { statement: "∫ (x³ − 1/x²) dx", solution: "x⁴/4 + 1/x + C." },
      { statement: "∫ 5 e^x dx", solution: "5 e^x + C." },
    ],
  }),

  M("calculo-1:tfc", {
    contextLabel: "Teorema fundamental del cálculo",
    theory: [
      "El Teorema Fundamental del Cálculo (TFC) conecta los conceptos de derivada e integral, mostrando que son operaciones inversas. Tiene dos partes que suelen enunciarse por separado.",
      "Primera parte: si f es continua en [a,b] y definimos F(x) = ∫ₐˣ f(t) dt, entonces F es derivable y F'(x) = f(x). Es decir, derivar una integral con extremo variable devuelve el integrando.",
      "Segunda parte (regla de Barrow): si F es cualquier antiderivada de f en [a,b], entonces ∫ₐᵇ f(x) dx = F(b) − F(a). Esto reduce el cálculo de integrales definidas a evaluar antiderivadas.",
      "El TFC justifica geométricamente que la integral definida representa el área neta entre la gráfica de f y el eje x, sumando con signo según f sea positiva o negativa.",
    ],
    formulas: [
      "\\dfrac{d}{dx}\\int_a^x f(t)\\,dt = f(x)",
      "\\int_a^b f(x)\\,dx = F(b) - F(a),\\quad F'=f",
    ],
    definition: {
      title: "Regla de Barrow",
      body: "Si f es continua en [a,b] y F es una antiderivada de f, entonces ∫ₐᵇ f(x) dx = F(b) − F(a).",
    },
    examples: [
      {
        statement: "Calcula ∫₀² 3x² dx.",
        steps: [
          "Antiderivada: F(x) = x³.",
          "F(2) − F(0) = 8 − 0.",
        ],
        conclusion: "El valor es 8.",
      },
      {
        statement: "Calcula d/dx ∫₁ˣ ln(t) dt.",
        steps: ["Por la primera parte del TFC el resultado es el integrando evaluado en x.", "Resultado: ln(x)."],
        conclusion: "ln(x).",
      },
      {
        statement: "Calcula ∫₀^π sin x dx.",
        steps: ["Antiderivada: −cos x.", "[−cos π] − [−cos 0] = 1 − (−1)."],
        conclusion: "El valor es 2.",
      },
    ],
    exercises: [
      { statement: "∫₀¹ (2x+1) dx", solution: "[x²+x] de 0 a 1 = 2." },
      { statement: "∫₁ᵉ (1/x) dx", solution: "ln e − ln 1 = 1." },
      { statement: "d/dx ∫₂ˣ (t² + 1) dt", solution: "x² + 1." },
      { statement: "∫₀^(π/2) cos x dx", solution: "sin(π/2) − sin 0 = 1." },
      { statement: "∫₋₁¹ x² dx", solution: "[x³/3] de −1 a 1 = 2/3." },
    ],
  }),
] satisfies Array<[string, TopicContent]>);

export const getTopicContent = (courseSlug: string, topicSlug: string): TopicContent | undefined =>
  topicContent[`${courseSlug}:${topicSlug}`];
