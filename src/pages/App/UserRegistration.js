import { Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import {
    getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut
} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import { IconButton } from '@mui/material';

import './Registration.css';
const auth = getAuth();


function UserRegistration() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
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

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    getAuth().onAuthStateChanged(function (user) {
        var userRef = db.collection("users").doc(localStorage.getItem('uid'));
        userRef.get().then((doc) => {
            if (doc.exists) {
                history.push("/");
            }
        })
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };
    const completeProfile = (e) => {
        if (
            !payload.fullname ||
            !payload.email ||
            !payload.gender ||
            !payload.phoneNumber ||
            !payload.houseNum ||
            !payload.municipality ||
            !payload.barangay
        ) {
            alert("Please fill out all of the fields");
        } else {
            db.collection("users")
                .doc(payload.uid)
                .set({
                    fullname: payload.fullname,
                    email: payload.email,
                    gender: payload.gender,
                    uid: payload.uid,
                    phoneNumber: payload.phoneNumber,
                    coins: 0,
                    location: payload.houseNum + " " + payload.barangay + ", " + payload.municipality,
                })
                .then((docRef) => {
                    const ref = store.ref(`/images/${localStorage.getItem("uid")}/${file.name}`);
                    const uploadTask = ref.put(file);
                    uploadTask.on("state_changed", console.log, console.error, () => {
                        ref.getDownloadURL().then((url) => {
                            setFile(null);
                            setURL(url);
                            db
                                .collection("users")
                                .doc(payload.uid)
                                .update({
                                    photoURL: url,
                                })
                                .then((doc) => {
                                    sendEmailVerification(auth.currentUser)
                                        .then(() => {
                                            history.push(`/success/${"verifyemail"}`);
                                        });
                                });
                        });
                    })
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    };

    const style = {
        textHelp: {
            color: "red"
        }
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
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <Box sx = {{display : "flex" , justifyContent : "center" , alignItems : "center" }}>
                                <IconButton color="primary" aria-label="upload picture">
                                    <Avatar src={file} sx={{ width: 128, height: 128 }} />
                                </IconButton>
                                <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />
                            </Box>
                            
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" , marginRight : "50px"  }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Fullname"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("fullname")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" ,  marginRight : "50px"}}>
                            <InputLabel sx={{ color: 'black' }} >Gender</InputLabel>
                            <Select
                                id='gender'
                                label="Gender *"
                                value={'Male'}
                                onChange={userInput("gender")}
                                value={payload.gender}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others/Prefer not to say</MenuItem>
                            </Select>
                            <FormHelperText sx={style.textHelp}>*Required</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" ,  marginRight : "50px"}}>
                            <TextField
                                required
                                id="filled-required"
                                label="Phone Number"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("phoneNumber")}
                                value={payload.phoneNumber}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" , marginRight : "50px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="House # and Street"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("houseNum")}
                                value={payload.houseNum}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" ,  marginRight : "50px"}}>
                            <TextField
                                required
                                id="filled-required"
                                label="Barangay"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("barangay")}
                                value={payload.barangay}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" ,  marginRight : "50px"}}>
                            <InputLabel sx={{ color: 'black' }} >Municipality</InputLabel>
                            <Select
                                id='Municipality'
                                label="Municipality *"
                                value={'Bustos'}
                                onChange={userInput("municipality")}
                                value={payload.municipality}
                            >
                                <MenuItem value={'Bustos'}>Bustos</MenuItem>
                                <MenuItem value={'Baliuag'}>Baliuag</MenuItem>
                            </Select>
                            <FormHelperText sx={style.textHelp}>*Required. Bustos and Baliuag only.</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 ,  marginRight : "50px"}}>
                            <Button onClick={() => completeProfile()} variant='outlined' disabled={!file}>Complete</Button>
                            <FormHelperText>By clicking complete, you agree to the Privacy Policy.</FormHelperText>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(UserRegistration);