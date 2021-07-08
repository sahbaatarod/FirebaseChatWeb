import React from "react";
import Layout from "../../components/Layout/Layout";
import Ads from "../../components/Ads/Ads";
import { realDb, auth } from "../../firebase";
import { Avatar } from "antd";
import { changeLoad } from "../../redux/action";
import { connect } from "react-redux";
import "./GroupChat.css";
function GroupChat({ changeLoad }) {
  const [write, setWrite] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const bottomRef = React.useRef(null);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    realDb
      .ref("groupChat")
      .orderByChild("timeStamp")
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
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
  }, [load]);
  const handleSend = () => {
    realDb
      .ref(`groupChat`)
      .push({
        sender: auth.currentUser.displayName || "Anonymous",
        uid: auth.currentUser.uid,
        profileImgUrl: auth.currentUser.photoURL
          ? auth.currentUser.photoURL
          : "",
        message: write,
        timeStamp: Date(),
      })

      .then(() => {
        setWrite("");
        setTimeout(() => {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
        inputRef.current.focus();
      })
      .catch((e) => {
        console.log(e.message);
        setWrite("");
      });
  };
  return (
    <Layout title={"Groupchat"}>
      <Ads></Ads>
      {msg.length < 1 && (
        <h5 style={{ textAlign: "center", marginTop: "3em" }}>No Messages !</h5>
      )}
      <div className="msgs">
        {msg.length > 0 &&
          msg.map(({ sender, message, profileImgUrl, uid }) => (
            <div
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <div>
                {profileImgUrl ? (
                  <img className={"img"} src={profileImgUrl} alt="" />
                ) : (
                  <Avatar
                    size="large"
                    style={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {sender}
                  </Avatar>
                )}
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <div className="sender">{sender}</div>
                <p className={"text"} style={{ margin: "0" }}>
                  {message}
                </p>
              </div>
            </div>
          ))}
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
export default connect(mapState, mapDis)(GroupChat);
