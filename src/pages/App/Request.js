import React,{ useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import firebase from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction"
import { useHistory } from "react-router-dom";
const style = {
  parentCon : {
    display : "flex",
    marginLeft : "20px",
    alignItems : "center",
    marginTop : "100px",
    marginBottom : "10px"

  },
  label : {
    fontSize : "24px",
    marginRight : "10px",
    fontWeight : 100
  },

  subLabel : {
    fontSize : "18px",
    fontStyle : "italic",
    color : "#E34343",
    fontWeight : 100
  },
  textField : {
    width : "350px",
  },
  inputField : {
    display : "flex",
    justifyContent : "center",
  },

  checkCon : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    marginLeft : "20px"
  },

  checkBox : {
    display : "flex",
    flexDirection : "column",
  },

  synLabelCon : {
    display : "flex",
    marginLeft : "20px",
    marginTop : "10px",
    alignItems : "center",

  },

  Synlabel : {
    fontSize : "18px",
    fontWeight : 100
  },
  subSynlabel : {
    fontSize : "15px",
    fontStyle : "italic",
    color : "#E34343",
    fontWeight : 100
  },

  textFieldBot : {
    marginLeft : "20px",
    marginTop : "10px"
  },

  textFieldBotInput : {
    fontSize : "13px"
  },

  otherSynCon : {
    marginLeft : "20px",
    marginTop : "10px"
  },

  otherSyn : {
    width : "400px"
  },

  submitBtnCon : {
    display : "flex",
    justifyContent : "center",
    margin : "20px 0",
  },

  submitBtn : {
    width : "200px",
    borderRadius : "8px"
  }
}


export default function Request() {
  
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getTheme());
  }, [dispatch]);

  const db = firebase.firestore();
  const history = useHistory();
  const [payload, setPayload] = useState({
      Feel: "",
      Anysymptoms : "",
      others: "",
  });
  const userInput = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
};

const submitForm = (e) => {
  getValue();
  if (
      !payload.Feel
     
  ) {
      alert("Please enter the required fields!");
      console.log(payload);
  } else {

      db.collection("userSymptoms")
          .doc(payload.uid)
          .set({
            
              Feel: payload.Feel,
              Anysymptoms: payload.Anysymptoms,
              others: payload.others,
          })
          .then((docRef) => { history.push("/"); })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
  }
};

function getValue() {

  var checks = document.getElementsByName('checks')
  var str='';

  for (var i = 0; i < 8; i++){

  if (checks[i].checked === true){
    str += checks[i].value + ", ";
  }

}
payload.Anysymptoms=str;
}

 
  






  return (
    <Box className="base">
      <Box sx = {style.parentCon}>
        <Typography sx = {style.label}>What do you feel ? </Typography>
        <Typography sx = {style.subLabel}>*Required</Typography>
      </Box>
      <Box sx = {style.inputField}>
   
                  
        <TextField
          id="outlined-basic"
          variant="outlined"
          multiline
          maxRows={10}
          minRows={6}
          sx = {style.textField}
          onChange={userInput("Feel")}
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
      
            <FormGroup sx = {style.checkCon}>
              <Box sx = {style.checkBox}>
              <FormControlLabel
                control={<Checkbox name="checks" 
                onChange={userInput("Anysymptoms")}/>}
                label="Cough"
                value="Cough"
              />
              <FormControlLabel
                control={<Checkbox name="checks"  onChange={userInput("Anysymptoms")}/>}
                label="Fever"
               value="Fever"
              />
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
                label="Fatigue"
                value="Fatigue"
              />
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
               value="Muscle or Body Aches"
                label="Muscle or Body Aches"
              />
              </Box>
              <Box sx = {style.checkBox}>
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
               value="Shortness of Breath"
                label="Shortness of Breath"
              />
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
                label="Headache"
              value="Headache"
              />
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
              value="Sore Throat"
                label="Sore Throat"
              />
              <FormControlLabel
                control={<Checkbox name="checks" onChange={userInput("Anysymptoms")}/>}
                value="Diarrhea"
                label="Diarrhea"
              />
             
              </Box>
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx = {style.textFieldBot}>
        <Typography sx = {style.textFieldBotInput}>Others (Please Specify):</Typography>
      </Box>
      <Box sx = {style.otherSynCon}>
      <TextField
          required
          id="standard-required"
          defaultValue=""
          variant="standard"
          onChange={userInput("others")}
         />
      </Box>
      
     
      <Button onClick={() => submitForm()} variant='outlined'>Submit</Button>
    </Box>
  );
}
