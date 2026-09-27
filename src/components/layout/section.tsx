import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type SectionProps = {
  /** The anchor the nav links to: id "work" is reached by "/#work". */
  id: string;
  heading: string;
  /** Optional small link on the heading's right, e.g. { href: "/work", label: "View all" }. */
  link?: { href: string; label: string };
  children: ReactNode;
};

// One homepage section: a heading, its content, and the site's single fade-up as it scrolls in.
// The vertical padding is what separates sections — about 64px on phones, 96px above.
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
