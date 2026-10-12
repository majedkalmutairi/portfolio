import type { TechId } from "./tech";

export type ProjectStatus = "active" | "in-progress" | "shipped" | "built";

export type Project = {
  slug: string;
  name: string;
  hook?: string;
  summary?: string;
  status: ProjectStatus;
  role?: string;
  tech: TechId[];
  image?: { src: string; alt: string };
  links: { source?: string; live?: string };
  featured: boolean;
  caseStudy?: { heading: string; body: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "parking-system",
    name: "Arduino Parking Occupancy System",
    hook: "Tells drivers whether there's a free spot before they enter the lot.",
    status: "built",
    role: "Idea, wiring, code, build and presentation",
    tech: ["arduino", "cpp"],
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
    links: {},
    featured: false,
  },
];
