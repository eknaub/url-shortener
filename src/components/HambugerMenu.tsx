import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function HamburgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
        <Menu
          id="hamburger-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
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
      </Menu>
    </div>
  );
}