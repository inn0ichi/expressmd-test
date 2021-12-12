import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import '../App.css'

export default function Footer() {
    return (
        <Box className="footer">
            <Container className="footerContainer">
                <Typography color="primary">©ExpressMD 2021</Typography>
            </Container>
        </Box>
    )
}
