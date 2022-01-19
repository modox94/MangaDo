import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './ru.json';
import en from './en.json';

const resources = { ru, en };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({ resources, interpolation: { escapeValue: false } });

export default i18n;
