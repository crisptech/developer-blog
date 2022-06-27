import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../app/store";
import ProjectCardAlt from "../components/project-card-alt";
import {
  getAllPostsData,
  getSortedPostIds,
  postsToRecords,
} from "../lib/posts";
import {
  getAllProjectsData,
  getSortedProjectIds,
  projectsToRecords,
} from "../lib/projects";
import { selectProjectGlobalTags } from "../lib/selectors/selectProjectGlobalTags";
import { selectVisibleProjects } from "../lib/selectors/selectVisibleProjects";
import { updateInitialLoad } from "../lib/slices/configSlice";
import {
  udpateVisiblePostIds,
  updateGlobalPosts,
} from "../lib/slices/postsSlice";
import {
  updateGlobalProjects,
  updateVisibleProjectIds,
} from "../lib/slices/projectsSlice";
import {
  updateGlobalPostTags,
  updateGlobalProjectTags,
} from "../lib/slices/searchSlice";
import { Project } from "../lib/types/projects";
import { getGlobalTagsFromObj } from "../lib/util/getGlobalTagsFromObj";
import styles from "../styles/Home.module.css";

type ProjectCardSizeType = {
  [cat in Sizes]: {
    [size in Sizes]: number;
  };
};

const projectCardSize: ProjectCardSizeType = {
  sm: {
    sm: 4,
    md: 4,
    lg: 6,
  },
  md: {
    sm: 4,
    md: 6,
    lg: 6,
  },
  lg: {
    sm: 6,
    md: 4,
    lg: 6,
  },
};

type ProjectWithSize = Project & {
  size: number;
};

type Sizes = "sm" | "md" | "lg";

const getRandomSize = (index: number): Sizes => {
  switch (index) {
    case 1:
      return "sm";
    case 2:
      return "md";
    case 3:
      return "lg";
    default:
      return "md";
  }
};

const getSizeCategory = (sizeCategory?: Sizes | undefined): Sizes => {
  switch (sizeCategory) {
    case "sm":
      return "md";
    case "md":
      return "sm";
    default:
      return getRandomSize(Math.ceil(Math.random() * 3));
  }
};

const getProjectCardsWithSizes = (projects: Project[]): ProjectWithSize[] => {
  let projectsWithSizes: ProjectWithSize[] = [];
  let prevCategory: Sizes | undefined = undefined;

  for (let i = 0; i < projects.length; i++) {
    projectsWithSizes = [
      ...projectsWithSizes,
      {
        ...projects[i],
        size: 0,
      },
    ];

    const prevProjectSizeCategory: Sizes | undefined =
      prevCategory !== undefined || (prevCategory !== "lg" && i % 2 !== 0)
        ? prevCategory
        : undefined;

    const sizeCategory = getSizeCategory(prevProjectSizeCategory);

    prevCategory = sizeCategory;

    const sizeCard = getSizeCategory();

    const projSize = projectCardSize[sizeCategory][sizeCard];

    projectsWithSizes[i].size = projSize;
  }

  return [...projectsWithSizes];
};

const Projects: NextPage = () => {
  const projects = useSelector(selectVisibleProjects);
  const projectsWithSizes = getProjectCardsWithSizes(projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateInitialLoad(false));
  }, []);

  return (
    <div className={styles.container}>
      <Grid
        container
        columnSpacing="4rem"
        padding="4rem"
        spacing={3}
        justifyContent="space-around"
      >
        {projectsWithSizes.map((projectWithSize) => {
          return (
            <Grid
              item
              sm={12}
              md={6}
              lg={projectWithSize.size}
              justifyContent="center"
              alignItems="center"
            >
              <ProjectCardAlt projectData={projectWithSize} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const selectRandomSize = () => {
  const rand = Math.ceil(Math.random() * 4);
  const smallOrLarge = Math.ceil(Math.random() * 5);

  if (smallOrLarge <= 3) {
    switch (rand) {
      case 1:
        return 6;
      case 2:
        return 5;
      case 3:
        return 4;
    }
  } else {
    switch (rand) {
      case 3:
        return 7;
      case 4:
        return 10;
    }
  }

  return 4;
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const isInitialLoad = await store.getState().config.initialLoad;
    console.log("is initial load", isInitialLoad);
    if (isInitialLoad) {
      const posts = await getAllPostsData();
      const postsRecords = postsToRecords(posts);
      await store.dispatch(updateGlobalPosts(postsRecords));
      const sortedPostIds = getSortedPostIds(posts);
      await store.dispatch(udpateVisiblePostIds(sortedPostIds));
      const globalPostTags = getGlobalTagsFromObj(posts);
      await store.dispatch(updateGlobalPostTags(globalPostTags));

      const projects = await getAllProjectsData();
      const projectsRecords = projectsToRecords(projects);
      await store.dispatch(updateGlobalProjects(projectsRecords));
      const sortedProjectIds = getSortedProjectIds(projects);
      await store.dispatch(updateVisibleProjectIds(sortedProjectIds));
      const globalProjectTags = getGlobalTagsFromObj(projects);
      console.log(globalProjectTags);
      await store.dispatch(updateGlobalProjectTags(globalProjectTags));
    }

    return {
      props: {},
    };
  }
);

export default Projects;
