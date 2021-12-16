import { Typography, Box, Container , Button } from '@mui/material'
import React from 'react'
import Nav from '../components/appcomponents/Nav'
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png"

const style = {
    requestBtn : {
        
    },

    textBtn : {
        display : "flex",
        flexWrap : "wrap",
        fontSize : "15px",
        color : "black",
        padding : "15px"
    },

    topPhoto : {
        height : "200px",
        width : "125px"
    },

    topContainer : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center"

    }
}

export default function App() {
    return (
        <Box className='base'>
            <Container>
                <Box sx = {style.topContainer}>
                <Button sx = {style.requestBtn} variant = "outlined">
                    <Typography sx = {style.textBtn}>
                        "Request a Home visit now"
                    </Typography>
                </Button>
                <Box component = "img" src = {TopPhoto} alt = "" sx = {style.topPhoto}></Box>
                </Box>
            </Container>
        </Box>
    )
}
