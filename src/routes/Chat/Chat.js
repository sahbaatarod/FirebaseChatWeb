import React from "react";
import { withRouter } from "react-router";
import Layout from "../../components/Layout/Layout";
import Ads from "../../components/Ads/Ads";
import { Avatar } from "antd";
import queryString from "query-string";
// Firebase
import { realDb, auth } from "../../firebase";
// Redux
import { changeLoad } from "../../redux/action";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function Chat({ history, changeLoad }) {
  const [write, setWrite] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const parsed = queryString.parse(history.location.search);
  const bottomRef = React.useRef();
  const inputRef = React.useRef();
  React.useEffect(() => {
    realDb.ref("users").on("value", (snapshot) => {
      const arrayOfUsers = [];
      snapshot.forEach((each) => {
        arrayOfUsers.push(each.toJSON());
      });
      setUsers(arrayOfUsers);
    });
    realDb
      .ref(`userMessages/${auth.currentUser.uid}/${parsed.id}`)
      .orderByChild("timestamp")
      .on("value", (snapshot) => {
        const arrayOfUsers = [];
        snapshot.forEach((each) => {
          arrayOfUsers.push(each.toJSON());
        });
        setMsg(arrayOfUsers);
        setLoad(false);
      });
  }, []);
  React.useEffect(() => {
    changeLoad();
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
  }, [load]);
  const handleSend = () => {
    realDb
      .ref(`userMessages/${auth.currentUser.uid}/${parsed.id}`)
      .push({
        id: uuidv4(),
        recieverId: parsed.id,
        senderId: auth.currentUser.uid,
        text: write,
        timeStamp: Date(),
      })
      .then(() => {
        realDb.ref(`userMessages/${parsed.id}/${auth.currentUser.uid}`).push({
          id: uuidv4(),
          recieverId: parsed.id,
          senderId: auth.currentUser.uid,
          text: write,
          timeStamp: Date(),
        });
      })
      .then(() => {
        realDb.ref(`latestMessages/${auth.currentUser.uid}/${parsed.id}`).set({
          id: uuidv4(),
          recieverId: parsed.id,
          senderId: auth.currentUser.uid,
          text: write,
          timeStamp: Date(),
        });
      })
      .then(() => {
        realDb.ref(`latestMessages/${parsed.id}/${auth.currentUser.uid}`).set({
          id: uuidv4(),
          recieverId: parsed.id,
          senderId: auth.currentUser.uid,
          text: write,
          timeStamp: Date(),
        });
      })
      .then(() => {
        setWrite("");
        setTimeout(() => {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
        inputRef.current.focus();
      });
  };
  return (
    <Layout title={`Reza`}>
      <Ads></Ads>
      {msg.length < 1 && (
        <h5 style={{ textAlign: "center", marginTop: "3em" }}>No Messages !</h5>
      )}
      <div className="msgs">
        {msg.length > 0 &&
          msg.map(({ senderId, recieverId, id, text }) => {
            const found = users.find((user) => user.uid === senderId);
            console.log(found);
            return (
              <div
                className={`msg ${
                  senderId === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <div>
                  <Avatar
                    size="large"
                    style={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {senderId === found.uid
                      ? found.fullname
                      : auth.currentUser.displayName}
                  </Avatar>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <div className="sender">
                    {" "}
                    {senderId === found.uid
                      ? found.fullname
                      : auth.currentUser.displayName}
                  </div>
                  <p className={"text"} style={{ margin: "0" }}>
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        <div ref={bottomRef}></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          bottom: "0",
          width: "100%",
          background: "white",
          borderTop: "1px solid #bfbfbf",
        }}
      >
        <div style={{ width: "80%", margin: "1em" }}>
          <input
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #bfbfbf",
              outline: "none",
              background: "#fefefe",
              borderRadius: "20px",
              padding: "1em",
            }}
            value={write}
            onChange={(e) => setWrite(e.target.value)}
            placeholder="Type your message ..."
            type="text"
          ></input>
        </div>
        <div style={{ width: "20%" }}>
          <button
            disabled={write.length < 1}
            style={{
              width: "100%",
              height: "100%",
              background: "none",
              color: write.length < 1 ? "#86afff" : "#3f80ff",
              fontWeight: "bold",
              border: "none",
              outline: "none",
              cursor: write.length < 1 ? "not-allowed" : "pointer",
            }}
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}
const mapState = (state) => {
  return {};
};
const mapDis = (dispatch) => {
  return {
    changeLoad: () => dispatch(changeLoad()),
  };
};
export default connect(mapState, mapDis)(withRouter(Chat));
