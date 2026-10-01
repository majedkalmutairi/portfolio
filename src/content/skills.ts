import type { TechId } from "./tech";

// The skills section, in four groups. A skill is listed only if the owner could talk about it
// for two minutes in an interview.

export type Skill = { name: string; tech?: TechId };

export type SkillGroup = {
  heading: "Languages" | "Frameworks & platforms" | "Hardware & embedded" | "Tools";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  { heading: "Languages", skills: [{ name: "C" }] },
  {
    heading: "Frameworks & platforms",
    skills: [{ name: "iOS release pipeline (Expo, EAS Build, TestFlight)" }],
  },
  {
    heading: "Hardware & embedded",
    skills: [
      { name: "Arduino", tech: "arduino" },
      { name: "Breadboarding and sensors" },
      { name: "Soldering" },
    ],
  },
  {
    heading: "Tools",
    skills: [
      { name: "Git and GitHub" },
      { name: "FreeCAD" },
      { name: "Blender" },
      { name: "3D printing (Bambu Lab P1S)" },
    ],
  },
];
