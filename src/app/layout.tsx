import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { IntroScript } from "@/components/home/intro-script";
import { ThemeScript } from "@/components/theme/theme-script";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { VisitBeacon } from "@/components/layout/visit-beacon";
import { site } from "@/content/site";
import { firstSentence } from "@/lib/plain-text";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Majed Almutairi — Computer Engineering Student",
  description: site.about ? firstSentence(site.about) : undefined,
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <IntroScript />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}#contact-frame{display:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-solid px-4 py-2 text-body font-medium text-on-solid focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <VisitBeacon />
        <Analytics />
      </body>
    </html>
  );
}
