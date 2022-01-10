import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import firebase from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction"
import { useHistory, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';

const style = {
  parentCon: {
    display: "flex",
    marginLeft: "20px",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "10px"

  },
  label: {
    fontSize: "24px",
    marginRight: "10px",
    fontWeight: 100
  },

  subLabel: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#E34343",
    fontWeight: 100
  },
  textField: {
    width: "350px",
  },
  inputField: {
    display: "flex",
    marginLeft: "45px",
    marginRight: "45px",
    justifyContent: "center"
  },

  checkCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "20px"
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
    fontWeight: 100
  },
  subSynlabel: {
    fontSize: "15px",
    fontStyle: "italic",
    color: "#E34343",
    fontWeight: 100
  },

  textFieldBot: {
    marginLeft: "20px",
    marginTop: "10px"
  },

  textFieldBotInput: {
    fontSize: "13px",
  },

  otherSynCon: {
    display: "flex",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "10px",
    marginBottom: "50px"
  },

  otherSyn: {
    width: "408px"
  },

  dateTimeCon: {
    marginLeft: "20px",
    marginRight: "20px"
  },

  submitBtnCon: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  submitBtn: {
    width: "200px",
    borderRadius: "8px"
  }
}


export default function Request() {

  const [specifiedDate, setSpecifiedDate] = useState(new Date());


  const db = firebase.firestore();
  const history = useHistory();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);
  /*fetch doc*/
  const [doctorProfile, setdoctorProfile] = useState({
    profile: [],
  });

  const [userProfile, setuserProfile] = useState({
    profile: [],
  });

  const handleChange = (newValue) => {
    setSpecifiedDate(newValue);
  };

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

  const fetchUserData = async () => {
    let isMounted = true
    const docRef = await db.collection("users").doc(localStorage.getItem("uid"));
    let userProfile = [];
    docRef.get().then((doc) => {
      userProfile.push(doc.data());
      setuserProfile({ profile: userProfile });
    });
    isMounted = false
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);
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
    if (
      !payload.feel

    ) {
      alert("Please enter the required fields!");
      console.log(payload);
    } else {
      var docRef = db.collection("doctors")
        .doc(id)
        .collection("requests")
        .doc(
          localStorage.getItem("uid"));
      var userRef = db.collection("users")
        .doc(getAuth().currentUser.uid)
        .collection("requests")
        .doc(
          localStorage.getItem("uid"));

      docRef.get().then((doc) => {
        if (doc.exists) {
          alert("You can only request once. Please wait for your doctor to accept your request");
        } else {
          doctorProfile.profile.map((docProfile) => {
            var docName = docProfile.lastname + ", " + docProfile.firstname + " " + docProfile.middleInitials;
            var uid = docProfile.uid;
            userProfile.profile.map((userProfile) => {
              var fullname = userProfile.fullname;
              var gender = userProfile.gender;
              var location = userProfile.location;
              var phoneNumber = userProfile.phoneNumber;
              var userID = userProfile.uid;
              userRef
                .set({
                  feel: payload.feel,
                  symptoms: payload.symptoms,
                  others: payload.others,
                  assigned_doctor: docName,
                  doctorId: uid,
                  userID: userID,
                  userFullName: fullname,
                  datetime: specifiedDate,
                  status: "Pending",
                  gender: gender,
                  location: location,
                  phoneNumber: phoneNumber,
                })
                .then((docReference) => {
                  docRef
                    .set({
                      feel: payload.feel,
                      symptoms: payload.symptoms,
                      others: payload.others,
                      assigned_doctor: docName,
                      doctorId: uid,
                      userID: userID,
                      userFullName: fullname,
                      datetime: specifiedDate,
                      status: "Pending",
                      gender: gender,
                      location: location,
                      phoneNumber: phoneNumber,
                    })
                    .then((docRef) => {
                      history.push("/success")
                    })
                    .catch((error) => {
                      console.log(error);
                      history.push("/sorry")
                    });
                })
                .catch((error) => {
                  console.log(error);
                  history.push("/sorry")
                });
            });
          })
        }
      }).catch((error) => {
        console.log(error);
        history.push("/sorry")
      });

    }
  };

  function getValue() {

    var checks = document.getElementsByName('checks')
    var str = '';

    for (var i = 0; i < 8; i++) {

      if (checks[i].checked === true) {
        str += checks[i].value + ", ";
      }

    }
    payload.symptoms = str;
  }

  return (
    <Box className="base">
      <Box sx={style.parentCon}>
        <Typography sx={style.label}>What do you feel ? </Typography>
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
                  control={<Checkbox name="checks"
                    onChange={userInput("symptoms")} />}
                  label="Cough"
                  value="Cough"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  label="Fever"
                  value="Fever"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  label="Fatigue"
                  value="Fatigue"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  value="Muscle or Body Aches"
                  label="Muscle or Body Aches"
                />
              </Box>
              <Box sx={style.checkBox}>
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  value="Shortness of Breath"
                  label="Shortness of Breath"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  label="Headache"
                  value="Headache"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  value="Sore Throat"
                  label="Sore Throat"
                />
                <FormControlLabel
                  control={<Checkbox name="checks" onChange={userInput("symptoms")} />}
                  value="Diarrhea"
                  label="Diarrhea"
                />

              </Box>
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx={style.textFieldBot}>
        <Typography sx={style.textFieldBotInput}>Others (Please Specify):</Typography>
      </Box>
      <Box sx={style.otherSynCon}>
        <TextField
          required
          id="standard-required"
          defaultValue=""
          variant="standard"
          onChange={userInput("others")}
          sx={style.otherSyn}
        />
      </Box>

      <Box sx={style.dateTimeCon}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <Stack spacing={3}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={specifiedDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time"
              value={specifiedDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
      <Box sx={style.submitBtnCon}>
        <Button onClick={() => submitForm()} variant='contained' sx={style.submitBtn}>Submit</Button>
      </Box>
    </Box>
  );
}
