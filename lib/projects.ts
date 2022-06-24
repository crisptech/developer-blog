import fs from "fs";
import matter from "gray-matter";
import Error from "next/error";
import path from "path";
import { indexBy, prop } from "ramda";
const filesPath = path.join("public", "projects");
import { Project } from "./types/projects";
import { splitAndTrim } from "./util/splitAndTrim";

export const getAllProjectIds = async () => {
  const fileNames = await fs.promises.readdir(filesPath);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const projectsToRecords = (
  projects: Project[]
): Record<string, Project> => {
  return indexBy(prop("id"), projects);
};

export const getSortedProjectIds = (unsortedProjects: Project[]): string[] => {
  const allSortedProjects = [...unsortedProjects].sort((projectA, projectB) => {
    const dateA: Date = new Date(projectA.date);
    const dateB: Date = new Date(projectB.date);
    return dateA < dateB ? 1 : -1;
  });
  return allSortedProjects.map((project) => project.id);
};

export const getAllProjectsData = async (): Promise<Project[]> => {
  const allProjectIds = await getAllProjectIds();
  const allProjects = allProjectIds.map((projectIdObj) => {
    return getProjectData(projectIdObj.params.id);
  });

  return allProjects;
};

export const getProjectData = (id: string): Project => {
  const projectPath = path.join(filesPath, `${id}.md`);
  const fileData = fs.readFileSync(projectPath, "utf-8");

  const matterOfFile = matter(fileData);

  try {
    return {
      id,
      date: valueIfExists(matterOfFile.data.date),
      title: valueIfExists(matterOfFile.data.title),
      description: valueIfExists(matterOfFile.data.description),
      content: valueIfExists(matterOfFile.content),
      tags: splitAndTrim(matterOfFile.data.tags),
      image: valueIfExists(matterOfFile.data.image),
    };
  } catch (error) {
    throw Error;
  }
};

const valueIfExists = (value: string | null) => {
  return value ? value : "";
};
