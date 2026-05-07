import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { getCourse, type Topic } from "@/lib/courses";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleCheck, CircleDot, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/course/$courseSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.name ?? "Curso"} — MathCore` },
      { name: "description", content: loaderData?.course.description ?? "" },
    ],
  }),
  component: CoursePage,
});

const statusMap = {
  "completado": { icon: <CircleCheck className="h-4 w-4 text-primary" />, label: "Completado" },
  "en-progreso": { icon: <CircleDot className="h-4 w-4 text-secondary" />, label: "En progreso" },
  "sin-empezar": { icon: <Circle className="h-4 w-4 text-muted-foreground" />, label: "Sin empezar" },
};

function CoursePage() {
  const { course } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-8">
          <div className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> / <span>{course.name}</span>
          </div>
          <header className="glass rounded-2xl p-6 md:p-8">
            <div className="text-xs uppercase tracking-wider text-primary">{course.short}</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{course.name}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">{course.description}</p>
            <div className="mt-5 max-w-md">
              <Progress value={course.progress} />
              <div className="mt-1 text-xs text-muted-foreground">{course.progress}% completado · {course.topics.length} temas</div>
            </div>
          </header>

          <section>
            <h2 className="text-xl font-semibold mb-4">Temario</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {course.topics.map((t: Topic, i: number) => (
                <AccordionItem key={t.slug} value={t.slug} className="glass rounded-xl border border-border/60 px-4">
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
                      <Button asChild size="sm" className="bg-grad-primary text-white hover:opacity-90">
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
        </main>
      </div>
    </div>
  );
}
