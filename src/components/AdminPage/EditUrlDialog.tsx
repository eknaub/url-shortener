import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, TextField, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import type { IUrlCreate } from "../../models/IUrl";
import { useState } from "react";
import useVisibilityHook from "../../hooks/useVisibilityHook";

interface EditDialogProps {
  url: IUrlCreate;
  handleClick: (url: IUrlCreate) => void;
}

export default function EditUrlDialog(props: Readonly<EditDialogProps>) {
  const [url, setUrl] = useState<IUrlCreate>({
    id: "",
    url: "",
    ttlInSeconds: 0,
  });
  const { t } = useTranslation();
  const { open, handleClickOpen, handleClose } = useVisibilityHook();

  const updateUrl = (field: string, value: string | number) => {
    setUrl((prevUrl) => ({
      ...prevUrl,
      [field]: value,
    }));
  };

  const openEditUrlDialog = () => {
    handleClickOpen();
    setUrl({
      id: props.url.id,
      url: props.url.url,
      ttlInSeconds: props.url.ttlInSeconds,
    });
  };

  const sendData = () => {
    handleClose();
    props.handleClick(url);
  };

  return (
    <div>
      <Tooltip title={t("editDialogEditTooltip")}>
        <IconButton
          color="primary"
          aria-label="edit url"
          component="label"
          onClick={openEditUrlDialog}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("editDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("editDialogText")}</DialogContentText>
          <TextField
            margin="dense"
            id="url"
            name="url"
            label="URL"
            type="text"
            defaultValue={props.url.url}
            fullWidth
            variant="standard"
            onChange={(e) => updateUrl(e.target.name, e.target.value)}
          />
          <TextField
            margin="dense"
            id="ttl"
            name="ttl"
            label="ttl"
            type="number"
            defaultValue={props.url.ttlInSeconds}
            fullWidth
            variant="standard"
            onChange={(e) => updateUrl(e.target.name, parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("editDialogCancel")}</Button>
          <Button onClick={sendData} autoFocus>
            {t("editDialogDelete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
