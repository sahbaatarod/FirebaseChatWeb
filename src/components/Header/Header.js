import React from "react";
import classes from "./Header.module.scss";
export default function Header({
  right,
  left,
  type,
  center,
  mobile,
  desktop,
  bgColor,
  bottom,
}) {
  const [show, setShow] = React.useState(false);
  const handleShow = () => {
    if (typeof window !== "undefined") {
      if (window.pageYOffset > 120) {
        if (!show) {
          setShow(true);
        }
      }
      if (window.pageYOffset < 120) {
        setShow(false);
      }
    }
  };
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleShow);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleShow);
      }
    };
  }, []);
  switch (type) {
    case "two":
      return (
        <div
          className={
            show
              ? `${classes.navbar} ${classes.navbarSticky}`
              : `${classes.navbar}`
          }
          style={{
            background: bgColor,
            boxShadow: "0 0 10px #ccc",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-4">
            <div>{left}</div>
            <div>{right}</div>
          </div>
          {bottom}
        </div>
      );
    case "three":
      return (
        <div
          className={
            show
              ? `${classes.navbar} ${classes.navbarSticky}`
              : `${classes.navbar}`
          }
          style={{
            background: bgColor,
            boxShadow: "0 0 10px #ccc",
          }}
        >
          <div className="d-flex justify-content-between p-4">
            <div>{left}</div>
            <div>{center}</div>
            <div>{right}</div>
          </div>
          {bottom}
        </div>
      );
    case "responsive":
      return (
        <div
          className={
            show
              ? `${classes.navbar} ${classes.navbarSticky}`
              : `${classes.navbar}`
          }
          style={{
            background: bgColor,
            boxShadow: "0 0 10px #ccc",
          }}
        >
          <div className="p-4">
            <span className={classes.mobile}>{mobile}</span>
            <span className={classes.desktop}>{desktop}</span>
          </div>
        </div>
      );
    default:
      return <div>Nothin</div>;
  }
}
