import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, TextField, Button, Rating, FormLabel, FormGroup, FormControlLabel, FormHelperText, FormControl } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";



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
        var getOptions;

        if (!localStorage.getItem("profileLoaded")) {
            getOptions = {
                source: 'server'
            };
            localStorage.setItem("profileLoaded", true)
        } else {
            var getOptions = {
                source: 'cache'
            };
        }
        let isMounted = true
        const docRef = db.collection("users").doc(localStorage.getItem("uid")).collection("archive").doc(id);
        let rawData = [];
        docRef.get(getOptions).then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
            localStorage.setItem("docID", doc.data().doctorId)
        });
        isMounted = false
    };
    const fetchDoc = async () => {
        appointmentData.data.map((data) => {
            const docRef = db.collection("doctors").doc(data.doctorId);
            let rawData = [];
            docRef.get().then((doc) => {
                rawData.push(doc.data());
                setdocData({ data: rawData });
            });
        })

    };

    useEffect(() => {
        let isSubscribed = true;
        fetchDoc();
        fetchData();
        return () => {
            isSubscribed = false;
        };
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
            marginBottom: "10px",
        },

        innerSub2: {
            fontSize: "18px",
            marginLeft: "25px",
            marginTop: "40px",
            marginBottom: "10px",
        },
        innerSub5: {
            fontSize: "18px",
           
            marginTop: "20px",
            marginBottom: "10px",
        },

        innerSubrate: {
            fontSize: "18px",
            marginTop: "5px",
            marginBottom: "10px",
            textAlign: "center"
        },


        inputField: {
            display: "flex",
            marginLeft: "30px",
            marginRight: "30px",
            justifyContent: "center",
            marginTop: "10px",

        },

        textField: {
            width: "300px",
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

        rateBox: {
            alignItems: "center",
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
        },
        ratePaper: {
            minWidth: "50px",
            borderColor: "#7EB6BC",
            borderWidth: "2px",
            marginRight: "30px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            minHeight: "10px",
            marginBottom: "20px",
            marginTop: "50px",

        },
        rateContainer: {
            marginLeft: "30px",
        },
        rateButn: {
            marginTop: "10px"
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
                        userDocID: data.documentId,
                        userID: data.userID,
                    })
                    .then((docReference) => {
                        docRef
                            .add({
                                rated: true,
                                review: payload.review,
                                rating: rating,
                                fullname: data.userFullName,
                                userDocID: data.documentId,
                                userID: data.userID,
                            })
                            .then((docRef) => {
                                docRef = db.collection("doctors").doc(data.doctorId).collection("usrrating").doc(docRef.id);
                                localStorage.setItem("reviewID", docRef.id);
                                docRef
                                    .update({
                                        documentId: docRef.id,
                                    })
                                    .then((docRef) => {
                                        docRef = db.collection("doctors").doc(data.doctorId);
                                        docData.data.map((doc) => {
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
                                                    db.collection("doctors").doc(data.doctorId).collection("archive").doc(data.documentId)
                                                        .update({
                                                            rated: true,
                                                            reviewID: localStorage.getItem("reviewID"),
                                                        })
                                                        .then((docRef) => {
                                                            history.push(`/success/${"rating"}`);
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
                                                        <Typography sx={style.innerSub}>Doctor's Notes:</Typography>
                                                        <Box sx={style.inputField}>
                                                            <Typography>{data.notes}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={style.rateContainer}>
                                                        <Paper sx={style.ratePaper} elevation={3} >
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup>

                                                                    <Typography sx={style.innerSubrate}>Rate Your Doctor</Typography>


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
                                                                                        sx={{ fontSize: "45px", marginTop: "10px", marginLeft: "50px", marginBottom: "50px" }}
                                                                                        value={rating}
                                                                                        precision={1}
                                                                                        onChange={(_, rating) => {
                                                                                            setRating(rating);
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                            }
                                                                            label=""

                                                                        />

                                                                    </Box>

                                                                    <TextField sx={style.textField} id="outlined-basic" label="What do I think?" variant="outlined" onChange={userInput("review")} />

                                                                    <Button sx={style.rateButn} variant="contained" onClick={() => submitForm()}>Rate</Button>

                                                                </FormGroup>
                                                            </FormControl>

                                                        </Paper>

                                                    </Box>

                                                </Box>
                                            );
                                        } else {
                                            return (
                                                <Box sx={style.rateContainer}>
                                                    
                                                    <Paper sx={style.ratePaper} elevation={3} >
                                                    <Box >
                                                   
                                                    <Box><Typography sx={style.innerSubrate}>User Rating:</Typography></Box>
                                                    <Typography sx={style.innerSub5}>Name of Doctor:</Typography>
                                                    {docData &&
                        docData.data.map((docProfile) => {
                            return (
                                
                                <Typography variant="h5" className="docDeets">Dr. {docProfile.firstname} {docProfile.lastname}</Typography>
                            );
                        })}
                                                    <Rating
                                                    sx={{ fontSize: "45px", marginTop: "10px", marginLeft: "30px",  }}
                                                        name="rating"
                                                        value={data.rating}
                                                        precision={1}
                                                    />
                                                   
                                                    
                                                    <Typography sx={style.innerSub5}>User Review:</Typography>
                                                    <Typography sx={{marginLeft:"30px",marginBottom:"30px"}}>{data.review}</Typography>
                                                    </Box>
                                                    </Paper>
                                                    
                                                </Box>
                                            )

                                        }
                                    case "Declined":
                                        return (
                                            <Box>

                                                <Typography variant="h6" sx={{ textAlign: "center", marginTop: "50px" }}>This Appointment has been Cancelled</Typography>


                                                <Typography variant="subtitle1" sx={style.innerSub2}>Reason for Cancellation:</Typography>
                                                <Box sx={style.inputField}>
                                                    <TextField sx={style.textField} readOnly value={data.reason} />
                                                </Box>
                                            </Box>

                                        )
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
