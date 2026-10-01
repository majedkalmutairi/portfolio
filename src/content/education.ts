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
    start: "2024",
    end: "Expected 2028",
    coursework: [
      "ENGR 131 Transforming Ideas to Innovation 1",
      "PHYS 172 Modern Mechanics",
      "MATH 261 Multivariate Calculus",
      "CS 159 Programming Applications for Engineering",
      "CE 201 Linear Circuit Analysis 1",
      "CE 270 Introduction to Digital System Design",
      "MATH 266 Ordinary Differential Equations",
      "ENGR 132 Transforming Ideas to Innovation 2",
      "CE 202 Linear Circuit Analysis 2",
      "CE 207 Electronic Measurement Techniques",
      "CE 255 Introduction to Electronic Analysis and Design",
      "MATH 265 Linear Algebra (in progress)",
    ],
  },
];
