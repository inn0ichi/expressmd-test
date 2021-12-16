import { Typography, Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../redux/actions/uiAction";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    return (
        <Box className='base'>
            <Container>
                <Typography>Test</Typography>
            </Container>
        </Box>
    )
}
