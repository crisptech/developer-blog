import type { AppProps } from "next/app";
import { wrapper } from "../app/store";
import { MouseEventHandler, useMemo, useState } from "react";
import { blue, blueGrey, grey, lightBlue } from "@mui/material/colors";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
  Box,
  IconButton,
  ThemeOptions,
} from "@mui/material";
import { ColorModeContext } from "../context/colorModeContext";
import { PaletteType } from "../lib/types/theme";
import SideNav from "../components/side-nav";
import MenuIcon from "@mui/icons-material/Menu";

const getDesignTokens = (mode: PaletteType): ThemeOptions => ({
  shape: {
    borderRadius: 25,
  },
  typography: {
    fontFamily: "'Rubik', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    button: {
      textTransform: "none",
    },
    fontWeightBold: 800,
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: grey,
          secondary: lightBlue,
          divider: grey[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: blueGrey,
          secondary: blue,
          divider: blueGrey[700],
          background: {
            default: blueGrey[900],
            paper: blueGrey[900],
          },
          text: {
            primary: "#fff",
            secondary: blueGrey[500],
          },
        }),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteType>("light");
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteType) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
      colorMode: mode,
    }),
    [mode]
  );

  const handleBurgerMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    setShowSideBar(!showSideBar);
  };

  let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <IconButton
          onClick={handleBurgerMenu}
          sx={{
            position: "fixed",
            margin: "1rem",
            width: "48px",
            height: "48px",
            top: 0,
            left: 0,
            display: {
              md: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <SideNav
            flexGrow={0}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
          />
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default wrapper.withRedux(MyApp);
