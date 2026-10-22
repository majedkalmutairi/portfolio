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
  video?: { src: string; poster: string; alt: string; background?: string };
  links: { source?: string; live?: string };
  featured: boolean;
  caseStudy?: boolean;
};

export const projects: Project[] = [
  {
    slug: "autoracer",
    name: "AutoRacer",
    hook: "A 1/10 scale RC car that learns to race by itself.",
    status: "in-progress",
    role: "Idea, simulator, driving logic and the plan for the real car",
    tech: ["python", "pygame", "linux"],
    video: {
      src: "/projects/autoracer/card-loop.mp4",
      poster: "/projects/autoracer/card-poster.webp",
      alt: "The AutoRacer simulator: the car lapping the speedway track on the racing line it learned, coloured by speed.",
      background: "#0e1013",
    },
    links: { source: "https://github.com/majedkalmutairi/racecar" },
    featured: true,
    caseStudy: true,
  },
  {
    slug: "motorized-chainsaw-prop",
    name: "Motorized Chainsaw Prop",
    hook: "A chainsaw prop with a motor-driven belt of teeth that really runs.",
    status: "built",
    role: "Design, 3D printing, electronics and code",
    tech: ["arduino", "cpp", "soldering"],
    video: {
      src: "/projects/motorized-chainsaw-prop/card-loop.mp4",
      poster: "/projects/motorized-chainsaw-prop/card-poster.webp",
      alt: "The Motorized Chainsaw Prop on a desk, its belt of teeth running around the bar.",
    },
    links: {},
    featured: false,
    caseStudy: true,
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
    caseStudy: true,
  },
  {
    slug: "parking-system",
    name: "Arduino Parking Occupancy System",
    hook: "Tells drivers whether there's a free spot before they enter the lot.",
    status: "built",
    role: "Idea, wiring, code, build and presentation",
    tech: ["arduino", "cpp", "breadboard", "sensors"],
    links: {},
    featured: false,
    caseStudy: true,
  },
];
