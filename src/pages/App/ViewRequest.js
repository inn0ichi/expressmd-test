import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Rating, Paper, Avatar, IconButton } from "@mui/material";
import { useParams, useHistory, Link } from "react-router-dom";
import firebase from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { loadCSS } from "fg-loadcss";
import Icon from "@mui/material/Icon";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const style = {
  parentCon: {
    display: "flex",
    margin: "20px",
    alignItems: "center",
  },
  label: {
    fontSize: "24px",
    marginRight: "10px",
  },

  subLabel: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "red",
  },
  textField: {
    width: "300px",
  },
  inputField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function ViewRequest() {
  const { id } = useParams();
  const [isBidderEmpty, setisBidderEmpty] = useState(true);

  const history = useHistory();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      localStorage.setItem("uid", uid);
      // ...
    } else {
      // User is signed out
      // ...
      history.push("/login");
    }
  });


  const db = firebase.firestore();
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [appointmentData, setappointmentData] = useState({
    data: [],
  });

  const [fetchBidderData, setfetchBidders] = useState({
    data: [],
  });

  const [userProfile, setuserProfile] = useState({
    profile: [],
  })
  const fetchUser = async () => {
    const userRef = db.collection('users').doc(id);
    let usrProfile = [];
    userRef.get().then(doc => {
      usrProfile.push(doc.data());
      setuserProfile({ profile: usrProfile });
    })
  }

  const fetchData = async () => {
    let isMounted = true;
    const docRef = await db
      .collection("users")
      .doc(localStorage.getItem("uid"))
      .collection("requests")
      .doc(localStorage.getItem("uid"));
    let rawData = [];
    docRef.get().then((doc) => {

      rawData.push(doc.data());
      setappointmentData({ data: rawData });
    });
    isMounted = false;
  };

  const fetchBidders = async () => {

    let isMounted = true;
    const dataRef = await db
      .collection("requests")
      .doc(id)
      .collection("bidders");
    let rawData = [];
    dataRef.onSnapshot((doc) => {
      doc.forEach((doc) => {
        setisBidderEmpty(false);

        rawData.push(doc.data());
      });
      setfetchBidders({ data: rawData });
    });
    isMounted = false;
  };


  useEffect(() => {
    console.log("hello")
    let isSubscribed = true;
    fetchBidders();
    fetchData();
    fetchUser();
    return () => {
      isSubscribed = false;
    };
  }, []);


  function editRequest() {
    history.push(`/r/${id}/edit`);
  }
  function acceptRequest(docID) {
    appointmentData.data.map((data) => {
      let userID = data.userID;
      userProfile.profile.map((usr) => {
        let coins = usr.coins;
        fetchBidderData.data.map((bid) => {
          if (coins < bid.fee) {
            alert("You dont have enough coins to accept this bid. Please top up your account.")
          } else {
            var docRef = db
              .collection("doctors")
              .doc(docID)
              .collection("requests")
              .doc(userID);
            var userRef = db
              .collection("users")
              .doc(userID)
              .collection("requests")
              .doc(userID);
            var globalRef = db
              .collection("requests")
              .doc(userID);
            var batch = db.batch();
            batch.update(userRef, {
              status: "Accepted",
              assigned_doctor: bid.docName,
              doctorId: bid.docID,
              fee: bid.fee,
            })
            batch.update(globalRef, {
              status: "Accepted",
              assigned_doctor: bid.docName,
              doctorId: bid.docID,
              fee: bid.fee,
            })
            batch.set(docRef, {
              feel: data.feel,
              symptoms: data.symptoms,
              others: data.others,
              userID: data.userID,
              userFullName: data.userFullName,
              datetime: data.datetime,
              status: "Accepted",
              gender: data.gender,
              location: data.location,
              phoneNumber: data.phoneNumber,
              photoURL: data.photoURL,
              assigned_doctor: bid.docName,
              timestamp: new Date(),
              fee: bid.fee,
              doctorId: bid.docID,
            })
            batch.commit().then((docReference) => {
              history.push(`/success/${"accepted"}`);
            })
          }
        })



      })

    });
  }



  function requestCancellation() {
    history.push(`/r/${id}/cancel`);
  }

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
    innerCon: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "30px",
      alignItems: "center",
    },
    patientProf: {
      width: "90px",
      height: "90px",
    },
    superInnerCon: {
      marginTop: "10px",
      marginLeft: "30px",
    },
    innerSub: {
      fontSize: "24px",
      marginLeft: "25px",
      marginTop: "20px",
      marginBottom: "10px",
    },

    inputField: {
      display: "flex",
      marginLeft: "30px",
      marginRight: "30px",
      justifyContent: "center",
      marginTop: "10px",
    },

    textField: {
      width: "350px",
    },

    dateTimeCon: {
      marginTop: "50px",
      marginLeft: "20px",
      marginRight: "30px",
      minWidth: "200px",
    },
    dateandTime: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: "20px",
      marginRight: "30px",
    },

    con: {
      marginTop: "50px",
    },

    dateAndTime: {
      marginTop: "10px",
    },

    notelabel: {
      fontSize: "12px",
      fontStyle: "Italic",
      marginLeft: "20px",
      color: "gray",
    },

    btnBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "20px",
    },

    btn: {
      width: "200px",
      marginBottom: "10px",
      borderRadius: "10px",

    },
    hr: {
      width: "70px",
      alignItems: "center",
      justifyContent: "center",
    },

    innerSub2: {
      marginBottom: "50px",
      marginLeft: "60px",
      fontSize: "18px",
      marginRight: "20px"

    },
    innerSub3: {
      marginBottom: "20px",
      fontSize: "20px",


    },
    btnCon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "20px"
    },
    statIconPending: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "info.main"
    },
    statIconAccepted: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "success.main"
    },
  };

  return (
    <Box className="base">
      {appointmentData &&
        appointmentData.data.map((data) => {
          let setDate = data.datetime.toDate().toLocaleDateString();
          let setTime = data.datetime.toDate().toLocaleTimeString();
          return (
            <Box key={data.userID}>
              <Box sx={{ paddingBottom: "10px" }}>
                <Typography className="headerStyle">
                  <Icon
                    baseClassName="fas"
                    className="fas fa-calendar-day"
                    sx={{
                      fontSize: { xs: 30, md: 50 },
                      color: "primary",
                      width: 300,
                      marginTop: 2,
                    }}
                  />
                </Typography>
                <Typography variant="h5" className="headerStyle">
                  Appointment Status
                  <hr
                    style={{
                      width: 350,
                      color: "primary",
                      backgroundColor: "primary",
                      height: 0.5,
                      borderColor: "primary",
                    }}
                  />
                </Typography>
              </Box>

              <Box sx={style.innerCon}>
                <Box>
                  <Box
                    component="img"
                    alt="Image of Patient"
                    sx={style.patientProf}
                    src={data.photoURL}
                  />
                </Box>
                <Box sx={style.superInnerCon}>
                  <Typography variant="subtitle1">
                    Name: {data.userFullName}
                  </Typography>
                  <Typography variant="subtitle1">Date: {setDate}</Typography>
                  <Typography variant="subtitle1">Time: {setTime}</Typography>
                  <Typography variant="subtitle1">
                    Gender: {data.gender}
                  </Typography>
                  <Typography variant="subtitle1">
                    Location: {data.location}
                  </Typography>
                  <Typography variant="subtitle1">
                    Phone #: {data.phoneNumber}
                  </Typography>
                </Box>
              </Box>

              {(() => {
                switch (data.status) {
                  case "Pending":
                    return (
                      <Box>
                        <Box>
                          <Typography sx={style.innerSub}>
                            What do I feel:
                          </Typography>
                          <Box sx={style.inputField}>
                            <TextField
                              inputProps={{ readOnly: true }}
                              value={data.feel}
                              sx={style.textField}
                              variant="outlined"
                              multiline
                              maxRows={10}
                              minRows={5}
                            ></TextField>
                          </Box>
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                          <Typography sx={style.innerSub}>
                            Symptoms:{" "}
                          </Typography>
                          <Typography sx={style.innerSub2}>
                            {" "}
                            {data.symptoms} {data.others}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={style.innerSub}>Status:</Typography>
                          <Box sx={style.statIconPending}>
                            <Typography sx={style.innerSub3}>
                              <Icon

                                baseClassName="fas"
                                className="fas fa-business-time"
                                sx={{
                                  fontSize: { xs: 40, md: 80 },
                                  width: 50,
                                  marginLeft: 2
                                }}
                              />
                              <Typography sx={style.innerSub3}>{data.status}</Typography>

                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={style.btnCon}>
                          <Button sx={style.btn}
                            variant="contained"
                            onClick={() => requestCancellation()}
                          >
                            Request Cancellation
                          </Button>
                        </Box>
                      </Box>
                    );
                  case "Edited":
                    return (
                      <Box>
                        <Box sx={style.con}>
                          <Typography sx={style.notelabel}>
                            *Note : Time and Date have been Edited by your
                            Doctor
                          </Typography>
                          <Box sx={style.dateandTime}>
                            <TextField
                              inputProps={{ readOnly: true }}
                              value={setDate}
                              sx={style.dateAndTime}
                              label="DATE"
                              variant="outlined"
                            />

                            <TextField
                              inputProps={{ readOnly: true }}
                              label="TIME"
                              sx={style.dateAndTime}
                              value={setTime}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <Box sx={style.btnBox}>
                          <Button
                            variant="outlined"
                            sx={style.btn}
                            onClick={() => editRequest()}
                          >
                            Change Time and Date
                          </Button>
                          <Button
                            variant="contained"
                            sx={style.btn}
                            onClick={() => acceptRequest()}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            sx={style.btn}
                            onClick={() => requestCancellation()}
                            style={{ backgroundColor: "#FF5956" }}
                          >
                            Request Cancellation
                          </Button>
                        </Box>
                      </Box>
                    );
                  case "Waiting":
                    return (
                      <Box>
                        <Typography variant="h5" sx={{ marginTop: "30px", marginLeft: "20px" }}>Doctor Requests:</Typography>
                        {isBidderEmpty ? (
                          <Box>
                            <Typography sx={{ marginTop: "30px", textAlign: "center" }}>Wait for a Doctor to accept your request</Typography>
                          </Box>
                        ) : (
                          fetchBidderData.data.map((data) => {
                            return (
                              <Box>
                                <Paper key={data.docId} elevation={4} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingTop: "25px", paddingBottom: "25px" }}>
                                  <Link to={`/p/${data.docId}`}>
                                    <Box>
                                      <Avatar src={data.photoURL} alt="doc image" />
                                    </Box>
                                    <Box>
                                      <Typography>Dr. {data.lname}</Typography>
                                      <Typography variant="subtitle2">{data.location}</Typography>
                                    </Box>
                                  </Link>
                                  <Box>
                                    <Typography>Fee: {data.fee}</Typography>
                                  </Box>
                                  <Box>
                                    <IconButton onClick={() => acceptRequest(data.docID)} color="success" aria-label="accept">
                                      <CheckCircleRoundedIcon />
                                    </IconButton>
                                    <IconButton color="error" aria-label="accept">
                                      <CancelRoundedIcon />
                                    </IconButton>
                                  </Box>
                                </Paper>
                              </Box>
                            )
                          })
                        )}
                      </Box>
                    );
                  case "Accepted":
                    return (
                      <Box>
                        <Box>
                          <Typography sx={style.innerSub}>
                            What do I feel:
                          </Typography>
                          <Box sx={style.inputField}>
                            <TextField
                              inputProps={{ readOnly: true }}
                              value={data.feel}
                              sx={style.textField}
                              variant="outlined"
                              multiline
                              maxRows={10}
                              minRows={5}
                            ></TextField>
                          </Box>
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                          <Typography sx={style.innerSub}>
                            Symptoms:{" "}
                          </Typography>
                          <Typography sx={style.innerSub2}>
                            {" "}
                            {data.symptoms} {data.others}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={style.innerSub}>Status:</Typography>
                          <Box sx={style.statIconAccepted}>
                            <Typography sx={style.innerSub3}>
                              <Icon
                                baseClassName="fas"
                                className="fas fa-calendar-check"
                                sx={{
                                  fontSize: { xs: 40, md: 80 },
                                  width: 50,
                                  marginLeft: 2

                                }}
                              />
                              <Typography sx={style.innerSub3}>{data.status}</Typography>

                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={style.btnCon}>
                          <Button sx={style.btn}
                            variant="contained"
                            onClick={() => requestCancellation()}
                          >
                            Request Cancellation
                          </Button>
                        </Box>
                      </Box>
                    );
                  case "Completed":
                    if (!data.rated) {
                      return (
                        <Box>
                          <Box>
                            <TextField
                              id="outlined-basic"
                              label="What do I think?"
                              variant="outlined"
                            />
                          </Box>
                          <Box>
                            <Rating name="rating" />
                          </Box>
                          <Button variant="contained">Rate</Button>
                        </Box>
                      );
                    } else {
                      return null;
                    }

                  case "Declined":
                    return null;
                  default:
                    return null;
                }
              })()}
            </Box>
          );
        })}
    </Box>
  );
}
