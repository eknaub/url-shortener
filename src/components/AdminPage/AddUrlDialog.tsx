import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { IUrlCreate } from "../../models/IUrl";
import useVisibilityHook from "../../hooks/useVisibilityHook";

interface AddDialogProps {
  handleClick: (url: IUrlCreate) => void;
}

export default function AddUrlDialog(props: Readonly<AddDialogProps>) {
  const [url, setUrl] = useState<IUrlCreate>({
    id: "",
    url: "",
    ttlInSeconds: 0,
  });
  const { open, handleClickOpen, handleClose } = useVisibilityHook();
  const { t } = useTranslation();

  const updateUrl = (field: string, value: string | number) => {
    setUrl((prevUrl) => ({
      ...prevUrl,
      [field]: value,
    }));
  };

  const sendData = () => {
    handleClose();
    props.handleClick(url);
    setUrl({ id: "", url: "", ttlInSeconds: 0 });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {t("addDialogAddNew")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("addDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("addDialogText")}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            name="id"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => updateUrl(e.target.name, e.target.value)}
          />
          <TextField
            margin="dense"
            id="url"
            name="url"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => updateUrl(e.target.name, e.target.value)}
          />
          <TextField
            margin="dense"
            id="ttlInSeconds"
            name="ttlInSeconds"
            label="ttl"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => updateUrl(e.target.name, e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("addDialogCancel")}</Button>
          <Button onClick={sendData} autoFocus>
            {t("addDialogAdd")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
