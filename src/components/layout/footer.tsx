import { Fragment } from "react";
import { Container } from "@/components/layout/container";
import { IconLink } from "@/components/ui/icon-link";
import { site } from "@/content/site";

// The sign-off under every page: a dashed rule, then "name / status / location" on the left
// and the three icon links on the right. A part with no text yet (status) is simply left out.
export function Footer() {
  const parts = [site.status, site.location].filter(Boolean);

  return (
    <footer>
      <Container>
        <div className="flex flex-col items-center gap-5 border-t border-dashed border-line-strong pt-6 pb-10 sm:flex-row sm:justify-between sm:pt-8 sm:pb-16">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-fg-secondary sm:justify-start">
            <span className="text-fg">{site.name}</span>
            {parts.map((part) => (
              <Fragment key={part}>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span>{part}</span>
              </Fragment>
            ))}
          </p>
          <div className="flex items-center gap-1">
            <IconLink kind="github" href={site.links.github} />
            <IconLink kind="linkedin" href={site.links.linkedin} />
            <IconLink kind="email" href={`mailto:${site.email}`} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
