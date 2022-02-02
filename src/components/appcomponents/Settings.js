import { MenuItem, Select, Button, Box, Typography, FormControl, Container, FormGroup, FormControlLabel, Switch, styled, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";
import { useTranslation } from 'react-i18next';
import './css/Settings.css';
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";

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
        let isSubscribed = true;
        dispatch(getTheme());
        return () => {
            isSubscribed = false;
        };
    }, [dispatch]);

    function setEn() {
        localStorage.setItem("locale", "en");
        window.location.reload()
    }
    function setPh() {
        localStorage.setItem("locale", "ph");
        window.location.reload()
    }


    //fontawesome
    React.useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
            // Inject before JSS
            document.querySelector("#font-awesome-css") || document.head.firstChild
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);


    const style = {
        outerCon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },

        paperCon: {
            padding: "20px",
            minWidth: "250px",
            marginTop:"30px",
            
        },

        LabelCon: {
            marginTop: "5px",
            textAlign: 'center',
            marginLeft: "10px"
        },

        Label: {
            fontSize: "24px"
        }
    }
    return (
        <Box>
            <Typography className="headerStyle">
                <Icon
                    baseClassName="fas"
                    className="fas fa-tools"
                    sx={{
                        fontSize: { xs: 30, md: 50 },
                        color: "primary",
                        width: 300,
                        marginTop: 2,
                    }}
                />
            </Typography>
            <Box sx={style.LabelCon}>
                <Typography sx={style.Label}>Settings</Typography>
            </Box>
            <Container>
                <FormGroup>
                    <FormControl>
                        <Paper sx={style.paperCon}>
                            <FormControlLabel
                                label={t("settinglist.dmode")}
                                control={
                                    <React.Fragment>
                                        <Android12Switch sx={{marginLeft:"150px"}} checked={ui.isDarkMode} onChange={() => dispatch(toggleTheme(!ui.isDarkMode))} />
                                    </React.Fragment>
                                }
                                labelPlacement="start"
                                className="darkThemeSwitch"
                            >
                            </FormControlLabel>
                        </Paper>
                    </FormControl>
                    <FormControl>
                        <Paper sx={style.paperCon}>
                            <FormControlLabel
                                label={t("settinglist.changeLang")}
                                control={
                                    <React.Fragment>
                                        <Button size="small" sx={{marginLeft:"30px"}} variant="contained" onClick={() => setEn()}>English</Button>
                                        <Button size="small" sx={{marginLeft:"30px"}} variant="contained" onClick={() => setPh()}>Tagalog</Button>
                                    </React.Fragment>
                                }
                                labelPlacement="start"
                                className="darkThemeSwitch"
                            >
                            </FormControlLabel>
                        </Paper>

                    </FormControl>
                </FormGroup>
            </Container>
        </Box>
    )
}
