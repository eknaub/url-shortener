import { Alert, Snackbar } from "@mui/material";
import { useMessageStore } from "../../stores/useMessageStore";

function CustomSnackbar() {
  const isOpen = useMessageStore((state) => state.isOpen);
  const message = useMessageStore((state) => state.message);
  const severity = useMessageStore((state) => state.severity);
  const hideSnackbar = useMessageStore((state) => state.hideSnackbar);

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={hideSnackbar}>
      <Alert severity={severity} onClose={hideSnackbar}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
