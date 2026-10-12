import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/home/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projects — ${site.shortName}`,
};

export default function ProjectsPage() {
  return (
    <Container className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Reveal>
        <h1 className="text-section text-fg">Projects</h1>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} variant="grid" />
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
