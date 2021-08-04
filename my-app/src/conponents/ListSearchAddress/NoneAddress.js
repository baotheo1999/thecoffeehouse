import React from "react";
import "./styleListSearchAddress.scss";

function NoneAddress() {
  return (
    <ul className="list-address">
      <li className="item-address">
        <i className="fas fa-map-marker-alt"></i>
        <div className="item-address__info">
          <h3>Không tìm thấy</h3>
        </div>
      </li>
    </ul>
  );
}

export default NoneAddress;
