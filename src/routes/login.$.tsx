import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login/$")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <Button asChild>
          <Link to="/dashboard">Entrar a STEMLab</Link>
        </Button>
      </main>
    </div>
  ),
});
