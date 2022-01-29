import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  FormGroup,
  FormControl,
} from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../../config/firebase";
import { getAuth } from "firebase/auth";
import "../../App.css";
import FP from "../../assets/password.png";
import btnIcon from "../../assets/email.png";

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
      firebase
        .auth()
        .sendPasswordResetEmail(credentials.email)
        .then(() => {
          // Password reset email sent!
          // ..
          history.push(`/success/${"reset"}`);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          if (error.code == "auth/user-not-found")
            alert("That account doesn't exist.");
        });
    }
  };

  const style = {
    label: {
      fontSize: "24px",
      marginTop: "20px",
      textAlign: "center",
    },

    subLabel: {
      fontSize: "14px",
      textAlign: "center",
    },
    outerCon: {
      marginTop: "20px",
      marginLeft: "20px",
      marginRight: "20px",
    },

    iconCon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "30px",
    },

    fpIcon: {
      width: "120px",
    },

    innerCon: {
      marginTop: "20px",
    },

    textInput: {
      [`& fieldset`]: {
        borderRadius: 4,
      },
    },

    btn: {
      marginTop: "10px",
      width: "100px",
      alignItems: "center",
      borderRadius: "20px",
      position: "absolute",
      right: "10px",
      top: "5px"
    },

    btnlogo: {
      width: "30px",
      marginLeft: "5px"
    }
  };

  return (
    <Box className="base">
      <Box sx={style.outerCon}>
        <Box sx={style.iconCon}>
          <Box
            component="img"
            src={FP}
            alt="Forgot Password"
            sx={style.fpIcon}
          ></Box>
        </Box>
        <Typography sx={style.label}>Forgot Your Password?</Typography>
        <Box sx={style.innerCon}>
          <Typography sx={style.subLabel}>
            Don't worry. We are here to help you reset your password. Enter the
            email associated with your account below then click Reset Password.
            We will send a password reset form to that email if it is found in
            our database.
          </Typography>
          <FormGroup>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" }}
            >
              <TextField
                required
                id="filled-required"
                label="E-mail"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("email")}
                sx={style.textInput}
              />
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Button
                sx={style.btn}
                onClick={() => submitForm()}
                style={{ color: "white" }}
                variant="contained"
              >
                Send <Box component="img" src={btnIcon} sx={style.btnlogo}></Box>
              </Button>

            </FormControl>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
