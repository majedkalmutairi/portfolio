import { Fragment } from "react";
import { TechPill } from "@/components/ui/tech-pill";
import { tech, type TechId } from "@/content/tech";

// Turns "I build with {arduino} and {c}." into text with small dashed pills where the braces are.
// A brace word that isn't a key in tech.ts is shown as plain text, so a typo never breaks the page
// (the content check is what catches it).
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\{([a-z0-9-]+)\}/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        return part in tech ? (
          <TechPill key={i} id={part as TechId} variant="dashed" />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
