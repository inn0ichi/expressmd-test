import { Typography, Box } from '@mui/material'
import React from 'react'
import Nav from '../components/appcomponents/Nav'
import SearchInterface from '../components/appcomponents/SearchInterface';

export default function App() {
    return (
        <Box>
            <Nav />
            <Typography>Test</Typography>
            <SearchInterface></SearchInterface>
        </Box>
    )
}
