import React from "react";
import "./styleModalOrder.scss";
import Image from "../common/Image";
import Input from "../common/Input";
import Currency from "../common/Currency";
function ModalOrder({
  productSelect,
  CloseModalOrder,
  amount,
  handlePlusAmount,
  handleMinusAmount,
  size,
  priceSize,
  handleSizeChange,
  nameTopping,
  priceTopping,
  handleToppingChange,
  handleNoteChange,
  handleAddProductOrderClick,
}) {
  return (
    <>
      <div className="overlay" onClick={CloseModalOrder}></div>
      <div className="modal-order">
        <div className="product-option__top">
          <Image src={productSelect.image} width="80" height="80" />
          <div className="product-option__top-info">
            <p>{productSelect.product_name}</p>
            <p>{size}</p>
            <p>{nameTopping.slice(0, -2)}</p>
          </div>
          <i className="fa fa-times" onClick={CloseModalOrder}></i>
        </div>

        <div className="product-option__body">
          <div className="product-option__body-option">
            {/* <p>Loại</p> */}
            {productSelect.variants.length !== 0 && (
              <div className="checkbox-container">
                <p>Size-</p>
                <div className="checkbox-items">
                  {productSelect.variants.map((item) => (
                    <div className="checkbox" key={item.product_id}>
                      <Input
                        type="radio"
                        name={item.val}
                        checked={item.val === size}
                        value={size}
                        onChange={(e) => handleSizeChange(e, item)}
                      />
                      <span>
                        {item.val}
                        (<Currency price={item.price} />)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {productSelect.topping_list.length !== 0 && (
              <div className="checkbox-container">
                <p>Topping-</p>
                <div className="checkbox-items">
                  {productSelect.topping_list.map((item, index) => (
                    <div className="checkbox" key={item.product_id}>
                      <Input
                        type="checkbox"
                        name={item.product_name}
                        checked={nameTopping.includes(item.product_name)}
                        onChange={(e) => handleToppingChange(e, item, index)}
                      />
                      <span>
                        {item.product_name}
                        (<Currency price={item.price} />)
                      </span>
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
            onChange={handleNoteChange}
          />
        </div>

        <div className="product-option__bot">
          <div className="product-option__bot-left">
            <i className="fa fa-minus-circle" onClick={handleMinusAmount}></i>
            <span>{amount}</span>
            <i className="fa fa-plus-circle" onClick={handlePlusAmount}></i>
          </div>
          <div
            className="product-option__bot-right"
            onClick={handleAddProductOrderClick}
          >
            <p>Thêm vào giỏ hàng</p>
            <Currency price={amount * (priceSize + priceTopping)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalOrder;
