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
  const [warningMessage, setWarningMessage] = React.useState<string>("")
  const [openWarningSnackbar, setOpenWarningSnackbar] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState<boolean>(false);
  const user: string = process.env.REACT_APP_USER_NAME + ":" + process.env.REACT_APP_PASSWORD;  

  const { t } = useTranslation();

  React.useEffect(() => {
    //Context Api, set value if exists
    if(lastModifiedUrl.id !== "") {
      setInputUrl(lastModifiedUrl.url);
    }
  }, [lastModifiedUrl]);

  const handleShortenURL = () => {
    let shorten: string = "https://urlshortener.smef.io/";
    
    var jsonData = {
      "url": inputUrl,
      "ttlInSeconds": null
    }
    
    fetch('https://urlshortener.smef.io/urls', {
      method: 'POST', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa(user)}`,
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => {
        if(response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 500) {
          //Unknown error handling
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then(data => { 
        //if error exists show snackbar, else set data
        if(data.status) {
          if(data.invalidParams) {
            setWarningMessage(data.title + ": " + data.invalidParams[0].name + " " + data.invalidParams[0].reason);
          }
          else {
            setWarningMessage(data.title + ": " + data.detail);
          }
          setOpenWarningSnackbar(true);
        }
        else {
          setShortenedUrl(shorten + data.id);
          setUrl(data);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
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

  const handleWarningSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenWarningSnackbar(false);
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
      {warningMessage && 
        <Snackbar open={openWarningSnackbar} autoHideDuration={3000} onClose={handleWarningSnackbarClose}>
          <Alert severity="warning" onClose={handleWarningSnackbarClose}>{warningMessage}</Alert>
        </Snackbar>
      }
      {errorMessage && 
        <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleErrorSnackbarClose}>
          <Alert severity="error" onClose={handleErrorSnackbarClose}>{errorMessage}</Alert>
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