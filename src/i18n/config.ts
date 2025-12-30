import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/translations.json";
import deTranslations from "./locales/de/translations.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: localStorage.getItem("lang") || "en",
  resources: {
    en: {
      translations: enTranslations,
    },
    de: {
      translations: deTranslations,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "de"];

export default i18n;
