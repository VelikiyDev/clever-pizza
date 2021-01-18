import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import '../App.css';
import Copyright from "./ui/Copyright";
import {useRoutes} from "../routes";
import {autoLogin} from "../actions/user.actions";
import {alertHide} from "../actions/app.actions";
import {AppMenu} from "./ui/AppMenu";


const App = ({autoLogin, isAlert, alert, redirectTo, loggedIn, alertHide}) => {
  const routes = useRoutes(loggedIn)
  const dispatch = useDispatch()

  const [alertData, setAlertData] = useState({type: 'success', message: ''})

  useEffect(() => {
    setAlertData({...alert})
  }, [alert])


  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(autoLogin(window.location.pathname))
    }
  }, [autoLogin,dispatch])


  const handleClose = () => {
    dispatch(alertHide());
  };

  return (
      <>
        <Router>
          {redirectTo !== '' && <Redirect to={redirectTo}/> }
          <CssBaseline />
          <AppMenu/>

          {routes}
          <Box mt={4}>
            <Copyright/>
          </Box>

          <Snackbar open={isAlert} disableWindowBlurListener={true} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertData.type}>
              {alertData.message.split('\n').map(str => <p key={`${str}`} style={{margin: '0'}}>{str}</p>)}
            </Alert>
          </Snackbar>

        </Router>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAlert: state.app.isAlert,
    alert: state.app.alert,
    redirectTo: state.app.redirectTo,
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = () => {
  return {
    autoLogin,
    alertHide
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
