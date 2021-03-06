import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function SearchDoc() {
    const dispatch = useDispatch();

    useEffect(() => {
        let isSubscribed = true;
        dispatch(getTheme());
        return () => {
            isSubscribed = false;
        };
    }, [dispatch]);
    return (
        <Box className='base'>
            <Container className="searchContainer">
                <SearchInterface />
            </Container>
        </Box>
    )
}

