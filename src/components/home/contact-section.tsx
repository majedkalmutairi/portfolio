import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/home/contact-form";
import { site } from "@/content/site";

function EmailLink() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="group inline-flex items-center gap-3 text-body text-fg max-sm:@2xs:text-body-lg sm:text-title"
    >
      <Mail
        className="hidden size-5 shrink-0 text-fg-secondary sm:block"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-150 group-hover:decoration-fg-secondary">
        {site.email}
      </span>
    </a>
  );
}

export function ContactSection() {
  const formReady = Boolean(process.env.RESEND_API_KEY);

  return (
    <Container>
      <Section id="contact" heading="Let's talk">
        {site.contactLine ? (
          <p className="text-body-lg text-pretty text-fg-secondary">{site.contactLine}</p>
        ) : null}

        {formReady ? (
          <div className="@container mt-10 rounded-lg border border-dashed border-line px-5 pb-5 sm:px-8 sm:pb-8">
            <div className="w-fit max-w-full -translate-y-1/2 bg-bg px-2 sm:-ml-3 sm:px-3">
              <EmailLink />
            </div>
            <ContactForm email={site.email} />
          </div>
        ) : (
          <div className="@container mt-8">
            <EmailLink />
          </div>
        )}
      </Section>
    </Container>
  );
}
