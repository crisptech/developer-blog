import type { AppProps } from "next/app";
import { wrapper } from "../app/store";
import { useMemo, useState } from "react";
import { blueGrey, grey } from "@mui/material/colors";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  AppBar,
  responsiveFontSizes,
  Typography,
} from "@mui/material";
import { ColorModeContext } from "../context/colorModeContext";
import { PaletteType } from "../lib/types/theme";
import NavBar from "../components/nav-bar";
import FooterBar from "../components/footer-bar";

const getDesignTokens = (mode: PaletteType) => ({
  shape: {
    borderRadius: 25,
  },
  typography: {
    fontFamily: ["'Rubik', sans-serif"],
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: grey,
          divider: grey[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: blueGrey,
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

  let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <CssBaseline />
        <Component {...pageProps} />
        <FooterBar />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default wrapper.withRedux(MyApp);
