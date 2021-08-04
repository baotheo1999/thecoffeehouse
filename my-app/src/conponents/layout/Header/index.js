import React from "react";
import logo from "../../../assets/img/logo.png";
import Button from "../../common/Button";
import Cart from "../../common/Cart";
import Image from "../../common/Image";
import Input from "../../common/Input";
import "./styleHeader.scss";
function Header() {
  return (
    <header>
      <div className="sticky">
        <div className="container">
          <div className="header">
            <div className="header-left">
              <Image src={logo} alt="logo thecoffee house" width="190" />
            </div>
            <div className="header-center">
              <Button text="Giao ngay" />

              <Input type="text" placeholder="Nhập địa chỉ giao hàng" />
            </div>
            <div className="header-right">
              <Button text="Đăng nhập" />
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
