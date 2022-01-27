import React, { useEffect, useState, Suspense } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import firebase from "../../config/firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

const db = firebase.firestore();

export default function BuyCredits() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  var database = firebase.database();

  const handleClickOpen = (value, additional) => {
    setOpen(true);
    localStorage.setItem("coin", value + additional);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buycoin = () => {
    var userRef = db
      .collection("users")
      .doc(localStorage.getItem("uid"))
      .collection("creditTransaction");
    var globalRef = db.collection("credits");

    userRef
      .add({
        userID: localStorage.getItem("uid"),
        amount: localStorage.getItem("coin"),
      })
      .then((doc) => {
        localStorage.setItem("transactionID", doc.id);
        userRef
          .doc(doc.id)
          .set({
            transactionID: localStorage.getItem("transactionID"),
          })
          .then((doc2) => {
            globalRef
              .doc(localStorage.getItem("transactionID"))
              .set({
                userID: localStorage.getItem("uid"),
                amount: localStorage.getItem("coin"),
                transactionID: localStorage.getItem("transactionID"),
              })
              .then((doc3) => {
                history.push(`/success/${"buypending"}`);
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
      .catch((error) => {
        console.log(error);
        history.push("/sorry");
      });
  };
  return (
    <Box>
      <Typography>Buy Credits</Typography>
      <Card>
        <CardContent>
          <Box>
            <Typography>Coin Icon</Typography>
          </Box>
          <Box>
            <Typography>100 Credits</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => handleClickOpen(100, 50)}>
            BUY
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Buy ExpressCredits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please scan the QR Code below and send{" "}
              {parseInt(localStorage.getItem("coin"))} pesos, then press the
              confirm button.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => buycoin()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card>
        <CardContent>
          <Box>
            <Typography>Coin Icon</Typography>
          </Box>
          <Box>
            <Typography>300 Credits</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => handleClickOpen(300, 40)}>
            BUY
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Buy ExpressCredits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please scan the QR Code below and send{" "}
              {parseInt(localStorage.getItem("coin"))} pesos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => buycoin()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card>
        <CardContent>
          <Box>
            <Typography>Coin Icon</Typography>
          </Box>
          <Box>
            <Typography>500 Credits</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => handleClickOpen(500, 30)}>
            BUY
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Buy ExpressCredits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please scan the QR Code below and send{" "}
              {parseInt(localStorage.getItem("coin"))} pesos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => buycoin()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card>
        <CardContent>
          <Box>
            <Typography>Coin Icon</Typography>
          </Box>
          <Box>
            <Typography>1000 Credits</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => handleClickOpen(1000, 25)}>
            BUY
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Buy ExpressCredits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please scan the QR Code below and send{" "}
              {parseInt(localStorage.getItem("coin"))} pesos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => buycoin()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card>
        <CardContent>
          <Box>
            <Typography>Coin Icon</Typography>
          </Box>
          <Box>
            <Typography>5000 Credits</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => handleClickOpen(5000, 15)}>
            BUY
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Buy ExpressCredits"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please scan the QR Code below and send{" "}
              {parseInt(localStorage.getItem("coin"))} pesos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => buycoin()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}
