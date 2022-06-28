import { Star } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import ResumeHero from "../components/resume-hero";
import { experience } from "../config/resume/experience";
import { skills } from "../config/resume/skills";

const Resume = () => {
  return (
    <Container sx={{ marginTop: "3rem" }}>
      <ResumeHero />
      <Divider sx={{ marginY: "2rem" }} />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          margin="2rem"
        >
          <Box
            sx={{ display: "flex", marginX: "10%", flexDirection: "column" }}
          >
            <Typography variant="h5">Introduction:</Typography>
            <Typography variant="body1">
              I am an enthusiastic, self-motivated, reliable, responsible and
              hard working person. I am a mature team worker and adaptable to
              all challenging situations. I am able to work well both in a team
              environment as well as using own initiative. I am able to work
              well under pressure and adhere to strict deadlines.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          margin="2rem"
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" marginBottom="1rem">
              My 2021
            </Typography>
            <GitHubCalendar username="crisptech" year={2021} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          margin="2rem"
        >
          <Grid container spacing={2} width="100%">
            <Grid item sx={{ flexGrow: 3 }}>
              <Typography variant="h5" marginBottom="1rem">
                Experience
              </Typography>
              <Box>
                {Object.keys(experience)
                  .reverse()
                  .map((company) => {
                    return (
                      <Box key={company}>
                        <Typography variant="h5">{company}</Typography>
                        {}
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography
                sx={{ textAlign: "end" }}
                variant="h5"
                marginBottom="1rem"
              >
                Skills
              </Typography>
              <Box>
                {Object.keys(skills).map((category) => {
                  return (
                    <Box
                      key={category}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography variant="body2">{category}</Typography>
                      {Object.keys(skills[category]).map((skill) => (
                        <Box sx={{ display: "flex" }} key={skill}>
                          <Box>
                            <Typography variant="caption">{skill}</Typography>
                            {[...new Array(skills[category][skill])].map(
                              (a, index) => (
                                <Star
                                  fontSize="inherit"
                                  key={`${skill}-star-${index}`}
                                  sx={{ color: yellow[500] }}
                                />
                              )
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Resume;
