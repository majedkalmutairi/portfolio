import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/case-study/figure";
import { Screens } from "@/components/case-study/screens";
import { Video } from "@/components/case-study/video";
import { cx } from "@/lib/cx";

const cell = (align?: string) =>
  align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

const components = {
  h2: ({ children }) => <h2 className="mt-12 text-title text-fg first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-lg font-medium tracking-tight text-fg">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-body-lg text-fg-secondary">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-1 pl-5 text-body-lg text-fg-secondary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-1 pl-5 text-body-lg text-fg-secondary">{children}</ol>
  ),
  strong: ({ children }) => <strong className="font-medium text-fg">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[0.85em] text-fg">{children}</code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline decoration-line underline-offset-4 transition-colors duration-150 hover:text-fg"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-t border-dashed border-line" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-body text-fg-secondary">{children}</table>
    </div>
  ),
  th: ({ children, align }: ComponentProps<"th">) => (
    <th className={cx("border-b border-line py-2 pr-4 font-medium whitespace-nowrap text-fg", cell(align))}>
      {children}
    </th>
  ),
  td: ({ children, align }: ComponentProps<"td">) => (
    <td
      className={cx("border-b border-dashed border-line py-2 pr-4 align-top whitespace-nowrap", cell(align))}
    >
      {children}
    </td>
  ),
  Figure,
  Screens,
  Video,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
