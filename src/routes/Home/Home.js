import React from "react";
import { realDb } from "../../firebase";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { changeLoad } from "../../redux/action";
// Components
import Layout from "../../components/Layout/Layout";
import AddChat from "../../components/AddChat/AddChat";
import Ads from "../../components/Ads/Ads";
import CustomModal from "../../components/Modal/CustomModal";
import { Avatar } from "antd";
import { auth } from "../../firebase";
import classes from "./Home.module.scss";
function Home({ history, changeLoad }) {
  const [msg, setMsg] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [groupLatest, setGroupLatest] = React.useState([]);

  React.useEffect(() => {
    realDb.ref("users").on("value", (snapshot) => {
      const arrayOfUsers = [];
      snapshot.forEach((each) => {
        arrayOfUsers.push(each.toJSON());
      });
      setUsers(arrayOfUsers);
    });
    realDb.ref("groupChat").on("value", (snapshot) => {
      const groupMsg = [];
      snapshot.forEach((each) => {
        groupMsg.push(each.toJSON());
      });
      console.log(groupMsg);
      const num = groupMsg.length - 1;
      setGroupLatest(groupMsg[num]);
    });
    if (auth.currentUser) {
      realDb
        .ref(`latestMessages/${auth.currentUser.uid}`)
        .on("value", (snapshot) => {
          const arrayOfMessages = [];
          snapshot.forEach((each) => {
            arrayOfMessages.push(each.toJSON());
          });
          setMsg(arrayOfMessages);
          setLoad(false);
        });
    }
  }, []);
  return (
    <Layout title="Chat">
      <Ads></Ads>
      <CustomModal
        title={"User to Chat with"}
        show={show}
        setShow={setShow}
        showCloseIcon={true}
        closeOnMask={true}
        centered={true}
        overlayColor={"rgba(0,0,0,.2)"}
      >
        <div style={{ height: "400px", overflowY: "scroll" }}>
          {users.length > 0 &&
            users.map((each) => {
              if (auth.currentUser) {
                if (
                  each.fullname !== "Anonymous User" &&
                  each.fullname !== auth.currentUser.displayName
                ) {
                  return (
                    <div
                      onClick={() => {
                        history.push(`/chat?id=${each.uid}`);
                      }}
                      className={classes.chat}
                      style={{
                        display: "flex",
                        marginTop: "1em",
                        borderBottom: "1px solid #ccc",
                        padding: "1em 1em",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        src={each.profileImgUrl ? each.profileImgUrl : ""}
                        size="large"
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                      >
                        {each.fullname}
                      </Avatar>
                      <h5
                        style={{
                          textAlign: "left",
                          margin: "0",
                          marginLeft: "1em",
                        }}
                      >
                        {each.fullname}
                      </h5>
                    </div>
                  );
                }
              }
            })}
        </div>
      </CustomModal>
      <div
        onClick={() => {
          history.push("/groupchat");
        }}
        className={classes.chat}
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          padding: "1em 1em",
          cursor: "pointer",
        }}
      >
        <Avatar
          src="https://geo-media.beatport.com/image_size/500x500/a966d7ac-ca64-4d45-bb9c-f1cb98fba122.jpg"
          size="large"
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        ></Avatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1em",
          }}
        >
          <h5 style={{ textAlign: "left", margin: "0" }}>Group Chat</h5>
          <div style={{ textAlign: "left" }}>
            {groupLatest && groupLatest.message}
          </div>
        </div>
      </div>
      {msg.length > 0 &&
        msg.map((each) => {
          const whatUid =
            each.senderId === auth.currentUser.uid
              ? each.recieverId
              : each.senderId;
          const found = users.find((user) => user.uid === whatUid);
          return (
            <div
              onClick={() => history.push(`chat?id=${found.uid}`)}
              className={classes.chat}
              style={{
                display: "flex",
                borderBottom: "1px solid #ccc",
                padding: "1em 1em",
                cursor: "pointer",
              }}
            >
              {found.profileImgUrl ? (
                <Avatar
                  src={found.profileImgUrl}
                  size="large"
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                ></Avatar>
              ) : (
                <Avatar
                  src={found.profileImgUrl}
                  size="large"
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {found.fullname}
                </Avatar>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1em",
                }}
              >
                <h5 style={{ textAlign: "left", margin: "0" }}>
                  {found.fullname}
                </h5>
                <div style={{ textAlign: "left" }}>{each.text}</div>
              </div>
            </div>
          );
        })}
      <AddChat setShow={setShow}></AddChat>
    </Layout>
  );
}

// Redux Config
const mapState = (state) => {
  return {
    name: state.name,
  };
};

const mapDis = (dispatch) => {
  return {
    changeLoad: () => dispatch(changeLoad()),
  };
};

export default connect(mapState, mapDis)(withRouter(Home));
