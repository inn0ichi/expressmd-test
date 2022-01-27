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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import Logo from "../../assets/icon-512x512.png";
import "./Registration.css";
import { IconButton } from "@mui/material";

const auth = getAuth();
function CreateAccount() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);
  const db = firebase.firestore();
  const history = useHistory();
  const store = firebase.storage();
  getAuth().onAuthStateChanged(function (user) {
    if (user) {
      history.push("/");
    }
  });
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

  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

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
      !payload.confirmpassword ||
      !payload.fullname ||
      !payload.gender ||
      !payload.phoneNumber ||
      !payload.houseNum ||
      !payload.municipality ||
      !payload.barangay
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
            db.collection("users")
              .doc(localStorage.getItem("uid"))
              .set({
                fullname: payload.fullname,
                email: payload.email,
                gender: payload.gender,
                uid: localStorage.getItem("uid"),
                phoneNumber: payload.phoneNumber,
                location:
                  payload.houseNum +
                  " " +
                  payload.barangay +
                  ", " +
                  payload.municipality,
              })
              .then((docRef) => {
                const ref = store.ref(
                  `/images/${localStorage.getItem("uid")}/${file.name}`
                );
                const uploadTask = ref.put(file);
                uploadTask.on(
                  "state_changed",
                  console.log,
                  console.error,
                  () => {
                    ref.getDownloadURL().then((url) => {
                      setFile(null);
                      setURL(url);
                      db.collection("users")
                        .doc(localStorage.getItem("uid"))
                        .set({
                          photoURL: url,
                        })
                        .then((doc) => {
                          history.push("/");
                        });
                    });
                  }
                );
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
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
  };
  return (
    <Box className="base">
      <Container className="registerContainer">
        <Box className="formContainer">
          <Box sx={style.labelCon}>
            <Typography sx={style.label}>Create</Typography>
            <Typography sx={style.label}>Account</Typography>
          </Box>
          <FormGroup>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <Box className="imageUpload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Avatar src={file} sx={{ width: 128, height: 128 }} />
                </IconButton>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "10px" }}
            >
              <TextField
                required
                id="filled-required"
                label="E-mail"
                variant="standard"
                InputLabelProps={{
                  style: { color: "black" },
                }}
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
                label="Password"
                variant="standard"
                type="password"
                InputLabelProps={{
                  style: { color: "black" },
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
                label="Confirm Password"
                variant="standard"
                type="password"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("confirmpassword")}
              />
            </FormControl>

            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                required
                id="filled-required"
                label="Fullname"
                variant="standard"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("fullname")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <InputLabel sx={{ color: "black" }}>Gender</InputLabel>
              <Select
                id="gender"
                label="Gender *"
                value={"Male"}
                onChange={userInput("gender")}
                value={payload.gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others/Prefer not to say</MenuItem>
              </Select>
              <FormHelperText sx={style.textHelp}>*Required</FormHelperText>
            </FormControl>

            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                required
                id="filled-required"
                label="Phone Number"
                variant="standard"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("phoneNumber")}
                value={payload.phoneNumber}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                required
                id="filled-required"
                label="House # and Street"
                variant="standard"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("houseNum")}
                value={payload.houseNum}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                required
                id="filled-required"
                label="Barangay"
                variant="standard"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("barangay")}
                value={payload.barangay}
              />
            </FormControl>

            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" }}
            >
              <InputLabel sx={{ color: "black" }}>Municipality</InputLabel>
              <Select
                id="Municipality"
                label="Municipality *"
                value={"Bustos"}
                onChange={userInput("municipality")}
                value={payload.municipality}
              >
                <MenuItem value={"Bustos"}>Bustos</MenuItem>
                <MenuItem value={"Baliuag"}>Baliuag</MenuItem>
              </Select>
              <FormHelperText sx={style.textHelp}>
                *Required. Bustos and Baliuag only.
              </FormHelperText>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Button
                sx={style.createBtn}
                onClick={() => createaccount()}
                variant="outlined"
                disabled={!file}
              >
                Create Account
              </Button>
              <FormHelperText>
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
