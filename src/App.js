import React, { useEffect } from "react";
// Router
import { Switch, Route, withRouter } from "react-router-dom";
// Components
import Home from "./routes/Home/Home";
import ErrorComp from "./routes/ErrorComp/ErrorComp";
import Login from "./routes/Login/Login";
import Profile from "./routes/Profile/Profile";
import GroupChat from "./routes/GroupChat/GroupChat";
import Chat from "./routes/Chat/Chat";
// Private Components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// NProgress
import NProgress from "nprogress";
import { auth } from "./firebase";
NProgress.configure({ showSpinner: true });
function App({ history }) {
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        history.push("/");
      } else {
        history.push("/login");
      }
    });
  }, []);
  useEffect(
    () =>
      history.listen(() => {
        NProgress.start();
        NProgress.done();
      }),
    []
  );
  return (
    <Switch>
      <Route exact component={Login} path="/login" />
      <PrivateRoute component={Profile} path="/profile" redirect="/login" />
      <PrivateRoute component={GroupChat} path="/groupchat" redirect="/login" />
      <PrivateRoute component={Chat} path="/chat" redirect="/login" />
      <PrivateRoute component={Home} path="/" redirect="/login" />
      <Route component={ErrorComp} />
    </Switch>
  );
}

export default withRouter(App);
