import { Typography, Box, Container, Button, Paper } from '@mui/material'
import Nav from '../components/appcomponents/Nav'
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from '@mui/icons-material/Campaign';
import category from "../assets/child 1.png"
import { textAlign } from '@mui/system';

const style = {
    requestBtn: {
        borderColor: "white"
    },

    textBtn: {
        display: "flex",
        flexWrap: "wrap",
        fontSize: "14px",
        color: "white",
        padding: "15px",
        textAlign: "center"
    },

    topPhoto: {
        height: "150px",
        width: "110px",
        marginLeft: "10px"
    },

    topContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"

    },
    paperContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#16C2D5"
    },

    wrapper : {
        marginTop : "30px",
        maxHeight : "200px",
        display : "flex",
        overflowX : "auto",
        "-webkit-scrollbar" : {
            width : "0px" ,

        }

    },

    categoryPaper : {
        minWidth : "200px",
        height : "80px",
        lineHeight : "110px",
        borderColor : "#7EB6BC",
        marginRight : "20px",
        borderRadius : "8px",
        display : "flex",
        justifyContent : "center",
        
    },

    item : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        flexDirection : "row"

    },

    category : {
        height : "50px",
        width : "50px",
        alignItems : "center"
    },

}

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    return (
        <Box className='base'>
            <Container>
                <Box className='tickerBox'>
                    <Paper>
                        <Ticker mode="await" speed='4' offset='25'>
                            {({ index }) => (
                                <>
                                    <Box className='ticker'>
                                        <CampaignIcon />
                                        <Typography variant="subtitle2">Sample Announcement! This is a test! </Typography>
                                    </Box>

                                </>
                            )}
                        </Ticker>
                    </Paper>
                </Box>
                <Box sx={style.topContainer}>
                    <Paper sx={style.paperContainer} elevation={5}>
                        <Button disabled sx={style.requestBtn} variant="outlined">
                            <Typography sx={style.textBtn}>
                                Welcome to ExpressMD
                            </Typography>
                        </Button>
                        <Box component="img" src={TopPhoto} alt="" sx={style.topPhoto}></Box>
                    </Paper>
                </Box>
                <Box className='schedBox'>
                    <Container>
                        <Paper elevation={3} className='schedPaper'>
                            <Typography className='schedHeader' variant='h6'>Scheduled Appointment</Typography>
                            <Box className='schedDetails'>
                                <Typography className='schedText' variant="subtitle2">There is no scheduled appointment.</Typography>
                                <Button className='schedButton' variant='contained'>Set an appointment now</Button>
                            </Box>
                        </Paper>
                    </Container>
                </Box>

                <Box>
                    <Box component = "label">Doctor Category</Box>
                </Box>
                <Box sx = {style.wrapper}>
                <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                    category 1
                    </Box>
                </Paper>
                <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                        <Box component = "img" src = {category} alt = "" sx = {style.category}></Box>
                        <Typography variant="subtitle2">Pediatrics</Typography>
                    </Box>
                    </Paper>
                    <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                    category 3
                    </Box>
                    </Paper>
                    <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                    category 4
                    </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    )
}
