import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useCurrentLanguage from "../../hooks/useCurrentLanguage";

export default function LanguageChanger() {
  const { language, setLanguage } = useCurrentLanguage(
    localStorage.getItem("lang") || "en"
  );

  return (
    <ToggleButtonGroup value={language} exclusive aria-label="language">
      <ToggleButton value="de" onClick={() => setLanguage("de")}>
        DE
      </ToggleButton>
      <ToggleButton value="en" onClick={() => setLanguage("en")}>
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
