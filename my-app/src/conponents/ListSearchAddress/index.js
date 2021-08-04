import React from "react";
import "./styleListSearchAddress.scss";

function ListSearchAddress({ dataAddress, getAddressClick, refAddress }) {
  return (
    <ul className="list-address" ref={refAddress}>
      {dataAddress.map((item) => (
        <li
          className="item-address"
          key={item.place_id}
          onClick={() => getAddressClick(item.full_address)}
        >
          <i className="fas fa-map-marker-alt"></i>
          <div className="item-address__info">
            <h3>{item.title_address}</h3>
            <p>{item.full_address}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListSearchAddress;
