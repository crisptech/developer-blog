import {
  Divider,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ColorModeContext } from "../context/colorModeContext";
import ColorModeSwitch from "./color-mode-switch";

import { useSpring, animated } from "react-spring";
import { grey } from "@mui/material/colors";

// const Sidebar = ({ show }) => {
//   const { left } = useSpring({
//     from: { left: "-100%" },
//     left: show ? "0" : "-100%"
//   });
//   return (
//     <animated.div style={{ left: left }} className="Sidebar">
//       <Items />
//     </animated.div>
//   );
// };

// export default Sidebar;V

type SideNavProps = {
  flexGrow: number;
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
};
const SideNav: React.FC<SideNavProps> = ({
  flexGrow,
  showSideBar,
  setShowSideBar,
}) => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const isSmPlus = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { left } = useSpring({
    from: { left: "-100%" },
    left: showSideBar ? "1.5%" : "-100%",
  });

  useEffect(() => {
    setShowSideBar(isSmPlus ? false : false);
  }, [isSmPlus]);

  return (
    <Box
      sx={{
        width: {
          md: "300px",
          sm: 0,
        },
        flexGrow: flexGrow,
        zIndex: 10,
        // backgroundColor: "red",
      }}
    >
      <animated.div
        style={{
          height: "95%",
          left: isSmPlus ? "1.5%" : left,
          //   backgroundColor: isSmPlus ? "red" : "blue",
          width: "300px",
          borderRadius: "25px",
          margin: "0.5rem",
          padding: "1rem",
          flexGrow: flexGrow,
          backgroundColor: grey[100],
          position: "fixed",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Typography
            align="center"
            variant="h4"
            sx={{ fontWeight: "fontWeightBold" }}
          >
            CrispTech
          </Typography>
          <ColorModeSwitch
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </Box>
      </animated.div>
    </Box>
  );
};

export default SideNav;
