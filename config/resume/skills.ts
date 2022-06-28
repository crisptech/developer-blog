import React from "react";

type SkillCategoryKeys =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Technologies"
  | "AWS"
  | "Utilities"
  | "Devops";

type SkillKeys =
  | "javascript"
  | "java"
  | "c++"
  | "c#"
  | "python"
  | "react.js"
  | "next.js"
  | "redux"
  | "node.js"
  | "express.js"
  | "graphQl"
  | "REST"
  | "DynamoDB"
  | "Lambdas"
  | "git"
  | "docker"
  | "Gitlab";

export type SkillsType = {
  [a in SkillCategoryKeys]: {
    [b in SkillKeys]: number;
  };
};

export const skills: any = {
  Languages: {
    javascript: 3,
    java: 2,
    "c++": 2,
    "c#": 2,
    python: 1,
  },
  Frontend: {
    "react.js": 3,
    "next.js": 3,
    redux: 3,
  },
  Backend: {
    "node.js": 3,
    "express.js": 3,
  },
  Technologies: {
    graphhQl: 3,
    REST: 3,
  },
  AWS: {
    DynamoDB: 2,
    Lambdas: 2,
  },
  Utilities: {
    git: 3,
    docker: 2,
  },
  Devops: {
    Gitlab: 1,
  },
};
