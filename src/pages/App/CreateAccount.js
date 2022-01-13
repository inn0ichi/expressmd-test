import { Typography, Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import './Registration.css';

const auth = getAuth();
function CreateAccount() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    const db = firebase.firestore();
    const history = useHistory();
    getAuth().onAuthStateChanged(function (user) {
        if (user) {
            history.push("/");
        }
    });
    const [payload, setPayload] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    /* getAuth().onAuthStateChanged(function (user) {
        var userRef = db.collection("users").doc(localStorage.getItem('uid'));
        userRef.get().then((doc) => {
            if (doc.exists) {
                alert("you have already completed your profile. Please go to settings if you want to edit.");
                history.push("/");
            }
        })
    }); */
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };
    const createaccount = (e) => {
        if (
            !payload.email ||
            !payload.password ||
            !payload.confirmpassword
        ) {
            alert("Please fill out all of the fields");
        } else {
            if (payload.password != payload.confirmpassword) {
                alert("Password mismatch, please check your password.");
            } else {
                createUserWithEmailAndPassword(auth, payload.email, payload.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        localStorage.setItem("uid", user.uid);
                        history.push("/register");
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });
            }

        }
    };

    const style = {
        labelCon : {
            marginTop : "20px",
            marginLeft : "10px"
        },
        label : {
            color : "#808080",
            fontSize : "40px",
        },

        btnCon : {
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            marginTop : "20px"
        },

        createBtn : {
            width : "200px"
        },

        txtHelp : {
            display : "flex",
            marginTop : "20px",
            color : "black"
        }
    }
    return (
        <Box className='base'>
            <Container className='registerContainer'>
                <Box className='formContainer'>
                    <Box sx = {style.labelCon}>
                        <Typography sx = {style.label}>Create</Typography>
                        <Typography sx = {style.label}>Account</Typography>
                    </Box>
                    <FormGroup>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 , marginTop : "10px"}}>
                            <TextField
                                required
                                id="filled-required"
                                label="E-mail"
                                variant="standard"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                  }}
                                onChange={userInput("email")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 , marginTop : "10px"}}>
                            <TextField
                                required
                                id="filled-required"
                                label="Password"
                                variant="standard"
                                type="password"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                  }}
                                onChange={userInput("password")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 , marginTop : "10px"}}>
                            <TextField
                                required
                                id="filled-required"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                  }}
                                onChange={userInput("confirmpassword")}
                            />
                        </FormControl>
                        <FormControl required sx = {style.btnCon}>
                            <Button sx = {style.createBtn} onClick={() => createaccount()} variant='outlined'>Create Account</Button>
                            <FormHelperText sx = {style.txtHelp}>*You will be prompted to complete your account information on the next page.</FormHelperText>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(CreateAccount);