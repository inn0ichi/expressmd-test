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

const auth = getAuth();
const provider = new GoogleAuthProvider();
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function googleLogin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export default function AccoundModal() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isLoggedin, setIsLoggedIn] = useState(false);


    const logout = (e) => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("email");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    getAuth().onAuthStateChanged(function (user) {
        setIsLoggedIn(user);
        if (user !== null) {
            localStorage.setItem("email", user.email);
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

    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? (
                <Box >
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            ) : (
                <Box >
                    <Tooltip title="Open settings">
                        <IconButton onClick={() => googleLogin()} sx={{ p: 0 }}>
                            <Avatar alt="Account Login" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}
