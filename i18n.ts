import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const isClient = typeof window !== 'undefined';
export const I18N_NAMESPACES = ['common', 'blog', 'contact', 'dialog', 'inspiration', 'landingPage', 'term', 'toast'];

// KHU VỰC THAY ĐỔI: chỉ dùng HTTP backend và detector trong trình duyệt.
if (isClient) {
  i18n.use(HttpBackend).use(LanguageDetector);
}

export const i18nReady = i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ['en-US', 'vi-VN'],
    fallbackLng: 'en-US',
    ns: I18N_NAMESPACES,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: isClient ? {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    } : undefined,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
