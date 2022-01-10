import { Typography, Box, Container, Button, Paper } from "@mui/material";
import Nav from "../components/appcomponents/Nav";
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from "@mui/icons-material/Campaign";
import category from "../assets/child 1.png";
import doctorPhoto from "../assets/doctor 1.png";
import { borderRadius, fontWeight } from "@mui/system";
import { Link, useHistory } from "react-router-dom";
import firebase from '../config/firebase';
import { getAuth } from "firebase/auth";

const style = {
  requestBtn: {
    borderColor: "white",
    marginLeft: "10px"
  },

  textBtn: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "14px",
    color: "white",
    padding: "15px",
    textAlign: "center",
  },

  topPhoto: {
    height: "150px",
    width: "110px",
    marginLeft: "10px",
    marginRight: "10px"
  },

  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "15px",
    marginRight: "15px"
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "400px",
    height: "170px",
    backgroundColor: "#16C2D5",
  },

  wrapper: {
    marginTop: "30px",
    maxHeight: "80px",
    display: "flex",
    overflowX: "auto",
    "-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
  },

  categoryPaper: {
    minWidth: "200px",
    height: "80px",
    borderColor: "#7EB6BC",
    borderWidth: "2px",
    marginRight: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
  },

  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  category: {
    height: "50px",
    width: "50px",
    alignItems: "center",
    padding: "5px",
    borderRadius: "3px",
  },
  categoryText: {
    fontSize: "14px",
    marginLeft: "8px",
  },

  label: {
    marginTop: "20px",
  },

  appointmentSched: {
    padding: "20px",
    borderColor: "#7EB6BC",
    borderWidth: "2px",
  }
};

const user = getAuth();
var database = firebase.database();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const [isEmpty, setisEmpty] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const [fetchAppointments, setfetchAppointments] = useState({
    appointments: [],
  })

  const fetchList = () => {
    if (user.currentUser) {
      const userRef = db.collection('users').doc(localStorage.getItem("uid")).collection("requests").doc(localStorage.getItem("uid"));
      userRef.onSnapshot((doc) => {
        if (doc.exists) {
          setisEmpty(false);
          let getAppointment = [];
          userRef.get().then(doc => {
            getAppointment.push(doc.data());
            setfetchAppointments({ appointments: getAppointment });
          })
        } else {
          // doc.data() will be undefined in this case
          setisEmpty(true);
        }
      });
    } else {
      setisEmpty(true);
    }
  }
  /* 
  
    const fetchAnnouncement = () => {
      const dbRef = firebase.database().ref();
      dbRef.child("aotd").get().then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    } */

  useEffect(() => {
    fetchList();
    /* fetchAnnouncement(); */
  }, []);

  return (
    <Box className="base">
      <Container>
        <Box className="tickerBox">
          <Paper>
            <Ticker mode="await" speed="4" offset="25">
              {({ index }) => (
                <>
                  <Box className="ticker">
                    <CampaignIcon />
                    <Typography variant="subtitle2">
                      Sample Announcement! This is a test!{" "}
                    </Typography>
                  </Box>
                </>
              )}
            </Ticker>
          </Paper>
        </Box>
        <Box sx={style.topContainer}>
          <Paper sx={style.paperContainer} elevation={5}>
            <Button disabled sx={style.requestBtn} variant="outlined">
              <Typography sx={style.textBtn}>Welcome to ExpressMD</Typography>
            </Button>
            <Box
              component="img"
              src={TopPhoto}
              alt=""
              sx={style.topPhoto}
            ></Box>
          </Paper>
        </Box>
        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                Scheduled Appointment
              </Typography>
              <Box className="schedDetails">
                {isEmpty ?
                  <Typography className="schedText" variant="subtitle2">
                    There is no scheduled appointment.
                  </Typography>
                  :
                  fetchAppointments.appointments.map((setappointment) => {
                    let setDate = setappointment.datetime.toDate().toLocaleDateString();
                    let setTime = setappointment.datetime.toDate().toLocaleTimeString();
                    return (
                      <Link to={`/r/${setappointment.userID}/view`}>
                        <Paper variant="outlined" key={setappointment.userID} sx={style.appointmentSched} >
                          <Typography>Date: {setDate}</Typography>
                          <Typography>Time: {setTime}</Typography>
                          <Typography variant="subtitle2">Assigned Doctor:{setappointment.assigned_doctor}</Typography>
                          <Typography variant="subtitle2">Status:{setappointment.status}</Typography>
                        </Paper>
                      </Link>
                    )

                  })
                }

              </Box>
            </Paper>
          </Container>
        </Box>

        <Box sx={style.label}>
          <Typography variant="h6">Doctor Category</Typography>
        </Box>
        <Box sx={style.wrapper}>
          <Paper sx={style.categoryPaper} variant="outlined">
            <Box sx={style.item}>
              <Box
                component="img"
                src={doctorPhoto}
                alt=""
                sx={style.category}
                style={{ backgroundColor: "#FFC107" }}
              ></Box>
              <Typography variant="subtitle2" sx={style.categoryText}>
                General Doctor
              </Typography>
            </Box>
          </Paper>
          <Paper sx={style.categoryPaper} variant="outlined">
            <Box sx={style.item}>
              <Box
                component="img"
                src={category}
                alt=""
                sx={style.category}
                style={{ backgroundColor: "#65A4DA" }}
              ></Box>
              <Typography variant="subtitle2" sx={style.categoryText}>
                Pediatrics
              </Typography>
            </Box>
          </Paper>
          {/* <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                        <Typography variant="subtitle2" sx = {style.categoryText}>Pediatrics</Typography>
                    </Box>
                    </Paper>
                    <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                    category 4
                    </Box>
                    </Paper> */}
        </Box>
      </Container>
    </Box>
  );
}
