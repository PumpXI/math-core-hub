import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { getCourse, getCourseTopics, type Topic, type Module } from "@/lib/courses";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleCheck, CircleDot, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/course/$courseSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.name ?? "Curso"} — STEMLab` },
      { name: "description", content: loaderData?.course.description ?? "" },
    ],
  }),
  component: () => (<Protected><CoursePage /></Protected>),
});

const statusMap: Record<Topic["status"], { icon: React.ReactNode; label: string }> = {
  "completado": { icon: <CircleCheck className="h-4 w-4 text-green-600" />, label: "Completado" },
  "en-progreso": { icon: <CircleDot className="h-4 w-4 text-amber-500" />, label: "En progreso" },
  "sin-empezar": { icon: <Circle className="h-4 w-4 text-muted-foreground" />, label: "Sin empezar" },
};

function CoursePage() {
  const { course } = Route.useLoaderData();
  const topicCount = getCourseTopics(course).length;
  const accentBtn =
    course.slug === "precalculo"
      ? "bg-amber-500 hover:bg-amber-600 text-white"
      : "bg-[#15803D] hover:bg-[#166534] text-white";

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-8">
          <div className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> / <span>{course.name}</span>
          </div>
          <header className={`rounded-2xl p-6 md:p-8 border-l-4 ${course.color.soft} ${course.color.border}`}>
            <div className={`text-xs uppercase tracking-wider font-semibold ${course.color.text}`}>
              {course.code} · {course.short}
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{course.name}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">{course.description}</p>
            <div className="mt-5 max-w-md">
              <Progress value={course.progress} indicatorClassName={course.color.progress} />
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
                        {statusMap[t.status].icon}
                        <div>
                          <div className="font-medium">{t.title}</div>
                          <div className="text-xs text-muted-foreground">{t.description}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <span className="text-xs text-muted-foreground">Estado: {statusMap[t.status].label}</span>
                        <Button asChild size="sm" className={accentBtn}>
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
