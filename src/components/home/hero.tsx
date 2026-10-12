import { Container } from "@/components/layout/container";
import { RichText } from "@/components/home/rich-text";
import { Salam } from "@/components/home/salam";
import { amiri } from "@/components/home/salam-fonts/amiri";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconLink } from "@/components/ui/icon-link";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pt-6 pb-8 sm:pt-16 sm:pb-12">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-6">
            <Avatar src={site.photo?.src} alt={site.photo?.alt ?? site.shortName} monogram={site.mark} />
            <div className="shrink-0 space-y-2.5 sm:space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight whitespace-nowrap text-fg sm:text-name">
                {site.name}
              </h1>
              <div className="flex items-center gap-3">
                <IconLink kind="github" href={site.links.github} />
                <IconLink kind="linkedin" href={site.links.linkedin} />
                <IconLink kind="email" href={`mailto:${site.email}`} />
              </div>
            </div>
            <div className="flex basis-full justify-end sm:ml-auto sm:min-w-0 sm:basis-auto">
              <Salam font={amiri} id="hero-salam" className="h-14 max-w-full sm:h-24" />
            </div>
          </div>

          <p className="mt-4 text-[1.7rem]/[2.125rem] font-light tracking-tight sm:text-headline">
            <span className="text-fg">{site.headline.primary}</span>
            <span className="text-fg-secondary">
              <span className="hidden sm:inline"> — </span>
              <span className="block sm:inline">{site.headline.secondary}</span>
            </span>
          </p>

          {site.about ? (
            <p className="mt-6 text-body-lg text-fg-secondary">
              <RichText text={site.about} />
            </p>
          ) : null}

          {site.researchInterests ? (
            <div className="mt-6">
              <MicroLabel>Research interests</MicroLabel>
              <p className="mt-2 text-body-lg text-fg">{site.researchInterests}</p>
            </div>
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
