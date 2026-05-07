import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MathCore" }, { name: "description", content: "Tu panel de aprendizaje en MathCore." }] }),
  component: () => (<Protected><Dashboard /></Protected>),
});

function Dashboard() {
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-10">
          <section>
            <h1 className="text-3xl font-bold tracking-tight">Hola, María 👋</h1>
            <p className="text-muted-foreground mt-1">Sigamos aprendiendo donde lo dejaste.</p>
          </section>

          <section>
            <Card className="glass border-primary/40 overflow-hidden">
              <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 p-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-primary">Continuar donde lo dejé</div>
                  <h3 className="mt-1 text-xl font-semibold">Cálculo 1 · Límites y continuidad</h3>
                  <p className="text-sm text-muted-foreground mt-1">Estabas resolviendo límites por sustitución directa.</p>
                  <div className="mt-3 max-w-md">
                    <Progress value={45} />
                    <div className="mt-1 text-xs text-muted-foreground">45% completado</div>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-grad-primary text-white hover:opacity-90">
                  <Link to="/course/$courseSlug/$topicSlug" params={{ courseSlug: "calculo-1", topicSlug: "limites" }}>
                    <PlayCircle className="mr-2 h-4 w-4" /> Continuar
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Mis cursos</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((c) => (
                <Card key={c.slug} className="glass hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="text-xs uppercase tracking-wider text-primary">{c.short}</div>
                    <CardTitle className="mt-1">{c.name}</CardTitle>
                    <CardDescription>{c.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Progress value={c.progress} />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{c.progress}% completado</span>
                        <span>{c.topics.length} temas</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/course/$courseSlug" params={{ courseSlug: c.slug }}>
                        Ir al curso <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
