import * as React from "react";
import { useTranslation } from 'react-i18next';

export default function useCurrentLanguage(initialLanguage: string) {
  const [language, setLang] = React.useState<string>(initialLanguage);
  const { i18n } = useTranslation();

  React.useEffect(() => {
    setLanguage(initialLanguage);
  }, []);

  const setLanguage = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return {language, setLanguage};
};