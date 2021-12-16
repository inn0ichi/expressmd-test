import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

export default function EmergencyContact() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Typography>Emergency Contacts</Typography>
        </Box>
    )
}
