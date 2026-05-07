import { Link } from "@tanstack/react-router";
import { Sigma } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-grad-primary glow">
        <Sigma className="h-4 w-4 text-white" />
      </span>
      <span className="text-lg">MathCore</span>
    </Link>
  );
}
