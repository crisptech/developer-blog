type School = "University of Southampton" | "University of Birmingham";

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
  "University of Southampton": {
    school: "University of Southampton",
    degree: "Mechanical Engineer, Computational Modelling",
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
