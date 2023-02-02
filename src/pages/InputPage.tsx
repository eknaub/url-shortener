import * as React from 'react';
import { Alert, Box, Button, Container, IconButton, Input, Snackbar, Tooltip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useTranslation } from 'react-i18next';
import { LastModifiedUrlContext, LastModifiedUrlContextType } from '../context/LastModifiedUrlContext';

export default function InputPage() {
  const [shortenedUrl, setShortenedUrl] = React.useState<string>("");
  const [inputUrl, setInputUrl] = React.useState<string>("");
  const { lastModifiedUrl, setLastModifiedUrl: setUrl } = React.useContext(LastModifiedUrlContext) as LastModifiedUrlContextType;
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState<boolean>(false);

  const { t } = useTranslation();

  React.useEffect(() => {
    //Context Api, set value if exists
    if(lastModifiedUrl.id !== "") {
      setInputUrl(lastModifiedUrl.url);
    }
  }, [lastModifiedUrl]);

  const handleShortenURL = async () => {
    let shorten: string = "https://urlshortener.smef.io/";

    var jsonData = {
      "url": inputUrl,
      "ttlInSeconds": null
    }

    await fetch('https://urlshortener.smef.io/urls', {
      method: 'POST', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => { 
        //if error exists show snackbar, else set data
        if(data.status) {
          if(data.invalidParams) {
            setErrorMessage(data.title + ": " + data.invalidParams[0].name + " " + data.invalidParams[0].reason);
          }
          else {
            setErrorMessage(data.title + ": " + data.detail);
          }
          setOpenErrorSnackbar(true);
        }
        else {
          setShortenedUrl(shorten + data.id);
          setUrl(data);
        }
      })
      .catch(error => {
          console.log(error);
      });
  };

  const handleURLTextfieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleErrorSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackbar(false);
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
      {errorMessage && 
        <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleErrorSnackbarClose}>
          <Alert severity="warning" onClose={handleErrorSnackbarClose}>{errorMessage}</Alert>
        </Snackbar>
      }
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px"
      }}
      >
        <TextField id="standard-basic" label="URL" variant="standard" value={inputUrl} onChange={handleURLTextfieldChange}/>
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