import {
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";
import firebase from "../../config/firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./css/HospitalContact.css";

export default function HospitalContact() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const ref = firebase.firestore().collection("emergency_numbers");
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    let isSubscribed = true;
    getData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ paddingBottom: "100px" }}>
      <Typography className="headerStyle">
        <Icon
          baseClassName="fas"
          className="fas fa-hospital"
          sx={{
            fontSize: { xs: 30, md: 50 },
            color: "primary",
            width: 300,
            marginTop: 2,
          }}
        />
      </Typography>
      <Typography variant="h5" className="headerStyle">
        Hospital Hotlines
      </Typography>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="09436018271">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Baliuag District Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 09436018271
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447661462">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Castro Maternity Hospital and Medical Center
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 447661462
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447665018">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Sagrada Familia Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 447665018
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="09325205825">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      St. Vincent Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 09325205825
                    </Typography>
                    <Typography className="type">
                      Location: Bustos
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447663457">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Rugay General Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 447663457
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="443092143">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Bustos Community Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 443092143
                    </Typography>
                    <Typography className="type">
                      Location: Bustos
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447618337">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Sto. Niño Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 447618337
                    </Typography>
                    <Typography className="type">
                      Location: Bustos
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447667008">
            <Paper

              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      De Jesus General Hospital
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 447667008
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box className="contactContainer">
        <Box className="contactBox">
          <CopyToClipboard text="447618337">
            <Paper
              sx={{ marginTop: "5px", padding: "10px" }}
              onClick={handleClickOpen}
            >
              <Box className="deetBox">
                <Divider orientation="vertical" flexItem />
                <Box className="contactDetailBox">
                  <Box className="contactNameBox" >
                    <Typography className="lname">
                      Allied Care Experts (Ace) Medical Center Baliwag, Inc.
                    </Typography>
                  </Box>
                  <Box className="contactDeetsBox">
                    <Typography className="type">
                      Hotline: 09175174354
                    </Typography>
                    <Typography className="type">
                      Location: Baliuag
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CopyToClipboard>
        </Box>
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Hotline Number Copied to Clipboard!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
