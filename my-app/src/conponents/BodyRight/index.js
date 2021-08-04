import React from "react";
import "./styleBodyRight.scss";
import Button from "../../conponents/common/Button";
import Currency from "../common/Currency";
import Input from "../common/Input";
function BodyRight() {
  // const totalPrice = (data) => {
  //   let totalPrice = 0;
  //   data?.map((item) => (totalPrice += item.totalPrice));
  //   return totalPrice;
  // };

  // const totalAmount = (data) => {
  //   let totalAmount = 0;
  //   data?.map((item) => (totalAmount += item.amount));
  //   return totalAmount;
  // };

  return (
    <div>
      <div className="body-right">
        <div className="body-right__top">
          <Button text="Xem giỏ hàng" />
        </div>
        <div className="cart-list">
          <div className="cart-item">
            <div className="cart-item__info">
              <span>12</span>
              <div className="product-info">
                <p>Cà phê sữa đá</p>
                <p>Vừa</p>
                <p>Topping</p>
              </div>
            </div>
            <Currency price="1000" />
          </div>
        </div>

        <div className="payment">
          <div className="payment-item">
            <p>Cộng (12 món)</p>
            <Currency price="10000" />
          </div>
          <div className="payment-item">
            <p>Vận chuyển</p>
            <Currency price="10000" />
          </div>
          <div className="payment-from">
            <Input type="text" placeholder="Nhập mã ưu đãi" />
            <Button text="Áp dụng" />
          </div>
        </div>
        <div className="total">
          <p>Tổng cộng</p>
          <Currency price="20000" />
        </div>
      </div>
    </div>
  );
}

export default BodyRight;
