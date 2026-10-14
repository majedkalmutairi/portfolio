import Image from "next/image";
import { cx } from "@/lib/cx";

type Screen = { src: string; alt: string; caption?: string };

type ScreensProps = {
  items: Screen[];
  columns?: 2 | 3 | 4;
  wide?: boolean;
};

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export function Screens({ items, columns = 3, wide = false }: ScreensProps) {
  return (
    <ul className={cx("mt-8 grid gap-4", COLUMNS[columns])}>
      {items.map((screen) => (
        <li key={screen.src} className="flex flex-col gap-2">
          <div
            className={cx(
              "relative overflow-hidden rounded-lg border border-dashed border-line bg-surface",
              wide ? "aspect-1290/360" : "aspect-1290/2547",
            )}
          >
            <Image
              src={screen.src}
              alt={screen.alt}
              fill
              sizes="(min-width: 768px) 240px, 100vw"
              className="object-cover object-top"
            />
          </div>
          {screen.caption ? <p className="text-body text-fg-muted">{screen.caption}</p> : null}
        </li>
      ))}
    </ul>
  );
}
