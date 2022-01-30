import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, Avatar } from "@mui/material";
import "./css/FileUpload.css";
import Toolbar from '@mui/material/Toolbar';

import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";

import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import CameraAltIcon from '@mui/icons-material/CameraAlt';


export default function FileUpload() {

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
                    .then((doc) => { window.location.reload() });
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

        // <div class="upload">
        //     <img src="noprofil.jpg" >
        //     <div class="round">
        //         <input type="file">
        //             <i class="fa fa-camera" style="color: #fff;"></i>
        //     </div>
        // </div>
        <Box className="base">
            {
                userProfile && userProfile.profile.map((userProfile) => {
                    return (
                        <Box 
                        sx={{ width: "100%" }}
                        >
                            <Toolbar></Toolbar>
                            <Box className="upload" sx={{
                                width: "100%",
                                display: "flex",
                                direction: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            >


                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <Avatar src={userProfile.photoURL} sx={{ width: "100px", height: "100px" }} />
                                    <Box className="round" sx={{
                                        display: "flex",
                                        direction: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mr: "7px",
                                        mb: "7px"
                                    }}>
                                        <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />

                                        <CameraAltIcon sx={{ color: '#fff' }} />
                                    </Box>

                                </IconButton>




                            </Box>
                            <Button onClick={() => uploadImage()} variant='outlined' disabled={!file} sx={{ margin: "0px auto" }}>Upload</Button>
                        </Box>
                    )
                })
            }
        </Box >


    )

}          