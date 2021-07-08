import React from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
function Loading(props) {
  const background = props.background ? props.background : "white";
  return (
    <div
      style={{
        background: background,
        zIndex: 100000,
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: props.loading ? "1" : "0",
        transition: "all .3s",
        visibility: props.loading ? "visible" : "hidden",
      }}
    >
      <Loader></Loader>
    </div>
  );
}
const mapState = (state) => {
  return {
    loading: state.loading,
  };
};
const mapDis = (dispatch) => {
  return {};
};
export default connect(mapState, mapDis)(Loading);
