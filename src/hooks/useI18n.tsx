/*
 * Created by Asad on 04 OCT 2025
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import i18n from '../i18n';

// ✅ Centralized
export const LANGUAGE = {
  EN: 'en',
  BM: 'bm'
} as const;

export type LanguageName = (typeof LANGUAGE)[keyof typeof LANGUAGE];

type I18nCtx = {
  t: typeof i18n.t;
  lang: string;
  setLang: (lang: LanguageName) => Promise<void>;
};

const I18nContext = createContext<I18nCtx | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<string>(i18n.language || LANGUAGE.EN);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
        const initial = (saved as LanguageName) || i18n.language || LANGUAGE.EN;
        await i18n.changeLanguage(initial);
        setLangState(initial);
      } catch (e) {
        console.warn('I18nProvider init error', e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setLang = async (l: LanguageName) => {
    await i18n.changeLanguage(l);
    setLangState(l);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, l);
    } catch (e) {
      console.warn('setLang error', e);
    }
  };

  if (!ready) return null; // don't render until language is set (avoids flicker / mixed strings)

  return <I18nContext.Provider value={{ t: i18n.t.bind(i18n), lang, setLang }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
};
