import { Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React, { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
                        <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Search" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="Profile" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </Box>
    )
}
