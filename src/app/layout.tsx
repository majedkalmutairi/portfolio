import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Majed Almutairi — Computer Engineering Student",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
