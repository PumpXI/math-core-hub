import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { courses, type Topic } from "@/lib/courses";
import { ChevronRight, CircleCheck, CircleDot, Circle } from "lucide-react";

const statusIcon: Record<Topic["status"], ReactNode> = {
  "completado": <CircleCheck className="h-3.5 w-3.5 text-green-600" />,
  "en-progreso": <CircleDot className="h-3.5 w-3.5 text-amber-500" />,
  "sin-empezar": <Circle className="h-3.5 w-3.5 text-muted-foreground" />,
};

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r border-border bg-sidebar">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground px-2">Mis cursos</div>
        {courses.map((c) => (
          <div key={c.slug}>
            <Link
              to="/course/$courseSlug"
              params={{ courseSlug: c.slug }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors ${path.includes(c.slug) ? "bg-accent" : ""}`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color.hex }} />
                {c.name}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div className="mt-1 ml-2 border-l border-border pl-3 space-y-3">
              {c.modules.map((m) => (
                <div key={m.slug}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-1">
                    {m.title}
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {m.topics.map((t) => (
                      <li key={t.slug}>
                        <Link
                          to="/course/$courseSlug/$topicSlug"
                          params={{ courseSlug: c.slug, topicSlug: t.slug }}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60"
                        >
                          {statusIcon[t.status]}
                          <span className="truncate">{t.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
