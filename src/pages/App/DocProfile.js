import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Rating, Typography, Box, Container, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import {
    useParams
} from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Link } from 'react-router-dom';
import '../App/DocProfile.css'

export default function DocProfile() {
    const { id } = useParams();

    const db = firebase.firestore();
    const [doctorProfile, setdoctorProfile] = useState({
        profile: [],
    });
    const [isEmpty, setisEmpty] = useState(false);
    const [fetchTopDoc, setfetchTopDoc] = useState({
        topdoc: [],
    })

    const fetchTopRated = () => {
        const docRef = db.collection('doctors').doc(id).collection("usrrating").orderBy("rating", "desc").limit(3);
        docRef.onSnapshot((doc) => {
            if (doc.size > 0) {
                setisEmpty(false);
                let getTopDoctor = [];
                doc.forEach((req) => {
                    getTopDoctor.push(req.data());
                });
                setfetchTopDoc({ topdoc: getTopDoctor });
            } else {
                setisEmpty(true);
            }

        })
    }

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(id);
        let docProfile = [];
        docRef.get().then((doc) => {
            docProfile.push(doc.data());
            setdoctorProfile({ profile: docProfile });
        });
        isMounted = false
    };

    useEffect(() => {
        let isSubscribed = true;
        fetchTopRated();
        fetchData();
        return () => {
            isSubscribed = false;
        };
    }, []);

    return (
        <Box className='base'>
            <Container className='container'>
                <Box>
                    {doctorProfile &&
                        doctorProfile.profile.map((docProfile) => {
                            return (
                                <Box className="docProfileBox" key={docProfile.phoneNum}>
                                    <Box>
                                        <Box>
                                            <img className="docImg" alt={docProfile.lastname} src={docProfile.photoURL} />
                                        </Box>
                                        <Box className="docDetails">
                                            <Typography>Specialty: {docProfile.type}</Typography>
                                            <Typography>Location: {docProfile.location}</Typography>
                                            <Typography>Phone Number: {docProfile.phoneNum}</Typography>
                                            <Button variant="outlined">Request Appointment</Button>
                                        </Box>
                                    </Box>
                                    <Box className="docName">
                                        <Typography variant="h4" className="docDeets">{docProfile.lastname}, {docProfile.firstname} {docProfile.middleInitials}.</Typography>
                                        <Typography variant="h5" className="docDeets">{docProfile.type}</Typography>
                                    </Box>
                                    <Box className="docDetails2">
                                        <Typography>Specialty: {docProfile.type}</Typography>
                                        <Typography>Location: {docProfile.location}</Typography>
                                        <Typography>Phone Number: {docProfile.phoneNum}</Typography>


                                    </Box>
                                    <Box className="starsRating">
                                        <Rating
                                            name="text-feedback"
                                            value="5"
                                            readOnly
                                            precision={0.5}
                                            icon={<StarRoundedIcon />}
                                            emptyIcon={<StarRoundedIcon />}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                </Box>

                <Box className='reviewBox'>

                    <List className='reviewList'>
                        <Typography variant="h6" alignItems="flex-start">Reviews</Typography>

                        <Box>
                            {isEmpty ?
                                <Typography variant="subtitle2">
                                    <Typography>There are currently no ratings for this doctor</Typography>
                                </Typography>
                                :
                                fetchTopDoc.topdoc.map((data) => {
                                    return (
                                        <Box key={data.uid}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={data.fullname} src={data.fullname} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<React.Fragment>
                                                        <Rating
                                                            name="text-feedback"
                                                            value={data.rating}
                                                            readOnly
                                                            precision={1}
                                                            icon={<StarRoundedIcon />}
                                                            emptyIcon={<StarRoundedIcon />}

                                                        />
                                                    </React.Fragment>
                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {data.review}
                                                            </Typography>
                                                            {` — ${data.fullname}`}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </List>
                </Box>
            </Container >
        </Box >
    )
}
