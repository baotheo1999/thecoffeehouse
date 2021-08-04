import React from "react";
import Button from "../common/Button";
import "./styleShipNow.scss";
function ShipNow({ handleCloseShipNow }) {
  
  return (
    <div className="ship-now">
      <div className="ship-now__top">
        <div className="ship-now__top-text">
          <i className="fa fa-search"></i>
          <span>Giao ngay</span>
        </div>
        <div className="ship-now__top-text">
          <i className="fa fa-search"></i>
          <span>Thời gian đặt hàng</span>
        </div>
      </div>

      <div className="ship-now__bot">
        <div className="ship-now__bot-day">
          <label>Ngày đặt</label>
          <select id="date">
            <option>Hôm nay</option>
            <option>Hôm nay</option>
            <option>Hôm nay</option>
          </select>
        </div>
        <div className="ship-now__bot-day">
          <label>Thời gian đặt</label>
          <select id="time">
            <option>option1</option>
            <option>option1</option>
            <option>option1</option>
          </select>
        </div>
        <Button
          className="btn-shipnow"
          text="Hẹn giờ"
          onClick={handleCloseShipNow}
        />
      </div>
    </div>
  );
}

export default ShipNow;
