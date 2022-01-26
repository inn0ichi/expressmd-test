import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Rating, FormLabel, FormGroup, FormControlLabel, FormHelperText, FormControl } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";

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

export default function ViewArchive() {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;
        getAuth().onAuthStateChanged(function (user) {
            if (!user) {
                history.push('/login');
            }
        });
        return () => {
            isSubscribed = false;
        }
    }, []);

    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });
    const [docData, setdocData] = useState({
        data: [],
    });

    const [payload, setPayload] = useState({
        review: "",
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("users").doc(localStorage.getItem("uid")).collection("archive").doc(id);
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
            localStorage.setItem("docID", doc.data().doctorId)
        });
        isMounted = false
    };
    const fetchDoc = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(localStorage.getItem("docID"));
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setdocData({ data: rawData });
        });
        isMounted = false
    };

    useEffect(() => {
        fetchDoc();
        fetchData();
    }, [appointmentData]);

    const style = {
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
        innerSub: {
            fontSize: "24px",
            marginLeft: "25px",
            marginTop: "20px",
        },

        inputField: {
            display: "flex",
            marginLeft: "30px",
            marginRight: "30px",
            justifyContent: "center",
            marginTop: "10px",

        },

        textField: {
            width: "350px",
        },

        dateTimeCon: {
            marginTop: "50px",
            marginLeft: "20px",
            marginRight: "30px",
            minWidth: "200px",
        },
        dateandTime: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "20px",
            marginRight: "30px",

        },

        con: {
            marginTop: "50px"
        },

        dateAndTime: {
            marginTop: "10px"
        },

        notelabel: {
            fontSize: "12px",
            fontStyle: "Italic",
            marginLeft: "20px",
            color: "gray"
        },

        btnBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "20px"
        },

        btn: {
            width: "200px",
            marginBottom: "10px",
            borderRadius: "10px"
        }
    }

    const submitForm = (e) => {
        if (!payload.review || rating === null) {
            alert("Please enter a review.");
        } else {
            appointmentData.data.map((data) => {
                let docRef = db.collection("doctors")
                    .doc(data.doctorId)
                    .collection("usrrating")
                var userRef = db.collection("users")
                    .doc(data.userID)
                    .collection("archive")
                    .doc(data.documentId);
                var globalRef = db.collection("requests")
                    .doc(data.globalID);
                userRef
                    .update({
                        rated: true,
                        review: payload.review,
                        rating: rating,
                        fullname: data.userFullName,
                    })
                    .then((docReference) => {
                        docRef
                            .add({
                                rated: true,
                                review: payload.review,
                                rating: rating,
                                fullname: data.userFullName,
                            })
                            .then((docRef) => {
                                docRef = db.collection("doctors").doc(data.doctorId).collection("usrrating").doc(docRef.id);
                                docRef
                                    .update({
                                        documentId: docRef.id,
                                    })
                                    .then((docRef) => {
                                        docRef = db.collection("doctors").doc(data.doctorId);
                                        docData.data.map((doc) => {
                                            console.log(doc);
                                            let currentrev = doc.numReviews;
                                            let currentrate = doc.rating;

                                            let newrev = parseInt(currentrev, 10) + 1;
                                            let newrate = currentrate + rating
                                            let roundedrate = Math.round(newrate / newrev);
                                            docRef
                                                .update({
                                                    numReviews: newrev,
                                                    rating: roundedrate,
                                                })
                                                .then((docRef) => {
                                                    history.push(`/success/${"rating"}`);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    history.push("/sorry");
                                                });
                                        })
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
                    let setDate = data.datetime.toDate().toLocaleDateString();
                    let setTime = data.datetime.toDate().toLocaleTimeString();
                    return (
                        <Box>

                            <Box sx={style.innerCon}>
                                <Box>
                                    <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                                </Box>
                                <Box sx={style.superInnerCon}>
                                    <Typography variant="subtitle1">Name: {data.userFullName}</Typography>
                                    <Typography variant="subtitle1">Date: {setDate}</Typography>
                                    <Typography variant="subtitle1">Time: {setTime}</Typography>
                                    <Typography variant="subtitle1">Gender: {data.gender}</Typography>
                                    <Typography variant="subtitle1">Location: {data.location}</Typography>
                                </Box>
                            </Box>

                            {(() => {
                                switch (data.status) {
                                    case "Completed":
                                        if (!data.rated) {
                                            return (
                                                <Box>
                                                    <Box>
                                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                            <FormGroup>
                                                                <Box>
                                                                    <FormControl>
                                                                        <TextField id="outlined-basic" label="What do I think?" variant="outlined" onChange={userInput("review")} />
                                                                    </FormControl>
                                                                </Box>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Box>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <>
                                                                                <input
                                                                                    name="rating"
                                                                                    type="number"
                                                                                    value={rating}
                                                                                    hidden
                                                                                    readOnly
                                                                                />
                                                                                <Rating
                                                                                    name="rating"
                                                                                    value={rating}
                                                                                    precision={1}
                                                                                    onChange={(_, rating) => {
                                                                                        setRating(rating);
                                                                                    }}
                                                                                />
                                                                            </>
                                                                        }
                                                                        label="Rating"
                                                                    />
                                                                </Box>
                                                            </FormGroup>
                                                        </FormControl>
                                                    </Box>
                                                    <Button variant="contained" onClick={() => submitForm()}>Rate</Button>
                                                </Box>
                                            );
                                        } else {
                                            return null;
                                        }

                                    case "Declined":
                                        return null;
                                    default:
                                        return null;
                                }
                            })()}
                        </Box>
                    );
                })
            }

        </Box>
    );
}
