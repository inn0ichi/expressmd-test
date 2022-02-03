import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';

const style = {
    parentCon: {
        display: "flex",
        margin: "20px",
        alignItems: "center"

    },
    label: {
        fontSize: "24px",
        marginRight: "10px"
    },

    subLabel: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "red"

    },



    innerCon: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        marginLeft: "30px",
        alignItems: "center",

    },
    patientProf: {
        width: "90px",
        height: "90px",
        borderRadius: "90px"
    },
    superInnerCon: {
        marginLeft: "30px"
    },

    Label: {
        fontSize: "24px"
    },



    mainCon: {
        marginLeft: "20px",
        marginRight: "20px"
    },

    subLabelCon: {
        display: "flex",
        flexdirection: "column",
        alignItems: "center",
        marginTop: "20px"
    },

    inputField: {
        display: "flex",
        marginLeft: "30px",
        marginRight: "30px",
        justifyContent: "center",
        marginTop: "10px",
        alignItems: 'center'

    },

    textField: {
        width: "350px",
    },

    btnCon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px"
    },


    btn: {
        marginBottom: "10px",
        width: "200px",
        borderRadius: "10px"
    }
}

export default function CancelRequest() {

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });

    const [payload, setPayload] = useState({
        reason: "",
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const fetchData = async () => {
        var getOptions;

        if (!localStorage.getItem("requestLoaded")) {
            getOptions = {
                source: 'server'
            };
            localStorage.setItem("requestLoaded", true)
        } else {
            var getOptions = {
                source: 'cache'
            };
        }
        let isMounted = true
        const docRef = await db.collection("users").doc(localStorage.getItem("uid")).collection("requests").doc(id);
        let rawData = [];
        docRef.get(getOptions).then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
        });
        isMounted = false
    };


    useEffect(() => {
        let isSubscribed = true;
        fetchData();
        return () => {
            isSubscribed = false;
        };

    }, []);

    const submitForm = (e) => {
        if (!payload.reason) {
            alert("Please enter the required fields!");
        } else {

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
                    .doc(data.userID);
                userRef
                    .update({
                        reason: payload.reason,
                        status: "Requested Cancellation",
                    })
                    .then((docReference) => {
                        docRef
                            .update({
                                reason: payload.reason,
                                status: "Requested Cancellation",
                            })
                            .then((docRef) => {
                                globalRef
                                    .update({
                                        reason: payload.reason,
                                        status: "Requested Cancellation",
                                    })
                                    .then((docRef) => {
                                        history.push(`/success/${"cancellation"}`);
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

    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    let setDate = data.datetime.toDate().toLocaleDateString('en-US', options);
                    let setTime = data.datetime.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    return (
                        <Box key={data.userID} sx={style.mainCon}>
                            <Typography sx={style.Label}>Request Cancellation</Typography>
                            <Box sx={style.innerCon}>
                                <Box>
                                    <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                                </Box>
                                <Box sx={style.superInnerCon}>
                                    <Typography>Name: {data.userFullName}</Typography>
                                    <Typography>Date: {setDate}</Typography>
                                    <Typography>Time: {setTime}</Typography>
                                    <Typography>Location: {data.location}</Typography>
                                </Box>
                            </Box>
                            <Box sx={style.subLabelCon}>
                                <Typography sx={style.subLabel}>Reason for Cancellation </Typography>
                                <Typography sx={{ color: "red", marginLeft: "10px", fontStyle: "Italic" }}>*Required</Typography>
                            </Box>
                            <Box sx={style.inputField} >
                                <TextField
                                    id="outlined-basic"
                                    sx={style.textField}
                                    variant="outlined"
                                    multiline
                                    maxRows={10}
                                    minRows={6}
                                    onChange={userInput("reason")}
                                />

                            </Box>
                            <Box sx={style.btnCon}>
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
