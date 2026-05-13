import { Sparkles } from "lucide-react";
import { AdvancedDifferentiationVisual } from "./AdvancedDifferentiationVisual";
import { AlgebraicTechniquesVisual } from "./AlgebraicTechniquesVisual";
import { AsymptoticInfinityVisual } from "./AsymptoticInfinityVisual";
import { DerivativeRulesVisual } from "./DerivativeRulesVisual";
import { DerivativeTangentVisual } from "./DerivativeTangentVisual";
import { FunctionAnalysisDerivativesVisual } from "./FunctionAnalysisDerivativesVisual";
import { IntegrationFoundationsVisual } from "./IntegrationFoundationsVisual";
import { LHopitalClearVisual } from "./LHopitalClearVisual";
import { LimitsVisual } from "./LimitsVisual";
import { OptimizationRelatedRatesVisual } from "./OptimizationRelatedRatesVisual";
import { RealNumbersVisual } from "./RealNumbersVisual";
import { TrigonometricLimitsRefinedVisual } from "./TrigonometricLimitsRefinedVisual";

type TopicVisualProps = {
  topicKey: string;
  title?: string;
};

export function TopicVisual({ topicKey, title }: TopicVisualProps) {
  switch (topicKey) {
    case "precalculo:numeros-reales":
      return <RealNumbersVisual title={title} />;
    case "calculo-1:limites-continuidad":
      return <LimitsVisual title={title} />;
    case "calculo-1:tecnicas-algebraicas-limites":
      return <AlgebraicTechniquesVisual title={title} />;
    case "calculo-1:limites-trigonometricos-indeterminaciones":
      return <TrigonometricLimitsRefinedVisual title={title} />;
    case "calculo-1:limites-infinito-comportamiento-asintotico":
      return <AsymptoticInfinityVisual title={title} />;
    case "calculo-1:derivada-recta-tangente":
      return <DerivativeTangentVisual title={title} />;
    case "calculo-1:reglas-derivacion":
      return <DerivativeRulesVisual title={title} />;
    case "calculo-1:tecnicas-avanzadas-derivacion":
      return <AdvancedDifferentiationVisual title={title} />;
    case "calculo-1:optimizacion-razones-cambio":
      return <OptimizationRelatedRatesVisual title={title} />;
    case "calculo-1:analisis-funciones-derivadas":
      return <FunctionAnalysisDerivativesVisual title={title} />;
    case "calculo-1:regla-lhopital":
      return <LHopitalClearVisual title={title} />;
    case "calculo-1:fundamentos-integracion":
      return <IntegrationFoundationsVisual title={title} />;
    default:
      return (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-[#15803D]" />
          Visualizacion interactiva proximamente disponible.
        </div>
      );
  }
}
