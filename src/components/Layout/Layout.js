import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, withRouter } from "react-router-dom";
// Components
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import { Button, Avatar, Menu, Dropdown } from "antd";
// Auth
import { auth } from "../../firebase";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "nprogress/nprogress.css";
import "./Layout.css";

function Layout({ title, children, history }) {
  React.useEffect(() => {
    console.log("User changed ");
  }, [auth.currentUser]);
  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/profile">Edit Profile</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/login" onClick={() => auth.signOut()}>
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <Fragment>
      <Helmet>
        <title>
          {title} | {process.env.REACT_APP_SITENAME}
        </title>
      </Helmet>
      <Header
        data-testid="header"
        type="two"
        bgColor="white"
        left={
          <NavLink
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/"
          >
            <div
              title="Firebase Chat"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>
                <img
                  src={require("../../img/logo.svg")}
                  style={{ width: "24px" }}
                />
              </div>

              <h5 style={{ margin: "0 0 0 10px" }}>Firebase Chat</h5>
            </div>
          </NavLink>
        }
        right={
          auth.currentUser ? (
            auth.currentUser.photoURL ? (
              <Dropdown
                trigger={["click"]}
                overlay={menu}
                placement="bottomRight"
              >
                <Avatar
                  src={auth.currentUser.photoURL}
                  size="large"
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                ></Avatar>
              </Dropdown>
            ) : (
              <Dropdown
                trigger={["click"]}
                overlay={menu}
                placement="bottomRight"
              >
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                >
                  {auth.currentUser.displayName}
                </Avatar>
              </Dropdown>
            )
          ) : (
            <Button title={"Login"} onClick={() => history.push("/login")}>
              Login
            </Button>
          )
        }
      />
      <Loading background={"rgba(0,0,0,.125)"}></Loading>
      <div style={{ paddingTop: "6em" }}>{children}</div>
    </Fragment>
  );
}
export default withRouter(Layout);
