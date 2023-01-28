import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Box, Drawer, Typography } from '@mui/material';

export default function HamburgerMenu() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
        }}
        >
          <IconButton color="primary" aria-label="open url in browser" component="label" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>Logo</Typography>
        </Box>
        <MenuItem 
          onClick={handleClose}
          component={Link} to="/"
        >
          Input
          </MenuItem>
        <MenuItem 
          onClick={handleClose}
          component={Link} to="/admin"
        >
          Admin menu
        </MenuItem>
      </Drawer>
    </div>
  );
}