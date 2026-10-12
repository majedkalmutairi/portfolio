import type { ProjectStatus } from "@/content/projects";
import { cx } from "@/lib/cx";

export type Status = ProjectStatus;

export const STATUS_LABEL: Record<Status, string> = {
  active: "Active",
  "in-progress": "In progress",
  shipped: "Shipped",
  built: "Built",
};

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex h-5 items-center rounded-sm border border-line px-1.5 align-middle text-[10px] font-bold uppercase tracking-[0.12em] text-fg-secondary",
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
