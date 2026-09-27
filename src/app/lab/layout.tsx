import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";

// /lab is a workbench for looking at the design system. It does not exist on the live site.
// It sits inside the site's real nav and footer, so the shell is on show here too.
export default function LabLayout({ children }: LayoutProps<"/lab">) {
  if (process.env.NODE_ENV === "production") notFound();

  return <Container className="pt-16 pb-32">{children}</Container>;
}
