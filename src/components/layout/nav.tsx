import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Container } from "@/components/layout/container";
import { navLinks, site } from "@/content/site";

// The bar at the top of every page. It sticks while you scroll and blurs what passes under it.
// Links point at "/#section", so they scroll on the homepage and lead back to it from elsewhere.
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/70 backdrop-blur-xl dark:bg-ink/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-sm font-bold text-fg transition-colors duration-150 hover:text-fg-secondary">
          {site.mark}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3 sm:gap-5">
          <ul className="flex items-center gap-3 sm:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body whitespace-nowrap text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
