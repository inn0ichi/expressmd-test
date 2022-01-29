import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormHelperText,
  Avatar,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import firebase from "../../config/firebase";
import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import "./Registration.css";
import { IconButton } from "@mui/material";
import password from "../../assets/padlock.png"
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from '@mui/icons-material/Email';



const auth = getAuth();
function CreateAccount() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);
  const db = firebase.firestore();
  const history = useHistory();
  const store = firebase.storage();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    fullname: "",
    gender: "",
    phoneNumber: "",
    houseNum: "",
    municipality: "",
    barangay: "",
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
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("email", user.email);
            history.push("/register");
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
    }
  };

  const style = {
    labelCon: {
      marginTop: "20px",
      marginLeft: "10px",
    },
    label: {
      color: "#808080",
      fontSize: "40px",
    },

    btnCon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },

    createBtn: {
      width: "200px",
    },

    txtHelp: {
      display: "flex",
      marginTop: "20px",
      color: "black",
    },

    textInput: {
      [`& fieldset`]: {
        borderRadius: 4,
      },

    },

    formCon: {
      marginTop: "30px"
    },

    textHelp: {
      textAlign: "center",
      marginTop: "10px"
    }

  };

  return (
    <Box className="base">
      <Container className="registerContainer">
        <Box className="formContainer">
          <Box sx={style.labelCon}>
            <Typography sx={style.label}>Create</Typography>
            <Typography sx={style.label}>Account</Typography>
          </Box>
          <FormGroup sx={style.formCon}>
            <FormControl
              required

              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "10px" }}
            >
              <TextField
                required
                id="filled-required"
                placeholder="E-mail"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
                sx={style.textInput}
                onChange={userInput("email")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "10px" }}
            >
              <TextField
                required
                id="filled-required"
                placeholder="Password"
                variant="outlined"
                type="password"
                sx={style.textInput}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
                onChange={userInput("password")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "10px" }}
            >
              <TextField
                required
                id="filled-required"
                variant="outlined"
                type="password"
                placeholder="Confirm password"
                sx={style.textInput}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  )
                }}


                onChange={userInput("confirmpassword")}
              ></TextField>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                sx={style.createBtn}
                onClick={() => createaccount()}
                variant="filled"
                style={{ backgroundColor: "#167694", color: "white", borderRadius: "10px", marginTop: "50px" }}
              >
                Create Account
              </Button>
              <FormHelperText sx={style.textHelp}>
                By clicking Create Account, you agree to the Privacy Policy.
              </FormHelperText>
            </FormControl>
          </FormGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default withRouter(CreateAccount);
