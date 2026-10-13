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
  screens?: { src: string; alt: string }[];
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
    screens: [
      {
        src: "/projects/dosey/today-morning.webp",
        alt: "Dosey's Today screen: one of three doses taken, two marked missed.",
      },
      {
        src: "/projects/dosey/add-amount.webp",
        alt: "Adding Vitamin C in Dosey: the amount and unit are typed in by hand.",
      },
      {
        src: "/projects/dosey/history.webp",
        alt: "Dosey's History screen: 81% of doses taken over seven days, missed doses marked on each day.",
      },
    ],
    links: {},
    featured: false,
  },
];
