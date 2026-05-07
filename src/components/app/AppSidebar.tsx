import { Link, useRouterState } from "@tanstack/react-router";
import { courses } from "@/lib/courses";
import { ChevronRight, CircleCheck, CircleDot, Circle } from "lucide-react";

const statusIcon = {
  "completado": <CircleCheck className="h-3.5 w-3.5 text-primary" />,
  "en-progreso": <CircleDot className="h-3.5 w-3.5 text-secondary" />,
  "sin-empezar": <Circle className="h-3.5 w-3.5 text-muted-foreground" />,
};

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r border-border/40 bg-sidebar/50 backdrop-blur">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground px-2">Mis cursos</div>
        {courses.map((c) => (
          <div key={c.slug}>
            <Link
              to="/course/$courseSlug"
              params={{ courseSlug: c.slug }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors ${path.includes(c.slug) ? "bg-accent" : ""}`}
            >
              {c.name}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <ul className="mt-1 ml-2 border-l border-border/60 pl-3 space-y-0.5">
              {c.topics.map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/course/$courseSlug/$topicSlug"
                    params={{ courseSlug: c.slug, topicSlug: t.slug }}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
    </aside>
  );
}
