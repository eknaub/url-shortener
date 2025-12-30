import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { useTranslation } from "react-i18next";
import { useUrlStore } from "../stores/useUrlStore";
import { useState } from "react";

export default function InputPage() {
  const lastModifiedUrl = useUrlStore((state) => state.lastModifiedUrl);
  const [inputUrl, setInputUrl] = useState<string>(
    lastModifiedUrl.id !== "" ? lastModifiedUrl.url : ""
  );
  const handleShortenURL = useUrlStore((state) => state.handleShortenURL);
  const shortenedUrl = useUrlStore((state) => state.shortenedUrl);
  const { t } = useTranslation();

  const handleURLTextfieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputUrl(event.target.value);
  };

  return (
    <Container
      sx={{
        width: "100vw",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "75px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <TextField
          id="standard-basic"
          label="URL"
          variant="standard"
          value={inputUrl}
          onChange={handleURLTextfieldChange}
        />
        <Button
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          onClick={() => handleShortenURL(inputUrl)}
        >
          {t("inputPageShortenButtonLabel")}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography variant="h5">{t("inputPageText")}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Input disabled value={shortenedUrl} placeholder="URL" />
          <Tooltip title={t("inputPageTooltipCopy")}>
            <IconButton
              color="primary"
              aria-label="copy content"
              component="label"
              onClick={() => {
                navigator.clipboard.writeText(shortenedUrl);
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("inputPageTooltipOpenInBrowser")}>
            <IconButton
              color="primary"
              aria-label="open url in browser"
              component="label"
              onClick={() => {
                window.open(shortenedUrl, "_blank");
              }}
            >
              <OpenInBrowserIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Container>
  );
}
