import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { clerkAppearance } from "@/lib/clerkAppearance";

export const Route = createFileRoute("/register/$")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <SignUp
          appearance={clerkAppearance}
          routing="path"
          path="/register"
          signInUrl="/login"
          forceRedirectUrl="/dashboard"
        />
      </main>
    </div>
  ),
});
