import * as React from 'react';
import { Box, Button, Container, IconButton, Input, Tooltip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

export default function InputPage() {
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
        <TextField id="standard-basic" label="URL" variant="standard" />
        <Button variant="contained" color="success" endIcon={<SendIcon />}>
          Shorten
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
          Shortened URL
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}
        >
          <Input disabled value="Set" />
          <Tooltip title="Copy">
            <IconButton color="primary" aria-label="copy content" component="label">
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open in browser">
            <IconButton color="primary" aria-label="open url in browser" component="label">
              <OpenInBrowserIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Container>
  )
}