import React from "react";
import clsx from "clsx";
import "./stleInput.scss";
function Input(props) {
  const { className = "", ...rest } = props;
  return <input className={clsx("input", className)} {...rest} />;
}

export default Input;
