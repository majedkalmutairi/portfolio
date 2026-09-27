// Facts about the owner that the site's frame needs. Components read from here, so a name,
// link or location is written once — never typed into a component file.
// Phase 5 expands this file; a field left undefined is shown as nothing, never as filler.

export const site = {
  name: "Majed Khaled Almutairi",
  shortName: "Majed Almutairi",
  /** The monogram in the nav and the favicon. */
  mark: "MKA",
  /** Footer status line — written by the owner in Phase 5. */
  status: undefined as string | undefined,
  /** Footer location. */
  location: "Kuwait",
  /** The 404 page's one line — written by the owner in Phase 5. */
  notFoundLine: undefined as string | undefined,
  email: "majedkhaled0606@gmail.com",
  links: {
    github: "https://github.com/majedkalmutairi",
    linkedin: "https://www.linkedin.com/in/majed-almutairi-7b30a5439/",
  },
} as const;

/** The nav's three links. Each points at a section id on the homepage. */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
