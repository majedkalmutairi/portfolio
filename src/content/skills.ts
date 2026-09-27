import type { TechId } from "./tech";

// The skills section, in four groups. A skill is listed only if the owner could talk about it
// for two minutes in an interview.

export type Skill = { name: string; tech?: TechId };

export type SkillGroup = {
  heading: "Languages" | "Frameworks & platforms" | "Hardware & embedded" | "Tools";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  { heading: "Languages", skills: [] },
  { heading: "Frameworks & platforms", skills: [] },
  { heading: "Hardware & embedded", skills: [] },
  { heading: "Tools", skills: [] },
];
