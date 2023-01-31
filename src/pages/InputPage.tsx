import * as React from 'react';
import { Box, Button, Container, IconButton, Input, Tooltip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useTranslation } from 'react-i18next';

export default function InputPage() {
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [inputUrl, setInputUrl] = React.useState("");

  const { t } = useTranslation();

  const handleShortenURL = React.useCallback(() => {
    let shorten: string = "https://urlshortener.smef.io/";

    var jsonData = {
      "url": inputUrl,
      "ttlInSeconds": 999999
    }

    fetch('https://urlshortener.smef.io/urls', {
      method: 'POST', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        setShortenedUrl(shorten + data.id);
      })
      .catch(error => {
          console.log(error)
      }
    )
  }, [inputUrl]);

  const handleURLTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setInputUrl(event.target.value);
  };

  return (
    <Container sx={{
      width: "100vw",
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "75px"
    }}
    >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px"
      }}
      >
        <TextField id="standard-basic" label="URL" variant="standard" onChange={handleURLTextfieldChange}/>
        <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleShortenURL}>
          {t('inputPageShortenButtonLabel')}
        </Button>
      </Box>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        }}
        >
        <Typography variant='h5'>
          {t('inputPageText')}
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}
        >
          <Input disabled value={shortenedUrl} placeholder="URL"/>
          <Tooltip title={t('inputPageTooltipCopy')}>
            <IconButton color="primary" aria-label="copy content" component="label" onClick={() => {navigator.clipboard.writeText(shortenedUrl)}}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('inputPageTooltipOpenInBrowser')}>
            <IconButton color="primary" aria-label="open url in browser" component="label" onClick={() => { window.open(shortenedUrl, '_blank'); }}>
              <OpenInBrowserIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Container>
  )
}