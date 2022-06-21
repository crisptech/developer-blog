import { createContext } from "react";
import { PaletteType } from "../lib/types/theme";

type ColorModeContextType = {
  toggleColorMode: () => void;
  colorMode: PaletteType;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => "",
  colorMode: "light",
});
