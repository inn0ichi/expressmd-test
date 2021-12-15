import { Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import Nav from '../../components/appcomponents/Nav';
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function SearchDoc() {
    const [value, setValue] = useState(0);
    return (
        <Box className='base'>
            <Container className="searchContainer">
                <SearchInterface />
            </Container>
        </Box>
    )
}
