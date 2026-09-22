import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/theme/theme-script";
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
      <body className="min-h-dvh bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
