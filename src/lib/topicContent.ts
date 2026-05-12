export type TopicExample = {
  statement: string;
  steps: string[];
  conclusion: string;
};

export type TopicExercise = {
  statement: string;
  solution: string;
};

export type TopicTheorySection = {
  title: string;
  body: string[];
};

export type TopicContent = {
  /** Tema actual para inyectar en el prompt del tutor IA */
  contextLabel: string;
  /** Párrafos de explicación teórica (texto plano, puede contener $...$ inline KaTeX) */
  theory: string[];
  /** Bloques opcionales para organizar teoría extensa en secciones colapsables */
  theorySections?: TopicTheorySection[];
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

const limitesIntuitivoContent: TopicContent = {
  contextLabel: "Concepto intuitivo de límite y límites laterales",
  geogebraId: "Jf7rP6uK",
  theory: [
    "Un límite describe hacia qué valor se dirige $f(x)$ cuando $x$ se acerca a un número $a$. La idea central es aproximarse: observamos valores de $x$ cada vez más cercanos a $a$, pero no necesitamos que $x$ sea exactamente igual a $a$.",
    "Esta separación entre acercarse y llegar es esencial. Puede ocurrir que $f(a)$ no exista, que exista pero tenga otro valor, o que coincida perfectamente con el valor al que se aproxima la función. El límite se preocupa por el comportamiento alrededor de $a$, no solo por el punto aislado.",
    "En cálculo, los límites son el lenguaje de lo instantáneo. La pendiente de una tangente, la velocidad en un instante, la continuidad de una curva y el área acumulada se construyen tomando procesos de aproximación y haciéndolos tan finos como sea necesario.",
    "Gráficamente, calcular $\\lim_{x\\to a} f(x)$ significa seguir la curva desde la izquierda y desde la derecha hacia la vertical $x=a$. Si ambas ramas se acercan a la misma altura $L$, el límite existe y vale $L$.",
    "Numéricamente, una tabla ayuda a detectar el patrón: elegimos valores como $a-0.1$, $a-0.01$, $a+0.01$ y $a+0.1$. La tabla no demuestra por sí sola el límite, pero orienta la conjetura y revela saltos, huecos u oscilaciones.",
    "Los límites laterales distinguen direcciones. El límite por la izquierda, $\\lim_{x\\to a^-} f(x)$, usa valores $x<a$; el límite por la derecha, $\\lim_{x\\to a^+} f(x)$, usa valores $x>a$. El límite general existe exactamente cuando ambos laterales existen y son iguales.",
    "La continuidad conecta el límite con el valor de la función: $f$ es continua en $a$ cuando $f(a)$ existe, $\\lim_{x\\to a} f(x)$ existe y ambos valores coinciden. Si el límite existe pero el punto está ausente o mal definido, aparece una discontinuidad removible; si los laterales son distintos, aparece una discontinuidad de salto.",
    "Un límite puede no existir por varias razones: los laterales llegan a alturas distintas, los valores crecen sin cota hacia $\\pm\\infty$, o la función oscila indefinidamente sin estabilizarse. En una oscilación como $\\sin(1/x)$ cerca de $0$, acercarse más no calma la gráfica: la hace vibrar más rápido.",
  ],
  formulas: [
    "\\lim_{x\\to a} f(x)=L",
    "\\lim_{x\\to a^-} f(x)=L_1, \\qquad \\lim_{x\\to a^+} f(x)=L_2",
    "\\lim_{x\\to a} f(x)=L \\;\\Longleftrightarrow\\; \\lim_{x\\to a^-} f(x)=\\lim_{x\\to a^+} f(x)=L",
    "\\text{Si } f \\text{ es continua en } a, \\text{ entonces } \\lim_{x\\to a} f(x)=f(a)",
    "f(x)=\\begin{cases}x+2, & x< -1\\\\ x^2, & -1\\le x<1\\\\ 2, & x=1\\\\ 3-x, & x>1\\end{cases}",
    "\\lim_{x\\to 1^-} x^2=1, \\qquad \\lim_{x\\to 1^+}(3-x)=2, \\qquad \\lim_{x\\to 1} f(x) \\text{ no existe}",
    "\\lim_{x\\to -1^-}(x+2)=1, \\qquad \\lim_{x\\to -1^+}x^2=1, \\qquad \\lim_{x\\to -1} f(x)=1",
    "\\lim_{x\\to a}\\dfrac{x^2-a^2}{x-a}=2a \\quad (x\\ne a)",
  ],
  definition: {
    title: "Definición formal de límite",
    body:
      "Decimos que $\\lim_{x\\to a} f(x)=L$ si para todo margen de error $\\varepsilon>0$ alrededor de $L$ existe una distancia $\\delta>0$ alrededor de $a$ tal que, siempre que $0<|x-a|<\\delta$, se cumple $|f(x)-L|<\\varepsilon$. La condición $0<|x-a|$ excluye el punto $x=a$: el límite controla la cercanía, no el valor exacto en el punto.",
  },
  examples: [
    {
      statement: "Interpreta una tabla: al acercarse $x$ a $2$, los valores de $f(x)$ son $3.9$, $3.99$, $4.01$ y $4.1$.",
      steps: [
        "Los valores de $x$ se aproximan a $2$ desde ambos lados.",
        "Los valores de $f(x)$ se agrupan alrededor de $4$.",
        "La tabla sugiere un valor de llegada común.",
      ],
      conclusion: "La evidencia numérica apunta a $\\lim_{x\\to 2} f(x)=4$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}$.",
      steps: [
        "La sustitución directa produce $0/0$, así que no concluimos todavía.",
        "Factorizamos: $x^2-4=(x-2)(x+2)$.",
        "Para $x\\ne2$, $\\dfrac{(x-2)(x+2)}{x-2}=x+2$.",
        "Ahora evaluamos el comportamiento cercano: $x+2\\to4$ cuando $x\\to2$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}=4$. La gráfica tiene un hueco, no un salto.",
    },
    {
      statement: "Sea $g(x)=\\begin{cases}x+2, & x< -1\\\\ x^2, & x\\ge -1\\end{cases}$. Estudia el límite en $x=-1$.",
      steps: [
        "Por la izquierda usamos $x+2$: $\\lim_{x\\to -1^-}(x+2)=1$.",
        "Por la derecha usamos $x^2$: $\\lim_{x\\to -1^+}x^2=1$.",
        "Los dos límites laterales coinciden.",
      ],
      conclusion: "$\\lim_{x\\to -1}g(x)=1$. Además, como $g(-1)=1$, la función es continua en $-1$.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}x^2, & x<1\\\\ 2, & x=1\\\\ 3-x, & x>1\\end{cases}$. Decide si existe $\\lim_{x\\to1}f(x)$.",
      steps: [
        "Por la izquierda, la rama activa es $x^2$, entonces $\\lim_{x\\to1^-}f(x)=1$.",
        "Por la derecha, la rama activa es $3-x$, entonces $\\lim_{x\\to1^+}f(x)=2$.",
        "Aunque $f(1)=2$, el valor del punto no arregla la diferencia entre laterales.",
      ],
      conclusion: "El límite general no existe porque $1\\ne2$. Hay una discontinuidad de salto en $x=1$.",
    },
    {
      statement: "Analiza $h(x)=\\dfrac{x^2-1}{x-1}$ en $x=1$.",
      steps: [
        "La función original no está definida en $x=1$.",
        "Factorizamos: $x^2-1=(x-1)(x+1)$.",
        "Para $x\\ne1$, $h(x)=x+1$.",
        "La curva se aproxima a $2$ desde ambos lados.",
      ],
      conclusion: "$\\lim_{x\\to1}h(x)=2$. La discontinuidad es removible: bastaría definir $h(1)=2$.",
    },
    {
      statement: "Estudia $\\displaystyle\\lim_{x\\to0}\\dfrac{|x|}{x}$.",
      steps: [
        "Si $x>0$, entonces $|x|=x$ y $\\dfrac{|x|}{x}=1$.",
        "Si $x<0$, entonces $|x|=-x$ y $\\dfrac{|x|}{x}=-1$.",
        "Los laterales existen, pero no coinciden.",
      ],
      conclusion: "El límite no existe: $\\lim_{x\\to0^-}\\dfrac{|x|}{x}=-1$ y $\\lim_{x\\to0^+}\\dfrac{|x|}{x}=1$.",
    },
    {
      statement: "Explica por qué $\\displaystyle\\lim_{x\\to0}\\sin\\left(\\dfrac{1}{x}\\right)$ no existe.",
      steps: [
        "Cuando $x$ se acerca a $0$, el número $1/x$ crece en magnitud.",
        "La función seno sigue oscilando entre $-1$ y $1$.",
        "No hay una altura única hacia la cual se estabilicen los valores.",
      ],
      conclusion: "El límite no existe por comportamiento oscilatorio.",
    },
  ],
  exercises: [
    { statement: "Tabla: si $x\\to3$ y $f(x)$ se acerca a $7$ por ambos lados, escribe el límite.", solution: "$\\lim_{x\\to3}f(x)=7$." },
    { statement: "En una gráfica, ambas ramas se acercan al punto abierto $(2,5)$ y hay un punto cerrado en $(2,1)$. ¿Cuál es el límite?", solution: "$\\lim_{x\\to2}f(x)=5$; el valor $f(2)=1$ no cambia el límite." },
    { statement: "Si $\\lim_{x\\to a^-}f(x)=4$ y $\\lim_{x\\to a^+}f(x)=4$, ¿existe $\\lim_{x\\to a}f(x)$?", solution: "Sí, existe y vale $4$." },
    { statement: "Si $\\lim_{x\\to a^-}f(x)=2$ y $\\lim_{x\\to a^+}f(x)=5$, ¿existe el límite general?", solution: "No. Los límites laterales son distintos." },
    { statement: "$\\displaystyle\\lim_{x\\to3}(2x-1)$", solution: "Por sustitución directa: $2(3)-1=5$." },
    { statement: "$\\displaystyle\\lim_{x\\to -1}(x^2+3x)$", solution: "$(-1)^2+3(-1)=-2$." },
    { statement: "$\\displaystyle\\lim_{x\\to4}\\dfrac{x^2-16}{x-4}$", solution: "Factoriza: $\\dfrac{(x-4)(x+4)}{x-4}\\to8$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-1}{x-1}$", solution: "$x^3-1=(x-1)(x^2+x+1)$, así que el límite es $3$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{x+9}-3}{x}$", solution: "Racionaliza: $\\dfrac{1}{\\sqrt{x+9}+3}\\to\\dfrac{1}{6}$." },
    { statement: "Sea $f(x)=\\begin{cases}x+1,&x<2\\\\5,&x=2\\\\x^2-1,&x>2\\end{cases}$. Halla los límites laterales en $2$.", solution: "Izquierda: $3$. Derecha: $3$. El límite general existe y vale $3$." },
    { statement: "Sea $f(x)=\\begin{cases}2x,&x<1\\\\4,&x=1\\\\x+1,&x>1\\end{cases}$. Decide si existe $\\lim_{x\\to1}f(x)$.", solution: "Izquierda: $2$. Derecha: $2$. Existe y vale $2$, aunque $f(1)=4$." },
    { statement: "Sea $f(x)=\\begin{cases}x^2,&x<0\\\\x+2,&x\\ge0\\end{cases}$. Decide si existe $\\lim_{x\\to0}f(x)$.", solution: "Izquierda: $0$. Derecha: $2$. No existe." },
    { statement: "Clasifica: el límite existe en $a$, pero $f(a)$ no está definido.", solution: "Discontinuidad removible." },
    { statement: "Clasifica: los límites laterales en $a$ son finitos pero distintos.", solution: "Discontinuidad de salto; el límite general no existe." },
    { statement: "$\\displaystyle\\lim_{x\\to0^+}\\dfrac{1}{x}$", solution: "Crece sin cota: $+\\infty$. No es un límite finito." },
    { statement: "$\\displaystyle\\lim_{x\\to0^-}\\dfrac{1}{x}$", solution: "Decrece sin cota: $-\\infty$. No es un límite finito." },
    { statement: "¿Existe $\\displaystyle\\lim_{x\\to0}\\cos\\left(\\dfrac{1}{x}\\right)$?", solution: "No. Oscila entre $-1$ y $1$ sin acercarse a un único valor." },
    { statement: "Para $p(x)=\\dfrac{x^2-a^2}{x-a}$ con $x\\ne a$, halla $\\lim_{x\\to a}p(x)$.", solution: "Factoriza $x^2-a^2=(x-a)(x+a)$; el límite es $2a$." },
  ],
};

const limitesInfinitosContent: TopicContent = {
  contextLabel: "Límites infinitos y al infinito",
  theory: [
    "Hay dos ideas que suenan parecidas pero responden preguntas distintas. Un límite infinito, como $\\lim_{x\\to a} f(x)=\\infty$, estudia qué ocurre cuando $x$ se acerca a un número fijo $a$ y los valores de $f(x)$ crecen sin cota. Un límite al infinito, como $\\lim_{x\\to\\infty} f(x)=L$, estudia qué ocurre cuando $x$ se aleja indefinidamente hacia la derecha.",
    "Cuando escribimos $\\lim_{x\\to a} f(x)=\\infty$, no estamos diciendo que el límite sea un número llamado infinito. Significa que podemos hacer que $f(x)$ sea tan grande como queramos tomando $x$ suficientemente cerca de $a$, sin tocar necesariamente $a$.",
    "Los límites infinitos suelen aparecer cerca de asíntotas verticales. Si $f(x)$ crece hacia $\\infty$ o decrece hacia $-\\infty$ al acercarse a $x=a$, la recta $x=a$ actúa como una barrera vertical que la gráfica se aproxima pero no cruza localmente.",
    "Los límites al infinito describen el comportamiento de largo plazo. Si $\\lim_{x\\to\\infty} f(x)=L$ o $\\lim_{x\\to -\\infty} f(x)=L$, la recta $y=L$ es una asíntota horizontal: una altura estable hacia la que la función se aproxima cuando miramos muy lejos.",
    "En funciones racionales, el crecimiento lo gobiernan los términos de mayor grado. Si el grado del numerador es menor que el del denominador, el cociente tiende a $0$; si los grados son iguales, tiende al cociente de coeficientes principales; si el numerador crece más rápido, no hay asíntota horizontal finita.",
    "Los límites infinitos laterales son sensibles al signo. Cerca de una asíntota vertical, acercarse por la izquierda y por la derecha puede producir signos opuestos. Ignorar ese detalle es una de las fuentes más comunes de errores.",
    "Logaritmos, exponenciales y funciones trigonométricas también muestran comportamientos importantes: $\\ln x$ crece sin cota cuando $x\\to\\infty$, $e^{-x}$ tiende a $0$ cuando $x\\to\\infty$, y funciones como $\\sin x$ no tienen límite al infinito porque oscilan sin estabilizarse.",
    "La idea práctica es leer la pregunta con cuidado: $x\\to a$ mira una ventana local alrededor de $a$; $x\\to\\infty$ mira el destino de la función a largo plazo. En ambos casos, $\\infty$ indica comportamiento sin cota, no un valor que se sustituye como si fuera un número.",
  ],
  formulas: [
    "\\lim_{x\\to a} f(x)=\\infty \\;\\Longleftrightarrow\\; f(x) \\text{ crece sin cota cuando } x \\text{ se acerca a } a",
    "\\lim_{x\\to a^-} f(x)=\\infty, \\qquad \\lim_{x\\to a^+} f(x)=-\\infty",
    "x=a \\text{ es asíntota vertical si } \\lim_{x\\to a^-}f(x)=\\pm\\infty \\text{ o } \\lim_{x\\to a^+}f(x)=\\pm\\infty",
    "\\lim_{x\\to\\infty} f(x)=L \\;\\Longrightarrow\\; y=L \\text{ es asíntota horizontal hacia la derecha}",
    "\\lim_{x\\to\\infty}\\dfrac{a_nx^n+\\cdots}{b_mx^m+\\cdots}=\\begin{cases}0, & n<m\\\\ \\dfrac{a_n}{b_m}, & n=m\\\\ \\pm\\infty \\text{ o no finito}, & n>m\\end{cases}",
    "\\lim_{x\\to\\infty}\\dfrac{1}{x^p}=0 \\qquad (p>0)",
    "\\lim_{x\\to\\infty}e^{-x}=0, \\qquad \\lim_{x\\to\\infty}\\ln x=\\infty",
    "\\lim_{x\\to\\infty}\\sin x \\text{ no existe}",
  ],
  definition: {
    title: "Definición operativa",
    body:
      "Decir $\\lim_{x\\to a}f(x)=\\infty$ significa que para todo número grande $M>0$ existe una distancia $\\delta>0$ tal que, si $0<|x-a|<\\delta$, entonces $f(x)>M$. Decir $\\lim_{x\\to\\infty}f(x)=L$ significa que para todo margen $\\varepsilon>0$ existe un umbral $N$ tal que, si $x>N$, entonces $|f(x)-L|<\\varepsilon$.",
  },
  examples: [
    {
      statement: "Estudia $\\displaystyle\\lim_{x\\to2}\\dfrac{1}{(x-2)^2}$.",
      steps: [
        "El denominador se acerca a $0$ cuando $x\\to2$.",
        "Como está al cuadrado, $(x-2)^2$ siempre es positivo para $x\\ne2$.",
        "Un número positivo cada vez más pequeño en el denominador produce valores cada vez más grandes.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to2}\\dfrac{1}{(x-2)^2}=\\infty$ y $x=2$ es una asíntota vertical.",
    },
    {
      statement: "Calcula los límites laterales de $\\displaystyle f(x)=\\dfrac{1}{x-3}$ en $x=3$.",
      steps: [
        "Si $x\\to3^-$, entonces $x-3<0$ y se acerca a $0$.",
        "Por la izquierda, $\\dfrac{1}{x-3}$ decrece sin cota: $-\\infty$.",
        "Si $x\\to3^+$, entonces $x-3>0$ y se acerca a $0$.",
        "Por la derecha, $\\dfrac{1}{x-3}$ crece sin cota: $\\infty$.",
      ],
      conclusion: "$\\lim_{x\\to3^-}f(x)=-\\infty$ y $\\lim_{x\\to3^+}f(x)=\\infty$. El límite general no existe como límite infinito único.",
    },
    {
      statement: "Encuentra $\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2-5x+1}{x^2+4}$.",
      steps: [
        "Comparamos los grados: numerador y denominador tienen grado $2$.",
        "Para $x$ grande, dominan $3x^2$ y $x^2$.",
        "El límite es el cociente de coeficientes principales.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2-5x+1}{x^2+4}=3$, así que $y=3$ es asíntota horizontal.",
    },
    {
      statement: "Analiza $\\displaystyle\\lim_{x\\to\\infty}\\dfrac{2x+1}{x^3-4}$.",
      steps: [
        "El denominador tiene grado $3$ y el numerador grado $1$.",
        "El denominador crece mucho más rápido que el numerador.",
        "Dividir por una potencia dominante grande empuja el cociente hacia $0$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{2x+1}{x^3-4}=0$.",
    },
    {
      statement: "Estudia $\\displaystyle\\lim_{x\\to\\infty}\\left(5-2e^{-x}\\right)$.",
      steps: [
        "Sabemos que $e^{-x}=\\dfrac{1}{e^x}$.",
        "Cuando $x\\to\\infty$, $e^x$ crece sin cota, así que $e^{-x}\\to0$.",
        "Entonces $5-2e^{-x}\\to5-0$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to\\infty}(5-2e^{-x})=5$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0^+}\\ln x$.",
      steps: [
        "El dominio de $\\ln x$ exige $x>0$.",
        "Al acercarnos a $0$ por la derecha, $x$ es positivo pero cada vez más pequeño.",
        "Los logaritmos de números positivos muy pequeños son negativos con magnitud creciente.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to0^+}\\ln x=-\\infty$, por lo que $x=0$ es asíntota vertical de $y=\\ln x$.",
    },
    {
      statement: "Decide si existe $\\displaystyle\\lim_{x\\to\\infty}\\sin x$.",
      steps: [
        "La función $\\sin x$ permanece entre $-1$ y $1$.",
        "Sin embargo, no se acerca a una sola altura.",
        "Sigue oscilando indefinidamente aunque $x$ sea muy grande.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to\\infty}\\sin x$ no existe.",
    },
  ],
  exercises: [
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{1}{(x-1)^2}$", solution: "$\\infty$, porque el denominador tiende a $0^+$ por ambos lados." },
    { statement: "$\\displaystyle\\lim_{x\\to1^-}\\dfrac{1}{x-1}$", solution: "$-\\infty$." },
    { statement: "$\\displaystyle\\lim_{x\\to1^+}\\dfrac{1}{x-1}$", solution: "$\\infty$." },
    { statement: "¿Qué recta es asíntota vertical de $f(x)=\\dfrac{4}{x+2}$?", solution: "$x=-2$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{7}{x}$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{5x^2+1}{2x^2-3}$", solution: "Grados iguales; límite $\\dfrac{5}{2}$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x-8}{x^2+1}$", solution: "El denominador crece más rápido; límite $0$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x^3+1}{2x-5}$", solution: "El numerador domina; el cociente crece como $\\dfrac{x^2}{2}$, así que tiende a $\\infty$." },
    { statement: "$\\displaystyle\\lim_{x\\to -\\infty}\\dfrac{3x^2-x}{x^2+4}$", solution: "Grados iguales; límite $3$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}(2+e^{-x})$", solution: "$2$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\ln x$", solution: "$\\infty$; crece sin cota lentamente." },
    { statement: "$\\displaystyle\\lim_{x\\to0^+}\\ln(3x)$", solution: "$-\\infty$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\cos x$", solution: "No existe; oscila sin estabilizarse." },
    { statement: "$\\displaystyle\\lim_{x\\to\\pi/2^-}\\tan x$", solution: "$\\infty$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\pi/2^+}\\tan x$", solution: "$-\\infty$." },
    { statement: "Distingue: $\\lim_{x\\to2}f(x)=\\infty$ vs. $\\lim_{x\\to\\infty}f(x)=2$.", solution: "El primero describe crecimiento sin cota cerca de $x=2$; el segundo describe acercamiento a la altura $2$ cuando $x$ crece sin cota." },
    { statement: "Para $f(x)=\\dfrac{x^2+1}{x^2-9}$, encuentra las asíntotas verticales.", solution: "$x=3$ y $x=-3$, porque el denominador se anula y el numerador no." },
    { statement: "Para $f(x)=\\dfrac{4x^2-x}{2x^2+5x+1}$, encuentra la asíntota horizontal.", solution: "$y=2$, por cociente de coeficientes principales $4/2$." },
  ],
};

const tecnicasAlgebraicasLimitesContent: TopicContent = {
  contextLabel: "Técnicas algebraicas de cálculo de límites",
  geogebraId: "VWuPNbUt",
  theory: [
    "La primera prueba ante un límite algebraico es la sustitución directa. Si $f$ está construida con operaciones continuas cerca de $a$ y no aparece una restricción problemática, entonces normalmente basta evaluar $f(a)$.",
    "Cuando la sustitución directa produce $0/0$, no significa que el límite sea $0$ ni que no exista. Significa que la fórmula está ocultando información: hay que transformar la expresión para ver qué ocurre cerca del punto.",
    "La factorización es la herramienta principal en expresiones polinomiales. Diferencia de cuadrados, factor común, agrupación y trinomios permiten revelar factores que causan el $0/0$.",
    "Cancelar un factor común es válido dentro de un límite cuando trabajamos con $x\\ne a$. Esa cancelación no define el valor original en $a$; solo produce una expresión equivalente en los puntos cercanos a $a$.",
    "Cuando hay raíces, racionalizar con el conjugado suele convertir una diferencia con radicales en una expresión factorizable. La meta no es hacer la fórmula más bonita, sino eliminar la indeterminación.",
    "Las fracciones complejas se simplifican identificando denominadores pequeños y multiplicando por un denominador común. Así se transforma una expresión anidada en un cociente algebraico manejable.",
    "Muchas simplificaciones revelan discontinuidades removibles: la gráfica se comporta como una función sencilla salvo por un punto ausente. El límite ve la altura del hueco; el valor de la función en el punto sigue siendo una pregunta separada.",
    "Una buena estrategia es avanzar en este orden: sustituir, identificar la indeterminación, elegir una transformación algebraica, simplificar solo para $x\\ne a$ y evaluar la expresión resultante.",
  ],
  formulas: [
    "\\text{Si } f \\text{ es continua en } a, \\qquad \\lim_{x\\to a}f(x)=f(a)",
    "\\dfrac{x^2-a^2}{x-a}=x+a \\qquad (x\\ne a)",
    "x^2+bx+c=(x-r)(x-s) \\quad \\text{si } r+s=-b \\text{ y } rs=c",
    "\\sqrt{x}-\\sqrt{a}=\\dfrac{x-a}{\\sqrt{x}+\\sqrt{a}}",
    "\\dfrac{\\frac{1}{x}-\\frac{1}{a}}{x-a}=\\dfrac{a-x}{ax(x-a)}=-\\dfrac{1}{ax} \\qquad (x\\ne a)",
    "\\lim_{x\\to a}\\dfrac{(x-a)g(x)}{(x-a)h(x)}=\\lim_{x\\to a}\\dfrac{g(x)}{h(x)} \\quad \\text{si } h(a)\\ne0",
    "f(x)=\\dfrac{(x-a)g(x)}{x-a},\\; x\\ne a \\quad \\Longrightarrow \\quad \\lim_{x\\to a}f(x)=g(a)",
    "\\dfrac{1}{x+h}-\\dfrac{1}{x}=\\dfrac{-h}{x(x+h)}",
  ],
  definition: {
    title: "Técnica algebraica de límite",
    body:
      "Una técnica algebraica de límite consiste en reemplazar una expresión por otra equivalente para $x$ cercano a $a$ pero con $x\\ne a$, de modo que el comportamiento alrededor del punto se vuelva evaluable. La equivalencia usada para calcular el límite no necesariamente restaura el valor original de la función en $x=a$.",
  },
  examples: [
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}$.",
      steps: [
        "Sustitución directa: $\\dfrac{9-9}{3-3}=0/0$.",
        "Factorizamos diferencia de cuadrados: $x^2-9=(x-3)(x+3)$.",
        "Para $x\\ne3$, cancelamos el factor común $(x-3)$.",
        "Queda $x+3$, y ahora sí evaluamos en $x=3$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}=6$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-5x+6}{x-2}$.",
      steps: [
        "La sustitución produce $0/0$.",
        "Factorizamos el trinomio: $x^2-5x+6=(x-2)(x-3)$.",
        "Cancelamos $(x-2)$ para $x\\ne2$.",
        "Evaluamos $x-3$ en $x=2$.",
      ],
      conclusion: "El límite es $-1$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}$.",
      steps: [
        "Sustitución directa: $0/0$.",
        "Multiplicamos por el conjugado: $\\dfrac{\\sqrt{x}-2}{x-4}\\cdot\\dfrac{\\sqrt{x}+2}{\\sqrt{x}+2}$.",
        "El numerador queda $x-4$.",
        "Cancelamos $x-4$ para $x\\ne4$ y obtenemos $\\dfrac{1}{\\sqrt{x}+2}$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}=\\dfrac{1}{4}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\dfrac{\\frac{1}{x}-1}{x-1}$.",
      steps: [
        "La expresión es una fracción compleja y la sustitución da $0/0$.",
        "Simplificamos el numerador: $\\dfrac{1}{x}-1=\\dfrac{1-x}{x}$.",
        "Entonces $\\dfrac{\\frac{1}{x}-1}{x-1}=\\dfrac{1-x}{x(x-1)}$.",
        "Como $1-x=-(x-1)$, queda $-\\dfrac{1}{x}$ para $x\\ne1$.",
      ],
      conclusion: "El límite es $-1$.",
    },
    {
      statement: "Analiza $h(x)=\\dfrac{x^2-1}{x-1}$ cerca de $x=1$.",
      steps: [
        "La fórmula original no está definida en $x=1$.",
        "Factorizamos: $x^2-1=(x-1)(x+1)$.",
        "Para $x\\ne1$, $h(x)=x+1$.",
        "La gráfica coincide con la recta $y=x+1$ salvo por un hueco en $x=1$.",
      ],
      conclusion: "$\\lim_{x\\to1}h(x)=2$, pero $h(1)$ no existe con la fórmula original.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{9+x}-3}{x}$.",
      steps: [
        "La sustitución directa produce $0/0$.",
        "Racionalizamos con $\\sqrt{9+x}+3$.",
        "El numerador se convierte en $(9+x)-9=x$.",
        "Cancelamos $x$ para $x\\ne0$ y queda $\\dfrac{1}{\\sqrt{9+x}+3}$.",
      ],
      conclusion: "El límite es $\\dfrac{1}{6}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{h\\to0}\\dfrac{\\frac{1}{2+h}-\\frac{1}{2}}{h}$.",
      steps: [
        "La sustitución directa da $0/0$.",
        "Unificamos el numerador: $\\dfrac{1}{2+h}-\\dfrac{1}{2}=\\dfrac{2-(2+h)}{2(2+h)}=\\dfrac{-h}{2(2+h)}$.",
        "Dividir por $h$ equivale a multiplicar por $1/h$.",
        "Cancelamos $h$ para $h\\ne0$ y queda $-\\dfrac{1}{2(2+h)}$.",
      ],
      conclusion: "El límite es $-\\dfrac{1}{4}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-1}{x^2-1}$.",
      steps: [
        "Sustitución directa: $0/0$.",
        "Factorizamos: $x^3-1=(x-1)(x^2+x+1)$ y $x^2-1=(x-1)(x+1)$.",
        "Cancelamos $(x-1)$ para $x\\ne1$.",
        "Evaluamos $\\dfrac{x^2+x+1}{x+1}$ en $x=1$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-1}{x^2-1}=\\dfrac{3}{2}$.",
    },
  ],
  exercises: [
    { statement: "$\\displaystyle\\lim_{x\\to2}(3x^2-x+1)$", solution: "Sustitución directa: $12-2+1=11$." },
    { statement: "$\\displaystyle\\lim_{x\\to5}\\dfrac{x^2-25}{x-5}$", solution: "Diferencia de cuadrados: $x+5\\to10$." },
    { statement: "$\\displaystyle\\lim_{x\\to -3}\\dfrac{x^2-9}{x+3}$", solution: "$(x-3)(x+3)/(x+3)\\to -6$." },
    { statement: "$\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4x+4}{x-2}$", solution: "$(x-2)^2/(x-2)=x-2\\to0$." },
    { statement: "$\\displaystyle\\lim_{x\\to3}\\dfrac{x^2-7x+12}{x-3}$", solution: "$(x-3)(x-4)/(x-3)\\to -1$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^2+x-2}{x-1}$", solution: "$(x-1)(x+2)/(x-1)\\to3$." },
    { statement: "$\\displaystyle\\lim_{x\\to4}\\dfrac{x-4}{\\sqrt{x}-2}$", solution: "Usa $x-4=(\\sqrt{x}-2)(\\sqrt{x}+2)$; límite $4$." },
    { statement: "$\\displaystyle\\lim_{x\\to9}\\dfrac{\\sqrt{x}-3}{x-9}$", solution: "Racionaliza; queda $\\dfrac{1}{\\sqrt{x}+3}\\to\\dfrac{1}{6}$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+x}-1}{x}$", solution: "Racionaliza; queda $\\dfrac{1}{\\sqrt{1+x}+1}\\to\\dfrac{1}{2}$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{x}{\\sqrt{x+4}-2}$", solution: "Racionaliza el denominador; queda $\\sqrt{x+4}+2\\to4$." },
    { statement: "$\\displaystyle\\lim_{x\\to2}\\dfrac{\\frac{1}{x}-\\frac{1}{2}}{x-2}$", solution: "Numerador $=\\dfrac{2-x}{2x}$; límite $-\\dfrac{1}{4}$." },
    { statement: "$\\displaystyle\\lim_{h\\to0}\\dfrac{\\frac{1}{3+h}-\\frac{1}{3}}{h}$", solution: "Unifica y cancela $h$; queda $-\\dfrac{1}{3(3+h)}\\to-\\dfrac{1}{9}$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-1}{x-1}$", solution: "$(x-1)(x^2+x+1)/(x-1)\\to3$." },
    { statement: "$\\displaystyle\\lim_{x\\to2}\\dfrac{x^3-8}{x-2}$", solution: "Diferencia de cubos; $x^2+2x+4\\to12$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-x}{x^2-1}$", solution: "$x(x-1)(x+1)/((x-1)(x+1))\\to1$." },
    { statement: "Si $f(x)=\\dfrac{x^2-4}{x-2}$, ¿cuál es el hueco de la gráfica?", solution: "La simplificación da $x+2$; el hueco está en $(2,4)$." },
    { statement: "¿Por qué cancelar $(x-a)$ en un límite no define automáticamente $f(a)$?", solution: "Porque la equivalencia vale para $x\\ne a$; el valor exacto en $a$ depende de la fórmula o definición original." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\frac{1}{1+x}-1+x}{x^2}$", solution: "Unifica: $\\dfrac{1-(1-x^2)}{(1+x)x^2}=\\dfrac{1}{1+x}\\to1$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{\\sqrt{x+3}-2}{x-1}$", solution: "Racionaliza; queda $\\dfrac{1}{\\sqrt{x+3}+2}\\to\\dfrac{1}{4}$." },
    { statement: "$\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-3x+2}{x^2-4}$", solution: "$\\dfrac{(x-1)(x-2)}{(x-2)(x+2)}\\to\\dfrac{1}{4}$." },
  ],
};

const indeterminacionesCompresionContent: TopicContent = {
  contextLabel: "Indeterminaciones y teorema de compresión",
  theory: [
    "Una forma indeterminada aparece cuando una sustitución inicial produce una expresión simbólica que no decide el límite. El ejemplo más común es $0/0$: puede esconder un límite finito, un límite infinito, o incluso un límite que no existe.",
    "La expresión $0/0$ no es cero. Es una señal de que tanto numerador como denominador se están anulando al mismo tiempo, y necesitamos comparar la rapidez con que lo hacen.",
    "También es importante separar una expresión indefinida de un límite. Una función puede no estar definida en $x=a$, pero aun así tener un límite cuando $x\\to a$, porque el límite observa el comportamiento alrededor del punto.",
    "En Cálculo 1 aparecen con frecuencia las formas $0/0$, $\\infty/\\infty$, $0\\cdot\\infty$ y $\\infty-\\infty$. Cada una requiere reescritura: factorizar, racionalizar, combinar fracciones, dividir por potencias dominantes o convertir productos en cocientes.",
    "Resolver una indeterminación no significa manipular al azar. La meta es transformar la expresión en otra equivalente cerca del punto de interés, con $x\\ne a$, para que el comportamiento dominante sea visible.",
    "El teorema de compresión, también llamado teorema del emparedado, permite calcular límites de funciones difíciles atrapándolas entre dos funciones más simples que llegan al mismo valor.",
    "Geométricamente, si una gráfica queda encerrada entre dos curvas que se juntan en la misma altura $L$, la gráfica encerrada no tiene espacio para ir a otra altura: también debe acercarse a $L$.",
    "El límite clásico $\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1$ nace de una comparación geométrica en el círculo unitario. Es una piedra angular para límites trigonométricos y, más adelante, para derivadas de funciones trigonométricas.",
    "Errores comunes: cancelar términos que no son factores, tratar $\\infty$ como número ordinario, concluir que $0/0=0$, olvidar los signos laterales, o aplicar compresión sin verificar que las dos cotas tienen el mismo límite.",
  ],
  formulas: [
    "0/0,\\quad \\infty/\\infty,\\quad 0\\cdot\\infty,\\quad \\infty-\\infty \\quad \\text{son formas indeterminadas}",
    "\\lim_{x\\to a}\\dfrac{(x-a)g(x)}{(x-a)h(x)}=\\lim_{x\\to a}\\dfrac{g(x)}{h(x)} \\quad (x\\ne a)",
    "\\sqrt{x}-\\sqrt{a}=\\dfrac{x-a}{\\sqrt{x}+\\sqrt{a}}",
    "\\lim_{x\\to\\infty}\\dfrac{a_nx^n+\\cdots}{b_mx^m+\\cdots}=\\dfrac{a_n}{b_m} \\quad \\text{si } n=m",
    "g(x)\\le f(x)\\le h(x),\\; \\lim_{x\\to a}g(x)=\\lim_{x\\to a}h(x)=L \\Longrightarrow \\lim_{x\\to a}f(x)=L",
    "-x^2\\le x^2\\sin\\!\\left(\\dfrac{1}{x}\\right)\\le x^2",
    "\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1",
    "\\lim_{x\\to0}\\dfrac{1-\\cos x}{x}=0",
  ],
  definition: {
    title: "Forma indeterminada y compresión",
    body:
      "Una forma indeterminada es el resultado provisional de una sustitución que no determina el límite por sí sola. El teorema de compresión afirma que si $f$ queda atrapada entre $g$ y $h$ cerca de $a$, y ambas cotas se acercan al mismo valor $L$, entonces $f$ también se acerca a $L$.",
  },
  examples: [
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}$.",
      steps: [
        "La sustitución directa da $0/0$, una forma indeterminada.",
        "Factorizamos: $x^2-4=(x-2)(x+2)$.",
        "Para $x\\ne2$, cancelamos $(x-2)$.",
        "Evaluamos la expresión equivalente $x+2$ en $x=2$.",
      ],
      conclusion: "El límite es $4$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{x+4}-2}{x}$.",
      steps: [
        "Sustitución directa: $0/0$.",
        "Racionalizamos con el conjugado $\\sqrt{x+4}+2$.",
        "El numerador queda $(x+4)-4=x$.",
        "Cancelamos $x$ para $x\\ne0$ y obtenemos $\\dfrac{1}{\\sqrt{x+4}+2}$.",
      ],
      conclusion: "El límite es $\\dfrac{1}{4}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to\\infty}\\dfrac{5x^3-2x}{2x^3+x^2+1}$.",
      steps: [
        "La forma dominante es $\\infty/\\infty$.",
        "Dividimos numerador y denominador por $x^3$.",
        "Queda $\\dfrac{5-2/x^2}{2+1/x+1/x^3}$.",
        "Los términos con potencias negativas de $x$ tienden a $0$.",
      ],
      conclusion: "El límite es $\\dfrac{5}{2}$.",
    },
    {
      statement: "Resuelve $\\displaystyle\\lim_{x\\to0^+} x\\ln x$, una forma $0\\cdot(-\\infty)$.",
      steps: [
        "Reescribimos el producto como cociente: $x\\ln x=\\dfrac{\\ln x}{1/x}$.",
        "La forma resultante es $-\\infty/\\infty$, todavía indeterminada.",
        "Usamos el cambio $u=1/x$; cuando $x\\to0^+$, $u\\to\\infty$.",
        "Entonces $x\\ln x= -\\dfrac{\\ln u}{u}$, y $\\ln u$ crece mucho más lento que $u$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to0^+}x\\ln x=0$.",
    },
    {
      statement: "Usa compresión para $\\displaystyle\\lim_{x\\to0}x^2\\sin\\!\\left(\\dfrac{1}{x}\\right)$.",
      steps: [
        "Sabemos que $-1\\le\\sin(1/x)\\le1$.",
        "Multiplicamos por $x^2\\ge0$: $-x^2\\le x^2\\sin(1/x)\\le x^2$.",
        "Ambas cotas tienden a $0$ cuando $x\\to0$.",
      ],
      conclusion: "Por compresión, el límite es $0$.",
    },
    {
      statement: "Usa $\\displaystyle\\lim_{u\\to0}\\dfrac{\\sin u}{u}=1$ para calcular $\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(5x)}{x}$.",
      steps: [
        "Multiplicamos y dividimos por $5$.",
        "$\\dfrac{\\sin(5x)}{x}=5\\dfrac{\\sin(5x)}{5x}$.",
        "Cuando $x\\to0$, también $5x\\to0$.",
      ],
      conclusion: "El límite es $5$.",
    },
    {
      statement: "Decide si existe $\\displaystyle\\lim_{x\\to0}\\sin\\!\\left(\\dfrac{1}{x}\\right)$.",
      steps: [
        "La función está acotada entre $-1$ y $1$.",
        "Pero esas cotas no se acercan al mismo valor.",
        "La expresión oscila indefinidamente cerca de $0$.",
      ],
      conclusion: "El límite no existe. Estar acotada no basta para aplicar compresión.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos x}{x}$.",
      steps: [
        "La sustitución produce $0/0$.",
        "Multiplicamos por el conjugado: $\\dfrac{1-\\cos x}{x}\\cdot\\dfrac{1+\\cos x}{1+\\cos x}$.",
        "El numerador queda $1-\\cos^2x=\\sin^2x$.",
        "La expresión es $\\dfrac{\\sin x}{x}\\cdot\\dfrac{\\sin x}{1+\cos x}$.",
      ],
      conclusion: "El límite es $1\\cdot0/2=0$.",
    },
  ],
  exercises: [
    { statement: "¿Por qué $0/0$ no es igual a $0$ en un límite?", solution: "Porque no compara las velocidades de anulación; puede dar muchos comportamientos distintos." },
    { statement: "$\\displaystyle\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}$", solution: "Factoriza: $(x-3)(x+3)/(x-3)\\to6$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{x^2-1}{x-1}$", solution: "$(x-1)(x+1)/(x-1)\\to2$." },
    { statement: "$\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}$", solution: "Racionaliza; queda $1/(\\sqrt{x}+2)\\to1/4$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+x}-1}{x}$", solution: "Racionaliza; queda $1/(\\sqrt{1+x}+1)\\to1/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{2x^2+1}{7x^2-3x}$", solution: "Forma $\\infty/\\infty$; cociente principal $2/7$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x^3+4}{x^2+1}$", solution: "El numerador domina; el límite es $\\infty$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(3x)}{x}$", solution: "$3\\dfrac{\\sin(3x)}{3x}\\to3$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(7x)}{\\sin(2x)}$", solution: "Equivale a $\\dfrac{7x}{2x}\\to\\dfrac{7}{2}$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}x\\sin\\!\\left(\\dfrac{1}{x}\\right)$", solution: "Como $-|x|\\le x\\sin(1/x)\\le |x|$, el límite es $0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}x^2\\cos\\!\\left(\\dfrac{5}{x}\\right)$", solution: "Está entre $-x^2$ y $x^2$; límite $0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(2x)}{x}$", solution: "Use $1-\\cos(2x)\\sim 2x^2$; el límite es $0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}$", solution: "Con conjugado o límite notable, vale $1/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0^+}x\\ln x$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}x\\left(\\sqrt{x^2+1}-x\\right)$", solution: "Racionaliza: $x/(\\sqrt{x^2+1}+x)\\to1/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\left(\\dfrac{1}{x}-\\dfrac{1}{x+x^2}\\right)$", solution: "Combina fracciones: $\\dfrac{1}{1+x}\\to1$." },
    { statement: "¿Existe $\\displaystyle\\lim_{x\\to0}\\cos\\!\\left(\\dfrac{1}{x}\\right)$?", solution: "No; oscila sin acercarse a un valor único." },
    { statement: "Si $-x^2\\le f(x)\\le x^2$ cerca de $0$, halla $\\lim_{x\\to0}f(x)$.", solution: "Por compresión, el límite es $0$." },
    { statement: "Si $0\\le f(x)\\le |x|$ cerca de $0$, halla $\\lim_{x\\to0}f(x)$.", solution: "Por compresión, el límite es $0$." },
    { statement: "¿Qué falla si solo sabemos $-1\\le f(x)\\le1$ cuando $x\\to0$?", solution: "Las cotas no se acercan al mismo valor; no se puede concluir un límite por compresión." },
  ],
};

const continuidadPuntoIntervaloContent: TopicContent = {
  contextLabel: "Continuidad en un punto y en un intervalo",
  geogebraId: "HnpzVBCr",
  theory: [
    "Intuitivamente, una función es continua cuando su gráfica puede recorrerse sin saltos, huecos ni rupturas. En un punto $a$, la pregunta es si la altura que la curva parece alcanzar coincide con el valor realmente asignado a la función.",
    "La continuidad puntual une tres piezas: el valor $f(a)$, el límite alrededor de $a$ y la igualdad entre ambos. Si cualquiera de estas piezas falla, la función no es continua en $a$.",
    "La primera condición, que $f(a)$ exista, evita hablar de continuidad en un punto que la función no define. Una fórmula puede sugerir una altura, pero si el punto está fuera del dominio, no hay continuidad allí.",
    "La segunda condición exige que $\\lim_{x\\to a}f(x)$ exista. Esto descarta saltos, oscilaciones persistentes y comportamientos infinitos cerca de $a$.",
    "La tercera condición exige que $\\lim_{x\\to a}f(x)=f(a)$. Esta es la condición que detecta huecos rellenados con una altura incorrecta: el límite puede existir, pero la función no seguir la curva.",
    "En un intervalo abierto $(a,b)$, una función es continua si lo es en cada punto interior. En un intervalo cerrado $[a,b]$, se usa continuidad por la derecha en $a$, continuidad por la izquierda en $b$ y continuidad usual en los puntos interiores.",
    "Muchas familias conocidas son continuas en sus dominios: polinomios en todo $\\mathbb{R}$, funciones racionales donde el denominador no se anula, radicales pares donde el radicando es no negativo, exponenciales, logaritmos en argumentos positivos y funciones trigonométricas donde están definidas.",
    "La continuidad permite evaluar límites por sustitución directa. Si sabemos que $f$ es continua en $a$, entonces $\\lim_{x\\to a}f(x)=f(a)$, lo que convierte una pregunta de límite en una evaluación de función.",
    "Errores comunes: olvidar revisar que $f(a)$ exista, cancelar factores y declarar continuidad sin volver al dominio original, confundir límite existente con continuidad, o exigir continuidad fuera del dominio natural de la función.",
  ],
  formulas: [
    "f \\text{ continua en } a \\Longleftrightarrow \\lim_{x\\to a}f(x)=f(a)",
    "f(a) \\text{ existe},\\qquad \\lim_{x\\to a}f(x) \\text{ existe},\\qquad \\lim_{x\\to a}f(x)=f(a)",
    "f \\text{ continua en } (a,b) \\Longleftrightarrow f \\text{ es continua en cada } c\\in(a,b)",
    "f \\text{ continua en } [a,b] \\Longleftrightarrow \\begin{cases}\\lim_{x\\to a^+}f(x)=f(a)\\\\ \\lim_{x\\to c}f(x)=f(c),\\; c\\in(a,b)\\\\ \\lim_{x\\to b^-}f(x)=f(b)\\end{cases}",
    "p(x) \\text{ polinomial } \\Longrightarrow p \\text{ es continua en } \\mathbb{R}",
    "r(x)=\\dfrac{p(x)}{q(x)} \\text{ es continua donde } q(x)\\ne0",
    "\\lim_{x\\to a}f(x)=f(a) \\quad \\text{si } f \\text{ es continua en } a",
    "f,g \\text{ continuas } \\Longrightarrow f+g,\\; fg,\\; f\\circ g \\text{ continuas donde estén definidas}",
  ],
  definition: {
    title: "Continuidad puntual",
    body:
      "Una función $f$ es continua en $x=a$ si $f(a)$ está definido, el límite $\\lim_{x\\to a}f(x)$ existe y ese límite coincide con el valor de la función: $\\lim_{x\\to a}f(x)=f(a)$. En intervalos, esta condición se exige en todos los puntos interiores y se adapta lateralmente en los extremos.",
  },
  examples: [
    {
      statement: "Verifica si $f(x)=x^2+3x-1$ es continua en $x=2$.",
      steps: [
        "Los polinomios son continuos en todo $\\mathbb{R}$.",
        "Calculamos $f(2)=4+6-1=9$.",
        "Por continuidad, $\\lim_{x\\to2}f(x)=f(2)$.",
      ],
      conclusion: "$f$ es continua en $2$ y el límite vale $9$.",
    },
    {
      statement: "Determina dónde es continua $f(x)=\\dfrac{x+1}{x^2-4}$.",
      steps: [
        "Una función racional es continua donde su denominador no se anula.",
        "Resolvemos $x^2-4=0$, entonces $x=\\pm2$.",
        "Excluimos esos puntos del dominio.",
      ],
      conclusion: "$f$ es continua en $(-\\infty,-2)\\cup(-2,2)\\cup(2,\\infty)$.",
    },
    {
      statement: "Analiza la continuidad de $g(x)=\\dfrac{x^2-1}{x-1}$ en $x=1$.",
      steps: [
        "$g(1)$ no existe porque el denominador es $0$.",
        "Para $x\\ne1$, $g(x)=x+1$.",
        "El límite existe y vale $2$, pero falta el valor de la función.",
      ],
      conclusion: "$g$ no es continua en $1$; tiene una discontinuidad removible.",
    },
    {
      statement: "Sea $h(x)=\\begin{cases}x+2,&x<1\\\\ k,&x=1\\\\ 3x,&x>1\\end{cases}$. ¿Existe $k$ para que $h$ sea continua en $1$?",
      steps: [
        "Límite izquierdo: $\\lim_{x\\to1^-}(x+2)=3$.",
        "Límite derecho: $\\lim_{x\\to1^+}3x=3$.",
        "El límite general existe y vale $3$.",
        "Para continuidad, necesitamos $h(1)=k=3$.",
      ],
      conclusion: "$k=3$ hace continua la función en $1$.",
    },
    {
      statement: "Estudia la continuidad de $f(x)=\\sqrt{x-4}$ en su dominio.",
      steps: [
        "El radicando debe satisfacer $x-4\\ge0$.",
        "El dominio es $[4,\\infty)$.",
        "La raíz cuadrada es continua en su dominio.",
      ],
      conclusion: "$f$ es continua en $[4,\\infty)$, con continuidad lateral derecha en $4$.",
    },
    {
      statement: "Evalúa $\\displaystyle\\lim_{x\\to0}e^{x^2-1}$ usando continuidad.",
      steps: [
        "La función $x^2-1$ es polinomial y continua.",
        "La exponencial $e^u$ es continua para todo $u$.",
        "La composición $e^{x^2-1}$ es continua en $0$.",
      ],
      conclusion: "$\\displaystyle\\lim_{x\\to0}e^{x^2-1}=e^{-1}=\\dfrac{1}{e}$.",
    },
    {
      statement: "Determina si $f(x)=\\ln(x-2)$ es continua en $(2,\\infty)$.",
      steps: [
        "El logaritmo exige argumento positivo: $x-2>0$.",
        "Entonces el dominio es $(2,\\infty)$.",
        "El logaritmo es continuo en argumentos positivos.",
      ],
      conclusion: "$f$ es continua en todo $(2,\\infty)$.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}2x+1,&x<0\\\\1,&x=0\\\\x^2+2,&x>0\\end{cases}$. ¿Es continua en $0$?",
      steps: [
        "$f(0)=1$.",
        "Límite izquierdo: $\\lim_{x\\to0^-}(2x+1)=1$.",
        "Límite derecho: $\\lim_{x\\to0^+}(x^2+2)=2$.",
        "Los límites laterales no coinciden.",
      ],
      conclusion: "No es continua en $0$ porque el límite general no existe.",
    },
  ],
  exercises: [
    { statement: "¿Es $f(x)=x^3-5x$ continua en $x=-2$?", solution: "Sí. Es polinomial, continua en todo $\\mathbb{R}$." },
    { statement: "Evalúa $\\displaystyle\\lim_{x\\to3}(x^2+1)$ usando continuidad.", solution: "$3^2+1=10$." },
    { statement: "¿Dónde es continua $f(x)=\\dfrac{1}{x-7}$?", solution: "En $(-\\infty,7)\\cup(7,\\infty)$." },
    { statement: "¿Dónde es continua $f(x)=\\sqrt{x+2}$?", solution: "En $[-2,\\infty)$." },
    { statement: "¿Dónde es continua $f(x)=\\ln(5-x)$?", solution: "En $(-\\infty,5)$." },
    { statement: "¿Es $\\sin x$ continua en $\\pi$?", solution: "Sí; las funciones trigonométricas seno y coseno son continuas en todo $\\mathbb{R}$." },
    { statement: "Evalúa $\\displaystyle\\lim_{x\\to1}\\cos(\\pi x)$.", solution: "Por continuidad, $\\cos\\pi=-1$." },
    { statement: "Clasifica la falla de $f(x)=\\dfrac{x^2-4}{x-2}$ en $x=2$.", solution: "No es continua; discontinuidad removible." },
    { statement: "Sea $f(x)=\\begin{cases}x+1,&x<2\\\\4,&x=2\\\\x^2,&x>2\\end{cases}$. ¿Es continua en $2$?", solution: "Izquierda $3$, derecha $4$, valor $4$; no es continua." },
    { statement: "Halla $k$ para continuidad: $f(x)=\\begin{cases}kx,&x<1\\\\x+2,&x\\ge1\\end{cases}$.", solution: "Necesitamos $k=3$." },
    { statement: "Halla $k$: $f(x)=\\begin{cases}x^2+k,&x<2\\\\3x,&x\\ge2\\end{cases}$ continua en $2$.", solution: "$4+k=6$, entonces $k=2$." },
    { statement: "¿Es $f(x)=|x|$ continua en $0$?", solution: "Sí; ambos laterales y $f(0)$ valen $0$." },
    { statement: "¿Dónde es continua $f(x)=\\tan x$?", solution: "Donde $\\cos x\\ne0$, es decir $x\\ne \\pi/2+k\\pi$." },
    { statement: "Evalúa $\\displaystyle\\lim_{x\\to4}\\sqrt{x+5}$.", solution: "$\\sqrt{9}=3$." },
    { statement: "Si $\\lim_{x\\to a}f(x)=5$ pero $f(a)=2$, ¿es continua en $a$?", solution: "No; falla la igualdad $\\lim_{x\\to a}f(x)=f(a)$." },
    { statement: "Si $f(a)$ no existe pero $\\lim_{x\\to a}f(x)$ sí, ¿hay continuidad?", solution: "No; falla la existencia de $f(a)$." },
    { statement: "¿Qué se revisa en los extremos de $[a,b]$?", solution: "Continuidad por la derecha en $a$ y por la izquierda en $b$." },
    { statement: "¿Es $f(x)=\\dfrac{x}{x^2+1}$ continua en $\\mathbb{R}$?", solution: "Sí; el denominador nunca es $0$." },
    { statement: "¿Dónde es continua $f(x)=\\sqrt{9-x^2}$?", solution: "En $[-3,3]$." },
    { statement: "Evalúa $\\displaystyle\\lim_{x\\to0}\\ln(x+3)$.", solution: "$\\ln3$." },
  ],
};

const continuidadLateralContent: TopicContent = {
  contextLabel: "Continuidad por la derecha y por la izquierda",
  theory: [
    "La continuidad lateral estudia si una función se pega correctamente a un punto cuando nos acercamos desde un solo lado. Es indispensable en extremos de intervalos y en funciones definidas por partes.",
    "Decimos que $f$ es continua por la derecha en $a$ si el valor $f(a)$ existe y coincide con el límite al acercarnos con $x>a$: $\\lim_{x\\to a^+}f(x)=f(a)$.",
    "Decimos que $f$ es continua por la izquierda en $a$ si $f(a)$ existe y coincide con el límite al acercarnos con $x<a$: $\\lim_{x\\to a^-}f(x)=f(a)$.",
    "En un extremo izquierdo de dominio, como $[a,b]$, no tiene sentido exigir valores por la izquierda si no pertenecen al dominio. Por eso se revisa continuidad por la derecha en $a$.",
    "En un extremo derecho de dominio se revisa continuidad por la izquierda. Esta convención permite decir que funciones como $\\sqrt{x}$ son continuas en $[0,\\infty)$ aunque no tengan valores reales para $x<0$.",
    "Las funciones por partes se analizan rama por rama. En los puntos de cambio, se comparan el valor de la función y el límite lateral correspondiente a cada lado.",
    "La continuidad bilateral en un punto interior equivale a tener continuidad por la izquierda y por la derecha al mismo tiempo, con el mismo valor $f(a)$.",
    "Errores comunes: exigir límite bilateral en un extremo del dominio, usar una rama incorrecta de una función por partes, olvidar que el punto cerrado define $f(a)$, o analizar un lado que no pertenece al intervalo.",
  ],
  formulas: [
    "f \\text{ continua por la derecha en } a \\Longleftrightarrow \\lim_{x\\to a^+}f(x)=f(a)",
    "f \\text{ continua por la izquierda en } a \\Longleftrightarrow \\lim_{x\\to a^-}f(x)=f(a)",
    "f \\text{ continua en } a \\Longleftrightarrow \\lim_{x\\to a^-}f(x)=f(a)=\\lim_{x\\to a^+}f(x)",
    "f \\text{ continua en } [a,b] \\Longleftrightarrow \\lim_{x\\to a^+}f(x)=f(a),\\; \\lim_{x\\to b^-}f(x)=f(b),\\; f \\text{ continua en } (a,b)",
    "\\sqrt{x-a} \\text{ es continua por la derecha en } x=a",
    "\\ln(x-a) \\text{ es continua en } (a,\\infty) \\text{ pero no está definida en } a",
    "f(x)=\\begin{cases}g(x),&x<a\\\\c,&x=a\\\\h(x),&x>a\\end{cases} \\Rightarrow \\text{ revisar } \\lim_{x\\to a^-}g(x),\\; c,\\; \\lim_{x\\to a^+}h(x)",
  ],
  definition: {
    title: "Continuidad lateral",
    body:
      "Una función es continua por la derecha en $a$ si su valor en $a$ coincide con lo que la función aproxima desde valores mayores que $a$. Es continua por la izquierda si coincide con lo que aproxima desde valores menores. En extremos de intervalos, esta es la noción correcta de continuidad.",
  },
  examples: [
    {
      statement: "Demuestra que $f(x)=\\sqrt{x}$ es continua por la derecha en $0$.",
      steps: [
        "$f(0)=0$.",
        "El dominio real empieza en $0$, así que solo miramos $x\\to0^+$.",
        "$\\lim_{x\\to0^+}\\sqrt{x}=0$.",
      ],
      conclusion: "$f$ es continua por la derecha en $0$.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}x+1,&x<2\\\\5,&x=2\\\\x^2+1,&x>2\\end{cases}$. Revisa continuidad lateral en $2$.",
      steps: [
        "$f(2)=5$.",
        "Por la izquierda, $\\lim_{x\\to2^-}(x+1)=3$.",
        "Por la derecha, $\\lim_{x\\to2^+}(x^2+1)=5$.",
      ],
      conclusion: "Es continua por la derecha en $2$, pero no por la izquierda.",
    },
    {
      statement: "Sea $g(x)=\\begin{cases}2x,&x\\le1\\\\x+1,&x>1\\end{cases}$. ¿Es continua en $1$?",
      steps: [
        "$g(1)=2$ por la rama izquierda.",
        "$\\lim_{x\\to1^-}2x=2$.",
        "$\\lim_{x\\to1^+}(x+1)=2$.",
      ],
      conclusion: "$g$ es continua por ambos lados, luego es continua en $1$.",
    },
    {
      statement: "Analiza $f(x)=\\ln x$ en el intervalo $(0,\\infty)$.",
      steps: [
        "$\\ln x$ está definida solo para $x>0$.",
        "Es continua en todo punto interior de $(0,\\infty)$.",
        "El punto $0$ no pertenece al intervalo, así que no se exige continuidad en $0$.",
      ],
      conclusion: "$\\ln x$ es continua en $(0,\\infty)$.",
    },
    {
      statement: "¿Es $f(x)=3-x$ continua por la izquierda en $4$ dentro de $(-\\infty,4]$?",
      steps: [
        "$f(4)=-1$.",
        "Como $4$ es extremo derecho, miramos $x\\to4^-$.",
        "$\\lim_{x\\to4^-}(3-x)=-1$.",
      ],
      conclusion: "Sí, es continua por la izquierda en $4$.",
    },
    {
      statement: "Halla $k$ para que $f(x)=\\begin{cases}x^2,&x<3\\\\k,&x=3\\\\2x+3,&x>3\\end{cases}$ sea continua por la derecha en $3$.",
      steps: [
        "Para continuidad por la derecha solo comparamos $f(3)$ con $\\lim_{x\\to3^+}f(x)$.",
        "$\\lim_{x\\to3^+}(2x+3)=9$.",
        "Necesitamos $k=9$.",
      ],
      conclusion: "$k=9$ da continuidad por la derecha; no garantiza continuidad bilateral.",
    },
    {
      statement: "Halla $k$ para continuidad bilateral en $f(x)=\\begin{cases}kx+1,&x<0\\\\1,&x=0\\\\x^2+1,&x>0\\end{cases}$.",
      steps: [
        "$f(0)=1$.",
        "Límite izquierdo: $\\lim_{x\\to0^-}(kx+1)=1$ para cualquier $k$.",
        "Límite derecho: $\\lim_{x\\to0^+}(x^2+1)=1$.",
      ],
      conclusion: "La función es continua en $0$ para todo $k\\in\\mathbb{R}$.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}1/x,&x<0\\\\0,&x=0\\\\x,&x>0\\end{cases}$. Revisa continuidad por ambos lados en $0$.",
      steps: [
        "$f(0)=0$.",
        "Por la derecha, $\\lim_{x\\to0^+}x=0$, coincide con $f(0)$.",
        "Por la izquierda, $\\lim_{x\\to0^-}1/x=-\\infty$, no coincide.",
      ],
      conclusion: "Es continua por la derecha en $0$, pero no por la izquierda.",
    },
  ],
  exercises: [
    { statement: "Define continuidad por la derecha en $a$.", solution: "$\\lim_{x\\to a^+}f(x)=f(a)$." },
    { statement: "Define continuidad por la izquierda en $a$.", solution: "$\\lim_{x\\to a^-}f(x)=f(a)$." },
    { statement: "¿Por qué no se exige límite bilateral en el extremo izquierdo de $[a,b]$?", solution: "Porque los valores $x<a$ no pertenecen al intervalo." },
    { statement: "¿Es $f(x)=\\sqrt{x-2}$ continua por la derecha en $2$?", solution: "Sí; $f(2)=0$ y $\\lim_{x\\to2^+}\\sqrt{x-2}=0$." },
    { statement: "¿Es $f(x)=\\ln(x-1)$ continua por la derecha en $1$?", solution: "No; $f(1)$ no existe." },
    { statement: "Sea $f(x)=\\begin{cases}x,&x<1\\\\2,&x=1\\\\2x,&x>1\\end{cases}$. ¿Continua por derecha en $1$?", solution: "Sí; derecha $2$ y $f(1)=2$." },
    { statement: "Para la función anterior, ¿continua por izquierda en $1$?", solution: "No; izquierda $1$ y $f(1)=2$." },
    { statement: "Sea $g(x)=\\begin{cases}x^2,&x\\le2\\\\4x-4,&x>2\\end{cases}$. ¿Es continua en $2$?", solution: "Sí; valor $4$, izquierda $4$, derecha $4$." },
    { statement: "Halla $k$: $f(x)=\\begin{cases}x+k,&x<0\\\\3,&x=0\\end{cases}$ continua por izquierda en $0$.", solution: "$k=3$." },
    { statement: "Halla $k$: $f(x)=\\begin{cases}k,&x=2\\\\x^2,&x>2\\end{cases}$ continua por derecha en $2$.", solution: "$k=4$." },
    { statement: "En $[0,5]$, ¿qué se revisa en $0$?", solution: "Continuidad por la derecha." },
    { statement: "En $[0,5]$, ¿qué se revisa en $5$?", solution: "Continuidad por la izquierda." },
    { statement: "¿Es $f(x)=|x|$ continua por izquierda y derecha en $0$?", solution: "Sí; ambos límites laterales y $f(0)$ valen $0$." },
    { statement: "Sea $f(x)=\\begin{cases}-1,&x<0\\\\0,&x=0\\\\1,&x>0\\end{cases}$. ¿Continua por algún lado en $0$?", solution: "No; izquierda $-1$, derecha $1$, valor $0$." },
    { statement: "¿Es $f(x)=\\dfrac{1}{x}$ continua en $(0,\\infty)$?", solution: "Sí, en todo punto interior del intervalo." },
    { statement: "¿Es $f(x)=\\dfrac{1}{x}$ continua por derecha en $0$ si usamos $[0,\\infty)$?", solution: "No; $f(0)$ no existe." },
    { statement: "Halla $k$ para continuidad bilateral: $f(x)=\\begin{cases}2x+k,&x<1\\\\5,&x=1\\\\x+4,&x>1\\end{cases}$.", solution: "Derecha $5$ coincide; izquierda $2+k=5$, entonces $k=3$." },
    { statement: "Si $\\lim_{x\\to a^+}f(x)=f(a)$ pero el límite izquierdo no existe, ¿hay continuidad por derecha?", solution: "Sí, pero no continuidad bilateral." },
    { statement: "Si $a$ no pertenece al dominio, ¿puede haber continuidad lateral en $a$?", solution: "No, porque se requiere que $f(a)$ exista." },
    { statement: "Sea $f(x)=\\cos x$ en $[0,\\pi]$. ¿Es continua en el intervalo cerrado?", solution: "Sí; derecha en $0$, izquierda en $\\pi$ e interior por continuidad de $\\cos x$." },
  ],
};

const tiposDiscontinuidadContent: TopicContent = {
  contextLabel: "Tipos de discontinuidad",
  theory: [
    "Una discontinuidad ocurre cuando una función deja de comportarse de forma continua en un punto. La ruptura puede ser un hueco, un salto, una asíntota vertical o una oscilación que no se estabiliza.",
    "Para clasificar una discontinuidad conviene separar tres objetos: el valor $f(a)$, el límite $\\lim_{x\\to a}f(x)$ y la continuidad. Pueden parecer relacionados, pero no dicen lo mismo.",
    "Una discontinuidad removible aparece cuando el límite existe, pero $f(a)$ no existe o no coincide con ese límite. Gráficamente se ve como un hueco, a veces con un punto cerrado en otra altura.",
    "Una discontinuidad de salto aparece cuando los límites laterales existen y son finitos, pero son distintos. En la gráfica, la rama izquierda y la rama derecha llegan a alturas diferentes.",
    "Una discontinuidad infinita aparece cuando al menos un límite lateral crece sin cota hacia $\\infty$ o $-\\infty$. Suele indicar una asíntota vertical.",
    "Una discontinuidad oscilatoria aparece cuando la función no se acerca a una altura única porque oscila indefinidamente. El ejemplo típico cerca de $0$ es $\\sin(1/x)$.",
    "Los límites laterales son la herramienta central: antes de clasificar, calcula o interpreta $\\lim_{x\\to a^-}f(x)$ y $\\lim_{x\\to a^+}f(x)$. La comparación entre esos valores revela la estructura de la ruptura.",
    "Errores comunes: creer que cambiar $f(a)$ siempre arregla una discontinuidad, confundir un salto con un hueco, llamar removible a una asíntota vertical, o ignorar que una oscilación acotada puede no tener límite.",
  ],
  formulas: [
    "f \\text{ continua en } a \\Longleftrightarrow f(a) \\text{ existe},\\; \\lim_{x\\to a}f(x) \\text{ existe y } \\lim_{x\\to a}f(x)=f(a)",
    "\\text{Removible: } \\lim_{x\\to a}f(x)=L \\text{ existe, pero } f(a) \\ne L \\text{ o } f(a) \\text{ no existe}",
    "\\text{Salto: } \\lim_{x\\to a^-}f(x)=L_1,\\; \\lim_{x\\to a^+}f(x)=L_2,\\; L_1\\ne L_2",
    "\\text{Infinita: } \\lim_{x\\to a^-}f(x)=\\pm\\infty \\text{ o } \\lim_{x\\to a^+}f(x)=\\pm\\infty",
    "\\text{Oscilatoria: } f(x) \\text{ no se estabiliza cuando } x\\to a",
    "\\dfrac{x^2-a^2}{x-a}=x+a \\quad (x\\ne a) \\quad \\Rightarrow \\quad \\text{hueco en } x=a",
    "\\lim_{x\\to0}\\sin\\!\\left(\\dfrac{1}{x}\\right) \\text{ no existe}",
  ],
  definition: {
    title: "Clasificación de discontinuidades",
    body:
      "Clasificar una discontinuidad en $a$ significa comparar $f(a)$, los límites laterales y el límite general. Si el límite existe pero el punto falla, es removible; si los laterales finitos difieren, es de salto; si algún lateral es infinito, es infinita; si no hay estabilización por oscilación, es oscilatoria.",
  },
  examples: [
    {
      statement: "Clasifica la discontinuidad de $f(x)=\\dfrac{x^2-4}{x-2}$ en $x=2$.",
      steps: ["$f(2)$ no existe.", "Para $x\\ne2$, $f(x)=x+2$.", "$\\lim_{x\\to2}f(x)=4$."],
      conclusion: "Discontinuidad removible con hueco en $(2,4)$.",
    },
    {
      statement: "Sea $g(x)=\\begin{cases}1,&x<0\\\\3,&x\\ge0\\end{cases}$. Clasifica en $0$.",
      steps: ["$g(0)=3$.", "$\\lim_{x\\to0^-}g(x)=1$.", "$\\lim_{x\\to0^+}g(x)=3$."],
      conclusion: "Discontinuidad de salto.",
    },
    {
      statement: "Clasifica $h(x)=\\dfrac{1}{(x-1)^2}$ en $x=1$.",
      steps: ["$h(1)$ no existe.", "$(x-1)^2\\to0^+$.", "Por ambos lados $h(x)\\to\\infty$."],
      conclusion: "Discontinuidad infinita; $x=1$ es asíntota vertical.",
    },
    {
      statement: "Clasifica $p(x)=\\sin(1/x)$ en $x=0$ si se define $p(0)=0$.",
      steps: ["$p(0)$ existe.", "Cuando $x\\to0$, $1/x$ crece en magnitud.", "$\\sin(1/x)$ oscila sin acercarse a un valor único."],
      conclusion: "Discontinuidad oscilatoria.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}x+2,&x<1\\\\10,&x=1\\\\3x,&x>1\\end{cases}$. Clasifica en $1$.",
      steps: ["$f(1)=10$.", "Límite izquierdo: $3$.", "Límite derecho: $3$."],
      conclusion: "Removible; bastaría redefinir $f(1)=3$.",
    },
    {
      statement: "Clasifica $f(x)=\\dfrac{x+1}{x^2-1}$ en $x=1$ y $x=-1$.",
      steps: ["$x^2-1=(x-1)(x+1)$.", "En $x=-1$ se cancela el factor.", "En $x=1$ queda un denominador nulo."],
      conclusion: "En $x=-1$ removible; en $x=1$ infinita.",
    },
    {
      statement: "Una gráfica tiene ramas que llegan a $2$ por ambos lados, pero un punto cerrado en $(a,5)$.",
      steps: ["El límite general existe y vale $2$.", "El valor de la función es $f(a)=5$.", "Límite y valor no coinciden."],
      conclusion: "Discontinuidad removible.",
    },
  ],
  exercises: [
    { statement: "Si $\\lim_{x\\to a}f(x)=4$ y $f(a)$ no existe, clasifica.", solution: "Discontinuidad removible." },
    { statement: "Si $\\lim_{x\\to a^-}f(x)=2$ y $\\lim_{x\\to a^+}f(x)=7$, clasifica.", solution: "Discontinuidad de salto." },
    { statement: "Si $\\lim_{x\\to a^+}f(x)=\\infty$, clasifica.", solution: "Discontinuidad infinita." },
    { statement: "$f(x)=\\dfrac{x^2-9}{x-3}$ en $x=3$.", solution: "Removible; el límite vale $6$." },
    { statement: "$f(x)=\\dfrac{1}{x+4}$ en $x=-4$.", solution: "Infinita; asíntota vertical $x=-4$." },
    { statement: "$f(x)=\\begin{cases}0,&x<1\\\\2,&x\\ge1\\end{cases}$ en $1$.", solution: "Salto." },
    { statement: "$f(x)=\\sin(1/x)$ en $0$.", solution: "Oscilatoria." },
    { statement: "$f(x)=\\dfrac{x-2}{x^2-4}$ en $x=2$.", solution: "Removible; altura $1/4$." },
    { statement: "$f(x)=\\dfrac{x-2}{x^2-4}$ en $x=-2$.", solution: "Infinita." },
    { statement: "Si $f(a)=5$ y $\\lim_{x\\to a}f(x)=5$, ¿hay discontinuidad?", solution: "No, si el límite existe." },
    { statement: "Si $f(a)=5$ y $\\lim_{x\\to a}f(x)=3$, clasifica.", solution: "Removible." },
    { statement: "$f(x)=\\tan x$ en $x=\\pi/2$.", solution: "Infinita." },
    { statement: "$f(x)=|x|/x$ en $0$.", solution: "Salto." },
    { statement: "$f(x)=\\cos(1/x)$ en $0$.", solution: "Oscilatoria." },
    { statement: "Una gráfica tiene un hueco en $(1,2)$.", solution: "Removible, si los laterales llegan a $2$." },
    { statement: "Ramas que llegan a $-\\infty$ y $+\\infty$ cerca de $a$.", solution: "Infinita." },
    { statement: "¿Puede un salto arreglarse cambiando solo $f(a)$?", solution: "No." },
    { statement: "¿Puede una removible arreglarse cambiando solo $f(a)$?", solution: "Sí, definiendo $f(a)$ como el límite." },
  ],
};

const cambiosVariableContent: TopicContent = {
  contextLabel: "Cambios de variable",
  theory: [
    "Un cambio de variable reemplaza una expresión incómoda por una nueva variable, normalmente $u=g(x)$, para convertir un límite difícil en uno conocido.",
    "La sustitución exige transformar también el destino del límite: si $x\\to a$, entonces hay que calcular a qué valor tiende $u$.",
    "Si $u=g(x)$ y $g(x)\\to b$, entonces estudiar $\\lim_{x\\to a}F(g(x))$ equivale a estudiar $\\lim_{u\\to b}F(u)$.",
    "En límites trigonométricos, sustituciones como $u=ax$ permiten usar $\\lim_{u\\to0}\\sin u/u=1$ y $\\lim_{u\\to0}\\tan u/u=1$.",
    "Con radicales, cambios como $u=\\sqrt{x}$ convierten raíces en potencias y revelan factorizaciones.",
    "Con exponenciales y logaritmos, cambios como $u=kx$ o $u=x-a$ ayudan a reconocer $e^u-1$ o $\\ln(1+u)$ cuando $u\\to0$.",
    "Con funciones racionales, sustituir una expresión repetida simplifica cocientes y evita expandir fórmulas largas.",
    "Errores comunes: dejar el límite como $u\\to a$ sin calcularlo, olvidar que $x=u/a$ si $u=ax$, o aplicar un límite notable cuando el nuevo argumento no tiende a $0$.",
  ],
  formulas: [
    "u=g(x),\\quad x\\to a \\Longrightarrow u\\to b",
    "\\lim_{x\\to a}F(g(x))=\\lim_{u\\to b}F(u) \\quad \\text{si } g(x)\\to b",
    "u=ax \\Longrightarrow x=\\dfrac{u}{a}",
    "\\lim_{x\\to0}\\dfrac{\\sin(ax)}{x}=a",
    "\\lim_{x\\to0}\\dfrac{e^{kx}-1}{x}=k",
    "u=\\sqrt{x} \\Longrightarrow x=u^2",
    "\\lim_{x\\to0}\\dfrac{\\ln(1+kx)}{x}=k",
  ],
  definition: {
    title: "Cambio de variable",
    body:
      "Un cambio de variable en un límite reemplaza $u=g(x)$ y transforma la condición de acercamiento para estudiar el mismo comportamiento local con una expresión más simple.",
  },
  examples: [
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(4x)}{x}$.",
      steps: ["Sea $u=4x$, entonces $u\\to0$.", "Como $x=u/4$, queda $4\\sin u/u$.", "Usamos $\\sin u/u\\to1$."],
      conclusion: "El límite es $4$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{e^{3x}-1}{x}$.",
      steps: ["Sea $u=3x$.", "Entonces $x=u/3$.", "La expresión queda $3(e^u-1)/u$."],
      conclusion: "El límite es $3$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}$ con $u=\\sqrt{x}$.",
      steps: ["Cuando $x\\to4$, $u\\to2$.", "$x=u^2$.", "El cociente queda $(u-2)/((u-2)(u+2))$."],
      conclusion: "El límite es $1/4$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\dfrac{(x+2)^2-9}{x-1}$.",
      steps: ["Sea $u=x+2$, entonces $u\\to3$.", "Además $x-1=u-3$.", "Queda $(u^2-9)/(u-3)$."],
      conclusion: "El límite es $6$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(5x)}{\\sin(2x)}$.",
      steps: ["Reescribimos con $5x$ y $2x$.", "$\\dfrac{\\tan(5x)}{\\sin(2x)}=\\dfrac{\\tan(5x)}{5x}\\dfrac{2x}{\\sin(2x)}\\dfrac{5}{2}$.", "Ambos límites notables valen $1$."],
      conclusion: "El límite es $5/2$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\dfrac{\\ln(1+2x)}{x}$.",
      steps: ["Sea $u=2x$.", "Entonces $x=u/2$.", "Queda $2\\ln(1+u)/u$."],
      conclusion: "El límite es $2$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to2}\\dfrac{\\sin(x-2)}{x-2}$.",
      steps: ["Sea $u=x-2$.", "Cuando $x\\to2$, $u\\to0$.", "La expresión es $\\sin u/u$."],
      conclusion: "El límite es $1$.",
    },
  ],
  exercises: [
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(3x)}{x}$", solution: "$3$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(7x)}{x}$", solution: "$7$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(5x)}{\\sin(2x)}$", solution: "$5/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{e^{4x}-1}{x}$", solution: "$4$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\ln(1+5x)}{x}$", solution: "$5$." },
    { statement: "$\\displaystyle\\lim_{x\\to9}\\dfrac{\\sqrt{x}-3}{x-9}$", solution: "$1/6$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{(x+1)^2-4}{x-1}$", solution: "$4$." },
    { statement: "$\\displaystyle\\lim_{x\\to2}\\dfrac{\\sin(x-2)}{x-2}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to3}\\dfrac{e^{x-3}-1}{x-3}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(6x)}{x^2}$", solution: "$18$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+3x}-1}{x}$", solution: "$3/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{(1+x)^2-1}{x}$", solution: "$2$." },
    { statement: "Si $u=2x-4$ y $x\\to2$, ¿a qué tiende $u$?", solution: "$0$." },
    { statement: "Si $u=x^2$ y $x\\to3$, ¿a qué tiende $u$?", solution: "$9$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(x^2)}{x^2}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(x^3)}{x^3}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{e^{x^2}-1}{x^2}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\dfrac{\\ln x}{x-1}$", solution: "$1$." },
  ],
};

const limitesTrigonometricosContent: TopicContent = {
  contextLabel: "Límites trigonométricos",
  theory: [
    "Los límites trigonométricos conectan geometría, oscilación y aproximación local. Cerca de $0$, las funciones trigonométricas tienen patrones simples.",
    "El límite fundamental es $\\lim_{x\\to0}\\sin x/x=1$, válido cuando $x$ se mide en radianes.",
    "A partir del límite del seno se deduce $\\lim_{x\\to0}\\tan x/x=1$, usando $\\tan x=\\sin x/\\cos x$ y $\\cos x\\to1$.",
    "También $\\lim_{x\\to0}(1-\cos x)/x=0$, porque $1-\cos x$ se anula más rápido que $x$.",
    "Las sustituciones $u=ax$ convierten expresiones con $\\sin(ax)$ o $\\tan(ax)$ en límites fundamentales.",
    "Las identidades trigonométricas ayudan a forzar una expresión hacia una forma conocida.",
    "La compresión explica geométricamente por qué $\\sin x/x\\to1$: seno, arco y tangente se acercan entre sí cerca de $0$.",
    "Errores comunes: usar grados, cancelar $\\sin x$ con $x$, olvidar constantes o aplicar un límite notable sin argumento que tienda a $0$.",
  ],
  formulas: [
    "\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1",
    "\\lim_{x\\to0}\\dfrac{\\tan x}{x}=1",
    "\\lim_{x\\to0}\\dfrac{1-\cos x}{x}=0",
    "\\lim_{x\\to0}\\dfrac{1-\cos x}{x^2}=\\dfrac{1}{2}",
    "\\lim_{x\\to0}\\dfrac{\\sin(ax)}{x}=a",
    "\\lim_{x\\to0}\\dfrac{\\tan(ax)}{x}=a",
    "1-\cos x=2\\sin^2\\!\\left(\\dfrac{x}{2}\\right)",
    "\\sin(2x)=2\\sin x\\cos x",
    "\\tan x=\\dfrac{\\sin x}{\\cos x}",
    "\\lim_{x\\to0}\\dfrac{\\sin(ax)}{\\sin(bx)}=\\dfrac{a}{b}",
  ],
  definition: {
    title: "Límite trigonométrico fundamental",
    body:
      "Un límite trigonométrico fundamental usa aproximaciones locales en radianes, como $\\sin x\\sim x$ y $\\tan x\\sim x$, para transformar expresiones trigonométricas en límites conocidos.",
  },
  examples: [
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(6x)}{x}$", steps: ["Escribimos $6\\sin(6x)/(6x)$.", "El argumento $6x\\to0$.", "El factor notable tiende a $1$."], conclusion: "El límite es $6$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(4x)}{x}$", steps: ["Escribimos $4\\tan(4x)/(4x)$.", "Usamos $\\tan u/u\\to1$."], conclusion: "El límite es $4$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(3x)}{x}$", steps: ["El numerador es de orden $x^2$.", "El denominador es de orden $x$."], conclusion: "El límite es $0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(5x)}{x^2}$", steps: ["Use $1-\cos u\\sim u^2/2$.", "Con $u=5x$, queda $(25x^2)/2$."], conclusion: "El límite es $25/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(7x)}{\\sin(2x)}$", steps: ["Reescribimos como $\\frac{\\sin(7x)}{7x}\\frac{2x}{\\sin(2x)}\\frac{7}{2}$.", "Los dos factores notables tienden a $1$."], conclusion: "El límite es $7/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)\\cos x}{x}$", steps: ["Separamos $\\sin(2x)/x$ y $\\cos x$.", "Los límites son $2$ y $1$."], conclusion: "El límite es $2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(3x)}{\\sin(5x)}$", steps: ["Reescribimos como $\\frac{\\tan(3x)}{3x}\\frac{5x}{\\sin(5x)}\\frac{3}{5}$."], conclusion: "El límite es $3/5$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin^2(4x)}{x^2}$", steps: ["Es $\\left(\\sin(4x)/x\\right)^2$.", "$\\sin(4x)/x\\to4$."], conclusion: "El límite es $16$." },
  ],
  exercises: [
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(3x)}{x}$", solution: "$3$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(8x)}{x}$", solution: "$8$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(5x)}{\\sin x}$", solution: "$5$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(4x)}{\\sin(9x)}$", solution: "$4/9$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos x}{x}$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(2x)}{x^2}$", solution: "$2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(6x)}{x^2}$", solution: "$18$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(3x)}{\\sin(2x)}$", solution: "$3/2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{x}{\\sin(7x)}$", solution: "$1/7$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{x}{\\tan(4x)}$", solution: "$1/4$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin^2(3x)}{x^2}$", solution: "$9$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan^2(2x)}{x^2}$", solution: "$4$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)\\sin(5x)}{x^2}$", solution: "$10$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)}{\\tan(3x)}$", solution: "$2/3$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos x}{\\sin x}$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)\\cos(3x)}{x}$", solution: "$2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan x}{x\\cos x}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(x^2)}{x^2}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(x^2)}{x^2}$", solution: "$0$." },
    { statement: "¿Por qué deben usarse radianes?", solution: "Porque $\\sin x\\sim x$ está normalizado para radianes." },
  ],
};

const asintotasVerticalesHorizontalesContent: TopicContent = {
  contextLabel: "Asíntotas verticales y horizontales",
  theory: [
    "Una asíntota es una recta que describe el comportamiento límite de una gráfica. No es una pared mágica: es una referencia geométrica que la función puede acercarse a largo plazo o cerca de un punto problemático.",
    "Una asíntota vertical tiene ecuación $x=a$ y aparece cuando la función crece sin cota positiva o negativa al acercarse a $a$ desde al menos un lado. En lenguaje de límites, buscamos $\\lim_{x\\to a^-}f(x)=\\pm\\infty$ o $\\lim_{x\\to a^+}f(x)=\\pm\\infty$.",
    "Una asíntota horizontal tiene ecuación $y=L$ y describe el comportamiento de la función cuando $x\\to\\infty$ o $x\\to-\\infty$. Se detecta con límites al infinito: $\\lim_{x\\to\\infty}f(x)=L$ o $\\lim_{x\\to-\\infty}f(x)=L$.",
    "Las asíntotas verticales requieren atención lateral. Una misma recta $x=a$ puede tener $+\\infty$ por un lado y $-\\infty$ por el otro, o infinito solo desde un lado dentro del dominio.",
    "En funciones racionales, no todo cero del denominador produce asíntota vertical. Si el factor se cancela con el numerador, normalmente aparece un hueco removible; si queda en el denominador después de simplificar, hay una candidata fuerte a asíntota vertical.",
    "Para asíntotas horizontales de racionales, la comparación de grados da una lectura rápida: si el numerador tiene menor grado, $y=0$; si los grados son iguales, $y$ es el cociente de coeficientes principales; si el numerador tiene mayor grado, no hay asíntota horizontal finita.",
    "Exponenciales y logaritmos también producen asíntotas. Por ejemplo, $e^{-x}\\to0$ cuando $x\\to\\infty$, así que muchas funciones exponenciales desplazadas tienen asíntotas horizontales; $\\ln x$ tiene asíntota vertical en $x=0$ por la derecha.",
    "Las asíntotas ayudan a bosquejar una gráfica porque muestran comportamiento extremo: dónde la función se dispara, hacia qué altura se estabiliza y cómo se organizan las ramas.",
    "Una función puede cruzar una asíntota horizontal en valores finitos de $x$. La palabra “asíntota” describe lo que ocurre al infinito, no una prohibición de intersección. En cambio, una asíntota vertical usualmente marca una ruptura del dominio.",
    "Errores comunes: decir que la función “equals infinity”, olvidar analizar ambos lados, asumir que todo denominador cero da una asíntota, confundir huecos con asíntotas verticales, o buscar asíntotas horizontales sustituyendo literalmente $x=\\infty$ como si fuera un número.",
  ],
  formulas: [
    "x=a \\text{ es asíntota vertical si } \\lim_{x\\to a^-}f(x)=\\pm\\infty \\text{ o } \\lim_{x\\to a^+}f(x)=\\pm\\infty",
    "y=L \\text{ es asíntota horizontal hacia la derecha si } \\lim_{x\\to\\infty}f(x)=L",
    "y=L \\text{ es asíntota horizontal hacia la izquierda si } \\lim_{x\\to-\\infty}f(x)=L",
    "\\lim_{x\\to\\infty}\\dfrac{a_nx^n+\\cdots}{b_mx^m+\\cdots}=\\begin{cases}0,&n<m\\\\ \\dfrac{a_n}{b_m},&n=m\\\\ \\text{no finito},&n>m\\end{cases}",
    "\\dfrac{(x-a)g(x)}{(x-a)h(x)}=\\dfrac{g(x)}{h(x)}\\quad (x\\ne a) \\quad \\Rightarrow \\quad \\text{posible hueco en } x=a",
    "\\lim_{x\\to\\infty}e^{-x}=0",
    "\\lim_{x\\to0^+}\\ln x=-\\infty",
    "\\tan x \\text{ tiene asíntotas verticales en } x=\\dfrac{\\pi}{2}+k\\pi,\\; k\\in\\mathbb{Z}",
    "\\lim_{x\\to\\infty}\\left(L+\\dfrac{c}{x^p}\\right)=L \\quad (p>0)",
  ],
  definition: {
    title: "Asíntotas desde límites",
    body:
      "Una asíntota vertical $x=a$ se identifica mediante límites laterales infinitos cerca de $a$. Una asíntota horizontal $y=L$ se identifica mediante límites finitos cuando $x\\to\\infty$ o $x\\to-\\infty$. Ambas son descripciones de comportamiento límite, no valores ordinarios de la función.",
  },
  examples: [
    {
      statement: "Encuentra las asíntotas verticales de $f(x)=\\dfrac{2}{x-3}$.",
      steps: [
        "El denominador se anula en $x=3$.",
        "No hay factor que cancelar.",
        "Cuando $x\\to3^-$, $x-3<0$ y $f(x)\\to-\\infty$.",
        "Cuando $x\\to3^+$, $x-3>0$ y $f(x)\\to\\infty$.",
      ],
      conclusion: "La recta $x=3$ es una asíntota vertical.",
    },
    {
      statement: "Distingue hueco y asíntota en $f(x)=\\dfrac{x^2-1}{x-1}$.",
      steps: [
        "Factorizamos: $x^2-1=(x-1)(x+1)$.",
        "Para $x\\ne1$, $f(x)=x+1$.",
        "El factor problemático se cancela completamente.",
        "El límite en $1$ es $2$, no infinito.",
      ],
      conclusion: "Hay un hueco removible en $(1,2)$, no una asíntota vertical.",
    },
    {
      statement: "Encuentra la asíntota horizontal de $f(x)=\\dfrac{3x^2-5}{2x^2+x+1}$.",
      steps: [
        "Numerador y denominador tienen grado $2$.",
        "Comparamos coeficientes principales: $3$ y $2$.",
        "El límite al infinito es $3/2$.",
      ],
      conclusion: "La asíntota horizontal es $y=\\dfrac{3}{2}$.",
    },
    {
      statement: "Calcula las asíntotas horizontales de $f(x)=2+\\dfrac{5}{x}$ usando límites.",
      steps: [
        "$\\lim_{x\\to\\infty}\\dfrac{5}{x}=0$.",
        "$\\lim_{x\\to-\\infty}\\dfrac{5}{x}=0$.",
        "Entonces $f(x)\\to2$ en ambos extremos.",
      ],
      conclusion: "La asíntota horizontal es $y=2$ hacia ambos lados.",
    },
    {
      statement: "Analiza los límites laterales de $f(x)=\\dfrac{1}{(x+2)^2}$ cerca de $x=-2$.",
      steps: [
        "El denominador se acerca a $0$ cuando $x\\to-2$.",
        "Como está al cuadrado, siempre se acerca a $0^+$.",
        "Por ambos lados, el cociente crece sin cota positiva.",
      ],
      conclusion: "$\\lim_{x\\to-2^-}f(x)=\\infty$ y $\\lim_{x\\to-2^+}f(x)=\\infty$; $x=-2$ es asíntota vertical.",
    },
    {
      statement: "Da un ejemplo de función que cruza su asíntota horizontal: $f(x)=1+\\dfrac{\\sin x}{x}$.",
      steps: [
        "Cuando $x\\to\\infty$, $\\sin x$ está acotada entre $-1$ y $1$.",
        "Entonces $\\dfrac{\\sin x}{x}\\to0$ por compresión.",
        "Por tanto $f(x)\\to1$.",
        "Como $\\sin x=0$ en muchos valores positivos, $f(x)=1$ allí.",
      ],
      conclusion: "La función cruza la asíntota horizontal $y=1$ infinitas veces.",
    },
    {
      statement: "Encuentra la asíntota vertical de $f(x)=\\ln(x-4)$.",
      steps: [
        "El dominio exige $x>4$.",
        "Cuando $x\\to4^+$, $x-4\\to0^+$.",
        "$\\ln(x-4)\\to-\\infty$.",
      ],
      conclusion: "La recta $x=4$ es asíntota vertical.",
    },
    {
      statement: "Encuentra las asíntotas verticales de $f(x)=\\tan(2x)$.",
      steps: [
        "$\\tan u$ tiene asíntotas cuando $u=\\dfrac{\\pi}{2}+k\\pi$.",
        "Aquí $u=2x$.",
        "Resolvemos $2x=\\dfrac{\\pi}{2}+k\\pi$.",
      ],
      conclusion: "Las asíntotas verticales son $x=\\dfrac{\\pi}{4}+\\dfrac{k\\pi}{2}$, con $k\\in\\mathbb{Z}$.",
    },
    {
      statement: "Encuentra la asíntota horizontal de $f(x)=4-3e^{-x}$ hacia la derecha.",
      steps: [
        "Cuando $x\\to\\infty$, $e^{-x}\\to0$.",
        "Entonces $-3e^{-x}\\to0$.",
        "La función se aproxima a $4$.",
      ],
      conclusion: "Hacia la derecha, la asíntota horizontal es $y=4$.",
    },
  ],
  exercises: [
    { statement: "Asíntota vertical de $f(x)=\\dfrac{1}{x-5}$.", solution: "$x=5$." },
    { statement: "Límites laterales de $\\dfrac{1}{x-5}$ en $5$.", solution: "Izquierda $-\\infty$, derecha $\\infty$." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{2x+1}{x-3}$.", solution: "$y=2$." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{5}{x^2+1}$.", solution: "$y=0$." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{4x^3-x}{2x^3+7}$.", solution: "$y=2$." },
    { statement: "¿Tiene asíntota horizontal $f(x)=x^2/(x+1)$?", solution: "No finita; el numerador tiene mayor grado." },
    { statement: "$f(x)=\\dfrac{x^2-4}{x-2}$ en $x=2$: ¿hueco o AV?", solution: "Hueco; se cancela $x-2$." },
    { statement: "$f(x)=\\dfrac{x+2}{x^2-4}$ en $x=2$.", solution: "Asíntota vertical; queda denominador $x-2$." },
    { statement: "$f(x)=\\dfrac{x+2}{x^2-4}$ en $x=-2$.", solution: "Hueco removible; se cancela $x+2$." },
    { statement: "Asíntota vertical de $f(x)=\\ln(x+1)$.", solution: "$x=-1$." },
    { statement: "Límite $\\lim_{x\\to-1^+}\\ln(x+1)$.", solution: "$-\\infty$." },
    { statement: "Asíntota horizontal de $f(x)=3+e^{-x}$ hacia $x\\to\\infty$.", solution: "$y=3$." },
    { statement: "Asíntota horizontal de $f(x)=2-e^x$ hacia $x\\to-\\infty$.", solution: "$y=2$." },
    { statement: "Asíntotas verticales de $\\tan x$.", solution: "$x=\\pi/2+k\\pi$, $k\\in\\mathbb{Z}$." },
    { statement: "Asíntotas verticales de $\\tan(3x)$.", solution: "$x=\\pi/6+k\\pi/3$." },
    { statement: "¿Puede una función cruzar una asíntota horizontal?", solution: "Sí; la asíntota describe comportamiento al infinito." },
    { statement: "¿La función puede “igualar infinito”?", solution: "No; $\\infty$ describe crecimiento sin cota, no un número real." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{-x^2+1}{4x^2+3}$.", solution: "$y=-1/4$." },
    { statement: "Asíntota vertical de $f(x)=\\dfrac{1}{\\sqrt{x-2}}$.", solution: "$x=2$ por la derecha." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{\\sqrt{x^2+1}}{x}$ cuando $x\\to\\infty$.", solution: "$y=1$." },
    { statement: "Asíntota horizontal de $f(x)=\\dfrac{\\sqrt{x^2+1}}{x}$ cuando $x\\to-\\infty$.", solution: "$y=-1$." },
    { statement: "$f(x)=1+\\dfrac{\\cos x}{x}$, asíntota horizontal hacia $\\infty$.", solution: "$y=1$ por compresión." },
    { statement: "¿Todo cero del denominador da AV?", solution: "No; puede cancelarse y producir un hueco." },
    { statement: "¿Qué se revisa para AV?", solution: "Límites laterales infinitos." },
  ],
};

const examExercise = (statement: string, solution: string): TopicExercise => ({ statement, solution });

limitesInfinitosContent.examples = [
  ...limitesInfinitosContent.examples.slice(0, 4),
  {
    statement: "Calcula $\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{4x^2-3x}-\\sqrt{x^2+5x}\\right)$.",
    steps: [
      "Para $x\\to+\\infty$, factorizamos $x^2$ dentro de cada radical.",
      "$\\sqrt{4x^2-3x}=x\\sqrt{4-3/x}$ y $\\sqrt{x^2+5x}=x\\sqrt{1+5/x}$.",
      "La expresión es $x\\left(\\sqrt{4-3/x}-\\sqrt{1+5/x}\\right)$.",
      "El paréntesis tiende a $2-1=1$.",
    ],
    conclusion: "El límite es $+\\infty$.",
  },
  {
    statement: "Calcula $\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-\\sqrt{x^2-2x}\\right)$.",
    steps: [
      "Racionalizamos la diferencia de radicales.",
      "El numerador conjugado da $(x^2+6x)-(x^2-2x)=8x$.",
      "El denominador es $\\sqrt{x^2+6x}+\\sqrt{x^2-2x}=x(\\sqrt{1+6/x}+\\sqrt{1-2/x})$.",
      "Cancelamos $x$ y tomamos el límite.",
    ],
    conclusion: "El límite es $\\dfrac{8}{2}=4$.",
  },
  ...limitesInfinitosContent.examples.slice(4),
];

tecnicasAlgebraicasLimitesContent.examples = [
  ...tecnicasAlgebraicasLimitesContent.examples.slice(0, 3),
  {
    statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\dfrac{\\sqrt[3]{2x-1}-1}{1-\\sqrt[4]{2x-1}}$.",
    steps: [
      "Tomamos $u=\\sqrt[12]{2x-1}$; entonces $u\\to1$.",
      "$\\sqrt[3]{2x-1}=u^4$ y $\\sqrt[4]{2x-1}=u^3$.",
      "El cociente queda $\\dfrac{u^4-1}{1-u^3}$.",
      "Factorizamos: $u^4-1=(u-1)(u+1)(u^2+1)$ y $1-u^3=-(u-1)(u^2+u+1)$.",
    ],
    conclusion: "El límite es $-\\dfrac{(2)(2)}{3}=-\\dfrac{4}{3}$.",
  },
  ...tecnicasAlgebraicasLimitesContent.examples.slice(3),
];

continuidadPuntoIntervaloContent.examples = [
  ...continuidadPuntoIntervaloContent.examples.slice(0, 3),
  {
    statement: "Halla $a$ para que $g(x)=\\begin{cases}\\sqrt[4]{\\dfrac{x^3+x^2-2x-2}{(x+2)(x^2-2x-3)}},&x<-2\\\\ ax+\\dfrac{5}{3},&x\\ge -2\\end{cases}$ sea continua en $x=-2$.",
    steps: [
      "Factorizamos $x^3+x^2-2x-2=(x+1)(x^2-2)$ y $x^2-2x-3=(x-3)(x+1)$.",
      "Para $x<-2$, se simplifica el radicando a $\\dfrac{x^2-2}{(x+2)(x-3)}$ cuando no haya factores comunes adicionales; revisamos el límite lateral.",
      "Al sustituir $x\\to-2^-$, el denominador tiende a $0$; no hay valor finito que empatar.",
      "La continuidad exigiría un límite lateral finito igual a $-2a+5/3$.",
    ],
    conclusion: "Con esta estructura no existe $a$ que haga continua la función; el límite lateral izquierdo es infinito.",
  },
  ...continuidadPuntoIntervaloContent.examples.slice(3),
];

limitesTrigonometricosContent.examples = [
  ...limitesTrigonometricosContent.examples,
  {
    statement: "$\\displaystyle\\lim_{\\theta\\to0}\\dfrac{\\tan\\theta-\\sin\\theta}{\\sec\\theta-1}$",
    steps: [
      "Escribimos $\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}$ y $\\sec\\theta=\\dfrac{1}{\\cos\\theta}$.",
      "El numerador es $\\sin\\theta\\left(\\dfrac{1}{\\cos\\theta}-1\\right)$.",
      "El denominador es $\\dfrac{1}{\\cos\\theta}-1$.",
      "Cancelamos el factor común para $\\theta\\ne0$ cerca de $0$.",
    ],
    conclusion: "El límite es $\\lim_{\\theta\\to0}\\sin\\theta=0$.",
  },
];

limitesIntuitivoContent.exercises = [
  examExercise("Para $f(x)=\\begin{cases}x+2,&x<-1\\\\x^2,&-1\\le x<1\\\\2,&x=1\\\\3-x,&x>1\\end{cases}$, halla los límites laterales y el límite general en $x=-1$.", "Izquierda $1$, derecha $1$; el límite general existe y vale $1$."),
  examExercise("Para la misma función, halla $\\lim_{x\\to1^-}f(x)$, $\\lim_{x\\to1^+}f(x)$ y decide continuidad en $1$.", "Izquierda $1$, derecha $2$; el límite general no existe, aunque $f(1)=2$. No es continua."),
  examExercise("Una gráfica cumple $\\lim_{x\\to-1^-}f(x)=2$, $\\lim_{x\\to-1^+}f(x)=1$ y $f(-1)=3$. Decide límite y continuidad.", "El límite general no existe por laterales distintos; no es continua. $f(-1)$ no decide el límite."),
  examExercise("Una gráfica tiene hueco en $(2,4)$ y punto cerrado en $(2,-1)$. Indica $f(2)$, $\\lim_{x\\to2}f(x)$ y el tipo de discontinuidad.", "$f(2)=-1$, límite $4$; discontinuidad removible."),
  examExercise("Sea $g(x)=\\begin{cases}\\dfrac{x^2-4}{x-2},&x<2\\\\k,&x=2\\\\x+2,&x>2\\end{cases}$. Halla $k$ para continuidad en $2$.", "Ambos laterales valen $4$; se requiere $k=4$."),
  examExercise("Sea $h(x)=\\begin{cases}2x+a,&x<1\\\\x^2+3,&x\\ge1\\end{cases}$. Halla $a$ para que exista $\\lim_{x\\to1}h(x)$.", "Izquierda $2+a$, derecha $4$; $a=2$."),
  examExercise("Si $\\lim_{x\\to a^-}f(x)=L$, $\\lim_{x\\to a^+}f(x)=L$ y $f(a)$ no existe, ¿qué puede concluirse?", "El límite general existe y vale $L$, pero no hay continuidad en $a$."),
  examExercise("Describe un caso donde $f(a)$ existe pero $\\lim_{x\\to a}f(x)$ no.", "Por ejemplo $f(x)=|x|/x$ para $x\\ne0$ y $f(0)=0$; los laterales son $-1$ y $1$."),
  examExercise("Para $p(x)=\\begin{cases}\\sin(1/x),&x\\ne0\\\\0,&x=0\\end{cases}$, decide si existe $\\lim_{x\\to0}p(x)$.", "No existe; la función oscila sin acercarse a un valor único."),
  examExercise("Una tabla cerca de $3$ muestra valores por izquierda hacia $5$ y por derecha hacia $5.02,5.002,5.0002$. ¿Qué conjetura razonable haces?", "Que $\\lim_{x\\to3}f(x)=5$, aunque una tabla no es prueba formal."),
  examExercise("Si al acercarse a $a$ por ambos lados una función crece sin cota, ¿existe un límite finito?", "No; puede escribirse un límite infinito, pero no un límite real finito."),
  examExercise("Sea $q(x)=\\begin{cases}x^2-1,&x<0\\\\1-x,&x>0\\end{cases}$. ¿Existe $\\lim_{x\\to0}q(x)$?", "Izquierda $-1$, derecha $1$; no existe."),
];

limitesInfinitosContent.exercises = [
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{9x^2+2x}-\\sqrt{4x^2-7x}\\right)$", "Factoriza $x^2$: $x(3-2+o(1))\\to+\\infty$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-\\sqrt{x^2-4x}\\right)$", "Racionaliza: $12x/[x(\\sqrt{1+8/x}+\\sqrt{1-4/x})]\\to6$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{4x^2-x}-2x\\right)$", "Racionaliza: $(-x)/(\\sqrt{4x^2-x}+2x)\\to-1/4$."),
  examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{3x^2-5x+1}{2x^2+x-4}$", "Divide por $x^2$; límite $3/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{x^3-2x}{5x^2+1}$", "Crece como $x/5$; límite $+\\infty$."),
  examExercise("$\\displaystyle\\lim_{x\\to0^+}\\dfrac{\\ln x}{x+1}$", "$\\ln x\\to-\\infty$ y denominador $\\to1$; límite $-\\infty$."),
  examExercise("$\\displaystyle\\lim_{x\\to\\pi/2^-}\\tan x$", "$+\\infty$ por el signo de $\\cos x$ positivo pequeño."),
  examExercise("$\\displaystyle\\lim_{x\\to\\pi/2^+}\\tan x$", "$-\\infty$ por el signo de $\\cos x$ negativo pequeño."),
  examExercise("Para $f(x)=\\dfrac{5x}{(x-1)(x^2+1)}$, estudia el comportamiento en $x=1$.", "Denominador cero real solo en $1$; laterales: izquierda $-\\infty$, derecha $+\\infty$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{1-3\\ln x}{4\\ln x+2}$", "Divide por $\\ln x$; límite $-3/4$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{2x^2+x}-\\sqrt{5x^2-x}\\right)$", "$x(\\sqrt2-\\sqrt5+o(1))\\to-\\infty$."),
  examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\left(\\sqrt{x^2+3x}+x\\right)$", "Como $x<0$, $\\sqrt{x^2+3x}=(-x)\\sqrt{1+3/x}$; límite $-3/2$."),
];

tecnicasAlgebraicasLimitesContent.exercises = [
  examExercise("$\\displaystyle\\lim_{x\\to2}\\dfrac{x^3-8}{x^2-4}$", "Factoriza: $(x-2)(x^2+2x+4)/[(x-2)(x+2)]\\to12/4=3$."),
  examExercise("$\\displaystyle\\lim_{x\\to1}\\dfrac{x^3-3x+2}{x^2-1}$", "Numerador $(x-1)^2(x+2)$, denominador $(x-1)(x+1)$; límite $0$."),
  examExercise("$\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x+5}-3}{x-4}$", "Racionaliza; queda $1/(\\sqrt{x+5}+3)\\to1/6$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+2x}-\\sqrt{1-3x}}{x}$", "Racionaliza: $5x/[x(\\sqrt{1+2x}+\\sqrt{1-3x})]\\to5/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to1}\\dfrac{\\sqrt[3]{2x-1}-1}{1-\\sqrt[4]{2x-1}}$", "Sea $u=\\sqrt[12]{2x-1}$; queda $(u^4-1)/(1-u^3)\\to-4/3$."),
  examExercise("$\\displaystyle\\lim_{h\\to0}\\dfrac{\\frac{1}{2+h}-\\frac{1}{2}}{h}$", "Unifica: $[-h/(2(2+h))]/h\\to-1/4$."),
  examExercise("$\\displaystyle\\lim_{x\\to3}\\dfrac{x^2-6x+9}{x^2-9}$", "$(x-3)^2/[(x-3)(x+3)]\\to0$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt[3]{1+x}-1}{x}$", "Usa $a^3-b^3$: $1/(\\sqrt[3]{(1+x)^2}+\\sqrt[3]{1+x}+1)\\to1/3$."),
  examExercise("$\\displaystyle\\lim_{x\\to2}\\dfrac{x^4-16}{x^3-8}$", "Factoriza potencias: $(x-2)(x+2)(x^2+4)/[(x-2)(x^2+2x+4)]\\to(4\\cdot8)/12=8/3$."),
  examExercise("$\\displaystyle\\lim_{x\\to1}\\dfrac{\\frac{1}{x}-1+x-1}{(x-1)^2}$", "Unifica: $1/x-1+x-1=(x-1)^2/x$; límite $1$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{4+x}-\\sqrt{4-x}}{x}$", "Racionaliza: $2x/[x(\\sqrt{4+x}+\\sqrt{4-x})]\\to1/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to-1}\\dfrac{x^3+1}{x^2+3x+2}$", "$(x+1)(x^2-x+1)/[(x+1)(x+2)]\\to3$."),
];

indeterminacionesCompresionContent.exercises = [
  examExercise("$\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}$", "$0/0$; factoriza y obtiene $4$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+4x}-1}{x}$", "$0/0$; racionaliza y obtiene $2$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{7x^3-x}{2x^3+5x^2}$", "$\\infty/\\infty$; divide por $x^3$ y obtiene $7/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to0^+}x\\ln(2x)$", "Es $0\\cdot(-\\infty)$; con $u=1/x$, tiende a $0$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+5x}-x\\right)$", "$\\infty-\\infty$; racionaliza y obtiene $5/2$."),
  examExercise("Si $0\\le f(x)\\le\\dfrac{3}{x^2}$ para $x>0$, halla $\\lim_{x\\to+\\infty}f(x)$.", "Por compresión, $0\\le f(x)\\le3/x^2\\to0$; límite $0$."),
  examExercise("Si $-x^2\\le f(x)\\le x^2$ cerca de $0$, halla $\\lim_{x\\to0}f(x)$.", "Ambas cotas tienden a $0$; por compresión, límite $0$."),
  examExercise("Si $x^2\\cos(1/x)\\le f(x)\\le x^2$ cerca de $0$, ¿se puede concluir el límite?", "Sí: $-x^2\\le x^2\\cos(1/x)\\le f(x)\\le x^2$ no se deduce completo salvo que se conozca cota inferior; si se da esa desigualdad, la inferior también tiende a $0$, luego límite $0$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(3x)}{x^2}$", "Usa identidad o notable; vale $9/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan x-\\sin x}{\\sec x-1}$", "Reescribe en $\\sin,\\cos$; cancela $1/\\cos x-1$; queda $\\sin x\\to0$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\sin(1/x)$", "No existe; acotada no implica comprimida a un único valor."),
  examExercise("$\\displaystyle\\lim_{x\\to0}x\\sin(5/x)$", "Por $-|x|\\le x\\sin(5/x)\\le |x|$, límite $0$."),
];

continuidadPuntoIntervaloContent.exercises = [
  examExercise("Sea $f(x)=\\begin{cases}\\dfrac{x^2-1}{x-1},&x\\ne1\\\\k,&x=1\\end{cases}$. Halla $k$ para continuidad.", "El límite es $2$; se requiere $k=2$."),
  examExercise("Sea $g(x)=\\begin{cases}ax+1,&x<2\\\\x^2-a,&x\\ge2\\end{cases}$. Halla $a$ para continuidad en $2$.", "Izquierda $2a+1$, derecha $4-a$; $3a=3$, $a=1$."),
  examExercise("Determina continuidad de $f(x)=\\dfrac{x^2-4}{x-2}$ en $2$.", "$f(2)$ no existe aunque el límite vale $4$; no es continua."),
  examExercise("Sea $h(x)=\\begin{cases}\\sqrt{x+4},&x<0\\\\a x+2,&x\\ge0\\end{cases}$. Halla $a$ para continuidad en $0$.", "Ambas ramas valen $2$ en el límite sin importar $a$; todo $a\\in\\mathbb R$."),
  examExercise("¿Dónde es continua $f(x)=\\dfrac{x^2+1}{(x-1)(x^2+4)}$?", "Denominador real cero solo en $1$; continua en $\\mathbb R\\setminus\\{1\\}$."),
  examExercise("Sea $p(x)=\\begin{cases}\\dfrac{x^2+3x+2}{x+2},&x<-2\\\\ax+5/3,&x\\ge-2\\end{cases}$. Halla $a$ para continuidad en $-2$.", "Límite izquierdo $x+1\\to-1$; rama derecha vale $-2a+5/3$. Igualando: $a=4/3$."),
  examExercise("Si $f(a)$ existe y $\\lim_{x\\to a}f(x)$ no existe, ¿puede ser continua?", "No; falla la segunda condición."),
  examExercise("Evalúa $\\lim_{x\\to0}\\ln(3+e^x)$ usando continuidad.", "$\\ln(3+1)=\\ln4$."),
  examExercise("Sea $f(x)=\\begin{cases}x^2+b,&x<1\\\\3x+a,&x\\ge1\\end{cases}$. Da una relación entre $a,b$ para continuidad.", "$1+b=3+a$, por tanto $b=a+2$."),
  examExercise("¿Dónde es continua $f(x)=\\sqrt{9-x^2}$?", "En $[-3,3]$, con continuidad lateral en extremos."),
  examExercise("Sea $f(x)=\\begin{cases}\\sin x/x,&x\\ne0\\\\k,&x=0\\end{cases}$. Halla $k$ para continuidad.", "El límite notable vale $1$; $k=1$."),
  examExercise("Sea $f(x)=\\begin{cases}e^{x-1},&x<1\\\\ax+b,&x\\ge1\\end{cases}$ con $b=2$. Halla $a$ para continuidad.", "Izquierda $1$; derecha $a+2$; $a=-1$."),
];

continuidadLateralContent.exercises = [
  examExercise("En $[2,\\infty)$, revisa continuidad de $f(x)=\\sqrt{x-2}$ en $2$.", "$f(2)=0$ y $\\lim_{x\\to2^+}\\sqrt{x-2}=0$; continua por derecha."),
  examExercise("Sea $f(x)=\\begin{cases}x+1,&x<0\\\\2,&x=0\\\\2\\cos x,&x>0\\end{cases}$. Revisa continuidad lateral en $0$.", "Izquierda $1\\ne2$; derecha $2=f(0)$; continua solo por derecha."),
  examExercise("Halla $k$ para continuidad por izquierda: $f(x)=\\begin{cases}kx+3,&x<1\\\\5,&x=1\\end{cases}$.", "$k+3=5$, entonces $k=2$."),
  examExercise("Halla $k$ para continuidad por derecha: $f(x)=\\begin{cases}k,&x=-1\\\\x^2+2x+4,&x>-1\\end{cases}$.", "Límite derecho $1-2+4=3$; $k=3$."),
  examExercise("En $[-3,1]$, ¿qué condición se usa para continuidad en $-3$?", "$\\lim_{x\\to-3^+}f(x)=f(-3)$."),
  examExercise("En $[-3,1]$, ¿qué condición se usa para continuidad en $1$?", "$\\lim_{x\\to1^-}f(x)=f(1)$."),
  examExercise("Sea $f(x)=\\ln(x+2)$ en $(-2,5]$. ¿Se revisa continuidad en $-2$?", "No, $-2$ no pertenece al intervalo."),
  examExercise("Sea $f(x)=\\begin{cases}\\dfrac{x^2-4}{x-2},&x<2\\\\4,&x=2\\\\\\sqrt{x+2},&x>2\\end{cases}$. ¿Continua por izquierda y derecha en $2$?", "Izquierda $4=f(2)$; derecha $2\\ne4$. Solo por izquierda."),
  examExercise("Halla $a$ para que $f(x)=\\begin{cases}a-x,&x\\le0\\\\e^x+a,&x>0\\end{cases}$ sea continua por derecha en $0$.", "$f(0)=a$, derecha $1+a$; imposible."),
  examExercise("¿Puede haber continuidad lateral en $a$ si $f(a)$ no está definido?", "No; la continuidad lateral exige valor en el punto."),
  examExercise("Sea $f(x)=\\begin{cases}x^2,&x<1\\\\1,&x=1\\\\mx+n,&x>1\\end{cases}$. Condición para continuidad por derecha en $1$.", "$m+n=1$."),
  examExercise("Sea $f(x)=1/\\sqrt{x}$ en $(0,\\infty)$. ¿Tiene continuidad por derecha en $0$ como función real extendida a $[0,\\infty)$?", "No; $f(0)$ no existe y el límite derecho es infinito."),
];

tiposDiscontinuidadContent.exercises = [
  examExercise("$f(x)=\\dfrac{x^2-9}{x-3}$ en $x=3$.", "Removible; límite $6$ y falta/puede fallar $f(3)$."),
  examExercise("$f(x)=\\dfrac{x+2}{(x+2)(x-1)}$ en $x=-2$ y $x=1$.", "En $-2$ removible; en $1$ infinita."),
  examExercise("$f(x)=\\begin{cases}2,&x<0\\\\5,&x=0\\\\-1,&x>0\\end{cases}$ en $0$.", "Salto; laterales $2$ y $-1$."),
  examExercise("$f(x)=\\sin(1/x)$ con $f(0)=0$.", "Oscilatoria en $0$."),
  examExercise("Para $f(x)=\\dfrac{5x}{(x-1)(x^2+1)}$, clasifica discontinuidades reales.", "Solo $x=1$; infinita, pues no hay cancelación y $x^2+1>0$."),
  examExercise("Describe el comportamiento lateral de la función anterior en $x=1$.", "Izquierda $-\\infty$, derecha $+\\infty$."),
  examExercise("Si $f(a)=7$, $\\lim_{x\\to a^-}f(x)=3$ y $\\lim_{x\\to a^+}f(x)=3$, clasifica.", "Removible; el límite existe pero no coincide con $f(a)$."),
  examExercise("Si los laterales son $-\\infty$ y $+\\infty$, clasifica.", "Discontinuidad infinita."),
  examExercise("Si los laterales finitos son iguales pero $f(a)$ no existe.", "Removible."),
  examExercise("Si los laterales finitos no son iguales.", "Salto."),
  examExercise("$f(x)=\\tan(2x)$ en $x=\\pi/4$.", "Infinita; asíntota vertical."),
  examExercise("$f(x)=\\ln(x+3)$ en $x=-3$.", "Infinita por la derecha; asíntota vertical."),
];

cambiosVariableContent.exercises = [
  examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{1-3\\ln(-x)}{4\\ln(-x)}$", "Sea $u=\\ln(-x)\\to+\\infty$; $(1-3u)/(4u)\\to-3/4$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(5x)}{x}$", "Con $u=5x$, queda $5\\sin u/u\\to5$."),
  examExercise("$\\displaystyle\\lim_{x\\to1}\\dfrac{\\ln x}{x-1}$", "Sea $u=x-1$; $\\ln(1+u)/u\\to1$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{e^{2x}-1}{\\sin(3x)}$", "Con $u=2x$, $v=3x$: equivale a $(2x)/(3x)\\to2/3$."),
  examExercise("$\\displaystyle\\lim_{x\\to1}\\dfrac{\\sqrt[3]{3x-2}-1}{x-1}$", "Sea $u=3x-2\\to1$; equivalente a razón de cubo, límite $1$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(4x)}{x^2}$", "Sea $u=4x$; $1-\cos u\\sim u^2/2$, límite $8$."),
  examExercise("$\\displaystyle\\lim_{x\\to2}\\dfrac{\\sin(x^2-4)}{x-2}$", "$x^2-4=(x-2)(x+2)$; con $u=x^2-4$, límite $4$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\ln(1+\\sin x)}{x}$", "Sea $u=\\sin x\\to0$; $\\ln(1+u)/u\\cdot\\sin x/x\\to1$."),
  examExercise("$\\displaystyle\\lim_{x\\to3}\\dfrac{(x-1)^2-4}{x-3}$", "Sea $u=x-1\\to2$; $(u^2-4)/(u-2)\\to4$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sqrt{1+\\tan x}-1}{x}$", "Racionaliza y usa $\\tan x/x\\to1$; límite $1/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{2+\\sqrt{\\ln(-x)}}{3\\sqrt{\\ln(-x)}-1}$", "Sea $u=\\sqrt{\\ln(-x)}\\to\\infty$; límite $1/3$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(x^2)}{1-\cos x}$", "Numerador $\\sim x^2$, denominador $\\sim x^2/2$; límite $2$."),
];

limitesTrigonometricosContent.exercises = [
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(7x)}{\\tan(2x)}$", "$7/2$."),
  examExercise("$\\displaystyle\\lim_{\\theta\\to0}\\dfrac{\\tan\\theta-\\sin\\theta}{\\sec\\theta-1}$", "Reescribe en $\\sin,\\cos$ y cancela; límite $0$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\cos(5x)}{x^2}$", "$25/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(3x)\\sin(4x)}{x^2}$", "$12$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan^2(3x)}{1-\cos(2x)}$", "Numerador $\\sim9x^2$, denominador $\\sim2x^2$; límite $9/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sec x-1}{x^2}$", "$(1-\\cos x)/(x^2\\cos x)\\to1/2$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)-2\\sin x}{x^3}$", "Usa $\\sin(2x)=2\\sin x\\cos x$; queda $2\\sin x(\\cos x-1)/x^3\\to-1$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(3x)}{\\sin^2(2x)}$", "$(9x^2/2)/(4x^2)=9/8$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(5x)}{\\sin(3x)+\\tan(2x)}$", "$5/(3+2)=1$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{x\\cos x}{\\sin(6x)}$", "$1/6$."),
  examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin^2 x}{x\\tan(4x)}$", "$1/4$."),
  examExercise("¿Por qué no se puede usar grados en $\\lim_{x\\to0}\\sin x/x=1$?", "Porque la aproximación $\\sin x\\sim x$ está normalizada en radianes."),
];

asintotasVerticalesHorizontalesContent.exercises = [
  examExercise("Para $f(x)=\\dfrac{5x}{(x-1)(x^2+1)}$, halla discontinuidades y asíntotas verticales.", "Discontinua solo en $x=1$; es infinita y AV $x=1$."),
  examExercise("Comportamiento de la función anterior cerca de $x=1$.", "Como $x^2+1>0$ y $5x>0$ cerca de $1$: izquierda $-\\infty$, derecha $+\\infty$."),
  examExercise("$f(x)=\\dfrac{x^2-4}{x-2}$: ¿AV o hueco en $2$?", "Hueco; se cancela $x-2$ y el límite es $4$."),
  examExercise("$f(x)=\\dfrac{x+2}{x^2-4}$: clasifica $x=-2$ y $x=2$.", "$x=-2$ hueco; $x=2$ AV."),
  examExercise("Asíntota horizontal de $\\dfrac{3x^2-x+1}{5x^2+2}$.", "$y=3/5$."),
  examExercise("Asíntota horizontal de $\\dfrac{2x-1}{x^3+4}$.", "$y=0$."),
  examExercise("¿Tiene AH $\\dfrac{x^3+1}{x^2+1}$?", "No horizontal finita; crece como $x$."),
  examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$ y AH relacionada.", "Límite $3$; para $f(x)=\\sqrt{x^2+6x}-x$, AH derecha $y=3$."),
  examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\left(\\sqrt{x^2+6x}+x\\right)$.", "Racionaliza considerando $x<0$; límite $-3$."),
  examExercise("AV de $\\ln(2x-1)$.", "$2x-1=0$, AV $x=1/2$ por derecha."),
  examExercise("AV de $\\tan(3x)$.", "$3x=\\pi/2+k\\pi$, entonces $x=\\pi/6+k\\pi/3$."),
  examExercise("Da una función que cruce su AH $y=1$.", "$1+\\sin x/x$ cruza $y=1$ cuando $\\sin x=0$ y tiende a $1$."),
];

const limitesContinuidadContent: TopicContent = {
  contextLabel: "Introducción a los límites y continuidad",
  geogebraId: limitesIntuitivoContent.geogebraId,
  theory: [
    "Este módulo construye el lenguaje central de Cálculo 1: aproximarse, comparar los dos lados de una función, distinguir límite de valor puntual y decidir continuidad.",
    "El foco no es memorizar una lista de casos, sino leer el comportamiento local y global de una gráfica o fórmula: huecos, saltos, ramas que se disparan y alturas que se estabilizan al infinito.",
  ],
  theorySections: [
    {
      title: "Idea intuitiva de límite",
      body: [
        "Decir $\\lim_{x\\to a}f(x)=L$ significa que los valores de $f(x)$ se acercan a $L$ cuando $x$ se acerca a $a$. La función no necesita estar definida en $a$ para que el límite exista.",
        "La frase $x\\to a$ describe un proceso de aproximación. Por eso el límite observa valores cercanos a $a$, pero excluye el punto exacto cuando analiza el comportamiento local.",
        "Una tabla puede sugerir un límite y una gráfica puede hacerlo visible, pero la decisión final depende de que el comportamiento sea estable desde ambos lados.",
      ],
    },
    {
      title: "Límites laterales y existencia",
      body: [
        "El límite por la izquierda, $\\lim_{x\\to a^-}f(x)$, usa valores $x<a$. El límite por la derecha, $\\lim_{x\\to a^+}f(x)$, usa valores $x>a$.",
        "El límite bilateral existe exactamente cuando los dos límites laterales existen y son iguales. Si los laterales llegan a alturas diferentes, el valor de $f(a)$ no puede arreglar el límite.",
        "Un límite puede fallar por un salto, por crecimiento sin cota o por oscilación persistente. En cada caso, acercarse más a $a$ no produce una única altura real estable.",
      ],
    },
    {
      title: "Límite vs. valor de la función",
      body: [
        "$\\lim_{x\\to a}f(x)$ y $f(a)$ responden preguntas distintas. El límite pregunta hacia dónde va la función cerca de $a$; el valor pregunta qué altura fue asignada exactamente en $a$.",
        "Puede ocurrir que el límite exista y $f(a)$ no exista, como en un hueco. También puede ocurrir que $f(a)$ exista pero sea diferente del límite, como cuando el punto cerrado está en otra altura.",
        "Esta separación es la base para entender discontinuidades removibles: el comportamiento alrededor del punto es bueno, pero el valor puntual falta o está mal colocado.",
      ],
    },
    {
      title: "Continuidad puntual, lateral e intervalos",
      body: [
        "Una función es continua en $a$ si $f(a)$ existe, $\\lim_{x\\to a}f(x)$ existe y ambos coinciden: $\\lim_{x\\to a}f(x)=f(a)$.",
        "En un intervalo abierto se exige continuidad en cada punto interior. En un intervalo cerrado $[a,b]$, se revisa continuidad por la derecha en $a$, continuidad por la izquierda en $b$ y continuidad usual en el interior.",
        "La continuidad lateral es indispensable en dominios con extremos. Por ejemplo, $\\sqrt{x}$ es continua por la derecha en $0$ dentro de $[0,\\infty)$, aunque no tenga valores reales a la izquierda.",
      ],
    },
    {
      title: "Discontinuidades",
      body: [
        "Una discontinuidad removible aparece cuando el límite existe, pero el valor de la función no existe o no coincide con ese límite. Gráficamente se ve como un hueco o un punto colocado en otra altura.",
        "Una discontinuidad de salto aparece cuando los límites laterales finitos existen pero son distintos. La gráfica llega a una altura desde la izquierda y a otra desde la derecha.",
        "Una discontinuidad infinita, también inevitable en el sentido de que no se corrige redefiniendo un solo punto, ocurre cuando algún lateral tiende a $+\\infty$ o $-\\infty$. En este caso aparece comportamiento de asíntota vertical.",
      ],
    },
    {
      title: "Interpretación gráfica y asíntotas",
      body: [
        "En una gráfica, un límite finito se lee siguiendo la curva hacia la recta vertical $x=a$ desde ambos lados. El punto cerrado en $x=a$ informa $f(a)$, no necesariamente el límite.",
        "La recta $x=a$ es una asíntota vertical si al acercarse a $a$ desde al menos un lado la función crece sin cota. La señal analítica es un límite lateral infinito.",
        "La recta $y=L$ es una asíntota horizontal si $f(x)$ se acerca a $L$ cuando $x\\to\\infty$ o $x\\to-\\infty$. Una función puede cruzar una asíntota horizontal en valores finitos; la asíntota describe el comportamiento a largo plazo.",
      ],
    },
  ],
  formulas: [
    "\\lim_{x\\to a} f(x)=L",
    "\\lim_{x\\to a}f(x)=L \\Longleftrightarrow \\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L",
    "\\lim_{x\\to a}f(x)=f(a) \\quad \\text{si } f \\text{ es continua en } a",
    "f \\text{ continua en } a \\Longleftrightarrow f(a) \\text{ existe},\\; \\lim_{x\\to a}f(x) \\text{ existe},\\; \\lim_{x\\to a}f(x)=f(a)",
    "f \\text{ continua por la derecha en } a \\Longleftrightarrow \\lim_{x\\to a^+}f(x)=f(a)",
    "f \\text{ continua por la izquierda en } a \\Longleftrightarrow \\lim_{x\\to a^-}f(x)=f(a)",
    "f \\text{ continua en } [a,b] \\Longleftrightarrow \\lim_{x\\to a^+}f(x)=f(a),\\; f \\text{ continua en } (a,b),\\; \\lim_{x\\to b^-}f(x)=f(b)",
    "\\text{Removible: } \\lim_{x\\to a}f(x)=L \\text{ existe, pero } f(a)\\ne L \\text{ o } f(a) \\text{ no existe}",
    "\\text{Salto: } \\lim_{x\\to a^-}f(x)=L_1,\\; \\lim_{x\\to a^+}f(x)=L_2,\\; L_1\\ne L_2",
    "\\text{Infinita: } \\lim_{x\\to a^-}f(x)=\\pm\\infty \\text{ o } \\lim_{x\\to a^+}f(x)=\\pm\\infty",
    "x=a \\text{ es asíntota vertical si } \\lim_{x\\to a^-}f(x)=\\pm\\infty \\text{ o } \\lim_{x\\to a^+}f(x)=\\pm\\infty",
    "y=L \\text{ es asíntota horizontal si } \\lim_{x\\to\\infty}f(x)=L \\text{ o } \\lim_{x\\to-\\infty}f(x)=L",
  ],
  definition: {
    title: "Límite y continuidad",
    body:
      "El límite estudia el valor al que se aproxima una función cerca de un punto. La continuidad exige que esa aproximación exista y coincida con el valor real de la función en el punto; en extremos de intervalos, la coincidencia se revisa desde el lado que pertenece al dominio.",
  },
  examples: [
    {
      statement: "Una gráfica tiene un hueco en $(2,4)$ y un punto cerrado en $(2,-1)$. Interpreta límite, valor y continuidad.",
      steps: [
        "Las ramas se acercan a la altura $4$ por ambos lados.",
        "El punto cerrado indica que $f(2)=-1$.",
        "El límite y el valor de la función no coinciden.",
      ],
      conclusion: "$\\lim_{x\\to2}f(x)=4$, $f(2)=-1$ y la discontinuidad es removible.",
    },
    {
      statement: "Sea $f(x)=\\begin{cases}x+2,&x<1\\\\2,&x=1\\\\3x,&x>1\\end{cases}$. Decide si existe $\\lim_{x\\to1}f(x)$ y si hay continuidad.",
      steps: [
        "Por la izquierda usamos $x+2$, así que $\\lim_{x\\to1^-}f(x)=3$.",
        "Por la derecha usamos $3x$, así que $\\lim_{x\\to1^+}f(x)=3$.",
        "Los límites laterales coinciden.",
        "Sin embargo, el valor definido es $f(1)=2$.",
      ],
      conclusion: "El límite existe y vale $3$, pero la función no es continua porque $f(1)=2$.",
    },
    {
      statement: "Halla $k$ para que $g(x)=\\begin{cases}kx+1,&x<2\\\\x^2-k,&x\\ge2\\end{cases}$ sea continua en $2$.",
      steps: [
        "El límite izquierdo es $2k+1$.",
        "El valor y límite derecho vienen de la segunda rama: $4-k$.",
        "Para continuidad igualamos $2k+1=4-k$.",
      ],
      conclusion: "$3k=3$, entonces $k=1$.",
    },
    {
      statement: "Clasifica la discontinuidad de $h(x)=\\dfrac{x^2-9}{x-3}$ en $x=3$.",
      steps: [
        "La función original no está definida en $3$.",
        "Para $x\\ne3$, $h(x)=x+3$.",
        "El límite existe y vale $6$.",
      ],
      conclusion: "La discontinuidad es removible; se arreglaría definiendo $h(3)=6$.",
    },
    {
      statement: "Estudia $p(x)=\\dfrac{1}{(x+1)^2}$ cerca de $x=-1$.",
      steps: [
        "El denominador tiende a $0$ al acercarse a $-1$.",
        "Como está al cuadrado, se acerca a $0^+$ por ambos lados.",
        "El cociente crece sin cota positiva.",
      ],
      conclusion: "$\\lim_{x\\to-1}p(x)=\\infty$ y $x=-1$ es una asíntota vertical.",
    },
    {
      statement: "Verifica continuidad de $q(x)=\\sqrt{x-4}$ en su dominio.",
      steps: [
        "El dominio real es $[4,\\infty)$.",
        "En puntos interiores $x>4$, la raíz es continua.",
        "En $x=4$, se revisa solo $x\\to4^+$ y $q(4)=0$.",
      ],
      conclusion: "$q$ es continua en $[4,\\infty)$, con continuidad por la derecha en $4$.",
    },
    {
      statement: "Sea $r(x)=\\begin{cases}2x-1,&x<2\\\\5,&x=2\\\\x^2-1,&x>2\\end{cases}$. Clasifica la discontinuidad en $2$.",
      steps: [
        "Límite izquierdo: $\\lim_{x\\to2^-}(2x-1)=3$.",
        "Límite derecho: $\\lim_{x\\to2^+}(x^2-1)=3$.",
        "El límite general existe y vale $3$, pero $r(2)=5$.",
      ],
      conclusion: "La discontinuidad es removible porque bastaría redefinir $r(2)=3$.",
    },
    {
      statement: "Sea $s(x)=\\begin{cases}x^2,&x<0\\\\x+1,&x\\ge0\\end{cases}$. Decide si hay límite en $0$.",
      steps: [
        "Por la izquierda, $x^2\\to0$.",
        "Por la derecha, $x+1\\to1$.",
        "Los dos laterales son finitos pero distintos.",
      ],
      conclusion: "El límite no existe y la discontinuidad es de salto.",
    },
    {
      statement: "Interpreta $\\displaystyle\\lim_{x\\to\\infty}\\left(2+\\dfrac{1}{x}\\right)$.",
      steps: [
        "Cuando $x\\to\\infty$, $1/x\\to0$.",
        "Entonces la función se acerca a $2$.",
        "Esa altura describe el comportamiento a largo plazo.",
      ],
      conclusion: "El límite es $2$ y la recta $y=2$ es una asíntota horizontal.",
    },
  ],
  exercises: [
    examExercise("Una tabla cerca de $a=3$ muestra valores por ambos lados acercándose a $7$, pero $f(3)=-2$. Indica límite y continuidad.", "$\\lim_{x\\to3}f(x)=7$ según la evidencia; no sería continua si $f(3)=-2$."),
    examExercise("Si $\\lim_{x\\to a^-}f(x)=5$ y $\\lim_{x\\to a^+}f(x)=5$, halla $\\lim_{x\\to a}f(x)$.", "Existe y vale $5$."),
    examExercise("Si $\\lim_{x\\to a^-}f(x)=2$ y $\\lim_{x\\to a^+}f(x)=7$, decide si existe el límite general y clasifica.", "No existe; es una discontinuidad de salto si ambos laterales son finitos."),
    examExercise("Una gráfica se acerca a $3$ por ambos lados, pero $f(a)=8$. Clasifica.", "Discontinuidad removible."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{|x|}{x}$", "No existe; los laterales son $-1$ y $1$."),
    examExercise("$\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}$ y clasificación en $2$.", "Para $x\\ne2$, queda $x+2$; el límite es $4$ y la discontinuidad original es removible."),
    examExercise("Sea $f(x)=\\begin{cases}x^2,&x<1\\\\1,&x=1\\\\2-x,&x>1\\end{cases}$. Decide continuidad en $1$.", "Izquierda $1$, derecha $1$, valor $1$; sí es continua."),
    examExercise("Sea $f(x)=\\begin{cases}x+1,&x<0\\\\4,&x=0\\\\x^2+2,&x>0\\end{cases}$. Decide continuidad en $0$.", "Izquierda $1$, derecha $2$; no existe límite general, no es continua."),
    examExercise("Halla $k$: $f(x)=\\begin{cases}x+k,&x<3\\\\2x,&x\\ge3\\end{cases}$ continua en $3$.", "$3+k=6$, entonces $k=3$."),
    examExercise("Halla $k$: $g(x)=\\begin{cases}kx-1,&x<2\\\\x^2+k,&x\\ge2\\end{cases}$ continua en $2$.", "$2k-1=4+k$, por tanto $k=5$."),
    examExercise("¿Dónde es continua $f(x)=\\dfrac{x+1}{x^2-4}$?", "En $\\mathbb R\\setminus\\{-2,2\\}$."),
    examExercise("¿Dónde es continua $f(x)=\\sqrt{9-x^2}$?", "En $[-3,3]$, con continuidad lateral en los extremos."),
    examExercise("Clasifica $f(x)=\\sin(1/x)$ en $x=0$.", "Oscilatoria; no se acerca a una altura única."),
    examExercise("Para $f(x)=\\dfrac{1}{x-5}$, describe los límites laterales en $5$ y la asíntota.", "Izquierda $-\\infty$, derecha $+\\infty$; asíntota vertical $x=5$."),
    examExercise("Para $f(x)=\\dfrac{1}{(x+2)^2}$, describe el comportamiento en $x=-2$.", "Por ambos lados tiende a $+\\infty$; hay asíntota vertical $x=-2$."),
    examExercise("Si $\\lim_{x\\to\\infty}f(x)=2$, ¿qué recta horizontal interpreta ese comportamiento?", "$y=2$."),
    examExercise("Calcula $\\displaystyle\\lim_{x\\to\\infty}\\left(4-\\dfrac{3}{x}\\right)$ e interpreta.", "El límite es $4$; asíntota horizontal $y=4$."),
    examExercise("Una función cumple $\\lim_{x\\to a}f(x)=L$, pero $f(a)$ no existe. ¿Qué condición de continuidad falla?", "Falla la existencia de $f(a)$; no hay continuidad en $a$."),
  ],
};


const tecnicasAlgebraicasConsolidadasContent: TopicContent = {
  contextLabel: "Técnicas algebraicas de límites",
  geogebraId: tecnicasAlgebraicasLimitesContent.geogebraId,
  theory: [
    "Este módulo desarrolla las técnicas algebraicas que permiten calcular límites cuando la sustitución directa no basta. El caso central es la forma indeterminada $\\frac{0}{0}$, que indica trabajo pendiente y no un resultado.",
    "Cada transformación debe conservar el comportamiento de la función para valores cercanos al punto de interés. En particular, cancelar factores es válido para calcular el límite cuando se trabaja con $x\\ne a$.",
  ],
  theorySections: [
    {
      title: "Sustitución directa",
      body: [
        "La sustitución directa consiste en evaluar la expresión en el punto al que tiende la variable. Funciona cuando la expresión está formada por operaciones continuas cerca del punto y no aparece una restricción del dominio.",
        "Polinomios, muchas expresiones trigonométricas continuas y funciones racionales con denominador distinto de cero pueden evaluarse directamente: si $f$ es continua en $a$, entonces $\\lim_{x\\to a} f(x)=f(a)$.",
        "La sustitución directa falla cuando produce una forma indeterminada como $\\frac{0}{0}$. En ese caso no se concluye que el límite sea cero ni que no exista; se debe transformar la expresión para comparar cómo se anulan sus partes.",
        "También puede aparecer una expresión no indeterminada pero problemática, por ejemplo división entre cero con numerador no nulo. Ese caso suele indicar un límite infinito o la necesidad de estudiar límites laterales, no una técnica algebraica de cancelación.",
      ],
    },
    {
      title: "Factorización y cancelación",
      body: [
        "Factorizar ayuda porque muchas formas $\\frac{0}{0}$ esconden un factor común que se anula tanto en el numerador como en el denominador. Al escribir la expresión como producto, se puede detectar qué parte causa la indeterminación.",
        "La cancelación se realiza solo con factores, no con términos sumados. Si aparece $\\frac{(x-a)g(x)}{(x-a)h(x)}$, entonces para $x\\ne a$ se puede trabajar con $\\frac{g(x)}{h(x)}$ y luego evaluar el límite.",
        "Después de cancelar, la expresión simplificada no redefine automáticamente la función original en $x=a$. La restricción de dominio original permanece, pero el límite puede existir y revelar la altura de un hueco.",
        "**Factor común**: se extrae el factor que aparece en todos los términos. Por ejemplo, $x^2+3x=x(x+3)$. En un límite como $\\lim_{x\\to0}\\frac{x^2+3x}{x}$, esto permite cancelar $x$ para $x\\ne0$ y evaluar $x+3\\to3$.",
        "**Diferencia de cuadrados**: se usa $a^2-b^2=(a-b)(a+b)$. Por ejemplo, $x^2-9=(x-3)(x+3)$, lo que permite resolver $\\lim_{x\\to3}\\frac{x^2-9}{x-3}$ cancelando $x-3$.",
        "**Trinomios**: se buscan dos factores lineales cuyos términos reproduzcan el trinomio. Por ejemplo, $x^2+5x+6=(x+2)(x+3)$. Si el denominador contiene $x+2$, la factorización puede revelar una cancelación removible.",
        "**Suma de cubos**: se usa $a^3+b^3=(a+b)(a^2-ab+b^2)$. Por ejemplo, $x^3+8=(x+2)(x^2-2x+4)$; esta forma es útil cuando $x\\to-2$ y aparece el factor $x+2$ en el denominador.",
        "**Diferencia de cubos**: se usa $a^3-b^3=(a-b)(a^2+ab+b^2)$. Por ejemplo, $x^3-8=(x-2)(x^2+2x+4)$; si el límite contiene $x-2$ abajo, se cancela para $x\\ne2$.",
        "**Agrupación**: se agrupan términos para producir factores comunes por partes. Por ejemplo, $ax+ay+bx+by=a(x+y)+b(x+y)=(a+b)(x+y)$. En polinomios de cuatro términos, esta técnica puede descubrir el factor que causa $\\frac{0}{0}$.",
        "**Inspección**: consiste en reconocer patrones conocidos rápidamente, como cuadrados perfectos, diferencias de cuadrados o raíces evidentes. Por ejemplo, ver $x^2-6x+9$ como $(x-3)^2$ evita expansión innecesaria.",
        "**División sintética**: es útil cuando el denominador tiene un factor $x-a$ y el numerador también se anula en $x=a$. Si $P(a)=0$, dividir $P(x)$ entre $x-a$ revela el factor cancelable; por ejemplo, en $\\lim_{x\\to2}\\frac{x^3-4x^2+x+6}{x-2}$, la división sintética confirma que $x-2$ divide al numerador.",
        "Una buena secuencia general es: sustituir, identificar $\\frac{0}{0}$, escoger la factorización más económica, cancelar factores comunes bajo la condición $x\\ne a$ y evaluar la expresión simplificada.",
      ],
    },
    {
      title: "Radicales y racionalización",
      body: [
        "Cuando la indeterminación contiene raíces, racionalizar con el conjugado puede convertir una diferencia de radicales en una expresión algebraica sin esa diferencia. La identidad clave es $(A-B)(A+B)=A^2-B^2$.",
        "Si el radical está en el numerador, se multiplica numerador y denominador por el conjugado del numerador. Si el radical está en el denominador, se usa el conjugado del denominador. En ambos casos se multiplica por una forma de $1$, por lo que el valor de la expresión no cambia donde está definida.",
        "Después de multiplicar por el conjugado, se expande con cuidado: $\\sqrt{u}^2-\\sqrt{v}^2=u-v$. Esa diferencia suele contener el factor que permite cancelar la causa de $\\frac{0}{0}$.",
        "Con radicales anidados o expresiones más largas, la idea sigue siendo aislar la diferencia que se anula y escoger el conjugado que elimine la raíz dominante. No siempre conviene expandir todo; conviene expandir solo lo necesario para cancelar.",
      ],
    },
    {
      title: "Sustitución (cambio de variable)",
      body: [
        "Un cambio de variable simplifica límites donde se repite una expresión o donde una composición oculta una factorización. Se elige una variable nueva, por ejemplo $u=g(x)$, y se transforma también la condición de acercamiento.",
        "Si $x\\to a$ y $u=g(x)$, entonces se debe calcular a qué valor tiende $u$. El límite original se resuelve en la nueva variable y luego se interpreta el resultado en el problema original.",
        "En radicales de orden $3$ o mayor, una sustitución bien elegida puede convertir raíces en potencias enteras. Si aparecen varios índices, se usa el mínimo común múltiplo de los índices para construir una variable que elimine todas las raíces al elevarla adecuadamente.",
        "Por ejemplo, si aparecen $\\sqrt[3]{2x-1}$ y $\\sqrt[4]{2x-1}$, se puede tomar $u=\\sqrt[12]{2x-1}$. Entonces $\\sqrt[3]{2x-1}=u^4$ y $\\sqrt[4]{2x-1}=u^3$, lo que convierte el límite en uno polinomial en $u$.",
      ],
    },
  ],
  formulas: [
    "a^2-b^2=(a-b)(a+b)",
    "a^3-b^3=(a-b)(a^2+ab+b^2)",
    "a^3+b^3=(a+b)(a^2-ab+b^2)",
    "(\\sqrt{u}-\\sqrt{v})(\\sqrt{u}+\\sqrt{v})=u-v",
    "(\\sqrt[3]{u}-\\sqrt[3]{v})(\\sqrt[3]{u^2}+\\sqrt[3]{uv}+\\sqrt[3]{v^2})=u-v",
  ],
  definition: {
    title: "Técnica algebraica de límite",
    body:
      "Una técnica algebraica de límite transforma una expresión en otra equivalente para valores cercanos al punto de interés, normalmente con $x\\ne a$, hasta que el comportamiento local puede evaluarse sin la forma indeterminada inicial.",
  },
  examples: [
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to3}(2x^2-x+1)$.",
      steps: [
        "La expresión es polinomial, por lo tanto continua en todo $\\mathbb{R}$.",
        "La sustitución directa es válida.",
        "Evaluamos $2(3)^2-3+1$.",
      ],
      conclusion: "El límite es $16$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to3}\\frac{x^2-9}{x-3}$.",
      steps: [
        "La sustitución directa produce $\\frac{0}{0}$.",
        "Factorizamos diferencia de cuadrados: $x^2-9=(x-3)(x+3)$.",
        "Para $x\\ne3$, cancelamos el factor común $x-3$.",
        "Evaluamos la expresión equivalente $x+3$ en $3$.",
      ],
      conclusion: "El límite es $6$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\frac{x^3-3x+2}{x^2-1}$.",
      steps: [
        "La sustitución directa produce $\\frac{0}{0}$.",
        "Por inspección, $x=1$ es raíz del numerador. Factorizamos: $x^3-3x+2=(x-1)^2(x+2)$.",
        "También $x^2-1=(x-1)(x+1)$.",
        "Cancelamos un factor $x-1$ para $x\\ne1$.",
      ],
      conclusion: "El límite es $0$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\frac{\\sqrt{1+2x}-\\sqrt{1-3x}}{x}$.",
      steps: [
        "La sustitución directa produce $\\frac{0}{0}$.",
        "Multiplicamos por el conjugado $\\sqrt{1+2x}+\\sqrt{1-3x}$.",
        "El numerador queda $(1+2x)-(1-3x)=5x$.",
        "Cancelamos $x$ y evaluamos el denominador en $0$.",
      ],
      conclusion: "El límite es $\\frac{5}{2}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to0}\\frac{x}{\\sqrt{x+4}-2}$.",
      steps: [
        "El radical está en el denominador y la sustitución produce $\\frac{0}{0}$.",
        "Multiplicamos por el conjugado $\\sqrt{x+4}+2$.",
        "El denominador queda $(x+4)-4=x$.",
        "Cancelamos $x$ para $x\\ne0$.",
      ],
      conclusion: "El límite es $\\sqrt{4}+2=4$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to4}\\frac{\\sqrt[3]{x+4}-2}{x-4}$.",
      steps: [
        "Tomamos $u=\\sqrt[3]{x+4}$. Cuando $x\\to4$, entonces $u\\to2$.",
        "Como $u^3=x+4$, se tiene $x-4=u^3-8$.",
        "La expresión queda $\\frac{u-2}{u^3-8}$.",
        "Factorizamos $u^3-8=(u-2)(u^2+2u+4)$.",
      ],
      conclusion: "El límite es $\\frac{1}{12}$.",
    },
    {
      statement: "Calcula $\\displaystyle\\lim_{x\\to1}\\frac{\\sqrt[3]{2x-1}-1}{1-\\sqrt[4]{2x-1}}$.",
      steps: [
        "Los índices son $3$ y $4$; su mínimo común múltiplo es $12$.",
        "Tomamos $u=\\sqrt[12]{2x-1}$, de modo que $u\\to1$.",
        "Entonces $\\sqrt[3]{2x-1}=u^4$ y $\\sqrt[4]{2x-1}=u^3$.",
        "El cociente se transforma en $\\frac{u^4-1}{1-u^3}$.",
        "Factorizamos $u^4-1=(u-1)(u+1)(u^2+1)$ y $1-u^3=-(u-1)(u^2+u+1)$.",
      ],
      conclusion: "El límite es $-\\frac{4}{3}$.",
    },
  ],
  exercises: [
    examExercise("$\\displaystyle\\lim_{x\\to2}(3x^2-x+1)$", "Por sustitución directa: $12-2+1=11$."),
    examExercise("$\\displaystyle\\lim_{x\\to5}\\frac{x^2-25}{x-5}$", "Diferencia de cuadrados: $\\frac{(x-5)(x+5)}{x-5}\\to10$."),
    examExercise("$\\displaystyle\\lim_{x\\to-3}\\frac{x^2-9}{x+3}$", "Factoriza $x^2-9=(x-3)(x+3)$; el límite es $-6$."),
    examExercise("$\\displaystyle\\lim_{x\\to2}\\frac{x^2-4x+4}{x-2}$", "$(x-2)^2/(x-2)=x-2\\to0$."),
    examExercise("$\\displaystyle\\lim_{x\\to1}\\frac{x^3-3x+2}{x^2-1}$", "$(x-1)^2(x+2)/[(x-1)(x+1)]\\to0$."),
    examExercise("$\\displaystyle\\lim_{x\\to2}\\frac{x^3-8}{x^2-4}$", "Factoriza suma/diferencia notable y cancela; límite $3$."),
    examExercise("$\\displaystyle\\lim_{x\\to9}\\frac{\\sqrt{x}-3}{x-9}$", "Racionaliza; queda $1/(\\sqrt{x}+3)\\to1/6$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\frac{\\sqrt{1+x}-1}{x}$", "Racionaliza; límite $1/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\frac{x}{\\sqrt{x+4}-2}$", "Racionaliza el denominador; queda $\\sqrt{x+4}+2\\to4$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\frac{\\sqrt{4+x}-\\sqrt{4-x}}{x}$", "Racionaliza; límite $1/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to2}\\frac{\\frac{1}{x}-\\frac{1}{2}}{x-2}$", "Unifica: $(2-x)/(2x(x-2))\\to-1/4$."),
    examExercise("$\\displaystyle\\lim_{h\\to0}\\frac{\\frac{1}{3+h}-\\frac{1}{3}}{h}$", "Unifica y cancela $h$; límite $-1/9$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\frac{\\sqrt[3]{1+x}-1}{x}$", "Usa diferencia de cubos; límite $1/3$."),
    examExercise("$\\displaystyle\\lim_{x\\to4}\\frac{\\sqrt[3]{x+4}-2}{x-4}$", "Con $u=\\sqrt[3]{x+4}$, queda $1/(u^2+2u+4)\\to1/12$."),
    examExercise("$\\displaystyle\\lim_{x\\to1}\\frac{\\sqrt[3]{2x-1}-1}{1-\\sqrt[4]{2x-1}}$", "Con $u=\\sqrt[12]{2x-1}$, queda $(u^4-1)/(1-u^3)\\to-4/3$."),
    examExercise("$\\displaystyle\\lim_{x\\to3}\\frac{(x-1)^2-4}{x-3}$", "Con $u=x-1\\to2$, queda $(u^2-4)/(u-2)\\to4$."),
  ],
};
const limitesTrigonometricosIndeterminacionesContent: TopicContent = {
  contextLabel: "Límites trigonométricos e indeterminaciones",
  geogebraId: limitesTrigonometricosContent.geogebraId,
  theory: [
    "Este módulo desarrolla límites trigonométricos mediante razones fundamentales, identidades y argumentos de compresión. La meta es reconocer la estructura local de la expresión antes de transformar.",
    "Las indeterminaciones trigonométricas no se resuelven por memoria aislada: se resuelven reescribiendo hasta comparar senos, cosenos y tangentes con cantidades que tienden a cero.",
  ],
  theorySections: [
    {
      title: "Límites fundamentales y radianes",
      body: [
        "**Radianes**: los límites fundamentales están normalizados con medida angular en radianes. La razón $\\sin x/x$ tiende a $1$ porque, en el círculo unitario, el ángulo en radianes mide longitud de arco; con grados aparecería un factor de conversión y la fórmula dejaría de ser $1$.",
        "**Límite seno**: $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ compara una cuerda vertical con el arco que la contiene. En cálculo de límites se usa formando exactamente la razón $\\frac{\\sin u}{u}$ con $u\\to0$.",
        "**Límite tangente**: como $\\tan x=\\frac{\\sin x}{\\cos x}$ y $\\cos x\\to1$, se obtiene $\\lim_{x\\to0}\\frac{\\tan x}{x}=1$. Este resultado se aplica del mismo modo: si aparece $\\tan(ax)$, se completa el denominador como $ax$ y se compensa la constante.",
        "Cuando el argumento no tiende a cero, estos límites notables no aplican directamente. Primero se verifica la variable interna; luego se decide si conviene sustituir $u=ax$, factorizar constantes o transformar con identidades.",
      ],
    },
    {
      title: "Reescritura con seno, coseno e identidades",
      body: [
        "**Reescribir con seno y coseno**: muchas expresiones con $\\tan x$, $\\sec x$ o cocientes mixtos se simplifican al escribir todo en términos de $\\sin x$ y $\\cos x$. Esto suele revelar factores comunes, cocientes que tienden a $1$ o factores continuos que tienden a valores finitos.",
        "**Identidades pitagóricas**: fórmulas como $\\sin^2 x+\\cos^2 x=1$ permiten convertir $1-\\cos^2 x$ en $\\sin^2 x$, que es más compatible con $\\sin x/x$.",
        "**Ángulo doble**: identidades como $1-\\cos(2x)=2\\sin^2 x$ y $\\sin(2x)=2\\sin x\\cos x$ transforman diferencias o senos compuestos en productos controlables.",
        "**Simplificación avanzada**: no se trata de expandir todo. La buena decisión es escoger la identidad que acerque la expresión a $\\frac{\\sin u}{u}$, $\\frac{\\tan u}{u}$ o $\\frac{1-\\cos u}{u^2}$, manteniendo separados los factores que son continuos y no problemáticos.",
      ],
    },
    {
      title: "Indeterminaciones y formas con 1-\\cos x",
      body: [
        "**Indeterminación**: una forma como $\\frac{0}{0}$ indica que numerador y denominador se anulan al mismo tiempo, pero no dice con qué rapidez. La tarea es comparar esas velocidades mediante límites fundamentales, identidades o racionalización trigonométrica.",
        "**Diferencias de coseno**: las expresiones con $1-\\cos x$ suelen requerir la identidad $1-\\cos x=\\frac{(1-\\cos x)(1+\\cos x)}{1+\\cos x}$ o el límite reusable $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12$.",
        "**Productos mixtos**: cuando aparece un producto de factores trigonométricos, se separan las partes que tienden a $1$, las que tienden a constantes y las potencias de $x$ que determinan el orden de anulación.",
        "Una expresión como $\\frac{\\sin(2x)-2\\sin x}{x^3}$ exige una identidad antes de comparar: $\\sin(2x)=2\\sin x\\cos x$ convierte el numerador en $2\\sin x(\\cos x-1)$, donde ya aparecen factores conocidos.",
      ],
    },
    {
      title: "Teorema de compresión y funciones acotadas",
      body: [
        "**Compresión**: si una expresión queda atrapada entre dos funciones que tienden al mismo valor, entonces comparte ese límite. En trigonometría esto es natural porque $-1\\le\\sin t\\le1$ y $-1\\le\\cos t\\le1$.",
        "**Productos acotados**: si una función trigonométrica oscila pero está multiplicada por una cantidad que tiende a cero, el producto puede tener límite aunque la parte trigonométrica sola no lo tenga. Por ejemplo, $x^2\\cos(1/x)$ se controla entre $-x^2$ y $x^2$.",
        "La acotación por sí sola no basta: las cotas deben cerrarse hacia el mismo valor. Por eso $\\sin(1/x)$ no tiene límite cuando $x\\to0$, pero $x\\sin(1/x)$ sí tiende a $0$.",
      ],
    },
    {
      title: "Patrones de decisión",
      body: [
        "**Cocientes con seno o tangente**: completar $\\frac{\\sin u}{u}$ o $\\frac{\\tan u}{u}$ suele ser la primera opción cuando el argumento tiende a cero.",
        "**Cosenos restados**: si aparece $1-\\cos u$, conviene pensar en $u^2$ o en multiplicar por $1+\\cos u$ para convertir la diferencia en $\\sin^2 u$.",
        "**Oscilación acotada**: si aparece $\\sin(1/x)$, $\\cos(1/x)$ o una variante similar, se busca una cota que sea multiplicada por una potencia de $x$ que tienda a cero.",
        "No se cancela $\\sin x$ con $x$ como si fueran factores iguales. La afirmación correcta es que su cociente tiende a $1$ cuando $x\\to0$ en radianes.",
      ],
    },
  ],
  formulas: [
    "\\lim_{x\\to0}\\frac{\\sin x}{x}=1",
    "\\lim_{x\\to0}\\frac{\\tan x}{x}=1",
    "\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0",
    "\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12",
    "\\lim_{x\\to0}\\frac{\\sin(ax)}{\\sin(bx)}=\\frac{a}{b}",
    "\\sin^2(x)+\\cos^2(x)=1",
    "1-\\cos^2(x)=\\sin^2(x)",
    "1-\\cos(2x)=2\\sin^2(x)",
    "1+\\cos(2x)=2\\cos^2(x)",
    "\\sin(2x)=2\\sin(x)\\cos(x)",
    "\\tan(x)=\\frac{\\sin(x)}{\\cos(x)}",
    "1+\\tan^2(x)=\\sec^2(x)",
  ],
  definition: {
    title: "Indeterminación trigonométrica",
    body:
      "Una indeterminación trigonométrica es una forma provisional que requiere transformar la expresión con identidades, límites fundamentales o compresión. El objetivo es comparar la rapidez con que las partes se anulan, crecen u oscilan.",
  },
  examples: [
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(6x)}{x}$",
      steps: [
        "Formamos la razón fundamental con argumento $6x$.",
        "$\\dfrac{\\sin(6x)}{x}=6\\dfrac{\\sin(6x)}{6x}$.",
        "Como $6x\\to0$, el factor notable tiende a $1$.",
      ],
      conclusion: "El límite es $6$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(5x)}{x^2}$",
      steps: [
        "Usamos $\\lim_{u\\to0}\\frac{1-\\cos u}{u^2}=\\frac12$ con $u=5x$.",
        "$\\dfrac{1-\\cos(5x)}{x^2}=25\\dfrac{1-\\cos(5x)}{(5x)^2}$.",
      ],
      conclusion: "El límite es $25/2$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(3x)}{\\sin(5x)}$",
      steps: [
        "Separamos dos razones fundamentales.",
        "Reescribimos como $\\frac{\\tan(3x)}{3x}\\frac{5x}{\\sin(5x)}\\frac{3}{5}$.",
        "Los dos límites fundamentales tienden a $1$.",
      ],
      conclusion: "El límite es $3/5$.",
    },
    {
      statement: "Usa compresión para $\\displaystyle\\lim_{x\\to0}x^2\\cos\\left(\\dfrac{4}{x}\\right)$.",
      steps: [
        "Sabemos que $-1\\le\\cos(4/x)\\le1$.",
        "Multiplicamos por $x^2\\ge0$: $-x^2\\le x^2\\cos(4/x)\\le x^2$.",
        "Ambas cotas tienden a $0$.",
      ],
      conclusion: "Por compresión, el límite es $0$.",
    },
    {
      statement: "$\\displaystyle\\lim_{\\theta\\to0}\\dfrac{\\tan\\theta-\\sin\\theta}{\\sec\\theta-1}$",
      steps: [
        "Escribimos $\\tan\\theta=\\sin\\theta/\\cos\\theta$ y $\\sec\\theta=1/\\cos\\theta$.",
        "El numerador es $\\sin\\theta(1/\\cos\\theta-1)$.",
        "El denominador es $1/\\cos\\theta-1$.",
        "Cancelamos el factor común para $\\theta\\ne0$.",
      ],
      conclusion: "El límite es $0$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)-2\\sin x}{x^3}$",
      steps: [
        "Usamos $\\sin(2x)=2\\sin x\\cos x$.",
        "El numerador queda $2\\sin x(\\cos x-1)$.",
        "Separamos $2\\frac{\\sin x}{x}\\frac{\\cos x-1}{x^2}$.",
      ],
      conclusion: "El límite es $2\\cdot1\\cdot(-1/2)=-1$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(3x)}{\\sin^2(2x)}$",
      steps: [
        "El numerador se comporta como $(3x)^2/2=9x^2/2$.",
        "El denominador se comporta como $(2x)^2=4x^2$.",
      ],
      conclusion: "El límite es $9/8$.",
    },
  ],
  exercises: [
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(3x)}{x}$", "$3$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(8x)}{x}$", "$8$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(5x)}{\\sin(2x)}$", "$5/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(2x)}{x^2}$", "$2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(6x)}{x^2}$", "$18$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(3x)}{\\sin(2x)}$", "$3/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin^2(3x)}{x^2}$", "$9$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan^2(2x)}{1-\\cos(4x)}$", "Numerador $\\sim4x^2$, denominador $\\sim8x^2$; límite $1/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)\\sin(5x)}{x^2}$", "$10$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(7x)}{\\tan(2x)}$", "$7/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sec x-1}{x^2}$", "$(1-\\cos x)/(x^2\\cos x)\\to1/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{1-\\cos(3x)}{\\sin^2(2x)}$", "$9/8$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\tan(5x)}{\\sin(3x)+\\tan(2x)}$", "$5/(3+2)=1$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}x\\sin(5/x)$", "Por compresión, el límite es $0$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}x^2\\cos(1/x)$", "Por compresión, el límite es $0$."),
    examExercise("$\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin(2x)-2\\sin x}{x^3}$", "$-1$."),
    examExercise("Explica por qué $\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ requiere radianes.", "Porque la comparación geométrica usa longitud de arco en el círculo unitario; con grados aparece un factor de conversión."),
  ],
};

const limitesInfinitoAsintoticoContent: TopicContent = {
  contextLabel: "Límites al infinito y comportamiento asintótico",
  theory: [
    "Este módulo estudia el comportamiento de una función cuando la variable se aleja indefinidamente o cuando se aproxima a una ruptura donde los valores crecen sin cota.",
    "El objetivo es comparar dominancias: qué términos sobreviven al infinito, qué factores provocan explosiones locales y qué rectas describen el destino gráfico de la función.",
  ],
  theorySections: [
    {
      title: "Límites al infinito y comportamiento dominante",
      body: [
        "**Límites al infinito**: preguntar por $x\\to\\infty$ o $x\\to-\\infty$ no significa sustituir $x$ por un número llamado infinito. Significa estudiar qué ocurre cuando $x$ toma valores cada vez más grandes en magnitud.",
        "**Dominancia**: en sumas de potencias, el término de mayor grado determina el comportamiento principal. Por eso $5x^4-3x+7$ se comporta como $5x^4$ cuando $|x|$ es grande.",
        "**Factor común forzado**: consiste en extraer deliberadamente la potencia dominante aunque no aparezca como factor visible en todos los términos. Por ejemplo, en una expresión racional se puede escribir un polinomio como $x^n$ multiplicado por coeficientes y potencias negativas de $x$; así los términos menores quedan como fracciones que tienden a cero y la comparación dominante se vuelve explícita.",
        "**Normalización**: dividir numerador y denominador por la mayor potencia relevante de $x$ convierte términos menores en fracciones que tienden a cero. Esta técnica revela el límite sin expandir innecesariamente.",
        "**Funciones acotadas**: si una parte oscila pero permanece acotada, como $\\sin x$ o $\\cos x$, dividirla por una cantidad que crece sin cota produce un término que tiende a cero por compresión.",
      ],
    },
    {
      title: "Funciones racionales, grados y asíntotas horizontales",
      body: [
        "**Grado del denominador mayor**: si el denominador crece más rápido que el numerador, el cociente tiende a $0$. La gráfica se aproxima al eje horizontal.",
        "**Grados iguales**: si numerador y denominador tienen el mismo grado, el límite al infinito es el cociente de los coeficientes principales. Los términos de menor grado desaparecen en la comparación.",
        "**Grado del numerador mayor**: si el numerador domina, no hay asíntota horizontal finita. La función puede crecer sin cota o acercarse a una asíntota oblicua, pero esa clasificación requiere otro análisis.",
        "**Asíntota horizontal**: una recta $y=L$ describe una altura estable cuando $x\\to\\infty$ o $x\\to-\\infty$. La función puede cruzarla para valores finitos; la asíntota habla del comportamiento lejano, no de una barrera.",
      ],
    },
    {
      title: "Radicales y conjugados al infinito",
      body: [
        "**Radicales al infinito**: expresiones como $\\sqrt{x^2+6x}-x$ producen una forma del tipo $\\infty-\\infty$. Esa escritura no decide el límite, porque dos cantidades grandes pueden diferir por un número finito.",
        "**Conjugados**: multiplicar por el conjugado transforma una diferencia de raíces en una diferencia algebraica. El numerador suele simplificarse y el denominador queda listo para comparar términos dominantes.",
        "El factor común forzado también se usa dentro de radicales: se extrae la potencia dominante del radicando, como $x^2$ dentro de una raíz cuadrada o $x^3$ dentro de una raíz cúbica, para separar una escala grande de una parte que tiende a una constante. Esto permite comparar radicales al infinito sin depender de la apariencia inicial de la expresión.",
        "**Valor absoluto**: al extraer $x^2$ de una raíz se obtiene $\\sqrt{x^2}=|x|$. Si $x\\to+\\infty$, entonces $|x|=x$; si $x\\to-\\infty$, entonces $|x|=-x$. Este signo puede cambiar completamente el resultado.",
        "**Radicales con distintas potencias**: primero se identifica la escala dominante dentro de la raíz. Luego se factoriza esa escala y se evalúa la parte que tiende a una constante.",
      ],
    },
    {
      title: "Límites infinitos y asíntotas verticales",
      body: [
        "**Límite infinito**: cerca de un punto $a$, una función puede crecer sin cota positiva o negativa. Esto no produce un límite real, pero sí describe una explosión local de la gráfica.",
        "**Asíntota vertical**: la recta $x=a$ aparece cuando al menos un límite lateral en $a$ es $+\\infty$ o $-\\infty$. No basta con que el denominador sea cero; hay que verificar si el factor problemático permanece después de simplificar.",
        "**Hueco versus asíntota**: si el factor que se anula se cancela completamente, puede aparecer una discontinuidad removible. Si queda en el denominador, suele producir una asíntota vertical o un comportamiento lateral infinito.",
        "**Análisis lateral**: los límites por izquierda y derecha pueden tener signos distintos. Por eso una respuesta completa cerca de una asíntota vertical debe indicar $x\\to a^-$ y $x\\to a^+$ cuando el signo cambia.",
      ],
    },
    {
      title: "Análisis de signo cerca de asíntotas",
      body: [
        "**Factores pares**: si cerca de $a$ queda un denominador como $(x-a)^2$, el signo del denominador es positivo por ambos lados. El signo del numerador decide si ambos laterales van a $+\\infty$ o a $-\\infty$.",
        "**Factores impares**: si queda un denominador como $(x-a)$ o $(x-a)^3$, el signo cambia al cruzar $a$. Esto puede producir $-\\infty$ por un lado y $+\\infty$ por el otro.",
        "**Factores adicionales**: en expresiones como $\\frac{1}{(x-1)(x+2)}$, al estudiar $x=1$ el factor $x+2$ se comporta como una constante positiva. El factor que cambia el signo local es $x-1$.",
        "El análisis de signo no es un adorno: decide si existe un límite infinito bilateral, si solo existen laterales distintos o si la gráfica tiene ramas en direcciones opuestas.",
      ],
    },
  ],
  formulas: [
    "\\lim_{x\\to\\infty}\\frac{1}{x^p}=0",
    "\\frac{a_nx^n}{b_mx^m}=\\frac{a_n}{b_m}x^{n-m}",
    "\\frac{P(x)}{Q(x)}=\\frac{x^n(a_n+a_{n-1}/x+\\cdots+a_0/x^n)}{x^m(b_m+b_{m-1}/x+\\cdots+b_0/x^m)}",
    "\\sqrt{x^2}=|x|",
    "\\sqrt{x^2}=x\\quad (x\\ge0)",
    "\\sqrt{x^2}=-x\\quad (x<0)",
    "(\\sqrt{A}-\\sqrt{B})(\\sqrt{A}+\\sqrt{B})=A-B",
    "\\sqrt{A}-\\sqrt{B}=\\frac{A-B}{\\sqrt{A}+\\sqrt{B}}",
    "\\lim_{x\\to a}\\frac{c}{(x-a)^{2k}}=\\operatorname{sgn}(c)\\infty",
  ],
  definition: {
    title: "Comportamiento asintótico",
    body:
      "El comportamiento asintótico describe qué parte de una función domina cuando la variable se aleja indefinidamente o cuando se aproxima a una ruptura vertical. Se estudia mediante límites al infinito, límites infinitos y comparación de términos dominantes.",
  },
  examples: [
    {
      statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2-5x+1}{x^2+4}$",
      steps: [
        "Numerador y denominador tienen grado $2$.",
        "Dividimos entre $x^2$: $\\frac{3-5/x+1/x^2}{1+4/x^2}$.",
        "Los términos con $1/x$ y $1/x^2$ tienden a $0$.",
      ],
      conclusion: "El límite es $3$ y la asíntota horizontal es $y=3$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{2x+1}{x^3-4}$",
      steps: [
        "El denominador tiene mayor grado.",
        "Dividimos por $x^3$: $\\frac{2/x^2+1/x^3}{1-4/x^3}$.",
        "Cada término del numerador tiende a $0$ y el denominador tiende a $1$.",
      ],
      conclusion: "El límite es $0$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-\\sqrt{x^2-4x}\\right)$",
      steps: [
        "Racionalizamos la diferencia.",
        "$\\sqrt{x^2+8x}-\\sqrt{x^2-4x}=\\frac{12x}{\\sqrt{x^2+8x}+\\sqrt{x^2-4x}}$.",
        "Como $x\\to+\\infty$, factorizamos $x$ en el denominador.",
        "El denominador queda $x(\\sqrt{1+8/x}+\\sqrt{1-4/x})$.",
      ],
      conclusion: "El límite es $12/2=6$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{\\sqrt{x^2+1}}{x}$",
      steps: [
        "Como $x\\to-\\infty$, $\\sqrt{x^2}=|x|=-x$.",
        "Escribimos $\\sqrt{x^2+1}=|x|\\sqrt{1+1/x^2}$.",
        "Entonces el cociente es $-\\sqrt{1+1/x^2}$.",
      ],
      conclusion: "El límite es $-1$.",
    },
    {
      statement: "Estudia los laterales de $\\displaystyle f(x)=\\dfrac{1}{x-2}$ en $x=2$.",
      steps: [
        "Si $x\\to2^-$, entonces $x-2<0$ y se acerca a $0$.",
        "Si $x\\to2^+$, entonces $x-2>0$ y se acerca a $0$.",
      ],
      conclusion: "$\\lim_{x\\to2^-}f(x)=-\\infty$ y $\\lim_{x\\to2^+}f(x)=+\\infty$; hay AV $x=2$.",
    },
    {
      statement: "Distingue hueco y asíntota en $\\displaystyle f(x)=\\dfrac{x+2}{x^2-4}$.",
      steps: [
        "Factorizamos $x^2-4=(x-2)(x+2)$.",
        "El factor $x+2$ se cancela para $x\\ne-2$, así que en $-2$ hay hueco.",
        "El factor $x-2$ queda en el denominador.",
      ],
      conclusion: "Hay discontinuidad removible en $x=-2$ y asíntota vertical en $x=2$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to\\infty}\\left(1+\\dfrac{\\cos x}{x}\\right)$",
      steps: [
        "La función $\\cos x$ está acotada entre $-1$ y $1$.",
        "Por tanto $-1/x\\le\\cos x/x\\le1/x$ para $x>0$.",
        "Ambas cotas tienden a $0$.",
      ],
      conclusion: "El límite es $1$; la asíntota horizontal es $y=1$.",
    },
    {
      statement: "Analiza $\\displaystyle\\lim_{x\\to1^-}\\frac{2x+1}{(x-1)^2}$ y $\\displaystyle\\lim_{x\\to1^+}\\frac{2x+1}{(x-1)^2}$.",
      steps: [
        "Cerca de $x=1$, el numerador $2x+1$ tiende a $3$, que es positivo.",
        "El denominador $(x-1)^2$ tiende a $0$ y es positivo por ambos lados.",
        "El cociente crece sin cota positiva desde ambos laterales.",
      ],
      conclusion: "Ambos límites laterales son $+\\infty$; hay asíntota vertical en $x=1$.",
    },
  ],
  exercises: [
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{7}{x}$", "$0$."),
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{5x^2+1}{2x^2-3}$", "Grados iguales; límite $5/2$."),
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x-8}{x^2+1}$", "El denominador domina; límite $0$."),
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x^3+1}{2x-5}$", "Crece como $x^2/2$; tiende a $+\\infty$."),
    examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{3x^2-x}{x^2+4}$", "Límite $3$."),
    examExercise("Asíntota horizontal de $f(x)=\\dfrac{4x^2-x}{2x^2+5x+1}$.", "$y=2$."),
    examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{4x^2-x}-2x\\right)$", "Racionaliza; límite $-1/4$."),
    examExercise("$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$", "Racionaliza; límite $3$."),
    examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\left(\\sqrt{x^2+6x}+x\\right)$", "Cuidando $|x|=-x$, límite $-3$."),
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{\\sqrt{x^2+1}}{x}$", "$1$."),
    examExercise("$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{\\sqrt{x^2+1}}{x}$", "$-1$."),
    examExercise("$\\displaystyle\\lim_{x\\to0^+}\\dfrac{1}{x}$", "$+\\infty$."),
    examExercise("$\\displaystyle\\lim_{x\\to0^-}\\dfrac{1}{x}$", "$-\\infty$."),
    examExercise("Para $f(x)=\\dfrac{x+2}{x^2-4}$, clasifica $x=-2$ y $x=2$.", "$x=-2$ es hueco removible; $x=2$ es asíntota vertical."),
    examExercise("Analiza el signo de $\\dfrac{1}{(x-1)(x+2)}$ cerca de $x=1$.", "Cerca de $1$, $x+2>0$; izquierda $x-1<0$ da $-\\infty$, derecha da $+\\infty$."),
    examExercise("$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{\\sin x}{x}$", "$0$ por compresión."),
    examExercise("¿Todo cero del denominador produce una asíntota vertical?", "No; si el factor se cancela puede producir un hueco removible."),
    examExercise("$\\displaystyle\\lim_{x\\to1^-}\\dfrac{3}{(x-1)^2}$", "$+\\infty$."),
    examExercise("$\\displaystyle\\lim_{x\\to1^-}\\dfrac{3}{x-1}$", "$-\\infty$."),
  ],
};

const derivadaRectaTangenteContent: TopicContent = {
  contextLabel: "Derivada y recta tangente",
  theory: [
    "La derivada nace de comparar cambios. Primero se mide un cambio promedio en un intervalo; luego se hace que el intervalo se encoja hasta capturar el cambio instantáneo.",
    "Geométricamente, este proceso transforma rectas secantes en una recta tangente. Físicamente, transforma velocidad promedio en velocidad instantánea.",
  ],
  theorySections: [
    {
      title: "Tasas de cambio y recta secante",
      body: [
        "**Tasa promedio de cambio**: mide cuánto cambia $f(x)$ por unidad de cambio en $x$ entre dos puntos. En el intervalo $[a,b]$ se calcula con el cociente $\\frac{f(b)-f(a)}{b-a}$.",
        "**Recta secante**: es la recta que pasa por $(a,f(a))$ y $(b,f(b))$. Su pendiente es exactamente la tasa promedio de cambio, por eso resume el comportamiento de la curva en todo el intervalo.",
        "Si el intervalo es grande, la secante puede ocultar variaciones locales. La derivada aparece cuando se estudian intervalos cada vez más pequeños alrededor de un punto.",
      ],
    },
    {
      title: "Derivada como límite",
      body: [
        "**Tasa instantánea de cambio**: describe la rapidez de cambio en un solo punto. Se obtiene como el límite de las pendientes secantes cuando el segundo punto se acerca al primero.",
        "**Derivada en un punto**: si el límite $\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$ existe, su valor se denota $f'(a)$ y representa la pendiente instantánea en $x=a$.",
        "**Notación**: se usan varias formas equivalentes según el contexto: $f'(a)$, $\\frac{dy}{dx}\\big|_{x=a}$, $D_xf(a)$ o $\\dot{s}(t)$ cuando la variable es tiempo.",
        "La derivada puede fallar si hay esquinas, cúspides, tangentes verticales u oscilaciones que impiden que las pendientes secantes se estabilicen.",
      ],
    },
    {
      title: "Interpretación geométrica y física",
      body: [
        "**Recta tangente**: es la recta que mejor aproxima localmente la curva cerca del punto. Su pendiente es $f'(a)$ y pasa por $(a,f(a))$.",
        "**Recta normal**: es perpendicular a la tangente. Si $f'(a)\\ne0$, su pendiente es $-1/f'(a)$; si la tangente es horizontal, la normal es vertical.",
        "**Velocidad**: si $s(t)$ representa posición, la velocidad instantánea es $v(t)=s'(t)$. La aceleración se obtiene derivando de nuevo: $a(t)=v'(t)=s''(t)$.",
        "La interpretación correcta siempre depende de las unidades: si $f$ mide metros y $x$ segundos, entonces $f'(x)$ mide metros por segundo.",
      ],
    },
  ],
  formulas: [
    "m_{sec}=\\frac{f(b)-f(a)}{b-a}",
    "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}",
    "f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}",
    "y-f(a)=f'(a)(x-a)",
    "y-f(a)=-\\frac{1}{f'(a)}(x-a)",
    "v(t)=s'(t)",
    "a(t)=s''(t)",
  ],
  definition: {
    title: "Derivada en un punto",
    body:
      "$f$ es derivable en $a$ si existe el límite $f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$. Ese valor es la pendiente de la tangente y la tasa instantánea de cambio.",
  },
  examples: [
    {
      statement: "Calcula la tasa promedio de $f(x)=x^2+1$ en $[1,3]$.",
      steps: ["Evaluamos $f(1)=2$ y $f(3)=10$.", "La tasa promedio es $\\frac{10-2}{3-1}$.", "Simplificamos el cociente."],
      conclusion: "La tasa promedio es $4$.",
    },
    {
      statement: "Calcula $f'(3)$ por definición para $f(x)=x^2$.",
      steps: ["$f(3+h)=(3+h)^2=9+6h+h^2$.", "$\\frac{f(3+h)-f(3)}{h}=\\frac{6h+h^2}{h}=6+h$.", "Tomamos $h\\to0$."],
      conclusion: "$f'(3)=6$.",
    },
    {
      statement: "Encuentra la tangente a $y=x^2-2x$ en $x=2$.",
      steps: ["$f(2)=0$.", "La derivada es $f'(x)=2x-2$, por tanto $f'(2)=2$.", "Usamos $y-f(2)=f'(2)(x-2)$."],
      conclusion: "La recta tangente es $y=2x-4$.",
    },
    {
      statement: "Encuentra la normal a $y=x^2$ en $x=1$.",
      steps: ["El punto es $(1,1)$.", "La pendiente tangente es $f'(1)=2$.", "La pendiente normal es $-1/2$."],
      conclusion: "La normal es $y-1=-\\frac12(x-1)$.",
    },
  ],
  exercises: [
    { statement: "Tasa promedio de $f(x)=3x-1$ en $[0,4]$.", solution: "$3$." },
    { statement: "Tasa promedio de $f(x)=x^2$ en $[2,5]$.", solution: "$\\frac{25-4}{3}=7$." },
    { statement: "Calcula por definición $f'(x)$ para $f(x)=4x+7$.", solution: "$f'(x)=4$." },
    { statement: "Calcula por definición $f'(2)$ para $f(x)=x^3$.", solution: "$12$." },
    { statement: "¿Es derivable $f(x)=|x|$ en $0$?", solution: "No; las pendientes laterales son $-1$ y $1$." },
    { statement: "Tangente a $y=1/x$ en $x=1$.", solution: "$y=-x+2$." },
    { statement: "Normal a $y=x^2+1$ en $x=1$.", solution: "$y-2=-\\frac12(x-1)$." },
    { statement: "Si $s(t)=t^2+3t$, halla $v(2)$.", solution: "$v(t)=2t+3$, entonces $v(2)=7$." },
    { statement: "Si $s(t)=t^3-t$, halla $a(1)$.", solution: "$s''(t)=6t$, entonces $a(1)=6$." },
    { statement: "Pendiente de la secante de $f(x)=\\sqrt{x}$ entre $1$ y $4$.", solution: "$\\frac{2-1}{3}=1/3$." },
    { statement: "Tangente horizontal de $f(x)=x^2-4x+1$.", solution: "$f'(x)=2x-4=0$ en $x=2$." },
    { statement: "Interpreta $C'(50)=12$ si $C$ es costo en dólares y $x$ unidades.", solution: "Cerca de 50 unidades, el costo aumenta aproximadamente $12$ dólares por unidad adicional." },
  ],
};

const reglasDerivacionConsolidadasContent: TopicContent = {
  contextLabel: "Reglas de derivación",
  theory: [
    "Las reglas de derivación permiten calcular tasas instantáneas sin regresar siempre al límite definitorio.",
    "La clave es reconocer la estructura de la función: suma, producto, cociente, composición o una función elemental conocida.",
  ],
  theorySections: [
    {
      title: "Reglas lineales y potencia",
      body: [
        "**Constante**: la derivada de una constante es cero porque no hay cambio. Una función horizontal tiene pendiente $0$ en todos sus puntos.",
        "**Potencia**: si $f(x)=x^n$, entonces $f'(x)=nx^{n-1}$. Esta regla cubre potencias enteras, fraccionarias y negativas donde la función esté definida.",
        "**Múltiplo constante**: los factores constantes salen de la derivada. Si una función se estira verticalmente, su pendiente se estira en la misma proporción.",
        "**Suma y diferencia**: se deriva término a término. Esta propiedad hace que los polinomios sean especialmente directos.",
      ],
    },
    {
      title: "Producto, cociente y cadena",
      body: [
        "**Producto**: la derivada de $fg$ no es $f'g'$. Cada factor puede cambiar, por eso se suma el cambio del primero con el segundo fijo y el cambio del segundo con el primero fijo.",
        "**Cociente**: se usa cuando una función está dividida por otra. El denominador aparece al cuadrado y se conserva el orden $f'g-fg'$.",
        "**Cadena**: se aplica a composiciones. Primero se deriva la función externa dejando la interna intacta; luego se multiplica por la derivada de la interna.",
        "La cadena es una de las reglas más importantes: aparece en potencias de expresiones, raíces, exponenciales compuestas, logaritmos compuestos y funciones trigonométricas compuestas.",
      ],
    },
    {
      title: "Funciones elementales",
      body: [
        "**Polinomiales**: se derivan término a término usando potencia y linealidad.",
        "**Exponenciales**: $e^x$ conserva su derivada; para $a^x$ aparece el factor $\\ln a$.",
        "**Trigonométricas**: las derivadas de seno, coseno y tangente son patrones básicos que luego se combinan con producto, cociente y cadena.",
        "Antes de derivar conviene simplificar solo si la simplificación reduce la estructura. Expandir todo a veces empeora una derivada que era simple por cadena o producto.",
      ],
    },
  ],
  formulas: [
    "\\frac{d}{dx}c=0",
    "\\frac{d}{dx}x^n=nx^{n-1}",
    "\\frac{d}{dx}[cf(x)]=cf'(x)",
    "\\frac{d}{dx}[f(x)\\pm g(x)]=f'(x)\\pm g'(x)",
    "(fg)'=f'g+fg'",
    "\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}",
    "(f\\circ g)'(x)=f'(g(x))g'(x)",
    "\\frac{d}{dx}e^x=e^x",
    "\\frac{d}{dx}a^x=a^x\\ln a",
    "\\frac{d}{dx}\\sin x=\\cos x",
    "\\frac{d}{dx}\\cos x=-\\sin x",
    "\\frac{d}{dx}\\tan x=\\sec^2 x",
  ],
  definition: {
    title: "Regla de la cadena",
    body:
      "Si $y=f(u)$ y $u=g(x)$ son derivables, entonces $\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}=f'(g(x))g'(x)$.",
  },
  examples: [
    {
      statement: "Deriva $f(x)=5x^4-3x^2+8$.",
      steps: ["Aplicamos linealidad.", "Derivamos cada potencia.", "La constante desaparece."],
      conclusion: "$f'(x)=20x^3-6x$.",
    },
    {
      statement: "Deriva $f(x)=(x^2+1)\\sin x$.",
      steps: ["Usamos producto con $u=x^2+1$ y $v=\\sin x$.", "$u'=2x$ y $v'=\\cos x$.", "Aplicamos $(uv)'=u'v+uv'$."],
      conclusion: "$f'(x)=2x\\sin x+(x^2+1)\\cos x$.",
    },
    {
      statement: "Deriva $g(x)=\\frac{x+1}{x^2+1}$.",
      steps: ["Usamos cociente.", "Numerador derivado: $1(x^2+1)-(x+1)2x$.", "Simplificamos el numerador."],
      conclusion: "$g'(x)=\\frac{-x^2-2x+1}{(x^2+1)^2}$.",
    },
    {
      statement: "Deriva $h(x)=e^{\\sin(3x)}$.",
      steps: ["Hay composición exponencial, seno y función lineal.", "Derivamos la externa: $e^{\\sin(3x)}$.", "Multiplicamos por $\\cos(3x)$ y luego por $3$."],
      conclusion: "$h'(x)=3e^{\\sin(3x)}\\cos(3x)$.",
    },
  ],
  exercises: [
    { statement: "Deriva $x^7-4x+1$.", solution: "$7x^6-4$." },
    { statement: "Deriva $\\sqrt{x}$.", solution: "$1/(2\\sqrt{x})$." },
    { statement: "Deriva $x^{-3}$.", solution: "$-3x^{-4}$." },
    { statement: "Deriva $3e^x-2^x$.", solution: "$3e^x-2^x\\ln2$." },
    { statement: "Deriva $\\sin x+x\\cos x$.", solution: "$\\cos x+\\cos x-x\\sin x=2\\cos x-x\\sin x$." },
    { statement: "Deriva $(2x-1)^5$.", solution: "$10(2x-1)^4$." },
    { statement: "Deriva $\\ln(x^2+1)$.", solution: "$2x/(x^2+1)$." },
    { statement: "Deriva $x^2\\tan x$.", solution: "$2x\\tan x+x^2\\sec^2x$." },
    { statement: "Deriva $\\frac{e^x}{x}$.", solution: "$\\frac{xe^x-e^x}{x^2}$." },
    { statement: "Deriva $\\cos(5x^2)$.", solution: "$-10x\\sin(5x^2)$." },
    { statement: "Deriva $\\sqrt{1+\sin x}$.", solution: "$\\frac{\\cos x}{2\\sqrt{1+\sin x}}$." },
    { statement: "Deriva $\\frac{\\sin x}{1+\cos x}$.", solution: "$\\frac{1+\cos x}{(1+\cos x)^2}=\\frac{1}{1+\cos x}$." },
  ],
};

const tecnicasAvanzadasDerivacionContent: TopicContent = {
  contextLabel: "Técnicas avanzadas de derivación",
  theory: [
    "Las técnicas avanzadas amplían las reglas básicas a curvas implícitas, funciones inversas, productos complejos, potencias variables y derivadas sucesivas.",
    "La idea común es elegir una representación donde la estructura de la función sea más visible antes de derivar.",
  ],
  theorySections: [
    {
      title: "Derivación implícita",
      body: [
        "**Derivación implícita**: se usa cuando $x$ y $y$ están relacionadas por una ecuación y no conviene despejar $y$. Se deriva ambos lados respecto de $x$ tratando $y$ como función de $x$.",
        "Cada vez que se deriva una expresión con $y$, aparece el factor $y'$ por regla de la cadena. Luego se agrupan los términos con $y'$ y se despeja.",
        "Esta técnica es natural para circunferencias, elipses y curvas donde despejar produce varias ramas.",
      ],
    },
    {
      title: "Derivación logarítmica",
      body: [
        "**Derivación logarítmica**: se toma logaritmo natural en ambos lados para convertir productos en sumas, cocientes en restas y potencias en productos.",
        "Es especialmente útil para expresiones como $x^x$, productos largos o potencias donde base y exponente dependen de $x$.",
        "Después de derivar la ecuación logarítmica, se multiplica por la función original para recuperar $y'$.",
      ],
    },
    {
      title: "Funciones inversas e inversas trigonométricas",
      body: [
        "**Derivada de la inversa**: si $f$ es derivable e invertible cerca de un punto y $f'(x)\\ne0$, la pendiente de la inversa es el recíproco de la pendiente original en el punto correspondiente.",
        "**Inversas trigonométricas**: sus derivadas aparecen al invertir funciones trigonométricas restringidas a intervalos donde son biyectivas.",
        "Estas fórmulas requieren atención al dominio. Por ejemplo, $\\arcsin x$ y $\\arccos x$ solo reciben valores entre $-1$ y $1$.",
      ],
    },
    {
      title: "Derivadas de orden superior",
      body: [
        "**Segunda derivada**: mide cómo cambia la primera derivada. En movimiento rectilíneo, si $s'(t)$ es velocidad, entonces $s''(t)$ es aceleración.",
        "**Orden superior**: derivar repetidamente produce $f''$, $f'''$ y $f^{(n)}$. Estos objetos describen curvatura, aceleración y patrones de cambio más finos.",
        "En polinomios, las derivadas sucesivas eventualmente se vuelven cero. En exponenciales y trigonométricas aparecen ciclos o repeticiones estructurales.",
      ],
    },
  ],
  formulas: [
    "\\frac{d}{dx}F(x,y)=F_x+F_y\\frac{dy}{dx}",
    "(f^{-1})'(y)=\\frac{1}{f'(x)}",
    "\\frac{d}{dx}\\ln|y|=\\frac{y'}{y}",
    "\\frac{d}{dx}x^x=x^x(\\ln x+1)",
    "\\frac{d}{dx}\\arcsin x=\\frac{1}{\\sqrt{1-x^2}}",
    "\\frac{d}{dx}\\arccos x=-\\frac{1}{\\sqrt{1-x^2}}",
    "\\frac{d}{dx}\\arctan x=\\frac{1}{1+x^2}",
    "f''(x)=\\frac{d}{dx}f'(x)",
    "f^{(n)}(x)=\\frac{d}{dx}f^{(n-1)}(x)",
  ],
  definition: {
    title: "Derivación implícita",
    body:
      "Derivar implícitamente significa derivar una ecuación que relaciona $x$ y $y$, considerando $y$ como función de $x$ y despejando $\\frac{dy}{dx}$.",
  },
  examples: [
    {
      statement: "Halla $y'$ si $x^2+y^2=25$.",
      steps: ["Derivamos ambos lados respecto de $x$.", "$2x+2yy'=0$.", "Despejamos $y'$."],
      conclusion: "$y'=-x/y$.",
    },
    {
      statement: "Deriva $y=x^x$ para $x>0$.",
      steps: ["Tomamos logaritmo: $\\ln y=x\\ln x$.", "Derivamos: $y'/y=\\ln x+1$.", "Multiplicamos por $y=x^x$."],
      conclusion: "$y'=x^x(\\ln x+1)$.",
    },
    {
      statement: "Si $f(2)=5$ y $f'(2)=4$, halla $(f^{-1})'(5)$.",
      steps: ["El punto correspondiente es $x=2$ porque $f(2)=5$.", "Usamos la fórmula de la inversa.", "$(f^{-1})'(5)=1/f'(2)$."],
      conclusion: "$(f^{-1})'(5)=1/4$.",
    },
    {
      statement: "Calcula la tercera derivada de $f(x)=x^4-2x^2$.",
      steps: ["$f'(x)=4x^3-4x$.", "$f''(x)=12x^2-4$.", "$f'''(x)=24x$."],
      conclusion: "$f'''(x)=24x$.",
    },
  ],
  exercises: [
    { statement: "Para $x^2+xy+y^2=7$, halla $y'$.", solution: "$y'=-(2x+y)/(x+2y)$." },
    { statement: "Para $\\sin y=x$, halla $y'$.", solution: "$\\cos y\\,y'=1$, entonces $y'=1/\\cos y$." },
    { statement: "Deriva $y=(x^2+1)^x$.", solution: "$y'=(x^2+1)^x\\left(\\ln(x^2+1)+\\frac{2x^2}{x^2+1}\\right)$." },
    { statement: "Deriva $y=\\frac{(x+1)^3}{\\sqrt{x^2+1}}$ usando logaritmos.", solution: "$y'=y\\left(\\frac{3}{x+1}-\\frac{x}{x^2+1}\\right)$." },
    { statement: "Deriva $\\arcsin(2x)$.", solution: "$2/\\sqrt{1-4x^2}$." },
    { statement: "Deriva $\\arctan(x^2)$.", solution: "$2x/(1+x^4)$." },
    { statement: "Si $f(1)=3$ y $f'(1)=-2$, halla $(f^{-1})'(3)$.", solution: "$-1/2$." },
    { statement: "Segunda derivada de $e^{3x}$.", solution: "$9e^{3x}$." },
    { statement: "Cuarta derivada de $\\sin x$.", solution: "$\\sin x$." },
    { statement: "Para $y^3+x^3=6xy$, plantea la ecuación para $y'$.", solution: "$3x^2+3y^2y'=6y+6xy'$." },
    { statement: "Deriva $\\ln|\\sin x|$.", solution: "$\\cot x$." },
    { statement: "Deriva $x^{\\sin x}$ para $x>0$.", solution: "$x^{\\sin x}\\left(\\cos x\\ln x+\\frac{\\sin x}{x}\\right)$." },
  ],
};

const optimizacionRazonesCambioContent: TopicContent = {
  contextLabel: "Optimización y razones de cambio",
  theory: [
    "Las aplicaciones de derivadas convierten descripciones verbales en relaciones matemáticas y luego interpretan derivadas como velocidades, tasas o condiciones de optimalidad.",
    "El trabajo principal no es derivar mecánicamente, sino elegir variables, formular ecuaciones y leer el significado del resultado.",
  ],
  theorySections: [
    {
      title: "Razones de cambio relacionadas",
      body: [
        "**Variables dependientes del tiempo**: en razones relacionadas, varias cantidades cambian simultáneamente. Se expresa cada cantidad como función de $t$, aunque la ecuación original no muestre $t$ explícitamente.",
        "**Diferenciar respecto al tiempo**: después de escribir una relación geométrica o física, se deriva toda la ecuación respecto de $t$. Aparecen tasas como $dx/dt$, $dy/dt$ o $dV/dt$.",
        "**Sustitución al final**: los valores numéricos del instante se colocan después de derivar. Sustituir demasiado temprano puede eliminar variables que todavía cambian.",
      ],
    },
    {
      title: "Modelado y restricciones",
      body: [
        "**Modelar variables**: se identifican las cantidades que cambian, las constantes y la tasa que se busca.",
        "**Ecuación de restricción**: relaciona las variables del problema. Puede venir de geometría, volumen, área, distancia o conservación de una cantidad.",
        "**Dominio físico**: las variables deben respetar longitudes positivas, áreas posibles, intervalos de tiempo y restricciones del contexto.",
      ],
    },
    {
      title: "Optimización",
      body: [
        "**Función objetivo**: es la cantidad que se desea maximizar o minimizar: área, costo, volumen, distancia o ganancia.",
        "**Restricción**: permite escribir la función objetivo en una sola variable. Sin esta reducción, no se puede aplicar el análisis de una variable.",
        "**Puntos críticos**: se buscan donde la derivada es cero o no existe dentro del dominio. También se revisan extremos del intervalo cuando el dominio es cerrado.",
        "**Interpretación**: un punto crítico solo es candidato. Debe verificarse si produce máximo, mínimo o ninguno, y la respuesta debe tener sentido en el problema original.",
      ],
    },
  ],
  formulas: [
    "\\frac{d}{dt}x(t)^n=nx(t)^{n-1}\\frac{dx}{dt}",
    "\\frac{d}{dt}[x(t)y(t)]=x'(t)y(t)+x(t)y'(t)",
    "A=xy",
    "A=\\pi r^2",
    "V=\\pi r^2h",
    "x^2+y^2=z^2",
    "f'(c)=0",
  ],
  definition: {
    title: "Optimización",
    body:
      "Optimizar consiste en encontrar el valor máximo o mínimo de una función objetivo bajo las restricciones del problema, usando derivadas para localizar candidatos y comparar valores.",
  },
  examples: [
    {
      statement: "Un círculo aumenta su radio a $2$ cm/s. ¿Qué tan rápido cambia el área cuando $r=5$?",
      steps: ["$A=\\pi r^2$.", "Derivamos respecto de $t$: $dA/dt=2\\pi r\\,dr/dt$.", "Sustituimos $r=5$ y $dr/dt=2$."],
      conclusion: "$dA/dt=20\\pi$ cm$^2$/s.",
    },
    {
      statement: "Una escalera de $10$ m se desliza. Si la base se aleja a $1$ m/s y está a $6$ m de la pared, halla $dy/dt$.",
      steps: ["Relación: $x^2+y^2=100$.", "Derivamos: $2x dx/dt+2y dy/dt=0$.", "Cuando $x=6$, $y=8$.", "Sustituimos $dx/dt=1$."],
      conclusion: "$dy/dt=-3/4$ m/s.",
    },
    {
      statement: "Maximiza el área de un rectángulo con perímetro $40$.",
      steps: ["$2x+2y=40$, entonces $y=20-x$.", "Área: $A=x(20-x)=20x-x^2$.", "$A'(x)=20-2x$.", "El punto crítico es $x=10$."],
      conclusion: "El área máxima es $100$, con un cuadrado de lado $10$.",
    },
    {
      statement: "Minimiza $C(x)=x^2+\\frac{16}{x}$ para $x>0$.",
      steps: ["Derivamos: $C'(x)=2x-16/x^2$.", "Resolvemos $2x=16/x^2$.", "Obtenemos $x^3=8$, así que $x=2$.", "El comportamiento del costo crece hacia $0^+$ y hacia $\\infty$."],
      conclusion: "El mínimo ocurre en $x=2$.",
    },
  ],
  exercises: [
    { statement: "Si $V=s^3$ y $ds/dt=2$, halla $dV/dt$ cuando $s=4$.", solution: "$dV/dt=3s^2ds/dt=96$." },
    { statement: "Si $A=\\pi r^2$ y $dr/dt=0.5$, halla $dA/dt$ cuando $r=10$.", solution: "$10\\pi$." },
    { statement: "Para $x^2+y^2=25$, con $dx/dt=3$, halla $dy/dt$ cuando $(x,y)=(3,4)$.", solution: "$dy/dt=-9/4$." },
    { statement: "Maximiza $A=x(30-x)$.", solution: "$x=15$, máximo $225$." },
    { statement: "Minimiza $f(x)=x^2-6x+10$.", solution: "$x=3$, mínimo $1$." },
    { statement: "Encuentra dos números positivos con suma $20$ y producto máximo.", solution: "$10$ y $10$." },
    { statement: "Maximiza el área de un rectángulo bajo $2x+y=12$.", solution: "$A=x(12-2x)$, máximo en $x=3$, $y=6$." },
    { statement: "Si $V=\\pi r^2h$, $r$ constante $3$ y $dh/dt=4$, halla $dV/dt$.", solution: "$36\\pi$." },
    { statement: "Si $y=x^2$ y $dx/dt=5$, halla $dy/dt$ cuando $x=2$.", solution: "$20$." },
    { statement: "Minimiza $x+9/x$ para $x>0$.", solution: "$x=3$." },
    { statement: "¿Por qué se revisa el dominio en optimización?", solution: "Porque los candidatos fuera del dominio físico no son soluciones del problema." },
    { statement: "Maximiza $f(x)=x(8-x)^2$ en $[0,8]$.", solution: "$f'(x)=(8-x)(8-3x)$; máximo en $x=8/3$." },
  ],
};

const analisisFuncionesDerivadasContent: TopicContent = {
  contextLabel: "Análisis de funciones con derivadas",
  theory: [
    "Las derivadas permiten leer la forma de una gráfica: dónde sube, dónde baja, dónde se curva y dónde puede alcanzar extremos.",
    "El análisis completo combina puntos críticos, pruebas de la primera y segunda derivada, extremos de intervalos y comportamiento global.",
  ],
  theorySections: [
    {
      title: "Puntos críticos y extremos",
      body: [
        "**Número crítico**: es un punto del dominio donde $f'(c)=0$ o donde $f'(c)$ no existe. Allí pueden ocurrir máximos o mínimos relativos.",
        "**Extremo relativo**: compara valores cercanos. Un máximo relativo es mayor que los valores próximos; un mínimo relativo es menor que los valores próximos.",
        "**Extremo absoluto**: compara todos los valores del dominio considerado. En un intervalo cerrado se revisan puntos críticos interiores y extremos del intervalo.",
        "**Teorema de Fermat**: si $f$ tiene un extremo local en un punto interior y es derivable allí, entonces $f'(c)=0$. La condición es necesaria, no suficiente.",
      ],
    },
    {
      title: "Crecimiento y primera derivada",
      body: [
        "**Intervalos de crecimiento**: si $f'(x)>0$ en un intervalo, la función crece allí. Si $f'(x)<0$, decrece.",
        "**Prueba de la primera derivada**: se observa el cambio de signo de $f'$ alrededor de un punto crítico. De positivo a negativo hay máximo; de negativo a positivo hay mínimo.",
        "Si el signo de $f'$ no cambia, el punto crítico no produce extremo relativo aunque la tangente sea horizontal o la derivada falle.",
      ],
    },
    {
      title: "Concavidad e inflexión",
      body: [
        "**Concavidad**: la segunda derivada describe cómo cambia la pendiente. Si $f''(x)>0$, la gráfica es cóncava hacia arriba; si $f''(x)<0$, es cóncava hacia abajo.",
        "**Punto de inflexión**: aparece cuando cambia la concavidad y el punto pertenece a la gráfica. No basta con que $f''(x)=0$; debe verificarse el cambio de signo.",
        "**Prueba de la segunda derivada**: si $f'(c)=0$ y $f''(c)>0$, hay mínimo local; si $f''(c)<0$, hay máximo local. Si $f''(c)=0$, la prueba no decide.",
      ],
    },
    {
      title: "Análisis gráfico completo",
      body: [
        "**Tabla de signos**: se combinan los ceros de $f'$ y $f''$ con puntos donde no existen para dividir el dominio en intervalos de comportamiento estable.",
        "**Lectura global**: una buena descripción incluye dominio, interceptos relevantes, crecimiento, extremos, concavidad, inflexiones y comportamiento al infinito o cerca de asíntotas cuando corresponde.",
        "La derivada no reemplaza el álgebra previa: factorizar, simplificar y entender el dominio siguen siendo necesarios antes de construir la tabla.",
      ],
    },
  ],
  formulas: [
    "f'(c)=0",
    "f'(x)>0",
    "f'(x)<0",
    "f''(x)>0",
    "f''(x)<0",
    "f''(c)=0",
    "\\frac{d^2y}{dx^2}=f''(x)",
  ],
  definition: {
    title: "Número crítico",
    body:
      "Un número crítico de $f$ es un número $c$ en el dominio de $f$ tal que $f'(c)=0$ o $f'(c)$ no existe.",
  },
  examples: [
    {
      statement: "Analiza crecimiento de $f(x)=x^3-3x$.",
      steps: ["$f'(x)=3x^2-3=3(x-1)(x+1)$.", "Puntos críticos: $x=-1,1$.", "El signo de $f'$ es positivo en $(-\\infty,-1)$, negativo en $(-1,1)$ y positivo en $(1,\\infty)$."],
      conclusion: "Máximo relativo en $x=-1$ y mínimo relativo en $x=1$.",
    },
    {
      statement: "Encuentra extremos absolutos de $f(x)=x^2-4x+1$ en $[0,5]$.",
      steps: ["$f'(x)=2x-4$.", "Punto crítico interior: $x=2$.", "Evaluamos $f(0)=1$, $f(2)=-3$, $f(5)=6$."],
      conclusion: "Mínimo absoluto $-3$ en $x=2$; máximo absoluto $6$ en $x=5$.",
    },
    {
      statement: "Estudia concavidad de $f(x)=x^4-4x^2$.",
      steps: ["$f''(x)=12x^2-8$.", "Resolvemos $12x^2-8=0$, así $x=\\pm\\sqrt{2/3}$.", "El signo de $f''$ cambia al cruzar ambos valores."],
      conclusion: "Hay puntos de inflexión en $x=\\pm\\sqrt{2/3}$.",
    },
    {
      statement: "Usa segunda derivada para clasificar $f(x)=x^2e^{-x}$ en sus puntos críticos.",
      steps: ["$f'(x)=e^{-x}(2x-x^2)=e^{-x}x(2-x)$.", "Puntos críticos: $0$ y $2$.", "El signo de $f'$ cambia de negativo a positivo en $0$ y de positivo a negativo en $2$."],
      conclusion: "Mínimo local en $0$ y máximo local en $2$.",
    },
  ],
  exercises: [
    { statement: "Números críticos de $f(x)=x^3-12x$.", solution: "$f'(x)=3x^2-12$, críticos $x=\\pm2$." },
    { statement: "Clasifica los críticos de $x^3-12x$.", solution: "Máximo en $-2$, mínimo en $2$." },
    { statement: "Extremos absolutos de $x^2$ en $[-1,3]$.", solution: "Mínimo $0$ en $0$, máximo $9$ en $3$." },
    { statement: "Intervalos de crecimiento de $f(x)=x^2-6x$.", solution: "Decrece en $(-\\infty,3)$ y crece en $(3,\\infty)$." },
    { statement: "Concavidad de $f(x)=x^3$.", solution: "$f''=6x$; abajo en $(-\\infty,0)$, arriba en $(0,\\infty)$." },
    { statement: "Punto de inflexión de $f(x)=x^3$.", solution: "$(0,0)$." },
    { statement: "Segunda derivada de $f(x)=\\ln x$ y concavidad.", solution: "$f''=-1/x^2<0$ para $x>0$; cóncava hacia abajo." },
    { statement: "Si $f'(x)=(x-1)^2(x+2)$, clasifica $x=1$ y $x=-2$.", solution: "En $-2$ cambia de negativo a positivo: mínimo; en $1$ no cambia: no extremo." },
    { statement: "Si $f''(c)>0$ y $f'(c)=0$, ¿qué concluyes?", solution: "Mínimo local." },
    { statement: "Si $f''(c)=0$, ¿hay inflexión automáticamente?", solution: "No; debe cambiar la concavidad." },
    { statement: "Extremos de $f(x)=x+1/x$ en $(0,\\infty)$.", solution: "Crítico $x=1$, mínimo local y absoluto." },
    { statement: "Analiza crecimiento de $f(x)=e^x-x$.", solution: "$f'=e^x-1$; decrece en $(-\\infty,0)$ y crece en $(0,\\infty)$." },
  ],
};

const reglaLHopitalContent: TopicContent = {
  contextLabel: "Regla de L’Hôpital",
  theory: [
    "La regla de L’Hôpital es una herramienta para ciertos límites indeterminados donde numerador y denominador se anulan o crecen sin cota al mismo tiempo.",
    "No reemplaza el análisis algebraico: primero se verifica la forma indeterminada y las condiciones de derivabilidad; luego se decide si derivar numerador y denominador simplifica el límite.",
  ],
  theorySections: [
    {
      title: "Formas indeterminadas y condiciones",
      body: [
        "**Forma $0/0$**: aparece cuando numerador y denominador tienden a cero. La regla permite comparar sus derivadas si ambas funciones son derivables cerca del punto.",
        "**Forma $\\infty/\\infty$**: aparece cuando numerador y denominador crecen sin cota. La regla compara las velocidades de crecimiento mediante derivadas.",
        "**Condiciones**: no basta con ver un cociente. Debe existir una forma indeterminada adecuada, el denominador derivado no debe anularse cerca del punto y el nuevo límite debe existir o describir divergencia.",
      ],
    },
    {
      title: "Aplicación y repetición",
      body: [
        "**Aplicación directa**: se deriva el numerador y el denominador por separado. No se aplica regla del cociente al cociente completo.",
        "**Aplicación repetida**: si después de una aplicación sigue apareciendo $0/0$ o $\\infty/\\infty$, puede aplicarse de nuevo siempre que las condiciones sigan cumpliéndose.",
        "Cada aplicación debe simplificar el problema. Si las derivadas complican la expresión, puede convenir regresar a álgebra, identidades o comparación dominante.",
      ],
    },
    {
      title: "Casos algebraicos, trigonométricos, exponenciales y logarítmicos",
      body: [
        "**Algebraicos**: en cocientes de polinomios o radicales, L’Hôpital puede confirmar resultados que también se obtienen por factorización o dominancia.",
        "**Trigonométricos**: límites como $\\frac{\\sin x}{x}$ cumplen $0/0$, pero conviene recordar que este límite fundamental suele usarse antes de introducir la regla.",
        "**Exponenciales y logarítmicos**: la regla es útil para comparar crecimiento, por ejemplo logaritmos contra potencias o potencias contra exponenciales.",
      ],
    },
    {
      title: "Errores comunes",
      body: [
        "**No indeterminación**: si la sustitución produce un número, infinito no ambiguo o división por cero con numerador no nulo, la regla no aplica en esa forma.",
        "**Derivar mal el cociente**: L’Hôpital no dice que se derive el cociente con la regla del cociente; dice que se reemplaza por el cociente de derivadas.",
        "**Formas indirectas**: productos, diferencias o potencias indeterminadas deben transformarse primero en cocientes antes de usar la regla.",
      ],
    },
  ],
  formulas: [
    "\\frac{0}{0}",
    "\\frac{\\infty}{\\infty}",
    "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}",
    "\\lim_{x\\to\\infty}\\frac{\\ln x}{x}=0",
    "\\lim_{x\\to\\infty}\\frac{x^n}{e^x}=0",
  ],
  definition: {
    title: "Regla de L’Hôpital",
    body:
      "Si $f$ y $g$ son derivables cerca de $a$, $g'(x)\\ne0$ cerca de $a$, y $f/g$ produce $0/0$ o $\\infty/\\infty$, entonces, cuando existe, $\\lim\\frac{f}{g}=\\lim\\frac{f'}{g'}$.",
  },
  examples: [
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\frac{e^x-1}{x}$",
      steps: ["La sustitución produce $0/0$.", "Derivamos numerador y denominador por separado.", "El nuevo límite es $\\lim_{x\\to0}e^x/1$."],
      conclusion: "El límite es $1$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{\\ln x}{x}$",
      steps: ["La forma es $\\infty/\\infty$.", "Aplicamos L’Hôpital: $\\frac{1/x}{1}$.", "Al tender $x\\to\\infty$, $1/x\\to0$."],
      conclusion: "El límite es $0$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$",
      steps: ["La forma inicial es $0/0$.", "Primera aplicación: $\\frac{\\sin x}{2x}$, todavía $0/0$.", "Segunda aplicación: $\\frac{\\cos x}{2}$."],
      conclusion: "El límite es $1/2$.",
    },
    {
      statement: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{x^2}{e^x}$",
      steps: ["La forma es $\\infty/\\infty$.", "Primera aplicación: $\\frac{2x}{e^x}$.", "Sigue $\\infty/\\infty$; segunda aplicación: $\\frac{2}{e^x}$."],
      conclusion: "El límite es $0$.",
    },
  ],
  exercises: [
    { statement: "$\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\frac{e^{2x}-1}{x}$", solution: "$2$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\frac{\\ln(1+x)}{x}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\frac{x-\\sin x}{x^3}$", solution: "Aplicando tres veces o usando expansión, $1/6$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{x}{e^x}$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{\\ln x}{\\sqrt{x}}$", solution: "$0$." },
    { statement: "$\\displaystyle\\lim_{x\\to0}\\frac{\\tan x}{x}$", solution: "$1$." },
    { statement: "$\\displaystyle\\lim_{x\\to1}\\frac{x^3-1}{x-1}$", solution: "$3$." },
    { statement: "¿Aplica L’Hôpital a $\\lim_{x\\to0}\\frac{1+x}{x}$?", solution: "No como $0/0$ ni $\\infty/\\infty$; el numerador tiende a $1$ y el cociente diverge." },
    { statement: "¿Qué se deriva en L’Hôpital?", solution: "Numerador y denominador por separado." },
    { statement: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{x^3}{e^x}$", solution: "$0$ tras aplicaciones repetidas." },
    { statement: "$\\displaystyle\\lim_{x\\to0^+}x\\ln x$", solution: "Reescribir como $\\ln x/(1/x)$ y aplicar; límite $0$." },
  ],
};
export const topicContent: Record<string, TopicContent> = Object.fromEntries([
  // ---------------- PRECÁLCULO ----------------
  M("precalculo:dominio-maximo", {
    contextLabel: "Dominio y rango de una función",
    geogebraId: "xvPUFKKf",
    theory: [
      "El dominio de una función real $f$ es el conjunto de todos los valores de $x$ para los cuales $f(x)$ está definido. El rango (o ámbito) es el conjunto de valores que toma $f$ cuando $x$ recorre el dominio.",
      "Para encontrar el dominio máximo de una función dada por una fórmula, identificamos las restricciones algebraicas: denominadores que no pueden ser cero, radicandos pares que deben ser no negativos y argumentos de logaritmos que deben ser positivos.",
      "Por ejemplo, en una función racional el dominio excluye los ceros del denominador; en una función con raíz cuadrada el dominio se obtiene resolviendo una desigualdad $\\text{radicando} \\geq 0$; en una función logarítmica resolvemos la inecuación que hace positivo al argumento.",
      "Determinar el rango suele requerir despejar $x$ en función de $y$ o estudiar el comportamiento gráfico (máximos, mínimos, asíntotas) de la función.",
    ],
    formulas: [
      "f(x) = \\dfrac{1}{x-3} \\;\\Rightarrow\\; D_f = \\mathbb{R}\\setminus\\{3\\}",
      "g(x) = \\sqrt{x-2} \\;\\Rightarrow\\; D_g = [2,\\,+\\infty)",
    ],
    definition: {
      title: "Dominio máximo",
      body: "Es el conjunto más grande de números reales $x$ para los que la expresión que define a $f(x)$ produce un número real.",
    },
    examples: [
      {
        statement: "Halla el dominio de $f(x) = \\dfrac{x+1}{x^2-4}$.",
        steps: [
          "Identificamos la restricción: el denominador no puede ser cero.",
          "Resolvemos $x^2 - 4 = 0 \\Rightarrow x = 2$ o $x = -2$.",
          "Excluimos esos valores del conjunto de los reales.",
        ],
        conclusion: "$D_f = \\mathbb{R} \\setminus \\{-2,\\, 2\\}$.",
      },
      {
        statement: "Halla el dominio de $g(x) = \\sqrt{5 - x}$.",
        steps: [
          "Restricción: $5 - x \\geq 0$.",
          "Despejamos $x \\leq 5$.",
        ],
        conclusion: "$D_g = (-\\infty,\\, 5]$.",
      },
      {
        statement: "Halla el dominio de $h(x) = \\ln(x - 1)$.",
        steps: [
          "Restricción del logaritmo: $x - 1 > 0$.",
          "Despejamos $x > 1$.",
        ],
        conclusion: "$D_h = (1,\\, +\\infty)$.",
      },
    ],
    exercises: [
      { statement: "$f(x) = \\dfrac{1}{x^2 - 9}$", solution: "$D = \\mathbb{R} \\setminus \\{-3,\\, 3\\}$." },
      { statement: "$f(x) = \\sqrt{x^2 - 4}$", solution: "$x^2 - 4 \\geq 0 \\Rightarrow D = (-\\infty,-2] \\cup [2,+\\infty)$." },
      { statement: "$f(x) = \\ln(4 - x^2)$", solution: "$4 - x^2 > 0 \\Rightarrow D = (-2,\\, 2)$." },
      { statement: "$f(x) = \\dfrac{\\sqrt{x}}{x-1}$", solution: "$x \\geq 0$ y $x \\neq 1 \\Rightarrow D = [0,1) \\cup (1,+\\infty)$." },
      { statement: "$f(x) = \\dfrac{1}{\\sqrt{x-3}}$", solution: "$x - 3 > 0 \\Rightarrow D = (3,\\, +\\infty)$." },
    ],
  }),

  M("precalculo:funcion-polinomial", {
    contextLabel: "Función polinomial",
    geogebraId: "ftyBNaAB",
    theory: [
      "Una función polinomial es una función de la forma $p(x) = a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0$, donde los coeficientes son números reales y $n$ es un entero no negativo llamado grado.",
      "Su dominio es siempre $\\mathbb{R}$. Las funciones polinomiales son continuas, suaves y su comportamiento al infinito está determinado por el término de mayor grado.",
      "Para hallar sus ceros (raíces) podemos usar factorización, productos notables, división sintética o el teorema de las raíces racionales: si $p/q$ es raíz racional de un polinomio con coeficientes enteros, entonces $p$ divide al término independiente y $q$ al coeficiente principal.",
      "El teorema del factor garantiza que $(x - r)$ es factor de $p(x)$ si y solo si $p(r) = 0$.",
    ],
    formulas: [
      "p(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0",
      "p(r)=0 \\;\\Longleftrightarrow\\; (x-r)\\mid p(x)",
    ],
    definition: {
      title: "Polinomio de grado n",
      body: "Expresión $p(x) = \\sum_{k=0}^{n} a_k x^k$ con $a_n \\neq 0$. El número $n$ se llama grado y $a_n$ coeficiente principal.",
    },
    examples: [
      {
        statement: "Factoriza $p(x) = x^3 - 7x + 6$.",
        steps: [
          "Posibles raíces racionales: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
          "Probamos $x = 1$: $1 - 7 + 6 = 0$ ✓.",
          "División sintética por $(x-1)$ da $x^2 + x - 6$.",
          "Factorizamos $x^2 + x - 6 = (x+3)(x-2)$.",
        ],
        conclusion: "$p(x) = (x-1)(x-2)(x+3)$.",
      },
      {
        statement: "Halla los ceros de $p(x) = 2x^2 - 5x - 3$.",
        steps: [
          "Aplicamos la fórmula cuadrática.",
          "$x = \\dfrac{5 \\pm \\sqrt{25+24}}{4} = \\dfrac{5 \\pm 7}{4}$.",
        ],
        conclusion: "$x = 3$ o $x = -\\dfrac{1}{2}$.",
      },
      {
        statement: "Determina el grado y el coeficiente principal de $p(x) = -4x^5 + x^2 - 9$.",
        steps: [
          "Identificamos la mayor potencia: $x^5$.",
          "El coeficiente que la acompaña es $-4$.",
        ],
        conclusion: "Grado $5$, coeficiente principal $-4$.",
      },
    ],
    exercises: [
      { statement: "Factoriza $x^3 - x^2 - 4x + 4$.", solution: "$(x-1)(x-2)(x+2)$." },
      { statement: "Halla las raíces de $x^2 - 6x + 9$.", solution: "$x = 3$ (raíz doble)." },
      { statement: "¿Es $2$ raíz de $p(x) = x^4 - 3x^3 + 2$?", solution: "$p(2) = 16 - 24 + 2 = -6 \\neq 0$, no lo es." },
      { statement: "Divide $x^3 - 2x^2 + x - 2$ entre $(x-2)$.", solution: "Cociente $x^2 + 1$, resto $0$." },
      { statement: "Factoriza $x^4 - 16$.", solution: "$(x-2)(x+2)(x^2+4)$." },
    ],
  }),

  M("precalculo:funcion-racional", {
    contextLabel: "Función racional",
    geogebraId: "kvAdrMXt",
    theory: [
      "Una función racional es el cociente de dos polinomios: $f(x) = p(x)/q(x)$, con $q(x)$ no idénticamente cero.",
      "Su dominio es $\\mathbb{R}$ menos los ceros del denominador. En esos puntos puede haber asíntotas verticales o discontinuidades removibles si también son ceros del numerador.",
      "Las asíntotas horizontales se determinan comparando los grados: si $\\deg(p) < \\deg(q)$ la asíntota es $y = 0$; si son iguales es $y = a_n/b_m$; si $\\deg(p) = \\deg(q)+1$ hay asíntota oblicua que se obtiene por división de polinomios.",
      "Las funciones racionales se simplifican factorizando numerador y denominador y cancelando factores comunes. Esa cancelación produce huecos (discontinuidades removibles) en la gráfica.",
    ],
    formulas: [
      "f(x) = \\dfrac{p(x)}{q(x)}, \\quad q(x)\\neq 0",
      "\\lim_{x\\to\\infty}\\dfrac{a_n x^n + \\dots}{b_m x^m + \\dots} = \\begin{cases}0 & n<m\\\\ a_n/b_m & n=m\\\\ \\pm\\infty & n>m\\end{cases}",
    ],
    definition: {
      title: "Función racional",
      body: "Toda función $f$ que puede escribirse como cociente de dos polinomios con denominador no idénticamente nulo.",
    },
    examples: [
      {
        statement: "Halla las asíntotas de $f(x) = \\dfrac{2x^2+1}{x^2-4}$.",
        steps: [
          "Asíntotas verticales: $x^2 - 4 = 0 \\Rightarrow x = \\pm 2$.",
          "El numerador no se anula en esos puntos, así que ambas son verticales.",
          "Asíntota horizontal: grados iguales, cociente de coeficientes $2/1 = 2$.",
        ],
        conclusion: "Verticales $x = 2$, $x = -2$; horizontal $y = 2$.",
      },
      {
        statement: "Simplifica $\\dfrac{x^2 - 9}{x - 3}$.",
        steps: [
          "Factorizamos el numerador: $(x-3)(x+3)$.",
          "Cancelamos $(x-3)$ con $x \\neq 3$.",
        ],
        conclusion: "$f(x) = x + 3$ con un hueco en $x = 3$.",
      },
      {
        statement: "Encuentra la asíntota oblicua de $\\dfrac{x^2+1}{x-1}$.",
        steps: [
          "División: $x^2 + 1 = (x-1)(x+1) + 2$.",
          "Cociente $x+1$, resto $2$.",
        ],
        conclusion: "Asíntota oblicua $y = x + 1$.",
      },
    ],
    exercises: [
      { statement: "Asíntotas de $f(x) = \\dfrac{1}{x-5}$.", solution: "Vertical $x = 5$, horizontal $y = 0$." },
      { statement: "Dominio de $\\dfrac{x+2}{x^2-1}$.", solution: "$\\mathbb{R} \\setminus \\{-1,\\, 1\\}$." },
      { statement: "Simplifica $\\dfrac{x^2-1}{x^2-x}$.", solution: "$\\dfrac{x+1}{x}$ con $x \\neq 0, 1$." },
      { statement: "Asíntota horizontal de $\\dfrac{3x+1}{2x-5}$.", solution: "$y = 3/2$." },
      { statement: "¿Tiene asíntota oblicua $\\dfrac{x^3}{x^2+1}$?", solution: "Sí, por división $y = x$." },
    ],
  }),

  M("precalculo:funcion-logaritmica", {
    contextLabel: "Funciones exponencial y logarítmica",
    geogebraId: "spts4HBQ",
    theory: [
      "La función exponencial de base $a > 0$, $a \\neq 1$, se define como $f(x) = a^x$. Su dominio es $\\mathbb{R}$ y su rango $(0, +\\infty)$. Es creciente si $a > 1$ y decreciente si $0 < a < 1$.",
      "La función logarítmica de base $a$ es la inversa de la exponencial: $y = \\log_a(x) \\Leftrightarrow a^y = x$. Su dominio es $(0, +\\infty)$ y su rango $\\mathbb{R}$.",
      "Las propiedades fundamentales son: $\\log(xy) = \\log x + \\log y$, $\\log(x/y) = \\log x - \\log y$, $\\log(x^n) = n \\cdot \\log x$, y el cambio de base $\\log_a x = \\dfrac{\\ln x}{\\ln a}$.",
      "La constante $e \\approx 2.718$ da lugar al logaritmo natural $\\ln x = \\log_e x$, omnipresente en cálculo por sus derivadas e integrales especialmente sencillas.",
    ],
    formulas: [
      "y = \\log_a x \\;\\Longleftrightarrow\\; a^y = x",
      "\\log_a(xy) = \\log_a x + \\log_a y, \\qquad \\log_a(x^n) = n\\log_a x",
    ],
    definition: {
      title: "Logaritmo",
      body: "Para $a > 0$ y $a \\neq 1$, $\\log_a x$ es el único número real $y$ tal que $a^y = x$, definido para $x > 0$.",
    },
    examples: [
      {
        statement: "Resuelve $2^{x+1} = 32$.",
        steps: [
          "Escribimos $32 = 2^5$.",
          "Igualamos exponentes: $x + 1 = 5$.",
        ],
        conclusion: "$x = 4$.",
      },
      {
        statement: "Resuelve $\\log_3(x-2) = 2$.",
        steps: [
          "Pasamos a forma exponencial: $x - 2 = 3^2 = 9$.",
          "Despejamos $x = 11$.",
          "Verificamos $x - 2 > 0$ ✓.",
        ],
        conclusion: "$x = 11$.",
      },
      {
        statement: "Simplifica $\\log_2 8 + \\log_2 4 - \\log_2 2$.",
        steps: [
          "$\\log_2 8 = 3$, $\\log_2 4 = 2$, $\\log_2 2 = 1$.",
          "Sumamos $3 + 2 - 1 = 4$.",
        ],
        conclusion: "Resultado $4$.",
      },
    ],
    exercises: [
      { statement: "Resuelve $3^x = 81$.", solution: "$x = 4$." },
      { statement: "Resuelve $\\log(x) + \\log(x-3) = 1$.", solution: "$\\log(x(x-3))=1 \\Rightarrow x^2-3x=10 \\Rightarrow x=5$." },
      { statement: "Dominio de $f(x) = \\ln(x^2-1)$.", solution: "$x^2 - 1 > 0 \\Rightarrow (-\\infty,-1) \\cup (1,+\\infty)$." },
      { statement: "Reescribe $\\ln\\!\\left(\\dfrac{a^2 b}{\\sqrt{c}}\\right)$.", solution: "$2\\ln a + \\ln b - \\tfrac{1}{2}\\ln c$." },
      { statement: "Resuelve $e^{2x} = 7$.", solution: "$x = \\dfrac{\\ln 7}{2}$." },
    ],
  }),

  M("precalculo:funciones-trig-inversas", {
    contextLabel: "Funciones trigonométricas e inversas",
    geogebraId: "SEqQvBuY",
    theory: [
      "Las funciones trigonométricas relacionan ángulos con razones de longitudes en un triángulo rectángulo o, más generalmente, con coordenadas sobre la circunferencia unitaria.",
      "Las funciones seno y coseno tienen dominio $\\mathbb{R}$, rango $[-1, 1]$ y período $2\\pi$. La tangente tiene período $\\pi$ y asíntotas verticales en $x = \\tfrac{\\pi}{2} + k\\pi$.",
      "Para definir inversas hay que restringir el dominio: $\\arcsin\\colon [-1,1] \\to [-\\pi/2, \\pi/2]$; $\\arccos\\colon [-1,1] \\to [0, \\pi]$; $\\arctan\\colon \\mathbb{R} \\to (-\\pi/2, \\pi/2)$.",
      "Las identidades fundamentales $\\sin^2 x + \\cos^2 x = 1$ y la fórmula de suma $\\sin(a+b) = \\sin a \\cos b + \\cos a \\sin b$ permiten simplificar expresiones y resolver ecuaciones trigonométricas.",
    ],
    formulas: [
      "\\sin^2 x + \\cos^2 x = 1",
      "\\sin(a\\pm b) = \\sin a\\cos b \\pm \\cos a \\sin b",
    ],
    definition: {
      title: "Circunferencia trigonométrica",
      body: "Es la circunferencia de radio $1$ centrada en el origen. Para un ángulo $\\theta$, el punto $( \\cos\\theta,\\, \\sin\\theta )$ está sobre ella.",
    },
    examples: [
      {
        statement: "Resuelve $\\sin x = \\dfrac{1}{2}$ en $[0, 2\\pi)$.",
        steps: [
          "Ángulo de referencia: $x = \\pi/6$.",
          "En el segundo cuadrante también $x = \\pi - \\pi/6 = 5\\pi/6$.",
        ],
        conclusion: "$x = \\dfrac{\\pi}{6}$ o $x = \\dfrac{5\\pi}{6}$.",
      },
      {
        statement: "Calcula $\\arccos\\!\\left(-\\dfrac{1}{2}\\right)$.",
        steps: [
          "Buscamos $y \\in [0,\\pi]$ con $\\cos y = -1/2$.",
          "$y = 2\\pi/3$.",
        ],
        conclusion: "$\\arccos(-1/2) = \\dfrac{2\\pi}{3}$.",
      },
      {
        statement: "Simplifica $\\sin x \\cos x$ usando la identidad de doble ángulo.",
        steps: [
          "Identidad: $\\sin(2x) = 2\\sin x \\cos x$.",
          "Despejamos $\\sin x \\cos x = \\dfrac{\\sin(2x)}{2}$.",
        ],
        conclusion: "$\\sin x \\cos x = \\dfrac{1}{2}\\sin(2x)$.",
      },
    ],
    exercises: [
      { statement: "Resuelve $\\cos x = 0$ en $[0, 2\\pi)$.", solution: "$x = \\pi/2$ o $x = 3\\pi/2$." },
      { statement: "Calcula $\\arctan(1)$.", solution: "$\\pi/4$." },
      { statement: "Simplifica $1 - \\sin^2 x$.", solution: "$\\cos^2 x$." },
      { statement: "Resuelve $2\\sin x - 1 = 0$ en $[0, 2\\pi)$.", solution: "$x = \\pi/6$ o $x = 5\\pi/6$." },
      { statement: "Calcula $\\sin(75°)$ usando suma de ángulos.", solution: "$\\sin(45°+30°) = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$." },
    ],
  }),

  // ---------------- CÁLCULO 1 ----------------
  M("calculo-1:limites-continuidad", limitesContinuidadContent),
  M("calculo-1:tecnicas-algebraicas-limites", tecnicasAlgebraicasConsolidadasContent),
  M("calculo-1:limites-trigonometricos-indeterminaciones", limitesTrigonometricosIndeterminacionesContent),
  M("calculo-1:limites-infinito-comportamiento-asintotico", limitesInfinitoAsintoticoContent),

  M("calculo-1:derivada-recta-tangente", derivadaRectaTangenteContent),
  M("calculo-1:reglas-derivacion", reglasDerivacionConsolidadasContent),
  M("calculo-1:tecnicas-avanzadas-derivacion", tecnicasAvanzadasDerivacionContent),
  M("calculo-1:optimizacion-razones-cambio", optimizacionRazonesCambioContent),
  M("calculo-1:analisis-funciones-derivadas", analisisFuncionesDerivadasContent),
  M("calculo-1:regla-lhopital", reglaLHopitalContent),

  M("calculo-1:integral-indefinida", {
    contextLabel: "Integral indefinida",
    geogebraId: "RCVce5W4",
    theory: [
      "Una antiderivada (o primitiva) de $f$ es una función $F$ tal que $F'(x) = f(x)$. La integral indefinida $\\int f(x)\\,dx$ denota la familia de todas las antiderivadas y se escribe $F(x) + C$, donde $C$ es una constante arbitraria.",
      "La integración es la operación inversa de la derivación. Las reglas básicas son la linealidad $\\int(af + bg) = a\\int f + b\\int g$ y la regla de la potencia $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$, válida para $n \\neq -1$.",
      "Para $n = -1$ tenemos $\\int \\dfrac{dx}{x} = \\ln|x| + C$. Otras integrales fundamentales: $\\int e^x\\,dx = e^x + C$, $\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$.",
      "Métodos avanzados como sustitución y partes permiten reducir integrales complejas a estas formas básicas.",
    ],
    formulas: [
      "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C,\\quad n\\neq -1",
      "\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C",
    ],
    definition: {
      title: "Antiderivada",
      body: "$F$ es antiderivada de $f$ en un intervalo si $F'(x) = f(x)$ para todo $x$ del intervalo. Dos antiderivadas difieren en una constante.",
    },
    examples: [
      {
        statement: "Calcula $\\int (3x^2 - 4x + 5)\\,dx$.",
        steps: [
          "Linealidad: separamos en tres integrales.",
          "$\\int 3x^2\\,dx = x^3$, $\\int -4x\\,dx = -2x^2$, $\\int 5\\,dx = 5x$.",
          "Sumamos y añadimos $C$.",
        ],
        conclusion: "$x^3 - 2x^2 + 5x + C$.",
      },
      {
        statement: "Calcula $\\int \\left(\\dfrac{1}{x} + e^x\\right)dx$.",
        steps: [
          "$\\int \\dfrac{1}{x}\\,dx = \\ln|x|$.",
          "$\\int e^x\\,dx = e^x$.",
          "Sumamos.",
        ],
        conclusion: "$\\ln|x| + e^x + C$.",
      },
      {
        statement: "Verifica que $F(x) = x\\sin x$ es antiderivada de $f(x) = \\sin x + x\\cos x$.",
        steps: [
          "Derivamos $F$: $F'(x) = \\sin x + x\\cos x$.",
          "Coincide con $f$.",
        ],
        conclusion: "Sí, $F$ es antiderivada de $f$.",
      },
    ],
    exercises: [
      { statement: "$\\int (2x + 3)\\,dx$", solution: "$x^2 + 3x + C$." },
      { statement: "$\\int \\sqrt{x}\\,dx$", solution: "$\\dfrac{2}{3}x^{3/2} + C$." },
      { statement: "$\\int \\cos(x)\\,dx$", solution: "$\\sin x + C$." },
      { statement: "$\\int \\left(x^3 - \\dfrac{1}{x^2}\\right)dx$", solution: "$\\dfrac{x^4}{4} + \\dfrac{1}{x} + C$." },
      { statement: "$\\int 5e^x\\,dx$", solution: "$5e^x + C$." },
    ],
  }),

  M("calculo-1:tfc", {
    contextLabel: "Teorema fundamental del cálculo",
    geogebraId: "CfwjsmHx",
    theory: [
      "El Teorema Fundamental del Cálculo (TFC) conecta los conceptos de derivada e integral, mostrando que son operaciones inversas. Tiene dos partes que suelen enunciarse por separado.",
      "Primera parte: si $f$ es continua en $[a,b]$ y definimos $F(x) = \\int_a^x f(t)\\,dt$, entonces $F$ es derivable y $F'(x) = f(x)$. Es decir, derivar una integral con extremo variable devuelve el integrando.",
      "Segunda parte (regla de Barrow): si $F$ es cualquier antiderivada de $f$ en $[a,b]$, entonces $\\int_a^b f(x)\\,dx = F(b) - F(a)$. Esto reduce el cálculo de integrales definidas a evaluar antiderivadas.",
      "El TFC justifica geométricamente que la integral definida representa el área neta entre la gráfica de $f$ y el eje $x$, sumando con signo según $f$ sea positiva o negativa.",
    ],
    formulas: [
      "\\dfrac{d}{dx}\\int_a^x f(t)\\,dt = f(x)",
      "\\int_a^b f(x)\\,dx = F(b) - F(a),\\quad F'=f",
    ],
    definition: {
      title: "Regla de Barrow",
      body: "Si $f$ es continua en $[a,b]$ y $F$ es una antiderivada de $f$, entonces $\\int_a^b f(x)\\,dx = F(b) - F(a)$.",
    },
    examples: [
      {
        statement: "Calcula $\\displaystyle\\int_0^2 3x^2\\,dx$.",
        steps: [
          "Antiderivada: $F(x) = x^3$.",
          "$F(2) - F(0) = 8 - 0 = 8$.",
        ],
        conclusion: "El valor es $8$.",
      },
      {
        statement: "Calcula $\\dfrac{d}{dx}\\displaystyle\\int_1^x \\ln(t)\\,dt$.",
        steps: [
          "Por la primera parte del TFC, el resultado es el integrando evaluado en $x$.",
        ],
        conclusion: "$\\ln(x)$.",
      },
      {
        statement: "Calcula $\\displaystyle\\int_0^{\\pi} \\sin x\\,dx$.",
        steps: [
          "Antiderivada: $-\\cos x$.",
          "$[-\\cos\\pi] - [-\\cos 0] = 1 - (-1) = 2$.",
        ],
        conclusion: "El valor es $2$.",
      },
    ],
    exercises: [
      { statement: "$\\displaystyle\\int_0^1 (2x+1)\\,dx$", solution: "$[x^2+x]_0^1 = 2$." },
      { statement: "$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,dx$", solution: "$\\ln e - \\ln 1 = 1$." },
      { statement: "$\\dfrac{d}{dx}\\displaystyle\\int_2^x (t^2+1)\\,dt$", solution: "$x^2 + 1$." },
      { statement: "$\\displaystyle\\int_0^{\\pi/2} \\cos x\\,dx$", solution: "$\\sin(\\pi/2) - \\sin 0 = 1$." },
      { statement: "$\\displaystyle\\int_{-1}^1 x^2\\,dx$", solution: "$\\left[\\dfrac{x^3}{3}\\right]_{-1}^1 = \\dfrac{2}{3}$." },
    ],
  }),

  // ---------------- PRECÁLCULO · MÓDULO 0 ----------------
  M("precalculo:numeros-reales", {
    contextLabel: "Números reales y sus subconjuntos",
    geogebraId: "jHkFgdy8",
    theory: [
      "El conjunto de los números reales $\\mathbb{R}$ se construye por niveles. Los naturales $\\mathbb{N}=\\{0,1,2,\\ldots\\}$ sirven para contar; los enteros $\\mathbb{Z}$ añaden los opuestos; los racionales $\\mathbb{Q}$ son cocientes $a/b$ con $b\\neq 0$.",
      "Los irracionales $\\mathbb{I}$ son los reales que no pueden escribirse como cociente de enteros (por ejemplo $\\sqrt{2}$, $\\pi$, $e$). Su expansión decimal es infinita y no periódica.",
      "La unión de racionales e irracionales forma los reales: $\\mathbb{R} = \\mathbb{Q}\\cup\\mathbb{I}$, con $\\mathbb{Q}\\cap\\mathbb{I}=\\varnothing$. Cada real corresponde a un único punto de la recta numérica.",
      "Las inclusiones son estrictas: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$.",
    ],
    formulas: [
      "\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}",
      "\\mathbb{R} = \\mathbb{Q}\\cup\\mathbb{I},\\qquad \\mathbb{Q}\\cap\\mathbb{I}=\\varnothing",
    ],
    definition: {
      title: "Número racional vs irracional",
      body: "Un número es racional si puede escribirse como $a/b$ con $a,b$ enteros y $b \\neq 0$; equivalente: su expansión decimal termina o es periódica. Es irracional si su expansión decimal es infinita no periódica.",
    },
    examples: [
      {
        statement: "Clasifica los números: $-3,\\ 0,\\ \\tfrac{7}{2},\\ \\sqrt{9},\\ \\sqrt{2},\\ \\pi$.",
        steps: [
          "$-3\\in\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$.",
          "$0\\in\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$.",
          "$7/2\\in\\mathbb{Q}\\subset\\mathbb{R}$, no entero.",
          "$\\sqrt{9}=3\\in\\mathbb{N}$.",
          "$\\sqrt{2},\\pi\\in\\mathbb{I}\\subset\\mathbb{R}$.",
        ],
        conclusion: "Solo $\\sqrt{2}$ y $\\pi$ son irracionales.",
      },
      {
        statement: "Escribe $0.\\overline{3}$ como fracción.",
        steps: [
          "Sea $x=0.\\overline{3}$.",
          "$10x = 3.\\overline{3} = 3 + x$.",
          "$9x = 3$.",
        ],
        conclusion: "$x=1/3$, por lo tanto $0.\\overline{3}\\in\\mathbb{Q}$.",
      },
      {
        statement: "¿Es $\\sqrt{2}+1$ racional o irracional?",
        steps: [
          "Si fuera racional, $\\sqrt{2}+1=p/q$ implica $\\sqrt{2}=p/q-1\\in\\mathbb{Q}$.",
          "Pero $\\sqrt{2}\\notin\\mathbb{Q}$ — contradicción.",
        ],
        conclusion: "$\\sqrt{2}+1$ es irracional.",
      },
    ],
    exercises: [
      { statement: "¿A qué subconjunto pertenece $-\\sqrt{16}$?", solution: "$-\\sqrt{16}=-4\\in\\mathbb{Z}$." },
      { statement: "Escribe $0.25$ como fracción.", solution: "$1/4\\in\\mathbb{Q}$." },
      { statement: "Da un irracional entre $1$ y $2$.", solution: "Por ejemplo $\\sqrt{2}\\approx 1.414$." },
      { statement: "¿Es $\\pi-\\pi$ irracional?", solution: "No, $\\pi-\\pi=0\\in\\mathbb{N}$." },
      { statement: "Convierte $0.\\overline{45}$ a fracción.", solution: "$x=0.\\overline{45}\\Rightarrow 99x=45\\Rightarrow x=5/11$." },
    ],
  }),

  M("precalculo:propiedades-suma-producto", {
    contextLabel: "Propiedades de la suma y la multiplicación en R",
    geogebraId: "bjrwtMQx",
    theory: [
      "La suma y el producto en $\\mathbb{R}$ son operaciones internas que cumplen propiedades estructurales que justifican toda manipulación algebraica.",
      "Conmutatividad: $a+b=b+a$ y $a\\cdot b=b\\cdot a$. Asociatividad: $(a+b)+c=a+(b+c)$ y $(ab)c=a(bc)$.",
      "Existen elementos neutros: $0$ para la suma ($a+0=a$) y $1$ para el producto ($a\\cdot 1=a$). Cada real $a$ tiene opuesto $-a$ y, si $a\\neq 0$, inverso multiplicativo $1/a$.",
      "La distributividad enlaza ambas operaciones: $a(b+c)=ab+ac$. Es la base de la factorización y del producto de polinomios.",
    ],
    formulas: [
      "a+b=b+a,\\qquad a\\cdot b=b\\cdot a",
      "a+(-a)=0,\\qquad a\\cdot \\tfrac{1}{a}=1\\;(a\\neq 0)",
      "a(b+c)=ab+ac",
    ],
    definition: {
      title: "Cuerpo ordenado",
      body: "El conjunto de los reales con la suma y el producto forma un cuerpo conmutativo: las dos operaciones son asociativas, conmutativas, tienen neutro e inverso (excepto $0$ para el producto) y se relacionan por la distributividad.",
    },
    examples: [
      {
        statement: "Justifica cada paso al simplificar $3(x+2)+5(x-1)$.",
        steps: [
          "$3(x+2)=3x+6$ por distributividad.",
          "$5(x-1)=5x-5$ por distributividad.",
          "$3x+6+5x-5 = (3x+5x)+(6-5)$ por conmutatividad y asociatividad.",
          "$=8x+1$.",
        ],
        conclusion: "$3(x+2)+5(x-1)=8x+1$.",
      },
      {
        statement: "Demuestra que $a\\cdot 0 = 0$ usando las propiedades.",
        steps: [
          "$a\\cdot 0 = a\\cdot(0+0) = a\\cdot 0 + a\\cdot 0$ (distributividad).",
          "Restando $a\\cdot 0$ a ambos lados (existencia del opuesto).",
        ],
        conclusion: "$a\\cdot 0 = 0$.",
      },
      {
        statement: "Halla el inverso multiplicativo de $-\\tfrac{2}{5}$.",
        steps: [
          "Buscamos $x$ con $(-2/5)\\cdot x = 1$.",
          "$x = -5/2$.",
        ],
        conclusion: "El inverso es $-5/2$.",
      },
    ],
    exercises: [
      { statement: "Simplifica $2(3x-4)+x$ justificando.", solution: "$6x-8+x=7x-8$ (distributividad y agrupación)." },
      { statement: "¿Cuál es el opuesto de $-7$?", solution: "$+7$, porque $-7+7=0$." },
      { statement: "¿Tiene $0$ inverso multiplicativo?", solution: "No: no existe $x$ con $0\\cdot x=1$." },
      { statement: "Verifica $(2+3)+4 = 2+(3+4)$.", solution: "Ambos valen $9$ — ejemplo de asociatividad." },
      { statement: "Factoriza $5x+5y$.", solution: "$5(x+y)$ por distributividad." },
    ],
  }),

  M("precalculo:orden-en-r", {
    contextLabel: "Orden en R",
    geogebraId: "CfJPUyfJ",
    theory: [
      "$\\mathbb{R}$ es un conjunto totalmente ordenado: para cada par $a,b$ se cumple exactamente una de las relaciones $a<b$, $a=b$ o $a>b$ (tricotomía).",
      "El orden es compatible con las operaciones. Si $a<b$, entonces $a+c<b+c$ para todo $c\\in\\mathbb{R}$. Si además $c>0$, entonces $ac<bc$; si $c<0$, la desigualdad se invierte: $ac>bc$.",
      "La transitividad afirma que $a<b$ y $b<c$ implican $a<c$. Estas reglas permiten manipular desigualdades como si fueran ecuaciones, salvo el cambio de signo al multiplicar por un negativo.",
      "Geométricamente, $a<b$ significa que $a$ está a la izquierda de $b$ en la recta real.",
    ],
    formulas: [
      "a<b\\;\\land\\;c>0 \\;\\Rightarrow\\; ac<bc",
      "a<b\\;\\land\\;c<0 \\;\\Rightarrow\\; ac>bc",
      "a<b\\;\\land\\;b<c \\;\\Rightarrow\\; a<c",
    ],
    definition: {
      title: "Tricotomía",
      body: "Para cualesquiera reales $a$ y $b$ se cumple una y solo una de: $a < b$, $a = b$, $a > b$.",
    },
    examples: [
      {
        statement: "Compara $-\\tfrac{3}{4}$ y $-\\tfrac{2}{3}$.",
        steps: [
          "Común denominador $12$: $-9/12$ y $-8/12$.",
          "Como $-9<-8$, entonces $-9/12<-8/12$.",
        ],
        conclusion: "$-3/4 < -2/3$.",
      },
      {
        statement: "Si $a<b$, ¿qué pasa con $-2a$ y $-2b$?",
        steps: [
          "Multiplicamos por $-2<0$.",
          "La desigualdad se invierte.",
        ],
        conclusion: "$-2a > -2b$.",
      },
      {
        statement: "Demuestra que si $0<a<b$, entonces $\\dfrac{1}{a} > \\dfrac{1}{b}$.",
        steps: [
          "$a<b$ y $ab>0$.",
          "Dividimos ambos lados por $ab$ (positivo, no cambia el sentido).",
          "$\\dfrac{a}{ab}<\\dfrac{b}{ab}\\Rightarrow \\dfrac{1}{b}<\\dfrac{1}{a}$.",
        ],
        conclusion: "$\\dfrac{1}{a} > \\dfrac{1}{b}$.",
      },
    ],
    exercises: [
      { statement: "Ordena $-2,\\ -\\sqrt{2},\\ -1.5$.", solution: "$-2 < -1.5 < -\\sqrt{2}\\approx-1.414$." },
      { statement: "Si $x<y$, compara $5-x$ y $5-y$.", solution: "$-x>-y\\Rightarrow 5-x>5-y$." },
      { statement: "¿Es cierto que $a^2\\ge 0$ para todo real?", solution: "Sí, por la regla de signos." },
      { statement: "Si $a<0<b$, ¿cuál es el signo de $a/b$?", solution: "Negativo." },
      { statement: "Compara $\\sqrt{2}$ y $1.5$.", solution: "$\\sqrt{2}\\approx 1.414 < 1.5$." },
    ],
  }),

  M("precalculo:desigualdades-intervalos", {
    contextLabel: "Desigualdades e intervalos",
    geogebraId: "bYGED3dY",
    theory: [
      "Un intervalo es un subconjunto de $\\mathbb{R}$ formado por todos los reales entre dos extremos. Se denota con paréntesis cuando el extremo se excluye y corchetes cuando se incluye: $(a,b)$, $[a,b]$, $[a,b)$, $(a,b]$.",
      "Los intervalos infinitos usan $\\pm\\infty$, siempre con paréntesis: $(-\\infty,a]$, $(a,+\\infty)$.",
      "Resolver una desigualdad lineal sigue las mismas reglas que una ecuación, recordando invertir el sentido al multiplicar o dividir por un negativo. La solución se expresa como intervalo.",
      "Para desigualdades cuadráticas o racionales, se factoriza, se identifican los puntos críticos donde la expresión vale $0$ o no está definida, y se hace una tabla de signos sobre los intervalos resultantes.",
    ],
    formulas: [
      "[a,b]=\\{x\\in\\mathbb{R}:a\\le x\\le b\\}",
      "(a,b)=\\{x\\in\\mathbb{R}:a<x<b\\}",
      "ax+b<0\\;(a>0)\\;\\Longleftrightarrow\\; x<-b/a",
    ],
    definition: {
      title: "Conjunto solución",
      body: "El conjunto solución de una desigualdad es el conjunto de todos los reales que la satisfacen. Suele expresarse como un intervalo o unión de intervalos.",
    },
    examples: [
      {
        statement: "Resuelve $3x-5 < 7$.",
        steps: [
          "Sumamos $5$: $3x < 12$.",
          "Dividimos entre $3$ (positivo): $x < 4$.",
        ],
        conclusion: "$x\\in(-\\infty,4)$.",
      },
      {
        statement: "Resuelve $-2x+1\\ge 5$.",
        steps: [
          "Restamos $1$: $-2x\\ge 4$.",
          "Dividimos entre $-2$ (negativo, invierte): $x\\le -2$.",
        ],
        conclusion: "$x\\in(-\\infty,-2]$.",
      },
      {
        statement: "Resuelve $x^2-x-6\\le 0$.",
        steps: [
          "Factoriza: $(x-3)(x+2)\\le 0$.",
          "Ceros: $x=-2$ y $x=3$.",
          "Tabla de signos: el producto es $\\le 0$ entre las raíces.",
        ],
        conclusion: "$x\\in[-2,3]$.",
      },
    ],
    exercises: [
      { statement: "Resuelve $4x+3>11$.", solution: "$x>2\\Rightarrow(2,+\\infty)$." },
      { statement: "Resuelve $\\dfrac{1-x}{2}\\le 3$.", solution: "$1-x\\le 6\\Rightarrow x\\ge -5\\Rightarrow[-5,+\\infty)$." },
      { statement: "Resuelve $x^2 < 9$.", solution: "$-3<x<3\\Rightarrow(-3,3)$." },
      { statement: "Resuelve $\\dfrac{x-1}{x+2}\\ge 0$.", solution: "Puntos críticos $-2,1$. Solución: $(-\\infty,-2)\\cup[1,+\\infty)$." },
      { statement: "Expresa $\\{x:-1\\le x<4\\}$ como intervalo.", solution: "$[-1,4)$." },
    ],
  }),
] satisfies Array<[string, TopicContent]>);

export const getTopicContent = (courseSlug: string, topicSlug: string): TopicContent | undefined =>
  topicContent[`${courseSlug}:${topicSlug}`];
