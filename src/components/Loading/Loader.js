import React from "react";

import classes from "./Loader.module.scss";

export default function Roller({ color, style }) {
  const circles = [...Array(8)].map((_, index) => {
    return (
      <div key={index}>
        <div className={classes.divAfter} style={{ background: color }}></div>
      </div>
    );
  });
  return (
    <div className={classes.roller} style={{ ...style }}>
      {circles}
    </div>
  );
}
