import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="mt-8">
      <div className="overflow-hidden rounded-lg border border-dashed border-line bg-surface">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 720px, 100vw"
          className="w-full"
        />
      </div>
      {caption ? <figcaption className="mt-2 text-body text-fg-muted">{caption}</figcaption> : null}
    </figure>
  );
}
