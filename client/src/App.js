import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setTokenHeader } from "./utils/setTokenHeader";
import { getLoggedProfile } from "./actions/auth";
import Profile from "./components/auth/Profile";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { Home } from './components/layout/Home';
import AdminRoute from "./components/Routes/AdminRoute";
import Dashboard from './components/admin/Dashboard';

if (Cookies.get('token')) {
  setTokenHeader(Cookies.get('token'));
}

function App({ getLoggedProfile }) {
  useEffect(() => {
    (async () => {
      try {
        await getLoggedProfile();
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
         <Route excat path="/register" component={Register} />
         <Route excat path="/login"  component={Login} />
         <PrivateRoute excat path='/profile' component={Profile} />
         <AdminRoute excat path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  );
}

App.propTypes = {
  getLoggedProfile: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   isLogged: state.auth.isLogged
// })

export default connect(
  null,
  { getLoggedProfile }
)(App);
