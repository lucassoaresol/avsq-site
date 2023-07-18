import { iChildren } from "../interfaces";
import { AppThemeProvider } from "./ThemeContext";
import { ThemeProviderNext } from "./ThemeProviderNext";

const Providers = ({ children }: iChildren) => (
  <ThemeProviderNext>
    <AppThemeProvider>{children}</AppThemeProvider>
  </ThemeProviderNext>
);

export default Providers;
export { useAppThemeContext } from "./ThemeContext";
