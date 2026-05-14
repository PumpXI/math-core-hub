import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { getCourse, getCourseTopics } from "@/lib/courses";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContrastTextClass, getCourseAccentHex } from "@/lib/coursePalette";

export const Route = createFileRoute("/course/$courseSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    return { course, courseSlug: params.courseSlug };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course?.name ?? "Curso"} — Kepler` },
      { name: "description", content: loaderData?.course?.description ?? "Contenido en producción." },
    ],
  }),
  component: CourseLayout,
});

// Layout que decide si mostrar la página del curso o el tema hijo
function CourseLayout() {
  const matchRoute = useMatchRoute();
  const isTopicPage = matchRoute({ to: "/course/$courseSlug/$topicSlug" });

  // Si estamos en un tema hijo, renderizamos el Outlet directamente
  if (isTopicPage) return <Outlet />;

  // Si estamos en la página del curso, mostramos el listado
  return <CoursePage />;
}

function CoursePage() {
  const { course, courseSlug } = Route.useLoaderData() as { course?: import("@/lib/courses").Course; courseSlug: string };
  if (!course) {
    return (
      <div className="min-h-screen">
        <AppNavbar />
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8">
          <div className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> / <span>{courseSlug}</span>
          </div>
          <section className="mt-6 rounded-2xl border border-slate-950/10 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight">Contenido en producción</h1>
            <p className="mt-3 text-muted-foreground">
              Este curso todavía está en preparación académica. Pronto vas a poder acceder a sus temas.
            </p>
          </section>
        </div>
      </div>
    );
  }
  const topicCount = getCourseTopics(course).length;
  const accentHex = getCourseAccentHex(course.slug);
  const accentTextClass = getContrastTextClass(accentHex);

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto max-w-[1400px]">
        <main className="px-4 py-8 sm:px-8 space-y-8">
          <div className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> / <span>{course.name}</span>
          </div>
          <header
            className="rounded-2xl border-l-4 p-6 md:p-8"
            style={{ backgroundColor: `${accentHex}20`, borderLeftColor: accentHex }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              {course.code} · {course.short}
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{course.name}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">{course.description}</p>
            <div className="mt-5 max-w-md">
              <Progress
                value={course.progress}
                className="[--course-accent:theme(colors.slate.900)]"
                style={{ ["--course-accent" as string]: accentHex }}
                indicatorClassName="bg-[var(--course-accent)]"
              />
              <div className="mt-1 text-xs text-muted-foreground">{course.progress}% completado · {topicCount} temas</div>
            </div>
          </header>

          {course.modules.map((mod) => (
            <section key={mod.slug}>
              <h2 className="text-xl font-semibold mb-4">{mod.title}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {mod.topics.map((t, i) => (
                  <AccordionItem key={t.slug} value={t.slug} className="bg-card rounded-xl border border-border px-4 shadow-sm">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-xs text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <div className="font-medium">{t.title}</div>
                          <div className="text-xs text-muted-foreground">{t.description}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                          asChild
                          size="sm"
                          className={accentTextClass}
                          style={{ backgroundColor: accentHex }}
                        >
                          <Link to="/course/$courseSlug/$topicSlug" params={{ courseSlug: course.slug, topicSlug: t.slug }}>
                            Abrir tema <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
