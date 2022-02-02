import { Box, Typography, Paper, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';
import JayRon from '../../assets/jayron.jpg'
import Regine from '../../assets/regine.jpg'
import Prago from '../../assets/prago.jpg'
import Jym from '../../assets/jym.jpg'
import Marc from '../../assets/marc.jpg'
import Footer from '../../components/Footer';
export default function AboutUs() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
            // Inject before JSS
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);
    return (
        <Box>
            <Typography className='headerStyle'>
                <Icon baseClassName="fas" className="fas fa-users" sx={{ fontSize: { xs: 30, md: 50 }, color: "primary", width: 300, marginTop: 2 }} />
            </Typography>
            <Typography variant='h5' className='headerStyle'>About Us</Typography>
            <Box className="aboutUsTextContainer">
                <Typography className="aboutUsText">
                    ExpressMD aims to provide users with the ability to find doctors without having to go outside. This is useful for the children, elderly, and pregnant women who need medical care without having to go to a clinic or hospital.

                    Request an appointment now and receive the medical services that we offer. We assure you that the doctors in ExpressMD are all professional and passed our screening before hiring them.
                </Typography>
            </Box>
            <Paper elevation="8" >
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
            <Footer />
        </Box>




    )
}
