import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

type AddDialogProps = {
  handleClick: (id: string, url: string, ttl: number) => void;
}

export default function AddUrlDialog({handleClick}: AddDialogProps) {
  const [id, setId] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [ttl, setTtl] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    //handleClose();
    handleClick(id, url, ttl);
  }
  
  const handleIdTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setId(event.target.value);
  };

  const handleUrlTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setUrl(event.target.value);
  };

  const handleTtlTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setTtl(parseInt(event.target.value));
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>Add new</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add new URL"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here you can add a new URL
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleIdTextfieldChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleUrlTextfieldChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="ttl"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleTtlTextfieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendData} autoFocus>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}