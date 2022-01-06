import { Box, Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

function isSuccessful() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Typography>
                Request Successful. Please wait for your Doctor to respond.
            </Typography>
        </Box>
    );
}

function isnotSuccessful() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Typography>
                LMAO
            </Typography>
        </Box>
    );
}

export default function PostRequest(isSuccess) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box className='base'>
            <Box>
                {isSuccess ? <isSuccessful /> : <isnotSuccessful />}
            </Box>
        </Box >
    )
}

