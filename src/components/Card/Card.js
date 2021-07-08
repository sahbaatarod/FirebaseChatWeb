import React from "react";
import classes from "./Card.module.scss";
export default function Card({
  borderRadius,
  boxShadow,
  children,
  hoverAnim,
  width,
}) {
  return (
    <div
      className={hoverAnim ? classes.hover : ""}
      style={{
        borderRadius: borderRadius,
        background: "white",
        border: "none",
        padding: "2em",
        margin: "1em",
        boxShadow: boxShadow,
        width: width,
      }}
    >
      {children}
    </div>
  );
}
