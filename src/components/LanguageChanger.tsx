import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';

export default function LanguageChanger() {
  const [language, setLanguage] = React.useState<string>(localStorage.getItem("lang") || 'en');

  const { i18n } = useTranslation();

  const changeLanguage = (
    event: React.MouseEvent<HTMLElement>,
    lang: string,
  ) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setLanguage(lang);
  };

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={changeLanguage}
      aria-label="language"
    >
      <ToggleButton value="de">
        DE
      </ToggleButton>
      <ToggleButton value="en">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}