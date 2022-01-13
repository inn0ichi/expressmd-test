import { Typography, Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import './Registration.css';

const auth = getAuth();
function Login() {
    const history = useHistory();

    getAuth().onAuthStateChanged(function (user) {
        if (user) {
            history.push("/");
        }
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    const db = firebase.firestore();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
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
    const login = (e) => {
        if (
            !payload.email ||
            !payload.password
        ) {
            alert("Please fill out all of the fields");
        } else {
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    localStorage.setItem("uid", user.uid);
                    history.push('/');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });

        }
    };

    const style = {
        logo : {
            width : "200px",
            height : "150px"
        }
    }

    return (
        <Box className='base'>
            <Container className='registerContainer'>

                <Box className='formContainer'>
                    <Box className='imgContainer'>
                        <Box component = "img" src = {Logo} alt = "logo" sx = {style.logo}></Box>
                    </Box>
                    <FormGroup>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
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
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
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
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <Button onClick={() => login()} variant='contained'>Login</Button>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <Button onClick={() => history.push("/createaccount")} variant='outlined'>Create an Account</Button>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(Login);