import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';

const style = {
    parentCon: {
        display: "flex",
        margin: "20px",
        alignItems: "center"

    },
    label: {
        fontSize: "24px",
        marginTop: "20px",
        marginLeft: "20px"
    },

    innerCon: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        marginLeft: "30px",
        alignItems: "center",
    },

    superInnerCon: {
        marginLeft: "30px"
    },

    patientProf: {
        width: "90px",
        height: "90px",
        borderRadius: "90px"
    },

    dateTimeCon: {
        marginTop: "50px",
        marginLeft: "20px",
        marginRight: "30px",
        minWidth: "200px",
    },

    subLabel: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "red"
    },
    textField: {
        width: "300px",
    },
    inputField: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    },

    btnBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "40px"
    },

    btn: {
        width: "200px",
        marginBottom: "10px",
        borderRadius: "10px"
    }
}

export default function EditRequest() {

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });
    const [specifiedDate, setSpecifiedDate] = useState(new Date());

    const [userProfile, setuserProfile] = useState({
        profile: [],
    });


    const handleChange = (newValue) => {
        setSpecifiedDate(newValue);
    };

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("users").doc(localStorage.getItem("uid")).collection("requests").doc(id);
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
        });
        isMounted = false
    };

    const fetchUserData = async () => {
        let isMounted = true
        const docRef = await db.collection("users").doc(localStorage.getItem("uid"));
        let userProfile = [];
        docRef.get().then((doc) => {
            userProfile.push(doc.data());
            setuserProfile({ profile: userProfile });
        });
        isMounted = false
    };

    useEffect(() => {
        fetchUserData();
        fetchData();
    }, []);

    const submitForm = (e) => {
        appointmentData.data.map((data) => {
            var docRef = db.collection("doctors")
                .doc(data.doctorId)
                .collection("requests")
                .doc(data.userID);
            var userRef = db.collection("users")
                .doc(data.userID)
                .collection("requests")
                .doc(data.userID);
            var globalRef = db.collection("requests")
                .doc(data.globalID);
            userRef
                .update({
                    datetime: specifiedDate,
                    status: "Pending",
                })
                .then((docReference) => {
                    docRef
                        .update({
                            datetime: specifiedDate,
                            status: "Pending",
                        })
                        .then((docRef) => {
                            globalRef
                                .update({
                                    datetime: specifiedDate,
                                    status: "Pending",
                                })
                                .then((docRef) => {
                                    history.push(`/success/${"edited"}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    history.push("/sorry");
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            history.push("/sorry");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    history.push("/sorry");
                });
        })

    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    let setDate = data.datetime.toDate().toLocaleDateString();
                    let setTime = data.datetime.toDate().toLocaleTimeString();
                    return (
                        <Box>
                            <Box>
                                <Typography sx={style.label}>Edit Time and Date</Typography>
                            </Box>
                            <Box sx={style.innerCon}>
                                <Box>
                                    <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                                </Box>
                                <Box sx={style.superInnerCon}>
                                    <Typography>Name: {data.userFullName}</Typography>
                                    <Typography>Date: {setDate}</Typography>
                                    <Typography>Time: {setTime}</Typography>
                                    <Typography>Gender: {data.gender}</Typography>
                                    <Typography>Location: {data.location}</Typography>
                                </Box>
                            </Box>
                            <Box sx={style.dateTimeCon}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            label="Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={specifiedDate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="Time"
                                            value={specifiedDate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={style.btnBox}>
                                <Button variant="contained" sx={style.btn} onClick={() => submitForm()}>Continue</Button>
                                <Button variant="contained" sx={style.btn} style={{ backgroundColor: "#FF5956" }} onClick={() => history.goBack()}>Cancel</Button>
                            </Box>
                        </Box>
                    );
                })
            }

        </Box>
    );
}
