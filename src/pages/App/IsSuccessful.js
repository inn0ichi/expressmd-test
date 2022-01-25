import { Box, Container, Typography, Button, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function IsSuccessful() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { status } = useParams();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    const style = {
        outerCon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },

        innerConPaper: {
            display: "flex",
            backgroundColor: "#575757",
            flexDirection: "column",
            minWidth: "100px",
            padding: "20px",
            borderRadius: "10px",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "190px"
        },

        label: {
            textAlign: "center",
            color: "white",
            fontSize: "18px"
        },

        sublabel: {
            textAlign: "center",
            color: "#E9E9E9",
            fontStyle: "italic",
            fontSize: "12px",
            marginTop: "10px",
            marginBottom: "10px"
        },

        btn: {
            backgroundColor: "#167694"
        },


    }

    return (
        <Box sx={style.outerCon}>
            {(() => {

                switch (status) {
                    case "request":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Appointment Successfully Requested
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Please wait for your request to be confirmed. Thank your for using ExpressMD
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/")}>OK</Button>
                            </Paper>
                        );
                    case "reset":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Password Reset Email Sent!
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    The password reset email has been sent. Please check your mailbox.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/")}>OK</Button>
                            </Paper>
                        );
                    case "edited":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Date and Time Successfully Changed
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Please wait for your edit to be reviewed and confirmed by your doctor. Thank You.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/")}>OK</Button>
                            </Paper>
                        );
                    case "cancellation":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Cancellation Request Successful
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Your doctor will now review and process the cancellation of your appointment. Thank You.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/")}>OK</Button>
                            </Paper>
                        );
                    case "accepted":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Request Accepted
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Your doctor may now contact you using your Phone Number. Please coordinate accordingly. Thank You for using ExpressMD.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/")}>OK</Button>
                            </Paper>
                        );
                    default:
                        return null;
                }
            })()}

        </Box >
    );
}

