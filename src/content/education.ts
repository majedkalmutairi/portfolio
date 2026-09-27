// The education section. The GPA lives in site.ts (it appears in more than one place).

export type Education = {
  school: string;
  degree: string;
  /** Year the degree started, e.g. "2024". */
  start?: string;
  end: string;
  /** Courses the owner could answer questions about. */
  coursework: string[];
};

export const education: Education[] = [
  {
    school: "American University of the Middle East (AUM)",
    degree: "B.Sc. Computer Engineering",
    end: "Expected 2028",
    coursework: [],
  },
];
