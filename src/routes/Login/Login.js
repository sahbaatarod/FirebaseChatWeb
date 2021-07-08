import React from "react";
// Firebase
import { auth, realDb } from "../../firebase";
import { withRouter } from "react-router-dom";
// Components
import Layout from "../../components/Layout/Layout";
import Ads from "../../components/Ads/Ads";
import Card from "../../components/Card/Card";
import { Input, Button } from "antd";
// Redux
import { connect } from "react-redux";
import { changeLoad } from "../../redux/action";
// Notifications
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import { openNotification as openSuccess } from "../../components/Notifications/Success/NotifSuccess";
import { openNotification as openError } from "../../components/Notifications/Error/NotifSuccess";
function Login({ changeLoad, history }) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [signUp, setSignup] = React.useState(false);
  React.useEffect(() => {
    if (auth.currentUser) {
      history.push("/");
    }
  }, []);
  const handleSignUp = () => {
    changeLoad();
    if (email.length && pass.length) {
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then(async () => {
          await auth.currentUser.updateEmail(email);
          await auth.currentUser.updatePassword(pass);
          await auth.currentUser
            .updateProfile({
              displayName: "User",
              photoURL:
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            })
            .then(() => {
              realDb.ref(`users/${auth.currentUser.uid}`).set({
                fullname: "User",
                profileImgUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
                uid: auth.currentUser.uid,
              });
            })
            .then(() => {
              changeLoad();
            });
        })
        .catch((e) => {
          changeLoad();
          openError(
            "topRight",
            e.message,
            <CloseCircleOutlined style={{ color: "#ff4141" }} />
          );
        });
    } else {
      changeLoad();
      openError(
        "topRight",
        "Please fill in email and password .",
        <CloseCircleOutlined style={{ color: "#ff4141" }} />
      );
    }
  };
  const handleAnonymous = () => {
    changeLoad();
    auth
      .signInAnonymously()
      .then(async () => {
        changeLoad();
        console.log(auth.currentUser.uid);
        await auth.currentUser.updateProfile({
          displayName: "User",
        });
        realDb.ref(`users/${auth.currentUser.uid}`).set({
          fullname: "Anonymous User",
          profileImgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          uid: auth.currentUser.uid,
        });
        openSuccess(
          "topRight",
          "Logged In !",
          <CheckCircleOutlined style={{ color: "#1cd777" }} />
        );
      })
      .catch((e) => {
        changeLoad();
        openError(
          "topRight",
          e.message,
          <CloseCircleOutlined style={{ color: "#ff4141" }} />
        );
      });
  };
  const handleLogin = () => {
    if (email.length < 1 || pass.length < 1) {
      openError(
        "topRight",
        "Please Enter Both Email and Password .",
        <CloseCircleOutlined style={{ color: "#ff4141" }} />
      );
    } else {
      changeLoad();
      auth
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          changeLoad();
          openSuccess(
            "topRight",
            "Logged In !",
            <CheckCircleOutlined style={{ color: "#1cd777" }} />
          );
        })
        .catch((e) => {
          changeLoad();
          openError(
            "topRight",
            e.message,
            <CloseCircleOutlined style={{ color: "#ff4141" }} />
          );
        });
    }
  };
  return (
    <Layout title={signUp ? "Sign Up" : "Login"}>
      <Ads></Ads>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
      >
        <Card width={"290px"} borderRadius="8px" boxShadow="0 0 10px #dedede">
          <h4 style={{ textAlign: "center", paddingBottom: "1em" }}>
            {signUp ? "Sign Up" : "Login"}
          </h4>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            style={{ marginTop: ".7em" }}
            value={pass}
            type="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            placeholder="Password"
          ></Input>
          <div
            style={{
              marginTop: ".7em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {signUp ? (
              <React.Fragment>
                <Button onClick={handleSignUp} type="primary">
                  Sign Up
                </Button>{" "}
                <Button
                  onClick={() => setSignup(false)}
                  style={{ marginTop: ".7em" }}
                  type="link"
                >
                  Back to Login
                </Button>
              </React.Fragment>
            ) : (
              <Button onClick={handleLogin} type="primary">
                Login
              </Button>
            )}
            {signUp ? null : (
              <Button
                style={{ marginTop: ".7em" }}
                onClick={() => setSignup(true)}
                type="primary"
              >
                Sign Up
              </Button>
            )}
            <Button
              onClick={handleAnonymous}
              style={{ marginTop: ".7em" }}
              type="link"
            >
              Sign up Anonymously
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
const mapState = (state) => {
  return {
    loading: state.loading,
  };
};
const mapDis = (dispatch) => {
  return {
    changeLoad: () => dispatch(changeLoad()),
  };
};
export default connect(mapState, mapDis)(withRouter(Login));

// on anonymus login create user with that uid then authenticateAnonymus then redirect homepage

// on login authenticate with email and password then redirect homepage
