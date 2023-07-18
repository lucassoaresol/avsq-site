import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export const LightTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#B51200",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#F4A900",
        contrastText: "#FFFFFF",
      },
      background: { default: "#f3f3f3", paper: "#FFFFFF" },
    },
  },
  ptBR
);
