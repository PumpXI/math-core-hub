import { createFileRoute, Link } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses, getCourseTopics } from "@/lib/courses";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — STEMLab" }, { name: "description", content: "Tu panel de aprendizaje en STEMLab." }] }),
  component: () => (<Protected><Dashboard /></Protected>),
});

function Dashboard() {
  // Obtenemos el usuario actual desde Clerk
  const { user } = useUser();
  const nombre = user?.firstName ?? user?.username ?? "estudiante";

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-10">
          <section>
            <h1 className="text-3xl font-bold tracking-tight">Hola, {nombre} 👋</h1>
            <p className="text-muted-foreground mt-1">Sigamos aprendiendo donde lo dejaste.</p>
          </section>

          <section>
            <Card className="border-l-4 border-l-green-600 shadow-sm">
              <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 p-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-green-700 font-semibold">Continuar donde lo dejé</div>
                  <h3 className="mt-1 text-xl font-semibold">Cálculo 1 · Concepto intuitivo de límite</h3>
                  <p className="text-sm text-muted-foreground mt-1">Estabas explorando límites laterales y notación.</p>
                  <div className="mt-3 max-w-md">
                    <Progress value={45} indicatorClassName="bg-green-600" />
                    <div className="mt-1 text-xs text-muted-foreground">45% completado</div>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-[#15803D] hover:bg-[#166534] text-white">
                  <Link to="/course/$courseSlug/$topicSlug" params={{ courseSlug: "calculo-1", topicSlug: "limites-intuitivo" }}>
                    <PlayCircle className="mr-2 h-4 w-4" /> Continuar
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Mis cursos</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {courses.map((c) => {
                const topicCount = getCourseTopics(c).length;
                return (
                  <Card key={c.slug} className={`border-t-4 shadow-sm hover:shadow-md transition-shadow ${c.slug === "precalculo" ? "border-t-amber-500" : "border-t-green-600"}`}>
                    <CardHeader>
                      <div className={`text-xs uppercase tracking-wider font-semibold ${c.color.text}`}>
                        {c.code} · {c.short}
                      </div>
                      <CardTitle className="mt-1">{c.name}</CardTitle>
                      <CardDescription>{c.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Progress value={c.progress} indicatorClassName={c.color.progress} />
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>{c.progress}% completado</span>
                          <span>{topicCount} temas</span>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/course/$courseSlug" params={{ courseSlug: c.slug }}>
                          Ir al curso <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
