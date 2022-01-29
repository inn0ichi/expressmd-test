import { Box, Container, TextField, Button, FormGroup, FormControl, Link } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import './Registration.css';
import { borderColor, width } from '@mui/system';

const auth = getAuth();
function Login() {
    const history = useHistory();

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
                    } else {
                        localStorage.setItem("uid", user.uid);
                        localStorage.setItem("email", user.email);
                        history.push('/');
                    }
                    // ...
                })
                .catch((error) => {
                    if (error.code == "auth/wrong-password")
                        alert("Wrong Password.");
                    if (error.code == "auth/user-not-found")
                        alert("That account doesn't exist.");
                });

        }
    };

    const style = {
        logo: {
            width: "130px",
            height: "100px",
        },

        textInput: {
            [`& fieldset`]: {
                borderRadius: 4,
            },
        }


    }

    return (
        <Box className='base'>
            <Container className='registerContainer'>

                <Box className='formContainer'>
                    <Box className='imgContainer'>
                        <Box component="img" src={Logo} alt="logo" sx={style.logo}></Box>
                    </Box>
                    <FormGroup>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "50px" }} >
                            <TextField
                                required
                                id="filled-required"
                                label="E-mail"
                                variant="outlined"
                                sx={style.textInput}
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("email")}
                                autoComplete="off"
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Password"
                                variant="outlined"
                                type="password"
                                sx={style.textInput}
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("password")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, mt: 5 }}>
                            <Button onClick={() => login()} variant='contained' style={{ color: "white", borderRadius: "10px" }}>Login</Button>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <Button onClick={() => history.push("/createaccount")} style={{ borderRadius: "10px" }} variant='outlined'>Create an Account</Button>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => history.push("/resetpassword")}
                                style={{ color: "#808080" }}
                            >
                                Forgot your password ?
                            </Link>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(Login);