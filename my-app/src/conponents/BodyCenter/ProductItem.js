import React from "react";
import Currency from "../../conponents/common/Currency";
import Image from "../../conponents/common/Image";
import cafe from "../../assets/img/cafe.jpeg";
function ProductItem({ product, openModalOrder }) {
  return (
    <li>
      <div className="product-img">
        <Image src={cafe} alt="sd" width="80" height="80" />
      </div>
      <div className="product-info">
        <h5 className="product-info__title">Cà phê sữa đá</h5>
        <p className="product-info__desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic
        </p>
        <Currency className="product-info__currencys" price="10000" />
      </div>
      <i className="fal fa-plus-circle"></i>
    </li>
  );
}

export default ProductItem;
