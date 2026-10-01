// Every technology a project or skill can name, with the logo it shows (a Simple Icons slug)
// and its display name. Only ids that are actually in use live here — add one when you need it.

export const tech = {
  arduino: { name: "Arduino", icon: "arduino" },
  cpp: { name: "C++ (Arduino)", icon: "cplusplus" },
  ios: { name: "iOS", icon: "ios" },
  expo: { name: "Expo", icon: "expo" },
  // Simple Icons has no TestFlight logo; Apple's is the closest honest mark.
  testflight: { name: "TestFlight", icon: "apple" },
} as const satisfies Record<string, { name: string; icon: string }>;

/** One of the keys above, e.g. "arduino". A typo is an error before anything runs. */
export type TechId = keyof typeof tech;
