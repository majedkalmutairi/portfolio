import { Container } from "@/components/layout/container";
import { RichText } from "@/components/home/rich-text";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconLink } from "@/components/ui/icon-link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

// The top of the homepage: who he is in three seconds.
// Photo beside the name (it stays beside it on phones, just smaller), the location line, the three
// icon links, then the two-tone headline and — once he has written it — the short bio.
export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pt-12 pb-8 sm:pt-20 sm:pb-12">
      <Container>
        <Reveal>
          <div className="flex items-center gap-5 sm:gap-8">
            <Avatar src={site.photo?.src} alt={site.photo?.alt ?? site.shortName} monogram={site.mark} />
            <div className="min-w-0 space-y-2">
              <h1 className="text-name text-fg">{site.name}</h1>
              <p className="text-body text-fg-muted">{site.locationLine}</p>
              <div className="-ml-1.5 flex items-center gap-1 pt-1">
                <IconLink kind="github" href={site.links.github} />
                <IconLink kind="linkedin" href={site.links.linkedin} />
                <IconLink kind="email" href={`mailto:${site.email}`} />
              </div>
            </div>
          </div>

          <p className="mt-10 text-headline sm:mt-12">
            <span className="text-fg">{site.headline.primary}</span>
            <span className="text-fg-secondary">
              <span className="hidden sm:inline"> — </span>
              <span className="block sm:inline">{site.headline.secondary}</span>
            </span>
          </p>

          {site.heroBio ? (
            <p className="mt-6 text-body-lg text-fg-secondary">
              <RichText text={site.heroBio} />
            </p>
          ) : null}

          {site.flags.showResume && site.resume ? (
            <Button href={site.resume} className="mt-8">
              View Resume
            </Button>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
