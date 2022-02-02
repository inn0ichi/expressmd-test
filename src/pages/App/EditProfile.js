import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, Avatar, FormGroup, FormControl, FormHelperText } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import '../../App.css';
import "./EditProfile.css"
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";

import FileUpload from '../../components/appcomponents/FileUpload.js';



const user = getAuth().currentUser;

export default function EditProfile() {

    const dispatch = useDispatch();

    useEffect(() => {
        let isSubscribed = true;
        dispatch(getTheme());
        return () => {
            isSubscribed = false;
        };
    }, [dispatch]);


    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const store = firebase.storage();
    const [userProfile, setuserProfile] = useState({
        profile: [],
    })

    const [nameField, setnameField] = useState(true);
    const [phoneField, setphoneField] = useState(true);

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const fetchList = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        userRef.get().then(doc => {
            usrProfile.push(doc.data());
            setuserProfile({ profile: usrProfile });
        })
    }
    useEffect(() => {

        let isSubscribed = true;
        fetchList();
        return () => {
            isSubscribed = false;
        };
    }, []);

    const [credentials, setCredentials] = useState({
        name: "",
        gender: "",
        phoneNumber: "",
        email: "",
    });

    const userInput = (prop) => (e) => {
        setCredentials({ ...credentials, [prop]: e.target.value });
    };

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function uploadImage() {
        const ref = store.ref(`/images/${localStorage.getItem("uid")}/${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref.getDownloadURL().then((url) => {
                setFile(null);
                setURL(url);
                db
                    .collection("users")
                    .doc(localStorage.getItem("uid"))
                    .update({
                        photoURL: url,
                    })
                    .then((doc) => { window.location.reload() });
            });
        })
    }
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const changename = (e) => {
        setnameField(true);
        if (!credentials.name) {
            setNameError(true);
            setnameField(true);
        } else {
            db
                .collection("users")
                .doc(localStorage.getItem("uid"))
                .update({
                    fullname: credentials.name,
                })
                .then((doc) => { window.location.reload() });

        }

    }

    const changephone = (e) => {
        setphoneField(true);
        if (!credentials.phoneNumber) {
            setPhoneError(true)
            setnameField(true);
        } else {
            db
                .collection("users")
                .doc(localStorage.getItem("uid"))
                .update({
                    phoneNumber: credentials.phoneNumber,
                })
                .then((doc) => { window.location.reload() });
        }

    }

    const style = {
        fileupCon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

        },

        Con: {
            display: "flex",
            marginBottom: "20px"

        },

        btn: {

            fontSize: "12px"
        },

        innerCon: {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "20px",
            marginRight: "20px"
        },
        helperText: {
            marginLeft: "20px"
        }


    }
    return (
        <Box className="base">
            {
                userProfile && userProfile.profile.map((userProfile) => {
                    return (
                        <Box>
                            <Box sx={style.fileupCon}>
                                <FileUpload />
                            </Box>
                            {/* <Box className="avatarChange">
                                
                                <Box className="avatarContainer">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar src={userProfile.photoURL} sx={{ width: 128, height: 128 }} />
                                    </IconButton>
                                    <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />
                                </Box>
                                <Box>
                                    <Button onClick={() => uploadImage()} variant='outlined' disabled={!file}>Upload</Button>
                                </Box>
                            </Box> */}
                            <FormGroup>
                                <FormControl sx={style.Con}>
                                    <Box sx={style.innerCon}>
                                        <TextField
                                            required
                                            error={nameError}
                                            id="outlined-required"
                                            label="Fullname"
                                            defaultValue={userProfile.fullname}
                                            disabled={nameField}
                                            onChange={userInput("name")}
                                        />
                                        {
                                            nameField ? (
                                                <Button sx={style.btn} onClick={() => setnameField(false)}>Edit Name</Button>
                                            ) : (
                                                <Button onClick={() => changename()}>Save</Button>
                                            )
                                        }
                                    </Box>
                                    <FormHelperText sx={style.helperText}>
                                        {nameError ? "Please enter your name" : ""}
                                    </FormHelperText>
                                </FormControl>

                                <FormControl sx={style.Con}>
                                    <Box sx={style.innerCon}>
                                        <TextField
                                            error={phoneError}
                                            required
                                            id="outlined-required"
                                            label="Phone Number"
                                            defaultValue={userProfile.phoneNumber}
                                            disabled={phoneField}
                                            onChange={userInput("phoneNumber")}
                                        />
                                        {
                                            phoneField ? (
                                                <Button sx={style.btn} onClick={() => setphoneField(false)}>Edit Number</Button>
                                            ) : (
                                                <Button onClick={() => changephone()}>Save</Button>
                                            )
                                        }
                                    </Box>
                                    <FormHelperText sx={style.helperText}>
                                        {phoneError ? "Please enter your phone number" : ""}
                                    </FormHelperText>
                                </FormControl>
                            </FormGroup>
                        </Box>
                    )
                })
            }
        </Box >
    );
}
