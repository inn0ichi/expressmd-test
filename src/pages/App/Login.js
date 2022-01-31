import { Box, Container, TextField, Button, FormGroup, FormControl, Link, FormHelperText, } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import './Registration.css';
import { borderColor, width } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material";
import validator from 'validator'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';

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
    const [emailError, setEmailError] = useState("")
    const userInputEmail = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
        var email = e.target.value
        if (validator.isEmail(email)) {
            setEmailError(true)



        } else {
            setEmailError(false)
            setAccountError("")

        }



    };
    const userInputPassword = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };



    const [passwordError, setpasswordError] = useState('');
    const [accountError, setAccountError] = useState('');
    const [validate, setValidate] = useState(false);
    const [fill, setFill] = useState('');
    const login = (e) => {
        console.log(payload)
        console.log(validate)
        console.log(fill)
        console.log(passwordError)
        if (
            !payload.email && !payload.password
        ) {
            setFill(true)



        }



        else if (
            payload.email && payload.password
        ) {
            setFill(false)




        }

        if (!emailError)//invalid
        {
            setValidate(true)
        }



        else {
            setFill(false)
            setValidate(false)//valid
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("email", user.email);
                    history.push('/');
                    // ...
                })
                .catch((error) => {
                    if (error.code == "auth/wrong-password") {
                        setpasswordError(true)
                    }

                    else if (!error.code == "auth/wrong-password") {
                        setpasswordError(false)
                    }

                    if (error.code == "auth/user-not-found") {
                        setAccountError(true)
                    }
                    else {
                        setAccountError(false)
                    }
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




    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
                                error={fill, validate}
                                required
                                id="filled-required"
                                placeholder="E-mail"
                                variant="outlined"
                                sx={style.textInput}
                                autoComplete="off"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),

                                    endAdornment: (
                                        <InputAdornment position="end">

                                            {emailError ? <CheckCircle /> : <CancelIcon />}

                                        </InputAdornment>
                                    )



                                }}


                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInputEmail("email")}
                                autoComplete="off"
                            ></TextField>
                            <FormHelperText sx={style.textHelp}>
                                {validate ? "Please enter valid a email" : ""}
                                {accountError ? "Account does not exist" : ""}
                            </FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                error={passwordError, fill}
                                required
                                id="filled-required"
                                placeholder="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={style.textInput}
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInputPassword("password")}
                            />
                            <FormHelperText sx={style.textHelp}>
                                {fill ? "Please enter password" : ""}
                                {passwordError ? "Wrong password " : ""}
                            </FormHelperText>
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