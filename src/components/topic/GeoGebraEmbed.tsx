import { ExternalLink, Sparkles } from "lucide-react";

/**
 * Embed de GeoGebra usando applets públicos de geogebra.org/m/<materialId>.
 * Si materialId no se proporciona, muestra un fallback elegante.
 */
export function GeoGebraEmbed({
  materialId,
  title,
  height = 480,
}: {
  materialId?: string;
  title: string;
  height?: number;
}) {
  if (!materialId) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
        <Sparkles className="mx-auto h-5 w-5 mb-2 text-[#15803D]" />
        Visualización interactiva — próximamente disponible para este tema.
      </div>
    );
  }

  const src = `https://www.geogebra.org/material/iframe/id/${materialId}/width/800/height/${height}/border/e2e8f0/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false`;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-[#15803D]" />
          Visualización · {title}
        </div>
        <a
          href={`https://www.geogebra.org/m/${materialId}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          Abrir en GeoGebra <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <iframe
        src={src}
        title={`GeoGebra: ${title}`}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
