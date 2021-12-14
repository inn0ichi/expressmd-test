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
        <Box>
            <Nav />
            <Container className="searchContainer">
                <SearchInterface />
            </Container>
            <Box>
                <Paper elevation="8" className="bottomNav">
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </Box>
    )
}
