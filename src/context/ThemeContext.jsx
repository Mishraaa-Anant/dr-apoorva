import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'theme-light',
  DARK: 'theme-dark',
  IVORY: 'theme-ivory',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('apoorva_theme');
    if (saved && Object.values(THEMES).includes(saved)) {
      return saved;
    }
    return THEMES.LIGHT;
  });

  useEffect(() => {
    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK, THEMES.IVORY);
    document.documentElement.classList.add(theme);
    localStorage.setItem('apoorva_theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    if (newTheme) {
      setTheme(newTheme);
    } else {
      setTheme((prev) => {
        if (prev === THEMES.LIGHT) return THEMES.DARK;
        if (prev === THEMES.DARK) return THEMES.IVORY;
        return THEMES.LIGHT;
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
