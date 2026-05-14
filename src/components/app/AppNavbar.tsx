import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";

export function AppNavbar() {
  const navigate = useNavigate();

  const initials = "E";
  const displayName = "Estudiante";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-950/10 bg-[#f8f7f4]/95 text-slate-900 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo to="/dashboard" surface="light" brandName="Kepler" />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai-tutor" className="hidden text-sm text-slate-600 transition-colors hover:text-slate-900 sm:inline">
            Tutor IA
          </Link>
          <span className="hidden text-sm text-slate-600 sm:block">
            Hola, {displayName}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-grad-primary text-white text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    Acceso local de desarrollo
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
                onClick={() => navigate({ to: "/" })}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Volver al inicio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
