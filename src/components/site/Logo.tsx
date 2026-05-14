import { Link } from "@tanstack/react-router";

type LogoProps = {
  to?: string;
  surface?: "light" | "dark";
  brandName?: string;
  showText?: boolean;
};

export function Logo({ to = "/", surface = "dark", brandName = "STEMLab", showText = true }: LogoProps) {
  const isDark = surface === "dark";
  const isKepler = brandName === "Kepler";

  return (
    <Link
      to={to}
      className="group flex items-center gap-2.5 font-semibold tracking-tight text-current"
      aria-label={`Inicio de ${brandName}`}
    >
      <span
        className={`relative grid h-8 w-8 place-items-center rounded-[8px] ${
          isDark ? "bg-white text-slate-950" : "bg-slate-950 text-white"
        }`}
      >
        <span
          aria-hidden="true"
          className="landing-logo-aura absolute inset-[-7px] rounded-full bg-[conic-gradient(from_120deg,rgba(34,211,238,0.45),rgba(168,85,247,0.34),rgba(250,204,21,0.36),rgba(16,185,129,0.34),rgba(34,211,238,0.45))] opacity-70 blur-md"
        />
        {isKepler ? (
          <svg viewBox="0 0 32 32" className="relative h-5 w-5" aria-hidden="true">
            <ellipse
              cx="16"
              cy="16"
              rx="11"
              ry="4.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <ellipse
              cx="16"
              cy="16"
              rx="11"
              ry="4.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              transform="rotate(60 16 16)"
            />
            <circle cx="16" cy="16" r="2.6" fill="currentColor" />
            <circle cx="25.7" cy="16" r="2" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" className="relative h-5 w-5" aria-hidden="true">
            <path
              d="M16 4.5 25.5 10v11L16 27.5 6.5 21V10L16 4.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 11.5 16 16l6.5-4.5M16 16v7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="2.4" fill="currentColor" />
          </svg>
        )}
      </span>
      {showText ? <span className="text-lg text-current">{brandName}</span> : null}
    </Link>
  );
}
