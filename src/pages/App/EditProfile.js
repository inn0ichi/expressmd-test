import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, Avatar } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import '../../App.css';
import "./EditProfile.css"
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";

const user = getAuth().currentUser;

export default function EditProfile() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
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
        fetchList();
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
                    .then((doc) => { history.push("/editprofile") });
            });
        })
    }

    const changename = (e) => {
        setnameField(true);
        if (!credentials.name) {
            alert("Please enter your name!");
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
            alert("Please enter your phone number!");
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

    return (
        <Box className="base">
            {
                userProfile && userProfile.profile.map((userProfile) => {
                    return (
                        <Box>
                            <Box className="avatarChange">
                                <Box className="avatarContainer">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar src={userProfile.photoURL} sx={{ width: 128, height: 128 }} />
                                    </IconButton>
                                    <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />
                                </Box>
                                <Box>
                                    <Button onClick={() => uploadImage()} variant='outlined' disabled={!file}>Upload</Button>
                                </Box>
                            </Box>
                            <Box className="nameChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Fullname"
                                    defaultValue={userProfile.fullname}
                                    disabled={nameField}
                                    onChange={userInput("name")}
                                />
                                {
                                    nameField ? (
                                        <Button onClick={() => setnameField(false)}>Edit Name</Button>
                                    ) : (
                                        <Button onClick={() => changename()}>Save</Button>
                                    )
                                }
                            </Box>

                            <Box className="phoneChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone Number"
                                    defaultValue={userProfile.phoneNumber}
                                    disabled={phoneField}
                                    onChange={userInput("phoneNumber")}
                                />
                                {
                                    phoneField ? (
                                        <Button onClick={() => setphoneField(false)}>Edit Number</Button>
                                    ) : (
                                        <Button onClick={() => changephone()}>Save</Button>
                                    )
                                }
                            </Box>
                        </Box>
                    )
                })
            }
        </Box >
    );
}
