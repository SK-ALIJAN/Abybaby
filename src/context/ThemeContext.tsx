import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { storageService } from "../services/storage/storage.service";
import { PersistenceStorageKey } from "../services/storage/PersistenceStorageKey";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Detect system dark mode
  const isSystemDark = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  const [theme, setThemeState] = useState<Theme>("light");

  // Load initial theme
  useEffect(() => {
    const storedTheme =
      storageService.get<Theme>(
        "local",
        PersistenceStorageKey.THEME
      );

    if (storedTheme) {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      const systemTheme: Theme = isSystemDark
        ? "dark"
        : "light";

      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  // Sync with system theme (only if user didn't override)
  useEffect(() => {
    const storedTheme =
      storageService.get<Theme>(
        "local",
        PersistenceStorageKey.THEME
      );

    if (!storedTheme) {
      const systemTheme: Theme = isSystemDark
        ? "dark"
        : "light";

      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
  }, [isSystemDark]);

  const applyTheme = (value: Theme) => {
    document.documentElement.setAttribute(
      "data-theme",
      value
    );
  };

  const setTheme = (value: Theme) => {
    setThemeState(value);

    storageService.set(
      "local",
      PersistenceStorageKey.THEME,
      value
    );

    applyTheme(value);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};
