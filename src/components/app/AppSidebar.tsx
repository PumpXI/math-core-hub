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
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#070a15] text-white lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-6">
        <div className="px-2 text-xs uppercase tracking-[0.24em] text-slate-500">Mis cursos</div>
        {courses.map((c) => (
          <div key={c.slug}>
            <Link
              to="/course/$courseSlug"
              params={{ courseSlug: c.slug }}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${path.includes(c.slug) ? "bg-white/10 text-cyan-100" : "text-slate-300"}`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color.hex }} />
                {c.name}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </Link>
            <div className="mt-1 ml-2 space-y-3 border-l border-white/10 pl-3">
              {c.modules.map((m) => (
                <div key={m.slug}>
                  <div className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {m.title}
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {m.topics.map((t) => (
                      <li key={t.slug}>
                        <Link
                          to="/course/$courseSlug/$topicSlug"
                          params={{ courseSlug: c.slug, topicSlug: t.slug }}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
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
