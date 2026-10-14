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
  siPython,
  siRos,
  siUnity,
} from "simple-icons";
import Image from "next/image";
import CsharpPlain from "devicons-react/icons/CsharpPlain";
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
  python: siPython,
  ros: siRos,
  unity: siUnity,
};

function isExtreme(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 60 || luminance > 200;
}

export function TechLogo({ id }: { id: TechId }) {
  if (tech[id].icon === "csharp") return <CsharpPlain size="0.875rem" color="currentColor" aria-hidden />;
  if (tech[id].icon === "linux")
    return <Image src="/tech/linux.png" alt="" width={14} height={14} unoptimized />;
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
