import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Chip } from "@mui/material";
import Image from "next/image";
import { Project } from "../lib/types/projects";
import Link from "next/link";

type ProjectCardProps = {
  projectData: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  console.log("project card");
  return (
    <Link href={`/projects/${projectData.id}`}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 600,
          padding: "2rem",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Image
                alt="complex"
                layout="fill"
                src={`/${projectData.image}`}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs marginRight="1rem">
                <Typography gutterBottom variant="subtitle1" component="div">
                  {projectData.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {projectData.description}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  display: "flex",
                  gap: "1em",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {projectData.tags.map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={<Typography variant="caption">{tag}</Typography>}
                      size="small"
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};

export default ProjectCard;
