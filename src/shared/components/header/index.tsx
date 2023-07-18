"use client";

import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useAppThemeContext } from "@/shared/contexts";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Bar } from "./components/Bar";

export const Header = () => {
  const { mdDown, themeName, theme } = useAppThemeContext();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showBarFixed, setShowBarFixed] = useState(false);

  useEffect(() => {
    if (window)
      window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
          setShowTopBtn(true);
          if (window.scrollY > 60) setShowBarFixed(true);
        } else {
          setShowTopBtn(false);
          setShowBarFixed(false);
        }
      });

    return () => {
      if (window)
        window.removeEventListener("scroll", () => {
          goToTop();
        });
    };
  }, []);

  const goToTop = () => {
    if (window) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Bar
        mdDown={mdDown}
        postion="static"
        theme={theme}
        themeName={themeName}
      />
      {showBarFixed && (
        <Bar
          mdDown={mdDown}
          postion="fixed"
          theme={theme}
          themeName={themeName}
        />
      )}
      {showTopBtn && (
        <Fab
          sx={{ position: "absolute", bottom: 15, right: 25 }}
          size="medium"
          color="primary"
          onClick={goToTop}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </>
  );
};
