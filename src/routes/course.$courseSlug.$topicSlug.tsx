import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppNavbar } from "@/components/app/AppNavbar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { getCourse, getTopic } from "@/lib/courses";
import { getTopicContent } from "@/lib/topicContent";
import { TopicBody } from "@/components/topic/TopicBody";
import { Protected } from "@/components/auth/Protected";

export const Route = createFileRoute("/course/$courseSlug/$topicSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    const topic = getTopic(params.courseSlug, params.topicSlug);

    if (!course || !topic) throw notFound();

    return { course, topic };
  },

  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Tema"} — STEMLab` },
      {
        name: "description",
        content: loaderData?.topic.description ?? "",
      },
    ],
  }),

  component: () => (
    <Protected>
      <TopicPage />
    </Protected>
  ),
});

function TopicPage() {
  const { course, topic } = Route.useLoaderData() as {
    course: import("@/lib/courses").Course;
    topic: import("@/lib/courses").Topic;
  };

  const content = getTopicContent(course.slug, topic.slug);

  const accent =
    course.slug === "precalculo"
      ? "data-[state=active]:bg-amber-500 data-[state=active]:text-white"
      : "data-[state=active]:bg-[#15803D] data-[state=active]:text-white";

  return (
    <div className="min-h-screen">
      <AppNavbar />

      <div className="mx-auto flex max-w-[1400px]">
        <AppSidebar />

        <main className="flex-1 px-4 sm:px-8 py-8 space-y-6">
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
          />
        </main>
      </div>
    </div>
  );
}