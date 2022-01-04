import React from "react";
import { Typography, Box, TextField , Button } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

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
            <Box sx = {style.synLabelCon}>
            <Typography sx = {style.Synlabel}>Any Symptoms ?</Typography>
            <Typography sx = {style.subSynlabel} >*Required</Typography>
            </Box>

            <FormGroup sx = {style.checkCon}>
              <Box sx = {style.checkBox}>
              <FormControlLabel
                control={<Checkbox name="Cough" />}
                label="Cough"
              />
              <FormControlLabel
                control={<Checkbox name="Fever" />}
                label="Fever"
              />
              <FormControlLabel
                control={<Checkbox name="Fatigue" />}
                label="Fatigue"
              />
              <FormControlLabel
                control={<Checkbox name="Muscle or Body Aches" />}
                label="Muscle or Body Aches"
              />
              </Box>
              <Box sx = {style.checkBox}>
              <FormControlLabel
                control={<Checkbox name="Shortness of Breath" />}
                label="Shortness of Breath"
              />
              <FormControlLabel
                control={<Checkbox name="Headache" />}
                label="Headache"
              />
              <FormControlLabel
                control={<Checkbox name="Sore Throat" />}
                label="Sore Throat"
              />
              <FormControlLabel
                control={<Checkbox name="Diarrhea" />}
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
          sx = {style.otherSyn} 
          placeholder="seperate with comma"/>
      </Box>

      <Box sx = {style.submitBtnCon}>
        <Button variant = "contained" sx = {style.submitBtn}>Submit</Button>
      </Box>
    </Box>
  );
}
