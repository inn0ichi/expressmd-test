import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import Nav from '../components/appcomponents/Nav'

export default function App() {
    return (
        <Box className='base'>
            <Nav />
            <Container>
                <Typography>Test</Typography>
            </Container>
        </Box>
    )
}
