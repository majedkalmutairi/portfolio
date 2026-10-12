import { Container } from "@/components/layout/container";
import { Salam } from "@/components/home/salam";
import { amiri } from "@/components/home/salam-fonts/amiri";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

// About: the handwritten greeting is this section's headline (owner's pick, 2026-10-01), so the
// "About" heading exists only for screen readers. Then his paragraph, then his research interest
// set apart under a small label. The greeting's font is Amiri (owner's pick, 2026-10-05).
export function AboutSection() {
  if (!site.about && !site.researchInterests) return null;
  return (
    <Container>
      <section id="about" aria-labelledby="about-heading" className="py-8 sm:py-12">
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <Salam font={amiri} id="about-salam" />
        <Reveal className="mt-10 sm:mt-12">
          {site.about ? <p className="text-body-lg text-fg-secondary">{site.about}</p> : null}
          {site.researchInterests ? (
            <div className="mt-8">
              <MicroLabel>Research interests</MicroLabel>
              <p className="mt-3 text-body-lg text-fg">{site.researchInterests}</p>
            </div>
          ) : null}
        </Reveal>
      </section>
    </Container>
  );
}
