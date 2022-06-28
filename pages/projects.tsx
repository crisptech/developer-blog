import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  animated,
  config,
  InterpolatorArgs,
  useTransition,
} from "react-spring";
import { wrapper } from "../app/store";
import ProjectCard from "../components/project-card";
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
  op?: InterpolatorArgs<number, undefined>;
  trans?: InterpolatorArgs<number, undefined>;
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
  const [projectsWithSizes, setProjectsWithSizes] = useState<ProjectWithSize[]>(
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateInitialLoad(false));
  }, []);

  useEffect(() => {
    setProjectsWithSizes(getProjectCardsWithSizes(projects));
  }, [projects]);

  const transitions = useTransition(projectsWithSizes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 200,
    config: config.molasses,
  });

  const AnimatedGrid = animated(Grid);
  const AnimatedProjectCard = animated(ProjectCardAlt);

  const getRandDisplacement = (): number => {
    return Math.random() * 1500 + 1000;
  };

  const getRandomInRange = (min = 0, max = 100): number => {
    let diff = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * diff);

    rand = rand + min;

    return rand;
  };

  return (
    <div className={styles.container}>
      <Grid
        container
        columnSpacing="4rem"
        padding="4rem"
        spacing={3}
        justifyContent="space-around"
      >
        {transitions(({ opacity }, projectWithSize) => (
          <AnimatedGrid
            item
            sm={12}
            md={6}
            lg={projectWithSize.size}
            justifyContent="center"
            alignItems="center"
            style={{
              opacity: opacity.to({ output: [0.4, 1.2] }),
              transform: opacity
                .to({
                  range: [getRandomInRange(0.5, 0.6), 1],
                  output: [getRandDisplacement(), 0],
                })
                .to((x) => `translate3d(${x}px,0,0)`),
            }}
          >
            <ProjectCardAlt projectData={projectWithSize} />
          </AnimatedGrid>
        ))}
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
