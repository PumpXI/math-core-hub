import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/clerk-react";
import { CreditCard, LogOut, User } from "lucide-react";

export function AppNavbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const initials =
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "") || "U";
  const displayName = user?.firstName ?? user?.fullName ?? "Estudiante";

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo to="/dashboard" />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai-tutor" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">
            Tutor IA
          </Link>
          <span className="hidden sm:block text-sm text-muted-foreground">
            Hola, {displayName}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.imageUrl && <AvatarImage src={user.imageUrl} alt={displayName} />}
                  <AvatarFallback className="bg-grad-primary text-white text-xs">
                    {initials.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.fullName ?? displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/account" })}>
                <User className="mr-2 h-4 w-4" /> Mi cuenta
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/account" })}>
                <CreditCard className="mr-2 h-4 w-4" /> Mi suscripción
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut(() => navigate({ to: "/" }))}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
