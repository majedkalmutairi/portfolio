import type { TechId } from "./tech";

// The projects, in the order they appear. To add one, copy an entry and change its fields;
// the cards and the /work/<slug> pages are built from this list.

export type ProjectStatus = "active" | "in-progress" | "shipped";

export type Project = {
  /** Its address: "parking-system" → /work/parking-system. Lowercase, hyphens, no spaces. */
  slug: string;
  name: string;
  /** One line on the card. */
  hook?: string;
  /** Two or three sentences on the card. */
  summary?: string;
  status: ProjectStatus;
  /** What the owner did on it. */
  role?: string;
  tech: TechId[];
  /** The card image. `src` is a path inside public/, e.g. "/projects/dosey/card.png". */
  image?: { src: string; alt: string };
  links: { source?: string; live?: string };
  /** The first, larger card. One project at a time. */
  featured: boolean;
  /** The body of /work/<slug>: sections, each a heading and its paragraphs. */
  caseStudy?: { heading: string; body: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "dosey",
    name: "Dosey",
    status: "active",
    tech: [],
    // No source link: the code is private.
    links: {},
    featured: true,
  },
  {
    slug: "parking-system",
    name: "Arduino Parking Occupancy System",
    status: "shipped",
    tech: ["arduino"],
    // The source link is added when its public repo exists.
    links: {},
    featured: false,
  },
];
