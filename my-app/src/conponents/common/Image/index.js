import React from "react";
import clsx from "clsx";

function Image(props) {
  const { className = "", alt = "anh", ...rest } = props;
  return <img className={clsx("image", className)} alt={alt} {...rest} />;
}

export default Image;
