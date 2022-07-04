type School =
  | "University of Southampton"
  | "University of Birmingham"
  | "Birmingham Metropolitan College";

type EducationEntry = {
  [school in School]: {
    school: School;
    degree: string;
    degreeLevel: string;
    dates: string;
    grade: {
      percentage: number;
      classification: string;
    };
    bursary?: string;
    awards?: string;
  };
};

export const education: EducationEntry = {
  "Birmingham Metropolitan College": {
    school: "Birmingham Metropolitan College",
    degree: "A-Levels",
    degreeLevel:
      "Mathematics, Further Mathematics, Computer Science, Physics, Business",
    dates: "2012-2014",
    grade: {
      classification:
        "Maths: A*, FM: A, Computer Science: A, Physics: A, Business: A",
      percentage: 100,
    },
  },
  "University of Southampton": {
    school: "University of Southampton",
    degree: "Mechanical Engineering, Computational Modelling",
    degreeLevel: "BSc",
    dates: "2014-2017",
    grade: { classification: "Upper first class", percentage: 76 },
  },
  "University of Birmingham": {
    school: "University of Birmingham",
    degree: "Computer Science",
    degreeLevel: "MSc",
    dates: "2018-2019",
    grade: {
      classification: "Distinction",
      percentage: 86,
    },
    bursary: "Ramsay Scholarship",
    awards: "Best in year",
  },
};
