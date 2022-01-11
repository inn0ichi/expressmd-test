import React, { useState } from 'react'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebase from "../../config/firebase";
import { useHistory, NavLink, withRouter } from "react-router-dom";

const auth = getAuth();

const provider = new GoogleAuthProvider();
const db = firebase.firestore();



function AccoundModal() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [usrExists, setusrExists] = useState(false);
    const history = useHistory();

    function GoogleLogin() {
        setAnchorElUser(null);
        history.push("/login");
    }

    getAuth().onAuthStateChanged(function (user) {
        setIsLoggedIn(user);
        if (user !== null && localStorage.getItem("uid") === null) {
            localStorage.setItem("uid", user.uid);
        }
    });


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("uid");
            })
            .catch((error) => {
                // An error happened.
                alert(error);
            });
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? (
                <Box >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="test" />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <NavLink to='/profile'>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                        </NavLink>
                        <MenuItem onClick={() => logout()}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            ) : (
                <Box >
                    <Tooltip title="Login">
                        <IconButton onClick={() => GoogleLogin()} sx={{ p: 0 }}>
                            <Avatar alt="Account Login" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}

export default withRouter(AccoundModal);