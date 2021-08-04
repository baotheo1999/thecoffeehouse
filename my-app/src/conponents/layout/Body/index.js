import React from "react";
import BodyCenter from "../../BodyCenter";
import BodyLeft from "../../BodyLeft";
import BodyRight from "../../BodyRight";

function Body(props) {
  const style = {
    padding: "100px 0 440px",
    display: "flex",
  };
  return (
    <div className="container">
      <div className="body" style={style}>
        <BodyLeft />
        <BodyCenter />
        <BodyRight />
      </div>
    </div>
  );
}

export default Body;
