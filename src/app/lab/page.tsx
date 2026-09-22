import type { ReactNode } from "react";
import { siArduino, siC } from "simple-icons";
import { sampleContributions } from "@/components/lab/sample-contributions";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { DashedCard } from "@/components/ui/dashed-card";
import { BrandIcon } from "@/components/ui/icon";
import { IconLink } from "@/components/ui/icon-link";
import { MicroLabel } from "@/components/ui/micro-label";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { TimelineDetail, TimelineRow, TimelineSubtitle, TimelineTitle } from "@/components/ui/timeline-row";

function Spec({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <MicroLabel mono className="block">
        {title}
      </MicroLabel>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-12 rounded-md border border-line ${className}`} />
      <p className="font-mono text-xs text-fg-muted">{name}</p>
    </div>
  );
}

// Every component, every variant. The theme toggle in the header shows the other half.
export default function LabPage() {
  return (
    <div className="space-y-24">
      <Spec title="Colour roles">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          <Swatch name="bg" className="bg-bg" />
          <Swatch name="fg" className="bg-fg" />
          <Swatch name="fg-secondary" className="bg-fg-secondary" />
          <Swatch name="fg-muted" className="bg-fg-muted" />
          <Swatch name="line" className="bg-line" />
          <Swatch name="surface" className="bg-surface" />
        </div>
      </Spec>

      <Spec title="Type scale">
        <div className="space-y-6">
          <p className="text-name">Name — 30 / 36 · 600</p>
          <p className="text-section">Section heading — 34 / 43 · 300</p>
          <p className="text-headline">
            <span className="text-fg">Headline dark half</span>{" "}
            <span className="text-fg-secondary">— gray half</span>
          </p>
          <p className="text-title">Project title — 24 / 32 · 300</p>
          <p className="text-body-lg text-fg-secondary">
            Body large — 18 / 32 · 300. The hero paragraph. Airy line-height is doing most of the
            work here; the weight does the rest.
          </p>
          <p className="text-body text-fg-secondary">Body — 14 / 22 · 400. Descriptions, dates, nav links.</p>
          <p>
            <MicroLabel>Micro label — 11 · 700 · +0.2em</MicroLabel>
          </p>
          <p>
            <MicroLabel mono>Visit site ↗ — mono variant</MicroLabel>
          </p>
        </div>
      </Spec>

      <Spec title="Button">
        <div className="flex flex-wrap gap-4">
          <Button href="/lab">View Resume</Button>
          <Button href="https://github.com/majedkalmutairi" arrow="external">
            Read case study
          </Button>
          <Button arrow="none">Send</Button>
        </div>
      </Spec>

      <Spec title="Dashed card">
        <DashedCard className="p-8">
          <MicroLabel>Featured build</MicroLabel>
          <h3 className="mt-3 text-title">A project title sits here</h3>
          <p className="mt-3 text-body text-fg-secondary">One line of description under it.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill label="Arduino" />
            <Pill label="C++" />
            <Pill label="LCD" />
          </div>
        </DashedCard>
      </Spec>

      <Spec title="Pill">
        <div className="space-y-4">
          <p className="text-body-lg text-fg-secondary">
            Dashed pills flow inside a sentence, like <Pill variant="dashed" label="C" icon={<BrandIcon icon={siC} />} />{" "}
            and <Pill variant="dashed" label="Arduino" icon={<BrandIcon icon={siArduino} />} /> here.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill label="Solid" />
            <Pill label="Tag" />
            <Pill label="With icon" icon={<BrandIcon icon={siC} />} />
          </div>
        </div>
      </Spec>

      <Spec title="Status pill">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status="active" />
          <StatusPill status="in-progress" />
          <StatusPill status="shipped" />
          <span className="text-title">
            Dosey <StatusPill status="active" className="ml-1" />
          </span>
        </div>
      </Spec>

      <Spec title="Section heading">
        <div className="space-y-10">
          <SectionHeading>Work</SectionHeading>
          <SectionHeading link={{ href: "/lab", label: "View details" }}>Education</SectionHeading>
        </div>
      </Spec>

      <Spec title="Timeline row">
        <div className="space-y-14">
          <TimelineRow date="2024 — Present">
            <TimelineTitle>Entry title, 18 semibold</TimelineTitle>
            <TimelineSubtitle>Organisation, 16 medium</TimelineSubtitle>
            <TimelineDetail>Detail line, muted</TimelineDetail>
          </TimelineRow>
          <TimelineRow date="Expected 2028">
            <TimelineTitle>B.Sc. Computer Engineering</TimelineTitle>
            <TimelineSubtitle>American University of the Middle East</TimelineSubtitle>
            <TimelineDetail>GPA 3.97 / 4.0</TimelineDetail>
          </TimelineRow>
        </div>
      </Spec>

      <Spec title="Avatar">
        <div className="flex flex-wrap items-center gap-8">
          <Avatar alt="Majed Khaled Almutairi" monogram="MKA" />
          <p className="max-w-xs text-body text-fg-muted">
            Monogram until the photo exists. 200px on desktop, 130px on phones, always beside the
            name.
          </p>
        </div>
      </Spec>

      <Spec title="Icon link — hover or tab to it">
        <div className="flex items-center gap-1">
          <IconLink kind="github" href="https://github.com/majedkalmutairi" />
          <IconLink kind="linkedin" href="https://www.linkedin.com/in/majed-almutairi-7b30a5439/" />
          <IconLink kind="email" href="mailto:majedkhaled0606@gmail.com" />
        </div>
      </Spec>

      <Spec title="Contribution graph — SAMPLE DATA, not real">
        <ContributionGraph days={sampleContributions()} />
      </Spec>

      <Spec title="Reveal — scroll down to see it">
        <Reveal>
          <DashedCard className="p-8">
            <p className="text-body-lg text-fg-secondary">
              This card faded in and rose 16px as it entered the viewport. Once. With reduce
              motion on, it was simply here.
            </p>
          </DashedCard>
        </Reveal>
      </Spec>
    </div>
  );
}
