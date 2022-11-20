import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') ?? 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
