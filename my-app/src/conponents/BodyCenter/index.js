import React from "react";
import Input from "../../conponents/common/Input";
import ProductItem from "./ProductItem";
import "./styleBodyCenter.scss";
function BodyCenter() {
  return (
    <div className="body-center">
      <Input
        className="search-menu"
        type="text"
        placeholder="Tìm kiếm sản phẩm"
      />
      <div className="category categoryActive">
        <h4 className="category-title">Cà phê</h4>
        <ul className="product">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </ul>
      </div>
    </div>
  );
}

export default BodyCenter;
