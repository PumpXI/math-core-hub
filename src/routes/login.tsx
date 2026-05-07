import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { clerkAppearance } from "@/lib/clerkAppearance";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — MathCore" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenido de vuelta</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Continúa tu aprendizaje en MathCore
        </p>
        <SignIn
          appearance={clerkAppearance}
          routing="path"
          path="/login"
          signUpUrl="/register"
          forceRedirectUrl="/dashboard"
        />
        <p className="mt-6 text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </main>
    </div>
  );
}
