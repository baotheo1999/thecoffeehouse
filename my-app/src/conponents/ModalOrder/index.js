import React from "react";
import Currency from "../common/Currency";
import Image from "../common/Image";
import Input from "../common/Input";
import "./styleModalOrder.scss";
function ModalOrder({
  closeModalOrderClick,
  amount,
  handlePlusAmount,
  handleMinusAmount,
  infoProductSelect,
}) {
  console.log(infoProductSelect);
  return (
    <>
      <div className="overlay" onClick={closeModalOrderClick}></div>
      <div className="modal-order">
        <div className="product-option__top">
          <Image src={infoProductSelect.image} width="80" height="80" />
          <div className="product-option__top-info">
            <p>{infoProductSelect.product_name}</p>
            <p>Vừa</p>
            <p>Topping 1</p>
          </div>
          <i className="fa fa-times" onClick={closeModalOrderClick}></i>
        </div>

        <div className="product-option__body">
          <div className="product-option__body-option">
            {infoProductSelect.variants.length !== 0 && (
              <div className="checkbox-container">
                <p>Size-</p>
                <div className="checkbox-items">
                  {infoProductSelect.variants.map((item) => (
                    <div className="checkbox" key={item.code}>
                      <Input type="radio" name="size" id={item.code} />
                      <label htmlFor={item.code}>
                        {item.val} (+
                        <Currency
                          price={item.price - infoProductSelect.base_price}
                        />
                        )
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {infoProductSelect.topping_list.length !== 0 && (
              <div className="checkbox-container">
                <p>Topping-</p>
                <div className="checkbox-items">
                  {infoProductSelect.topping_list.map((item) => (
                    <div className="checkbox" key={item.code}>
                      <Input type="checkbox" name="topping" id={item.code} />
                      <label htmlFor={item.code}>
                        {item.product_name} (+
                        <Currency price={item.price} />)
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Input
            className="note"
            type="text"
            placeholder="Thêm ghi chú món này"
          />
        </div>

        <div className="product-option__bot">
          <div className="product-option__bot-left">
            <i
              className={`fa fa-minus-circle ${amount === 0 ? "colorb" : null}`}
              onClick={handleMinusAmount}
            ></i>
            <span>{amount}</span>
            <i className="fa fa-plus-circle" onClick={handlePlusAmount}></i>
          </div>
          <div className="product-option__bot-right">
            <p>Thêm vào giỏ hàng</p>
            <Currency price="20000" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalOrder;
