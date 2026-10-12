import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DashedCard } from "@/components/ui/dashed-card";
import { MicroLabel } from "@/components/ui/micro-label";
import { STATUS_LABEL } from "@/components/ui/status-pill";
import { TechPill } from "@/components/ui/tech-pill";
import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";

// One project on the homepage, built entirely from its entry in projects.ts.
// The featured project puts its image full-width on top; the others put it on the left (~45%).
// On phones every card is image-over-text. A project with no image yet is simply a text card.
// "Read case study" appears once the case study is written; "Source" only where code is public.
export function ProjectCard({ project }: { project: Project }) {
  const { image, featured } = project;
  const sideBySide = Boolean(image) && !featured;

  return (
    <DashedCard className={cx("p-4 sm:p-5", sideBySide && "sm:grid sm:grid-cols-[45%_1fr] sm:gap-6")}>
      {image ? (
        <div
          className={cx(
            "relative overflow-hidden rounded-md border border-line bg-surface",
            featured ? "aspect-[16/9]" : "aspect-[4/3] sm:aspect-auto sm:min-h-full",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={featured ? "(min-width: 768px) 728px, 100vw" : "(min-width: 768px) 330px, 100vw"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div
        className={cx(
          "flex flex-col",
          image && (sideBySide ? "mt-5 sm:mt-0 sm:py-1" : "mt-5"),
          !image && "sm:p-1",
        )}
      >
        <MicroLabel>{STATUS_LABEL[project.status]}</MicroLabel>
        <h3 className="mt-2 text-title text-fg">{project.name}</h3>
        {project.hook ? <p className="mt-2 text-body text-fg-secondary">{project.hook}</p> : null}
        {project.summary ? <p className="mt-3 text-body text-fg-secondary">{project.summary}</p> : null}
        {project.role ? (
          <p className="mt-3 text-body text-fg-muted">
            Role: <span className="text-fg-secondary">{project.role}</span>
          </p>
        ) : null}

        {project.tech.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
            {project.tech.map((id) => (
              <li key={id}>
                <TechPill id={id} />
              </li>
            ))}
          </ul>
        ) : null}

        {project.caseStudy || project.links.source ? (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.caseStudy ? <Button href={`/work/${project.slug}`}>Read case study</Button> : null}
            {project.links.source ? (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-micro font-normal tracking-mono-label text-fg-secondary uppercase transition-colors duration-150 hover:text-fg"
              >
                Source ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </DashedCard>
  );
}
