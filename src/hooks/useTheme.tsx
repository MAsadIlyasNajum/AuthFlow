/*
 * Created by Asad on 05 OCT 2025
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../theme';
import { STORAGE_KEYS } from '../constants/storage';

// ✅ Centralized Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type ThemeName = (typeof THEME)[keyof typeof THEME];

type ThemeCtx = {
  theme: typeof lightTheme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = React.createContext<ThemeCtx | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeName, setThemeNameState] = useState<ThemeName>(THEME.SYSTEM);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
        if (saved === THEME.LIGHT || saved === THEME.DARK || saved === THEME.SYSTEM) {
          setThemeNameState(saved as ThemeName);
        } else {
          setThemeNameState(THEME.SYSTEM);
        }
      } catch (e) {
        console.warn('ThemeProvider init error', e);
        setThemeNameState(THEME.SYSTEM);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const effectiveName = useMemo(() => {
    if (themeName === THEME.SYSTEM) return systemColorScheme === 'dark' ? THEME.DARK : THEME.LIGHT;
    return themeName;
  }, [themeName, systemColorScheme]);

  const theme = useMemo(() => (effectiveName === THEME.DARK ? darkTheme : lightTheme), [effectiveName]);

  const setThemeName = async (name: ThemeName) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, name);
    } catch (e) {
      console.warn('setThemeName error', e);
    }
    setThemeNameState(name);
  };

  const toggleTheme = async () => {
    const next = themeName === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    await setThemeName(next);
  };

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
