import React, { useState } from "react";
import css from "../../App.module.css";
export default function Part(props) {
  const [show, setShow] = useState(false);

  const styleHide = {
    height: "10px",
    overflow: "hidden",
  };
  const styleShow = {
    height: "auto",
    overflow: "hidden",
  };

  return (
    <div style={{ borderBottom: "1px solid black" }}>
      <div className={css.header}>
        <img
          src="arrowDark.svg"
          alt=""
          className={css.arrow}
          onClick={() => setShow(show ? false : true)}
          style={{ rotate: show ? "180deg" : "none" }}
        />
        {props.name}
      </div>
      <div style={!show ? styleHide : styleShow}> {props.children}</div>
    </div>
  );
}
