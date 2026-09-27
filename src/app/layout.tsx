import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/theme/theme-script";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import "./globals.css";

// The site's typeface. next/font downloads it at build time and serves it from our own domain,
// so no request ever goes to Google. It defines `--font-inter`, which globals.css uses.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Majed Almutairi — Computer Engineering Student",
};

// Browser chrome colour for the default (dark) theme; ThemeScript / ThemeToggle keep it in sync.
export const viewport: Viewport = {
  themeColor: "#121212",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `dark` is the default. ThemeScript may remove it before paint if the visitor chose
    // light earlier, so React must not complain about the class not matching.
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Without JavaScript, Reveal can never run — show everything as-is. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">
        {/* First thing a keyboard reaches: jump past the nav. Hidden until it has focus. */}
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-solid px-4 py-2 text-body font-medium text-on-solid focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Nav />
        {/* tabIndex -1 lets the skip link move focus here; it is not a tab stop itself. */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
