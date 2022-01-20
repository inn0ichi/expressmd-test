import { Box, Container, Typography, Button , Paper } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function IsNotSuccessful() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    const style = {
        outerCon : {
            display : "flex",
            alignItems : "center",
            justifyContent : "center"
        },

        innerConPaper : {
            display : "flex",
            backgroundColor : "#575757",
            flexDirection : "column",
            minWidth : "100px",
            padding : "20px",
            borderRadius : "10px",
            marginLeft : "30px",
            marginRight : "30px",
            marginTop : "190px"
        },

        label : {
            textAlign : "center",
            color : "white",
            fontSize : "18px"
        },

        sublabel : {
            textAlign : "center",
            color : "#E9E9E9",
            fontStyle : "italic",
            fontSize : "12px",
            marginTop : "10px",
            marginBottom : "10px"
        },

        btn : {
            backgroundColor : "#167694"
        },


    }

    return (
        <Box sx = {style.outerCon}>
            <Paper sx = {style.innerConPaper}>
            <Typography sx = {style.label}>
                Request Unsuccessful.
            </Typography>
            <Typography sx = {style.sublabel}>
            Please try again later
            </Typography>
            <Button variant="filled" sx = {style.btn} onClick={() => history.push("/")}>OK</Button>
            </Paper>
        </Box >
    );
}

