const COURSE_ACCENT_BY_SLUG: Record<string, string> = {
  precalculo: "#EDE9FE",
  "calculo-1": "#D9D1FB",
  "calculo-ii": "#B8A8F3",
  "calculo-iii": "#8E79E5",
  "algebra-lineal": "#6D5BD0",
  "ecuaciones-diferenciales": "#4B36B5",
  "fisica-i": "#F5C4B3",
  "fisica-ii": "#D85A30",
  "fisica-iii": "#993C1D",
  "quimica-general-i": "#9FE1CB",
  "quimica-general-ii": "#1D9E75",
  "quimica-intensiva": "#0F6E56",
};

export function getCourseAccentHex(courseSlug: string) {
  return COURSE_ACCENT_BY_SLUG[courseSlug] ?? "#CECBF6";
}

export function getContrastTextClass(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((ch) => ch + ch).join("") : clean;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "text-slate-900" : "text-white";
}
