import React from "react";
import "./styleBodyRight.scss";
import Button from "../../conponents/common/Button";
import Currency from "../common/Currency";
import Input from "../common/Input";
function BodyRight({ listProductOrder, openModalOrderClick }) {
  const totalPrice = (data) => {
    let totalPrice = 0;
    data.map((item) => (totalPrice += item.totalPrice));
    return totalPrice;
  };

  const totalAmount = (data) => {
    let totalAmount = 0;
    data.map((item) => (totalAmount += item.amount));
    return totalAmount;
  };

  return (
    <div>
      <div className="body-right">
        <div className="body-right__top">
          <Button
            text="Xem giỏ hàng"
            style={
              listProductOrder.length === 0
                ? { backgroundColor: "#f9d7ba" }
                : null
            }
          />
        </div>
        <div className="cart-list">
          {listProductOrder.map((item, index) => (
            <div
              className="cart-item"
              key={index}
              onClick={() => openModalOrderClick(item, index)}
            >
              <div className="cart-item__info">
                <span>{item.amount}</span>
                <div className="product-info">
                  <p>{item.product_name}</p>
                  <p>{item.size.val}</p>
                  <p>{item.topping.name.slice(0, -2)}</p>
                  <p>{item.note}</p>
                </div>
              </div>
              <Currency price={item.totalPrice} />
            </div>
          ))}
        </div>

        <div className="payment">
          <div className="payment-item">
            <p>Cộng ({totalAmount(listProductOrder)} món)</p>
            <Currency price={totalPrice(listProductOrder)} />
          </div>
          <div className="payment-item">
            <p>Vận chuyển</p>
            <Currency price={listProductOrder.length === 0 ? "0" : "15000"} />
          </div>
          <div className="payment-from">
            <Input type="text" placeholder="Nhập mã ưu đãi" />
            <Button text="Áp dụng" />
          </div>
        </div>
        <div className="total">
          <p>Tổng cộng</p>
          <Currency
            price={
              totalPrice(listProductOrder) +
              (listProductOrder.length === 0 ? 0 : 15000)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BodyRight;
