import { Container } from "@/components/layout/container";
import { site } from "@/content/site";

// The homepage is still bare; Phase 6 builds it. The name comes from content, like everywhere.
export default function Home() {
  return (
    <Container className="pt-16 pb-24">
      <h1>{site.name}</h1>
      <p>Computer Engineering Student — Software &amp; Embedded Systems</p>
    </Container>
  );
}
