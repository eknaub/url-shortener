import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Box, Drawer, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "../../shared/routes";
import useVisibilityHook from "../../hooks/useVisibilityHook";

export default function HamburgerMenu() {
  const { open, handleClickOpen, handleClose } = useVisibilityHook();
  const { t } = useTranslation();

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClickOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            aria-label="open url in browser"
            component="label"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Logo</Typography>
        </Box>
        <MenuItem onClick={handleClose} component={Link} to={AppRoutes.HOME}>
          {t("hamburgerMenuUserInput")}
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={AppRoutes.ADMIN}>
          {t("hamburgerMenuAdminMenu")}
        </MenuItem>
      </Drawer>
    </div>
  );
}
