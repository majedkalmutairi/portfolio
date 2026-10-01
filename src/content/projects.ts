import type { TechId } from "./tech";

// The projects, in the order they appear. To add one, copy an entry and change its fields;
// the cards and the /work/<slug> pages are built from this list.

export type ProjectStatus = "active" | "in-progress" | "shipped" | "built";

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
    slug: "parking-system",
    name: "Arduino Parking Occupancy System",
    hook: "Tells drivers whether there's a free spot before they enter the lot.",
    status: "shipped",
    role: "Idea, wiring, code, build and presentation",
    tech: ["arduino", "cpp"],
    // The source link is added when its public repo exists.
    links: {},
    featured: true,
  },
  {
    slug: "motorized-chainsaw-prop",
    name: "Motorized Chainsaw Prop",
    hook: "A wearable chainsaw prop with a motor-driven belt of teeth that really runs.",
    status: "built",
    role: "Design, 3D printing, electronics and code",
    tech: ["arduino", "cpp"],
    // No source link: the code was lost with an old laptop.
    links: {},
    featured: false,
  },
  {
    slug: "dosey",
    name: "Dosey",
    hook: "A medication and supplement reminder that runs entirely on your iPhone.",
    status: "active",
    role: "Product design, decisions and testing",
    tech: ["ios", "expo", "testflight"],
    // No source link: the code is private.
    links: {},
    featured: false,
  },
];
