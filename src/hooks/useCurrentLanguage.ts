import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useCurrentLanguage(initialLanguage: string) {
  const { i18n } = useTranslation();

  const updateLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const [language, setLang] = useState<string>(() => {
    updateLanguage(initialLanguage);
    return initialLanguage;
  });

  const setLanguage = (lang: string) => {
    setLang(lang);
    updateLanguage(lang);
  };

  return { language, setLanguage };
}
