import { GitHub, Star } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import ResumeHero from "../components/resume-hero";
import { experience } from "../config/resume/experience";
import { skills } from "../config/resume/skills";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { education } from "../config/resume/education";

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
            <Typography fontWeight="fontWeightMedium" variant="h4">
              Introduction:
            </Typography>
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
            <Box
              sx={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography variant="h5">My 2021</Typography>
              <GitHub />
            </Box>
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
          <Grid container spacing={2} wrap="nowrap" width="80%">
            <Grid item sx={{ flexGrow: 3 }}>
              <Typography
                variant="h4"
                fontWeight="fontWeightMedium"
                marginBottom="1rem"
              >
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
              <Divider sx={{ margin: "2rem" }} />
              <Typography
                variant="h4"
                fontWeight="fontWeightMedium"
                marginBottom="1rem"
              >
                Education
              </Typography>
              <Box>
                {Object.keys(education)
                  .reverse()
                  .map((school) => {
                    return (
                      <Box key={school} sx={{ paddingY: "0.75rem" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <Typography variant="h5">{school}</Typography>{" "}
                          <Typography variant="h6">
                            - {education[school].dates}
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="inherit">
                          {education[school].degree}
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography
                sx={{ textAlign: "end", fontWeight: "fontWeightMedium" }}
                variant="h4"
                marginBottom="1rem"
              >
                My Skills
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
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="fontWeightMedium"
                        marginBottom="0.3rem"
                      >
                        {category}
                      </Typography>
                      {Object.keys(skills[category]).map((skill) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "0.2rem",
                          }}
                          key={skill}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography paddingRight="0.3rem" variant="caption">
                              {skill}
                            </Typography>
                            {[...new Array(3)].map((a, index) => (
                              <>
                                {index <= skills[category][skill] - 1 ? (
                                  <Star
                                    fontSize="inherit"
                                    key={`${skill}-star-${index}`}
                                    sx={{ color: yellow[700] }}
                                  />
                                ) : (
                                  <StarBorderIcon
                                    fontSize="inherit"
                                    key={`${skill}-star-${index}`}
                                    sx={{ color: yellow[700] }}
                                  />
                                )}
                              </>
                            ))}
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
