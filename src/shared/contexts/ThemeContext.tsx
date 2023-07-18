"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Theme as iTheme,
  Snackbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { iChildren } from "../interfaces";
import {
  DarkTheme,
  LightTheme,
  NextAppDirEmotionCacheProvider,
} from "../themes";
import { useTheme } from "next-themes";

interface iThemeContextProps {
  theme: iTheme;
  smDown: boolean;
  mdDown: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleSucess: (msg: string) => void;
  handleError: (msg: string) => void;
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as iThemeContextProps);

export const AppThemeProvider = ({ children }: iChildren) => {
  const { resolvedTheme, setTheme } = useTheme();

  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (resolvedTheme) {
      if (resolvedTheme === "light") setThemeName("light");
      if (resolvedTheme === "dark") setThemeName("dark");
    }
  }, [resolvedTheme]);

  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;

    return DarkTheme;
  }, [themeName]);

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>();

  const toggleTheme = useCallback(() => {
    if (themeName === "light") setTheme("dark");
    if (themeName === "dark") setTheme("light");
  }, [themeName]);

  const handleSucess = useCallback((msg: string) => {
    setMessage(msg);
    setSeverity("success");
    setOpen(true);
  }, []);

  const handleError = useCallback((msg: string) => {
    setMessage(msg);
    setSeverity("error");
    setOpen(true);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (event) {
      /* empty */
    }
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        handleError,
        handleSucess,
        mdDown,
        setLoading,
        smDown,
        theme,
        loading,
        themeName,
        toggleTheme,
      }}
    >
      <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            width="100vw"
            height="100vh"
            bgcolor={theme.palette.background.default}
          >
            {children}
          </Box>
          <Backdrop
            sx={{
              color: theme.palette.secondary.main,
              zIndex: theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            anchorOrigin={
              mdDown
                ? { vertical: "bottom", horizontal: "center" }
                : { vertical: "top", horizontal: "right" }
            }
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(ThemeContext);
