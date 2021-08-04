import React from "react";
import clsx from "clsx";

function Currency({ className = "", price = "" }) {
  return (
    <p className={clsx("currency", className)}>
      {typeof price === "number"
        ? String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      <span>đ</span>
    </p>
  );
}

export default Currency;
