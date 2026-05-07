import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { clerkAppearance } from "@/lib/clerkAppearance";

export const Route = createFileRoute("/login/$")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <SignIn
          appearance={clerkAppearance}
          routing="path"
          path="/login"
          signUpUrl="/register"
          forceRedirectUrl="/dashboard"
        />
      </main>
    </div>
  ),
});
