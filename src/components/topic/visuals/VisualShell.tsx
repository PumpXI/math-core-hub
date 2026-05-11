import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type VisualShellProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function VisualShell({
  title = "Visualizacion interactiva",
  subtitle,
  children,
  className,
}: VisualShellProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-sm glow",
        className,
      )}
    >
      <div className="flex flex-col gap-2 border-b border-border/70 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#15803D] text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
            {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>
      </div>
      <div className="bg-background">{children}</div>
    </section>
  );
}
