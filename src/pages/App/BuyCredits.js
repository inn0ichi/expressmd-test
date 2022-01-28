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
import Buy from "../../assets/126057.png"
import Coin from "../../assets/kindpng_7166529.png"
import { borderRadius, textAlign } from "@mui/system";
import QRCode from "../../assets/qrcode.png";

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

  const style = {
    allcon : {
      marginBottom : "100px"
    },
    logoContainer: {
      display: "flex",
      justifycontent: "center",
      alignItems: "center",
      marginTop: "20px",
      flexDirection: "column",
      textAlign: "center"
    },
    buyLogo: {
      width: "60px",
    },

    Label: {
      fontSize: "24px"
    },

    card: {
      marginTop: "20px",
      marginLeft: "20px",
      marginRight: "20px"
    },

    outerContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px"
    },

    coinContainer: {
      display: "flex",
      flexDirection: "row",
      justifycontent: "center"
    },

    innerContainer: {
      alignItems: "center",
      justifycontent: "center"
    },

    coinLogo: {
      width: "40px",
      height: "40px"
    },

    coinLabel: {
      display: "flex",
      fontSize: "18px",
      alignItems: "center",
      marginLeft: "5px"
    },

    btn: {
      width: "50px",
      borderRadius: "18px",
      backgroundColor: "#125873",
      color: "white"
    }
  }
  return (
    <Box sx = {style.allcon}>
      <Box sx={style.logoContainer}>
        <Box component="img" src={Buy} alt="buy" sx={style.buyLogo}></Box>
        <Typography sx={style.Label}>Buy Credits</Typography>

      </Box>
      <Card sx={style.card}>
        <Box sx={style.outerContainer}>
          <CardContent>
            <Box sx={style.coinContainer}>
              <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
              <Typography sx={style.coinLabel}>100 Credits</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" sx={style.btn} onClick={() => handleClickOpen(100, 50)}>
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
                <img src={QRCode} alt="qrcode" width={256} height={256} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => buycoin()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>

      <Card sx={style.card}>
        <Box sx={style.outerContainer}>
          <CardContent>
            <Box sx={style.coinContainer}>
              <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
              <Typography sx={style.coinLabel}>300 Credits</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" sx={style.btn} onClick={() => handleClickOpen(300, 40)}>
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
                <img src={QRCode} alt="qrcode" width={296} height={296} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => buycoin()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
      <Card sx={style.card}>
        <Box sx={style.outerContainer}>
          <CardContent>
            <Box sx={style.coinContainer}>
              <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
              <Typography sx={style.coinLabel}>500 Credits</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" sx={style.btn} onClick={() => handleClickOpen(500, 30)}>
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
                <img src={QRCode} alt="qrcode" width={296} height={296} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => buycoin()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
      <Card sx={style.card}>
        <Box sx={style.outerContainer}>
          <CardContent>
            <Box sx={style.coinContainer}>
              <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
              <Typography sx={style.coinLabel}>1000 Credits</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" sx={style.btn} onClick={() => handleClickOpen(1000, 25)}>
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
                <img src={QRCode} alt="qrcode" width={296} height={296} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => buycoin()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
      <Card sx={style.card}>
        <Box sx={style.outerContainer}>
          <CardContent>
            <Box sx={style.coinContainer}>
              <Box component="img" src={Coin} alt="coinLogo" sx={style.coinLogo}></Box>
              <Typography sx={style.coinLabel}>5000 Credits</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" sx={style.btn} onClick={() => handleClickOpen(5000, 30)}>
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
                <img src={QRCode} alt="qrcode" width={296} height={296} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => buycoin()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>

    </Box>
  );
}
