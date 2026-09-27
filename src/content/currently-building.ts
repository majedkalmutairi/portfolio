// Something in progress that isn't already in the projects list. Empty for now; the section
// stays off (site.flags.showCurrentlyBuilding).

export type CurrentBuild = {
  name: string;
  /** One line on what it is and where it's at. */
  note: string;
  link?: string;
};

export const currentlyBuilding: CurrentBuild[] = [];
