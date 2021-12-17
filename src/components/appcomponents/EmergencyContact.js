import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';

export default function EmergencyContact() {
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
                <Icon baseClassName="fas" className="fas fa-ambulance" sx={{ fontSize: { xs: 30, md: 50 }, color: "primary", width: 300,marginTop:2}} />
            </Typography>
            <Typography variant='h5' className='headerStyle'>Emergency Numbers</Typography>
            
        </Box>
    )
}
