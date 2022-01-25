import { MenuItem, Select, Button, Box, Typography, FormControl, Container, FormGroup, FormControlLabel, Switch, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";
import { useTranslation } from 'react-i18next';
import './css/Settings.css';

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function Settings() {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const { t, i18n } = useTranslation()

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    function setEn() {
        localStorage.setItem("locale", "en");
        window.location.reload()
    }
    function setPh() {
        localStorage.setItem("locale", "ph");
        window.location.reload()
    }

    return (
        <Box>
            <Typography>Settings</Typography>
            <Container>
                <FormGroup>
                    <FormControl>
                        <FormControlLabel
                            label={t("settinglist.dmode")}
                            control={
                                <React.Fragment>
                                    <Android12Switch checked={ui.isDarkMode} onChange={() => dispatch(toggleTheme(!ui.isDarkMode))} />
                                </React.Fragment>
                            }
                            labelPlacement="start"
                            className="darkThemeSwitch"
                        >
                        </FormControlLabel>

                    </FormControl>
                    <FormControl>
                        <FormControlLabel
                            label={t("settinglist.changeLang")}
                            control={
                                <React.Fragment>
                                    <Button size="small" variant="contained" onClick={() => setEn()}>English</Button>
                                    <Button size="small" variant="contained" onClick={() => setPh()}>Tagalog</Button>
                                </React.Fragment>
                            }
                            labelPlacement="start"
                            className="darkThemeSwitch"
                        >
                        </FormControlLabel>

                    </FormControl>
                </FormGroup>
            </Container>
        </Box>
    )
}
