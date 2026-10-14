import type { TechId } from "./tech";

export type Skill = { name: string; tech?: TechId };

export type SkillGroup = {
  heading: "Languages" | "Frameworks & platforms" | "Hardware & embedded" | "Tools";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    heading: "Languages",
    skills: [
      { name: "C", tech: "c" },
      { name: "C++", tech: "cplusplus" },
      { name: "C#", tech: "csharp" },
      { name: "Python", tech: "python" },
    ],
  },
  {
    heading: "Frameworks & platforms",
    skills: [
      { name: "Unity", tech: "unity" },
      { name: "Pygame", tech: "pygame" },
      { name: "ROS 2", tech: "ros2" },
      { name: "Linux", tech: "linux" },
      { name: "iOS release pipeline (Expo, EAS Build, TestFlight)", tech: "expo" },
    ],
  },
  {
    heading: "Hardware & embedded",
    skills: [
      { name: "Arduino", tech: "arduino" },
      { name: "Breadboarding", tech: "breadboard" },
      { name: "Sensors", tech: "sensors" },
      { name: "Soldering", tech: "soldering" },
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
