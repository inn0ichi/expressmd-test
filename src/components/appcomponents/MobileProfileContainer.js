import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import firebase from '../../config/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    getAuth,
    signOut,
} from "firebase/auth";
import '../../pages/App/Profile.css';
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const auth = getAuth();
const user = auth.currentUser;


function MobileProfileContainer() {

    const { t, i18n } = useTranslation()
    const history = useHistory();
    const db = firebase.firestore();
    const [userProfile, setuserProfile] = useState({
        profile: [],
    })
    const fetchList = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        userRef.get().then(doc => {
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
                localStorage.removeItem("uid");
                history.push("/");
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
                        <Box key={userProfile.uid}>
                            <Box color='primary' className='imgBox' key={userProfile.uid}>
                                <img className='usrImg' alt='user image' src={userProfile.photoURL} />
                                <Typography variant="h6">{userProfile.fullname}</Typography>
                                <Button variant='contained' onClick={() => history.push("/editprofile")}>Edit Profile</Button>
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            <Box>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => history.push("/history")}>
                                            <ListItemIcon>
                                                <EventIcon color="secondary" />
                                            </ListItemIcon>
                                            <ListItemText primary="History" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => history.push("/buycredits")}>
                                            <ListItemIcon>
                                                <AttachMoneyIcon color="secondary" />
                                            </ListItemIcon>
                                            <ListItemText primary={t("hotlines")} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => history.push("/faq")}>
                                            <ListItemIcon>
                                                <HelpIcon color="secondary" />
                                            </ListItemIcon>
                                            <ListItemText primary="FAQ" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => history.push("/aboutUs")}>
                                            <ListItemIcon>
                                                <PeopleIcon color="secondary" />
                                            </ListItemIcon>
                                            <ListItemText primary="About Us" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => history.push("/settings")}>
                                            <ListItemIcon>
                                                <SettingsIcon color="secondary" />
                                            </ListItemIcon>
                                            <ListItemText primary={t("settings")} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => logout()}>
                                            <ListItemIcon>
                                                <LogoutIcon color="secondary" />
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

        </Box >
    )
}

export default withRouter(MobileProfileContainer);