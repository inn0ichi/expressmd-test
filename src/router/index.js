import "../App.css";

import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import App from "../pages/App";
import SearchDoc from "../pages/App/SearchDoc";
import DocProfile from "../pages/App/DocProfile";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "../pages/App/Profile";
import Request from "../pages/App/Request";
import Nav from "../components/appcomponents/Nav";
import TransactionHistory from "../components/appcomponents/TransactionHistory";
import EmergencyContact from "../components/appcomponents/HospitalContact";
import Settings from "../components/appcomponents/Settings";
import About from "../components/appcomponents/AboutUs";
import Faq from "../components/appcomponents/Faqs";
import IsSuccessful from "../pages/App/IsSuccessful";
import IsNotSuccessful from "../pages/App/IsNotSuccessful";
import ViewRequest from "../pages/App/ViewRequest";
import ViewArchive from "../pages/App/ViewArchive";
import EditRequest from "../pages/App/EditRequest";
import CancelRequest from "../pages/App/CancelRequest";
import UserRegistration from "../pages/App/UserRegistration";
import ForgotPassword from "../pages/App/ForgotPassword";
import EditProfile from "../pages/App/EditProfile";
import Login from "../pages/App/Login";
import BuyCredits from "../pages/App/BuyCredits";
import CreateAccount from "../pages/App/CreateAccount";

function BottomNav() {
  const [value, setValue] = useState(0);
  const history = useHistory();
  return (
    <Box>
      <Paper elevation="8" className="bottomNav">
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className="bottomNavContainer"
        >
          <BottomNavigationAction
            label="Home"
            onClick={() => history.push("/")}
            icon={<HomeIcon color="secondary" />}
          />

          <BottomNavigationAction
            label="Profile"
            onClick={() => history.push("/profile")}
            icon={<AccountCircleIcon color="secondary" />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default function RouterComponent() {
  const ui = useSelector((state) => state.ui);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#2D539E",
        dark: "#84A0C6",
        light: "#2D539E",
      },
      secondary: {
        main: "#80b2bd",
      },
      text: {
        primary: "#fff",
        secondary: "#2D539E",
        disabled: "#ADB1C4",
      },
      error: {
        main: "#FC7374",
      },
      background: {
        paper: "#1d222e",
        default: "#161821",
      },
    },

    typography: {
      fontFamily: "Roboto",
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#16C2D5",
      },
      secondary: {
        main: "#16C2D5",
      },
      text: {
        primary: "#33374C",
        secondary: "#2D539E",
        disabled: "#ADB1C4",
      },
      error: {
        main: "#FC7374",
      },
      background: {
        paper: "#f9fbfd",
        default: "#fcfcfc",
      },
    },

    typography: {
      fontFamily: "Roboto",
    },
  });

  return (
    <ThemeProvider theme={ui.isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Router>
        <Nav />
        <Switch>
          <Route exact component={App} path="/" />
          <Route exact component={SearchDoc} path="/search" />
          <Route exact component={DocProfile} path="/p/:id" />
          <Route exact component={Request} path="/request" />
          <Route exact component={UserRegistration} path="/register" />
          <Route exact component={CreateAccount} path="/createaccount" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Profile} path="/profile" />
          <Route exact component={TransactionHistory} path="/history" />
          <Route exact component={EmergencyContact} path="/contacts" />
          <Route exact component={Settings} path="/settings" />
          <Route exact component={About} path="/aboutUs" />
          <Route exact component={Faq} path="/faq" />
          <Route exact component={BuyCredits} path="/buycredits" />
          <Route exact component={IsSuccessful} path="/success/:status" />
          <Route exact component={IsNotSuccessful} path="/sorry" />
          <Route exact component={ViewRequest} path="/r/:id/view" />
          <Route exact component={ViewArchive} path="/a/:id/view" />
          <Route exact component={CancelRequest} path="/r/:id/cancel" />
          <Route exact component={EditRequest} path="/r/:id/edit" />
          <Route exact component={ForgotPassword} path="/resetpassword" />
          <Route exact component={EditProfile} path="/editprofile" />
        </Switch>
        <BottomNav />
      </Router>
    </ThemeProvider>
  );
}
