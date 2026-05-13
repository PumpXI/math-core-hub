import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-semibold tracking-tight text-current">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_28px_rgba(34,211,238,0.22)]">
        <FlaskConical className="h-4 w-4 text-white" />
      </span>
      <span className="text-lg">STEMLab</span>
    </Link>
  );
}
