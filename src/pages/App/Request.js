import React from "react";
import { Typography, Box, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
export default function Request() {
  return (
    <Box className="base">
      <Box>
        <Typography variant="label">Request Appointment</Typography>
      </Box>
      <Box>
        <Typography>
          What do you feel ? <Typography>*required</Typography>
        </Typography>
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          multiline
          maxRows={4}
          minRows={6}
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
            <FormGroup>
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
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
