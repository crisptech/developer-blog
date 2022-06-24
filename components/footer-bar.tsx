import { Box, IconButton } from "@mui/material";
import React from "react";
import { socials } from "../lib/socials";

const FooterBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "3rem",
        justifyContent: "center",
        marginBottom: "1em",
      }}
    >
      {Object.keys(socials).map((social) => {
        const { url, icon } = socials[social];
        return <IconButton href={url}>{icon}</IconButton>;
      })}
    </Box>
  );
};

export default FooterBar;
