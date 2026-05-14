import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { getCourse, getTopic } from "@/lib/courses";
import { getTopicContent } from "@/lib/topicContent";
import { TopicBody } from "@/components/topic/TopicBody";
import { getContrastTextClass, getCourseAccentHex } from "@/lib/coursePalette";

export const Route = createFileRoute("/course/$courseSlug/$topicSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    const topic = getTopic(params.courseSlug, params.topicSlug);
    return { course, topic, courseSlug: params.courseSlug, topicSlug: params.topicSlug };
  },

  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Tema"} — Kepler` },
      {
        name: "description",
        content: loaderData?.topic?.description ?? "Contenido en producción.",
      },
    ],
  }),

  component: TopicPage,
});

function TopicPage() {
  const { course, topic, courseSlug, topicSlug } = Route.useLoaderData() as {
    course?: import("@/lib/courses").Course;
    topic?: import("@/lib/courses").Topic;
    courseSlug: string;
    topicSlug: string;
  };

  if (!course || !topic) {
    return (
      <div className="min-h-screen">
        <AppNavbar />
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8">
          <nav className="text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            {" / "}
            <Link to="/course/$courseSlug" params={{ courseSlug }} className="hover:text-foreground">
              {courseSlug}
            </Link>
            {" / "}
            <span className="text-foreground">{topicSlug}</span>
          </nav>
          <section className="mt-6 rounded-2xl border border-slate-950/10 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight">Contenido en producción</h1>
            <p className="mt-3 text-muted-foreground">
              Este tema todavía no está publicado. Pronto vas a poder estudiarlo desde aquí.
            </p>
          </section>
        </div>
      </div>
    );
  }

  const content = getTopicContent(course.slug, topic.slug);
  const accentHex = getCourseAccentHex(course.slug);
  const accentTextClass = getContrastTextClass(accentHex);
  const accent = `data-[state=active]:bg-[var(--course-accent)] data-[state=active]:${accentTextClass}`;

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="mx-auto max-w-[1400px]">
        <main className="px-4 py-8 sm:px-8 space-y-6">
          <nav className="text-xs text-muted-foreground">
            <Link
              to="/dashboard"
              className="hover:text-foreground"
            >
              Dashboard
            </Link>

            {" / "}

            <Link
              to="/course/$courseSlug"
              params={{ courseSlug: course.slug }}
              className="hover:text-foreground"
            >
              {course.name}
            </Link>

            {" / "}

            <span className="text-foreground">
              {topic.title}
            </span>
          </nav>

          <header>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {topic.title}
            </h1>

            <p className="mt-2 text-muted-foreground">
              {topic.description}
            </p>
          </header>

          <TopicBody
            courseSlug={course.slug}
            topicSlug={topic.slug}
            topicTitle={topic.title}
            topicDescription={topic.description}
            content={content}
            accent={accent}
            accentStyle={{ ["--course-accent" as string]: accentHex }}
          />
        </main>
      </div>
    </div>
  );
}
