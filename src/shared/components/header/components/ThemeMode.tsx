"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { useAppThemeContext } from "@/shared/contexts";

export const ThemeMode = () => {
  const { themeName, toggleTheme } = useAppThemeContext();

  return (
    <button
      className="flex items-center h-5 bg-[#9baaaf1f] p-1 rounded-full"
      onClick={toggleTheme}
    >
      <div
        data-theme={themeName}
        className="flex items-center bg-primary data-[theme='light']:hover:text-secondary data-[theme='dark']:bg-transparent p-1 justify-center w-4 h-4 rounded-full"
      >
        <LightMode
          color={themeName === "light" ? "inherit" : "disabled"}
          sx={{ fontSize: themeName === "light" ? "90%" : "70%" }}
        />
      </div>
      <div
        data-theme={themeName}
        className="flex items-center bg-back-defaultDark data-[theme='dark']:hover:text-primary data-[theme='light']:bg-transparent p-1 justify-center w-4 h-4 rounded-full"
      >
        <DarkMode
          color={themeName === "dark" ? "inherit" : "disabled"}
          sx={{ fontSize: themeName === "dark" ? "90%" : "70%" }}
        />
      </div>
    </button>
  );
};
