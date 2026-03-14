import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';
import { storageService } from '../services/storage/storage.service';
import { PersistenceStorageKey } from '../services/storage/PersistenceStorageKey';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    const storedLang =
      storageService.get<string>('local', PersistenceStorageKey.LANGUAGE) ||
      navigator.language.split('-')[0] ||
      'en';

    setLanguageState(storedLang);
    i18n.changeLanguage(storedLang);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    storageService.set('local', PersistenceStorageKey.LANGUAGE, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};
