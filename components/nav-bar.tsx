import { AppBar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import { ColorModeContext } from "../context/colorModeContext";
import ColorModeSwitch from "./color-mode-switch";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      enableColorOnDark
      color="primary"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingX: "12%",
        backgroundColor: colorMode === "light" ? grey[300] : grey[700],
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h6">CrispTech</Typography>
      <ColorModeSwitch
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />
    </AppBar>
  );
};

export default NavBar;
