import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type SectionProps = {
  id: string;
  heading: string;
  link?: { href: string; label: string };
  children: ReactNode;
};

export function Section({ id, heading, link, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-8 sm:py-12">
      <Reveal>
        <SectionHeading id={`${id}-heading`} link={link}>
          {heading}
        </SectionHeading>
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  );
}
