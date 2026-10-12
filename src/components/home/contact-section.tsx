import { ChevronRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/home/contact-form";
import { MicroLabel } from "@/components/ui/micro-label";
import { site } from "@/content/site";

export function ContactSection() {
  const formReady = Boolean(process.env.RESEND_API_KEY);

  return (
    <Container>
      <Section id="contact" heading="Let's talk">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
          {site.contactLine ? <p className="text-body-lg text-fg-secondary">{site.contactLine}</p> : <div />}

          <div className="space-y-8">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-lg border border-line bg-bg p-4 shadow-sm shadow-black/5 transition-colors duration-150 hover:border-line-strong dark:bg-surface/40 dark:shadow-black/30"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface text-fg-secondary">
                <Mail className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <MicroLabel className="block">Email</MicroLabel>
                <span className="mt-0.5 block truncate text-body text-fg">{site.email}</span>
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {formReady ? <ContactForm email={site.email} /> : null}
          </div>
        </div>
      </Section>
    </Container>
  );
}
