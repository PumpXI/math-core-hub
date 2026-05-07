import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Protected } from "@/components/auth/Protected";
import { CreditCard, Mail, User as UserIcon, Calendar } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Mi cuenta — MathCore" }] }),
  component: () => (
    <Protected>
      <AccountPage />
    </Protected>
  ),
});

function AccountPage() {
  const { user } = useUser();

  // Placeholder subscription data
  const subscription = {
    active: true,
    plan: "Plus",
    renewDate: "15 de junio, 2026",
  };

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-8 py-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Mi cuenta</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu perfil y suscripción.</p>
        </header>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Información de tu cuenta MathCore</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {user?.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? "Avatar"}
                  className="h-16 w-16 rounded-full border border-border"
                />
              )}
              <div>
                <div className="flex items-center gap-2 text-foreground">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{user?.fullName ?? user?.firstName ?? "Usuario"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Suscripción</CardTitle>
              <CardDescription>Tu plan actual en MathCore</CardDescription>
            </div>
            <Badge variant={subscription.active ? "default" : "secondary"} className="bg-grad-primary text-white">
              {subscription.active ? "Activa" : "Inactiva"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border/60 p-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Plan</p>
                  <p className="font-medium">MathCore {subscription.plan}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Próxima renovación</p>
                  <p className="font-medium">{subscription.renewDate}</p>
                </div>
              </div>
            </div>
            <Button className="bg-grad-primary text-white">Gestionar suscripción</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
