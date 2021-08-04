import clsx from "clsx";
import React from "react";
import "./styleButton.scss";

function Button(props) {
  const { className = "", text = "", ...rest } = props;
  return (
    <button className={clsx("button", className)} {...rest}>
      {text}
    </button>
  );
}

export default Button;
