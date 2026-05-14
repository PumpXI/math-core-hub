import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesion - STEMLab" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenido de vuelta</h1>
        <p className="text-muted-foreground mb-8 text-center">
          El acceso esta abierto temporalmente para desarrollo local.
        </p>
        <Button asChild>
          <Link to="/dashboard">Entrar a STEMLab</Link>
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">
          Sin autenticacion durante la fase actual de UX/Product.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </p>
      </main>
    </div>
  );
}
