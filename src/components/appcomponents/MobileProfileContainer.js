import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import firebase from '../../config/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    getAuth,
    signOut,
} from "firebase/auth";
import '../../pages/App/Profile.css';

const auth = getAuth();
const user = auth.currentUser;


export default function MobileProfileContainer() {

    const db = firebase.firestore();
    const [userProfile, setuserProfile] = useState({
        profile: [],
    })
    const fetchList = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        userRef.get().then(doc => {
            console.log(doc.data());
            usrProfile.push(doc.data());
            setuserProfile({ profile: usrProfile });
        })
    }
    useEffect(() => {
        fetchList();
    }, []);

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("email");
                localStorage.removeItem("photoURL");
                localStorage.removeItem("uid");
                localStorage.removeItem("displayName");
            })
            .catch((error) => {
                // An error happened.
                alert(error);
            });
    };


    return (
        <Box className='profileContainer'>
            {
                userProfile && userProfile.profile.map((userProfile) => {
                    return (
                        <Box>
                            <Box className='imgBox' key={userProfile.uid}>
                                <img className='usrImg' alt='user image' src={userProfile.photoURL} />
                                <Typography variant="h6">{userProfile.fullname}</Typography>
                                <Button variant='contained'>Edit Profile</Button>
                            </Box>
                            <Box>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <EventIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="History" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <MedicalServicesIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Emergency Number" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <HelpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="FAQ" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="About Us" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => logout()}>
                                            <ListItemIcon>
                                                <LogoutIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>

                    )
                })
            }

        </Box>
    )
}
