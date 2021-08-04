import React from "react";
import Currency from "../../conponents/common/Currency";
import Image from "../../conponents/common/Image";
function ProductItem({ listProduct }) {
  return (
    <li>
      <div className="product-img">
        <Image
          src={listProduct.image}
          alt={listProduct.product_name}
          width="80"
          height="80"
        />
      </div>
      <div className="product-info">
        <h5 className="product-info__title">{listProduct.product_name}</h5>
        <p className="product-info__desc">{listProduct.description}</p>
        <Currency
          className="product-info__currencys"
          price={listProduct.price}
        />
      </div>
      <i className="fal fa-plus-circle"></i>
    </li>
  );
}

export default ProductItem;
