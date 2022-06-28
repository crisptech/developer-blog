import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";
import GitHubIcon from "@mui/icons-material/GitHub";
import { animated, useSpring } from "react-spring";

const ProjectsHero = () => {
  const AnimatedContainer = animated(Container);
  const [state, toggle] = React.useState(false);

  useEffect(() => {
    toggle(true);
  }, []);

  const animatedStyles = useSpring({
    from: { opacity: 0, marginBottom: 800 },
    to: { opacity: 1, marginBottom: 0 },
    delay: 100,
    config: { duration: 300 },
    x: state ? 1 : 0,
  });

  return (
    <AnimatedContainer
      sx={{
        display: "flex",
        gap: "0.3rem",
        marginBottom: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
      style={{
        ...animatedStyles,
      }}
    >
      <DataObjectIcon
        sx={{ width: "48px", height: "48px", margin: "0.4rem" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <Typography variant="h5" sx={{ fontWeight: "fontWeightMedium" }}>
          Personal projects
        </Typography>
        <Typography variant="body1">
          Some of my personal and professional work.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          source code {"   "}
          <IconButton
            sx={{
              width: "15px",
              height: "15px",
              marginLeft: "0.2rem",
              marginTop: "-0.2rem",
              color: "text.secondary",
            }}
            href="https://github.com/crisptech"
          >
            <GitHubIcon sx={{ width: "15px", height: "15px" }} />
          </IconButton>
        </Typography>
      </Box>
    </AnimatedContainer>
  );
};

export default ProjectsHero;
