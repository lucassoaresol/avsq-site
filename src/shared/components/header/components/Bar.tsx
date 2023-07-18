import { AppBar, Box, Container, Theme, Toolbar } from "@mui/material";
import { Options } from "./Options";
import { ThemeMode } from "./ThemeMode";
import Image from "next/image";

interface iBarProps {
  postion: "fixed" | "static";
  themeName: "light" | "dark";
  theme: Theme;
  mdDown: boolean;
}

export const Bar = ({ postion, theme, themeName, mdDown }: iBarProps) => {
  return (
    <AppBar
      position={postion}
      sx={{
        zIndex: 2000,
        bgcolor:
          themeName === "light"
            ? theme.palette.primary.main
            : theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Image
              src="/logo.png"
              width={100}
              height={45}
              alt="A Voz de Santa Quitéria"
            />
            {!mdDown && <Options />}
          </Box>
          <Box>
            <ThemeMode />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
