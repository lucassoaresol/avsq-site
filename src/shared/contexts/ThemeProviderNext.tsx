"use client";

import { ThemeProvider } from "next-themes";
import { iChildren } from "../interfaces";

export const ThemeProviderNext = ({ children }: iChildren) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
