import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Avatar, Stack } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';

const style = {
  parentCon: {
    display: "flex",
    margin: "20px",
    alignItems: "center"

  },
  label: {
    fontSize: "24px",
    marginRight: "10px"
  },

  subLabel: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "red"
  },
  textField: {
    width: "300px",
  },
  inputField: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  }
}

export default function ViewRequest() {
  const { id } = useParams();

  const history = useHistory();

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

  const db = firebase.firestore();
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [appointmentData, setappointmentData] = useState({
    data: [],
  });

  const fetchData = async () => {
    let isMounted = true
    const docRef = await db.collection("users").doc(localStorage.getItem("uid")).collection("requests").doc(localStorage.getItem("uid"));
    let rawData = [];
    docRef.get().then((doc) => {
      rawData.push(doc.data());
      setappointmentData({ data: rawData });
    });
    isMounted = false
  };

  useEffect(() => {
    fetchData();
  }, [appointmentData]);

  function editRequest() {
    history.push(`/r/${id}/edit`);
  }
  function acceptRequest() {
    appointmentData.data.map((data) => {
      let docID = data.doctorId;
      let userID = data.userID;
      var docRef = db.collection("doctors")
        .doc(docID)
        .collection("requests")
        .doc(userID);
      var userRef = db.collection("users")
        .doc(userID)
        .collection("requests")
        .doc(userID);
      userRef
        .update({
          status: "Accepted",
        })
        .then((docReference) => {
          docRef
            .update({
              status: "Accepted",
            })
            .then((docRef) => {
              history.push(`/success/${"accepted"}`);
            })
            .catch((error) => {
              console.log(error);
              history.push("/sorry");
            });
        })
        .catch((error) => {
          console.log(error);
          history.push("/sorry");
        });
    })
  }

  function requestCancellation() {
    history.push(`/r/${id}/cancel`);
  }


  const style = {
    innerCon: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      marginLeft: "30px",
      alignItems: "center",

    },
    patientProf: {
      width: "90px",
      height: "90px",
      borderRadius: "90px"
    },
    superInnerCon: {
      marginLeft: "30px"
    },
    innerSub: {
      fontSize: "24px",
      marginLeft: "25px",
      marginTop: "20px",
    },

    inputField: {
      display: "flex",
      marginLeft: "30px",
      marginRight: "30px",
      justifyContent: "center",
      marginTop: "10px",
      minWidth: "300px"
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
      marginTop: "50px"
    },

    dateAndTime: {
      marginTop: "10px"
    },

    notelabel: {
      fontSize: "12px",
      fontStyle: "Italic",
      marginLeft: "20px",
      color: "gray"
    },

    btnBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "20px"
    },

    btn: {
      width: "200px",
      marginBottom: "10px",
      borderRadius: "10px"
    }
  }



  return (
    <Box className="base">
      {
        appointmentData && appointmentData.data.map((data) => {
          let setDate = data.datetime.toDate().toLocaleDateString();
          let setTime = data.datetime.toDate().toLocaleTimeString();
          return (
            <Box>

              <Box sx={style.innerCon}>
                <Box>
                  <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                </Box>
                <Box sx={style.superInnerCon}>
                  <Typography variant="subtitle1">Name: {data.userFullName}</Typography>
                  <Typography variant="subtitle1">Date: {setDate}</Typography>
                  <Typography variant="subtitle1">Time: {setTime}</Typography>
                  <Typography variant="subtitle1">Gender: {data.gender}</Typography>
                  <Typography variant="subtitle1">Location: {data.location}</Typography>
                </Box>
              </Box>



              {(() => {
                switch (data.status) {
                  case "Pending":
                    return (
                      <Box>
                        <Box>
                          <Typography sx={style.innerSub}>What do I feel:</Typography>
                          <Box sx={style.inputField}>
                            <TextField inputProps={{ readOnly: true, }}
                              value={data.feel}
                              sx={style.textField}
                              variant="outlined"
                              multiline
                              maxRows={10}
                              minRows={5}
                            ></TextField>
                          </Box>
                        </Box>
                        <Box>
                          <Typography>Symptoms: {data.symptoms}</Typography>
                          <Typography>Any Others?: {data.others}</Typography>
                        </Box>
                        <Box>
                          <Typography>Status: {data.status}</Typography>
                        </Box>
                        <Button variant="contained" onClick={() => requestCancellation()}>Request Cancellation</Button>

                      </Box>

                    );
                  case "Edited": return (
                    <Box>
                      <Box sx={style.con}>
                        <Typography sx={style.notelabel}>*Note : Time and Date have been Edited by your Doctor</Typography>
                        <Box sx={style.dateandTime}>
                          <TextField inputProps={{ readOnly: true, }}
                            value={setDate}
                            sx={style.dateAndTime}
                            label="DATE"
                            variant="outlined"
                          />

                          <TextField inputProps={{ readOnly: true, }}
                            label="TIME"
                            sx={style.dateAndTime}
                            value={setTime}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Box sx={style.btnBox}>
                        <Button variant="outlined" sx={style.btn} onClick={() => editRequest()}>Change Time and Date</Button>
                        <Button variant="contained" sx={style.btn} onClick={() => acceptRequest()}>Accept</Button>
                        <Button variant="contained" sx={style.btn} onClick={() => requestCancellation()} style={{ backgroundColor: "#FF5956" }} >Request Cancellation</Button>

                      </Box>
                    </Box>
                  );
                  case "Accepted":
                    return (
                      <Box>
                        <Box>
                          <Typography sx={style.innerSub}>What do I feel:</Typography>
                          <Box sx={style.inputField}>
                            <TextField inputProps={{ readOnly: true, }}
                              value={data.feel}
                              sx={style.textField}
                              variant="outlined"
                              multiline
                              maxRows={10}
                              minRows={5}
                            ></TextField>
                          </Box>
                        </Box>
                        <Box>
                          <Typography>Symptoms: {data.symptoms}</Typography>
                          <Typography>Any Others?: {data.others}</Typography>
                        </Box>
                        <Box>
                          <Typography>Status: {data.status}</Typography>
                        </Box>
                        <Button variant="contained" onClick={() => requestCancellation()}>Request Cancellation</Button>

                      </Box>
                    );
                  case "Declined":
                    return null;
                  default:
                    return null;
                }
              })()}
            </Box>
          );
        })
      }

    </Box>
  );
}
