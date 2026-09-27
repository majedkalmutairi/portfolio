// Work history. Empty until there is some; the section stays off (site.flags.showExperience).

export type ExperienceEntry = {
  role: string;
  organisation: string;
  location?: string;
  /** Shown in the date column, e.g. "Jun – Sep 2027". */
  dates: string;
  /** What was done there, one line each. */
  points: string[];
};

export const experience: ExperienceEntry[] = [];
