import Image from "next/image";
import { cx } from "@/lib/cx";

type AvatarProps = {
  src?: string;
  alt: string;
  monogram: string;
  className?: string;
};

export function Avatar({ src, alt, monogram, className }: AvatarProps) {
  const size = "size-[124px] sm:size-[156px]";
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        preload
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
        "text-[26px] font-light tracking-micro text-fg-secondary sm:text-[32px]",
        className,
      )}
    >
      <span className="translate-x-[0.1em]">{monogram}</span>
    </div>
  );
}
