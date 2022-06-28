import { Divider, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import ResumeHero from "../components/resume-hero";

const Resume = () => {
  return (
    <Container sx={{ marginTop: "3rem" }}>
      <ResumeHero />
      <Divider sx={{ marginY: "2rem" }} />
      <Typography variant="h5" marginBottom="1rem">
        My 2021
      </Typography>
      <Box margin="2rem">
        <GitHubCalendar username="crisptech" year={2021} />
      </Box>
    </Container>
  );
};

export default Resume;
