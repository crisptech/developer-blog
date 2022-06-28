import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { intersection } from "ramda";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  animated,
  config,
  InterpolatorArgs,
  useTransition,
} from "react-spring";
import { wrapper } from "../app/store";
import ProjectCardAlt from "../components/project-card-alt";
import ProjectsHero from "../components/projects-hero";
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
import { selectFilteredProjectTags } from "../lib/selectors/selectFilteredProjectTags";
import { selectGlobalProjects } from "../lib/selectors/selectGlobalProjects";
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
  updateProjectsFilteredTags,
} from "../lib/slices/searchSlice";
import { Project } from "../lib/types/projects";
import { getGlobalTagsFromObj } from "../lib/util/getGlobalTagsFromObj";
import styles from "../styles/Home.module.css";

type Sizes = "sm" | "md" | "lg";

type ProjectCardSizeType = {
  // eslint-disable-next-line no-unused-vars
  [cat in Sizes]: {
    // eslint-disable-next-line no-unused-vars
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
  let prevCategory: Sizes | undefined;

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
  const projectTags = useSelector(selectProjectGlobalTags);
  const globalProjects = useSelector(selectGlobalProjects);
  const selectedTags = useSelector(selectFilteredProjectTags);
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

  useEffect(() => {
    const globalProjectsArray = [...Object.values(globalProjects)];
    const filteredProjects =
      selectedTags.length > 0
        ? [...globalProjectsArray].filter(
            (project) => intersection(selectedTags, project.tags).length > 0
          )
        : [...globalProjectsArray];

    const filteredProjectsIds = filteredProjects.map((project) => project.id);

    dispatch(updateVisibleProjectIds(filteredProjectsIds));
  }, [selectedTags]);

  const transitions = useTransition(projectsWithSizes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: config.molasses,
  });

  const handleTagSelect = (selectedTag: string) => {
    const newSelectedTags = selectedTags.includes(selectedTag)
      ? [...selectedTags].filter((tag) => tag !== selectedTag)
      : [...selectedTags, selectedTag];

    dispatch(updateProjectsFilteredTags(newSelectedTags));
  };

  const AnimatedGrid = animated(Grid);

  const getRandDisplacement = (): number => {
    return Math.random() * 1500 + 1000;
  };

  const getRandomInRange = (min = 0, max = 100): number => {
    const diff = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * diff);

    rand = rand + min;

    return rand;
  };

  return (
    <div className={styles.container}>
      <ProjectsHero />
      <Box marginLeft="2rem">
        <Typography variant="caption">project categories</Typography>
        <div style={{ display: "flex", gap: "2rem" }}>
          {projectTags.map((tag, index) => {
            return (
              <Box key={tag} sx={{ display: "inline-flex" }}>
                <Chip
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  onClick={() => handleTagSelect(tag)}
                  label={<Typography variant="h6">{tag} </Typography>}
                ></Chip>
                {index < projectTags.length - 1 ? (
                  <Typography variant="h6" marginLeft="2rem">
                    |
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            );
          })}
        </div>
      </Box>
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
              opacity: opacity.to({ range: [0.8, 1], output: [0.0, 1] }),
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
