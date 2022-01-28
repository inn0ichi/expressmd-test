import { Box, Typography, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import "../../App.css";

export default function IsSuccessful() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { status } = useParams();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const style = {
    outerCon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    innerConPaper: {
      display: "flex",
      backgroundColor: "#575757",
      flexDirection: "column",
      minWidth: "100px",
      padding: "20px",
      borderRadius: "10px",
      marginLeft: "50px",
      marginRight: "50px",
      marginTop: "190px",
    },

    label: {
      textAlign: "center",
      color: "white",
      fontSize: "18px",
    },

    sublabel: {
      textAlign: "center",
      color: "#E9E9E9",
      fontStyle: "italic",
      fontSize: "12px",
      marginTop: "10px",
      marginBottom: "10px",
    },

    btn: {
      backgroundColor: "#167694",
    },
  };

  return (
    <Box sx={style.outerCon}>
      {(() => {
        switch (status) {
          case "request":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Appointment Successfully Requested
                </Typography>
                <Typography sx={style.sublabel}>
                  Please wait for your request to be confirmed. Thank your for
                  using ExpressMD
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "reset":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Password Reset Email Sent!
                </Typography>
                <Typography sx={style.sublabel}>
                  The password reset email has been sent. Please check your
                  mailbox.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "edited":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Date and Time Successfully Changed
                </Typography>
                <Typography sx={style.sublabel}>
                  Please wait for your edit to be reviewed and confirmed by your
                  doctor. Thank You.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "cancellation":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Cancellation Request Successful
                </Typography>
                <Typography sx={style.sublabel}>
                  Your doctor will now review and process the cancellation of
                  your appointment. Thank You.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "verifyemail":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Verify your Email account
                </Typography>
                <Typography sx={style.sublabel}>
                  Registration successful. Please check your email and visit the verification link. Thank You.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/login")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "unverified":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>
                  Unverified Account
                </Typography>
                <Typography sx={style.sublabel}>
                  Please check your email for the verification mail. If you can't see it, please check the spam folder. Thank You
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/login")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "buypending":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>Buy Credit Pending</Typography>
                <Typography sx={style.sublabel}>
                  Thank You for buying ExpressCoin. We will now review your
                  request and add the coins to your account.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "accepted":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>Request Accepted</Typography>
                <Typography sx={style.sublabel}>
                  Your doctor may now contact you using your Phone Number.
                  Please coordinate accordingly. Thank You for using ExpressMD.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          case "rating":
            return (
              <Paper sx={style.innerConPaper}>
                <Typography sx={style.label}>Rating Submitted</Typography>
                <Typography sx={style.sublabel}>
                  Your rating has been submitted. Thank you for using ExpressMD.
                </Typography>
                <Button
                  variant="filled"
                  sx={style.btn}
                  onClick={() => history.push("/")}
                >
                  OK
                </Button>
              </Paper>
            );
          default:
            return null;
        }
      })()}
    </Box>
  );
}
