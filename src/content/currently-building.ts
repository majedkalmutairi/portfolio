export type CurrentBuild = {
  name: string;
  note: string;
  link?: string;
};

export const currentlyBuilding: CurrentBuild[] = [];
