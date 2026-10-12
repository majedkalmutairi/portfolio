export const tech = {
  arduino: { name: "Arduino", icon: "arduino" },
  c: { name: "C", icon: "c" },
  cpp: { name: "C++ (Arduino)", icon: "cplusplus" },
  ios: { name: "iOS", icon: "ios" },
  expo: { name: "Expo", icon: "expo" },
  testflight: { name: "TestFlight", icon: "apple" },
  git: { name: "Git", icon: "git" },
  freecad: { name: "FreeCAD", icon: "freecad" },
  blender: { name: "Blender", icon: "blender" },
  bambulab: { name: "Bambu Lab", icon: "bambulab" },
} as const satisfies Record<string, { name: string; icon: string }>;

export type TechId = keyof typeof tech;
