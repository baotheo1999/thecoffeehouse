import React from "react";
import logo from "../../../assets/img/logo.png";
import Button from "../../common/Button";
import Cart from "../../common/Cart";
import Image from "../../common/Image";
import Input from "../../common/Input";
import ListSearchAddress from "../../ListSearchAddress";
import NoneAddress from "../../ListSearchAddress/NoneAddress";
import ShipNow from "../../ShipNow";
import "./styleHeader.scss";
import { Link } from "react-router-dom";
function Header({
  searchText,
  handleSearchAddressChange,
  listAddress,
  close,
  getAddressClick,
  openAddressModalClick,
  refAddress,
  openShipNowClick,
  openShipNow,
  openTimeOrderClick,
  openTimeOrder,
  closeShipNowClick,
  date,
  hanldeDayChange,
  checkDay,
  textButton,
  handeleShipNow,
  refShipNow,
  listOrderProduct,
}) {
  return (
    <header>
      <div className="sticky">
        <div className="container">
          <div className="header">
            <div className="header-left">
              <Link to="/">
                <Image src={logo} alt="logo thecoffee house" width="190" />
              </Link>
            </div>
            <div className="header-center">
              <div className="header-center__shipnow" ref={refShipNow}>
                <Button
                  text={
                    textButton.length !== 0
                      ? textButton.day.concat(`-${textButton.hours}`)
                      : "giao ngay"
                  }
                  onClick={openShipNowClick}
                />

                {openShipNow && (
                  <ShipNow
                    openTimeOrderClick={openTimeOrderClick}
                    openTimeOrder={openTimeOrder}
                    closeShipNowClick={closeShipNowClick}
                    date={date}
                    hanldeDayChange={hanldeDayChange}
                    checkDay={checkDay}
                    textButton={textButton}
                    handeleShipNow={handeleShipNow}
                    refShipNow={refShipNow}
                  />
                )}
              </div>
              <form>
                <Input
                  type="text"
                  placeholder="Nhập địa chỉ giao hàng"
                  value={searchText}
                  onChange={(e) => {
                    handleSearchAddressChange(e);
                  }}
                  onClick={openAddressModalClick}
                />
                {searchText.length !== 0 ? (
                  listAddress.length !== 0 ? (
                    close ? null : (
                      <ListSearchAddress
                        getAddressClick={getAddressClick}
                        listAddress={listAddress}
                        refAddress={refAddress}
                      />
                    )
                  ) : (
                    <NoneAddress />
                  )
                ) : null}
              </form>
            </div>
            <div className="header-right">
              <Link to="/register">
                <Button text="Đăng nhập" />{" "}
              </Link>

              <Cart listOrderProduct={listOrderProduct} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
