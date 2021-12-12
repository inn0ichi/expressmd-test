import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import Nav from '../../components/appcomponents/Nav';
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function SearchDoc() {
    return (
        <Box>
            <Nav />
            <Container className="searchContainer">
                <SearchInterface />
            </Container>
        </Box>
    )
}
