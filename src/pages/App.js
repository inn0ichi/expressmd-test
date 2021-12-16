import { Typography, Box, Container, Button , Paper } from '@mui/material'
import Nav from '../components/appcomponents/Nav'
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../redux/actions/uiAction";

const style = {
    requestBtn: {
        borderColor : "white"
    },

    textBtn: {
        display: "flex",
        flexWrap: "wrap",
        fontSize: "14px",
        color: "white",
        padding: "15px",
        textAlign : "center"
    },

    topPhoto: {
        height: "150px",
        width: "110px",
        marginLeft : "10px"
    },

    topContainer: {
        display: "flex",
        justifyContent : "center",
        alignItems: "center",
        marginTop : "20px"

    },
    paperContainer : {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding : "10px",
        backgroundColor : "#16C2D5"
    }
}

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    return (
        <Box className='base'>
            <Container>
                <Box sx={style.topContainer}>
                    <Paper sx = {style.paperContainer} elevation={5}>
                    <Button sx={style.requestBtn} variant="outlined">
                        <Typography sx={style.textBtn}>
                            "Request a Home visit now"
                        </Typography>
                    </Button>
                    <Box component="img" src={TopPhoto} alt="" sx={style.topPhoto}></Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    )
}
