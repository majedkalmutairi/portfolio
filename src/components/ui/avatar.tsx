import Image from "next/image";
import { cx } from "@/lib/cx";

type AvatarProps = {
  /** Path under /public. Leave out until the photo exists — the monogram shows instead. */
  src?: string;
  alt: string;
  /** Initials for the empty state. */
  monogram: string;
  className?: string;
};

// Circle photo beside the name: 200px on desktop, 130px on phones. Until a photo exists it
// shows the monogram in a dashed circle — a deliberate empty state, not a placeholder image.
export function Avatar({ src, alt, monogram, className }: AvatarProps) {
  const size = "size-[130px] sm:size-[200px]";
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        priority
        className={cx(size, "shrink-0 rounded-full object-cover ring-1 ring-line", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cx(
        size,
        "flex shrink-0 items-center justify-center rounded-full border border-dashed border-line-strong",
        "text-[28px] font-light tracking-[0.2em] text-fg-secondary sm:text-[40px]",
        className,
      )}
    >
      <span className="translate-x-[0.1em]">{monogram}</span>
    </div>
  );
}
