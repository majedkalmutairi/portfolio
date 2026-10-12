export const site = {
  name: "Majed Almutairi",
  shortName: "Majed Almutairi",
  mark: "MKA",
  headline: {
    primary: "Computer Engineering",
    secondary: "Software & Embedded Systems",
  },
  locationLine: "Based in Kuwait · Open to relocating within the GCC",
  preferredRegions: ["Eastern Province", "Riyadh", "Jeddah"],
  availability: "June – September 2027",
  graduation: "Expected 2028",
  gpa: { value: "3.97", scale: "4.0" },
  photo: undefined as { src: string; alt: string } | undefined,
  resume: undefined as string | undefined,
  about:
    "placeholder" as //I'm Majed Almutairi. Software to me is the mind, and hardware is an extension of it. It's like giving software hands to work with, and watching it use them just as you wrote it to. What makes an excellent design is knowing when to change which aspect. I want to learn how to give cameras a mind. If I'm not spending my time coming up with new projects to steal my time, I'm in the gym. I love learning about the new science of min-maxing your time in the gym.
      string | undefined,
  researchInterests:
    "placeholder" as //I want to understand how a self-driving car tells a pedestrian from another car fast enough to label it as such in its systems.
      string | undefined,
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
    showResume: false,
    showCurrentlyBuilding: false,
    showActivityGraph: true,
    showCoursework: false,
  },
};

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
] as const;
