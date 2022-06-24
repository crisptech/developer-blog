import React from "react";
import { wrapper } from "../app/store";
import {
  getAllProjectsData,
  getSortedProjectIds,
  projectsToRecords,
} from "../lib/projects";
import { getGlobalTagsFromObj } from "../lib/util/getGlobalTagsFromObj";

const Projects = () => {
  return <div>projects</div>;
};

export default Projects;

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const projects = await getAllProjectsData();
    const projectsRecords = projectsToRecords(projects);
    //TODO: dispatch updateGlobalProjects action
    const sortedProjectIds = getSortedProjectIds(projects);
    //TODO: dispatch updateVisiblePostIds action
    const globalProjectTags = getGlobalTagsFromObj(projects);
    //TODO: dispatch updateGlobalTags action on project

    return {
      props: {},
    };
  }
);
