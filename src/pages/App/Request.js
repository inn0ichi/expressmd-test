import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  FormControl,
} from "@mui/material";
import firebase from "../../config/firebase";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import { useHistory, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTimePicker } from "@mui/lab/";
import algoliasearch from 'algoliasearch';

const style = {
  parentCon: {
    display: "flex",
    marginLeft: "20px",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "10px",
    flexDirection: "column"

  },
  label: {
    textAlign: "center",
    fontSize: "20px",
    marginRight: "10px",
    fontWeight: 100,
  },

  subLabel: {
    fontSize: "12px",
    fontStyle: "italic",
    color: "#E34343",
    fontWeight: 100,
  },
  textField: {
    width: "350px",
  },
  inputField: {
    display: "flex",
    marginLeft: "45px",
    marginRight: "45px",
    justifyContent: "center",
  },

  checkCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "20px",
  },

  checkBox: {
    display: "flex",
    flexDirection: "column",
  },

  synLabelCon: {
    display: "flex",
    marginLeft: "20px",
    marginTop: "10px",
    alignItems: "center",
  },

  Synlabel: {
    fontSize: "18px",
    fontWeight: 100,
  },
  subSynlabel: {
    fontSize: "15px",
    fontStyle: "italic",
    color: "#E34343",
    fontWeight: 100,
  },

  textFieldBot: {
    marginLeft: "20px",
    marginTop: "10px",
  },

  textFieldBotInput: {
    fontSize: "13px",
  },

  otherSynCon: {
    display: "flex",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "10px",
    marginBottom: "50px",
  },

  otherSyn: {
    width: "408px",
  },

  dateTimeCon: {
    marginLeft: "20px",
    marginRight: "20px",
    minWidth: "200px",
  },

  submitBtnCon: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  submitBtn: {
    width: "200px",
    borderRadius: "8px",
  },
};

export default function Request() {
  const [specifiedDate, setSpecifiedDate] = useState(new Date());

  const db = firebase.firestore();
  const history = useHistory();
  const searchClient = algoliasearch('06RC56CRHD', 'ab83c1717b40e7392fe5a5fc64d01e12');
  const index = searchClient.initIndex('requests');
  var batch = db.batch();

  useEffect(() => {
    let isSubscribed = true;
    getAuth().onAuthStateChanged(function (user) {
      if (!user) {
        window.location.replace("/login");
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  const dispatch = useDispatch();


  /*fetch doc*/

  const [userProfile, setuserProfile] = useState({
    profile: [],
  });

  const handleChange = (newValue) => {
    setSpecifiedDate(newValue);
  };

  const fetchUserData = async () => {
    let isMounted = true;
    const docRef = await db
      .collection("users")
      .doc(localStorage.getItem("uid"));
    let userProfile = [];
    docRef.get().then((doc) => {
      userProfile.push(doc.data());
      setuserProfile({ profile: userProfile });
    });
    isMounted = false;
  };

  useEffect(() => {
    let isSubscribed = true;
    dispatch(getTheme());
    fetchUserData();
    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);
  /*fetch doc*/

  const [payload, setPayload] = useState({
    feel: "",
    symptoms: "",
    others: "",
  });
  const userInput = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const submitForm = (e) => {
    getValue();
    if (!payload.feel) {
      alert("Please enter the required fields!");
    } else {
      var userRef = db
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("requests")
        .doc(localStorage.getItem("uid"));
      var globalRef = db
        .collection("requests")
        .doc(localStorage.getItem("uid"));
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            alert(
              "You can only request once. Please wait for a doctor to bid your request and accept them."
            );
          } else {
            userProfile.profile.map((userProfile) => {
              var fullname = userProfile.fullname;
              var gender = userProfile.gender;
              var location = userProfile.location;
              var phoneNumber = userProfile.phoneNumber;
              var userID = localStorage.getItem("uid");
              batch.set(userRef, {
                feel: payload.feel,
                symptoms: payload.symptoms,
                others: payload.others,
                userID: userID,
                userFullName: fullname,
                datetime: specifiedDate,
                status: "Waiting",
                gender: gender,
                location: location,
                phoneNumber: phoneNumber,
                photoURL: userProfile.photoURL,
                timestamp: new Date(),
                numOfResponse: 0,
              });
              batch.set(globalRef, {
                feel: payload.feel,
                symptoms: payload.symptoms,
                others: payload.others,
                userID: userID,
                userFullName: fullname,
                datetime: specifiedDate,
                status: "Waiting",
                gender: gender,
                location: location,
                phoneNumber: phoneNumber,
                photoURL: userProfile.photoURL,
                timestamp: new Date(),
                numOfResponse: 0,
              });
              batch.commit().then((document) => {
                firebase.database().ref('users/' + localStorage.getItem("uid") + '/request/' + localStorage.getItem("uid")).update({
                  status: "Request Successful"
                }).then((doc6) => {
                  localStorage.setItem("isLoaded", false);
                  history.push(`/success/${"request"}`)
                })
              })
            });
          }
        })
        .catch((error) => {
          console.log(error);
          history.push("/sorry");
        });
    }
  };

  function getValue() {
    var checks = document.getElementsByName("checks");
    var str = "";

    for (var i = 0; i < 8; i++) {
      if (checks[i].checked === true) {
        str += checks[i].value + ", ";
      }
    }
    payload.symptoms = str;
  }

  return (
    <Box className="base">
      <Box>
        <Typography sx={style.label}>What health or medical problems you want to discuss during you consultation? </Typography>
        <Typography sx={style.subLabel}>*Required</Typography>
      </Box>
      <Box sx={style.inputField}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          multiline
          maxRows={10}
          minRows={6}
          sx={style.textField}
          onChange={userInput("feel")}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <Typography>Any Symptoms ?</Typography>

            <FormGroup sx={style.checkCon}>
              <Box sx={style.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  label="Asthma"
                  value="Asthma"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  label="Bronchitis"
                  value="Bronchitis"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  label="Cough"
                  value="Cough"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  value="Sore Throat"
                  label="Sore Throat"
                />
              </Box>
              <Box sx={style.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  value="Fever"
                  label="Fever"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  label="Fatigue"
                  value="Fatigue"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  value="Hypertension"
                  label="Hypertension"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="checks" onChange={userInput("symptoms")} />
                  }
                  value="Diarrhea"
                  label="Diarrhea"
                />
              </Box>
            </FormGroup>
          </FormControl>
        </Box>
      </Box>

      <Box sx={style.dateTimeCon}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Set Date and Time"
            value={specifiedDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={style.submitBtnCon}>
        <Button
          onClick={() => submitForm()}
          variant="contained"
          sx={style.submitBtn}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
