import React from "react";
import Button from "../common/Button";
import "./styleShipNow.scss";
function ShipNow({
  openTimeOrder,
  openTimeOrderClick,
  closeShipNowClick,
  date,
  hanldeDayChange,
  checkDay,
  textButton,
  handeleShipNow,
}) {
  return (
    <div className="ship-now">
      <div className="ship-now__top">
        <div className="ship-now__top-text" onClick={handeleShipNow}>
          <i className="fa fa-search"></i>
          <span>Giao ngay</span>
        </div>
        <div className="ship-now__top-text" onClick={openTimeOrderClick}>
          <i className="fa fa-search"></i>
          <span>Thời gian đặt hàng</span>
        </div>
      </div>

      {openTimeOrder && (
        <div className="ship-now__bot">
          <div className="ship-now__bot-day">
            <label>Ngày đặt</label>
            <select
              id="date"
              onChange={hanldeDayChange}
              defaultValue={textButton.day}
            >
              {date.days.map((item, index) => (
                <option value={item} key={index}>
                  {index === 0 ? "Hôm nay" : item}
                </option>
              ))}
            </select>
          </div>
          <div className="ship-now__bot-day">
            <label>Thời gian đặt</label>
            <select id="time" defaultValue={textButton.hours}>
              {checkDay
                ? date.hoursTomorrow.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                : date.hoursNow.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          </div>
          <Button
            className="btn-shipnow"
            text="Hẹn giờ"
            onClick={closeShipNowClick}
          />
        </div>
      )}
    </div>
  );
}

export default ShipNow;
