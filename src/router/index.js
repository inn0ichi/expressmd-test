import '../App.css';

import React, { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from '../pages/App';
import SearchDoc from '../pages/App/SearchDoc';
import DocProfile from '../pages/App/DocProfile';
import UserRegistration from '../pages/App/UserRegistration';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import Profile from '../pages/App/Profile';
import Nav from '../components/appcomponents/Nav';

export default function RouterComponent() {
    const ui = useSelector((state) => state.ui);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#2D539E',
                dark: '#84A0C6',
                light: '#2D539E',
            },
            secondary: {
                main: '#80b2bd',
            },
            text: {
                primary: '#fff',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#434343',
                default: '#161821',
            },
        },

        typography: {
            fontFamily: 'Roboto',
        },
    })

    const lightTheme = createTheme({
        palette: {
            primary: {
                main: '#16C2D5',
            },
            secondary: {
                main: '#16C2D5',
            },
            text: {
                primary: '#33374C',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#f9fbfd',
                default: '#fcfcfc',
            },
        },

        typography: {
            fontFamily: 'Roboto',
        },
    })
    const [value, setValue] = useState(0);
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Nav />
            <Router>
                <Switch >
                    <Route exact component={App} path="/" />
                    <Route exact component={SearchDoc} path="/search" />
                    <Route exact component={DocProfile} path="/p/:id" />
                    <Route exact component={UserRegistration} path="/register" />
                    <Route exact component={Profile} path="/profile" />
                </Switch>
                <Box>
                    <Paper elevation="8" className="bottomNav">
                        <BottomNavigation
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            className="bottomNavContainer"
                        >
                            <NavLink to='/'>
                                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                            </NavLink>
                            <NavLink to='/search'>
                                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                            </NavLink>
                            <NavLink to='/profile'>
                                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
                            </NavLink>
                        </BottomNavigation>
                    </Paper>
                </Box>
            </Router>

        </ThemeProvider>
    );
}

