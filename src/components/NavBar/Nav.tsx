import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HamburgerMenu from './HambugerMenu';
import Logo from './Logo';
import UserMenu from './UserMenu'
import LanguageChanger from './LanguageChanger';

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:"white", color:"black"}}>
        <Toolbar>
          <HamburgerMenu/>
          <Logo/>
          <LanguageChanger/>
          <UserMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}