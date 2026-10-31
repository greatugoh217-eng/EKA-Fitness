/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme, COLOR_THEMES, DEFAULT_THEME_ID } from '../data/themeConfig';

interface ThemeContextType {
  currentTheme: ColorTheme;
  themeId: string;
  setThemeId: (id: string) => void;
  allThemes: ColorTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('eka_color_theme');
      return saved && COLOR_THEMES[saved] ? saved : DEFAULT_THEME_ID;
    } catch {
      return DEFAULT_THEME_ID;
    }
  });

  const setThemeId = (id: string) => {
    if (COLOR_THEMES[id]) {
      setThemeIdState(id);
      try {
        localStorage.setItem('eka_color_theme', id);
      } catch (e) {
        console.error('Failed to save theme', e);
      }
    }
  };

  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES[DEFAULT_THEME_ID];

  // Also apply CSS custom properties to :root for instant global styling
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-accent-hover', currentTheme.accentHover);
    root.style.setProperty('--theme-secondary', currentTheme.secondaryAccent);
    root.style.setProperty('--theme-glow', currentTheme.glowColor);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setThemeId,
        allThemes: Object.values(COLOR_THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
