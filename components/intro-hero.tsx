import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const IntroHero = () => {
  return (
    <Container
      sx={{
        display: "flex",
        gap: "0.3rem",
        marginBottom: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        src="/profile.jpg"
        sx={{ width: "48px", height: "48px", margin: "0.4rem" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <Typography variant="inherit" sx={{ fontWeight: "fontWeightMedium" }}>
          Personal blog of Tom Crisp.
        </Typography>
        <Typography variant="body2">
          explore code with me, one byte at a time.{" "}
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
    </Container>
  );
};

export default IntroHero;
