import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { RichText } from "@/components/home/rich-text";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconLink } from "@/components/ui/icon-link";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pt-6 pb-8 sm:pt-16 sm:pb-12">
      <Container>
        <Reveal hold={false}>
          <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-6">
            <div data-intro-item="" style={step(0)} className="shrink-0">
              <Avatar src={site.photo?.src} alt={site.photo?.alt ?? site.shortName} monogram={site.mark} />
            </div>
            <div data-intro-item="" style={step(1)} className="shrink-0 space-y-2.5 sm:space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight whitespace-nowrap text-fg sm:text-name">
                {site.name}
              </h1>
              <div className="flex items-center gap-3">
                <IconLink kind="github" href={site.links.github} />
                <IconLink kind="linkedin" href={site.links.linkedin} />
                <IconLink kind="email" href={`mailto:${site.email}`} />
              </div>
            </div>
          </div>

          <p
            data-intro-item=""
            style={step(2)}
            className="mt-4 text-[1.7rem]/[2.125rem] font-light tracking-tight sm:text-headline"
          >
            <span className="text-fg">{site.headline.primary}</span>
            <span className="text-fg-secondary">
              <span className="hidden md:inline"> — </span>
              <span className="block md:inline">{site.headline.secondary}</span>
            </span>
          </p>

          {site.about ? (
            <p data-intro-item="" style={step(3)} className="mt-6 text-body-lg text-fg-secondary">
              <RichText text={site.about} />
            </p>
          ) : null}

          {site.researchInterests ? (
            <div data-intro-item="" style={step(4)} className="mt-6">
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
