import { AppBar, Button, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../context/colorModeContext";
import ColorModeSwitch from "./color-mode-switch";

const helloStrings = [
  "Hello!",
  "你好！",
  "Bonjour!",
  "Привет!",
  "नमस्ते!",
  "¡Hola!",
  "Hallå!",
  "مرحبًا!",
  "Ciao!",
  "Hallo!",
  "Здраво!",
  "สวัสดี!",
];

const NavBar = () => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const [helloStringIndex, setHelloStringIndex] = useState<number>(0);

  useEffect(() => {
    const helloInterval = setInterval(() => {
      setHelloStringIndex(
        helloStringIndex < helloStrings.length - 1 ? helloStringIndex + 1 : 0
      );
    }, 5000);
    return () => clearInterval(helloInterval);
  }, [helloStringIndex]);

  return (
    <AppBar
      position="static"
      enableColorOnDark
      color="primary"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingX: "12%",
        backgroundColor: colorMode === "light" ? grey[100] : blueGrey[900],
        marginBottom: "1rem",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontWeight: "fontWeightBold" }}
          variant="h6"
          marginRight="0.5rem"
        >
          CrispTech{" "}
        </Typography>
        <Typography variant="h6">👋</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          margin: "0.2rem",
        }}
      >
        <Link href="/resume">
          <Button color="primary" size="small">
            <Typography variant="inherit">resume</Typography>
          </Button>
        </Link>
        <Link href="/projects">
          <Button color="primary" size="small">
            <Typography variant="inherit">projects</Typography>
          </Button>
        </Link>
      </Box>
      <ColorModeSwitch
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />
    </AppBar>
  );
};

export default NavBar;
