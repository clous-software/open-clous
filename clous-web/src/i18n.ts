// src/i18n.ts
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enHeroHome from './messages/en-UK.herohome.json'; // Import your message files
// Import other language message files as needed
const resources = {
  en: {
    translation: {
      herohome: enHeroHome, // Map your message files to namespaces
      // Add other namespaces as needed
    },
  },
  // Add other languages and their respective message files
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
