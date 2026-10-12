import type { TechId } from "./tech";

export type Skill = { name: string; tech?: TechId };

export type SkillGroup = {
  heading: "Languages" | "Frameworks & platforms" | "Hardware & embedded" | "Tools";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  { heading: "Languages", skills: [{ name: "C", tech: "c" }] },
  {
    heading: "Frameworks & platforms",
    skills: [{ name: "iOS release pipeline (Expo, EAS Build, TestFlight)", tech: "expo" }],
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
      { name: "Git and GitHub", tech: "git" },
      { name: "FreeCAD", tech: "freecad" },
      { name: "Blender", tech: "blender" },
      { name: "3D printing (Bambu Lab P1S)", tech: "bambulab" },
    ],
  },
];
