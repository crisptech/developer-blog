import {
  Divider,
  IconButton,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ColorModeContext } from "../context/colorModeContext";
import ColorModeSwitch from "./color-mode-switch";
import CloseIcon from "@mui/icons-material/Close";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import CodeIcon from "@mui/icons-material/Code";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useSpring, animated } from "react-spring";
import { blueGrey, grey } from "@mui/material/colors";
import { useOutsideAlerter } from "./outside-alerter";
import FooterBar from "./footer-bar";

//TODO: still need to fix the side bar not drawing when manually interacting with it in mobile mode

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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, showSideBar, setShowSideBar);

  const springState = useMemo(
    () => ({
      from: { left: "-100%" },
      left: showSideBar ? "1.5%" : "-100%",
    }),
    [showSideBar]
  );

  const { left } = useSpring(springState);

  useEffect(() => {
    setShowSideBar(false);
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
      }}
    >
      <animated.div
        style={{
          height: "95%",
          left: isSmPlus ? "1.6%" : left,
          width: "300px",
          borderRadius: "25px",
          margin: "0.5rem",
          padding: "1rem",
          top: "1.5%",
          flexGrow: flexGrow,
          backgroundColor: colorMode === "light" ? grey[100] : blueGrey[700],
          position: "fixed",
        }}
        ref={wrapperRef}
      >
        <Box
          sx={{
            display: "flex",
            marginBottom: "2rem",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
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
          <IconButton
            onClick={() => setShowSideBar(!showSideBar)}
            sx={{
              display: { sm: "flex", md: "none" },
              width: "20px",
              height: "20px",
              padding: "0.2rem",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
            gap: "1rem",
            marginRight: "3rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <RssFeedIcon />
            <Typography variant="h6">blog</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <CodeIcon />
            <Typography variant="h6">projects</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <ContactPageIcon />
            <Typography variant="h6">resume</Typography>
          </Box>
          <Divider sx={{ marginBottom: "2rem" }} />
          <FooterBar />
        </Box>
      </animated.div>
    </Box>
  );
};

export default SideNav;
