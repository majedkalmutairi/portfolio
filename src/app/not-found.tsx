import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found — ${site.shortName}`,
};

export default function NotFound() {
  const linkClass = "text-body text-fg-muted transition-colors duration-150 hover:text-fg";

  return (
    <Container className="flex flex-col items-start pt-20 pb-28 sm:pt-28">
      <p
        aria-hidden="true"
        className="text-[6rem] leading-none font-extralight tracking-tighter text-fg-muted sm:text-[8rem]"
      >
        404
      </p>
      <h1 className="mt-6 text-section text-fg">Page not found</h1>
      {site.notFoundLine ? (
        <p className="mt-3 max-w-xl text-body-lg text-fg-secondary">{site.notFoundLine}</p>
      ) : null}
      <Button href="/" className="mt-10">
        Back home
      </Button>
      <nav aria-label="Elsewhere" className="mt-14 flex items-center gap-5">
        <Link href="/#projects" className={linkClass}>
          Projects
        </Link>
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          LinkedIn ↗
        </a>
        {site.flags.showResume && site.resume ? (
          <a href={site.resume} className={linkClass}>
            Resume
          </a>
        ) : null}
      </nav>
    </Container>
  );
}
