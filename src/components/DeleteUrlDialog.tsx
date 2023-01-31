import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip} from '@mui/material';
import { useTranslation } from 'react-i18next';

type DeleteDialogProps = {
  id: string;
  handleClick: () => void;
}

export default function DeleteUrlDialog({id, handleClick}: DeleteDialogProps) {
  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title={t('deleteDialogDeleteTooltip')}>
        <IconButton color="primary" aria-label="delete url" component="label" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('deleteDialogTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('deleteDialogText', {urlId: id})}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('deleteDialogCancel')}</Button>
          <Button onClick={handleClick} autoFocus>{t('deleteDialogDelete')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}