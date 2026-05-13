import { type ReactNode, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { VisualShell } from "./VisualShell";

type MainTab = "builder" | "errors";
type ExampleKey = "sum" | "product" | "quotient" | "chainSine" | "chainExp";
type ErrorKey = "product" | "chain" | "quotient";

function Sup({ children }: { children: string }) {
  return <sup className="text-[0.68em] leading-none">{children}</sup>;
}

function Chip({ children, tone = "slate", active = false }: { children: ReactNode; tone?: "emerald" | "violet" | "amber" | "sky" | "slate"; active?: boolean }) {
  const colors = {
    emerald: active ? "bg-emerald-100 text-emerald-950 ring-emerald-300" : "bg-emerald-50 text-emerald-800 ring-emerald-100",
    violet: active ? "bg-violet-100 text-violet-950 ring-violet-300" : "bg-violet-50 text-violet-800 ring-violet-100",
    amber: active ? "bg-amber-100 text-amber-950 ring-amber-300" : "bg-amber-50 text-amber-800 ring-amber-100",
    sky: active ? "bg-sky-100 text-sky-950 ring-sky-300" : "bg-sky-50 text-sky-800 ring-sky-100",
    slate: active ? "bg-slate-950 text-white ring-slate-950" : "bg-white text-slate-700 ring-slate-200",
  };
  return <span className={`inline-flex items-center rounded-lg px-2 py-1 ring-1 transition ${colors[tone]}`}>{children}</span>;
}

function Fraction({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle leading-none">
      <span>{top}</span>
      <span className="my-1 h-px w-full min-w-10 bg-current" />
      <span>{bottom}</span>
    </span>
  );
}

function ExpX() {
  return (
    <span>
      e<Sup>x</Sup>
    </span>
  );
}

function ExpCosX() {
  return (
    <span>
      e<Sup>cos(x)</Sup>
    </span>
  );
}

function X2() {
  return (
    <span>
      x<Sup>2</Sup>
    </span>
  );
}

function X3() {
  return (
    <span>
      x<Sup>3</Sup>
    </span>
  );
}

const examples: Record<
  ExampleKey,
  {
    label: string;
    rule: string;
    expression: ReactNode;
    structure: Array<{ label: ReactNode; tone: "emerald" | "violet" | "amber" | "sky" }>;
    steps: Array<{ title: string; detail: ReactNode; highlight: number[] }>;
    final: ReactNode;
  }
> = {
  sum: {
    label: "Suma y reglas básicas",
    rule: "Suma",
    expression: (
      <span>
        f(x) = <Chip tone="emerald"><X3 /></Chip> + <Chip tone="violet">sen(x)</Chip>
      </span>
    ),
    structure: [
      { label: <X3 />, tone: "emerald" },
      { label: "sen(x)", tone: "violet" },
    ],
    steps: [
      { title: "Separar términos", detail: "La derivada de una suma se calcula término por término.", highlight: [0, 1] },
      { title: "Derivar potencia", detail: <span>d/dx de <X3 /> es 3x<Sup>2</Sup>.</span>, highlight: [0] },
      { title: "Derivar seno", detail: "d/dx de sen(x) es cos(x).", highlight: [1] },
      { title: "Unir resultados", detail: <span>f'(x) = 3x<Sup>2</Sup> + cos(x)</span>, highlight: [0, 1] },
    ],
    final: <span>f'(x) = 3x<Sup>2</Sup> + cos(x)</span>,
  },
  product: {
    label: "Producto",
    rule: "Producto",
    expression: (
      <span>
        f(x) = <Chip tone="emerald"><X2 /></Chip><Chip tone="violet"><ExpX /></Chip>
      </span>
    ),
    structure: [
      { label: <span>u = <X2 /></span>, tone: "emerald" },
      { label: <span>v = <ExpX /></span>, tone: "violet" },
    ],
    steps: [
      { title: "Detectar producto", detail: "La función está construida como u·v.", highlight: [0, 1] },
      { title: "Aplicar regla", detail: "La derivada es u'v + uv'.", highlight: [0, 1] },
      { title: "Derivar piezas", detail: <span>u' = 2x y v' = <ExpX />.</span>, highlight: [0, 1] },
      { title: "Sustituir", detail: <span>f'(x) = 2x<ExpX /> + <X2 /><ExpX /></span>, highlight: [0, 1] },
    ],
    final: <span>f'(x) = 2x<ExpX /> + x<Sup>2</Sup><ExpX /></span>,
  },
  quotient: {
    label: "Cociente",
    rule: "Cociente",
    expression: (
      <span>
        f(x) = <Fraction top={<Chip tone="emerald"><span>3x<Sup>2</Sup> + 1</span></Chip>} bottom={<Chip tone="violet"><span>x − 2</span></Chip>} />
      </span>
    ),
    structure: [
      { label: <span>u = 3x<Sup>2</Sup> + 1</span>, tone: "emerald" },
      { label: "v = x − 2", tone: "violet" },
    ],
    steps: [
      { title: "Detectar cociente", detail: "Hay numerador u y denominador v.", highlight: [0, 1] },
      { title: "Aplicar regla", detail: <span>f' = <Fraction top="u'v − uv'" bottom={<span>v<Sup>2</Sup></span>} /></span>, highlight: [0, 1] },
      { title: "Derivar piezas", detail: "u' = 6x y v' = 1.", highlight: [0, 1] },
      { title: "Sustituir", detail: <span>f'(x) = <Fraction top={<span>6x(x − 2) − (3x<Sup>2</Sup> + 1)</span>} bottom={<span>(x − 2)<Sup>2</Sup></span>} /></span>, highlight: [0, 1] },
    ],
    final: <span>f'(x) = <Fraction top={<span>3x<Sup>2</Sup> − 12x − 1</span>} bottom={<span>(x − 2)<Sup>2</Sup></span>} /></span>,
  },
  chainSine: {
    label: "Cadena con seno",
    rule: "Cadena",
    expression: (
      <span>
        f(x) = <Chip tone="emerald">sen(</Chip><Chip tone="violet"><X2 /></Chip><Chip tone="emerald">)</Chip>
      </span>
    ),
    structure: [
      { label: "exterior: sen(u)", tone: "emerald" },
      { label: <span>interior: u = <X2 /></span>, tone: "violet" },
    ],
    steps: [
      { title: "Función exterior", detail: "La capa exterior es sen(u).", highlight: [0] },
      { title: "Función interior", detail: <span>La capa interior es u = <X2 />.</span>, highlight: [1] },
      { title: "Aplicar cadena", detail: "d/dx sen(u) = cos(u)·u'.", highlight: [0, 1] },
      { title: "Derivar interior", detail: "u' = 2x.", highlight: [1] },
      { title: "Resultado", detail: <span>f'(x) = 2x cos(x<Sup>2</Sup>)</span>, highlight: [0, 1] },
    ],
    final: <span>f'(x) = 2x cos(x<Sup>2</Sup>)</span>,
  },
  chainExp: {
    label: "Cadena exponencial",
    rule: "Cadena + trigonométrica",
    expression: (
      <span>
        f(x) = <Chip tone="emerald">e</Chip><Sup>cos(x)</Sup>
      </span>
    ),
    structure: [
      { label: <span>exterior: e<Sup>u</Sup></span>, tone: "emerald" },
      { label: "interior: u = cos(x)", tone: "violet" },
    ],
    steps: [
      { title: "Función exterior", detail: <span>La capa exterior es e<Sup>u</Sup>.</span>, highlight: [0] },
      { title: "Función interior", detail: "La capa interior es u = cos(x).", highlight: [1] },
      { title: "Aplicar cadena", detail: <span>d/dx e<Sup>u</Sup> = e<Sup>u</Sup>·u'.</span>, highlight: [0, 1] },
      { title: "Derivar interior", detail: "u' = −sen(x).", highlight: [1] },
      { title: "Resultado", detail: <span>f'(x) = −sen(x)<ExpCosX /></span>, highlight: [0, 1] },
    ],
    final: <span>f'(x) = −sen(x)<ExpCosX /></span>,
  },
};

function RuleBuilderTab() {
  const [exampleKey, setExampleKey] = useState<ExampleKey>("chainSine");
  const [stepIndex, setStepIndex] = useState(0);
  const [showStructure, setShowStructure] = useState(true);
  const example = examples[exampleKey];
  const step = example.steps[stepIndex];

  function chooseExample(key: ExampleKey) {
    setExampleKey(key);
    setStepIndex(0);
  }

  return (
    <div className="grid bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(examples) as ExampleKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => chooseExample(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                exampleKey === key ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-950"
              }`}
            >
              {examples[key].label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Función original</div>
              <div className="mt-3 text-2xl font-semibold text-slate-950">{example.expression}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Regla principal</div>
              <div className="mt-3 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">{example.rule}</div>
            </div>
          </div>

          {showStructure ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Estructura detectada</div>
              <div className="flex flex-wrap gap-2 text-sm">
                {example.structure.map((part, index) => (
                  <Chip key={index} tone={part.tone} active={step.highlight.includes(index)}>
                    {part.label}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Desarrollo paso a paso</div>
                <div className="font-mono text-xs text-slate-400">{stepIndex + 1}/{example.steps.length}</div>
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-950">{step.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">{step.detail}</div>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Derivada final</div>
              <div className="mt-4 text-xl font-semibold">{example.final}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:text-slate-950">
                Paso anterior
              </button>
              <button type="button" onClick={() => setStepIndex(Math.min(example.steps.length - 1, stepIndex + 1))} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                Siguiente paso
              </button>
              <button type="button" onClick={() => setStepIndex(0)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:text-slate-950">
                <RotateCcw className="h-3.5 w-3.5" />
                Reiniciar
              </button>
            </div>
            <button type="button" onClick={() => setShowStructure(!showStructure)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:text-slate-950">
              Mostrar estructura
            </button>
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Idea central</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Primero se lee la estructura. Después se elige la regla que corresponde a esa estructura.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          Las reglas de derivación funcionan como lentes: suma separa piezas, producto conserva ambos factores, cociente organiza numerador y denominador, y cadena revela capas.
        </div>
      </aside>
    </div>
  );
}

const errorCases: Record<
  ErrorKey,
  {
    label: string;
    title: string;
    expression: ReactNode;
    correct: ReactNode;
    wrong: ReactNode;
    correctValue: (x: number) => number;
    wrongValue: (x: number) => number;
    sample: number;
  }
> = {
  product: {
    label: "Producto",
    title: "El producto no se deriva multiplicando derivadas",
    expression: <span>f(x) = x<Sup>2</Sup><ExpX /></span>,
    correct: <span>2x<ExpX /> + x<Sup>2</Sup><ExpX /></span>,
    wrong: <span>2x<ExpX /></span>,
    correctValue: (x) => 2 * x * Math.exp(x) + x * x * Math.exp(x),
    wrongValue: (x) => 2 * x * Math.exp(x),
    sample: 1.5,
  },
  chain: {
    label: "Cadena",
    title: "La capa interior no desaparece",
    expression: <span>f(x) = sen(x<Sup>2</Sup>)</span>,
    correct: <span>2x cos(x<Sup>2</Sup>)</span>,
    wrong: <span>cos(x<Sup>2</Sup>)</span>,
    correctValue: (x) => 2 * x * Math.cos(x * x),
    wrongValue: (x) => Math.cos(x * x),
    sample: 1.2,
  },
  quotient: {
    label: "Cociente",
    title: "El cociente no se deriva dividiendo derivadas",
    expression: <span>f(x) = <Fraction top={<span>x<Sup>2</Sup> + 1</span>} bottom={<span>x + 1</span>} /></span>,
    correct: <span><Fraction top={<span>2x(x + 1) − (x<Sup>2</Sup> + 1)</span>} bottom={<span>(x + 1)<Sup>2</Sup></span>} /></span>,
    wrong: <span>2x</span>,
    correctValue: (x) => (2 * x * (x + 1) - (x * x + 1)) / ((x + 1) * (x + 1)),
    wrongValue: (x) => 2 * x,
    sample: 2,
  },
};

function ErrorComparatorTab() {
  const [errorKey, setErrorKey] = useState<ErrorKey>("product");
  const [showCorrect, setShowCorrect] = useState(true);
  const selected = errorCases[errorKey];
  const x = selected.sample;
  const correct = selected.correctValue(x);
  const wrong = selected.wrongValue(x);
  const max = Math.max(Math.abs(correct), Math.abs(wrong), 0.1);

  return (
    <div className="grid bg-[#f7f8f6] xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(errorCases) as ErrorKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setErrorKey(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                errorKey === key ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-950"
              }`}
            >
              {errorCases[key].label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Error común</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{selected.title}</h3>
              <div className="mt-3 text-xl font-semibold text-slate-800">{selected.expression}</div>
            </div>
            <button
              type="button"
              onClick={() => setShowCorrect(!showCorrect)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${showCorrect ? "bg-emerald-700 text-white" : "bg-amber-600 text-white"}`}
            >
              {showCorrect ? "Derivada correcta" : "Error común"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className={`rounded-2xl p-4 ring-1 transition ${showCorrect ? "bg-emerald-50 text-emerald-950 ring-emerald-200" : "bg-white text-slate-500 ring-slate-200"}`}>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-70">Derivada correcta</div>
              <div className="mt-3 text-lg font-semibold">{selected.correct}</div>
            </div>
            <div className={`rounded-2xl p-4 ring-1 transition ${!showCorrect ? "bg-amber-50 text-amber-950 ring-amber-200" : "bg-white text-slate-500 ring-slate-200"}`}>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-70">Error común</div>
              <div className="mt-3 text-lg font-semibold">{selected.wrong}</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Comparación en x = {x}</div>
              <div className="text-sm font-medium text-slate-500">≠</div>
            </div>
            {[
              ["correcta", correct, "bg-emerald-600"],
              ["error", wrong, "bg-amber-500"],
            ].map(([label, value, color]) => (
              <div key={label as string} className="mb-3 grid grid-cols-[78px_1fr_82px] items-center gap-3 text-sm text-slate-700">
                <span>{label}</span>
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.max(4, (Math.abs(value as number) / max) * 100)}%` }} />
                </div>
                <span className="text-right font-mono text-xs">{(value as number).toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-slate-200/70 bg-white/70 p-5 xl:border-l xl:border-t-0">
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Lectura</div>
          <p className="mt-2 text-sm leading-relaxed text-white/80">Si dos fórmulas dan valores distintos en el mismo punto, no pueden representar la misma derivada.</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-slate-600 shadow-sm">El error aparece cuando se ignora la estructura: producto, cociente y cadena conservan información que un atajo pierde.</div>
      </aside>
    </div>
  );
}

export function DerivativeRulesVisual({ title }: { title?: string }) {
  const [tab, setTab] = useState<MainTab>("builder");

  return (
    <VisualShell
      title={title ?? "Reglas de derivación"}
      subtitle="Construye derivadas leyendo la estructura de la función."
      className="border-slate-200 bg-white"
    >
      <div className="bg-[#f7f8f6]">
        <div className="flex gap-1 border-b border-slate-200/70 bg-white/70 p-2 text-sm font-medium">
          {[
            ["builder", "Constructor de reglas"],
            ["errors", "Comparador de errores"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as MainTab)}
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                tab === id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "builder" ? <RuleBuilderTab /> : <ErrorComparatorTab />}
      </div>
    </VisualShell>
  );
}
