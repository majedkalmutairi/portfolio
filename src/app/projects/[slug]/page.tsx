import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/ui/reveal";
import { STATUS_LABEL } from "@/components/ui/status-pill";
import { TechPill } from "@/components/ui/tech-pill";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

const withPage = projects.filter((project) => project.caseStudy);

export function generateStaticParams() {
  return withPage.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = withPage.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${site.shortName}`,
    description: project.hook,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = withPage.find((p) => p.slug === slug);
  if (!project) notFound();
  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <Container className="pt-10 pb-24 sm:pt-14 sm:pb-32">
      <Reveal>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1 text-body text-fg-muted transition-colors duration-150 hover:text-fg"
        >
          <ChevronLeft
            className="size-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Projects
        </Link>

        <header className="mt-8">
          <MicroLabel mono>{STATUS_LABEL[project.status]}</MicroLabel>
          <h1 className="mt-3 text-headline text-fg">{project.name}</h1>
          {project.hook ? <p className="mt-4 text-body-lg text-fg-secondary">{project.hook}</p> : null}

          <dl className="mt-8 grid gap-3 border-y border-dashed border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-x-6">
            {project.role ? (
              <>
                <dt className="text-body text-fg-muted">My part</dt>
                <dd className="text-body text-fg">{project.role}</dd>
              </>
            ) : null}
            {project.tech.length ? (
              <>
                <dt className="text-body text-fg-muted sm:pt-1">Built with</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2" aria-label="Built with">
                    {project.tech.map((id) => (
                      <li key={id}>
                        <TechPill id={id} />
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            ) : null}
            {project.links.source ? (
              <>
                <dt className="text-body text-fg-muted">Code</dt>
                <dd className="text-body">
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg underline decoration-line underline-offset-4"
                  >
                    {project.links.source.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </>
            ) : null}
          </dl>
        </header>

        <article className="mt-10">
          <Body />
        </article>
      </Reveal>
    </Container>
  );
}
