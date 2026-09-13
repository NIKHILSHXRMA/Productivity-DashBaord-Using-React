import { createContext, useContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const THEMES = [
  // 1. Midnight Aurora
  {
    id: "midnight-aurora",
    name: "Midnight Aurora",
    bg: "#080B14",
    surface: "#121827",
    accent: "#8B5CF6",
    text: "#F8FAFC",
  },

  // 2. Graphite Lime
  {
    id: "graphite-lime",
    name: "Graphite Lime",
    bg: "#0B0D0C",
    surface: "#171B18",
    accent: "#B7F34A",
    text: "#F4F7F2",
  },

  // 3. Ocean Glass
  {
    id: "ocean-glass",
    name: "Ocean Glass",
    bg: "#06141F",
    surface: "#102B3A",
    accent: "#22D3EE",
    text: "#E6F9FF",
  },

  // 4. Royal Noir
  {
    id: "royal-noir",
    name: "Royal Noir",
    bg: "#100817",
    surface: "#24132F",
    accent: "#C084FC",
    text: "#FAF5FF",
  },

  // 5. Ember Studio
  {
    id: "ember-studio",
    name: "Ember Studio",
    bg: "#160B08",
    surface: "#2A1711",
    accent: "#FB923C",
    text: "#FFF7ED",
  },

  // 6. Arctic Minimal
  {
    id: "arctic-minimal",
    name: "Arctic Minimal",
    bg: "#EAF0F6",
    surface: "#FFFFFF",
    accent: "#2563EB",
    text: "#101828",
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("app_theme_id");

    return THEMES.find((theme) => theme.id === saved) || THEMES[0];
  });

  useEffect(() => {
    localStorage.setItem("app_theme_id", currentTheme.id);

    const root = document.documentElement;

    root.style.setProperty("--color-bg", currentTheme.bg);
    root.style.setProperty("--color-surface", currentTheme.surface);
    root.style.setProperty("--color-accent", currentTheme.accent);
    root.style.setProperty("--color-text", currentTheme.text);

    root.style.setProperty(
      "--color-border",
      `color-mix(in srgb, ${currentTheme.accent} 22%, transparent)`
    );

    root.style.setProperty(
      "--color-muted",
      `color-mix(in srgb, ${currentTheme.text} 62%, transparent)`
    );

    root.style.setProperty(
      "--color-glow",
      `color-mix(in srgb, ${currentTheme.accent} 15%, transparent)`
    );
  }, [currentTheme]);

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(
      (theme) => theme.id === currentTheme.id
    );

    const nextIndex = (currentIndex + 1) % THEMES.length;

    setCurrentTheme(THEMES[nextIndex]);
  };

  const setThemeById = (id) => {
    const selectedTheme = THEMES.find((theme) => theme.id === id);

    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        cycleTheme,
        setThemeById,
        themes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);