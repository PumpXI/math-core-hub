import { createFileRoute, Link } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { clerkAppearance } from "@/lib/clerkAppearance";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Crear cuenta — MathCore" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Crea tu cuenta</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Empieza gratis y aprende matemáticas universitarias
        </p>
        <SignUp
          appearance={clerkAppearance}
          routing="path"
          path="/register"
          signInUrl="/login"
          forceRedirectUrl="/dashboard"
        />
        <p className="mt-6 text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </main>
    </div>
  );
}
