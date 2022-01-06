import { Box, Container, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function IsSuccessful() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Typography>
                Request Successful. Please wait for your Doctor to respond.
            </Typography>
            <Button variant="outlined" onClick={() => history.push("/")}>OK</Button>
        </Box >
    );
}

