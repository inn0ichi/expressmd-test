import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import firebase from '../../config/firebase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './css/TransactionHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";
import { useHistory, useParams, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function TransactionHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEmpty, setisEmpty] = useState(false);
    useEffect(() => {
        let isSubscribed = true;
        getAuth().onAuthStateChanged(function (user) {
            if (!user) {
                history.push('/login');
            }
        });
        return () => {
            isSubscribed = false;
        }
    }, []);

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    const db = firebase.firestore();
    const [transactions, setTransactions] = useState({
        datas: [],
    })
    const fetchData = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid")).collection("archive");
        const data = await userRef.get();
        if (data.size > 0) {
            setisEmpty(false);
            let dataPayload = [];
            data.docs.forEach((onSnapshot) => {
                dataPayload.push(onSnapshot.data());
                setTransactions({ datas: dataPayload });
            });
        } else {
            setisEmpty(true);
        }

    }
    useEffect(() => {
        fetchData();
        console.log(isEmpty);
    }, []);
    return (
        <Box>
            <Typography>Transaction History</Typography>
            <Box className='transactionBox'>
                {isEmpty ?
                    <Typography variant="subtitle2">
                        There are no previous appointments.
                    </Typography>
                    :
                    <List className='transactionList'>
                        {transactions && transactions.datas.map((transactions) => {
                            let setDate = transactions.datetime.toDate().toLocaleDateString();
                            let setTime = transactions.datetime.toDate().toLocaleTimeString();
                            return (
                                <ListItem>
                                    <Link to={`/r/${transactions.userID}/view`}>
                                        <Paper>
                                            <Typography>
                                                Doctor Assigned: {transactions.assigned_doctor}
                                            </Typography>
                                            <Typography>
                                                Date: {setDate}
                                            </Typography>
                                            <Typography>
                                                Time: {setTime}
                                            </Typography>
                                        </Paper>
                                    </Link>
                                </ListItem>
                            );
                        })
                        }
                    </List>
                }
            </Box>
        </Box>
    )
}
