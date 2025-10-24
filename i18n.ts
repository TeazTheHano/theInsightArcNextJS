"use client"

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // lazy load namespace khi cần
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-US",
    // Chỉ preload common (dùng nhiều nơi: button, label...)
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      convertDetectedLanguage: (lng: string) => {
        if (lng.startsWith('vi')) return 'vi-VN';
        if (lng.startsWith('en')) return 'en-US';
        return 'en-US';
      },
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // cấu trúc file dịch
    },
    // Map browser language codes to our supported languages
    supportedLngs: ["en-US", "vi-VN"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
  });

export default i18n;

export const languageList: { [key: string]: string } = {
  "vi-VN": "Tiếng Việt",
  "en-US": "English",
};
