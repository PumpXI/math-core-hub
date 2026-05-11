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
  M("calculo-1:limites-intuitivo", limitesIntuitivoContent),
  M("calculo-1:concepto-intuitivo-limite-y-limites-laterales", limitesIntuitivoContent),
  M("calculo-1:limites-infinitos", limitesInfinitosContent),
  M("calculo-1:limites-infinitos-y-al-infinito", limitesInfinitosContent),

  M("calculo-1:tecnicas-limites", tecnicasAlgebraicasLimitesContent),
  M("calculo-1:tecnicas-algebraicas-de-calculo-de-limites", tecnicasAlgebraicasLimitesContent),
  M("calculo-1:indeterminaciones-encaje", indeterminacionesCompresionContent),
  M("calculo-1:indeterminaciones-y-teorema-de-compresion", indeterminacionesCompresionContent),

  M("calculo-1:continuidad", continuidadPuntoIntervaloContent),
  M("calculo-1:continuidad-en-un-punto-y-en-un-intervalo", continuidadPuntoIntervaloContent),
  M("calculo-1:continuidad-lateral", continuidadLateralContent),
  M("calculo-1:continuidad-por-la-derecha-y-por-la-izquierda", continuidadLateralContent),
  M("calculo-1:tipos-discontinuidad", tiposDiscontinuidadContent),
  M("calculo-1:tipos-de-discontinuidad", tiposDiscontinuidadContent),
  M("calculo-1:cambios-variable", cambiosVariableContent),
  M("calculo-1:cambios-de-variable", cambiosVariableContent),
  M("calculo-1:limites-trigonometricos", limitesTrigonometricosContent),
  M("calculo-1:asintotas-vh", asintotasVerticalesHorizontalesContent),
  M("calculo-1:asintotas-verticales-y-horizontales", asintotasVerticalesHorizontalesContent),

  M("calculo-1:definicion-derivada", {
    contextLabel: "Definición e interpretación de la derivada",
    geogebraId: "WGCsKBeM",
    theory: [
      "La derivada de $f$ en $a$, denotada $f'(a)$, mide la tasa instantánea de cambio de $f$ en ese punto. Geométricamente es la pendiente de la recta tangente a la gráfica de $f$ en $(a, f(a))$.",
      "Se define como un límite: $f'(a) = \\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}$, siempre que el límite exista. Si existe, decimos que $f$ es derivable en $a$.",
      "La derivabilidad implica continuidad, pero no al revés: la función $|x|$ es continua en $0$ pero no derivable allí porque la pendiente cambia bruscamente.",
      "La función derivada $f'$ asigna a cada punto donde $f$ es derivable el valor de la pendiente. Sus aplicaciones incluyen velocidad, aceleración, optimización y análisis de gráficas.",
    ],
    formulas: [
      "f'(a) = \\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}",
      "f'(a) = \\lim_{x\\to a}\\dfrac{f(x)-f(a)}{x-a}",
    ],
    definition: {
      title: "Derivada en un punto",
      body: "$f$ es derivable en $a$ si existe el límite $f'(a) = \\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}$.",
    },
    examples: [
      {
        statement: "Calcula la derivada de $f(x) = x^2$ en $x = 3$ por definición.",
        steps: [
          "$f(3+h) = (3+h)^2 = 9 + 6h + h^2$.",
          "$f(3+h) - f(3) = 6h + h^2$.",
          "Cociente: $\\dfrac{6h+h^2}{h} = 6 + h$.",
          "Tomamos límite $h \\to 0$: $6$.",
        ],
        conclusion: "$f'(3) = 6$.",
      },
      {
        statement: "Halla $f'(x)$ si $f(x) = \\sqrt{x}$.",
        steps: [
          "Cociente: $\\dfrac{\\sqrt{x+h}-\\sqrt{x}}{h}$.",
          "Multiplicamos por el conjugado $\\Rightarrow \\dfrac{h}{h(\\sqrt{x+h}+\\sqrt{x})}$.",
          "Simplificamos y tomamos $h \\to 0$.",
        ],
        conclusion: "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$.",
      },
      {
        statement: "Halla la ecuación de la recta tangente a $y = x^2$ en $x = 1$.",
        steps: [
          "$f'(x) = 2x \\Rightarrow$ pendiente $m = 2$.",
          "Punto $(1, 1)$.",
          "Recta: $y - 1 = 2(x - 1)$.",
        ],
        conclusion: "$y = 2x - 1$.",
      },
    ],
    exercises: [
      { statement: "Por definición, derivada de $f(x) = 3x + 2$.", solution: "Cociente $\\dfrac{3h}{h} = 3 \\Rightarrow f'(x) = 3$." },
      { statement: "Por definición, derivada de $f(x) = x^3$ en $x = 2$.", solution: "$12$." },
      { statement: "¿Es derivable $f(x) = |x|$ en $0$?", solution: "No, los laterales $1$ y $-1$ difieren." },
      { statement: "Tangente a $y = 1/x$ en $x = 1$.", solution: "Pendiente $-1$, recta $y = -x + 2$." },
      { statement: "Derivada por definición de $f(x) = 1/x$.", solution: "$-1/x^2$." },
    ],
  }),

  M("calculo-1:reglas-derivacion", {
    contextLabel: "Reglas de derivación",
    geogebraId: "JZPQJseE",
    theory: [
      "Las reglas de derivación permiten calcular derivadas sin recurrir cada vez a la definición. Las básicas son la regla de la potencia, suma, producto, cociente y cadena.",
      "Regla de la potencia: si $f(x) = x^n$ entonces $f'(x) = n x^{n-1}$ (válida para cualquier exponente real).",
      "Regla del producto: $(fg)' = f'g + fg'$. Regla del cociente: $\\left(\\dfrac{f}{g}\\right)' = \\dfrac{f'g - fg'}{g^2}$. Regla de la cadena: $(f\\circ g)'(x) = f'(g(x))\\cdot g'(x)$.",
      "Combinando estas reglas con derivadas conocidas — $\\sin' = \\cos$, $\\cos' = -\\sin$, $(e^x)' = e^x$, $(\\ln x)' = 1/x$ — se calcula casi cualquier derivada elemental.",
    ],
    formulas: [
      "(f g)' = f' g + f g', \\qquad \\left(\\dfrac{f}{g}\\right)' = \\dfrac{f' g - f g'}{g^2}",
      "(f\\circ g)'(x) = f'(g(x))\\cdot g'(x)",
    ],
    definition: {
      title: "Regla de la cadena",
      body: "Si $y = f(u)$ y $u = g(x)$ son derivables, entonces $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx} = f'(g(x))\\cdot g'(x)$.",
    },
    examples: [
      {
        statement: "Deriva $f(x) = (3x^2 + 1)\\sin(x)$.",
        steps: [
          "Aplicamos la regla del producto con $u = 3x^2+1$ ($u'=6x$) y $v = \\sin x$ ($v'=\\cos x$).",
          "$(uv)' = 6x\\sin x + (3x^2+1)\\cos x$.",
        ],
        conclusion: "$f'(x) = 6x\\sin x + (3x^2+1)\\cos x$.",
      },
      {
        statement: "Deriva $g(x) = \\sin(x^2)$.",
        steps: [
          "Cadena con $u = x^2 \\Rightarrow u' = 2x$.",
          "$g'(x) = \\cos(u)\\cdot u' = \\cos(x^2)\\cdot 2x$.",
        ],
        conclusion: "$g'(x) = 2x\\cos(x^2)$.",
      },
      {
        statement: "Deriva $h(x) = \\dfrac{x+1}{x^2+1}$.",
        steps: [
          "Cociente: numerador $1\\cdot(x^2+1) - (x+1)\\cdot 2x$.",
          "Simplificamos: $x^2+1-2x^2-2x = -x^2-2x+1$.",
        ],
        conclusion: "$h'(x) = \\dfrac{-x^2-2x+1}{(x^2+1)^2}$.",
      },
    ],
    exercises: [
      { statement: "Deriva $f(x) = x^5 - 3x^2 + 7$.", solution: "$5x^4 - 6x$." },
      { statement: "Deriva $f(x) = e^{2x}$.", solution: "$2e^{2x}$." },
      { statement: "Deriva $f(x) = \\ln(x^2+1)$.", solution: "$\\dfrac{2x}{x^2+1}$." },
      { statement: "Deriva $f(x) = x^2\\cos(x)$.", solution: "$2x\\cos x - x^2\\sin x$." },
      { statement: "Deriva $f(x) = \\sqrt{3x+1}$.", solution: "$\\dfrac{3}{2\\sqrt{3x+1}}$." },
    ],
  }),

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
