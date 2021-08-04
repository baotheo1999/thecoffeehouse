import React from "react";
import "./styleLoading.scss";
import Image from "../common/Image";
import loadding from "../../assets/img/loadingcofe.gif";
function Loading(props) {
  return (
    <div className="loading">
      <Image src={loadding} />
    </div>
  );
}

export default Loading;
