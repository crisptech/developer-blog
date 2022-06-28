type CompanyNames =
  | "Aston Martin"
  | "Mitek"
  | "BabyDoge"
  | "Freelance"
  | "CookieChef";

type Experience = {
  [companyName in CompanyNames]: {
    [a: string]: {
      dates: string;
      position: string;
      description: string;
      skillTakeAways: string[];
    };
  };
};

export const experience: Experience = {
  "Aston Martin": {
    "Apr 2017 - Nov  2017": {
      dates: "Apr 2017 - Nov 2017",
      position: "ANSYS Design Engineer",
      description:
        "Responsible for conducting detailed structural modelling assesments on the DB7 chassis.",
      skillTakeAways: ["python", "R", "ANSYS"],
    },
    "Nov 2017 - August 2018": {
      dates: "Nov 2017 - August 2018",
      position: "Junior Web developer",
      description:
        "Responsible for maintaining public facing website, migrating away from JQuery to React based codebase",
      skillTakeAways: ["javascript", "react.js", "express.js", "REST"],
    },
  },
  Mitek: {
    "Dec 2019 - Apr 2021": {
      dates: "Dec 2019 - Apr 2021",
      position: "Software Engineer",
      description: "",
      skillTakeAways: [
        "c++",
        "c#",
        "MongoDB",
        "three.js",
        "react.js",
        "express.js",
      ],
    },
  },
  Freelance: {
    "Apr 2021 - Oct 2021": {
      dates: "Apr 2021 - Oct 2021",
      position: "Fronend developer, Web3 smart contract auditor",
      description: "",
      skillTakeAways: [
        "web3",
        "ethereum.js",
        "next.js",
        "MongoDB",
        "react.js",
        "GraphQl",
      ],
    },
  },
  BabyDoge: {
    "Jun 2021 - May 2022": {
      dates: "Jun 2021 - May 2022",
      position: "Senior Frontend engineer",
      description: "",
      skillTakeAways: [],
    },
  },
  CookieChef: {
    "May 2022 -": {
      dates: "May 2022 -",
      position: "Co-founder",
      description: "",
      skillTakeAways: [],
    },
  },
};
