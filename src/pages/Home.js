import { Box, Typography, Button, Paper, Divider } from '@mui/material'
import React from 'react'
import Home1 from '../assets/home1.jpg'
import Child from '../assets/child.png'
import GenDoc from '../assets/genDoc.png'
import JayRon from '../assets/jayron.jpg'
import Regine from '../assets/regine.jpg'
import Prago from '../assets/prago.jpg'
import Jym from '../assets/jym.jpg'
import Marc from '../assets/marc.jpg'
import '../App.css';
import { Helmet } from 'react-helmet';

export default function Home() {
    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ExpressMD</title>
            </Helmet>
            <Box className="homeBox">
                <Box className="headerBox" >
                    <Box className="box1 slide-right">
                        <h1 className="header">
                            HOME CARE FOR YOUR FAMILY
                        </h1>
                        <Typography className="homeText1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Integer finibus placerat mauris ac dignissim.
                            Nunc at ultrices ipsum. Nunc viverra, lacus a pellentesque posuere, ex ex tempor mauris,
                            id placerat nunc metus ac est.
                        </Typography>

                        <Button className="AppButton" variant="contained">Launch the App</Button>
                    </Box>
                    <img src={Home1} className="homeImg1 slide-left" />
                </Box>
            </Box>
            <Box className="typesList">
                <Box className="typesContainer">
                    <Typography className="header" color="secondary" variant="h3">Our Services</Typography>
                </Box>
                <Box className="typeBox">
                    <Paper className="typePaper" elevation="8">
                        <Box>
                            <img src={Child} className="childImg" />
                            <Typography variant="h6">Pediatrics</Typography>
                        </Box>
                        <Box>
                            <img src={GenDoc} className="genDocImg" />
                            <Typography variant="h6">General Doctor</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <Box className="aboutUsBox">
                <Box className="aboutUsContainer">
                    <Typography className="header" variant="h3">About Us</Typography>
                </Box>
            </Box>
            <Box className="ourTeamBox">
                <Box className="ourTeamContainer">
                    <Typography className="header" variant="h3">Meet The Team</Typography>
                </Box>
                <Box className="typeBox">
                    <Paper elevation="8">
                        <Box className="ourTeamContainer2">
                            <Box className="avatarContainer">
                                <img src={Regine} className="teamAvatar" />
                                <Typography variant="h6">Regine Manuel</Typography>
                                <Typography variant="subtitle1">Team Leader</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem className="dividerVert" />
                            <Divider orientation="horizontal" flexItem className="dividerHori" />
                            <Box className="avatarContainer">
                                <img src={Prago} className="teamAvatar" />
                                <Typography variant="h6">Cristofer Prago</Typography>
                                <Typography variant="subtitle1">Front-End Developer</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem className="dividerVert" />
                            <Divider orientation="horizontal" flexItem className="dividerHori" />
                            <Box className="avatarContainer">
                                <img src={Marc} className="teamAvatar" />
                                <Typography variant="h6">Marc Angelo Chiapco</Typography>
                                <Typography variant="subtitle1">Back-End Developer</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem className="dividerVert" />
                            <Divider orientation="horizontal" flexItem className="dividerHori" />
                            <Box className="avatarContainer">
                                <img src={Jym} className="teamAvatar" />
                                <Typography variant="h6">Jym Cyruz Fajiculay</Typography>
                                <Typography variant="subtitle1">Front-End Developer</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem className="dividerVert" />
                            <Divider orientation="horizontal" flexItem className="dividerHori" />
                            <Box className="avatarContainer">
                                <img src={JayRon} className="teamAvatar" />
                                <Typography variant="h6">Jay Ron Mendoza</Typography>
                                <Typography variant="subtitle1">Back-End Developer</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
