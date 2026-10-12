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
} from "simple-icons";
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
};

function isTooDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export function TechLogo({ id }: { id: TechId }) {
  const logo = LOGOS[tech[id].icon];
  if (!logo) return null;
  const style = isTooDark(logo.hex) ? undefined : ({ color: `#${logo.hex}` } as CSSProperties);
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
