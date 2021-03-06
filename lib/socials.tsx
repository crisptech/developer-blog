import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import socialData from "../config/socials.json";
import { LinkedIn } from "@mui/icons-material";

type Socials = {
  [name: string]: {
    url: string;
    icon: React.ReactElement;
  };
};

export const socials: Socials = {
  twitter: {
    url: `https://www.twitter.com/${socialData.twitter}`,
    icon: <TwitterIcon />,
  },
  github: {
    url: `https://www.github.com/${socialData.github}`,
    icon: <GitHubIcon />,
  },
  linkedin: {
    url: `https://www.linkedin.com/${socialData.linkedin}`,
    icon: <LinkedIn />,
  },
};
