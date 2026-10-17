import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashedCard } from "@/components/ui/dashed-card";
import { LoopVideo } from "@/components/ui/loop-video";
import { MicroLabel } from "@/components/ui/micro-label";
import { StatusPill } from "@/components/ui/status-pill";
import { TechLogo, TechPill } from "@/components/ui/tech-pill";
import type { Project } from "@/content/projects";
import { tech } from "@/content/tech";
import { cx } from "@/lib/cx";

type Variant = "featured" | "grid";

const highlight = (status: Project["status"]) => status === "active" || status === "in-progress";

type CardProps = { project: Project; href?: string; className?: string };

export function ProjectCard({
  project,
  variant,
  className,
}: {
  project: Project;
  variant: Variant;
  className?: string;
}) {
  const href = project.caseStudy ? `/projects/${project.slug}` : undefined;
  return variant === "featured" ? (
    <Featured project={project} href={href} className={className} />
  ) : (
    <Grid project={project} href={href} className={className} />
  );
}

function Featured({ project, href, className }: CardProps) {
  const { image } = project;
  return (
    <DashedCard
      className={cx(
        "overflow-hidden transition-colors duration-150 hover:bg-hover",
        image && "sm:grid sm:grid-cols-[45%_1fr]",
        className,
      )}
    >
      {image ? (
        <div className="relative aspect-4/3 border-b border-dashed border-line bg-surface sm:aspect-auto sm:min-h-75 sm:border-r sm:border-b-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 330px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col p-6 sm:p-8">
        <MicroLabel>Featured project</MicroLabel>
        <h3 className="mt-3 flex flex-wrap items-center gap-2 text-title text-fg">
          {project.name}
          {highlight(project.status) ? <StatusPill status={project.status} /> : null}
        </h3>
        {project.hook ? <p className="mt-2 text-body text-fg-secondary">{project.hook}</p> : null}
        {project.role ? <p className="mt-2 text-body text-fg-muted">{project.role}</p> : null}
        {project.tech.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
            {project.tech.map((id) => (
              <li key={id}>
                <TechPill id={id} />
              </li>
            ))}
          </ul>
        ) : null}
        {href || project.links.source ? (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {href ? <Button href={href}>View project</Button> : null}
            {project.links.source ? <SourceLink href={project.links.source} /> : null}
          </div>
        ) : null}
      </div>
    </DashedCard>
  );
}

function Grid({ project, href, className }: CardProps) {
  const { image, screens, video } = project;
  const pictured = Boolean(video || image || screens?.length);
  return (
    <DashedCard
      className={cx(
        "relative flex h-full flex-col p-4 transition-colors duration-150 has-[a:focus-visible]:bg-hover has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-fg hover:bg-hover sm:p-5",
        className,
      )}
    >
      {video ? (
        <div className="relative z-10 aspect-16/10 overflow-hidden rounded-md border border-line bg-surface">
          <LoopVideo src={video.src} poster={video.poster} label={video.alt} />
        </div>
      ) : image ? (
        <div className="relative aspect-16/10 overflow-hidden rounded-md border border-line bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 350px, 100vw"
            className="object-cover"
          />
        </div>
      ) : screens?.length ? (
        <div className="flex aspect-16/10 items-center justify-center gap-3 overflow-hidden rounded-md border border-line bg-surface">
          {screens.map((screen) => (
            <div
              key={screen.src}
              className="relative aspect-1290/2547 h-5/6 overflow-hidden rounded-sm border border-line"
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                sizes="120px"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      ) : null}
      <h3
        className={cx(
          "flex flex-wrap items-center gap-2 text-[17px] font-semibold tracking-tight text-fg",
          pictured && "mt-5",
        )}
      >
        {href ? (
          <Link href={href} className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-lg">
            {project.name}
          </Link>
        ) : (
          project.name
        )}
        {highlight(project.status) ? <StatusPill status={project.status} /> : null}
      </h3>
      {project.role ? <p className="mt-1 text-body font-medium text-fg-secondary">{project.role}</p> : null}
      {project.hook ? <p className="mt-2 text-body font-light text-fg-secondary">{project.hook}</p> : null}
      {project.tech.length ? (
        <ul className="mt-4 flex items-center gap-3" aria-label="Built with">
          {project.tech.map((id) => (
            <li key={id} className="flex">
              <TechLogo id={id} />
              <span className="sr-only">{tech[id].name}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {href || project.links.source ? (
        <div className="mt-5 flex items-center justify-end gap-5 border-t border-line pt-4">
          {project.links.source ? <SourceLink href={project.links.source} /> : null}
          {href ? (
            <MicroLabel mono className="text-fg-secondary">
              View project ›
            </MicroLabel>
          ) : null}
        </div>
      ) : null}
    </DashedCard>
  );
}

function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-micro font-normal tracking-mono-label text-fg-secondary uppercase transition-colors duration-150 hover:text-fg"
    >
      Source ↗
    </a>
  );
}
