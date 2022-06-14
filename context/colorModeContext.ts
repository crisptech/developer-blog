import { createContext, SetStateAction } from "react";
import { PaletteType } from "../types/theme";

type ColorModeContextType = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => "",
});
