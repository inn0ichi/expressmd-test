import '../App.css';

import React, { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import Request from '../pages/App/Request';
import Nav from '../components/appcomponents/Nav';
import TransactionHistory from '../components/appcomponents/TransactionHistory';
import EmergencyContact from '../components/appcomponents/HospitalContact';
import Settings from '../components/appcomponents/Settings';
import About from '../components/appcomponents/AboutUs';
import Faq from '../components/appcomponents/Faqs'
import IsSuccessful from "../pages/App/IsSuccessful";
import IsNotSuccessful from "../pages/App/IsNotSuccessful";
import ViewRequest from '../pages/App/ViewRequest';

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
                paper: '#1d222e',
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
        <ThemeProvider theme={ui.isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />

            <Router>
                <Nav />
                <Switch >
                    <Route exact component={App} path="/" />
                    <Route exact component={SearchDoc} path="/search" />
                    <Route exact component={DocProfile} path="/p/:id" />
                    <Route exact component={Request} path="/p/:id/request" />
                    <Route exact component={UserRegistration} path="/register" />
                    <Route exact component={Profile} path="/profile" />
                    <Route exact component={TransactionHistory} path="/history" />
                    <Route exact component={EmergencyContact} path="/contacts" />
                    <Route exact component={Settings} path="/settings" />
                    <Route exact component={About} path="/aboutUs" />
                    <Route exact component={Faq} path="/faq" />
                    <Route exact component={IsSuccessful} path="/success" />
                    <Route exact component={IsNotSuccessful} path="/sorry" />
                    <Route exact component={ViewRequest} path="/r/:id/view" />
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
                                <BottomNavigationAction label="Home" icon={<HomeIcon color="secondary" />} />
                            </NavLink>
                            <NavLink to='/search'>
                                <BottomNavigationAction label="Search" icon={<SearchIcon color="secondary" />} />
                            </NavLink>
                            <NavLink to='/profile'>
                                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon color="secondary" />} />
                            </NavLink>
                        </BottomNavigation>
                    </Paper>
                </Box>
            </Router>

        </ThemeProvider>
    );
}

