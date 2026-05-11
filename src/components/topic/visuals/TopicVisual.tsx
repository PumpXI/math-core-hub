import { Sparkles } from "lucide-react";
import { LimitsVisual } from "./LimitsVisual";
import { RealNumbersVisual } from "./RealNumbersVisual";

type TopicVisualProps = {
  topicKey: string;
  title?: string;
};

export function TopicVisual({ topicKey, title }: TopicVisualProps) {
  switch (topicKey) {
    case "precalculo:numeros-reales":
      return <RealNumbersVisual title={title} />;
    case "calculo-1:limites-intuitivo":
      return <LimitsVisual title={title} />;
    default:
      return (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-[#15803D]" />
          Visualizacion interactiva proximamente disponible.
        </div>
      );
  }
}
