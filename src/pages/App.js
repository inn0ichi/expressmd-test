import {
  Typography,
  Box,
  Container,
  Button,
  Paper,
  Rating,
} from "@mui/material";
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png";
import React, { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Link, useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

const style = {
  requestBtn: {
    borderColor: "white",
    marginLeft: "10px",
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
    marginRight: "10px",
  },

  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "15px",
    marginRight: "15px",
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
  },
};

const user = getAuth();
var database = firebase.database();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
    i18n.changeLanguage(localStorage.getItem("locale"));
  }, [dispatch]);

  const { t, i18n } = useTranslation();

  const [isEmpty, setisEmpty] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const [fetchAppointments, setfetchAppointments] = useState({
    appointments: [],
  });

  const [getAnnouncement, setgetAnnouncement] = useState("");

  const [fetchTopDoc, setfetchTopDoc] = useState({
    topdoc: [],
  });

  useEffect(() => {
    let isSubscribed = true;
    getAuth().onAuthStateChanged(function (user) {
      if (!user) {
        setisEmpty(true);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [isEmpty]);

  const fetchList = () => {
    if (user.currentUser) {
      const userRef = db
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("requests")
        .doc(localStorage.getItem("uid"));
      userRef.onSnapshot((doc) => {
        if (doc.exists) {
          setisEmpty(false);
          let getAppointment = [];
          userRef.get().then((doc) => {
            getAppointment.push(doc.data());
            setfetchAppointments({ appointments: getAppointment });
          });
        } else {
          // doc.data() will be undefined in this case
          setisEmpty(true);
        }
      });
    } else {
      setisEmpty(true);
    }
  };

  const fetchTopRated = () => {
    const docRef = db.collection("doctors").orderBy("rating", "desc").limit(3);
    docRef.onSnapshot((doc) => {
      let getTopDoctor = [];
      doc.forEach((req) => {
        getTopDoctor.push(req.data());
      });
      setfetchTopDoc({ topdoc: getTopDoctor });
    });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [isLoading, setisLoading] = useState(true);

  const Loader = () => (
    <BarLoader color={"blue"} loading={isLoading} css={override} size={64} />
  );

  const FetchAnnouncement = () => {
    const dbRef = firebase.database().ref();
    dbRef
      .child("aotd")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setgetAnnouncement(snapshot.val());
          setisLoading(false);
        } else {
          console.log("No data available");
          setisLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setisLoading(true);
      });
    return (
      <Ticker mode="await" speed="4" offset="25">
        {({ index }) => (
          <>
            <Box className="ticker">
              <CampaignIcon />
              <Typography variant="subtitle2">{getAnnouncement}</Typography>
            </Box>
          </>
        )}
      </Ticker>
    );
  };

  useEffect(() => {
    fetchList();
    fetchTopRated();
  }, []);

  return (
    <Box className="base">
      <Container>
        <Box className="tickerBox">
          <Paper>
            <Suspense fallback={<Loader />}>
              <FetchAnnouncement />
            </Suspense>
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

        <Box className="hospitalNumBox">
          <Button variant="contained" onClick={() => history.push("/contacts")}>
            Hospital Hotlines
          </Button>
        </Box>

        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                {t("scheduled_appointment")}
              </Typography>
              <Box className="schedDetails">
                {isEmpty ? (
                  <Box>
                    <Typography className="schedText" variant="subtitle2">
                      {t("no_appointment")}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => history.push("/request")}
                    >
                      Request Appointment
                    </Button>
                  </Box>
                ) : (
                  fetchAppointments.appointments.map((setappointment) => {
                    let setDate = setappointment.datetime
                      .toDate()
                      .toLocaleDateString();
                    let setTime = setappointment.datetime
                      .toDate()
                      .toLocaleTimeString();
                    return (
                      <Link
                        to={`/r/${setappointment.userID}/view`}
                        key={setappointment.globalID}
                      >
                        <Paper variant="outlined" sx={style.appointmentSched}>
                          <Typography>
                            {t("date")}: {setDate}
                          </Typography>
                          <Typography>
                            {t("time")}: {setTime}
                          </Typography>
                          <Typography>
                            Number of Response:{setappointment.numOfResponse}
                          </Typography>
                          <Typography variant="subtitle2">
                            Status:{setappointment.status}
                          </Typography>
                        </Paper>
                      </Link>
                    );
                  })
                )}
              </Box>
            </Paper>
          </Container>
        </Box>

        <Box sx={style.label}>
          <Typography variant="h6">Top Rated Doctors</Typography>
        </Box>
        <Box>
          {fetchTopDoc.topdoc.map((data) => {
            return (
              <Link to={`p/${data.uid}`} key={data.uid}>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={data.photoURL}
                    alt={data.firstname}
                    width={128}
                    height={128}
                  />
                  <Box>
                    <Typography>
                      Dr. {data.firstname + " " + data.lastname}
                    </Typography>
                    <Typography>{data.type}</Typography>
                    <Rating name="rating" value={data.rating} readOnly />
                  </Box>
                </Paper>
              </Link>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
