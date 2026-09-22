import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

// /lab is a workbench for looking at the design system. It does not exist on the live site.
export default function LabLayout({ children }: LayoutProps<"/lab">) {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/lab" className="text-sm font-bold tracking-tight text-fg">
            LAB
          </Link>
          <nav className="flex items-center gap-4 text-body whitespace-nowrap text-fg-muted sm:gap-5">
            <Link href="/lab" className="transition-colors duration-150 hover:text-fg">
              Components
            </Link>
            <span className="h-5 w-px bg-line" aria-hidden="true" />
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pt-16 pb-32 sm:px-6">{children}</main>
    </>
  );
}
