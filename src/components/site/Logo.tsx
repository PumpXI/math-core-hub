import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-grad-primary glow">
        <FlaskConical className="h-4 w-4 text-white" />
      </span>
      <span className="text-lg">STEMLab</span>
    </Link>
  );
}
