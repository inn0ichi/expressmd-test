import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Avatar } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";

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
    history.push(`${id}/edit`)
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
              history.push("/success");
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
      alignItems : "center",
      
    },
    patientProf : {
      width : "90px",
      height : "90px",
      borderRadius : "90px"
    },
    superInnerCon : {
      marginLeft : "30px"
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
      marginTop : "10px",
      minWidth : "300px"
    },

    textField: {
      width: "350px",
    },
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
                <Box component = "img" alt="Image of Patient" sx = {style.patientProf} src={data.photoURL} />
              </Box>
              <Box sx = {style.superInnerCon}>
                <Typography variant="subtitle1">Name: {data.userFullName}</Typography>
                <Typography variant="subtitle1">Date: {setDate}</Typography>
                <Typography variant="subtitle1">Time: {setTime}</Typography>
                <Typography variant="subtitle1">Gender: {data.gender}</Typography>
                <Typography variant="subtitle1">Location: {data.location}</Typography>
              </Box>
              </Box>
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
              <Box>
                {(() => {
                  switch (data.status) {
                    case "Pending":
                      return <Button variant="contained" onClick={() => requestCancellation()}>Request Cancellation</Button>;
                      break;
                    case "Edited": return (
                      <Box>
                        <Button variant="contained" onClick={() => acceptRequest()}>Accept</Button>
                        <Button variant="contained">Decline</Button>
                        <Button variant="outlined" onClick={() => editRequest()}>Change Time or Date</Button>
                      </Box>
                    );
                    case "Accepted":
                      return null;
                    case "Declined":
                      return null;
                    default:
                      return null;
                  }
                })()}


              </Box>
            </Box>
          );
        })
      }

    </Box>
  );
}
