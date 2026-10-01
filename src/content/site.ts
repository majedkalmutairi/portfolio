// Facts about the owner that the whole site reads. Components read from here, so a name,
// link or location is written once — never typed into a component file.
// A field left `undefined` has not been written yet: the site shows nothing there, never filler.

export const site = {
  name: "Majed Khaled Almutairi",
  shortName: "Majed Almutairi",
  /** The monogram in the nav and the favicon. */
  mark: "MKA",
  headline: {
    primary: "Computer Engineering Student",
    secondary: "Software & Embedded Systems",
  },
  /** The hero's location line. */
  locationLine: "Based in Kuwait · Open to relocating within the GCC",
  /** Named in the contact section. */
  preferredRegions: ["Eastern Province", "Riyadh", "Jeddah"],
  /** When a summer placement could run. */
  availability: "June – September 2027",
  graduation: "Expected 2028",
  gpa: { value: "3.97", scale: "4.0" },
  /** The About paragraph, in the owner's words. Sits under the handwritten greeting. */
  about:
    "I'm Majed Almutairi. Software to me is the mind, and hardware is an extension of it. It's like giving software hands to work with, and watching it use them just as you wrote it to. What makes an excellent design is knowing when to change which aspect. I want to learn how to give cameras a mind. If I'm not spending my time coming up with new projects to steal my time, I'm in the gym. I love learning about the new science of min-maxing your time in the gym." as
      string | undefined,
  /** One or two sentences, in the owner's words. */
  researchInterests:
    "I want to understand how a self-driving car tells a pedestrian from another car fast enough to label it as such in its systems." as
      string | undefined,
  /** Footer status line, in the owner's words. */
  status: "Computer Engineering" as string | undefined,
  /** Footer location. */
  location: "Kuwait",
  /** The 404 page's one line, in the owner's words. */
  notFoundLine:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." as
      string | undefined,
  email: "majedkhaled0606@gmail.com",
  links: {
    github: "https://github.com/majedkalmutairi",
    linkedin: "https://www.linkedin.com/in/majed-almutairi-7b30a5439/",
  },
  /** Sections that are built but switched off. Flip one to true when it has real content. */
  flags: {
    showExperience: false,
    showBlog: false,
    showResume: false,
    showCurrentlyBuilding: false,
    showActivityGraph: false,
  },
};

/** The nav's three links. Each points at a section id on the homepage. */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
