import React from "react";
// Auth
import { auth } from "../../firebase";
// Router
import { Route, Redirect } from "react-router-dom";
function PrivateRoute(props) {
  if (auth.currentUser) {
    return <Route exact component={props.component} path={props.path} />;
  } else {
    return <Redirect to={props.redirect} />;
  }
}

export default PrivateRoute;
