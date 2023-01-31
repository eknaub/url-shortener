import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

type EditDialogProps = {
  pId: string;
  pUrl: string;
  pTtl: number;
  handleClick: (id: string, url: string, ttl: number) => void;
}

export default function EditUrlDialog({pId, pUrl, pTtl, handleClick}: EditDialogProps) {
  const [id, setId] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [ttl, setTtl] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
    setId(pId);
    setUrl(pUrl);
    setTtl(pTtl);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    handleClose();
    handleClick(id, url, ttl);
  }

  const handleUrlTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setUrl(event.target.value);
  };

  const handleTtlTextfieldChange = function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setTtl(parseInt(event.target.value));
  };

  return (
    <div>
      <Tooltip title={t('editDialogEditTooltip')}>
        <IconButton color="primary" aria-label="edit url" component="label" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('editDialogTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('editDialogText')}
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="URL"
            type="text"
            defaultValue={url}
            fullWidth
            variant="standard"
            onChange={handleUrlTextfieldChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="ttl"
            type="number"
            defaultValue={ttl}
            fullWidth
            variant="standard"
            onChange={handleTtlTextfieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('editDialogCancel')}</Button>
          <Button onClick={sendData} autoFocus>{t('editDialogDelete')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}