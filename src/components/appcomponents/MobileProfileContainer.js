import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import firebase from '../../config/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Coin from "../../assets/kindpng_7166529.png"
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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            localStorage.setItem("uid", uid);
            // ...
        } else {
            // User is signed out
            // ...
            history.push("/login");
        }
    });

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
    }, [userProfile]);

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("uid");
                localStorage.removeItem("email");
                history.push("/");
            })
            .catch((error) => {
                // An error happened.
                alert(error);
            });
    };

    useEffect(() => {
        let isSubscribed = true;
        getAuth().onAuthStateChanged(function (user) {
            if (!user.emailVerified) {
                signOut(auth)
                    .then(() => {
                        localStorage.removeItem("uid");
                        localStorage.removeItem("email");
                        history.push(`/success/${"unverified"}`);
                    })
                    .catch((error) => {
                        // An error happened.
                        alert(error);
                    });

            }
        });
        return () => {
            isSubscribed = false;
        };
    }, []);


    const style = {
        userProf: {
            height: "150px",
            width: "150px",
            borderRadius: "180px",
            marginBottom: "20px"
        },
        coinLogo: {
            width: "30px",
            height: "30px"
        },
        coinContainer: {
            display: "flex",
            flexDirection: "row",
            justifycontent: "center",
            alignItems: "center",
            marginBottom: "10px"

        },
        coinLabel: {
            display: "flex",
            fontSize: "18px",
            alignItems: "center",
            marginLeft: "5px"
        },
    }



    return (
        <Box className='profileContainer'>
            {
                userProfile && userProfile.profile.map((userProfile) => {
                    return (
                        <Box key={userProfile.uid}>
                            <Box color='primary' className='imgBox' key={userProfile.uid}>
                                <Box component="img" alt='user image' src={userProfile.photoURL} sx={style.userProf} />
                                <Typography variant="h6">{userProfile.fullname}</Typography>
                                <Box sx={style.coinContainer}>
                                    <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
                                    <Typography sx={style.coinLabel} variant="subtitle1">{userProfile.coins}</Typography>
                                </Box>
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