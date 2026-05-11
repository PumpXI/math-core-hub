import { useEffect, useRef } from "react";
import Desmos from "desmos";
import { Sparkles } from "lucide-react";

export function TopicVisual({
  topicKey,
}: {
  topicKey: string;
}) {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!containerRef.current) return;

    const calculator = Desmos.GraphingCalculator(
      containerRef.current,
      {
        expressions: true,
        settingsMenu: false,
        zoomButtons: true,
      }
    );

    // =====================================================
    // NÚMEROS REALES
    // =====================================================

    if (topicKey === "precalculo:numeros-reales") {

      calculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -5,
        top: 5,
      });

      calculator.setExpressions([

        {
          id: "title",
          latex: "y=0",
          color: "#15803D",
        },

        {
          id: "point",
          latex: "(a,0)",
          sliderBounds: {
            min: -10,
            max: 10,
            step: 0.1,
          },
        },

        {
          id: "label",
          latex:
            "a=",
        },

      ]);
    }

    // =====================================================
    // LÍMITES
    // =====================================================

    if (topicKey === "calculo-1:limites-intuitivo") {

      calculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -3,
        top: 3,
      });

      calculator.setExpressions([

        {
          id: "func",
          latex: "y=\\frac{\\sin(x)}{x}",
          color: "#15803D",
        },

        {
          id: "hole",
          latex: "(0,1)",
          color: "#dc2626",
        },

        {
          id: "limitText",
          latex: "y=1",
          color: "#f59e0b",
          lineStyle: Desmos.Styles.DASHED,
        },

      ]);
    }

    return () => {
      calculator.destroy();
    };

  }, [topicKey]);

  const supported =
    topicKey === "precalculo:numeros-reales" ||
    topicKey === "calculo-1:limites-intuitivo";

  if (!supported) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
        <Sparkles className="mx-auto h-5 w-5 mb-2 text-[#15803D]" />
        Visualización interactiva próximamente disponible.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">

      <div className="flex items-center gap-2 px-4 py-3 border-b border-border text-sm font-semibold">
        <Sparkles className="h-4 w-4 text-[#15803D]" />
        Visualización interactiva
      </div>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "550px",
        }}
      />
    </div>
  );
}