import { createContext } from "react";

type ColorModeContextType = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => "",
});
