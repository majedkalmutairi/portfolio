export type Education = {
  school: string;
  degree: string;
  location?: string;
  start?: string;
  end: string;
  coursework: string[];
};

export const education: Education[] = [
  {
    school: "American University of the Middle East (AUM)",
    degree: "Bachelor of Science in Computer Engineering",
    location: "Kuwait",
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
