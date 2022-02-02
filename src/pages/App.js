import {
  Typography,
  Box,
  Container,
  Button,
  Paper,
  Rating,
} from "@mui/material";
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png";
import Ambulance from "../assets/ambulance.png";
import React, { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Link, useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import Fab from '@mui/material/Fab';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import NotificationsIcon from '@mui/icons-material/Notifications';

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

  topPhoto2: {
    height: "65px",
    width: "80px",
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

  paperContainer2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "400px",
    height: "110px",
    backgroundColor: "#ed3949",
  },

  wrapper: {
    display: "flex",
    marginTop: "30px",
    marginBottom: "20px",
    minHeight: "100px",
    overflowX: "auto",
    "-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
  },

  categoryPaper: {
    minWidth: "100px",
    borderColor: "#7EB6BC",
    borderWidth: "2px",
    marginRight: "20px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    minHeight: "180px",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "5px"
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
    minWidth: "250px"
  },
  docName: {
    fontSize: "14px",
    textAlign: "center"
  },
  itemCon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    display: "flex",
    width: "250px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  notifButton: {
    position: 'fixed',
    bottom: 70,
    right: 16,
  },
  notifmodal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 330,
    bgcolor: 'background.paper',
    elevation: 5,
    boxShadow: 24,
    p: 4,
  }
};


const user = getAuth();
var database = firebase.database();

export default function App() {

  //notif

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(0);
  function handleOpen(e) {
    e.preventDefault();
    setCount(0);
    setOpen(true);

  }
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    dispatch(getTheme());
    i18n.changeLanguage(localStorage.getItem("locale"));
    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);

  //icons

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

  const { t, i18n } = useTranslation();

  const [isEmpty, setisEmpty] = useState(false);
  const [isLoggedOut, setisLoggedOut] = useState(true);
  const history = useHistory();
  const db = firebase.firestore();
  const database = firebase.database();
  const [fetchAppointments, setfetchAppointments] = useState({
    appointments: [],
  });

  const [getAnnouncement, setgetAnnouncement] = useState("");
  const [getNotif, setNotif] = useState("");

  const [fetchTopDoc, setfetchTopDoc] = useState({
    topdoc: [],
  });


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      localStorage.setItem("uid", uid);
      setisLoggedOut(false);
      const notifRef = firebase.database().ref('/users/' + localStorage.getItem("uid") + "/request/" + localStorage.getItem("uid") + '/status');
      notifRef.on('value', (snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.val();
          setNotif(data);
          const customId = data;

          toast.info(data, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: customId,
          });
        }
      });
      // ...
    } else {
      // User is signed out
      // ...
      setisLoggedOut(true);
    }
  });

  useEffect(() => {
    let isSubscribed = true;
    getAuth().onAuthStateChanged(function (user) {
      if (!user) {
        setisLoggedOut(true);
      } else {

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
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [isEmpty]);

  /*   const fetchList = () => {
      
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
    }; */

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
              <Typography sx={{ ml: "5px" }} variant="subtitle2">{getAnnouncement}</Typography>
            </Box>
          </>
        )}
      </Ticker>
    );
  };

  useEffect(() => {
    let isSubscribed = true;
    fetchTopRated();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Box className="base">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              alt="top photo"
              sx={style.topPhoto}
            ></Box>
          </Paper>
        </Box>

        <Box sx={style.topContainer}>
          <Paper sx={style.paperContainer2} elevation={5} onClick={() => history.push("/contacts")}>
            <Button disabled sx={style.requestBtn} variant="outlined">
              <Typography sx={style.textBtn}>Emergency Hotlines</Typography>
            </Button>
            <Box
              component="img"
              src={Ambulance}
              alt="ambulance logo"
              sx={style.topPhoto2}
            ></Box>
          </Paper>
        </Box>

        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                {t("scheduled_appointment")}
              </Typography>
              <Box className="schedDetails">
                {(() => {
                  switch (isLoggedOut) {
                    case true:
                      return (
                        <Box>
                          <Typography className="schedText" variant="subtitle2">
                            {t("pleaseLogin")}
                          </Typography>
                          <Button sx={style.btn}
                            variant="contained"
                            onClick={() => history.push("/login")}
                          >
                            {t("login")}
                          </Button>
                        </Box>
                      );
                    case false:
                      return (
                        <Box>
                          {(() => {
                            switch (isEmpty) {
                              case true:
                                return (
                                  <Box>
                                    <Typography className="schedText" variant="subtitle2">
                                      {t("no_appointment")}
                                    </Typography>
                                    <Button sx={style.btn}
                                      variant="contained"
                                      onClick={() => history.push("/request")}
                                    >
                                      {t("requestAppointment")}
                                    </Button>
                                  </Box>
                                );
                              case false:
                                return (
                                  <Box>
                                    {
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
                                              <Typography variant="subtitle2">
                                                Status: {setappointment.status}
                                              </Typography>
                                            </Paper>
                                          </Link>
                                        );
                                      })
                                    }
                                  </Box>
                                )

                              default:
                                return null;
                            }
                          })()}
                        </Box>
                      )
                    default:
                      return null;
                  }
                })()}

              </Box>
            </Paper>
          </Container>
        </Box>

        <Box sx={style.label}>
          <Typography variant="h6">Top Rated Doctors</Typography>
        </Box>
        <Box sx={style.wrapper}>
          {fetchTopDoc.topdoc.map((data) => {
            return (
              <Link to={`p/${data.uid}`} key={data.uid}>

                <Box>
                  <Paper sx={style.categoryPaper} elevation={3}>
                    <Box sx={style.itemCon}>
                      <img src={data.photoURL} alt={data.firstname} width="50px" height="50px" />
                      <Typography sx={style.docName}>Dr. {data.firstname + " " + data.lastname}</Typography>
                      <Typography>{data.type}</Typography>
                      <Rating name="rating" value={data.rating} readOnly />
                    </Box>
                  </Paper>
                </Box>

              </Link>
            );
          })}
          <Box sx={style.notifButton}>
            <Badge badgeContent={count} color="success">
              <Fab  color="secondary" onClick={handleOpen}>
                
                  {/* <Icon
                    baseClassName="fas"
                    className="fas fa-bell"
                    sx={{
                      fontSize: { xs: 30, md: 50 },
                      color: "white",
                      width: 300,
                      marginTop: 1,
                    }}
                  /> */}

                    <NotificationsIcon/>
                
              </Fab>
            </Badge>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style.notifmodal}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Notifications
              </Typography>
              <Box className='transactionBox'>
                <Paper sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <ErrorIcon />
                  <Typography>{getNotif}</Typography>
                </Paper>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>

    </Box>
  );
}
