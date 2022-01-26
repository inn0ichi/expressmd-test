import React, { useState } from 'react';
import { MenuItem, Button, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountModal from '../appcomponents/AccoundModal'
import { NavLink } from 'react-router-dom';
import Logo from "./icon-256x256.png";
import Logo2 from '../../assets/logo2.png'

function Nav() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img src={Logo} alt='logo' width={64} height={64} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <NavLink to='/'>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to='/faq'>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">FAQ</Typography>
                                </MenuItem>
                            </NavLink>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img src={Logo2} alt='logo2' width={64} height={50} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to='/'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to='/faq'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                FAQ
                            </Button>
                        </NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <AccountModal />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Nav;