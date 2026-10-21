export const site = {
  name: "Majed Almutairi",
  shortName: "Majed Almutairi",
  mark: "MKA",
  headline: {
    primary: "Computer Engineering",
    secondary: "Software & Hardware",
  },
  locationLine: "Based in Kuwait · Open to relocating within the GCC",
  preferredRegions: ["Eastern Province", "Riyadh", "Jeddah"],
  availability: "June – September 2027",
  graduation: "Expected 2028",
  gpa: { value: "3.97", scale: "4.0" },
  photo: { src: "/me.jpg", alt: "Majed Almutairi" } as { src: string; alt: string } | undefined,
  resume: undefined as string | undefined,
  resumeNote: "Resume coming soon." as string | undefined,
  about:
    "I'm a Computer Engineering student with a background in game creation using {unity} and {csharp} and a passion for embedded systems design and software development. I'm currently building an AutoRacer on {linux} in {python} and {cplusplus}, starting with a custom 2D simulation system built with {pygame}, then running the code on a real car using {ros2} on an NVIDIA Jetson with a 2D lidar." as
      string | undefined,
  researchInterests: undefined as string | undefined,
  status: "Computer Engineering" as string | undefined,
  location: "Kuwait",
  notFoundLine:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." as
      string | undefined,
  contactLine:
    "I'm looking for a research placement or internship from June to September 2027. I'm based in Kuwait and open to the Eastern Province, Riyadh, Jeddah, or anywhere in the GCC." as
      string | undefined,
  email: "majedkhaled0606@gmail.com",
  links: {
    github: "https://github.com/majedkalmutairi",
    linkedin: "https://www.linkedin.com/in/majed-almutairi-7b30a5439/",
  },
  flags: {
    showExperience: false,
    showBlog: false,
    showResume: true,
    showCurrentlyBuilding: false,
    showActivityGraph: true,
    showCoursework: false,
  },
  counter: { seed: 22, showFrom: 10 },
};

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
] as const;
