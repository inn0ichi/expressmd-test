import { Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem, Typography } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation } from "react-router-dom";
import {
    getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut
} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from "@mui/material/InputAdornment";
import WcIcon from '@mui/icons-material/Wc';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';

import './Registration.css';

var md5 = require("md5");
const auth = getAuth();


function UserRegistration() {
    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        let isSubscribed = true;
        dispatch(getTheme());
        return () => {
            isSubscribed = false;
        };
    }, [dispatch]);
    const db = firebase.firestore();
    const store = firebase.storage();
    const history = useHistory();
    const [payload, setPayload] = useState({
        fullname: "",
        email: localStorage.getItem("email"),
        gender: "",
        uid: localStorage.getItem("uid"),
        phoneNumber: "",
        houseNum: "",
        municipality: "",
        barangay: "",
    });
    var batch = db.batch();

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const [field, setField] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };
    const completeProfile = (e) => {
        if (
            !payload.fullname ||
            !payload.gender ||
            !payload.phoneNumber ||
            !payload.houseNum ||
            !payload.municipality ||
            !payload.barangay
        ) {

            setField(true)
        } else {
            firebase.auth().createUserWithEmailAndPassword(location.state.email, location.state.password)
                .then((userCredential) => {
                    // Signed in 
                    const userRef = db.collection("users").doc(localStorage.getItem("uid"));
                    var user = userCredential.user;
                    user.sendEmailVerification();

                    var random = md5(Date.now());

                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("email", location.state.email);
                    batch.set(userRef, {
                        fullname: payload.fullname,
                        email: location.state.email,
                        gender: payload.gender,
                        uid: localStorage.getItem("uid"),
                        phoneNumber: payload.phoneNumber,
                        coins: 0,
                        location: payload.houseNum + " " + payload.barangay + ", " + payload.municipality,
                        photoURL: `http://www.gravatar.com/avatar/${random}?d=identicon`,
                    })

                    batch.commit().then((doc) => {
                        firebase.database().ref('users/' + localStorage.getItem("uid")).set({
                            message: "Welcome To ExpressMD"
                        }).then((doc6) => {
                            history.push(`/success/${"verifyemail"}`);
                        })
                    })
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    if (errorCode == "auth/email-already-in-use") {
                        alert("Email already exists.")
                    }
                    if (errorCode == "auth/invalid-password") {
                        alert("Password must be 6 characters or more.")
                    }
                });
        }
    };

    const style = {
        textHelp: {
            color: "red"
        },
        labelCon: {
            marginTop: "20px",
            marginLeft: "10px",
        },
        label: {
            color: "#808080",
            fontSize: "30px",
        },
        completeBtn: {
            width: "350px",
            height: "40px",
            borderRadius: "4px",
            marginTop: "10px"
        },
        uploadBtn: {
            width: "80px",
            padding: "10px",
            backgroundColor: "#2C84FF",
            textAlign: "center",
            borderRadius: "10px",
            color: "white"
        },
        textInput: {
            [`& fieldset`]: {
                borderRadius: 4,
            },

        },

    }
    return (
        <Box className='base'>
            <Container className='registerContainer'>
                {/*<Typography variant="h5">Complete Your Profile</Typography>*/}
                <Box className='formContainer'>
                    {/* <Box className='imgContainer'>
                        <img className='usrImg' alt='profileImg' src={localStorage.getItem("photoURL")} />
                    </Box> */}
                    <FormGroup>
                        {/* <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                                <IconButton color="primary" aria-label="upload picture">
                                    <Avatar src={file} sx={{ width: 128, height: 128 }} />
                                </IconButton>
                                <Box sx={style.uploadBtn}>
                                    <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} style={{ display: "none" }} />
                                    <label for="icon-button-file">Upload</label>
                                </Box>

                            </Box>

                        </FormControl> */}
                        <Box sx={style.labelCon}>
                            <Typography sx={style.label}>Personal Details</Typography>

                        </Box>

                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>

                            <TextField
                                sx={style.textInput}
                                required
                                autoComplete='off'
                                id="filled-required"
                                placeholder='Fullname'
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={userInput("fullname")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <InputLabel sx={{ color: '#BEBEBE' }} >Gender</InputLabel>

                            <Select

                                sx={style.textInput}
                                id='gender'
                                label="Gender"
                                value={'Male'}
                                onChange={userInput("gender")}
                                value={payload.gender}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others/Prefer not to say</MenuItem>
                            </Select>
                            {/* <FormHelperText sx={style.textHelp}>*Required</FormHelperText> */}
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                autoComplete='off'
                                sx={style.textInput}
                                id="filled-required"
                                placeholder='Phone Number'
                                variant="outlined"
                                type="tel"
                                pattern="[0-9]"
                                inputProps={{ maxLength: 11, minLength: 11 }}
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhoneIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={userInput("phoneNumber")}
                                value={payload.phoneNumber}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                sx={style.textInput}
                                required
                                id="filled-required"
                                placeholder="House # and Street"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={userInput("houseNum")}
                                value={payload.houseNum}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                sx={style.textInput}
                                required
                                id="filled-required"
                                placeholder="Barangay"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={userInput("barangay")}
                                value={payload.barangay}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" }}>
                            <InputLabel sx={{ color: '#BEBEBE' }} >Municipality</InputLabel>
                            <Select
                                sx={style.textInput}
                                id='Municipality'
                                label="Municipality *"
                                value={'Bustos'}
                                onChange={userInput("municipality")}
                                value={payload.municipality}
                            >
                                <MenuItem value={'Angat'}>Angat</MenuItem>
                                <MenuItem value={'Bustos'}>Bustos</MenuItem>
                                <MenuItem value={'Baliuag'}>Baliuag</MenuItem>
                            </Select>
                            <FormHelperText sx={style.textHelp}>
                                {field ? "Please fill out all of the fields" : ""}
                            </FormHelperText>
                            <FormHelperText>This app is only available for people in Angat, Bustos, and Baliuag.</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => completeProfile()} variant='outlined'
                                sx={style.completeBtn}
                            >Complete</Button>

                            <FormHelperText>By clicking complete, you agree to the <a href='https://www.privacypolicygenerator.info/live.php?token=qxg7w5ox5MIZLtbZCpzBdZkHNcwnn57s' target="_blank">Privacy Policy</a>.</FormHelperText>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(UserRegistration);