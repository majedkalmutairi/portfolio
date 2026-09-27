import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found — ${site.shortName}`,
};

// Shown for any address that doesn't exist. The owner's one line sits under the heading once
// he has written it (site.notFoundLine); until then the page is just the heading and the way home.
export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-8 pt-24 pb-32 sm:pt-32">
      <div className="space-y-3">
        <h1 className="text-section text-fg">Page not found</h1>
        {site.notFoundLine ? <p className="text-body-lg text-fg-secondary">{site.notFoundLine}</p> : null}
      </div>
      <Button href="/">Back home</Button>
    </Container>
  );
}
