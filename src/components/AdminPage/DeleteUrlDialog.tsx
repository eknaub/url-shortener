import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import useVisibilityHook from "../../hooks/useVisibilityHook";

interface DeleteDialogProps {
  id: string;
  handleClick: () => void;
}

export default function DeleteUrlDialog(props: Readonly<DeleteDialogProps>) {
  const { t } = useTranslation();
  const { open, handleClickOpen, handleClose } = useVisibilityHook();

  return (
    <div>
      <Tooltip title={t("deleteDialogDeleteTooltip")}>
        <IconButton
          color="primary"
          aria-label="delete url"
          component="label"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("deleteDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("deleteDialogText", { urlId: props.id })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("deleteDialogCancel")}</Button>
          <Button onClick={props.handleClick} autoFocus>
            {t("deleteDialogDelete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
