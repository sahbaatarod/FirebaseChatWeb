import React from "react";

function AddChat({ setShow }) {
  return (
    <div
      onClick={() => {
        setShow(true);
      }}
      title={"Start a Private Chat"}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        background: "#6e90d4",
        borderRadius: "50%",
        padding: ".5em 1em",
        boxShadow: "0 0 10px #6e90d4",
        fontSize: "20px",
        color: "white",
        cursor: "pointer",
      }}
    >
      +
    </div>
  );
}

export default AddChat;
