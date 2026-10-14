import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siApple,
  siArduino,
  siBambulab,
  siBlender,
  siC,
  siCplusplus,
  siExpo,
  siFreecad,
  siGit,
  siIos,
  siLinux,
  siNvidia,
  siPython,
  siRos,
  siUnity,
} from "simple-icons";
import Image from "next/image";
import { CircuitBoard, Flame, Radar, Radio, type LucideIcon } from "lucide-react";
import CsharpPlain from "devicons-react/icons/CsharpPlain";
import { FireIcon } from "@/components/ui/fire-icon";
import { BrandIcon } from "@/components/ui/icon";
import { Pill } from "@/components/ui/pill";
import { tech, type TechId } from "@/content/tech";

const LOGOS: Record<string, SimpleIcon> = {
  apple: siApple,
  arduino: siArduino,
  bambulab: siBambulab,
  blender: siBlender,
  c: siC,
  cplusplus: siCplusplus,
  expo: siExpo,
  freecad: siFreecad,
  git: siGit,
  ios: siIos,
  linux: siLinux,
  nvidia: siNvidia,
  python: siPython,
  ros: siRos,
  unity: siUnity,
};

const GLYPHS: Record<string, LucideIcon> = {
  "circuit-board": CircuitBoard,
  flame: Flame,
  radar: Radar,
  radio: Radio,
};

function isExtreme(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 60 || luminance > 200;
}

export function TechLogo({ id }: { id: TechId }) {
  if (tech[id].icon === "csharp") return <CsharpPlain size="0.875rem" color="currentColor" aria-hidden />;
  if (tech[id].icon === "fire") return <FireIcon />;
  if (tech[id].icon === "linux")
    return <Image src="/tech/linux.png" alt="" width={14} height={14} unoptimized />;
  const Glyph = GLYPHS[tech[id].icon];
  if (Glyph) return <Glyph strokeWidth={1.75} aria-hidden="true" />;
  const logo = LOGOS[tech[id].icon];
  if (!logo) return null;
  const style = isExtreme(logo.hex) ? undefined : ({ color: `#${logo.hex}` } as CSSProperties);
  return <BrandIcon icon={logo} style={style} />;
}

type TechPillProps = {
  id?: TechId;
  label?: string;
  variant?: "dashed" | "solid";
};

export function TechPill({ id, label, variant = "solid" }: TechPillProps) {
  const text = label ?? (id ? tech[id].name : "");
  return <Pill label={text} variant={variant} icon={id ? <TechLogo id={id} /> : undefined} />;
}
