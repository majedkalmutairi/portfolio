import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  if (process.env.NODE_ENV === "production") notFound();

  return <Container className="pt-16 pb-32">{children}</Container>;
}
