import React, { useState, useEffect } from "react";
import { Typography, Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem, Link } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import '../../App.css';

const user = getAuth().currentUser;

export default function ForgotPassword() {

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();

    const [credentials, setCredentials] = useState({
        email: "",
    });

    const userInput = (prop) => (e) => {
        setCredentials({ ...credentials, [prop]: e.target.value });
    };

    const submitForm = (e) => {
        if (!credentials.email) {
            alert("Please enter your email!");
        } else {
            firebase.auth().sendPasswordResetEmail(credentials.email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    history.push(`/success/${"reset"}`)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }

    }

    return (
        <Box className="base">
            <Typography>Forgot Your Password?</Typography>
            <Typography>Don't worry. We are here to help you reset your password. Enter the email associated with your account below then click Reset Password. We will send a password reset form to that email if it is found in our database.</Typography>
            <FormGroup>
                <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                    <TextField
                        required
                        id="filled-required"
                        label="E-mail"
                        variant="standard"
                        onChange={userInput("email")}
                    />
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <Button onClick={() => submitForm()} variant='contained'>Reset Password</Button>
                </FormControl>

            </FormGroup>
        </Box >
    );
}
