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
        gap: "2rem",
        justifyContent: "flex-end",
        marginTop: "3rem",
      }}
    >
      {Object.keys(socials).map((social) => {
        const { url, icon } = socials[social];
        return (
          <IconButton key={social} href={url}>
            {icon}
          </IconButton>
        );
      })}
    </Box>
  );
};

export default FooterBar;
