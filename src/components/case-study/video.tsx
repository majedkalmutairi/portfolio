import { cx } from "@/lib/cx";

type VideoProps = {
  src: string;
  poster: string;
  label: string;
  captions?: string[];
  aspect?: string;
};

export function Video({ src, poster, label, captions, aspect = "16 / 9" }: VideoProps) {
  return (
    <figure
      className={cx("mt-8 grid gap-4", captions?.length ? "sm:grid-cols-[1fr_12rem] sm:gap-6" : undefined)}
    >
      <div className="self-start overflow-hidden rounded-lg border border-dashed border-line bg-surface">
        <video
          src={src}
          poster={poster}
          aria-label={label}
          controls
          muted
          playsInline
          preload="metadata"
          className="block w-full"
          style={{ aspectRatio: aspect }}
        />
      </div>
      {captions?.length ? (
        <figcaption className="text-body text-fg-muted">
          <ul className="space-y-2">
            {captions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </figcaption>
      ) : null}
    </figure>
  );
}
