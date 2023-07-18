import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export const DarkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#B51200",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#F4A900",
        contrastText: "#FFFFFF",
      },
      background: { default: "#39393a", paper: "#161618" },
    },
    typography: {
      allVariants: {
        color: "white",
      },
    },
  },
  ptBR
);
