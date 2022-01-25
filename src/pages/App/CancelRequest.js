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
    textField: {
        width: "300px",
    },
    inputField: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
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
        let isMounted = true
        const docRef = await db.collection("users").doc(localStorage.getItem("uid")).collection("requests").doc(id);
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
        });
        isMounted = false
    };


    useEffect(() => {

        fetchData();
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
                    .doc(data.globalID);
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


        }

    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    let setDate = data.datetime.toDate().toLocaleDateString();
                    let setTime = data.datetime.toDate().toLocaleTimeString();
                    return (
                        <Box key={data.userID}>
                            <Typography variant="h5">Request Cancellation</Typography>
                            <Box>
                                <Typography>Name: {data.userFullName}</Typography>
                                <Typography>Date: {setDate}</Typography>
                                <Typography>Time: {setTime}</Typography>
                                <Typography>Location: {data.location}</Typography>
                            </Box>
                            <Box>
                                <Typography >Reason for Cancellation </Typography>
                                <Typography>*Required</Typography>
                            </Box>
                            <Box >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    multiline
                                    maxRows={10}
                                    minRows={6}
                                    onChange={userInput("reason")}
                                />

                            </Box>
                            <Box>
                                <Button variant="contained" onClick={() => submitForm()}>Continue</Button>
                                <Button variant="contained" onClick={() => history.goBack()}>Cancel</Button>
                            </Box>
                        </Box>
                    );
                })
            }
        </Box>
    );
}
