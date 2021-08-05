import React from "react";
import "./styleCart.scss";
function Cart({ listOrderProduct }) {
  const totalAmount = (data) => {
    let totalAmount = 0;
    data.map((item) => (totalAmount += item.amount));
    return totalAmount;
  };
  return listOrderProduct.length === 0 ? null : (
    <div className="cart">
      <span>{totalAmount(listOrderProduct)}</span>
      <i className="fal fa-shopping-cart"></i>
    </div>
  );
}

export default Cart;
